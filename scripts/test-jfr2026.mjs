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
for (const word of [/\binstance/i, /\bticket/i]) {
  assert.doesNotMatch(publicText, word, `texte public sans ${word}`);
}
const doctolib = SESSIONS.find((x) => /doctolib/i.test(x.titre));
assert.ok(doctolib?.publiee && doctolib.logo?.src && doctolib.debut === '16:00' && doctolib.fin === '17:00', 'session Doctolib publiée, 16:00 à 17:00, avec logo');

// Places
assert.deepEqual(seatStatus(undefined, JFR2026), { etat: 'inconnu', restantes: null });
assert.deepEqual(seatStatus({ inscrits: 0 }, JFR2026), { etat: 'ouvert', restantes: 28 });
assert.deepEqual(seatStatus({ inscrits: 18 }, JFR2026), { etat: 'dernieres', restantes: 10 });
assert.deepEqual(seatStatus({ inscrits: 27 }, JFR2026), { etat: 'dernieres', restantes: 1 });
assert.deepEqual(seatStatus({ inscrits: 28 }, JFR2026), { etat: 'complet', restantes: 0 });
assert.deepEqual(seatStatus({ inscrits: 3, ferme: true }, JFR2026), { etat: 'complet', restantes: 0 });
assert.equal(statusLabel({ etat: 'dernieres', restantes: 1 }), '1 place restante');
assert.equal(statusLabel({ etat: 'ouvert', restantes: 28 }), '28 places restantes');
assert.equal(statusLabel({ etat: 'complet', restantes: 0 }), 'Complet, liste d’attente');
assert.deepEqual(splitSelection(['s0915', 's1000'], { s1000: { etat: 'complet' } }), { inscrire: ['s0915'], attente: ['s1000'] });

// Liens
assert.equal(sourceFromSearch('?src=leo', SOURCES, 'lien_direct'), 'invitation_leo');
assert.equal(sourceFromSearch('?src=inconnu', SOURCES, 'lien_direct'), 'lien_direct');
assert.equal(sourceFromSearch('?src=constructor', SOURCES, 'lien_direct'), 'lien_direct');
assert.deepEqual(preselectedFromSearch('?session=s0915,s1145,zzz', SESSIONS), ['s0915']);

// Envoi HubSpot
const now = new Date('2026-09-21T06:30:00Z');
const values = { firstname: ' Ada ', lastname: 'Test', email: 'ada@example.org', company: 'CHU', jobtitle: 'Cadre', phone: '' };
const payload = buildJfrSubmission({ values, sessions: SESSIONS, inscrire: ['s0915', 's1700'], attente: [], source: 'newsletter', sujet: 'Gardes', aucune: VALEUR_AUCUNE, now, pageUri: 'https://biosked.com/fr/jfr-2026/' });
const field = (p, name) => p.fields.find((f) => f.name === name)?.value;
assert.equal(field(payload, 'firstname'), 'Ada');
assert.equal(field(payload, 'phone'), undefined, 'champ vide non envoyé');
assert.equal(field(payload, 'jfr26_sessions'), '09:15 Congés et absences;17:00 Application mobile');
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
assert.equal(field(cancel, 'jfr26_source'), undefined, 'une annulation ne remplace pas la source');
const untagged = buildJfrSubmission({ values, sessions: SESSIONS, inscrire: ['s0915'], source: '', aucune: VALEUR_AUCUNE, now });
assert.equal(field(untagged, 'jfr26_source'), undefined, 'lien sans source : la source d’origine est conservée');

// Agenda
const ics = buildIcs(SESSIONS[0], JFR2026, now);
assert.match(ics, /DTSTART:20261009T071500Z\r\n/, '09:15 à Paris = 07:15 UTC le 9 octobre');
assert.match(ics, /DTEND:20261009T080000Z\r\n/);
assert.match(ics, /LOCATION:Palais des congrès de Paris\\, salle 203/);
assert.ok(ics.endsWith('END:VCALENDAR\r\n'));
const icsSpecial = buildIcs({ ...SESSIONS[0], titre: 'A; B, C' }, { ...JFR2026, lieu: 'L; M' }, now);
assert.match(icsSpecial, /SUMMARY:.*A\\; B\\, C\r\n/, 'point-virgule et virgule échappés dans le titre');
assert.match(icsSpecial, /LOCATION:L\\; M\r\n/, 'point-virgule échappé dans le lieu');

// Compteur
const options = [...SESSIONS.map((s) => ({ value: s.valeurHubspot, hidden: s.slug === 's1415' })), { value: 'Aucune', hidden: false }];
const contacts = [
  { properties: { jfr26_sessions: '09:15 Congés et absences;10:00 Compteurs d’heures', jfr26_liste_attente: 'Aucune', jfr26_source: 'newsletter', jfr26_date_inscription: '2026-09-21T06:00:00.000Z', jfr26_annulation: 'false' } },
  { properties: { jfr26_sessions: 'Aucune', jfr26_liste_attente: '09:15 Congés et absences', jfr26_source: 'invitation_leo', jfr26_date_inscription: '2026-09-19T06:00:00.000Z', jfr26_annulation: 'false' } },
  { properties: { jfr26_sessions: '09:15 Congés et absences', jfr26_liste_attente: 'Aucune', jfr26_source: 'lien_direct', jfr26_annulation: 'true' } },
  { properties: { jfr26_sessions: '19:00 Session inconnue', jfr26_source: 'autre_chose' } },
  { properties: { jfr26_sessions: '14:15 Copier-coller intelligent ou roulements', jfr26_annulation: 'false' } },
];
const c = countPlaces(contacts, options, { now: now.getTime(), sources: ['newsletter', 'invitation_leo', 'invitation_sarah', 'lien_direct'] });
assert.equal(c.sessions.s0915.inscrits, 1);
assert.equal(c.sessions.s0915.attente, 1);
assert.equal(c.sessions.s1000.inscrits, 1);
assert.equal(c.sessions.s1415.ferme, true);
assert.equal(c.personnes, 3);
assert.equal(c.annulations, 1);
assert.equal(c.dernieres_24h, 1);
assert.deepEqual(c.par_source, { newsletter: 1, invitation_leo: 1, invitation_sarah: 0, lien_direct: 1, autre: 0 }, 'source vide comptée comme lien direct');
assert.equal(c.sessions.s1415.inscrits, 1);
assert.equal(c.sessions.s1600.inscrits, 0, '16:00 option exists, nobody registered in the fixture');

console.log(`JFR 2026 checks passed: ${SESSIONS.length} sessions, ${sessionsPubliees().length} published.`);
