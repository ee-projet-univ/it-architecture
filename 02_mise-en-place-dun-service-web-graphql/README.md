# Architecture des sytèmes d'information - TD 2

📢 Mise en place d'un service web GraphQL avec un exemple en nodejs

## Objectifs

- Réaliser l'implémentation du service web GraphQL avec les instructions ci-dessous.

- Tester et valider le comportement.

- Identifier les avantages et les inconvénients

## Contexte

- Le serveur GraphQL à créer doit exposer une `Query` "helloWorld" qui attend un paramètre `name` et retourne le message `Hello {{ name }}`

- 👉 Pourquoi nodejs ? https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools

## Instructions

### Initialiser un projet nodejs :

- Setup: `mkdir graphql-web-service; cd graphql-web-service; npm init --yes;`
- Installation des dépendences: `npm install express express-graphql graphql nodemon --save;`. Documentation de la librarie graphql: https://graphql.org/graphql-js/running-an-express-graphql-server/
- Modifier le fichier _package.json_ - ajouter la commande de démarrage du serveur `"start": "nodemon index.js"` dans la section `scripts`
- Créer un fichier `index.js`

### Implémenter le serveur graphql

- Implémenter le serveur GraphQL dans le fichier `index.js`. Documentation: https://graphql.org/graphql-js/running-an-express-graphql-server/
- Démarrer le server REST: `npm start`
- Vérifier que l'interface GraphiQL est accessible : http://localhost:4000/graphql

### Implémenter la query `helloWorld`.

- La query doit prender en paramètre la chaîne de caractère `name` et doit retourner le message `Hello {{ name }}` Documentation: https://graphql.org/learn/

### Tester la query `helloWorld`

- Dans l'interface GraphiQL, appeler la query `helloWorld` avec la paramètre `name`, vérifier le message de retour `Hello {{ name }}`

## Analyse

Identifier les avantages et les inconvénients de ce type de service web.
(Compréhesion & rapidité du dev, taille du code source, temps de réponse, poid de la réponse, disponibilité des documentations, tendence d'utilisation...)
