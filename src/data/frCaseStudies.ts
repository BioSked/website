/**
 * Full French case-study pages, served at /fr/cas-clients/<slug>.
 * Content is drawn ONLY from the published case-study PDFs archived in
 * migration/materials/case-studies/ (plain-text extractions provided to the
 * content agents). Quotes verbatim; numbers only as published.
 */
export interface FrCaseStudy {
    slug: string;
    org: string;
    title: string; // page H1, expert register
    metaTitle: string;
    metaDescription: string;
    specialty: string;
    factsLine: string; // e.g. "40 000 passages/an · 25–30 médecins · Belgique"
    year: string; // publication year of the case study, e.g. "Étude de cas — mai 2025"
    intro: string; // 1-2 sentence summary
    context: string[]; // the organization, as published
    challenge: string[]; // before Momentum
    solution: string[]; // what was deployed / why Momentum
    results: { value: string; label: string }[]; // 2-4 published metrics
    resultsNarrative: string[]; // published outcomes in prose
    quotes: { text: string; author: string; role: string }[];
    relatedSectorHref: string; // e.g. "/fr/secteurs-soins/urgences"
    relatedSectorLabel: string;
}

export const FR_CASE_STUDIES: FrCaseStudy[] = [
    {
        slug: 'chirec',
        org: 'CHIREC — Hôpital de Braine-l’Alleud',
        title: 'Aux urgences du CHIREC, la construction du planning mensuel passe de 4 jours à 4–5 heures',
        metaTitle: 'CHIREC (urgences) : le planning mensuel passe de 4 jours à 4–5 heures | BioSked Momentum',
        metaDescription:
            '40 000 passages par an, 25 à 30 médecins : comment le service des urgences de l’hôpital de Braine-l’Alleud (groupe CHIREC) a réduit la construction de son planning mensuel de 4 jours à 4–5 heures avec Momentum. Étude de cas, mai 2025.',
        specialty: 'Urgences',
        factsLine: '40 000 passages/an · 25–30 médecins · Belgique',
        year: 'Étude de cas — mai 2025',
        intro: 'Le Dr Frédéric Cavallotto, chef du service des urgences de l’hôpital de Braine-l’Alleud (groupe CHIREC), revient sur le déploiement de Momentum fin 2024 : une construction du planning mensuel réduite de 4 jours à 4–5 heures, et jusqu’à 90 % de temps d’administration des horaires en moins.',
        context: [
            'L’hôpital de Braine-l’Alleud appartient au groupe belge CHIREC, qui regroupe trois hôpitaux ainsi que plusieurs cliniques associées. L’établissement dispose d’une capacité d’accueil de 300 lits.',
            'Son service des urgences accueille 40 000 passages par an, avec 25 à 30 médecins qui y travaillent sur l’année. Momentum y a été déployé fin 2024 pour la planification des urgentistes.',
        ],
        challenge: [
            'Avant Momentum, la planification se faisait manuellement, sur papier et sur Excel. Elle entraînait une lourde charge administrative, des erreurs d’organisation et des échanges de mails incessants.',
            'Il fallait 4 jours pour établir un planning d’un mois, sans automatisation ni visibilité en temps réel. Les désidératas et les congés étaient difficiles à intégrer et généraient parfois des sureffectifs. Un outil automatisé et équitable était devenu indispensable.',
        ],
        solution: [
            'Le service des urgences a comparé plusieurs solutions, dont Momentum, déjà en place dans le service de radiologie du CHIREC. Trois raisons ont conduit au choix : l’adaptabilité à la complexité médicale — gestion multi-contrats, spécialités multiples, rotations, gardes et désidératas —, l’automatisation avancée — intégration des contraintes, calcul automatique des heures, export pour les RH, alertes de dépassements — et l’accessibilité, avec un planning consultable en ligne sur tous supports et mis à jour en temps réel pour toute l’équipe.',
            'L’implémentation s’est faite par étapes : formation du chef de service et de deux référents pour la gestion quotidienne, mise en place progressive de la consultation en ligne des plannings et du dépôt des désidératas via l’application mobile et web, puis accompagnement spécifique des praticiens les moins familiers avec le numérique, notamment pour la saisie des désidératas sur mobile.',
        ],
        results: [
            { value: '4 j → 4–5 h', label: 'de construction du planning, par mois' },
            { value: 'jusqu’à 90 %', label: 'de temps d’administration des horaires en moins' },
            { value: '90–100 %', label: 'de satisfaction du personnel' },
        ],
        resultsNarrative: [
            'Au-delà du temps de construction, le service constate une réduction significative du volume d’e-mails liés aux échanges et aux ajustements, une meilleure équité perçue dans la répartition des horaires et une transparence sur la prise en compte des désidératas individuels qui améliore la satisfaction.',
            'Côté RH et paie, la visualisation des heures effectuées par les praticiens, avec validation, met fin aux erreurs liées aux différents temps de travail. La transmission à la direction et aux services de paie est fluidifiée, avec une réduction significative des erreurs sur les salaires et moins de corrections a posteriori.',
            'Enfin, la meilleure répartition des postes réduit les heures planifiées à un nombre de besoins constants ; l’anticipation et la répartition plus fine des ressources par activité se traduisent par des économies sur les montants versés.',
        ],
        quotes: [
            {
                text: 'Je ne m’attendais pas à ce que Momentum ait un tel impact. C’est clair, fluide, automatisé. Je suis impressionné par la capacité de l’outil à générer des plannings aussi optimisés en respectant presque tous les souhaits.',
                author: 'Dr Frédéric Cavallotto',
                role: 'chef du service des Urgences, hôpital de Braine-l’Alleud (CHIREC)',
            },
            {
                text: 'Je recommande Momentum pour trois raisons importantes : le gain de temps, l’accès en temps réel aux plannings n’importe où, et la capacité de l’outil à satisfaire un maximum de contraintes individuelles. Ce n’est pas possible à faire manuellement. Grâce à Momentum, je passe moins de temps sur la construction des plannings, et je peux désormais consacrer plus de temps sur la gestion du service.',
                author: 'Dr Frédéric Cavallotto',
                role: 'chef du service des Urgences, hôpital de Braine-l’Alleud (CHIREC)',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/urgences',
        relatedSectorLabel: 'Momentum pour les urgences',
    },
    {
        slug: 'chu-angers',
        org: 'CHU Angers',
        title: 'Au CHU d’Angers, le planning de 52 praticiens partagés entre urgences et Samu est automatisé',
        metaTitle: 'CHU Angers (urgences) : 52 praticiens urgences + Samu planifiés automatiquement | BioSked Momentum',
        metaDescription:
            'Comment le département de médecine d’urgence du CHU d’Angers a automatisé la planification de 52 praticiens partagés entre urgences et Samu avec Momentum : centralisation des comptes d’heures, désidératas sur mobile, équité des gardes et des week-ends. Étude de cas, 2023.',
        specialty: 'Urgences',
        factsLine: '52 praticiens · urgences + Samu · +99 000 passages/an',
        year: 'Étude de cas — 2023',
        intro: 'Le Dr Thomas Boishardy, praticien hospitalier et administrateur des plannings du département de médecine d’urgence, revient sur l’automatisation de la planification de 52 praticiens dont l’activité est partagée entre les urgences et le Samu.',
        context: [
            'Avec près de 6 700 hospitaliers, le CHU d’Angers est l’un des premiers opérateurs de santé de sa région ; il comporte plusieurs centres de référence et de ressources pour des pathologies complexes.',
            'Son département de médecine d’urgence compte une cinquantaine de praticiens dont l’activité est partagée entre les urgences et le Samu.',
        ],
        challenge: [
            'Le planning était initialement géré sur un fichier Excel conçu par les précédents responsables plannings, très contraignant à remplir pour la construction des plannings. Avec la croissance de l’activité, il était devenu évident pour les responsables plannings qu’un logiciel était nécessaire pour combler les manques d’automatisation sur les tâches répétitives et faciliter les prises de décision.',
            'La tâche était complexe : 52 praticiens avec leurs particularités propres et des activités partagées entre les urgences et le Samu, une bonne distribution des gardes et des week-ends à garantir pour satisfaire l’ensemble des médecins, et une équité difficile à obtenir manuellement — elle demandait de nombreuses vérifications qui n’étaient pas faciles à suivre.',
        ],
        solution: [
            'Momentum était déjà présent dans le service d’anesthésie du CHU d’Angers ; l’opportunité s’est présentée de collaborer une nouvelle fois. L’objectif principal : automatiser la création de tous les plannings afin de réduire au minimum le temps dédié à leur gestion, et libérer l’administrateur du suivi de toutes les particularités individuelles.',
            'L’adhésion des utilisateurs n’a pas posé de difficulté : les praticiens étaient eux aussi favorables à une solution de planification automatisée, conscients de la complexité de la gestion manuelle d’un planning soumis à de nombreuses contraintes, comme l’équité sur les week-ends.',
        ],
        results: [
            { value: '52', label: 'praticiens planifiés, entre urgences et Samu' },
            { value: '+99 000', label: 'passages par an' },
            { value: '95–100 %', label: 'de satisfaction du personnel' },
        ],
        resultsNarrative: [
            'Les administrateurs plannings bénéficient d’une centralisation automatique de toutes les données liées aux plannings : comptes d’heures, vacations, gardes, absences. Les désidératas, les absences et les échanges d’affectations des praticiens sont désormais gérés dans l’application mobile ; toute requête validée par l’administrateur met à jour les plannings sur toutes les plateformes automatiquement.',
            'L’ensemble de ces étapes, simplifiées et automatisées dans Momentum, offre un gain de temps considérable par rapport aux fichiers Excel qui servaient auparavant de plannings. Le recueil de témoignages urgences publié par BioSked fait état d’une satisfaction du personnel de 95 à 100 % pour ce département, client depuis 2021.',
        ],
        quotes: [
            {
                text: 'Aujourd’hui tout est au même endroit et accessible sur internet, en tant qu’administrateur de Momentum pour le DMU, je n’ai rien à faire si ce n’est à me connecter pour accéder à toutes les demandes des praticiens et gérer mes plannings.',
                author: 'Dr Thomas Boishardy',
                role: 'praticien hospitalier, CHU d’Angers',
            },
            {
                text: 'Momentum est un logiciel de planification qui est extrêmement complet et à partir du moment où on y consacre un peu de temps, on parvient à le maîtriser et à répondre à tous les besoins de planification d’un service d’urgence. Je reste persuadé que le planning d’un service d’urgence fait partie des plannings les plus compliqués à mettre en place dans un hôpital.',
                author: 'Dr Thomas Boishardy',
                role: 'praticien hospitalier, CHU d’Angers',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/urgences',
        relatedSectorLabel: 'Momentum pour les urgences',
    },
    {
        slug: 'imalliance-hdf',
        org: 'IMALLIANCE-HDF',
        title: 'IMALLIANCE-HDF : un planning entièrement automatisé pour 34 radiologues sur 12 sites',
        metaTitle: 'IMALLIANCE-HDF (radiologie) : 34 radiologues, 145 salariés, 12 sites | BioSked Momentum',
        metaDescription:
            'Le groupe d’imagerie IMALLIANCE-HDF (ex-IMALYS, Beuvry) planifie 34 radiologues et 145 salariés sur 12 sites avec Momentum, intégré au RIS NGI : paramétrage fin des compétences et des vacations, remplacements quasi immédiats en cas d’aléas, mutualisation multi-sites.',
        specialty: 'Radiologie',
        factsLine: '34 radiologues · 145 salariés · 12 sites',
        year: 'Étude de cas',
        intro: 'Dominique Molmy, secrétaire référente, et Alain Bizjak, directeur financier du groupe d’imagerie médicale IMALLIANCE-HDF, témoignent d’un planning passé d’Excel à une automatisation complète sous Momentum, intégré au RIS NGI.',
        context: [
            'Le Groupe Imagerie Médicale Artois-Lys (IMALYS), situé à Beuvry, regroupe 34 médecins radiologues et 145 salariés répartis sur 12 sites — cabinets indépendants, hôpitaux et cliniques des régions béthunoise et douaisis. En janvier 2021, IMALYS est devenu IMALLIANCE-HDF.',
            'Utilisateur depuis quelques années du RIS NGI, le groupe s’est doté de Momentum, intégré à ce RIS.',
        ],
        challenge: [
            'Géré sur Excel, le planning devait tenir compte de l’ensemble des contraintes rencontrées par un groupe d’imagerie médicale : compétences et mobilité du personnel, vacations par modalité, par site et par plage horaire, souhaits des médecins.',
            'L’objectif du groupe allait au-delà d’un outil de planification performant : optimiser sa gestion et son activité en interconnectant son outil de gestion des ressources humaines à son système d’information. Les cabinets ont été regroupés pour mutualiser le personnel et les modalités, répartir les vacations sur l’ensemble des sites et optimiser les plages horaires de rendez-vous pour atteindre une offre de soins optimale.',
        ],
        solution: [
            'Le planning est aujourd’hui entièrement automatisé sous Momentum. Le paramétrage réalisé en amont couvre les situations concrètes du groupe : tel manipulateur référent sédentaire sur tel site, tel médecin ne réalisant des vacations qu’en radiologie et mammographie sur telle plage horaire. La parfaite intégration de Momentum avec le RIS prend ainsi tout son sens.',
            'L’équipe Momentum a été très présente au démarrage pour s’assurer que toutes les règles de fonctionnement du groupe étaient bien intégrées. « Nous avons bénéficié d’un véritable accompagnement et d’une aide au changement de la part de Momentum », précisent Dominique Molmy et Alain Bizjak.',
        ],
        results: [
            { value: '34', label: 'médecins radiologues planifiés' },
            { value: '12', label: 'sites — cabinets, hôpitaux et cliniques' },
            { value: '145', label: 'salariés' },
        ],
        resultsNarrative: [
            'La mise en place de Momentum a permis au groupe de faire évoluer ses règles de fonctionnement et d’uniformiser la gestion du temps de travail sur l’ensemble des sites. La continuité des soins est toujours garantie pour les patients, avec un confort de travail et une meilleure gestion tant au niveau humain qu’économique.',
            'Le médecin sait que, quel que soit le site où il arrive, il pourra réaliser sa vacation : le manipulateur, la secrétaire et les patients seront là. Il peut se concentrer sur son travail de médecin sans se soucier de la planification — les compétences du personnel, sa mobilité et les souhaits du médecin sont intégrés dans le planning.',
        ],
        quotes: [
            {
                text: 'Ce qui est intéressant dans Momentum, c’est qu’en amont, nous pouvons paramétrer énormément de choses… Le fait que tel manipulateur référent soit sédentaire sur tel site, que tel médecin ne réalise des vacations qu’en radiologie et mammographie et sur telle plage horaire, etc., tout est paramétrable.',
                author: 'Dominique Molmy',
                role: 'secrétaire référente, IMALLIANCE-HDF',
            },
            {
                text: 'Le résultat est surprenant. Le planning est produit aujourd’hui très aisément, et en cas d’aléas (absence, modalité en panne, etc.), les possibilités de remplacement sont proposées pour un ajustement du planning quasi-immédiat.',
                author: 'Dominique Molmy',
                role: 'secrétaire référente, IMALLIANCE-HDF',
            },
            {
                text: 'Même si l’aspect médical reste prépondérant, nous ne pouvons néanmoins plus négliger l’aspect économique.',
                author: 'Alain Bizjak',
                role: 'directeur financier, IMALLIANCE-HDF',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/radiologie',
        relatedSectorLabel: 'Momentum pour la radiologie',
    },
    {
        slug: 'iris-grim',
        org: 'IRIS GRIM',
        title: 'IRIS GRIM : d’un outil de planification maison à Momentum pour 45 radiologues nantais',
        metaTitle: 'IRIS GRIM (radiologie, Nantes) : 45 radiologues, 240 professionnels de santé | BioSked Momentum',
        metaDescription:
            'Le groupement nantais IRIS GRIM (45 radiologues, 240 professionnels de santé dont 120 manipulateurs) a remplacé son outil de planification développé en interne par Momentum : moins d’actions manuelles, remplacements proposés, plannings sur mobile et calendriers personnels. Étude de cas, 2022.',
        specialty: 'Radiologie',
        factsLine: '45 radiologues · 240 professionnels de santé · Nantes',
        year: 'Étude de cas — 2022',
        intro: 'Fabienne Tual et Marie-Aline Douceau, gestionnaires de planification, et Bernard Bensadoun, directeur d’IRIS GRIM, reviennent sur le remplacement d’un outil de planification développé en interne par Momentum, à l’échelle d’un groupement en croissance.',
        context: [
            'IRIS GRIM est un groupement de radiologues nantais créé il y a près de 20 ans, qui poursuit son développement sur et autour de l’agglomération nantaise en agrégeant régulièrement de nouveaux cabinets.',
            'Le groupe compte 45 médecins radiologues et 240 autres professionnels de santé, dont 120 manipulateurs en électroradiologie, répartis sur les cabinets d’imagerie médicale de ville et sur les plateaux lourds des 4 plus importantes cliniques de Nantes. Il exploite en propre 15 modalités d’imagerie en coupe et 8 sites de cabinets libéraux de ville, et partage un scanner haut de gamme et une IRM 3T avec le CHU de Nantes dans le cadre d’un GIE.',
        ],
        challenge: [
            'Conscient très tôt des enjeux de la planification et de l’affectation des médecins sur chaque vacation, IRIS GRIM avait développé un outil propriétaire, Easy Planning, pensé par deux médecins du groupe. Parfaitement fonctionnelle sur l’effectif du début, cette solution sur mesure devenait un véritable casse-tête, chronophage, à mesure que le nombre de radiologues augmentait.',
            'Pour regagner du temps médical, la gestion des plannings a été repensée en 2020 et confiée en partie à un pool administratif placé sous l’autorité de deux médecins désignés par la communauté médicale et chargés des arbitrages. La croissance du groupe et l’évolution des modalités d’imagerie en coupe ont mis en lumière le besoin d’un outil plus agile, plus automatisé, ne nécessitant pas de retraitements aussi importants. Débute alors la recherche d’un couple logiciel-éditeur rompu au domaine de l’imagerie, ayant fait ses preuves auprès d’importantes structures de radiologie, avec un recul de plusieurs années.',
        ],
        solution: [
            'Momentum par BioSked s’est imposé du fait de sa notoriété et de sa spécialisation dans la planification d’activité pour les professionnels de santé. La connaissance et la maîtrise du secteur de l’imagerie médicale ont été des critères déterminants ; au-delà, l’ergonomie, l’appropriation du logiciel par l’équipe planning et la simplicité de substitution d’Easy Planning par Momentum ont été des facteurs fondamentaux dans le passage d’une solution sur mesure à une solution plus industrialisée.',
            'La transition a été gérée de manière progressive au moment de la mise en production : les radiologues ont pu, pendant quelque temps, accéder à leur ancien logiciel en parallèle pour continuer à consulter leurs plannings dans les conditions qu’ils connaissaient. Lorsque Easy Planning a été définitivement arrêté, cela n’a généré aucun mécontentement. La formation assurée par l’équipe Momentum et l’accompagnement au démarrage ont rendu les choses plus simples et concrètes.',
        ],
        results: [
            { value: '45', label: 'médecins radiologues planifiés' },
            { value: '120', label: 'manipulateurs en électroradiologie' },
            { value: '15', label: 'modalités d’imagerie en coupe exploitées en propre' },
        ],
        resultsNarrative: [
            'La diminution des retraitements divers et des interventions manuelles est significative, avec une baisse considérable du temps passé sur la répartition des vacations — notamment via la réduction des heures supplémentaires.',
            'La gestion des plannings-types, la proposition de médecins pour des remplacements, l’application mobile et l’intégration aux calendriers personnels se sont imposées comme des fonctionnalités indispensables. Momentum a apporté une simplification de la communication et une meilleure visibilité des plannings.',
        ],
        quotes: [
            {
                text: 'Depuis Momentum, la planification automatique des vacations, les déplacements des médecins, autant sur leurs vacations que d’un site à un autre, sont beaucoup plus rapides et très faciles à intégrer. La communication des plannings est, elle aussi, très fluide. Nous constatons une diminution conséquente des actions manuelles par rapport à ce qu’elles étaient dans Easy Planning.',
                author: 'Fabienne Tual et Marie-Aline Douceau',
                role: 'gestionnaires de planification, IRIS GRIM',
            },
            {
                text: 'Le choix de Momentum comme outil de planification assistée s’est avéré très rapidement pertinent. Le modèle économique « coût à l’usage » est avantageux et il offre une flexibilité très appréciable.',
                author: 'Bernard Bensadoun',
                role: 'directeur d’IRIS GRIM',
            },
            {
                text: 'Le déploiement, l’ergonomie, la simplicité d’utilisation sont vraiment des avantages indéniables que vous apportez avec Momentum par BioSked.',
                author: 'Fabienne Tual et Marie-Aline Douceau',
                role: 'gestionnaires de planification, IRIS GRIM',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/radiologie',
        relatedSectorLabel: 'Momentum pour la radiologie',
    },
    {
        slug: 'imagerie-medicale-les-cedres',
        org: 'Centre d’Imagerie Médicale Les Cèdres',
        title: 'Les Cèdres : trois générations de plannings par an pour un centre d’imagerie multisites',
        metaTitle: 'Les Cèdres (radiologie, Saint-Malo) : 3 générations de plannings par an, client depuis 2014 | BioSked Momentum',
        metaDescription:
            'Le Centre d’Imagerie Médicale Les Cèdres (18 radiologues, implantations à Plancoët, Dinard, Combourg, Saint-Malo et à la Clinique de la Côte d’Émeraude) utilise Momentum depuis 2014 : plannings générés 3 fois par an, listes d’équité et d’astreintes, calcul de pénibilité, couplage RIS NGI.',
        specialty: 'Radiologie multisites',
        factsLine: '18 radiologues · 5 implantations · client depuis 2014',
        year: 'Étude de cas',
        intro: 'Le Dr Jérôme Poirier, radiologue associé, et Karine Delaunay, cadre administrative, témoignent de plus de dix ans d’utilisation de Momentum pour les plannings des médecins et des salariés du centre — au point de ne générer les plannings que trois fois par an.',
        context: [
            'Le Centre d’Imagerie Médicale Les Cèdres regroupe plusieurs cabinets périphériques situés à Plancoët, Dinard, Combourg et Saint-Malo. Il est également implanté au sein de la Clinique de la Côte d’Émeraude.',
            'Son équipe est constituée de 18 radiologues, épaulés par du personnel administratif, des secrétaires médicales, des Agents en Cabinet d’Imagerie Médicale (ACIM) et des manipulateurs en radiologie.',
        ],
        challenge: [
            'Le centre gère deux planifications distinctes : Karine Delaunay est en charge des plannings des salariés — secrétaires et manipulateurs —, le Dr Poirier et le Dr Jean-François Brunet de ceux des médecins.',
            'Dans une entreprise où les règles de vie salariale peuvent être modifiées régulièrement, l’outil de planification doit suivre le rythme de l’organisation : plannings médecins et salariés, sites multiples, équité des astreintes et des jours fériés travaillés, pénibilité des postes.',
        ],
        solution: [
            'L’équipe a adopté la solution de planification Momentum début 2014, pour les médecins comme pour les salariés. Le travail se fait en commun entre le centre et les équipes de Momentum, et le produit a évolué avec l’organisation : le pointage et la gestion des congés sont venus s’ajouter à la génération automatique et optimisée des plannings.',
            'Le couplage avec le RIS de NGI s’effectue sans problème, et chacun reçoit ses plannings sur le téléphone, avec les notifications.',
        ],
        results: [
            { value: '3', label: 'générations de plannings par an, seulement' },
            { value: 'depuis 2014', label: 'utilisateur de Momentum' },
            { value: '18', label: 'radiologues planifiés, avec les équipes salariées' },
        ],
        resultsNarrative: [
            'L’utilisation de Momentum fait gagner du temps sur la génération de rapports, la sortie des listes d’équité, de jours fériés travaillés et d’astreintes, ainsi que sur le calcul de pénibilité des postes. Résultat : le centre ne génère ses plannings que trois fois par an.',
            'Plus de dix ans après l’adoption, l’adaptabilité reste le point fort mis en avant par l’équipe : les évolutions du produit suivent celles des règles internes du centre.',
        ],
        quotes: [
            {
                text: 'Il y a toujours un travail en commun entre notre entreprise et les équipes de Momentum qui se passe vraiment bien. Le produit a très bien évolué en peu de temps : le pointage, la gestion des congés, en plus de la génération automatique et optimisée des plannings. Momentum s’adapte vraiment à notre organisation et c’est un vrai point fort de la solution.',
                author: 'Karine Delaunay',
                role: 'cadre administrative, Centre d’Imagerie Médicale Les Cèdres',
            },
            {
                text: 'L’utilisation de Momentum nous fait gagner du temps pour les générations de rapports, la sortie des listes d’équité, de jours fériés travaillés et d’astreintes. Il y a aussi le calcul de pénibilité des postes. Les points positifs sont, par exemple, de pouvoir recevoir les plannings sur le téléphone, les notifications ainsi que le couplage avec le RIS de NGI qui s’effectue sans problème. Autre point, c’est que nous ne générons nos plannings que 3 fois par an !',
                author: 'Dr Jérôme Poirier',
                role: 'radiologue associé, Centre d’Imagerie Médicale Les Cèdres',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/radiologie',
        relatedSectorLabel: 'Momentum pour la radiologie',
    },
    {
        slug: 'imagir-bordeaux',
        org: 'IMAGIR',
        title: 'IMAGIR : l’interconnexion planification, rendez-vous et RH permet le gain d’un ETP, voire deux',
        metaTitle: 'IMAGIR (radiologie, Bordeaux) : 9 sites, le gain d’un ETP voire deux | BioSked Momentum',
        metaDescription:
            'Le groupe bordelais IMAGIR (une quarantaine de radiologues associés, 9 sites de production) planifie ses équipes avec Momentum, interconnecté à la prise de rendez-vous EasyDoct et à la gestion RH Kelio : « le gain d’un ETP voire deux ». Étude de cas, juin 2021.',
        specialty: 'Radiologie',
        factsLine: '~40 radiologues associés · 9 sites · Bordeaux',
        year: 'Étude de cas — juin 2021',
        intro: 'Anthony Bagot, responsable opérationnel du groupe IMAGIR à Bordeaux, fort de vingt ans d’expérience dans l’administration de centres d’imagerie, revient sur l’utilisation de Momentum pour les radiologues et les salariés — et sur ce que rapporte l’interconnexion avec la prise de rendez-vous et la gestion RH.',
        context: [
            'Le groupe IMAGIR voit le jour en mars 2020 par la fusion de deux groupes bordelais : les groupes de la Rive Gauche et de la Rive Droite. Il représente aujourd’hui une quarantaine de radiologues associés sur 9 sites de production — dont quatre cliniques ou cabinets de ville — et 1 site administratif.',
        ],
        challenge: [
            'Avant l’arrivée de Momentum, la construction des plannings et leur gestion se faisaient sur Excel : des tâches répétitives et très localisées par site, avec une diffusion sur un intranet. La fusion des deux groupes imposait de faciliter la mutualisation des ressources entre les sites.',
        ],
        solution: [
            'Momentum a permis d’apporter une meilleure entente, diffusion et communication au sein de l’ensemble des équipes afin de faciliter la mutualisation des ressources. Trois composantes structurent l’usage : la planification automatique sous contraintes, la diffusion des plannings et des compteurs, et l’intégration avec la prise de rendez-vous.',
            'L’intégration de Momentum avec EasyDoct, pour l’optimisation de la prise de rendez-vous en ligne, et avec Kelio de Bodet, pour la gestion RH et le badgeage, complète le dispositif. Côté suivi, le chef de projet accompagne le groupe tout au long du déploiement et le support reste à disposition en cas de doute.',
        ],
        results: [
            { value: '1 à 2 ETP', label: 'gagnés grâce à l’interconnexion Momentum, EasyDoct et Kelio' },
            { value: '9', label: 'sites de production, ressources mutualisées' },
            { value: 'fin 2012', label: 'début de la relation entre Anthony Bagot et Momentum' },
        ],
        resultsNarrative: [
            'La personnalisation de l’affichage selon les préférences de chacun permet à tous de s’y retrouver. Face à des exigences fortes — désidératas, contraintes de chacun, remplissage des activités —, Momentum s’adapte aux besoins de façon claire et simple.',
            'Le gain le plus net vient des interfaçages : l’interconnexion de la planification avec la prise de rendez-vous et la gestion RH se traduit, selon le groupe, par le gain d’un ETP, voire deux.',
        ],
        quotes: [
            {
                text: 'Pour moi, les 3 composantes essentielles de l’application que sont la planification automatique sous contraintes, la diffusion des plannings et compteurs et l’intégration avec la prise de rendez-vous font de Momentum un pivot nécessaire et efficace pour la compréhension et la vision de la planification des ressources.',
                author: 'Anthony Bagot',
                role: 'responsable opérationnel, IMAGIR',
            },
            {
                text: 'Le trio Momentum, Easydoct et Kelio est indéniable et apporte une réelle plus-value. L’interconnexion de ces outils permet facilement le gain d’un ETP voire deux.',
                author: 'Anthony Bagot',
                role: 'responsable opérationnel, IMAGIR',
            },
            {
                text: 'Je suis très satisfait de l’outil et je le recommande vraiment, notamment pour ses interfaçages avec d’autres outils qui apporte un réel gain de temps interne.',
                author: 'Anthony Bagot',
                role: 'responsable opérationnel, IMAGIR',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/radiologie',
        relatedSectorLabel: 'Momentum pour la radiologie',
    },
    {
        slug: 'hopital-europeen-marseille',
        org: 'Hôpital Européen de Marseille',
        title: 'Hôpital Européen de Marseille : jusqu’à 95 % d’automatisation des plannings d’anesthésie',
        metaTitle: 'Hôpital Européen de Marseille (anesthésie) : jusqu’à 95 % d’automatisation | BioSked Momentum',
        metaDescription:
            'Comment le Dr Jean-Marc Stordeur a automatisé jusqu’à 95 % de la planification d’environ 20 anesthésistes-réanimateurs et 10 IADEs de l’Hôpital Européen de Marseille avec Momentum, à partir des plannings types des blocs. Étude de cas, 2023.',
        specialty: 'Anesthésie',
        factsLine: 'env. 20 MAR · 10 IADEs · Marseille',
        year: 'Étude de cas — 2023',
        intro: 'Le Dr Jean-Marc Stordeur, anesthésiste-réanimateur en charge des plannings des médecins et des IADEs depuis 2013, revient sur l’automatisation de la planification du service : jusqu’à 95 % du planning des MAR et des IADEs est désormais construit automatiquement, à partir des plannings types des blocs.',
        context: [
            'L’Hôpital Européen est né le 19 août 2013 de la fusion des hôpitaux Ambroise Paré et Paul Desbief, deux établissements de santé marseillais réputés pour la qualité des soins et des relations humaines, fondés respectivement en 1846 et 1914 et rapprochés à partir de 2004.',
            'Le service d’anesthésie-réanimation se compose d’environ 20 médecins et 10 IADEs.',
        ],
        challenge: [
            'Depuis une dizaine d’années, le Dr Stordeur construisait manuellement le planning de l’ensemble des MAR et des IADEs sous Excel, sur une vacation administrative hebdomadaire dédiée — et sur son temps personnel. Avec l’évolution du groupe, passé de quelques anesthésistes à près d’une vingtaine, les changements de plannings de dernière minute, les fermetures de salles en raison d’absences et les changements de blocs des chirurgiens, la planification manuelle débordait de 4 à 6 heures par semaine sur son temps personnel.',
            'L’équité était l’élément de base de la génération du planning, à laquelle s’ajoutaient les désidératas de chacun et les règles de l’établissement. Plutôt que de dédier une deuxième vacation administrative, le groupe a décidé d’investir dans une solution de planification automatique afin de libérer du temps médical et, par conséquent, de réduire et d’optimiser ses coûts.',
        ],
        solution: [
            'Le déploiement a été rythmé par des réunions hebdomadaires avec le chef de projet dédié de l’équipe Momentum, l’automatisation de la planification étant jusque-là inconnue de l’établissement. L’approche retenue : construire les plannings d’équipe à partir des plannings types des blocs avec les chirurgiens, en incorporant les règles de l’établissement ainsi que les contraintes et désidératas des médecins et des IADEs.',
            'Désormais, le Dr Stordeur ne gère manuellement que la mise à jour du planning de bloc avec la présence des chirurgiens en amont ; Momentum construit ensuite automatiquement le planning hebdomadaire des MAR et des IADEs.',
        ],
        results: [
            { value: 'jusqu’à 95 %', label: 'd’automatisation de la planification des MAR et IADEs' },
            { value: 'env. 20 + 10', label: 'MAR et IADEs planifiés' },
            { value: '4–6 h', label: 'de temps personnel par semaine consacrées au planning, avant Momentum' },
        ],
        resultsNarrative: [
            'Après plusieurs semaines d’utilisation, la lecture des vacations est devenue très rapide grâce aux vues par spécialité et aux filtres d’affichage des plannings. Momentum détecte par ailleurs les erreurs de planification lors des changements manuels : un médecin ne peut plus être positionné sur deux vacations non compatibles sans que l’administrateur soit alerté — la réduction des doublons était l’un des objectifs initiaux.',
            'Après un mois, les équipes se sont elles aussi habituées à la planification automatique et à l’application mobile : elles utilisent la bourse aux activités et déposent leurs requêtes de congés, leurs disponibilités ou encore les heures supplémentaires effectuées depuis le mobile.',
        ],
        quotes: [
            {
                text: 'L’expertise du chef de projet était très intéressante et poussée. Cela m’a permis d’atteindre jusqu’à 95 % d’automatisation de la planification des anesthésistes-réanimateurs et des IADEs !',
                author: 'Dr Jean-Marc Stordeur',
                role: 'anesthésiste-réanimateur, en charge des plannings MAR et IADEs, Hôpital Européen de Marseille',
            },
            {
                text: 'Désormais, je ne m’occupe manuellement que de la mise à jour du planning de bloc avec la présence des chirurgiens en amont et ensuite, Momentum construit automatiquement le planning hebdomadaire des MAR et IADEs. C’est un gain de temps inestimable ! C’est exactement ce que je cherchais et toutes les équipes en sont satisfaites.',
                author: 'Dr Jean-Marc Stordeur',
                role: 'anesthésiste-réanimateur, en charge des plannings MAR et IADEs, Hôpital Européen de Marseille',
            },
            {
                text: 'Je ne peux plus avoir un médecin sur deux vacations non compatibles en même temps sans que Momentum m’alerte. C’est une source de stress en moins.',
                author: 'Dr Jean-Marc Stordeur',
                role: 'anesthésiste-réanimateur, en charge des plannings MAR et IADEs, Hôpital Européen de Marseille',
            },
        ],
        relatedSectorHref: '/fr/secteurs-soins/anesthesie',
        relatedSectorLabel: 'Momentum pour l’anesthésie',
    },
];
