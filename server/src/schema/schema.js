import Client from "../model/client.mongo.js";
import Project from "../model/project.mongo.js";
// import { Query } from "./Query.js";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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

const ProjectType = new GraphQLObjectType({
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

const query = new GraphQLObjectType({
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

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, phone }) {
        const client = new Client({ name, email, phone });
        return await client.save();
        // Client.create
      },
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return Client.findByIdAndDelete(id);
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, { name, description, status, clientId }) {
        const project = new Project({ name, description, status, clientId });

        return project.save();
      },
    },
    deleteClient:{},
    deleteProject:{}
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
