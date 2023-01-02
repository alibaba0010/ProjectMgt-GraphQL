import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLString,
  GraphQLID
} from "graphql";
import Client from "../model/client.mongo.js";
import Project from "../model/project.mongo.js";

import { ClientType, ProjectType } from "./Types.js";
// Mutations
export const mutation = new GraphQLObjectType({
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
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return Project.findByIdAndDelete(id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "UpdateProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, { id, name, description, status }) {
        Project.findByIdAndUpdate(
          id,
          { $set: { name, description, status } },
          { new: true }
        );
      },
    },
  },
});
