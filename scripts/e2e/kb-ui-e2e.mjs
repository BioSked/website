/**
 * KB preview end-to-end browser tests (desktop + responsive).
 * Drives a real Chrome via CDP, no external deps beyond the bundled puppeteer-core
 * used by lighthouse, so it runs offline.
 */
import { launch } from 'chrome-launcher';
import CDP from 'chrome-remote-interface';

const BASE = process.env.KB_BASE || 'http://localhost:8899';
// KB_LOCALES=fr,de,nl,it to sweep several knowledge base languages in one run.
const LOCALES = (process.env.KB_LOCALES || 'fr').split(',').map((code) => code.trim()).filter(Boolean);
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'mobile', width: 375, height: 812, mobile: true },
];

const results = [];
let currentLocale = '';
const record = (viewport, page, check, pass, detail = '') =>
  results.push({ viewport, page: currentLocale ? `${currentLocale}/${page}` : page, check, pass, detail });

async function withPage(fn) {
  const chrome = await launch({ chromeFlags: ['--headless=new', '--no-first-run', '--disable-gpu'] });
  const client = await CDP({ port: chrome.port });
  const { Page, Runtime, Emulation, Network, Console } = client;
  await Page.enable(); await Runtime.enable(); await Network.enable(); await Console.enable();
  const consoleErrors = [];
  client.Runtime.exceptionThrown(({ exceptionDetails }) =>
    consoleErrors.push(exceptionDetails.exception?.description || exceptionDetails.text));
  client.Console.messageAdded(({ message }) => {
    if (message.level === 'error') consoleErrors.push(message.text);
  });
  const failedRequests = [];
  client.Network.loadingFailed(({ errorText, type }) => failedRequests.push(`${type}: ${errorText}`));
  client.Network.responseReceived(({ response, type }) => {
    if (response.status >= 400) failedRequests.push(`${response.status} ${type} ${response.url}`);
  });
  try {
    await fn({ Page, Runtime, Emulation, consoleErrors, failedRequests });
  } finally {
    await client.close();
    await chrome.kill();
  }
}

const evalJs = async (Runtime, expression) => {
  const { result, exceptionDetails } = await Runtime.evaluate({
    expression, returnByValue: true, awaitPromise: true,
  });
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || 'eval failed');
  return result.value;
};

const goto = async (Page, Runtime, url) => {
  await Page.navigate({ url });
  await Page.loadEventFired();
  await new Promise((r) => setTimeout(r, 450));
};

