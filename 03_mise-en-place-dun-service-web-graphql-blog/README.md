# Architecture des sytèmes d'information - TD 3

📢 Mise en place d'un service web GraphQL _Blog_ avec un exemple en nodejs

## Objectifs

- Réaliser l'implémentation du service web GraphQL avec les instructions ci-dessous.

- Tester et valider le comportement.

- Identifier les avantages et les inconvénients

## Contexte

**_👉 Pourquoi nodejs ? https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools_**

- Le serveur GraphQL sera développé avec la librairie ApolloServer. Documentation : https://www.apollographql.com/docs/apollo-server/
- Le moteur de base de données sera Mongodb
- L'ORM sera Mongoose. Documentation : https://mongoosejs.com/docs/guide.html

- Le serveur GraphQL à créer doit exposer les `type` suivants :

  - `User`: Utilisateurs pouvant créer des articles et de commentaires. `{ id: String, username: String, createdAt: Date }`
  - `Article`: Articles créé par un utilisateur et pouvant avoir des commentaires. `{ id: String, title: String, body: String, comments: [Comment], user: User, createdAt: Date }`
  - `Comment`: Commentaires liés à un article créé par un utilisateur. `{ id: String, body: String, user: User, article: Article, createdAt: Date }`

- Le serveur GraphQL à créer doit exposer les `query` suivantes :

  - `users`: récupérer la liste des utilisateurs
  - `articles`: récupérer la liste des articles

- Le serveur GraphQL à créer doit exposer les `mutation` suivantes :
  - `createUser`: créer un nouvel utilisateur
  - `createArticle`: créer un nouvel article pour un id d'utilisateur donné
  - `createComment`: créer un nouveu commentaire pour un id d'article donné et un id d'utilisateur donné

## Instructions

### Démarrer Mongodb

### Initialiser un projet nodejs :

- Setup: `mkdir graphql-blog; cd graphql-blog; npm init --yes;`
- Installation des dépendences: `npm install mongoose apollo-server graphql nodemon --save;`
- Modifier le fichier _package.json_ - ajouter la commande de démarrage du serveur `"start": "nodemon index.js"` dans la section `scripts`
- Créer un fichier `index.js`

### Implémenter le serveur graphql

- Implémenter le serveur GraphQL dans le fichier `index.js`:

```js
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar Date

  # Declare the queries
  type Query {
    users: [User!]!
  }

  # Declare the mutations
  type Mutation {
    createUser(user: CreateUserInput): User!
  }

  # Declare the types
  type User {
    id: String!
    username: String!
    createdAt: Date
  }

  # Declare the inputs
  input CreateUserInput {
    username: String!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
  Query: {
    // users: () => User.find({}),
  },
  Mutation: {
    // createUser: async (_, { user }) => User.create({ ...user, createdAt: new Date() }),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

- Démarrer le server REST: `npm start`
- Vérifier que l'interface GraphQL Playground est accessible : http://localhost:4000/

### Implémenter la connexion à la base données

Documentation: https://mongoosejs.com/docs/index.html

- Dans le fichier index.js:

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
});
```

### Créer les modèles User, Article & Comment

Documentation: https://mongoosejs.com/docs/models.html#compiling,
Documentation relations: https://mongoosejs.com/docs/populate.html

⚠ Les id sont générés automatiquement par Mongodb

Example:

```js
const userSchema = new mongoose.Schema({
  username: String,
  createdAt: Date,
});
const User = mongoose.model("User", userSchema);
```

### Implétenter les `mutation`

- Documentation Mongoose: https://mongoosejs.com/docs/models.html#constructing-documents
- Documentation Apollo Server: https://www.apollographql.com/docs/tutorial/mutation-resolvers/

- Créer un utilisateur
- Créer un article
- Créer un commentaire

### Implémenter et tester les `query`

- Documentation Mongoose: https://mongoosejs.com/docs/queries.html
- Documentation Apollo Server: https://www.apollographql.com/docs/apollo-server/data/resolvers/

- Récupérer la liste des utilisateurs
- Récupérer la liste des articles et leurs commentaires. Documentation: https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains
- Récupérer les X dernier articles créés, `X` étant un argument de la `query`.
  Documentation Mongoose: https://mongoosejs.com/docs/api/query.html#query_Query-limit, https://mongoosejs.com/docs/api/query.html#query_Query-sort
  Documentation Apollo server: https://www.apollographql.com/docs/apollo-server/data/resolvers/#handling-arguments
- Récupérer les articles et / ou commentaires selon une recherche sur le body. Pour les articles, récupérer le titre et le body, pour les commentaires récupérer le body. Documentation: https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
