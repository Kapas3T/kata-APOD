# Discours de présentation — Kata APOD

Ce document est le texte de présentation (speaker notes) associé au fichier
`Kata-APOD-Presentation.pptx`. Il suit l'ordre des 27 diapositives et peut
être lu presque tel quel à l'oral. Public visé : débutant·e·s en
informatique, à l'aise avec un ordinateur mais n'ayant jamais (ou très peu)
programmé en HTML, CSS ou JavaScript.

Durée indicative : 18 à 25 minutes.

---

## 1. Diapo de titre — Kata APOD

Bonjour à toutes et à tous. Aujourd'hui, je vais vous présenter un petit
projet appelé **Kata APOD**. C'est un exercice de programmation qui permet
d'apprendre les trois langages de base du Web — le HTML, le CSS et le
JavaScript — en construisant une vraie petite application : un navigateur
pour la photo d'astronomie du jour publiée par la NASA.

Je vais essayer de vous expliquer ça sans supposer que vous connaissez déjà
ces langages. On va avancer étape par étape.

## 2. Sommaire

Voici le plan de cette présentation. On va d'abord parler du contexte :
qu'est-ce qu'un « kata » de code, et qu'est-ce que le projet APOD. Ensuite,
on va découvrir les trois langages du Web et le rôle de chacun. Puis on
regardera le code réel du projet, morceau par morceau, pour comprendre
comment il fonctionne concrètement. Et on terminera par un bilan : ce qui
marche, ce qui pourrait être amélioré, et ce qu'on retient de l'exercice.

## 3. Section — Partie 1 : Qu'est-ce qu'un « kata » de code ?

On commence par le contexte : qu'est-ce qu'un kata, et pourquoi en fait-on
en programmation ?

## 4. Un kata, c'est quoi ?

Le mot « kata » vient des arts martiaux. C'est une série de mouvements
qu'on répète encore et encore pour progresser, sans forcément se battre
contre quelqu'un. En programmation, on a repris cette idée : un kata de
code est un petit exercice qu'on refait régulièrement, seul ou en groupe,
pour s'entraîner et garder la main.

Ici, le kata est proposé par le **Coding Dojo de l'EPFL** — un groupe de
développeurs et développeuses qui se retrouvent pour s'entraîner ensemble.
Chaque personne est libre de choisir son langage et ses outils, puis
propose sa version sur GitHub via ce qu'on appelle une « pull request »,
une demande d'ajout de code. Le but n'est pas de gagner quoi que ce soit :
c'est d'apprendre, et de comparer les différentes façons de résoudre le
même problème.

## 5. Section — Partie 2 : Le projet APOD : contexte et objectif

Voyons maintenant le défi concret que ce kata propose de relever.

## 6. APOD : la photo d'astronomie du jour

APOD signifie « Astronomy Picture of the Day », soit « photo d'astronomie
du jour ». Depuis 1995, la NASA publie chaque jour une photo ou une vidéo
liée à l'astronomie, accompagnée d'une explication écrite par des
scientifiques. C'est visible sur le site officiel de la NASA.

Ce qui est intéressant pour nous, c'est que la NASA met aussi cette
information à disposition sous forme d'**API**. Une API, c'est une sorte
de porte d'entrée qu'un programme peut utiliser pour demander des données
à un service — ici, le titre, la date, la description et l'image du jour
— sans avoir besoin d'un navigateur qui affiche une vraie page web. Le défi
du kata, c'est justement d'utiliser cette API pour construire notre propre
page qui affiche cette photo du jour.

## 7. Ce que l'application doit savoir faire

L'énoncé du kata donne un cahier des charges assez précis. Trois grandes
familles d'exigences : d'abord, les informations à afficher — le titre, la
date, la description et le copyright de la photo. Ensuite, la navigation —
un bouton pour revenir au jour précédent, un bouton pour avancer au jour
suivant, qui doit être désactivé si on est déjà au jour le plus récent.
Et enfin, des exigences de qualité plus techniques : un titre d'onglet
dynamique qui change avec la date affichée, des informations « meta »
bien renseignées, et un pied de page avec un lien vers le code source.

