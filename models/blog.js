import { set, Schema, model } from "mongoose";
import "dotenv/config";

set("strictQuery", false);

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = model('Blog', blogSchema)

export default Blog;
