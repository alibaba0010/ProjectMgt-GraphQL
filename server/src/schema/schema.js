import { GraphQLSchema } from "graphql";
import { query } from "./Query.js";
import { mutation } from "./Mutation.js";

export const schema = new GraphQLSchema({
  query,
  mutation,
});
