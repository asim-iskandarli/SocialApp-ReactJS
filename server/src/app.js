import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';
import jwt from 'jsonwebtoken';

const port = process.env.PORT || 4000

const app = express();
const corsOptions = {
    origin: port,
    credentials: true
}
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
        async serverWillStart() {
            return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
            };
        },
    },
    ],

});
await server.start();

app.use(
    '/graphql',
    cors(corsOptions),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization || null;

            if (token) {
                const { id } = jwt.verify(token, process.env.JWT_SECRET);
                return { userId: id };
            }
        },
    }),
);

await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at ${process.env.CLIENT_URI}:${port}/graphql`);