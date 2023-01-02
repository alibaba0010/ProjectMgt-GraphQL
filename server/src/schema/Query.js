import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";

// export const Query = new GraphQLObjectType({
//   name: "Query",
//   fields: {
//     client: {
//       type: ClientType,
//       args: { id: { type: GraphQLID } },
//       async resolve(parent, { id }) {
//         return await Client.findById(id);
//       },
//     },
//     clients: {
//       type: new GraphQLList(ClientType),
//       async resolve(parent, args) {
//         return await Client.find();
//       },
//     },

//     project: {
//       type: ProjectType,
//       args: { id: { type: GraphQLID } },
//       async resolve(parent, { id }) {
//         return await Project.findById(id);
//       },
//     },
//     projects: {
//       type: new GraphQLList(ProjectType),
//       async resolve(parent, args) {
//         return await Project.find();
//       },
//     },
//   },
// });

