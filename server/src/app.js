import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";

dotenv.config();

const app = express();

app
  // .use(json())
  .use(cors())
  .use(
    "/graphql",
    graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
  );

export default app;
