export type FrenchLandingPage = {
  slug: string;
  type: "specialty" | "feature";
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  primaryPain: string;
  pains: string[];
  outcomes: string[];
  proof: string;
  related: Array<{ label: string; href: string }>;
  // Optional depth, added page by page from Oct 2026 (anesthesia first). The
  // template renders each block only when present, so thin pages keep their layout.
  painsHeading?: string;
  outcomesHeading?: string;
  quote?: { text: string; cite: string; href?: string };
  sections?: Array<{ heading: string; paragraphs: string[] }>;
  faq?: Array<{ q: string; a: string }>;
  resource?: { label: string; href: string };
};

export const specialtyPages: Record<string, FrenchLandingPage> = {
  radiologie: {
    slug: "radiologie",
    type: "specialty",
    eyebrow: "Radiologie",
    title: "Vacations, modalités, mutualisation : le planning des groupes d’imagerie",
    description:
      "Momentum construit les vacations par site et par modalité, applique vos règles de mutualisation et vos compteurs d’équité, et se couple à votre RIS. Les groupes d’imagerie français s’appuient dessus depuis plus de quinze ans.",
    metaTitle: "Planning radiologues multi-sites | Momentum BioSked",
    metaDescription:
      "Vacations par modalité, mutualisation multi-sites, remplacements, couplage RIS NGI : Momentum planifie les groupes d’imagerie français, avec des études de cas publiées.",
    primaryPain:
      "Répartir 30 ou 40 radiologues sur une dizaine de sites, entre scanner, IRM, mammographie et échographie, avec les gardes, les désidératas et les absences : sur un tableur, chaque version coûte des journées de travail et repose sur des arbitrages que personne ne peut retracer.",
    pains: [
      "construire les vacations par site et par modalité en mutualisant les effectifs",
      "reproposer un remplaçant compétent quand tombe une absence ou une panne de modalité",
      "tenir des compteurs d’équité opposables : gardes, week-ends, jours fériés, pénibilité",
      "coupler le planning au RIS, à la prise de rendez-vous et à la paie",
    ],
    outcomes: [
      "des propositions de remplacement quasi immédiates en cas d’aléa (IMALLIANCE-HDF, 34 radiologues sur 12 sites)",
      "3 générations de plannings par an au lieu d’une construction permanente (Les Cèdres, client depuis 2014)",
      "« le gain d’un ETP voire deux » via le trio Momentum–EasyDoct–Kelio (IMAGIR, étude de cas publiée)",
      "un couplage RIS NGI en production chez Les Cèdres et IMALLIANCE-HDF",
    ],
    proof:
      "IMALLIANCE-HDF (34 radiologues, 12 sites, RIS NGI), IRIS GRIM (45 radiologues, 13 sites nantais), Les Cèdres (client depuis 2014, pointage et couplage RIS NGI) et IMAGIR (Bordeaux, 9 sites, EasyDoct et Kelio/Bodet) documentent leurs résultats dans des études de cas publiées.",
    related: [
      { label: "Cas clients radiologie", href: "/fr/cas-clients/" },
      { label: "Gestion des requêtes", href: "/fr/fonctionnalites/gestion-des-requetes-des-equipes/" },
    ],
  },
  anesthesie: {
    slug: "anesthesie",
    type: "specialty",
    eyebrow: "Anesthésie-réanimation",
    title: "Le logiciel de planning des anesthésistes et des IADE",
    description: "Bloc opératoire, consultations, gardes, astreintes et repos de sécurité : Momentum tient le planning des médecins anesthésistes-réanimateurs et des IADE dans un seul outil et le génère selon vos règles. Quand le programme opératoire change, il propose des remplaçants au lieu de vous laisser repartir d’une page blanche.",
    metaTitle: "Logiciel de planning anesthésistes et IADE | Momentum",
    metaDescription: "Logiciel de planning pour anesthésistes et IADE : bloc opératoire, gardes, repos de sécurité, consultations et équité dans un seul outil. Plus de 250 organisations de santé utilisent Momentum.",
    primaryPain: "Un planning d’anesthésie relie deux populations, les médecins anesthésistes-réanimateurs (MAR) et les IADE, à un programme opératoire qui bouge chaque semaine : salles fermées faute de personnel, chirurgiens qui changent de bloc, absences de dernière minute. S’y ajoutent les consultations, les gardes, les astreintes et les repos de sécurité. Sur un tableur, le responsable y consacre souvent une vacation administrative par semaine, et le reste déborde sur son temps personnel.",
    painsHeading: "Ce qui rend le planning d’anesthésie difficile",
    pains: [
      "affecter MAR et IADE sur les salles selon les compétences et les spécialités chirurgicales",
      "enchaîner garde, descente de garde et repos de sécurité sans erreur",
      "répartir équitablement consultations, gardes, week-ends et jours fériés",
      "replanifier après une absence ou une fermeture de salle sans défaire l’équilibre du mois"
    ],
    outcomesHeading: "Ce que Momentum change pour le responsable du planning",
    outcomes: [
      "un seul planning pour le bloc, les consultations, les gardes et les astreintes, médecins et IADE compris",
      "les règles de repos de sécurité appliquées à la génération, avec une alerte si une modification manuelle les enfreint",
      "des compteurs de gardes, de consultations et de pénibilité consultables par toute l’équipe",
      "jusqu’à 90 % de temps de gestion des horaires en moins, mesuré aux urgences du CHIREC (étude de cas 2025)"
    ],
    sections: [
      {
        heading: "Un planning construit à partir du programme opératoire",
        paragraphs: [
          "Le planning d’anesthésie dépend de celui du bloc. Momentum part de vos trames de bloc : salles, vacations, chirurgiens et spécialités, avec les besoins en MAR et en IADE de chaque salle. Le planning des équipes se génère ensuite en tenant compte des compétences, des disponibilités, des désidératas et des règles du service.",
          "Une salle qui ferme, un chirurgien qui change de jour, une absence : Momentum propose des remplaçants compétents et disponibles pour les affectations touchées, et vous choisissez. Les vues par spécialité et les filtres d’affichage donnent une lecture rapide de la semaine de bloc, salle par salle."
        ]
      },
      {
        heading: "Gardes, astreintes et repos de sécurité dans le même planning",
        paragraphs: [
          "Garde sur place, astreinte, descente de garde : tout vit dans le même planning que l’activité de jour, pour les médecins comme pour les IADE. Plus de fichier de gardes à réconcilier avec le planning de bloc.",
          "Vos règles de repos de sécurité sont paramétrées une fois. Momentum les applique à la génération et vous alerte si une modification manuelle place un praticien sur une activité alors qu’il devrait être en repos. L’historique des repos reste consultable."
        ]
      },
      {
        heading: "Consultations, compétences et internes",
        paragraphs: [
          "Les consultations d’anesthésie se répartissent selon vos règles, au trimestre ou à l’année, et chaque praticien voit où il en est. Les compétences de chacun, médecin ou IADE, encadrent les affectations : personne n’est proposé sur une salle de pédiatrie sans la compétence requise.",
          "Dans les CHU, les internes et les docteurs juniors se planifient dans le même outil que les seniors, avec leurs propres postes et des règles propres à leur groupe."
        ]
      },
      {
        heading: "L’équité, compteurs à l’appui",
        paragraphs: [
          "Nuits, week-ends, jours fériés, consultations, pénibilité : chaque compteur est visible par l’équipe. Les arbitrages s’appuient sur des chiffres partagés plutôt que sur la mémoire du responsable, et chacun peut vérifier que la répartition est juste.",
          "Les désidératas de chacun et les règles de l’établissement s’ajoutent à cette base d’équité, sans la remplacer."
        ]
      },
      {
        heading: "Demandes, échanges et application mobile",
        paragraphs: [
          "MAR et IADE déposent leurs congés, disponibilités et désidératas depuis l’application mobile, sur iPhone et Android. Ils proposent des échanges et reprennent des activités dans la bourse aux activités ; chaque demande est tracée.",
          "Avant d’accepter une demande, le responsable en voit l’effet sur le planning. Une fois publié, le planning remplace les PDF et le papier : il se synchronise avec les calendriers personnels, et chacun est prévenu dès qu’une affectation qui le concerne change."
        ]
      },
      {
        heading: "Heures, congés et exports",
        paragraphs: [
          "Heures effectuées, heures supplémentaires et congés sont suivis dans le même outil, pour les praticiens salariés comme libéraux. La paie reçoit un export, sans ressaisie."
        ]
      }
    ],
    proof: "Plus de 250 organisations de santé utilisent Momentum sur plus de 1 000 sites, dans neuf pays, et BioSked planifie le temps médical depuis plus de quinze ans. Les fonctions décrites sur cette page sont détaillées dans notre livre blanc sur la planification en anesthésie (2023).",
    faq: [
      {
        q: "Momentum remplace-t-il le logiciel d’anesthésie ou le dossier anesthésique ?",
        a: "Non. Momentum planifie les équipes : qui travaille où et quand, au bloc, en consultation et en garde. Le dossier anesthésique et la traçabilité per-opératoire restent dans vos logiciels cliniques. Momentum gère uniquement des données de planification, pas des dossiers médicaux de patients."
      },
      {
        q: "Peut-on planifier les médecins et les IADE dans le même outil ?",
        a: "Oui. Médecins anesthésistes-réanimateurs et IADE sont planifiés dans le même planning, chacun avec ses règles. Un changement côté médecins se voit immédiatement côté IADE, et inversement."
      },
      {
        q: "Comment Momentum gère-t-il les repos de sécurité ?",
        a: "Vos règles sont paramétrées une fois. Momentum les applique à la génération du planning et vous alerte si une modification manuelle place un praticien sur une activité pendant son repos. L’historique des repos reste consultable."
      },
      {
        q: "Peut-on planifier les internes et les docteurs juniors ?",
        a: "Oui. Dans plusieurs CHU, internes et docteurs juniors ont leur propre profession dans Momentum, des postes qui leur sont réservés et des règles propres à leur groupe, dans le même planning que les médecins seniors et les IADE."
      },
      {
        q: "Que se passe-t-il quand le programme opératoire change ?",
        a: "Vous mettez à jour le planning de bloc. Momentum propose des remplaçants pour les affectations touchées, en tenant compte des compétences, des repos et des compteurs ; vous validez le choix."
      },
      {
        q: "Comment se passe la mise en place ?",
        a: "Un chef de projet Momentum paramètre avec vous les règles du service au cours de réunions régulières, puis vous accompagne sur les premiers plannings générés."
      },
      {
        q: "Où sont hébergées les données ?",
        a: "Dans l’Union européenne, avec un traitement aligné sur le RGPD. Votre contrat est signé avec Bio-Optronics Sàrl, notre entité suisse."
      }
    ],
    resource: {
      label: "Livre blanc (2023) : la planification dynamique en anesthésie",
      href: "/fr/ressources/"
    },
    related: [
      {
        label: "Cas clients",
        href: "/fr/cas-clients/"
      },
      {
        label: "Planning de garde",
        href: "/fr/fonctionnalites/plannings-de-garde-centralises/"
      },
      {
        label: "Planification automatique",
        href: "/fr/fonctionnalites/planification-optimisee-automatiquement-2/"
      },
      {
        label: "Gestion des demandes",
        href: "/fr/fonctionnalites/gestion-des-requetes-des-equipes/"
      }
    ]
  },
  cardiologie: {
    slug: "cardiologie",
    type: "specialty",
    eyebrow: "Cardiologie",
    title: "Consultations, plateaux techniques et astreintes de cardiologie",
    description:
      "Momentum répartit consultations, échographies, rythmologie, salle de cathétérisme et astreintes selon les compétences réelles de chaque praticien, avec des compteurs d’équité consultables par l’équipe.",
    metaTitle: "Planning cardiologues sous contraintes | Momentum BioSked",
    metaDescription:
      "Consultations, plateaux techniques, astreintes, compétences non interchangeables : Momentum génère le planning de cardiologie avec compteurs d’équité traçables.",
    primaryPain:
      "En cardiologie, la même semaine mêle consultations, échographies, épreuves d’effort, salle de cathétérisme et astreintes de soins intensifs, avec des praticiens dont les compétences ne sont pas interchangeables. Sur un tableur, chaque absence déclenche une renégociation informelle que personne ne peut auditer.",
    pains: [
      "affecter chaque activité selon les compétences réelles : écho, rythmologie, interventionnel",
      "assurer la continuité des soins intensifs et les astreintes sans surcharger toujours les mêmes",
      "intégrer temps partiels, activité mixte et désidératas individuels",
      "justifier la répartition avec des compteurs plutôt que de mémoire",
    ],
    outcomes: [
      "un planning généré sous contraintes, où les compétences bloquent les erreurs d’affectation",
      "des compteurs de gardes, week-ends et jours fériés visibles par toute l’équipe",
      "les demandes des praticiens tracées et arbitrées au même endroit",
      "jusqu’à 90 % de temps de gestion des horaires en moins, mesuré chez nos clients (CHIREC, étude de cas 2025)",
    ],
    proof:
      "Momentum applique en cardiologie le même moteur de contraintes qu’en anesthésie, en radiologie et aux urgences : plus de 250 organisations de santé, 1 000 sites et plus de quinze ans de planification du temps médical. Vos règles d’abord, la génération ensuite.",
    related: [
      { label: "Planification automatique", href: "/fr/fonctionnalites/planification-optimisee-automatiquement-2/" },
      { label: "Communication et diffusion", href: "/fr/fonctionnalites/communication-et-diffusion/" },
    ],
  },
  urgences: {
    slug: "urgences",
    type: "specialty",
    eyebrow: "Urgences",
    title: "Gardes couvertes, imprévus absorbés, équité mesurable",
    description:
      "Momentum construit les lignes de garde jour, nuit et week-end, centralise les désidératas et recalcule la couverture quand un arrêt tombe. Repos et compteurs sont vérifiés avant publication.",
    metaTitle: "Planning médecins urgentistes | Momentum BioSked",
    metaDescription:
      "Lignes de garde, continuité, remplacements en urgence, renforts territoriaux : Momentum planifie les services d’urgences. CHIREC : de 4 jours à 4-5 h par mois.",
    primaryPain:
      "Un tableau de service d’urgences doit couvrir chaque ligne de garde, absorber les arrêts de dernière minute et rester équitable sur les nuits et les week-ends. Aux urgences du CHIREC (40 000 passages par an, 25 à 30 médecins), sa construction mensuelle prenait 4 jours.",
    pains: [
      "couvrir toutes les lignes de garde, nuits et week-ends compris, sans découvert",
      "collecter les désidératas sans chaîne d’emails ni échanges informels",
      "replanifier en urgence après un arrêt, en respectant repos et compteurs",
      "organiser les renforts entre sites d’un même territoire (GHT)",
    ],
    outcomes: [
      "construction du planning mensuel réduite de 4 jours à 4–5 heures (CHIREC, étude de cas 2025)",
      "jusqu’à 90 % de temps de gestion des horaires en moins (CHIREC)",
      "satisfaction du personnel mesurée à 90–100 % au CHIREC et 95–100 % au CHU d’Angers",
      "toutes les demandes des praticiens au même endroit (CHU d’Angers, 52 praticiens urgences-Samu)",
    ],
    proof:
      "Le Dr Boishardy, administrateur Momentum du DMU au CHU d’Angers, le dit dans l’étude de cas : le planning d’un service d’urgences est l’un des plus compliqués d’un hôpital. Tout est désormais au même endroit, accessible en ligne. Le CHIREC a mesuré le sien : 4 jours devenus 4–5 heures par mois.",
    related: [
      { label: "Cas CHU Angers", href: "/fr/cas-clients/chu-angers/" },
      { label: "Plannings de garde", href: "/fr/fonctionnalites/plannings-de-garde-centralises/" },
    ],
  },
  "etablissements-de-sante": {
    slug: "etablissements-de-sante",
    type: "specialty",
    eyebrow: "Établissements de santé",
    title: "Piloter les plannings médicaux à l’échelle d’un établissement ou d’un GHT",
    description:
      "Momentum harmonise les règles de temps de travail entre services et sites, consolide compteurs et couverture, et relie badgeage, RH et export paie sans écraser le fonctionnement propre de chaque service.",
    metaTitle: "Planification médicale multisites | Momentum BioSked",
    metaDescription:
      "Harmonisation des règles, compteurs consolidés, mutualisation territoriale, badgeage et export paie : Momentum pilote les plannings médicaux multisites et GHT.",
    primaryPain:
      "À l’échelle d’un établissement ou d’un GHT, le planning médical se fragmente : un tableur par service, des règles de temps de travail appliquées différemment, aucun compteur consolidé. La direction des affaires médicales arbitre sans données, service par service.",
    pains: [
      "harmoniser les règles de temps de travail sans effacer les spécificités de chaque service",
      "consolider gardes, astreintes, temps de travail additionnel et compteurs d’équité",
      "organiser la mutualisation et les renforts entre sites du territoire",
      "relier planning, badgeage, RH et export vers la paie",
    ],
    outcomes: [
      "une vision consolidée de la couverture et des compteurs, service par service et site par site",
      "des règles paramétrées par service, appliquées et tracées automatiquement",
      "un déploiement progressif, service après service, comme au CHU d’Angers, de l’anesthésie aux urgences",
      "des heures fiables transmises à la paie via le badgeage et l’export",
    ],
    proof:
      "Momentum planifie plus de 250 organisations de santé, 1 000 sites et 50 000 utilisateurs dans 9 pays, avec un hébergement dans l’Union européenne. Le CHU d’Angers (environ 6 700 hospitaliers) l’a étendu de l’anesthésie aux urgences ; le CHIREC, de la radiologie aux urgences.",
    related: [
      { label: "Rapports et statistiques", href: "/fr/fonctionnalites/rapports-et-statistiques/" },
      { label: "Badgeage et suivi RH", href: "/fr/fonctionnalites/badgeage-et-suivi-rh/" },
    ],
  },
  "autres-specialites-medicales": {
    slug: "autres-specialites-medicales",
    type: "specialty",
    eyebrow: "Autres spécialités",
    title: "Un moteur de contraintes qui se paramètre sur les règles de votre service",
    description:
      "Ophtalmologie, pathologie, pédiatrie, biologie ou équipes mixtes : Momentum formalise vos règles (contrats, compétences, présence, équité) au lieu de vous demander de changer d’organisation.",
    metaTitle: "Planning médical autres spécialités | Momentum BioSked",
    metaDescription:
      "Contrats, compétences, obligations de présence, équité : Momentum paramètre la planification automatique sur les règles propres à chaque spécialité médicale.",
    primaryPain:
      "Chaque spécialité a ses compétences rares, ses obligations de présence et ses règles d’équité propres. Les outils génériques les ignorent ; le tableur les gère au prix de journées d’administration et d’arbitrages que personne ne peut retracer.",
    pains: [
      "formaliser les règles métier du service : contrats, compétences, présence minimale",
      "concilier désidératas individuels et équité collective, compteurs à l’appui",
      "publier un planning fiable, consulté sur web et mobile",
      "commencer par un service, puis étendre sans repartir de zéro",
    ],
    outcomes: [
      "des règles explicites et documentées, au lieu d’un savoir-faire logé dans la tête d’une personne",
      "jusqu’à 90 % de temps de gestion des horaires en moins dans les cas publiés (CHIREC, 2025)",
      "une satisfaction du personnel mesurée entre 90 et 100 % dans les études publiées",
      "un socle commun prêt pour l’extension à d’autres services",
    ],
    proof:
      "BioSked construit des plannings médicaux depuis plus de quinze ans (la plus ancienne étude de cas publiée date de 2010) pour plus de 250 organisations de santé dans 9 pays. La méthode ne change pas avec la spécialité : vos règles d’abord, la génération ensuite.",
    related: [
      { label: "Demander une démo", href: "/fr/demo/" },
      { label: "Voir les cas clients", href: "/fr/cas-clients/" },
    ],
  },
};

