# Introduction_p5js

This is a french introduction to p5*js : http://p5js.org

P5js est un projet issu de processing qui est un langage de programmation basé sur java orienté vers la création graphique et interactive. P5js a pour but de transposer l'esprit de processing au web et donc au langage javascript. C'est un framework simple d'accès pour les débutants avec une bonne documentation et une communauté active. 

P5js propose l'intégration dans un canvas html5 d'un maximum de fonction pour le dessin et d'animation, des possibilités d'interaction à travers différentes interfaces homme machine (clavier, souris, webcam, micro ...), ou encore avec les composants d'une page web et un support partiel mais en développement de webgl.

De nombreuses librairies viennent offrir de nouvelles possibilité, mais il p5js peut naturellement s'interfacer avec n'importe quelle librairies js.

P5js est différent de processing.js par le fait que le langage de base est le js. Lorsqu'on utilise processing.js on a générallement développé un programme avec processing et on utilise processing.js pour traduire le programme en javascript qui devient alors exécutable dans une page web. Avec p5js on code directement en javascript un langage natif pour les navigateurs.

Cette introduction va couvrir l'essentiel du workflow avec p5js, présenter les différentes fonctions de dessin et la base de la programmation en js ( conditions, boucles for et fonction + prototypage d'objets javascript).

<a name="contenu"/>
## Contenu

