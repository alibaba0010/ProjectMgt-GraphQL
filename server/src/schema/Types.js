import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import Client from "../model/client.mongo.js";

// Client
export const ClientType = new GraphQLObjectType({
   name: "Client",
   fields: () => ({
     id: { type: GraphQLID },
     name: { type: GraphQLString },
     email: { type: GraphQLString },
     phone: { type: GraphQLString },
   }),
 });

export const ProjectType = new GraphQLObjectType({
   name: "Project",
   fields: () => ({
     id: { type: GraphQLID },
     name: { type: GraphQLString },
     description: { type: GraphQLString },
     status: { type: GraphQLString },
     client: {
       type: ClientType,
       async resolve({ clientId }, args) {
         return await Client.findById(clientId);
       },
     },
   }),
 });