export const featurePages: Record<string, FrenchLandingPage> = {
  "planification-optimisee-automatiquement-2": {
    slug: "planification-optimisee-automatiquement-2",
    type: "feature",
    eyebrow: "Planning automatique",
    title: "La génération automatique de plannings sous contraintes",
    description:
      "Momentum encode contrats, règles de temps de travail, compétences, désidératas et compteurs d’équité, puis génère le planning. Le moteur fait les vérifications ; vous gardez la main sur les exceptions.",
    metaTitle: "Planification médicale automatique | Momentum BioSked",
    metaDescription:
      "Génération de plannings médicaux sous contraintes : contrats, repos, compétences, équité. CHIREC : de 4 jours à 4-5 heures par mois, jusqu’à 90 % de temps en moins.",
    primaryPain:
      "Construire un planning à la main, c’est vérifier chaque affectation contre des dizaines de règles (repos, contrats, compétences, équité) et recommencer à chaque absence. Au CHIREC, ce travail prenait 4 jours par mois ; à l’Hôpital Européen de Marseille, une vacation hebdomadaire plus 4 à 6 heures personnelles sur Excel.",
    pains: [
      "encoder contrats, temps de travail, compétences et disponibilités comme des règles vérifiables",
      "répartir gardes, nuits et week-ends avec des compteurs d’équité et de pénibilité",
      "détecter les conflits à la génération, pas après publication",
      "garder l’arbitrage humain sur les exceptions et les validations",
    ],
    outcomes: [
      "construction mensuelle réduite de 4 jours à 4–5 heures (CHIREC, étude de cas 2025)",
      "jusqu’à 90 % de temps de gestion des horaires en moins (CHIREC)",
      "3 générations de plannings par an au lieu d’un travail permanent (Les Cèdres, client depuis 2014)",
      "des règles d’équité appliquées automatiquement et traçables face à l’équipe",
    ],
    proof:
      "Au centre d’imagerie Les Cèdres (client depuis 2014), le Dr Poirier le résume dans l’étude de cas publiée : rapports, listes d’équité et calcul de pénibilité sortent du système. Les plannings ne se génèrent plus que trois fois par an.",
    related: [
      { label: "Radiologie", href: "/fr/secteurs-soins/radiologie/" },
      { label: "Anesthésie", href: "/fr/secteurs-soins/anesthesie/" },
    ],
  },
  "plannings-de-garde-centralises": {
    slug: "plannings-de-garde-centralises",
    type: "feature",
    eyebrow: "Gardes et astreintes",
    title: "Gardes et astreintes dans le même planning que l’activité de jour",
    description:
      "Momentum relie lignes de garde, astreintes, descentes de garde et vacations de jour : la couverture se vérifie avant publication et chaque remplacement met à jour repos et compteurs.",
    metaTitle: "Plannings de garde centralisés | Momentum BioSked",
    metaDescription:
      "Lignes de garde, astreintes, repos et vacations de jour dans une même vue : couverture vérifiée avant publication, compteurs à jour à chaque remplacement.",
    primaryPain:
      "Quand les gardes vivent dans un fichier séparé du planning de jour, les doubles affectations, les repos non respectés et les versions contradictoires se découvrent sur le terrain. La continuité des soins repose alors sur la vigilance d’une seule personne.",
    pains: [
      "relier garde, astreinte, descente de garde et vacation de jour dans une même vue",
      "repérer les trous de couverture avant publication, pas en pleine nuit",
      "répartir équitablement nuits, week-ends et jours fériés, compteurs à l’appui",
      "diffuser une version unique, à jour pour tous les praticiens",
    ],
    outcomes: [
      "une couverture vérifiée à la génération, ligne de garde par ligne de garde",
      "des repos et enchaînements contrôlés automatiquement",
      "des compteurs de gardes et d’astreintes consultables par toute l’équipe",
      "une satisfaction du personnel mesurée entre 90 et 100 % aux urgences du CHIREC",
    ],
    proof:
      "Aux urgences du CHIREC (40 000 passages par an, 25 à 30 médecins), la construction du planning, gardes comprises, est passée de 4 jours à 4–5 heures par mois. Au CHU d’Angers, 52 praticiens urgences-Samu sont planifiés dans Momentum.",
    related: [
      { label: "Urgences", href: "/fr/secteurs-soins/urgences/" },
      { label: "Anesthésie", href: "/fr/secteurs-soins/anesthesie/" },
    ],
  },
  "gestion-des-requetes-des-equipes": {
    slug: "gestion-des-requetes-des-equipes",
    type: "feature",
    eyebrow: "Désidératas",
    title: "Désidératas et demandes des praticiens, tracés au même endroit",
    description:
      "Congés, préférences, indisponibilités, échanges de gardes : les demandes entrent dans Momentum, alimentent directement la génération du planning et laissent une trace que chacun peut consulter.",
    metaTitle: "Gestion des désidératas médecins | Momentum BioSked",
    metaDescription:
      "Désidératas, congés, indisponibilités et échanges collectés dans un seul canal, intégrés à la génération du planning, arbitrés avec des compteurs d’équité.",
    primaryPain:
      "Des désidératas par email, des échanges de gardes par messages, des congés sur papier : des demandes se perdent, et l’arbitrage devient indéfendable. Le responsable de planning passe son temps à relancer, puis à se justifier.",
    pains: [
      "collecter désidératas, congés et indisponibilités dans un seul canal",
      "faire entrer les demandes directement dans la génération du planning",
      "arbitrer avec des compteurs d’équité plutôt qu’à la mémoire",
      "réduire relances, oublis et contestations après publication",
    ],
    outcomes: [
      "toutes les demandes des praticiens accessibles au même endroit, un bénéfice cité par le CHU d’Angers",
      "des arbitrages traçables, adossés aux compteurs d’équité",
      "moins de contestations après publication : la règle appliquée est visible",
      "du temps de coordination rendu au responsable de planning",
    ],
    proof:
      "« Tout est au même endroit et accessible sur internet […] je n’ai rien à faire si ce n’est à me connecter pour accéder à toutes les demandes des praticiens et gérer mes plannings. » (Dr Thomas Boishardy, administrateur Momentum pour le DMU au CHU d’Angers ; 52 praticiens urgences-Samu).",
    related: [
      { label: "Cas CHU Angers", href: "/fr/cas-clients/chu-angers/" },
      { label: "Communication et diffusion", href: "/fr/fonctionnalites/communication-et-diffusion/" },
    ],
  },
  "communication-et-diffusion": {
    slug: "communication-et-diffusion",
    type: "feature",
    eyebrow: "Communication",
    title: "Un planning publié une fois, à jour partout",
    description:
      "Publication en temps réel, notifications de changement, application mobile et synchronisation avec les calendriers personnels : la version que consulte le praticien est toujours la bonne.",
    metaTitle: "Diffusion planning médical mobile | Momentum BioSked",
    metaDescription:
      "Publication en temps réel, notifications ciblées, app mobile iOS et Android, synchronisation des calendriers personnels : une seule version de référence du planning.",
    primaryPain:
      "Un planning juste mais mal diffusé produit les mêmes trous de couverture qu’un planning faux. PDF envoyés par email, captures d’écran, impressions affichées : chaque copie devient obsolète à la première modification.",
    pains: [
      "supprimer les versions obsolètes qui circulent par email et impression",
      "notifier chaque praticien concerné quand son planning change",
      "donner accès au planning sur mobile, y compris en mobilité entre sites",
      "synchroniser les affectations avec les calendriers personnels",
    ],
    outcomes: [
      "une seule version de référence, mise à jour en temps réel",
      "des notifications ciblées : chacun voit ce qui le concerne",
      "une application mobile iOS et Android, disponible en cinq langues",
      "l’intégration aux calendriers personnels, citée comme indispensable par IRIS GRIM",
    ],
    proof:
      "Chez IRIS GRIM (45 radiologues, 13 sites nantais), les gestionnaires de planification citent l’application mobile et l’intégration aux calendriers personnels parmi les fonctionnalités dont l’équipe ne peut plus se passer, selon l’étude de cas publiée.",
    related: [
      { label: "Cas IRIS GRIM", href: "/fr/cas-clients/iris-grim/" },
      { label: "Gestion des requêtes", href: "/fr/fonctionnalites/gestion-des-requetes-des-equipes/" },
    ],
  },
  "rapports-et-statistiques": {
    slug: "rapports-et-statistiques",
    type: "feature",
    eyebrow: "Reporting",
    title: "Équité, activité, temps de travail : des rapports qui sortent du planning",
    description:
      "Listes d’équité, gardes, astreintes, jours fériés travaillés, pénibilité, temps réalisé : Momentum produit les rapports depuis les affectations validées, sans ressaisie.",
    metaTitle: "Rapports planning médical | Momentum BioSked",
    metaDescription:
      "Listes d’équité, gardes, astreintes, jours fériés, pénibilité, temps réalisé : des rapports générés depuis le planning validé, sans reconstruction manuelle.",
    primaryPain:
      "Dans beaucoup de services, le reporting se reconstruit à la main dans un tableur à partir du planning, avec les écarts et les contestations qui vont avec. Les données existent déjà : elles doivent découler des affectations validées, pas être ressaisies.",
    pains: [
      "sortir des listes d’équité que les praticiens ne peuvent pas contester",
      "compter gardes, astreintes et jours fériés travaillés sans ressaisie",
      "consolider les indicateurs par praticien, par service ou par site",
      "documenter les arbitrages face à l’équipe, aux RH et à la direction",
    ],
    outcomes: [
      "des rapports générés depuis le planning validé, pas reconstruits à la main",
      "le calcul de pénibilité des postes intégré aux compteurs",
      "des indicateurs consolidés multi-sites pour la direction",
      "un gain de temps documenté par Les Cèdres sur rapports, listes d’équité, jours fériés et astreintes",
    ],
    proof:
      "« L’utilisation de Momentum nous fait gagner du temps pour les générations de rapports, la sortie des listes d’équité, de jours fériés travaillés et d’astreintes. Il y a aussi le calcul de pénibilité des postes. » (Dr Jérôme Poirier, radiologue associé, Les Cèdres ; client depuis 2014).",
    related: [
      { label: "Établissements de santé", href: "/fr/secteurs-soins/etablissements-de-sante/" },
      { label: "Badgeage et suivi RH", href: "/fr/fonctionnalites/badgeage-et-suivi-rh/" },
    ],
  },
  "badgeage-et-suivi-rh": {
    slug: "badgeage-et-suivi-rh",
    type: "feature",
    eyebrow: "Badgeage et RH",
    title: "Du badgeage à la paie : les heures réelles rapprochées du planning",
    description:
      "Momentum enregistre le pointage, rapproche prévu et réalisé, gère absences et congés, et exporte des heures fiables vers la paie et les outils RH comme Kelio/Bodet.",
    metaTitle: "Badgeage médical et suivi RH | Momentum BioSked",
    metaDescription:
      "Pointage, rapprochement prévu-réalisé, congés, export paie : Momentum relie planning et heures réelles. IMAGIR : « le gain d’un ETP voire deux » via les intégrations.",
    primaryPain:
      "Quand le suivi du temps vit à côté du planning, les écarts se découvrent en fin de mois : heures à rapprocher à la main, litiges de paie, week-ends et jours fériés à recompter. La fiabilité de la paie repose alors sur des rapprochements manuels.",
    pains: [
      "pointer les heures réalisées dans le même outil que le planning",
      "rapprocher automatiquement le prévu et le réalisé, écart par écart",
      "gérer congés, absences et vacations spécifiques sans double saisie",
      "exporter des heures fiables vers la paie et les outils RH",
    ],
    outcomes: [
      "« le gain d’un ETP voire deux » via l’interconnexion Momentum–EasyDoct–Kelio (IMAGIR, étude de cas publiée)",
      "une paie alimentée par des heures constatées, pas déclarées",
      "pointage et gestion des congés en production chez Les Cèdres (client depuis 2014)",
      "moins de rapprochements manuels en fin de mois",
    ],
    proof:
      "Chez IMAGIR (une quarantaine de radiologues, 9 sites bordelais), l’interconnexion de Momentum avec Kelio/Bodet (RH et badgeage) et EasyDoct est créditée publiquement du « gain d’un ETP voire deux ». Les Cèdres couplent pointage et gestion des congés à la génération automatique des plannings.",
    related: [
      { label: "Cas Les Cèdres", href: "/fr/cas-clients/imagerie-medicale-les-cedres/" },
      { label: "Rapports et statistiques", href: "/fr/fonctionnalites/rapports-et-statistiques/" },
    ],
  },
};
