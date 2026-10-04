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
    eyebrow: "Radiologie et imagerie médicale",
    title: "Le logiciel de planning des radiologues et des groupes d’imagerie",
    description: "Vacations par site et par modalité, mutualisation entre sites, gardes, téléradiologie et remplacements : Momentum construit le planning des radiologues, des manipulateurs et des secrétaires selon vos règles, et se connecte au RIS, à la prise de rendez-vous et au badgeage.",
    metaTitle: "Logiciel de planning radiologues et imagerie | Momentum",
    metaDescription: "Logiciel de planning pour radiologues et groupes d’imagerie : vacations par site et modalité, mutualisation multisite, gardes, remplacements, couplage RIS et prise de rendez-vous. Des groupes d’imagerie clients depuis plus de dix ans.",
    primaryPain: "Répartir des dizaines de radiologues sur plusieurs sites, entre scanner, IRM, mammographie, échographie et radiologie conventionnelle, avec les gardes, la téléradiologie, les désidératas et les absences : sur un tableur, chaque version coûte des journées et repose sur des arbitrages que personne ne peut retracer. Et le planning des radiologues n’est que la moitié du travail, car manipulateurs, secrétaires et agents d’accueil doivent suivre le même mouvement.",
    painsHeading: "Ce qui complique le planning d’un groupe d’imagerie",
    pains: [
      "construire les vacations par site et par modalité en mutualisant les effectifs",
      "trouver un remplaçant compétent quand tombe une absence ou une panne de modalité",
      "tenir des compteurs d’équité opposables : gardes, week-ends, jours fériés, pénibilité",
      "aligner le planning sur le RIS, la prise de rendez-vous et le badgeage"
    ],
    outcomesHeading: "Ce que Momentum apporte à un groupe d’imagerie",
    outcomes: [
      "un planning par site et par modalité, radiologues, manipulateurs et secrétaires compris",
      "des remplaçants proposés selon les compétences et les disponibilités quand un aléa survient",
      "« le gain d’un ETP voire deux » grâce à l’interconnexion Momentum, EasyDoct et Kelio (IMAGIR Bordeaux, étude de cas 2021)",
      "des compteurs d’équité, de jours fériés travaillés et d’astreintes que chaque associé peut consulter"
    ],
    quote: {
      text: "Le trio Momentum, Easydoct et Kelio est indéniable et apporte une réelle plus-value. L’interconnexion de ces outils permet facilement le gain d’un ETP voire deux.",
      cite: "Anthony Bagot, responsable opérationnel, IMAGIR Bordeaux (étude de cas, juin 2021)",
      href: "/fr/cas-clients/imagir-bordeaux/"
    },
    sections: [
      {
        heading: "Des vacations par site et par modalité",
        paragraphs: [
          "Chaque site garde ses trames : salles, modalités, horaires d’ouverture, vacations du matin et de l’après-midi. Les compétences de chaque radiologue décident des vacations qui lui sont proposées : sénologie, interventionnel, IRM ostéo-articulaire, pédiatrie. Un radiologue qui ne fait pas de mammographie n’y est jamais affecté.",
          "Les mêmes règles s’appliquent aux manipulateurs, avec leurs propres compétences par modalité et leurs sites de rattachement. Un manipulateur référent peut rester sédentaire sur un site, un autre tourner entre plusieurs cabinets."
        ]
      },
      {
        heading: "Mutualisation entre sites et téléradiologie",
        paragraphs: [
          "Dans un groupe multisite, les radiologues ne sont plus attachés à un seul cabinet. Momentum répartit les vacations entre les sites selon vos règles de mutualisation, et les vacations de téléradiologie ou de lecture à distance se planifient comme les autres, avec les mêmes compteurs.",
          "La vue d’ensemble montre qui est où, site par site et jour par jour, et repère les vacations non couvertes avant publication."
        ]
      },
      {
        heading: "Absences, pannes et remplacements",
        paragraphs: [
          "Une absence imprévue, un IRM en maintenance, un cabinet qui ferme une demi-journée : Momentum propose des remplaçants compétents et disponibles pour les vacations touchées, en tenant compte des compteurs. Le responsable choisit, et l’équipe concernée est prévenue sur son téléphone."
        ]
      },
      {
        heading: "Équité entre associés et gardes",
        paragraphs: [
          "Gardes, astreintes, samedis, jours fériés, vacations pénibles : chaque compteur est visible par les associés et sert de base aux arbitrages. Les listes d’équité et de jours fériés travaillés sortent directement de l’outil au lieu d’être recalculées à la main en fin d’année.",
          "Les désidératas, les temps partiels et les remplaçants s’ajoutent à cette base sans la remplacer."
        ]
      },
      {
        heading: "RIS, prise de rendez-vous, badgeage et paie",
        paragraphs: [
          "Momentum se couple au RIS, par exemple celui de NGI, pour que les vacations planifiées correspondent à l’activité du terrain. Chez IMAGIR, la connexion avec la prise de rendez-vous EasyDoct et avec la gestion des temps Kelio de Bodet complète le planning (étude de cas 2021).",
          "Les heures, les congés et le badgeage des salariés sont suivis dans le même outil, et la paie reçoit un export sans ressaisie."
        ]
      },
      {
        heading: "Internes et services hospitaliers",
        paragraphs: [
          "Dans un service de radiologie de CHU, les internes ont leurs propres vacations par modalité et par site, et des règles propres à leur groupe, dans le même planning que les seniors. Les gardes du service et l’activité de jour restent dans un seul outil."
        ]
      }
    ],
    proof: "Des groupes d’imagerie planifient leurs équipes avec Momentum depuis plus de dix ans, comme Imageries Les Cèdres à Saint-Malo, client depuis 2014. Au total, plus de 250 organisations de santé utilisent Momentum sur plus de 1 000 sites, dans neuf pays.",
    faq: [
      {
        q: "Momentum remplace-t-il le RIS ou l’agenda de rendez-vous ?",
        a: "Non. Momentum planifie les équipes : qui travaille sur quel site, quelle modalité et quand. Il se connecte au RIS et à la prise de rendez-vous pour que les deux restent alignés. Momentum gère uniquement des données de planification, pas des dossiers médicaux de patients."
      },
      {
        q: "Peut-on planifier plusieurs sites dans le même outil ?",
        a: "Oui. Un même planning couvre tous vos sites, et chaque site garde ses trames, ses modalités et ses horaires. La mutualisation des radiologues et des manipulateurs entre sites suit vos règles."
      },
      {
        q: "Les manipulateurs et les secrétaires sont-ils planifiés aussi ?",
        a: "Oui. Radiologues, manipulateurs, secrétaires et agents d’accueil sont planifiés dans le même outil, chacun avec ses compétences, ses contrats et ses règles."
      },
      {
        q: "Que se passe-t-il en cas de panne de modalité ou d’absence ?",
        a: "Momentum propose des remplaçants compétents et disponibles pour les vacations touchées, en tenant compte des compteurs d’équité. Le responsable valide, et les personnes concernées reçoivent une notification."
      },
      {
        q: "Combien coûte Momentum ?",
        a: "Les abonnements démarrent à 5,99 € par professionnel planifié et par mois, en quatre formules (Starter, Plus, Pro, Enterprise). Le détail est sur notre page Tarifs."
      },
      {
        q: "Où sont hébergées les données ?",
        a: "Dans l’Union européenne, avec un traitement aligné sur le RGPD. Votre contrat est signé avec Bio-Optronics Sàrl, notre entité suisse."
      }
    ],
    resource: {
      label: "Lire les études de cas des groupes d’imagerie",
      href: "/fr/cas-clients/"
    },
    related: [
      {
        label: "Lire le cas IMAGIR Bordeaux",
        href: "/fr/cas-clients/imagir-bordeaux/"
      },
      {
        label: "Badgeage et suivi RH",
        href: "/fr/fonctionnalites/badgeage-et-suivi-rh/"
      },
      {
        label: "Planning de garde",
        href: "/fr/fonctionnalites/plannings-de-garde-centralises/"
      },
      {
        label: "Tarifs",
        href: "/fr/pricing/"
      }
    ]
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
        "label": "Guide et modèle Excel du planning de garde",
        "href": "/fr/blog/planning-de-garde-medecins/"
      },
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
    metaTitle: "Logiciel de planning cardiologues | Momentum",
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
    eyebrow: "Médecine d’urgence",
    title: "Le logiciel de planning des urgences et des médecins urgentistes",
    description: "Lignes de garde, nuits, week-ends, repos de sécurité, SAMU et SMUR : Momentum génère le planning des urgentistes selon vos règles, tient les compteurs d’équité à jour et peut couvrir plusieurs sites d’un même GHT dans un seul outil.",
    metaTitle: "Logiciel de planning des urgences et urgentistes | Momentum",
    metaDescription: "Logiciel de planning des urgences : gardes, nuits, week-ends, repos de sécurité, SMUR et désidératas. Aux urgences du CHIREC, un mois de planning est passé de 4 jours à 4–5 heures (étude de cas 2025).",
    primaryPain: "Un service d’urgences tourne vingt-quatre heures sur vingt-quatre, toute l’année. Chaque ligne de garde doit être couverte, les nuits, les week-ends et les jours fériés doivent tourner équitablement, les repos de sécurité suivre chaque garde, et un praticien partagé avec le SAMU ne peut pas être à deux endroits à la fois. Aux urgences du CHIREC, avant Momentum, un mois de planning sur papier et sur Excel prenait 4 jours (étude de cas 2025).",
    painsHeading: "Ce qui rend le planning des urgences si exigeant",
    pains: [
      "couvrir chaque ligne de garde, jour et nuit, sans trou ni doublon",
      "répartir nuits, week-ends et jours fériés de façon équitable et vérifiable",
      "enchaîner gardes et repos de sécurité, y compris pour les praticiens partagés avec le SAMU",
      "intégrer désidératas, congés et temps partiels sans tout reconstruire"
    ],
    outcomesHeading: "Ce que Momentum change pour le chef de service",
    outcomes: [
      "un mois de planning construit en 4 à 5 heures au lieu de 4 jours (urgences du CHIREC, étude de cas 2025)",
      "jusqu’à 90 % de temps de gestion des horaires en moins (même étude)",
      "une satisfaction du personnel mesurée entre 90 et 100 % (même étude)",
      "des compteurs de nuits, de week-ends et de jours fériés consultables par toute l’équipe"
    ],
    quote: {
      text: "Je ne m’attendais pas à ce que Momentum ait un tel impact. C’est clair, fluide, automatisé. Je suis impressionné par la capacité de l’outil à générer des plannings aussi optimisés en respectant presque tous les souhaits.",
      cite: "Dr Frédéric Cavallotto, chef du service des urgences, hôpital de Braine-l’Alleud, groupe CHIREC (étude de cas, mai 2025)",
      href: "/fr/cas-clients/chirec/"
    },
    sections: [
      {
        heading: "Des lignes de garde couvertes avant publication",
        paragraphs: [
          "Urgences adultes, pédiatriques, UHCD, SMUR : chaque ligne a ses horaires, ses compétences requises et son nombre de médecins. Momentum vérifie la couverture de chaque ligne à la génération. Une ligne vide apparaît avant la publication du planning, pas au milieu de la nuit.",
          "Les gardes de 24 heures, les demi-gardes et les postes de nuit se définissent comme vous les organisez aujourd’hui ; le planning suit vos trames, pas un modèle imposé."
        ]
      },
      {
        heading: "Nuits, week-ends et jours fériés : l’équité se compte",
        paragraphs: [
          "Chaque nuit, chaque week-end et chaque jour férié s’ajoute à un compteur visible par toute l’équipe. La répartition suit vos règles, et les arbitrages s’appuient sur des chiffres partagés plutôt que sur la mémoire du chef de service.",
          "Aux urgences du CHIREC, l’équipe constate une meilleure équité perçue et une prise en compte transparente des désidératas, avec beaucoup moins d’e-mails d’ajustement (étude de cas 2025)."
        ]
      },
      {
        heading: "Repos de sécurité et temps de travail",
        paragraphs: [
          "Repos après garde, temps de travail additionnel, contrats et temps partiels : vos règles sont paramétrées une fois et appliquées à chaque génération du planning.",
          "Les heures effectuées sont visibles et validées dans le même outil, puis transmises à la direction et à la paie, avec moins de corrections après coup."
        ]
      },
      {
        heading: "Urgences, SAMU et SMUR dans le même planning",
        paragraphs: [
          "Quand les mêmes praticiens assurent les urgences, la régulation et les sorties SMUR, un seul planning évite qu’ils soient affectés à deux endroits en même temps. Au CHU d’Angers, 52 praticiens partagés entre les urgences et le SAMU sont planifiés dans Momentum, client depuis 2021 (étude de cas 2023)."
        ]
      },
      {
        heading: "Un planning territorial pour le GHT",
        paragraphs: [
          "Quand les urgentistes travaillent sur plusieurs établissements d’un GHT, chaque site garde ses lignes et ses règles, mais le planning est commun. La vue territoriale montre quelles lignes sont couvertes sur l’ensemble des sites et évite les doubles affectations entre établissements."
        ]
      },
      {
        heading: "Désidératas, échanges et application mobile",
        paragraphs: [
          "Les médecins consultent le planning et déposent désidératas et congés depuis l’application mobile ou le web, proposent des échanges et sont prévenus de chaque changement qui les concerne. Le chef de service voit l’effet d’une demande avant de l’accepter.",
          "Au CHIREC, la mise en place s’est faite par étapes : formation du chef de service et de deux référents, puis consultation en ligne et dépôt des désidératas, avec un accompagnement des praticiens les moins familiers du numérique (étude de cas 2025)."
        ]
      }
    ],
    proof: "Aux urgences de l’hôpital de Braine-l’Alleud (groupe CHIREC, 40 000 passages par an, 25 à 30 médecins), Momentum est en place depuis fin 2024. Au total, plus de 250 organisations de santé utilisent Momentum sur plus de 1 000 sites, dans neuf pays.",
    faq: [
      {
        q: "Momentum gère-t-il les gardes de 24 heures et les postes de nuit ?",
        a: "Oui. Gardes de 24 heures, demi-gardes, nuits et postes de jour se définissent selon votre organisation, et les règles de repos qui suivent chaque garde sont appliquées à la génération du planning."
      },
      {
        q: "Peut-on planifier les urgences, le SAMU et le SMUR ensemble ?",
        a: "Oui. Les praticiens partagés entre plusieurs activités sont planifiés dans un seul planning, ce qui évite les doubles affectations. Au CHU d’Angers, 52 praticiens partagés entre urgences et SAMU sont planifiés ainsi."
      },
      {
        q: "Comment l’équité des nuits et des week-ends est-elle suivie ?",
        a: "Chaque nuit, week-end et jour férié est compté pour chaque médecin. Momentum répartit selon vos règles et affiche les compteurs à toute l’équipe, pour que chacun puisse vérifier la répartition."
      },
      {
        q: "Plusieurs sites d’un GHT peuvent-ils partager le même planning ?",
        a: "Oui. Chaque site garde ses lignes de garde et ses règles, dans un planning commun qui donne une vue territoriale et évite les doubles affectations entre établissements."
      },
      {
        q: "Comment se passe la mise en place ?",
        a: "Un chef de projet Momentum paramètre avec vous les lignes, les règles et les contrats, puis vous accompagne sur les premiers plannings. Au CHIREC, le chef de service et deux référents ont été formés en premier, avant l’ouverture aux médecins (étude de cas 2025)."
      },
      {
        q: "Où sont hébergées les données ?",
        a: "Dans l’Union européenne, avec un traitement aligné sur le RGPD. Votre contrat est signé avec Bio-Optronics Sàrl, notre entité suisse."
      }
    ],
    resource: {
      label: "Livre blanc (2023) : la planification dynamique aux urgences",
      href: "/fr/ressources/"
    },
    related: [
      {
        "label": "Guide et modèle Excel du planning de garde",
        "href": "/fr/blog/planning-de-garde-medecins/"
      },
      {
        label: "Lire le cas CHIREC",
        href: "/fr/cas-clients/chirec/"
      },
      {
        label: "Planning de garde",
        href: "/fr/fonctionnalites/plannings-de-garde-centralises/"
      },
      {
        label: "Établissements de santé et GHT",
        href: "/fr/secteurs-soins/etablissements-de-sante/"
      },
      {
        label: "Tarifs",
        href: "/fr/pricing/"
      }
    ]
  },
  "etablissements-de-sante": {
    slug: "etablissements-de-sante",
    type: "specialty",
    eyebrow: "Établissements de santé",
    title: "Piloter les plannings médicaux à l’échelle d’un établissement ou d’un GHT",
    description:
      "Momentum harmonise les règles de temps de travail entre services et sites, consolide compteurs et couverture, et relie badgeage, RH et export paie sans écraser le fonctionnement propre de chaque service.",
    metaTitle: "Logiciel de planning médical multisite et GHT | Momentum",
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
    metaTitle: "Logiciel de planning médical, toutes spécialités | Momentum",
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
    metaTitle: "Planning médical automatique avec l’IA | Momentum",
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
    metaTitle: "Logiciel de planning de garde médecins | Momentum",
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
    resource: {
      label: "Guide et modèle Excel gratuit : le planning de garde des médecins",
      href: "/fr/blog/planning-de-garde-medecins/"
    },
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
    metaTitle: "Désidératas et demandes des médecins | Momentum",
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
    metaTitle: "Planning médical sur mobile et diffusion | Momentum",
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
      "une synchronisation avec les calendriers personnels, pour que chacun retrouve ses gardes dans son agenda",
    ],
    proof:
      "La nouvelle application mobile Momentum, lancée en juin 2026 sur iPhone et Android, fonctionne en cinq langues, avec Face ID, la connexion Microsoft et un mode hors ligne ; chaque praticien y reçoit les changements qui le concernent.",
    related: [
      { label: "Cas clients", href: "/fr/cas-clients/" },
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
    metaTitle: "Rapports et statistiques de planning médical | Momentum",
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
    metaTitle: "Badgeage et suivi du temps de travail médical | Momentum",
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
