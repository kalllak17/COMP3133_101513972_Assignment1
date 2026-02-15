require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const rootResolver = require("../src/schema/resolver");
const gqlSchema = require("../src/schema/schema");
const connectDB = require("../config/db");

const app = express();

connectDB();

app.use(
    "/",
    graphqlHTTP({
        schema: gqlSchema,
        rootValue: rootResolver,
        graphiql: true,
    })
);

module.exports = app;
