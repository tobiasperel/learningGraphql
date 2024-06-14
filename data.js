import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';


// Sample data
const personas = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        edad: 8,
        email: 'juanperel@gmail.com',
        ciudad: 'Buenos Aires',
        barrio: 'Palermo'
    },
    {
        id: 2,
        nombre: 'Maria',
        apellido: 'Gomez',
        edad: 25,
        email: 'juanperel@gmail.com',
        ciudad: 'San Miguel',
        barrio: 'Centro'
    },
    {
        id: 3,
        nombre: 'Carlos',
        apellido: 'Rodriguez',
        edad: 35,
        email: 'carlosrodriguez@gmail.com',
        ciudad: 'rosario',
        barrio: 'norte'
    },
];

// Type definitions
const typeDefs = gql`
    type address {
        ciudad: String
        barrio: String
    }
    type Persona {
        id: ID!
        nombre: String
        apellido: String
        edad: Int
        email: String
        ciudad: String
        puedeTomarCerveza: Boolean
        direccion: address
    }

type Query {
    personas: [Persona],
    cantidadPersonas: Int,
    findPerson(nombre:String!): Persona
}
`;

// Resolvers
const resolvers = {
    Query: {
        personas: () => personas,
        cantidadPersonas: () => personas.length,
        findPerson: (root, args) => {
            return personas.find(persona => persona.nombre === args.nombre);
        },
    },
    Persona: {
        direccion: (root) => {
            return {
                ciudad: root.ciudad,
                barrio: root.barrio,
            };
        },
        puedeTomarCerveza: (root) => root.edad >= 18,
    },
};


const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo server before applying middleware
async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // Listen on a specific port
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
startServer();