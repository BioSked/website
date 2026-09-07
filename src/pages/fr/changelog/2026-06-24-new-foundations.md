---
layout: "@layouts/ChangelogLayout.astro"
date: 2026-06-24
version: "4.6.0"
author: BioSked
title: 🧱 De nouvelles fondations
description: Momentum 4.6 a reconstruit la salle des machines, introduit des interrupteurs par instance pour les nouvelles fonctionnalités et ouvert la voie à la nouvelle application mobile.
image: "../../../assets/images/momentum4-6.png"
lang: fr

---

![Momentum 4.6](../../../assets/images/momentum4-6.png)

Momentum 4.6 est la version que vous étiez censés à peine remarquer. En dessous, 250 000 lignes de code historique ont été converties vers un langage moderne, et les nouvelles fonctionnalités peuvent désormais être activées instance par instance plutôt que pour tout le monde d'un coup. C'est ce qui a rendu possibles la nouvelle application mobile et les nouveautés de la 4.7.

### ✨ Nouveau

- **Interrupteurs par instance :** les nouvelles fonctionnalités s'activent instance par instance, pour un déploiement par étapes et avec vous.
- **La nouvelle application mobile** sort avec cette version. Elle a sa propre entrée ci-dessous.

### 🪲 Corrections

- Construire un planning par couche depuis la nouvelle vue par date fonctionne à nouveau.
- La nouvelle vue par date respecte le droit « Voir le panneau de filtres d'affichage ».
- L'export des notes est de retour dans la gestion des demandes.
- Dupliquer un planning ne duplique jamais les congés, et le personnel est désaffecté quand une copie tombe sur un jour de congé.
- Le filtre par défaut et la copie de contrat fonctionnent comme prévu.

### 🩹 Corrections de suivi pendant l'été

- **Juin :** les pages de paramétrage (groupes de sécurité, cycles de travail, contrats, groupes de rôles, groupes de personnel, liens rapides) s'enregistrent à nouveau correctement ; connexion à la fenêtre de pointage et heure personnalisée hors ligne ; création d'une affectation depuis la vue par date classique.
- **Juillet :** tri des totaux dans les rapports ; détails de pointage dans le compte d'heures ; l'entrée Dupliquer est de retour dans le menu de la vue par date classique.
- **Août :** duplication simple et en masse par-dessus des congés ; les affectations créées par des demandes peuvent être publiées, avec une confirmation ; les notes du jour ne s'affichent que pour leur établissement ; les congés des autres s'affichent dans la nouvelle vue par date ; publier depuis la fenêtre de construction fonctionne sur une période contenant un jour de congé ; le journal d'historique des affectations est complet.
- **Septembre :** les termes de contrat s'affichent correctement sur les instances où les politiques de congés viennent d'être activées ; la fenêtre « Nouveau site ».
