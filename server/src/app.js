import express, { json } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";
console.log(process.env.NODE_ENV);
const app = express();

app
  .use(json())
  .use(
    "/graphql",
    graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
  );

  export default app