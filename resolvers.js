import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';

const resolvers = {
  Query: {
    hello: () => {
      return '¡Hola mundo!';
    },
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({ schema, resolvers }));

app.listen(4001, () => {
  console.log('Servidor GraphQL escuchando en http://localhost:4001/graphql');
});