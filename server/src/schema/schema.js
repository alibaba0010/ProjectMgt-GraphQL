import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
} from "graphql";

// Client
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return { name: "Ali" };
    },
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
