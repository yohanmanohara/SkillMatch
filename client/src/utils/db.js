import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
     console.log("connecting to mongoDB");
    
    
  } catch (error) {
    console.error(`Error connectin mongo: ${error.message}`);
    
  }
}
