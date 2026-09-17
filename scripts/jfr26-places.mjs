#!/usr/bin/env node
// Compteur de places de la journée clients JFR 2026.
// Lit HubSpot avec une clé en lecture seule (HUBSPOT_TOKEN) et écrit sur la
// sortie standard un JSON de chiffres seuls, sans aucune donnée personnelle.
// Lancé toutes les 5 minutes par .github/workflows/jfr26-places.yml.

import { countPlaces } from '../src/lib/jfr2026.mjs';

const API = 'https://api.hubapi.com';
const TOKEN = process.env.HUBSPOT_TOKEN;
const CAPACITE = 30;
const SEUIL_COMPLET = 28;
const FIN = Date.parse('2026-10-16T23:59:59+02:00');
const SOURCES = ['newsletter', 'invitation_leo', 'invitation_sarah', 'lien_direct'];
const PROPERTIES = ['jfr26_sessions', 'jfr26_liste_attente', 'jfr26_source', 'jfr26_date_inscription', 'jfr26_annulation'];

if (Date.now() > FIN) {
  console.error('Inscriptions closes : rien à compter.');
  process.exit(0);
}
if (!TOKEN) {
  console.error('HUBSPOT_TOKEN manquant.');
  process.exit(1);
}

async function hubspot(path, init = {}, attempt = 1) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  if ((response.status === 429 || response.status >= 500) && attempt < 4) {
    await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    return hubspot(path, init, attempt + 1);
  }
  if (!response.ok) throw new Error(`HubSpot ${response.status} on ${path}`);
  return response.json();
}

const property = await hubspot('/crm/v3/properties/contacts/jfr26_sessions');
const contacts = [];
let after;
do {
  const page = await hubspot('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [
        { filters: [{ propertyName: 'jfr26_sessions', operator: 'HAS_PROPERTY' }] },
        { filters: [{ propertyName: 'jfr26_liste_attente', operator: 'HAS_PROPERTY' }] },
      ],
      properties: PROPERTIES,
      limit: 100,
      ...(after ? { after } : {}),
    }),
  });
  contacts.push(...page.results);
  after = page.paging?.next?.after;
  if (after) await new Promise((resolve) => setTimeout(resolve, 250));
} while (after);

const counts = countPlaces(contacts, property.options ?? [], { now: Date.now(), sources: SOURCES });
process.stdout.write(
  `${JSON.stringify({ maj: new Date().toISOString(), capacite: CAPACITE, seuil_complet: SEUIL_COMPLET, ...counts }, null, 1)}\n`,
);