## 8. À quoi ça doit ressembler ?

Voici la maquette fournie dans l'énoncé du kata. On voit la structure
attendue : une grande image centrale, une flèche de navigation à gauche et
une à droite, et en dessous, un bandeau avec les informations textuelles.
C'est exactement cette disposition que le projet que nous allons étudier
a reproduite.

## 9. Section — Partie 3 : Les trois langages du Web

Avant de regarder le code, prenons un moment pour comprendre les trois
langages utilisés dans ce projet, et le rôle que joue chacun d'eux.

## 10. Construire une page web, c'est comme construire une maison

Une bonne façon de comprendre la différence entre HTML, CSS et JavaScript,
c'est de penser à la construction d'une maison.

Le **HTML**, c'est la structure : les fondations, les murs, les pièces.
Il définit CE QUI se trouve sur la page — un titre, un paragraphe, une
image, un bouton — sans se soucier de son apparence.

Le **CSS**, c'est l'habillage : la peinture, la décoration, l'agencement
du mobilier. Il définit À QUOI ressemble la page — les couleurs, les
tailles, l'alignement des éléments.

Le **JavaScript**, c'est l'électricité et les automatismes de la maison :
les interrupteurs, l'alarme, le système domotique. Il définit CE QUE FAIT
la page — réagir à un clic, aller chercher des informations, modifier ce
qui s'affiche sans recharger la page.

Ces trois langages sont complémentaires, et c'est exactement ce qu'on
retrouve dans notre projet : un fichier HTML, un fichier CSS, et un
fichier JavaScript, qui travaillent ensemble.

## 11. HTML : décrire le contenu avec des balises

En HTML, on décrit le contenu à l'aide de « balises », qui s'écrivent
entre chevrons, généralement par paires : `<p>` pour ouvrir un paragraphe,
`</p>` pour le fermer.

La page est organisée en deux grandes zones. La zone `<head>` contient des
informations invisibles à l'écran, comme le titre qui apparaît dans
l'onglet du navigateur, ou une description utilisée par les moteurs de
recherche. La zone `<body>` contient, elle, tout ce qui s'affiche
réellement.

On utilise aussi beaucoup la balise `<div>`, qui représente simplement une
« boîte » qui regroupe plusieurs éléments. On lui donne souvent un nom —
un `id` ou une `class` — pour pouvoir la retrouver facilement plus tard,
en CSS ou en JavaScript.

## 12. Zoom code — la structure de index.html

Voici un extrait simplifié du vrai fichier `index.html` du projet. On
reconnaît une boîte `header` qui contient le grand titre de la page, une
boîte `mainmediabox` qui contient l'image, et un paragraphe avec l'id
`apod-title`, qui pour l'instant contient juste un texte provisoire.
Ce texte provisoire va être remplacé automatiquement dès que la page
reçoit les vraies données de la NASA — et c'est justement le JavaScript
qui va s'en charger, on le verra plus tard. Chaque boîte a un rôle précis
et un identifiant qui permet de la retrouver.

## 13. CSS : choisir une boîte et lui donner un style

En CSS, chaque règle commence par un sélecteur, qui répond à la question
« à quel élément est-ce que je m'adresse ? ». Par exemple, `.ma-classe`
cible tous les éléments qui ont `class="ma-classe"` dans le HTML.

Entre les accolades qui suivent, on liste des propriétés : la couleur du
texte, la taille d'un élément, l'espacement, l'alignement, etc.

Un outil particulièrement utile en CSS s'appelle **Flexbox**. Il permet
d'aligner plusieurs éléments en ligne ou en colonne, et de les centrer
très facilement. Dans notre projet, c'est exactement ce qui permet
d'aligner l'image et les deux flèches de navigation côte à côte, bien
centrées sur la page.

## 14. Zoom code — centrer les éléments avec Flexbox

