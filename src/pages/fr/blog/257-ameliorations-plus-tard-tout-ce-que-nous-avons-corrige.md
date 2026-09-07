---
layout: "@layouts/ArticleLayout.astro"
date: 2026-09-07
author: David Dudok de Wit
title: "257 améliorations plus tard : tout ce que nous avons apporté à Momentum depuis avril"
description: "Entre avril et septembre, nous avons déployé 257 améliorations dans Momentum, dont 131 corrections et 83 nées directement de vos retours. Voici le bilan complet, sans jargon."
image: "../../../assets/fr-blog/momentum-2026-09-ce-que-nous-avons-corrige.png"
canonicalPath: "/fr/blog/257-ameliorations-plus-tard-tout-ce-que-nous-avons-corrige/"

---

![257 améliorations livrées depuis avril](../../../assets/fr-blog/momentum-2026-09-ce-que-nous-avons-corrige.png)

Chaque matin, des milliers de personnes ouvrent Momentum pour vérifier une seule chose : mon planning est-il juste ? Entre avril et septembre, cette question a guidé l'essentiel de notre travail.

Vous en avez senti une partie sur votre propre planning : des comptes qui tombent juste à nouveau, une construction plus rapide, une nouvelle application mobile. Peu d'entre vous ont vu l'ensemble, parce que nous vous l'avons raconté au fil des réponses du support, d'un webinaire et de quelques emails. Ce n'est pas la même chose que de l'écrire noir sur blanc, au même endroit. Voici donc le bilan.

## Les chiffres, et d'où ils viennent

Entre le 1<sup>er</sup> avril et le 6 septembre, nous avons déployé 257 améliorations dans Momentum. Le chiffre n'est pas arrondi : c'est le nombre d'éléments que notre outil de suivi marque comme déployés sur cette période, des corrections visibles jusqu'à la tuyauterie qui les rend possibles. Parmi eux :

- 131 sont des corrections, et autant de gains de fiabilité au quotidien : des comptes justes, des notifications qui arrivent aux bonnes personnes, des exports complets.
- 83 viennent directement d'un retour de l'un d'entre vous : un échange avec le support, une demande, une remarque après un appel.
- 124, près de la moitié, ont été signalés par notre propre équipe support et succès client, souvent en votre nom. La plupart des 83 en font partie.
- 1 106 modifications de code ont été fusionnées pour y arriver.

Tout cela est sorti en trois versions principales (4.5 en avril et mai, 4.6 en juin, 4.7 en août), deux correctifs intermédiaires, une application mobile entièrement nouvelle et, depuis fin août, de petites mises en production presque chaque semaine. Le détail, version par version, est sur notre [page changelog](/fr/changelog/).

## Ce que nous avons corrigé, en clair

Nous avons regroupé les points marquants par problème résolu, parce que c'est ainsi que vous nous les avez envoyés.

**Vos comptes d'heures et de congés tombent juste.** C'est ce dont vous nous avez le plus parlé, et le plus important : une journée de récupération valorisée 24 h au lieu de 7 h, des congés qui se chevauchent comptés deux fois, un solde de congés impossible à suivre sans fausser le compte d'heures. Les termes de contrat comptent désormais les jours de congé séparément des heures travaillées. Et quand nous avons remplacé le moteur de calcul, nous avons vérifié qu'il ne changeait aucun des chiffres que vous voyez déjà : avant sa mise en service, le nouveau moteur devait reproduire exactement chaque valeur existante, et il l'a fait. Zéro différence. Les corrections font que les comptes tombent juste ; cette vérification fait que le changement de moteur est invisible. Si le vôtre ne tombe toujours pas juste, dites-le-nous.

**Les politiques de congés sont réunies au même endroit.** Les droits à congés ne s'acquéraient qu'une fois par an, et tout le reste, des jours d'ancienneté aux règles de maladie, passait par des ajustements manuels. Les nouvelles politiques de congés rassemblent ces règles sur un seul écran, et un contrat peut pointer vers plusieurs politiques. C'est déployé progressivement, instance par instance, parce que cela touche des chiffres qui alimentent la paie, et toutes les instances ne l'ont pas encore.

**Approuver les demandes en voyant le planning.** Une demande approuvée est une promesse faite. Deux choses ont changé. Les demandes en attente peuvent maintenant s'afficher directement dans la vue par date, à côté des affectations qu'elles touchent. Et vous pouvez pré-approuver un ensemble de demandes, lancer une construction de test, regarder la couverture, puis confirmer ou revenir en arrière avant que quiconque soit notifié. Les deux sont déployées progressivement, instances les plus actives d'abord, et ne sont pas encore sur toutes les instances ; dites-le à votre référent BioSked si vous voulez en être tôt.

**Construire un planning redevient rapide, et reproductible.** Sur notre construction client de référence, le moteur classique est passé d'environ 43 minutes à 45 secondes. Deux constructions identiques donnent désormais le même planning : quand une trame contient plusieurs lignes identiques pour le même rôle, l'ordre dans lequel elles sont pourvues est maintenant fixe. Sur un planning, cela représentait 245 affectations sur 695 qui bougeaient d'une construction à l'autre. Vérifié sur de vrais plannings. Les modifications en masse d'un mois entier aboutissent d'une traite : 200 affectations demandaient 324 allers-retours vers la base de données, elles en demandent 6.

