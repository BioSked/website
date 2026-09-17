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
    formId: '',
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
    description:
      'Types d’absence, règles de validation, quotas et équité entre praticiens, y compris sur les plateaux techniques partagés entre plusieurs sites.',
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
    description:
      'Le fonctionnement des compteurs et l’évolution du calcul, avec un focus sur les majorations de garde, d’astreinte et de permanence des soins en imagerie.',
    public: 'Responsables planning, cadres, gestionnaires RH et paie',
    valeurHubspot: '10:00 Compteurs d’heures',
    publiee: true,
  },
  {
    slug: 's1100',
    debut: '11:00',
    fin: '11:45',
    duree: '45 min',
    format: 'Aperçu produit',
    titre: 'Le pointage dans Momentum',
    description:
      'Ce que Momentum permet aujourd’hui pour le suivi du temps de présence, et la direction prise pour le pointage sur mobile et sur le Web.',
    public: 'Responsables planning, RH',
    valeurHubspot: '11:00 Pointage mobile et Web',
    publiee: false,
  },
  {
    slug: 's1145',
    debut: '11:45',
    fin: '12:15',
    duree: '30 min',
    format: 'Tout public',
    titre: 'Innovation dans le domaine de la GTT',
    description:
      'L’équipe produit présente ses orientations sur les congés, les compteurs et le pointage.',
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
    titre: 'La nouvelle vue par date : plannings et gestion des requêtes',
    description:
      'Construire et ajuster les plannings dans la nouvelle vue par date, et traiter les requêtes avec la pré-approbation.',
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
    titre: 'Copier-coller intelligent ou roulements : quel outil pour quel usage',
    description:
      'La différence entre le copier-coller intelligent de la nouvelle vue par date et les roulements et cycles de travail, et quand utiliser l’un plutôt que l’autre.',
    public: 'Responsables planning',
    valeurHubspot: '14:15 Copier-coller intelligent ou roulements',
    publiee: true,
  },
  {
    slug: 's1515',
    debut: '15:15',
    fin: '15:45',
    duree: '30 min',
    format: 'Formation',
    titre: 'Vues, filtres et exports : sortir la bonne information',
    description:
      'Construire ses vues, les filtrer et extraire les données utiles à la paie et au pilotage, y compris pour la CME ou le suivi du temps de travail additionnel des praticiens hospitaliers.',
    public: 'Responsables planning, direction',
    valeurHubspot: '15:15 Vues, filtres et exports',
    publiee: true,
  },
  {
    slug: 's1645',
    debut: '16:45',
    fin: '17:10',
    duree: '25 min',
    format: 'Tout public',
    titre: 'L’application mobile : filtres et demandes de congés multiples',
    description:
      'Les filtres par défaut dans l’application et le dépôt de plusieurs demandes de congés en une seule fois.',
    public: 'Tout public',
    valeurHubspot: '16:45 Application mobile',
    publiee: true,
  },
  {
    slug: 's1715',
    debut: '17:15',
    fin: '18:30',
    duree: '1 h 15',
    format: 'Clôture',
    titre: 'Champ ouvert : partage d’idées',
    description:
      'Venez avec votre sujet : nous le traitons en direct, sur vos plannings, en rendez-vous individuel ou en format libre selon l’affluence.',
    public: 'Tout public',
    valeurHubspot: '17:15 Champ ouvert',
    publiee: true,
    sujetLibre: true,
  },
];

export const TEMPS_COMMUNS = [
  { debut: '09:00', fin: '09:15', titre: 'Accueil et petit déjeuner' },
  { debut: '12:15', fin: '13:30', titre: 'Pause déjeuner' },
];

export const sessionsPubliees = () => SESSIONS.filter((s) => s.publiee);
