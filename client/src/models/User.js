import exp from "constants";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  
  {
  

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    secoundemail: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
      role: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    verificationCode: {
      type: String,
      required: false,
      expires: 30,
    },
    
    token_id:{
      type: String,
      required: false,
    },
    fileupload: { type: String,
      required: false,
     }

    

  },

  { timestamps: true, collection: "user" }
);

export default mongoose.models.User || mongoose.model("User", userSchema);


