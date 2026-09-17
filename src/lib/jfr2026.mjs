// Logique pure de la page d'inscription JFR 2026 (testée par scripts/test-jfr2026.mjs).

const CONTACT = '0-1';

export function slugFromValue(value) {
  const match = /^(\d{2}):(\d{2})(?:\s|$)/.exec(String(value ?? '').trim());
  return match ? `s${match[1]}${match[2]}` : null;
}

export function seatStatus(entry, { seuilComplet }) {
  if (!entry || typeof entry.inscrits !== 'number') return { etat: 'inconnu', restantes: null };
  if (entry.ferme || entry.inscrits >= seuilComplet) return { etat: 'complet', restantes: 0 };
  const restantes = Math.max(0, seuilComplet - entry.inscrits);
  return { etat: restantes <= 10 ? 'dernieres' : 'ouvert', restantes };
}

export function statusLabel(status) {
  switch (status?.etat) {
    case 'ouvert':
      return 'Places disponibles';
    case 'dernieres':
      return status.restantes === 1 ? 'Plus qu’une place' : `Plus que ${status.restantes} places`;
    case 'complet':
      return 'Complet, liste d’attente';
    default:
      return '';
  }
}

/**
 * @param {string[]} selectedSlugs
 * @param {Record<string, { etat: string }>} [statuses]
 * @returns {{ inscrire: string[], attente: string[] }}
 */
export function splitSelection(selectedSlugs, statuses = {}) {
  /** @type {string[]} */
  const inscrire = [];
  /** @type {string[]} */
  const attente = [];
  for (const slug of selectedSlugs) {
    if (statuses[slug]?.etat === 'complet') attente.push(slug);
    else inscrire.push(slug);
  }
  return { inscrire, attente };
}

export function sourceFromSearch(search, sources, fallback) {
  const key = new URLSearchParams(search || '').get('src');
  return (key && Object.prototype.hasOwnProperty.call(sources, key) && sources[key]) || fallback;
}

export function preselectedFromSearch(search, sessions) {
  const raw = new URLSearchParams(search || '').get('session') || '';
  const published = new Set(sessions.filter((s) => s.publiee).map((s) => s.slug));
  return raw.split(',').map((s) => s.trim()).filter((s) => published.has(s));
}

/**
 * @param {{
 *   values: Record<string, string>,
 *   sessions: Array<{ slug: string, valeurHubspot: string }>,
 *   inscrire?: string[],
 *   attente?: string[],
 *   source?: string,
 *   annulation?: boolean,
 *   sujet?: string,
 *   aucune: string,
 *   now?: Date,
 *   pageUri?: string,
 *   pageName?: string,
 *   hutk?: string,
 * }} input
 */
export function buildJfrSubmission({
  values,
  sessions,
  inscrire = [],
  attente = [],
  source,
  annulation = false,
  sujet = '',
  aucune,
  now = new Date(),
  pageUri,
  pageName,
  hutk,
}) {
  if (!values || typeof values !== 'object') throw new TypeError('values must be an object');
  const bySlug = new Map(sessions.map((s) => [s.slug, s]));
  const join = (slugs) =>
    slugs.map((slug) => bySlug.get(slug)?.valeurHubspot).filter(Boolean).join(';') || aucune;

  const fields = [];
  const add = (name, value) => {
    const text = value == null ? '' : String(value).trim();
    if (text) fields.push({ objectTypeId: CONTACT, name, value: text });
  };
  for (const name of ['firstname', 'lastname', 'email', 'company', 'jobtitle', 'phone']) add(name, values[name]);
  add('jfr26_sessions', annulation ? aucune : join(inscrire));
  add('jfr26_liste_attente', annulation ? aucune : join(attente));
  add('jfr26_annulation', annulation ? 'true' : 'false');
  add('jfr26_source', source);
  add('jfr26_date_inscription', now.toISOString());
  if (!annulation) add('jfr26_sujet_champ_ouvert', sujet);

  const context = {};
  if (hutk) context.hutk = String(hutk);
  if (pageUri) context.pageUri = String(pageUri);
  if (pageName) context.pageName = String(pageName);
  return { submittedAt: String(now.getTime()), fields, context };
}

const icsText = (text) => String(text).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const icsDate = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

export function buildIcs(session, event, now = new Date()) {
  const start = new Date(`${event.dateIso}T${session.debut}:00${event.decalageUtc}`);
  const end = new Date(`${event.dateIso}T${session.fin}:00${event.decalageUtc}`);
  const title = session.titre.replace(/\u00a0/g, ' ');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BioSked//Journee clients JFR 2026//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:jfr2026-${session.slug}@biosked.com`,
    `DTSTAMP:${icsDate(now)}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsText(`Momentum, JFR 2026 : ${title}`)}`,
    `LOCATION:${icsText(event.lieu)}`,
    `DESCRIPTION:${icsText(`${event.titre}, ${event.dateLongue.toLowerCase()}. Pour modifier ou annuler : ${event.pageUrl}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

export function countPlaces(contacts, options, { now = Date.now(), sources = [] } = {}) {
  const sessions = {};
  for (const option of options) {
    const slug = slugFromValue(option.value);
    if (slug) sessions[slug] = { inscrits: 0, attente: 0, ferme: Boolean(option.hidden) };
  }
  const parSource = Object.fromEntries([...sources, 'autre'].map((s) => [s, 0]));
  let personnes = 0;
  let annulations = 0;
  let dernieres24h = 0;
  const split = (value) =>
    String(value ?? '').split(';').map((v) => slugFromValue(v)).filter((slug) => slug && sessions[slug]);

  for (const contact of contacts) {
    const p = contact.properties ?? contact;
    if (p.jfr26_annulation === 'true') {
      annulations += 1;
      continue;
    }
    const inscrit = [...new Set(split(p.jfr26_sessions))];
    const attente = [...new Set(split(p.jfr26_liste_attente))];
    if (inscrit.length === 0 && attente.length === 0) continue;
    personnes += 1;
    for (const slug of inscrit) sessions[slug].inscrits += 1;
    for (const slug of attente) sessions[slug].attente += 1;
    parSource[sources.includes(p.jfr26_source) ? p.jfr26_source : 'autre'] += 1;
    const t = Date.parse(p.jfr26_date_inscription ?? '');
    if (Number.isFinite(t) && now - t >= 0 && now - t < 86_400_000) dernieres24h += 1;
  }
  return { sessions, personnes, annulations, dernieres_24h: dernieres24h, par_source: parSource };
}
