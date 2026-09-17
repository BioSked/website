// Journée clients Momentum aux JFR 2026 : catalogue unique des sessions.
// Une session n'apparaît sur la page que lorsque `publiee` vaut true.
// `valeurHubspot` doit rester identique à l'option de la propriété HubSpot
// jfr26_sessions (et jfr26_liste_attente) : c'est la valeur enregistrée.

export const JFR2026 = {
  titre: 'Journée clients Momentum',
  dateLongue: 'Vendredi 9 octobre 2026',
  dateIso: '2026-10-09',
  decalageUtc: '+02:00',
  lieu: 'Palais des congrès de Paris, salle 203',
  capacite: 30,
  seuilComplet: 28,
  hubspot: {
    portalId: '25195055',
    formId: '5258afc1-36fa-4529-b0d9-6d0554e47800',
    endpoint: 'https://api-eu1.hsforms.com/submissions/v3/integration/submit/25195055/',
  },
  placesUrl: 'https://raw.githubusercontent.com/BioSked/website/jfr26-places/places.json',
  pageUrl: 'https://biosked.com/fr/jfr-2026/',
  inscriptionsCloses: false,
};

// Paramètre ?src= des liens d'invitation, vers la valeur de jfr26_source.
export const SOURCES = {
  newsletter: 'newsletter',
  leo: 'invitation_leo',
  sarah: 'invitation_sarah',
};
export const SOURCE_PAR_DEFAUT = 'lien_direct';

// Valeur envoyée quand une liste est vide : un formulaire HubSpot n'efface
// jamais une propriété avec une valeur vide.
export const VALEUR_AUCUNE = 'Aucune';

export const SESSIONS = [
  {
    slug: 's0915',
    debut: '09:15',
    fin: '10:00',
    duree: '45 min',
    format: 'Formation',
    titre: 'Congés et absences : des règles claires et équitables',
    description: 'Paramétrer les types d’absence, la validation et les quotas, y compris sur plusieurs sites.',
    public: 'Responsables planning, direction, RH',
    valeurHubspot: '09:15 Congés et absences',
    publiee: true,
  },
  {
    slug: 's1000',
    debut: '10:00',
    fin: '10:45',
    duree: '45 min',
    format: 'Formation',
    titre: 'Heures, gardes et astreintes : des compteurs justes',
    description: 'Comment Momentum calcule les heures et les majorations, et ce qui a changé cette année.',
    public: 'Responsables planning, RH et paie',
    valeurHubspot: '10:00 Compteurs d’heures',
    publiee: true,
  },
  {
    slug: 's1100',
    debut: '11:00',
    fin: '11:45',
    duree: '45 min',
    format: 'Nouvelles fonctionnalités',
    titre: 'Les nouveautés 2026 de Momentum',
    description: 'Nouvelle vue par date, application mobile, compteurs, centre d’aide : ce qui est disponible aujourd’hui.',
    public: 'Tout public',
    valeurHubspot: '11:00 Nouveautés 2026',
    publiee: true,
  },
  {
    slug: 's1145',
    debut: '11:45',
    fin: '12:15',
    duree: '30 min',
    format: 'Nouvelles fonctionnalités',
    titre: 'Pointage : la suite',
    description: 'L’équipe produit présente la direction prise pour le pointage sur mobile et sur le Web.',
    public: 'Tout public',
    valeurHubspot: '11:45 Innovation GTT',
    publiee: false,
  },
  {
    slug: 's1330',
    debut: '13:30',
    fin: '14:15',
    duree: '45 min',
    format: 'Formation',
    titre: 'La vue par date : plannings et demandes au même endroit',
    description: 'Construire vos plannings et valider les demandes plus vite, avec la pré-approbation.',
    public: 'Responsables planning, secrétariat',
    valeurHubspot: '13:30 Nouvelle vue par date',
    publiee: true,
  },
  {
    slug: 's1415',
    debut: '14:15',
    fin: '15:00',
    duree: '45 min',
    format: 'Atelier',
    titre: 'Copier-coller ou roulements : le bon outil pour chaque planning',
    description: 'Deux façons de préparer vos plannings récurrents, et quand choisir l’une ou l’autre.',
    public: 'Responsables planning',
    valeurHubspot: '14:15 Copier-coller intelligent ou roulements',
    publiee: true,
  },
  {
    slug: 's1515',
    debut: '15:15',
    fin: '15:45',
    duree: '30 min',
    format: 'Tutoriel',
    titre: 'Exports : la bonne information pour la paie et le pilotage',
    description: 'Vues, filtres et exports, y compris pour la CME et le temps de travail additionnel.',
    public: 'Responsables planning, direction',
    valeurHubspot: '15:15 Vues, filtres et exports',
    publiee: true,
  },
  {
    slug: 's1600',
    debut: '16:00',
    fin: '16:25',
    duree: '25 min',
    format: 'Tutoriel',
    titre: 'L’application mobile : plannings et congés en quelques gestes',
    description: 'Les filtres par défaut et plusieurs demandes de congés en une seule fois.',
    public: 'Tout public',
    valeurHubspot: '16:00 Application mobile',
    publiee: true,
  },
  {
    slug: 's1630',
    debut: '16:30',
    fin: '17:15',
    duree: '45 min',
    format: 'Avec Doctolib',
    titre: 'Doctolib : vos plannings publiés automatiquement, sans ressaisie',
    description: 'Vos journées types Momentum alimentent les créneaux de rendez-vous dans Doctolib. Session présentée avec l’équipe Doctolib. Disponible en pilote.',
    public: 'Responsables planning, secrétariat, direction',
    valeurHubspot: '16:30 Doctolib et journées types',
    publiee: true,
    logo: { src: '/images/partners/doctolib-logo.svg', alt: 'Doctolib' },
  },
  {
    slug: 's1715',
    debut: '17:15',
    fin: '18:30',
    duree: '1 h 15',
    format: 'Échange',
    titre: 'Vos questions, en direct sur vos plannings',
    description: 'Venez avec votre sujet : nous le traitons avec vous, en rendez-vous individuel ou en petit groupe.',
    public: 'Tout public',
    valeurHubspot: '17:15 Champ ouvert',
    publiee: true,
    sujetLibre: true,
  },
];

export const TEMPS_COMMUNS = [
  { debut: '09:00', fin: '09:15', titre: 'Accueil' },
  { debut: '12:15', fin: '13:30', titre: 'Pause déjeuner' },
];

export const sessionsPubliees = () => SESSIONS.filter((s) => s.publiee);
