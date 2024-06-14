import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import * as resolvers from './resolvers.js';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Servidor GraphQL escuchando en http://localhost:4000/graphql');
});