Voici un extrait du fichier `stlyles.css` du projet. La règle `.flexbox`
utilise `display: flex`, qui transforme la boîte en une ligne flexible, et
`justify-content: center`, qui centre tout son contenu horizontalement.
C'est cette règle qui aligne et centre la flèche gauche, l'image, et la
flèche droite. La règle `.mainmediabox` fixe, elle, une largeur maximale
pour que l'image ne devienne pas trop grande sur un écran large.

## 15. Section — Partie 4 : Le code expliqué pas à pas

Maintenant qu'on comprend le rôle du HTML et du CSS, entrons dans le cœur
du sujet : le JavaScript, qui est ce qui rend cette page réellement
interactive.

## 16. JavaScript : rendre la page vivante

HTML et CSS décrivent une page statique — un peu comme une photo. Le
JavaScript, lui, lui donne vie. Dans ce projet, le JavaScript a trois
« super-pouvoirs » qu'on va explorer un par un :

Premièrement, il va chercher des données sur Internet, en interrogeant
l'API de la NASA. Deuxièmement, il modifie ce qui est affiché à l'écran —
le titre, l'image, la description. Troisièmement, il réagit aux clics de
la personne qui utilise la page, notamment sur les boutons « précédent »
et « suivant ».

## 17. Super-pouvoir 1 — Aller chercher des données : l'API et fetch()

On a vu qu'une API est une adresse qu'un programme peut interroger pour
obtenir des informations. En JavaScript, la fonction qui permet d'envoyer
cette demande s'appelle `fetch()`.

Quand on appelle `fetch()`, le navigateur envoie une requête au serveur de
la NASA, et attend sa réponse. Cette réponse arrive dans un format appelé
**JSON** — une structure de données organisée, un peu comme un tableau de
fiches, que les programmes savent très bien lire. Chaque « fiche » ici
correspond à un jour, et contient son titre, sa date, sa description,
l'adresse de son image, etc.

Ce qu'il faut retenir, c'est que cet échange se fait en arrière-plan, sans
recharger toute la page : on appelle ça une requête **asynchrone**.

## 18. Zoom code — fetchimage.js

Voici le vrai code du fichier `fetchimage.js`. On y lit, dans l'ordre :
on appelle `fetch()` avec l'adresse de l'API de la NASA. Quand la réponse
arrive, le premier `.then` la transforme en JSON grâce à `data.json()`.
Le deuxième `.then` reçoit ces données déjà converties, les stocke dans la
variable `images`, puis appelle une fonction `loadInfo(0)` pour afficher
la photo la plus récente — celle d'aujourd'hui.

## 19. Super-pouvoir 2 — Modifier l'affichage : le DOM

Une fois qu'on a les données, il faut les afficher. C'est là
qu'intervient le **DOM**, le « Document Object Model ». C'est la
représentation de la page que le navigateur garde en mémoire en
permanence, et que JavaScript peut consulter et modifier.

Pour cibler une boîte précise, on utilise
`document.getElementById("...")`, en donnant l'id défini dans le HTML —
exactement les id qu'on a vus tout à l'heure, comme `apod-title`. Une fois
la boîte trouvée, on peut changer, par exemple, sa propriété
`.textContent` pour changer le texte affiché, ou sa propriété `.src` pour
changer l'image affichée.

C'est ce mécanisme — chercher une boîte par son id, puis la modifier — qui
permet d'afficher les vraies informations reçues de la NASA, sans jamais
recharger la page.

## 20. Zoom code — la fonction loadInfo()

Voici un extrait simplifié de la fonction `loadInfo()`, le cœur de
l'application. D'abord, elle calcule quel jour afficher, en s'assurant
avec `Math.max` et `Math.min` de rester entre 0 et 24 — c'est-à-dire parmi
les 25 jours que l'API nous a envoyés. C'est ce qu'on appelle un
« clamp » : ça empêche de sortir des limites des données disponibles.

Ensuite, elle va chercher la boîte `media-image` et met à jour son
adresse source avec l'image du jour correspondant. Puis elle va chercher
la boîte `apod-title` et met à jour son texte avec le titre du jour.

Dans le vrai code, cette fonction fait aussi quelque chose d'un peu plus
avancé : si le média du jour est une vidéo plutôt qu'une image, elle
remplace carrément la balise `<img>` par une balise `<iframe>`, qui permet
d'intégrer un lecteur vidéo YouTube directement dans la page.

