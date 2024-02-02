import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: String, default: "guest" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
module.exports = Blog