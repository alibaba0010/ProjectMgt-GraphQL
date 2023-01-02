import pkg from "mongoose";
const { Schema, model, Types } = pkg;

const ProjectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
   type: Types.ObjectId,  
   ref: "Client" 
  }
});

export default model("Project", ProjectSchema);
