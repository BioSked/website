import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { x as NOOP_MIDDLEWARE_HEADER, y as decodeKey } from './chunks/astro/server_B5cfr19O.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/biofred/Documents/Dev/marketing-site/","cacheDir":"file:///Users/biofred/Documents/Dev/marketing-site/node_modules/.astro/","outDir":"file:///Users/biofred/Documents/Dev/marketing-site/dist/","srcDir":"file:///Users/biofred/Documents/Dev/marketing-site/src/","publicDir":"file:///Users/biofred/Documents/Dev/marketing-site/public/","buildClientDir":"file:///Users/biofred/Documents/Dev/marketing-site/dist/client/","buildServerDir":"file:///Users/biofred/Documents/Dev/marketing-site/dist/server/","adapterName":"","routes":[{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/api/contact","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/api/contact-sales","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact-sales","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact-sales\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact-sales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact-sales.ts","pathname":"/api/contact-sales","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/api/get-started","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/get-started","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-started\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-started","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-started.ts","pathname":"/api/get-started","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/careers/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/careers","isIndex":false,"type":"page","pattern":"^\\/careers\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/careers.astro","pathname":"/careers","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/pricing/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/biofred/Documents/Dev/marketing-site/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://newwebsite.biosked.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/biofred/Documents/Dev/marketing-site/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/biofred/Documents/Dev/marketing-site/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/biofred/Documents/Dev/marketing-site/src/pages/careers.astro",{"propagation":"none","containsHead":true}],["/Users/biofred/Documents/Dev/marketing-site/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/biofred/Documents/Dev/marketing-site/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/biofred/Documents/Dev/marketing-site/src/pages/pricing.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/api/contact-sales@_@ts":"pages/api/contact-sales.astro.mjs","\u0000@astro-page:src/pages/api/get-started@_@ts":"pages/api/get-started.astro.mjs","\u0000@astro-page:src/pages/careers@_@astro":"pages/careers.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_DEZU_c3W.mjs","/Users/biofred/Documents/Dev/marketing-site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C7OhdBDp.mjs","@/components/sections/GetStartedModal":"_astro/GetStartedModal.DzRcUipD.js","@/components/sections/ContactSalesModal.tsx":"_astro/ContactSalesModal.DWEQXvmn.js","/Users/biofred/Documents/Dev/marketing-site/src/components/sections/TestimonialsCarouselSection":"_astro/TestimonialsCarouselSection.DX1JlvuI.js","/Users/biofred/Documents/Dev/marketing-site/src/components/sections/PricingCards.tsx":"_astro/PricingCards.BUz1TOM3.js","/Users/biofred/Documents/Dev/marketing-site/src/components/sections/FAQAccordion.tsx":"_astro/FAQAccordion.DbNuBAim.js","@/components/layout/DesktopNav":"_astro/DesktopNav.Dkvg7EMa.js","@/components/layout/NavbarActions":"_astro/NavbarActions.CATVeU60.js","@astrojs/react/client.js":"_astro/client.BMLm8bxW.js","/Users/biofred/Documents/Dev/marketing-site/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.Xl5v_BD-.js","/Users/biofred/Documents/Dev/marketing-site/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.CuafiUAN.js","/Users/biofred/Documents/Dev/marketing-site/src/components/elements/NavigationProvider.astro?astro&type=script&index=0&lang.ts":"_astro/NavigationProvider.astro_astro_type_script_index_0_lang.8V9HAiRt.js","astro:scripts/page.js":"_astro/page.BT_9kWGp.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/biofred/Documents/Dev/marketing-site/src/pages/contact.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"contact-form\"),e=document.getElementById(\"submit-btn\"),n=document.getElementById(\"success-message\"),t=document.getElementById(\"error-message\");s?.addEventListener(\"submit\",async c=>{c.preventDefault(),e.disabled=!0,e.textContent=\"Sending...\",n?.classList.add(\"hidden\"),t?.classList.add(\"hidden\");try{const o=new FormData(s),a=await fetch(\"/api/contact\",{method:\"POST\",body:o}),d=await a.json();a.ok&&d.success?(n?.classList.remove(\"hidden\"),s.classList.add(\"hidden\"),n?.scrollIntoView({behavior:\"smooth\",block:\"nearest\"})):(t?.classList.remove(\"hidden\"),t.querySelector(\"p\").textContent=d.error||\"Something went wrong. Please try again.\")}catch{t?.classList.remove(\"hidden\")}finally{e.disabled=!1,e.textContent=\"Send Message\"}});"],["/Users/biofred/Documents/Dev/marketing-site/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const o=document.getElementById(\"see-how-it-works-btn\"),r=document.getElementById(\"hero-media-container\"),d=document.getElementById(\"hero-image\"),t=document.getElementById(\"hero-video\");if(o&&r&&d&&t){let n=!1;o.addEventListener(\"click\",()=>{r.scrollIntoView({behavior:\"smooth\",block:\"center\"}),setTimeout(()=>{if(!n){const e=document.createElement(\"iframe\");e.className=\"w-full h-full rounded-lg\",e.src=\"https://www.youtube.com/embed/dOJKj9qX1ro?autoplay=1&muted=0&rel=0\",e.title=\"How It Works\",e.setAttribute(\"frameborder\",\"0\"),e.setAttribute(\"allow\",\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"),e.setAttribute(\"allowfullscreen\",\"\"),t.appendChild(e),n=!0}d.classList.add(\"hidden\"),t.classList.remove(\"hidden\")},300)})}});"],["/Users/biofred/Documents/Dev/marketing-site/src/components/elements/NavigationProvider.astro?astro&type=script&index=0&lang.ts","function h(){return document.querySelector(\"[data-navigation-provider]\")?.getAttribute(\"data-current-path\")||\"/\"}function l(t){const i=t.target.closest(\"a\");if(!i)return;const n=i.getAttribute(\"href\");if(!n)return;const e=new URL(n,window.location.origin),s=e.pathname===window.location.pathname&&e.hash,c=n.startsWith(\"/#\")||n.startsWith(\"#\");if(s||c){t.preventDefault();const d=e.hash.slice(1),r=document.getElementById(d);r&&(r.scrollIntoView({behavior:\"smooth\",block:\"start\"}),e.hash&&window.history.pushState(null,\"\",e.hash))}}document.addEventListener(\"click\",l);function a(){const t=window.location.hash;t&&setTimeout(()=>{const o=document.getElementById(t.slice(1));o&&o.scrollIntoView({behavior:\"smooth\",block:\"start\"})},100)}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",a):a();document.addEventListener(\"astro:page-load\",a);typeof window<\"u\"&&(window.__navigationContext={getCurrentPath:h});"]],"assets":["/_astro/page.BT_9kWGp.js","/file:///Users/biofred/Documents/Dev/marketing-site/dist/404.html","/file:///Users/biofred/Documents/Dev/marketing-site/dist/about/index.html","/file:///Users/biofred/Documents/Dev/marketing-site/dist/api/contact","/file:///Users/biofred/Documents/Dev/marketing-site/dist/api/contact-sales","/file:///Users/biofred/Documents/Dev/marketing-site/dist/api/get-started","/file:///Users/biofred/Documents/Dev/marketing-site/dist/careers/index.html","/file:///Users/biofred/Documents/Dev/marketing-site/dist/contact/index.html","/file:///Users/biofred/Documents/Dev/marketing-site/dist/pricing/index.html","/file:///Users/biofred/Documents/Dev/marketing-site/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"ZjB5ihjAq5xaWt1XqgG03yk/SDtOUkJ5tCItbQLMYuA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
