const { success, error } = require('consola');
const { ApolloServer } = require('apollo-server-express')
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const AppModels = require('./models')
const {
    DB,
    PORT,
    IN_PROD
} = require('./config')
const { resolvers, typeDefs } = require('./graphql');
const { AuthMiddleware } = require('./middlewares/auth');
const { schemaDirectives } = require('./graphql/directives');

const app = express();
app.use(AuthMiddleware);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: IN_PROD,
    context: ({ req }) => {
        // let { isAuth, user } = req;
        return {
            // req, isAuth, user, ...AppModels,
            req, ...AppModels,
        }
    },
})

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const startApp = async () => {
    try {
        await mongoose.connect(DB, options)
        success({
            badge: true,
            message: `Successfully connected with the database`
        })
        httpServer.listen(PORT, () => success({
            badge: true,
            message: `Server Started on PORT ${PORT}`
        }))
    } catch (err) {
        error({
            badge: true,
            message: err.message
        })
    }
}

startApp();