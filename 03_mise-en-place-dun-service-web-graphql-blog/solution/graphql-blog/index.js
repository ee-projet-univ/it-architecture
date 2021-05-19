const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
});

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar Date

  union SearchResult = Article | Comment

  # Declare the queries
  type Query {
    users: [User!]!
    articles(first: Int): [Article!]!
    search(contains: String!): [SearchResult!]!
  }

  # Declare the mutations
  type Mutation {
    createUser(user: CreateUserInput): User!
    createArticle(article: CreateArticleInput): Article!
    createComment(comment: CreateCommentInput!): Comment!
  }

  # Declare the types
  type User {
    id: String!
    username: String!
    createdAt: Date
  }

  type Article {
    id: ID!
    title: String!
    body: String!
    createdAt: Date!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: Date!
  }

  # Declare the inputs
  input CreateUserInput {
    username: String!
  }

  input CreateArticleInput {
    title: String!
    body: String!
    user: ID!
  }

  input CreateCommentInput {
    body: String!
    article: ID!
    user: ID!
  }
`;

const userSchema = new mongoose.Schema({
  username: String,
  createdAt: Date,
});
const User = mongoose.model("User", userSchema);

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});
const Article = mongoose.model("Article", articleSchema);

const commentSchema = new mongoose.Schema({
  body: String,
  createdAt: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  article: { type: Schema.Types.ObjectId, ref: "Article" },
});
const Comment = mongoose.model("Comment", commentSchema);

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => User.find({}),
    articles: (_, { first }) =>
      Article.find({})
        .sort({ createdAt: "desc" })
        .limit(first ?? 0),
    search: async (_, { contains }) => {
      const findCriteria = {
        body: { $regex: contains, $options: "i" },
      };

      return [
        ...(await Article.find(findCriteria).exec()),
        ...(await Comment.find(findCriteria).exec()),
      ];
    },
  },
  Mutation: {
    createUser: async (_, { user }) =>
      User.create({ ...user, createdAt: new Date() }),
    createArticle: async (_, { article }) =>
      Article.create({ ...article, createdAt: new Date() }),
    createComment: async (_, { comment }) =>
      Comment.create({ ...comment, createdAt: new Date() }),
  },
  Article: {
    comments(parent) {
      return Comment.find({ article: parent.id });
    },
  },
  SearchResult: {
    __resolveType: (data) => {
      return data.article ? "Comment" : "Article";
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