## 21. Super-pouvoir 3 — Réagir aux clics : les événements

Dernier super-pouvoir : réagir aux actions de la personne qui utilise la
page. Dans le HTML, chaque flèche de navigation a un attribut `onclick`,
qui précise quelle fonction JavaScript doit s'exécuter quand on clique
dessus — `prevImg()` pour la flèche gauche, `nextImg()` pour la flèche
droite.

Ces deux fonctions sont très courtes : elles appellent simplement
`loadInfo()` avec l'index précédent ou suivant. Et grâce au « clamp » vu
juste avant, impossible de cliquer en dehors des 25 jours disponibles : le
bouton « suivant » ne peut jamais nous faire avancer au-delà
d'aujourd'hui.

## 22. Comment les trois langages collaborent

Récapitulons avec une vue d'ensemble. Quand on ouvre la page : le fichier
`index.html` se charge dans le navigateur, et déclenche le chargement de
`fetchimage.js`. Ce script contacte l'API de la NASA grâce à `fetch()`.
Dès que la réponse JSON arrive, la fonction `loadInfo()` met à jour le
DOM — c'est-à-dire le contenu réellement affiché. Et à chaque instant,
`stlyles.css` habille ces boîtes mises à jour : leurs couleurs, leur
disposition, leur centrage.

C'est cette collaboration entre les trois langages, chacun avec son rôle
précis, qui fait fonctionner l'application dans son ensemble.

## 23. Section — Partie 5 : Bilan, limites et ce qu'on apprend

Pour terminer, faisons le bilan de ce projet : qu'est-ce qui fonctionne
bien, qu'est-ce qui pourrait être amélioré, et qu'est-ce qu'on retient de
cet exercice.

## 24. Ce qui fonctionne aujourd'hui

Si on reprend le cahier des charges vu au début, voici ce qui est
effectivement réalisé dans ce projet : le titre de la page et le pied de
page avec le lien vers le code source, le titre, la date, la description
et le copyright de l'APOD bien affichés, les boutons précédent et suivant
qui fonctionnent avec la limite au jour le plus récent, les balises meta
renseignées, et le titre d'onglet qui se met à jour dynamiquement avec la
date affichée.

## 25. Ce qu'il reste à améliorer

Comme souvent dans un projet d'apprentissage, il reste des pistes
d'amélioration. Par exemple, la gestion des médias pourrait être
fiabilisée — certaines vidéos ne sont pas toujours correctement extraites
de la réponse de l'API. L'application pourrait aussi être mise en ligne
publiquement, par exemple avec GitHub Pages, pour être accessible sans
avoir à télécharger le code. On pourrait ajouter la possibilité de
partager l'URL d'une date précise, ou encore permettre à chacun·e
d'utiliser sa propre clé d'API plutôt qu'une clé partagée. Enfin, le dépôt
contient aussi des fichiers d'expérimentation qui ne font pas partie de
l'application finale et qui pourraient être nettoyés.

## 26. Ce qu'on retient de ce kata

Que retenir de ce petit projet ? D'abord, que HTML, CSS et JavaScript
jouent chacun un rôle bien distinct — structure, présentation,
comportement — et que c'est leur collaboration qui donne vie à une page
web. Ensuite, qu'une application web moderne « discute » très souvent avec
un serveur à distance via une API, en échangeant des données au format
JSON. On retient aussi que le DOM est le pont entre le code JavaScript et
ce que voit réellement la personne derrière son écran. Et surtout, que
s'entraîner sur un petit projet concret, avec un cahier des charges clair
comme celui-ci, est un excellent moyen d'apprendre le développement web
pas à pas.

## 27. Merci de votre attention

Voilà, c'était ma présentation du Kata APOD. Le code source complet est
disponible sur GitHub, à l'adresse indiquée à l'écran, si vous voulez
l'explorer par vous-même ou même essayer de réaliser votre propre version
du kata. Merci de votre attention, et je suis preneur ou preneuse de vos
questions.
