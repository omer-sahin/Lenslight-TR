import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  uploadedAt: { type: Date, default: Date.now },
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  url:{
    type:String,required:true
  }
});



const photo=mongoose.model("photo",photoSchema)


export default photo