**Des notifications fiables.**

- Des notifications qui respectent les restrictions par rôle.
- Des alertes « planning publié » envoyées seulement quand un planning a été publié.
- Des administrateurs prévenus quand quelqu'un est retiré d'une affectation publiée.
- Des demandes déposées depuis l'application mobile qui laissent une notification et une trace dans l'historique.
- Une publication non pourvue dans la bourse aux activités qui ne retient plus les autres notifications.

Et les notifications administrateur respectent désormais leurs cases à cocher.

**Voir plus, cliquer moins.** Dans la nouvelle vue par date :

- Des colonnes en largeur auto.
- Des compteurs par jour et par groupe (affectations ou points) sans ouvrir un rapport.
- Des infobulles lisibles.
- Un menu contextuel plus clair, avec « Remplacer le personnel » limité aux seuls candidats possibles.
- Les affectations vides et obligatoires en rouge.
- Les vacations non pourvues visibles dans la vue Chronologie.
- Des filtres enregistrés qui s'ouvrent sur la période enregistrée, même quand le planning couvre plusieurs années.

**Des exports qui exportent.**

- L'export Excel depuis la nouvelle vue par date, et le même format de fichier qu'avant pour les exports de la vue liste.
- Des exports qui respectent le filtre ouvert, et des fichiers CSV au-delà de 1 000 lignes.
- Des exports SFTP planifiés qui contiennent désormais exactement ce qu'un export manuel contient, avec un port explicite.
- Des exports de calendrier qui aboutissent à chaque fois, et des affectations créées à partir de demandes approuvées qui arrivent maintenant dans les agendas Outlook.

**Une nouvelle application mobile.** Reconstruite de zéro et disponible sur l'App Store et Google Play depuis juillet : un écran « aujourd'hui », la connexion par Face ID ou empreinte, un accès hors ligne chiffré à votre planning, la connexion Microsoft en un geste (et SAML pour les autres fournisseurs d'identité, votre service informatique saura), des notifications push plus rapides, le mode sombre, cinq langues. Vos premières remarques à son sujet (réglages de visibilité des notes, demandes déposées visibles dans votre liste, horaires personnalisés sur iPhone) ont été prises en compte, et les mises à jour partent désormais vers un petit groupe d'abord, puis vers tout le monde.

![La nouvelle application mobile Momentum](../../../assets/images/momentum-mobile-app-2026-fr.png)

**Se connecter, à tous les coups.** Les mots de passe longs se connectent, les liens d'activation fonctionnent au second clic, et le support voit désormais pourquoi une connexion n'a pas abouti : « je n'arrive pas à me connecter » se règle en un seul échange.

## Comment nous améliorons Momentum

La version de juin a reconstruit 250 000 lignes de code historique sur des fondations modernes. Le bon choix pour les années à venir, et quelques semaines plus agitées que nous ne l'aurions voulu pour certains d'entre vous. Cela a aussi changé notre façon de livrer. Les grosses versions groupées, c'est terminé : depuis fin août, nous livrons de petits incréments, presque chaque semaine, d'abord sur quelques instances actives, et le [changelog](/fr/changelog/) montre ce qui est sorti et quand.

## Avec vos mots

*« Support très réactif, problème de paramétrage, solution trouvée en moins de 24 h. Top ! »*<br><cite>Administrateur Momentum, France, enquête support, août 2026</cite>

*« C'est un miracle de Noël ! Ça marche. Merci, merci, merci. »*<br><cite>Responsable imagerie, groupe médical, États-Unis, juin 2026, traduit de l'anglais</cite>

*« Depuis la mise à jour, la fonctionnalité est plutôt très bonne, plus simple. »*<br><cite>Utilisateur Momentum, enquête de satisfaction, mars 2026</cite>

La même réponse demandait des notes d'utilisation pour connaître toutes les fonctionnalités. Cet article, et la [base de connaissances](/fr/help/), sont notre réponse.

## Ce sur quoi nous travaillons ensuite

- La prévisualisation et la pré-approbation des demandes, activées sur les instances par étapes.
- Les politiques de congés activées sur l'ensemble des instances, puis les règles de report.
- Une page Demandes unique dans la nouvelle interface : congés, travail supplémentaire et échanges sur un seul écran, avec des approbations date par date.
- Des heures prêtes pour la paie : heures supplémentaires par taux, exports plus propres.
- Pour les cabinets qui utilisent un agenda de rendez-vous en ligne : un pilote dans lequel un planning Momentum publié alimente cet agenda.
- Et deux ou trois choses que notre équipe préfère vous montrer plutôt que vous décrire.

## Venez le voir

- **JFR 2026**, Palais des Congrès de Paris, du 8 au 11 octobre, stand 126A. [Réservez un créneau](/fr/demo/).
- **Amérique du Nord :** RSNA 2026, Chicago, du 29 novembre au 3 décembre.
- **Pour tous :** [parlez-nous](/fr/demo/) pour un tour de 20 minutes des nouveautés sur votre instance, ou parcourez la [base de connaissances](/fr/help/).

Merci pour vos retours. C'est avec eux que Momentum progresse.

David Dudok de Wit, CEO, BioSked
