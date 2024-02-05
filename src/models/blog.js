import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "guest" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  });
  
const userSchema = new mongoose.Schema({
  userId:{ type: String, required: true },
  email: { type: String, required: true },
  username: { type: String },
  firstName:{ type: String, required: true },
  lastName:{ type: String, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  
});


const User =mongoose.models.User || mongoose.model('User', userSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
module.exports ={ Blog, User };