* [Comment travailler avec p5js](#p5js_tools)<br>
* [Principes de bases](#bases)<br>
* [Dessiner avec la souris](#dessiner)<br>
	*[Les couleurs et la transparence](#couleurs)<br>
	*[Utilisation de variables](#simuler)<br>
	*[Réaliser des symétries](#symetries)<br>
	*[Fonctions transformation de l'espace et formes complexes](#fonctions)<br>
* [Animation et objets](#animation)<br>
* [Grilles](#grilles)<br>
* [DOM](#dom)<br>
* [Ressources](#ressources)<br>



<a name="p5js_tools"/>
## Comment travailler avec p5js

Vous avez plusieurs choix : 


### openprocessing

Openprocessing est une plateforme collaborative qui permet de coder avec p5js ou processing.js. Il suffit de créer un compte gratuit et de cliquer sur 'create a new sketch' et c'est partit ! Openprocessing permet d'uploader des images, des vidéos ou des sons et supporte plusieurs librairies y compris un librairie websocket qui permet à plusieurs utilisateur d'interagir à distance dans un même canvas.

[Openprocessing](http://openprocessing.org)

La plupart des exemples de ce cours seront probablement porté sur openprocessing à une date indéfinie. Mais vous pouvez copier l'intégralité du fichier "sketch.js" de n'importe quel dossier dans l'éditeur de code d'openprocessing, puis de cliquer sur "run".

Il est aussi possible d'intégrer des librairies javascript externes voici un exemple pour faire cela : https://www.openprocessing.org/sketch/385808

Openprocessing est pratique car il permet de se passer de serveur local et permet de créer des portofolio d'applications interactives très facilement.

![Openprocessing](assets/openprocessing.png)
![Openprocessing](assets/openprocessing-2.png)


### editor

Il existe une application windows, osx ou linux, faisant office d'éditeur et de serveur web. Il est disponnible sur la page de téléchargement de p5js

http://p5js.org/download/

L'éditeur fait aussi office de serveur, et permet donc de travailler avec des images, vidéos et sons, sans avoir à lancer de serveur local.


### developpeur web 

Le plus simple est probablement de [télécharger](http://p5js.org/download/) et d'ajouter la librairie js ou d'utiliser les liens cdn dans votre fichier index.html.

Pour rappel CDN signifie Content Delivery Network et permet de lier son code à des librairies qui sont déjà hébergées en ligne.

Généralement un bon éditeur de texte suffit. Parfois il pourra être utile d'utiliser un serveur local pour servir certaines pages demandant accès à des fonctions ou fichiers spécifiques (généralement des pages utilisant des images ou des sons sous formes de fichier doivent être ouvertes avec un serveur local). Il y a des nombreuses possibilités pour cela et beaucoup de documentation en ligne : personnellement j'utilise 'sinatra' un serveur en ruby, simplehttpserver pour python peut-être une alternative, ou d'autres encore via nodejs voire même des logiciels comme mamp.


### des librairies

P5js recense un bon nombre de librairies compatibles et revendiquant le même esprit : http://p5js.org/libraries/
Mais il peut aussi être utilisé avec n'impote quelles autres librairies js.

[^ home](#contenu)<br>



<a name="bases"/>
## Les principes de bases

Un programme p5js est destiné à être utilisé dans une page web. Généralement en dispose d'un fichier *index.html* qui nous permet de définir notre page web et les fichiers ressources (liens vers les librairies) et d'un fichier *sketch.js* qui va être notre programme écrit en javascript.

### HTML et JS

Le fichier *sketch.js* est lié au fichier *index.html* par une déclaration dans ce dernier.

```HTML
<script language="javascript" type="text/javascript" src="sketch.js"></script>

```
Lorsqu'on ouvre le fichier *index.html* celui-ci executera alors le fichier *sketch.js* dans la page web.

Dans le cas de nos exemples nous trouverons les librairies javascripts dans un dossier **/librairies** dédié : on y trouve *p5.js*, *p5.dom.js*, *p5.sound.js*.

Le fichier *index.html* ressemblera donc à ceci si on utilise toutes les librairies :

```HTML
<html>
<head>
  <meta charset="UTF-8">
  <script language="javascript" type="text/javascript" src="../libraries/p5.js"></script>
  <script language="javascript" type="text/javascript" src="../libraries/p5.dom.js"></script>
  <script language="javascript" type="text/javascript" src="../libraries/p5.sound.js"></script>
  <script language="javascript" type="text/javascript" src="sketch.js"></script>
  <style> body {padding: 0; margin: 0;} </style>
</head>
<body>
</body>
</html>
```


### p5js

Notre fichier *sketch.js* est notre code écrit en javascript. Par défaut : il contient deux fonctions nécessaires à l'éxecution des fonctions de l'api p5js (Application Programming Interface)

```javascript

function setup() {

}

function draw() {
  
}

```

La fonction **setup()** est executée une fois à chaque chargement de la page, elle est utile pour initialiser des valeurs ou créer des éléments de page web - comme un canvas pour dessiner :

```javascript
function setup() {
    // créer un objet de type HTML5 canvas aux dimension de la fenêtre de notre navigateur
	createCanvas(windowWidth,windowHeight) 
}
```

**windowWidth** et **windowHeight** sont des **variables** disponnible dans processing pour renseigner le programme sur la taille de la fenêtre du navigateur de l'utilisateur.

Une **variable** est quant à elle un espace mémoire dans le navigateur accessible par notre programme. En javascript nous devrons créer et manipuler des variables régulièrement, mais p5js dispose de certaines variables déjà nommées pour connaitre l'état du navigateur ou la position de la souris ou même encore les touches pressées par l'utilisateur.

La fonction **draw()** est elle une boucle infinie : le code entre les deux accolades est éxecuté en boucle par votre navigateur aussi vite que possible. Cela tranche avec le principe évenementiel du javascript, mais ici nous allons faire des applications interactives avec de l'animation.

Vous pourrez trouver la référence du langage p5js ) cette adresse : http://p5js.org/reference/


[^ home](#contenu)<br>



<a name="dessiner"/>
## Dessiner avec la souris

Le premier code sur lequel nous allons travailler est un programme de dessin. Lorsque vous créez un nouveau 'sketch' sur openprocessing vous vous retrouvez avec ce code sous les yeux :

```javascript
// initialisation du programme
function setup() {
  // création d'un canvas à la taille de la fenêtre du navigateur
  createCanvas(windowWidth, windowHeight); 
  // création d'un fond gris
  background(100);  
  
} 

// boucle d'execution de notre application
function draw() {
  // dessiner un rond à l'endroit de la souris
  ellipse(mouseX, mouseY, 20, 20);
}
```

Chaque execution d'une boucle draw dessine un cercle de 20 pixels au coordonnées de la souris. Il faut noter que le repère de coordonnées dans p5js par défaut place l'origine, c'est à dire le point de coordonées (0,0) en haut à gauche. Les abscisses sont croissantes lorsqu'on se déplace vers la droite et les ordonnées croissantes lorsqu'on se déplace vers le bas.

Vous pouvez expérimenter avec ce programme pour vous en rendre compte : https://www.openprocessing.org/sketch/388459

**ellipse** est un mot clé permettant de dessiner une ellipse d'une taille précise à une endroit précis en lui passant des **paramètres**, ce sont les valeurs que l'on donne entre parenthèses :

* les deux premier paramètres sont les coordonnées de l'endroit où dessiner l'ellipse
* les deux suivant sont la largeur et la hauteur de l'ellipse.

**mouseX** et **mouseY** sont des variables globales définies par processing et donnent la position de la souris au moment du calcul de l'image en les utilisant comme les deux premiers paramètres pour le dessin de notre ellipse on change la position de dessin et on dessine à l'emplacement de la souris.

La page de référence concernant l'ellipse nous renseigne sur tout cela : http://p5js.org/reference/#/p5/ellipse

Il est possible de dessiner bien d'autres formes ou **primitives** en 2d ou en 3d. Il est aussi possible de composer des formes complexes à l'aide de courbes de béziers ou de vertex.

Voici la page de référence sur les formes : http://p5js.org/reference/#group-Shape

Dans ce programme le fond n'est jamais rafraichit et donc les cercles sont dessinés les uns après les autres sur un fond gris. Si vous rajoutez la commande 

```javascript
background(100)
```

à ce moment là : à chaque image le fond sera remplacé par un fond gris avant dessiner notre ellipse. Le résultat sera alors un rond qui suivra la position de la souris.



[^ home](#contenu)<br>



<a name="couleurs"/>
### Les couleurs et la transparence
 
Pour coloriser nos dessins il est possible d'utiliser les fonctions **stroke()** ou **noStroke()** et **fill()** ou **noFill()**.
"stroke" signifie contour et permet donc de préciser la couleur du trait, et "fill" signifie remplissage et permet donc de préciser la couleur de remplissage de la forme. A partir du moment ou sont fonctions sont appelées, elles s'appliquent à tous les dessins qui suivent.

Ce programme vous permettra d'illustrer l'utilisation de ces fonctions : https://www.openprocessing.org/sketch/181425

Le comportement de ces fonctions est particulièrement modulaire comme le présente la page de doc : http://p5js.org/reference/#/p5/fill

Pour résumer:

* si vous n'utilisez qu'un paramètre vous êtes en niveau de gris : 0 = noir / 255 = blanc
* si vous utilisez trois paramètres vous êtes en rgb : chaque paramètre étant compris entre 0 et 255 => fill(255,0,0) donnera du rouge
* si vous utilisez quatre paramètres vous ajoutez un cannal alpha pour gérer la transparence : 0 étant transparent et 255 opaque
* vous pouvez aussi utiliser du code hexa-décimal pour rentrer des couleurs
* il est possible de passer du mode rgb au mode hsb grace à la fonction **colorMode()**

Voici le programme précédent avec de nouvelles couleurs :

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(180,100,0);  
  
} 

function draw() {
  // cercle à la position de la souris
  fill(255,0,0,50)
  noStroke()
  ellipse(mouseX, mouseY, speed, speed);
 }
 ```


[^ home](#contenu)<br>


<a name="simuler"/>
### utilisation de variables :"Simuler" un pinceau

Nous allons vouloir maintenant compléxifier notre programme. La première chose que nous allons faire est de rendre le dessin un peu plus sensible. L'idée serait de faire en sorte que lorsque notre geste est rapide les cercles soit gros et qu'ils soient petit quand notre geste est lent (une sorte de pinceau inversé).

Pour cela nous allons essayer de calculer une valeure qui soit proportionelle à la vitesse de déplacement de notre souris. P5js dispose de deux variable dédiées pour connaitre aussi la position de la souris à l'image précédente : elles s'appellent **pmouseX** et **pmouseY**. A partir de la nous pouvons calculer la moyenne du déplacement en abscisses et en ordonnées entre deux images.

Nous allons donc créer une variable javascript que nous allons appeler *speed* pour stocker cette valeur :

```javascript
var speed=(abs(pmouseX-mouseX)+abs(pmouseY-mouseY))/2

```
puis utiliser cette valeur comme paramètre de la taille de nos ellipses :

```javascript
ellipse(mouseX, mouseY, speed, speed)

```

Nous pouvons aussi calculer une vraie valeur physique en calculant la magnitude du vecteur directeur du mouvement entre deux images ! Il s'agit simplement d'appliquer le théorème de Pythagore :

```javascript
var speed=pow(pow(pmouseX-mouseX,2)+pow(pmouseY-mouseY,2),0.5)
```

Nous obtenons alors notre premier exemple disponnible dans le dossier */01_dessiner_01*

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(180,100,0);  
  
} 

function draw() {
  
  var speed=(abs(pmouseX-mouseX)+abs(pmouseY-mouseY))/2

  fill(255,0,0,50)
  noStroke()
  ellipse(mouseX, mouseY, speed, speed);
}
```

https://www.openprocessing.org/sketch/388464


[^ home](#contenu)<br>



<a name="symetries"/>
### Réaliser des symétries

Nous allons maitenant réaliser différentes symétries pour compléxifier le rendu de notre programme de dessin. Dans le cadre de notre reprère processing réaliser une symétrie est relativement simple. 

Avec un peu d'astuce on se rend compte qu'une symétrie axiale consiste à faire en sorte que les distance entre deux bords parallèles délimitant un espace de dessin soit la même.

Ainsi : 

```javascript
  ellipse(mouseX, mouseY, speed, speed);
  ellipse(mouseX, windowHeight-mouseY, speed, speed);
```
permet de dessiner une ellipse aux coordonnées de la souris et une par symétrie axiale horizontale au centre de notre canvas.


```javascript
  ellipse(mouseX, mouseY, speed, speed);
  ellipse(windowWidth-mouseX, mouseY, speed, speed);
```
permet de dessiner une ellipse aux coordonnées de la souris et une par symétrie axiale verticale au centre de notre canvas.

et finalement : 

```javascript
  ellipse(mouseX, mouseY, speed, speed);
  ellipse(windowWidth-mouseX, windowHeight-mouseY, speed, speed);
```
permet de dessiner une symétrie centrale !

Notre programme devient donc :

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(180,100,0);  
  
} 

function draw() {
  
  var speed=(abs(pmouseX-mouseX)+abs(pmouseY-mouseY))/2

  fill(255,0,0,50)
  noStroke()
  ellipse(mouseX, mouseY, speed, speed);
}

```

https://www.openprocessing.org/sketch/388181


[^ home](#contenu)<br>



<a name="fonctions"/>
### Fonctions, transformations de l'espace et formes complexes

En javascript, il est assez facile de définir de nouvelles fonctions :

```javascript
var draw_rect = function(x,y,size,rot){
  push()
  rectMode(CENTER)
  translate(x,y)
  rotate(frameCount/10)
  rect(0,0,size+10  ,size+10)
  pop()
}
```

[^ home](#contenu)<br>









<a name="animation"/>
## Animer un déplacement






[^ home](#contenu)<br>



<a name="grilles"/>
## Grilles et patterns

- transformation de l'espace
- images, filtres et blends




[^ home](#contenu)<br>



<a name="dom"/>
## DOM

video + dom
mode instance de p5js






[^ home](#contenu)<br>




<a name="ressources"/>
## Ressources

* Référence du langage : http://p5js.org/reference/

* Exemples interactifs de p5js.org : http://p5js.org/examples/

* Tutorials sur p5js.org : http://p5js.org/tutorials/

* Vidéos de Daniel Shiffman : https://www.youtube.com/user/shiffman/playlists?shelf_id=14&view=50&sort=dd

* Nature of Code de Daniel Shiffman : http://natureofcode.com/book/

* Travailler avec p5.sound : https://github.com/b2renger/p5js_sound_examples

* Expérimentations typographiques : https://b2renger.github.io/p5js_typo/

* Exemples Computer Vision : https://kylemcdonald.github.io/cv-examples/
	
* Introduction web sockets et nodejs : link tuto  https://github.com/processing/p5.js/wiki/p5.js

[^ home](#contenu)<br>
