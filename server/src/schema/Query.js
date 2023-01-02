import { GraphQLList, GraphQLObjectType, GraphQLID, GraphQLEnumType, GraphQLString, GraphQLNonNull } from "graphql";
import Client from "../model/client.mongo.js";
import Project from "../model/project.mongo.js";
import { ClientType, ProjectType } from "./Types.js";
export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }) {
        return await Client.findById(id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      async resolve(parent, args) {
        return await Client.find();
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }) {
        return await Project.findById(id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      async resolve(parent, args) {
        return await Project.find();
      },
    },
  },
});

