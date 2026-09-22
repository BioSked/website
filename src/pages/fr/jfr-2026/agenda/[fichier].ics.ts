// Fichiers agenda de la journée clients JFR 2026 : un par session, plus la journée entière.
// Servis en statique pour être liés depuis la page et depuis l'e-mail de confirmation.
import type { APIRoute } from 'astro';
import { JFR2026, sessionsPubliees } from '@/data/jfr2026.mjs';
import { buildIcs } from '@/lib/jfr2026.mjs';

const REFERENCE = new Date('2026-09-22T00:00:00Z');

function journee() {
  const sessions = sessionsPubliees();
  const debut = sessions[0].debut;
  const fin = sessions[sessions.length - 1].fin;
  return buildIcs(
    {
      slug: 'journee',
      debut,
      fin,
      titre: `${JFR2026.titre}, la journée entière`,
    },
    JFR2026,
    REFERENCE,
  );
}

export function getStaticPaths() {
  return [
    ...sessionsPubliees().map((s: { slug: string }) => ({ params: { fichier: s.slug } })),
    { params: { fichier: 'journee' } },
  ];
}

export const GET: APIRoute = ({ params }) => {
  const fichier = params.fichier as string;
  const session = sessionsPubliees().find((s: { slug: string }) => s.slug === fichier);
  const body = session ? buildIcs(session, JFR2026, REFERENCE) : journee();
  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="momentum-jfr-2026-${fichier}.ics"`,
    },
  });
};