await withPage(async ({ Page, Runtime, Emulation, consoleErrors, failedRequests }) => {
  for (const vp of VIEWPORTS) {
    await Emulation.setDeviceMetricsOverride({
      width: vp.width, height: vp.height, deviceScaleFactor: 2, mobile: vp.mobile,
    });

    for (const locale of LOCALES) {
    // ---------- KB home ----------
    currentLocale = locale;
    await goto(Page, Runtime, `${BASE}/kb-preview/${locale}/knowledge/`);

    // 1. Search dropdown must not be clipped by any ancestor
    const clip = await evalJs(Runtime, `(() => {
      const input = document.querySelector('[data-kb-search-input]');
      const results = document.querySelector('[data-kb-search-results]');
      if (!input || !results) return { error: 'search not found' };
      // Ancestor overflow only matters when the list is NOT in the top layer.
      const topLayer = results.hasAttribute('popover') && typeof results.showPopover === 'function';
      let el = results.parentElement, clippers = [];
      while (el && el !== document.documentElement) {
        const cs = getComputedStyle(el);
        if (cs.overflow !== 'visible' && cs.overflow !== '') {
          clippers.push(el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 40) + ' [' + cs.overflow + ']');
        }
        el = el.parentElement;
      }
      return { clippers, topLayer };
    })()`);
    record(vp.name, 'kb home', 'result list escapes ancestor clipping',
      clip.topLayer === true || (Array.isArray(clip.clippers) && clip.clippers.length === 0),
      clip.topLayer ? 'rendered in top layer (popover)' : (clip.clippers || []).join(' | ') || clip.error || '');

    // 2. Type a query -> results visible and fully inside viewport
    const searchRes = await evalJs(Runtime, `(async () => {
      const input = document.querySelector('[data-kb-search-input]');
      const results = document.querySelector('[data-kb-search-results]');
      input.focus();
      input.value = 'guide';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 500));
      const links = [...results.querySelectorAll('a')];
      const rb = results.getBoundingClientRect();
      const hit = (l) => {
        const r = l.getBoundingClientRect();
        const t = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(8, r.height / 2));
        return !!(t && (t === l || l.contains(t)));
      };
      let visibleCount = 0, firstTitle = '';
      if (links.length) {
        firstTitle = links[0].textContent.trim().slice(0, 60);
        results.scrollTop = 0;
        await new Promise(r => setTimeout(r, 60));
        if (hit(links[0])) visibleCount++;
        // scroll the list itself to the end and confirm the last item is reachable
        results.scrollTop = results.scrollHeight;
        await new Promise(r => setTimeout(r, 80));
        if (hit(links[links.length - 1])) visibleCount++;
        results.scrollTop = 0;
      }
      return {
        hidden: results.classList.contains('hidden'),
        count: links.length,
        visibleCount,
        firstTitle,
        rect: { top: Math.round(rb.top), bottom: Math.round(rb.bottom), left: Math.round(rb.left), right: Math.round(rb.right) },
        vh: innerHeight, vw: innerWidth,
        overflowsRight: rb.right > innerWidth + 1,
        overflowsLeft: rb.left < -1,
      };
    })()`);
    record(vp.name, 'kb home', 'search returns results', !searchRes.hidden && searchRes.count > 0,
      `count=${searchRes.count} first="${searchRes.firstTitle}"`);
    record(vp.name, 'kb home', 'first and last result reachable (nothing external clips the list)',
      searchRes.count > 0 && searchRes.visibleCount === 2,
      `reachable ${searchRes.visibleCount}/2 of ${searchRes.count} results`);
    record(vp.name, 'kb home', 'dropdown inside viewport horizontally',
      !searchRes.overflowsRight && !searchRes.overflowsLeft,
      JSON.stringify(searchRes.rect) + ` vw=${searchRes.vw}`);
    record(vp.name, 'kb home', 'dropdown bottom reachable on screen',
      searchRes.rect.bottom <= searchRes.vh + 400,
      `bottom=${searchRes.rect.bottom} vh=${searchRes.vh}`);

    // 3. Keyboard: ArrowDown selects first result
    const kbd = await evalJs(Runtime, `(async () => {
      const input = document.querySelector('[data-kb-search-input]');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await new Promise(r => setTimeout(r, 150));
      const sel = document.querySelector('[data-kb-search-results] a[aria-selected="true"]');
      return { hasSelection: !!sel, focused: document.activeElement?.tagName };
    })()`);
    record(vp.name, 'kb home', 'keyboard ArrowDown highlights a result', kbd.hasSelection, JSON.stringify(kbd));

    // 4. No horizontal page scroll anywhere
    const overflowX = await evalJs(Runtime, `(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > innerWidth + 2 && getComputedStyle(el).position !== 'fixed';
      }).slice(0, 4).map(el => el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 45));
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, wide };
    })()`);
    record(vp.name, 'kb home', 'no horizontal overflow',
      overflowX.scrollW <= overflowX.clientW + 2,
      `scrollW=${overflowX.scrollW} clientW=${overflowX.clientW} ${overflowX.wide.join(' | ')}`);

    // 5. Tap targets >= 40px on mobile
    if (vp.mobile) {
      const tap = await evalJs(Runtime, `(() => {
        const scope = document.querySelector('main') || document;
        const small = [...scope.querySelectorAll('a, button')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.height < 32 || r.width < 32);
        }).slice(0, 5).map(el => (el.textContent || '').trim().slice(0, 28) + ' [' + Math.round(el.getBoundingClientRect().height) + 'px]');
        return small;
      })()`);
      record(vp.name, 'kb home', 'no tiny tap targets', tap.length === 0, tap.join(' | '));
    }

    // ---------- Article page ----------
    const articleUrl = await evalJs(Runtime, `(() => {
      const a = document.querySelector('a[href*="/knowledge/"][href$="/"]:not([href$="/knowledge/"])');
      return a ? a.href : null;
    })()`);
    if (articleUrl) {
      await goto(Page, Runtime, articleUrl);
      const art = await evalJs(Runtime, `(() => {
        const de = document.documentElement;
        const h1 = document.querySelector('h1');
        const imgs = [...document.querySelectorAll('main img, article img')];
        const wideImgs = imgs.filter(i => i.getBoundingClientRect().right > innerWidth + 2).length;
        const tables = [...document.querySelectorAll('main table, article table')];
        const wideTables = tables.filter(t => t.scrollWidth > t.clientWidth + 2 && getComputedStyle(t.parentElement).overflowX === 'visible').length;
        const pre = [...document.querySelectorAll('main pre, article pre')];
        const widePre = pre.filter(p => p.getBoundingClientRect().right > innerWidth + 2).length;
        return {
          title: h1 ? h1.textContent.trim().slice(0, 50) : null,
          scrollW: de.scrollWidth, clientW: de.clientWidth,
          imgs: imgs.length, wideImgs, tables: tables.length, wideTables, widePre,
          hasSearch: !!document.querySelector('[data-kb-search-input]'),
        };
      })()`);
      record(vp.name, 'article', 'has H1', !!art.title, art.title || '');
      record(vp.name, 'article', 'no horizontal overflow',
        art.scrollW <= art.clientW + 2, `scrollW=${art.scrollW} clientW=${art.clientW}`);
      record(vp.name, 'article', 'images fit viewport', art.wideImgs === 0, `${art.wideImgs}/${art.imgs} overflow`);
      record(vp.name, 'article', 'tables scroll or fit', art.wideTables === 0, `${art.wideTables}/${art.tables} unscrollable`);
      record(vp.name, 'article', 'code blocks fit', art.widePre === 0, `${art.widePre} overflow`);

      // search on article page too
      if (art.hasSearch) {
        const artClip = await evalJs(Runtime, `(async () => {
          const input = document.querySelector('[data-kb-search-input]');
          const results = document.querySelector('[data-kb-search-results]');
          input.focus(); input.value = 'guide';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          await new Promise(r => setTimeout(r, 500));
          const links = [...results.querySelectorAll('a')];
          const hit = (l) => {
            const r = l.getBoundingClientRect();
            const t = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(8, r.height / 2));
            return !!(t && (t === l || l.contains(t)));
          };
          let visible = 0;
          if (links.length) {
            results.scrollTop = 0; await new Promise(r => setTimeout(r, 60));
            if (hit(links[0])) visible++;
            results.scrollTop = results.scrollHeight; await new Promise(r => setTimeout(r, 80));
            if (hit(links[links.length - 1])) visible++;
          }
          return { count: links.length, visible };
        })()`);
        record(vp.name, 'article', 'first and last result reachable',
          artClip.count > 0 && artClip.visible === 2,
          `reachable ${artClip.visible}/2 of ${artClip.count} results`);
      }
    }
    }
  }

  // console / network health (collected across the whole run)
  currentLocale = '';
  record('all', 'global', 'no console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
  const realFails = failedRequests.filter((f) => !f.includes('favicon'));
  record('all', 'global', 'no failed requests', realFails.length === 0, realFails.slice(0, 3).join(' | '));
});

// ---------- report ----------
const failed = results.filter((r) => !r.pass);
console.log('\n' + '='.repeat(78));
for (const vp of [...new Set(results.map((r) => r.viewport))]) {
  console.log(`\n### ${vp.toUpperCase()}`);
  for (const r of results.filter((x) => x.viewport === vp)) {
    console.log(`  ${r.pass ? 'PASS' : 'FAIL'}  [${r.page}] ${r.check}${r.detail ? `\n           ${r.detail}` : ''}`);
  }
}
console.log('\n' + '='.repeat(78));
console.log(`${results.length - failed.length}/${results.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
