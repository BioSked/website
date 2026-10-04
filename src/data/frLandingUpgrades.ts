/**
 * New versions of existing French landing pages, switched on at their date
 * (src/data/publishSchedule.mjs, kind 'upgrade'). Until then the current
 * version in frLandingPages.ts stays live.
 */
import type { FrenchLandingPage } from './frLandingPages';

export const FR_UPGRADES: { key: string; slug: string; page: FrenchLandingPage }[] = [
  {
    key: 'fr-ght',
    slug: 'etablissements-de-sante',
    page: {
    slug: "etablissements-de-sante",
    type: "specialty",
    eyebrow: "Établissements de santé et GHT",
    title: "Le logiciel de planning médical des établissements de santé et des GHT",
    description: "Un planning par service, avec ses propres règles, et les mêmes données pour tout l’établissement : gardes, astreintes, absences, temps de travail additionnel et exports vers la paie. Momentum se déploie service après service, puis d’un site à l’autre.",
    metaTitle: "Logiciel de planning médical hôpital, clinique et GHT | Momentum",
    metaDescription: "Logiciel de planning médical pour hôpitaux, cliniques et GHT : un planning par service, gardes et astreintes, internes, exports paie, déploiement service par service. Au CHU d’Angers, de l’anesthésie aux urgences.",
    primaryPain: "Dans beaucoup d’établissements, chaque service a son tableur, construit par un ancien responsable et compris par lui seul. Les règles de gardes et de repos s’appliquent différemment d’un service à l’autre, les heures arrivent à la paie après ressaisie, et la direction des affaires médicales arbitre sans chiffres partagés. Au service des urgences du CHU d’Angers, le planning reposait ainsi sur un fichier Excel « très contraignant à remplir » avant Momentum (étude de cas 2023).",
    painsHeading: "Ce que vivent les affaires médicales et les chefs de service",
    pains: [
      "un tableur différent par service, dont personne ne veut hériter",
      "des règles de gardes, d’astreintes et de repos appliquées de façon inégale",
      "des heures et des indemnités ressaisies avant la paie",
      "des praticiens et des internes partagés entre services ou entre sites"
    ],
    outcomesHeading: "Ce que Momentum apporte à l’établissement",
    outcomes: [
      "un planning généré par service selon ses propres règles, sans modèle imposé",
      "des comptes d’heures, des gardes et des absences centralisés au même endroit",
      "des exports vers la paie à partir des heures validées",
      "un déploiement service après service, comme au CHU d’Angers, de l’anesthésie aux urgences"
    ],
    quote: {
      text: "Aujourd’hui tout est au même endroit et accessible sur internet, en tant qu’administrateur de Momentum pour le DMU, je n’ai rien à faire si ce n’est à me connecter pour accéder à toutes les demandes des praticiens et gérer mes plannings.",
      cite: "Dr Thomas Boishardy, praticien hospitalier, département de médecine d’urgence, CHU d’Angers (étude de cas, 2023)",
      href: "/fr/cas-clients/chu-angers/"
    },
    sections: [
      {
        heading: "Commencer par un service, sans tout changer d’un coup",
        paragraphs: [
          "Un établissement ne change pas tous ses plannings le même jour. Momentum se met en place dans un premier service, avec ses lignes de garde, ses trames et ses règles, puis s’étend aux services voisins quand le premier tourne.",
          "Au CHU d’Angers (près de 6 700 hospitaliers), Momentum était d’abord utilisé en anesthésie ; le département de médecine d’urgence l’a adopté ensuite pour ses 52 praticiens partagés entre urgences et Samu, client depuis 2021. Au CHIREC, en Belgique, Momentum est passé de la radiologie aux urgences."
        ]
      },
      {
        heading: "Pour la direction des affaires médicales : des chiffres fiables",
        paragraphs: [
          "Gardes, astreintes, temps de travail additionnel, absences : chaque élément est saisi une fois, dans le planning, puis compté. Les heures validées partent vers la paie par export, au lieu d’être ressaisies à partir de tableaux transmis par chaque service.",
          "Les rapports donnent, service par service, la répartition des gardes et des week-ends et les compteurs de chaque praticien. Les arbitrages s’appuient sur les mêmes chiffres pour tout le monde."
        ]
      },
      {
        heading: "Pour les chefs de service : un planning qui suit leurs règles",
        paragraphs: [
          "Chaque service garde son organisation : vacations, lignes de garde, compétences requises, repos après garde, temps partiels. Momentum génère le planning à partir de ces règles et vérifie la couverture avant publication.",
          "Avant d’accepter un congé ou un échange, le responsable voit son effet sur la couverture et sur les compteurs. Aux urgences du CHIREC, la construction du planning mensuel est passée de 4 jours à 4 à 5 heures (étude de cas, mai 2025)."
        ]
      },
      {
        heading: "Pour les praticiens, les internes et les docteurs juniors",
        paragraphs: [
          "Les médecins consultent leur planning, déposent leurs souhaits et proposent des échanges depuis l’application mobile Momentum, sur iPhone et Android, ou depuis le web. Chacun est prévenu des changements qui le concernent, et ses gardes apparaissent dans son agenda personnel.",
          "Plusieurs CHU planifient aussi leurs internes et leurs docteurs juniors dans Momentum, avec des règles distinctes de celles des seniors : postes autorisés, encadrement, repos."
        ]
      },
      {
        heading: "Plusieurs sites, un même territoire",
        paragraphs: [
          "Quand des praticiens exercent sur plusieurs sites d’un groupe ou d’un GHT, chaque site garde ses lignes et ses règles, mais le praticien n’a qu’un planning. Une affectation sur un site le rend indisponible sur l’autre au même moment.",
          "Momentum est utilisé par plus de 250 organisations de santé, sur plus de 1 000 sites, dans neuf pays."
        ]
      },
      {
        heading: "Hébergement, sécurité et mise en place",
        paragraphs: [
          "Les données sont hébergées dans l’Union européenne et traitées conformément au RGPD ; un accord de traitement des données est fourni sur demande. Pour les établissements européens, le contrat est signé avec Bio-Optronics Sàrl, notre entité suisse.",
          "Un chef de projet Momentum paramètre avec le premier service ses lignes, ses règles et ses contrats, forme les référents, puis accompagne les premiers plannings avant l’ouverture aux praticiens."
        ]
      }
    ],
    proof: "Au CHU d’Angers, le département de médecine d’urgence mesure une satisfaction du personnel de 95 à 100 % (étude de cas 2023). Aux urgences de l’hôpital de Braine-l’Alleud (groupe CHIREC), le planning mensuel se construit en 4 à 5 heures au lieu de 4 jours (étude de cas, mai 2025).",
    faq: [
      {
        q: "Peut-on commencer par un seul service ?",
        a: "Oui, c’est la façon la plus courante de démarrer. Le premier service est paramétré avec ses propres règles, puis les autres services suivent. Au CHU d’Angers, Momentum est passé de l’anesthésie aux urgences."
      },
      {
        q: "Chaque service garde-t-il ses propres règles ?",
        a: "Oui. Lignes de garde, vacations, repos après garde, temps partiels et compétences se définissent par service. Les mêmes règles peuvent aussi être reprises d’un service à l’autre quand l’établissement veut les harmoniser."
      },
      {
        q: "Momentum gère-t-il les internes et les docteurs juniors ?",
        a: "Oui. Plusieurs CHU planifient leurs internes et leurs docteurs juniors dans Momentum, avec des règles propres : postes autorisés, encadrement par un senior, repos."
      },
      {
        q: "Comment les heures arrivent-elles à la paie ?",
        a: "Les heures, gardes et astreintes validées dans le planning sont exportées vers la paie, ce qui évite de ressaisir des tableaux transmis par chaque service."
      },
      {
        q: "Plusieurs sites d’un GHT peuvent-ils travailler ensemble ?",
        a: "Oui. Chaque site garde ses lignes et ses règles, et un praticien qui exerce sur plusieurs sites n’a qu’un planning, ce qui évite les doubles affectations."
      },
      {
        q: "Où sont hébergées les données ?",
        a: "Dans l’Union européenne, avec un traitement conforme au RGPD et un accord de traitement des données fourni sur demande."
      }
    ],
    resource: {
      label: "Livre blanc : la planification dynamique en établissement de santé",
      href: "/fr/ressources/"
    },
    related: [
      {
        label: "Lire le cas du CHU d’Angers",
        href: "/fr/cas-clients/chu-angers/"
      },
      {
        label: "Planning de garde",
        href: "/fr/fonctionnalites/plannings-de-garde-centralises/"
      },
      {
        label: "Rapports et statistiques",
        href: "/fr/fonctionnalites/rapports-et-statistiques/"
      },
      {
        label: "Badgeage et suivi RH",
        href: "/fr/fonctionnalites/badgeage-et-suivi-rh/"
      }
    ]
  },
  },
];
