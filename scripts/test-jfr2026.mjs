import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { JFR2026, SESSIONS, SOURCES, VALEUR_AUCUNE, sessionsPubliees } from '../src/data/jfr2026.mjs';
import {
  buildIcs,
  buildJfrSubmission,
  countPlaces,
  preselectedFromSearch,
  seatStatus,
  slugFromValue,
  sourceFromSearch,
  splitSelection,
  statusLabel,
} from '../src/lib/jfr2026.mjs';

// Catalogue
const slugs = SESSIONS.map((s) => s.slug);
assert.equal(new Set(slugs).size, slugs.length, 'slugs uniques');
for (const s of SESSIONS) {
  assert.equal(slugFromValue(s.valeurHubspot), s.slug, `${s.slug}: la valeur HubSpot commence par l'heure de début`);
  assert.match(s.debut, /^\d{2}:\d{2}$/);
  assert.ok(s.fin > s.debut, `${s.slug}: fin après début`);
}
const publicText = JSON.stringify(sessionsPubliees()) + readFileSync(new URL('../src/pages/fr/jfr-2026/index.astro', import.meta.url), 'utf8');
for (const word of [/doctolib/i, /\binstance/i, /\bticket/i]) {
  assert.doesNotMatch(publicText, word, `texte public sans ${word}`);
}
assert.doesNotMatch(readFileSync(new URL('../src/data/jfr2026.mjs', import.meta.url), 'utf8'), /doctolib/i, 'catalogue sans nom de partenaire');

// Places
assert.deepEqual(seatStatus(undefined, JFR2026), { etat: 'inconnu', restantes: null });
assert.deepEqual(seatStatus({ inscrits: 0 }, JFR2026), { etat: 'ouvert', restantes: 28 });
assert.deepEqual(seatStatus({ inscrits: 18 }, JFR2026), { etat: 'dernieres', restantes: 10 });
assert.deepEqual(seatStatus({ inscrits: 27 }, JFR2026), { etat: 'dernieres', restantes: 1 });
assert.deepEqual(seatStatus({ inscrits: 28 }, JFR2026), { etat: 'complet', restantes: 0 });
assert.deepEqual(seatStatus({ inscrits: 3, ferme: true }, JFR2026), { etat: 'complet', restantes: 0 });
assert.equal(statusLabel({ etat: 'dernieres', restantes: 1 }), 'Plus qu’une place');
assert.equal(statusLabel({ etat: 'complet', restantes: 0 }), 'Complet, liste d’attente');
assert.deepEqual(splitSelection(['s0915', 's1000'], { s1000: { etat: 'complet' } }), { inscrire: ['s0915'], attente: ['s1000'] });

// Liens
assert.equal(sourceFromSearch('?src=leo', SOURCES, 'lien_direct'), 'invitation_leo');
assert.equal(sourceFromSearch('?src=inconnu', SOURCES, 'lien_direct'), 'lien_direct');
assert.equal(sourceFromSearch('?src=constructor', SOURCES, 'lien_direct'), 'lien_direct');
assert.deepEqual(preselectedFromSearch('?session=s0915,s1100,zzz', SESSIONS), ['s0915']);

// Envoi HubSpot
const now = new Date('2026-09-21T06:30:00Z');
const values = { firstname: ' Ada ', lastname: 'Test', email: 'ada@example.org', company: 'CHU', jobtitle: 'Cadre', phone: '' };
const payload = buildJfrSubmission({ values, sessions: SESSIONS, inscrire: ['s0915', 's1715'], attente: [], source: 'newsletter', sujet: 'Gardes', aucune: VALEUR_AUCUNE, now, pageUri: 'https://biosked.com/fr/jfr-2026/' });
const field = (p, name) => p.fields.find((f) => f.name === name)?.value;
assert.equal(field(payload, 'firstname'), 'Ada');
assert.equal(field(payload, 'phone'), undefined, 'champ vide non envoyé');
assert.equal(field(payload, 'jfr26_sessions'), '09:15 Congés et absences;17:15 Champ ouvert');
assert.equal(field(payload, 'jfr26_liste_attente'), 'Aucune', 'liste vide envoyée comme Aucune pour effacer');
assert.equal(field(payload, 'jfr26_annulation'), 'false');
assert.equal(field(payload, 'jfr26_sujet_champ_ouvert'), 'Gardes');
assert.equal(field(payload, 'jfr26_date_inscription'), '2026-09-21T06:30:00.000Z');
assert.equal(payload.submittedAt, String(now.getTime()));
assert.ok(payload.fields.every((f) => f.objectTypeId === '0-1'));
const cancel = buildJfrSubmission({ values, sessions: SESSIONS, inscrire: ['s0915'], source: 'lien_direct', annulation: true, sujet: 'x', aucune: VALEUR_AUCUNE, now });
assert.equal(field(cancel, 'jfr26_sessions'), 'Aucune');
assert.equal(field(cancel, 'jfr26_annulation'), 'true');
assert.equal(field(cancel, 'jfr26_sujet_champ_ouvert'), undefined);

// Agenda
const ics = buildIcs(SESSIONS[0], JFR2026, now);
assert.match(ics, /DTSTART:20261009T071500Z\r\n/, '09:15 à Paris = 07:15 UTC le 9 octobre');
assert.match(ics, /DTEND:20261009T080000Z\r\n/);
assert.match(ics, /LOCATION:Palais des congrès de Paris\\, salle 203/);
assert.ok(ics.endsWith('END:VCALENDAR\r\n'));

// Compteur
const options = [...SESSIONS.map((s) => ({ value: s.valeurHubspot, hidden: s.slug === 's1415' })), { value: 'Aucune', hidden: false }];
const contacts = [
  { properties: { jfr26_sessions: '09:15 Congés et absences;10:00 Compteurs d’heures', jfr26_liste_attente: 'Aucune', jfr26_source: 'newsletter', jfr26_date_inscription: '2026-09-21T06:00:00.000Z', jfr26_annulation: 'false' } },
  { properties: { jfr26_sessions: 'Aucune', jfr26_liste_attente: '09:15 Congés et absences', jfr26_source: 'invitation_leo', jfr26_date_inscription: '2026-09-19T06:00:00.000Z', jfr26_annulation: 'false' } },
  { properties: { jfr26_sessions: '09:15 Congés et absences', jfr26_liste_attente: 'Aucune', jfr26_source: 'lien_direct', jfr26_annulation: 'true' } },
  { properties: { jfr26_sessions: '16:00 Session inconnue', jfr26_source: 'autre_chose' } },
];
const c = countPlaces(contacts, options, { now: now.getTime(), sources: ['newsletter', 'invitation_leo', 'invitation_sarah', 'lien_direct'] });
assert.equal(c.sessions.s0915.inscrits, 1);
assert.equal(c.sessions.s0915.attente, 1);
assert.equal(c.sessions.s1000.inscrits, 1);
assert.equal(c.sessions.s1415.ferme, true);
assert.equal(c.personnes, 2);
assert.equal(c.annulations, 1);
assert.equal(c.dernieres_24h, 1);
assert.deepEqual(c.par_source, { newsletter: 1, invitation_leo: 1, invitation_sarah: 0, lien_direct: 0, autre: 0 });
assert.equal(Object.keys(c.sessions).includes('s1600'), false);

console.log(`JFR 2026 checks passed: ${SESSIONS.length} sessions, ${sessionsPubliees().length} published.`);
