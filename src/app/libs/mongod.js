import mongoose from "mongoose";
const MONGODB_URI = "mongodb://127.0.0.1:27017/blogtask"

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;