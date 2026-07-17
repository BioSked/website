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
      "Vacations par modalité, mutualisation multi-sites, remplacements, couplage RIS NGI : Momentum planifie les groupes d’imagerie français — études de cas publiées.",
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
    eyebrow: "Anesthésie",
    title: "Blocs, gardes et repos de sécurité tenus dans un même planning",
    description:
      "Momentum affecte MAR et IADEs sur les blocs, les consultations et les gardes en vérifiant repos de sécurité et compétences à la génération, puis absorbe les remplacements sans reconstruire le mois.",
    metaTitle: "Planning anesthésistes et IADEs | Momentum BioSked",
    metaDescription:
      "Blocs opératoires, gardes, repos de sécurité, IADEs : Momentum génère le planning d’anesthésie sous contraintes. Étude de cas Hôpital Européen de Marseille.",
    primaryPain:
      "Un planning d’anesthésie tient ensemble le programme opératoire, les gardes, les astreintes, les consultations et les repos de sécurité — pour deux populations liées, médecins et IADEs. À l’Hôpital Européen de Marseille, cette construction coûtait une vacation administrative plus 4 à 6 heures personnelles par semaine, sur Excel.",
    pains: [
      "affecter MAR et IADEs sur les salles selon les compétences et les spécialités chirurgicales",
      "enchaîner garde, descente de garde et repos de sécurité sans erreur",
      "tenir consultations et activités hors bloc dans le même planning que le bloc",
      "replanifier après une absence sans défaire l’équilibre des gardes",
    ],
    outcomes: [
      "les repos de sécurité vérifiés à la génération, avant publication",
      "un seul planning pour blocs, consultations, gardes et astreintes — médecins et IADEs",
      "des remplacements recalculés en tenant compte des compétences et des compteurs",
      "des compteurs de gardes et de pénibilité opposables, qui objectivent les arbitrages",
    ],
    proof:
      "À l’Hôpital Européen de Marseille, le Dr Stordeur — MAR, responsable des plannings médecins et IADEs depuis 2013 — planifie une vingtaine de MAR et une dizaine d’IADEs avec Momentum ; l’étude de cas publiée décrit le temps repris sur la construction manuelle sous Excel.",
    related: [
      { label: "Lire le cas Hôpital Européen de Marseille", href: "/fr/cas-clients/hopital-europeen-marseille/" },
      { label: "Planning de garde", href: "/fr/fonctionnalites/plannings-de-garde-centralises/" },
    ],
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
      "En cardiologie, la même semaine mêle consultations, échographies, épreuves d’effort, salle de cathétérisme et astreintes de soins intensifs — avec des praticiens dont les compétences ne sont pas interchangeables. Sur un tableur, chaque absence déclenche une renégociation informelle que personne ne peut auditer.",
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
      "Momentum construit les lignes de garde jour, nuit et week-end, centralise les désidératas et recalcule la couverture quand un arrêt tombe — repos et compteurs vérifiés avant publication.",
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
      "Le Dr Boishardy, administrateur Momentum du DMU au CHU d’Angers, le dit dans l’étude de cas : le planning d’un service d’urgences est l’un des plus compliqués d’un hôpital — et tout est désormais au même endroit, accessible en ligne. Le CHIREC a mesuré le sien : 4 jours devenus 4–5 heures par mois.",
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
      "Momentum harmonise les règles de temps de travail entre services et sites, consolide compteurs et couverture, et relie badgeage, RH et export paie — sans écraser le fonctionnement propre de chaque service.",
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
      "un déploiement progressif, service après service — la voie suivie au CHU d’Angers, de l’anesthésie aux urgences",
      "des heures fiables transmises à la paie via le badgeage et l’export",
    ],
    proof:
      "Momentum planifie plus de 250 organisations de santé, 1 000 sites et 50 000 utilisateurs quotidiens dans 9 pays, avec un hébergement dans l’Union européenne. Le CHU d’Angers (environ 6 700 hospitaliers) l’a étendu de l’anesthésie aux urgences ; le CHIREC, de la radiologie aux urgences.",
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
      "Ophtalmologie, pathologie, pédiatrie, biologie ou équipes mixtes : Momentum formalise vos règles — contrats, compétences, présence, équité — au lieu de vous demander de changer d’organisation.",
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
      "BioSked construit des plannings médicaux depuis plus de quinze ans — la plus ancienne étude de cas publiée date de 2010 — pour plus de 250 organisations de santé dans 9 pays. La méthode ne change pas avec la spécialité : vos règles d’abord, la génération ensuite.",
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
      "Construire un planning à la main, c’est vérifier chaque affectation contre des dizaines de règles — repos, contrats, compétences, équité — et recommencer à chaque absence. Au CHIREC, ce travail prenait 4 jours par mois ; à l’Hôpital Européen de Marseille, une vacation hebdomadaire plus 4 à 6 heures personnelles sur Excel.",
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
      "Au centre d’imagerie Les Cèdres (client depuis 2014), le Dr Poirier le résume dans l’étude de cas publiée : rapports, listes d’équité et calcul de pénibilité sortent du système — et les plannings ne se génèrent plus que trois fois par an.",
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
      "Aux urgences du CHIREC (40 000 passages par an, 25 à 30 médecins), la construction du planning — gardes comprises — est passée de 4 jours à 4–5 heures par mois. Au CHU d’Angers, 52 praticiens urgences-Samu sont planifiés dans Momentum.",
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
      "toutes les demandes des praticiens accessibles au même endroit — le bénéfice cité par le CHU d’Angers",
      "des arbitrages traçables, adossés aux compteurs d’équité",
      "moins de contestations après publication : la règle appliquée est visible",
      "du temps de coordination rendu au responsable de planning",
    ],
    proof:
      "« Tout est au même endroit et accessible sur internet […] je n’ai rien à faire si ce n’est à me connecter pour accéder à toutes les demandes des praticiens et gérer mes plannings. » — Dr Thomas Boishardy, administrateur Momentum pour le DMU, CHU d’Angers (52 praticiens urgences-Samu).",
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
      "Chez IRIS GRIM (45 radiologues, 13 sites nantais), les gestionnaires de planification citent l’application mobile et l’intégration aux calendriers personnels parmi les fonctionnalités dont l’équipe ne peut plus se passer — étude de cas publiée.",
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
      "Dans beaucoup de services, le reporting se reconstruit à la main dans un tableur à partir du planning — avec les écarts et les contestations qui vont avec. Les données existent déjà : elles doivent découler des affectations validées, pas être ressaisies.",
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
      "« L’utilisation de Momentum nous fait gagner du temps pour les générations de rapports, la sortie des listes d’équité, de jours fériés travaillés et d’astreintes. Il y a aussi le calcul de pénibilité des postes. » — Dr Jérôme Poirier, radiologue associé, Les Cèdres (client depuis 2014).",
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
