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
    titre: 'Congés et absences : construire une politique qui tient dans le temps',
    description: 'Types d’absence, règles de validation, quotas et équité entre praticiens, y compris sur des plateaux mutualisés.',
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
    titre: 'Compteurs d’heures : supplémentaires, majorées, et ce qui a changé',
    description: 'Les compteurs, l’évolution du calcul et les majorations des heures.',
    public: 'Responsables planning, cadres, RH et paie',
    valeurHubspot: '10:00 Compteurs d’heures',
    publiee: true,
  },
  {
    slug: 's1100',
    debut: '11:00',
    fin: '12:00',
    duree: '1 h',
    format: 'Aperçu produit',
    titre: 'Gestion du temps de travail : nouveautés et innovations',
    description: 'Les évolutions de la gestion du temps de travail dans Momentum, et un temps pour recueillir vos retours.',
    public: 'Responsables planning, RH',
    valeurHubspot: '11:00 Nouveautés et innovations GTT',
    publiee: true,
  },
  {
    slug: 's1330',
    debut: '13:30',
    fin: '14:15',
    duree: '45 min',
    format: 'Formation',
    titre: 'La nouvelle vue par date : plannings et gestion des requêtes',
    description: 'Construire vos plannings dans la vue par date, traiter les requêtes et la pré-approbation.',
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
    titre: 'Duplication de planning ou trame type : quel outil, quel usage',
    description: 'La duplication intelligente de la vue par date face aux roulements et aux cycles de travail, et quand choisir l’une ou l’autre.',
    public: 'Responsables planning',
    valeurHubspot: '14:15 Duplication ou trame type',
    publiee: true,
  },
  {
    slug: 's1515',
    debut: '15:15',
    fin: '15:45',
    duree: '30 min',
    format: 'Tutoriel',
    titre: 'Vues, filtres et exports : sortir la bonne information',
    description: 'Vues, filtres et exports pour la paie et le pilotage, y compris la CME et le temps de travail additionnel.',
    public: 'Responsables planning, direction',
    valeurHubspot: '15:15 Vues, filtres et exports',
    publiee: true,
  },
  {
    slug: 's1600',
    debut: '16:00',
    fin: '17:00',
    duree: '1 h',
    format: 'Avec Doctolib',
    titre: 'Doctolib : journées types et prise de rendez-vous',
    description: 'Vos journées types Momentum alimentent les créneaux de rendez-vous dans Doctolib. Session présentée avec l’équipe Doctolib. Disponible en pilote.',
    public: 'Responsables planning, secrétariat, direction',
    valeurHubspot: '16:00 Doctolib et journées types',
    publiee: true,
    logo: { src: '/images/partners/doctolib-logo.svg', alt: 'Doctolib' },
  },
  {
    slug: 's1700',
    debut: '17:00',
    fin: '17:20',
    duree: '20 min',
    format: 'Tutoriel',
    titre: 'La nouvelle application mobile : plannings et congés en quelques gestes',
    description: 'Les filtres par défaut et plusieurs demandes de congés en une seule fois.',
    public: 'Tout public',
    valeurHubspot: '17:00 Application mobile',
    publiee: true,
  },
];

export const TEMPS_COMMUNS = [
  { debut: '09:00', fin: '09:15', titre: 'Accueil' },
  { debut: '10:45', fin: '11:00', titre: 'Pause' },
  { debut: '12:00', fin: '13:30', titre: 'Pause' },
  { debut: '15:00', fin: '15:15', titre: 'Pause' },
  { debut: '15:45', fin: '16:00', titre: 'Pause' },
];

export const sessionsPubliees = () => SESSIONS.filter((s) => s.publiee);
