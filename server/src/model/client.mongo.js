import pkg from "mongoose";
const { Schema, model } = pkg;

const ClientSchema = new Schema({
   name:{
      type: String
   },
   email:{
      type: String
   },
   phone:{
      type: String
   }
});

export default model("Client", ClientSchema);
