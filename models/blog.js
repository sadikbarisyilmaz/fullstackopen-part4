import { set, Schema, model } from "mongoose";
import "dotenv/config";

set("strictQuery", false);

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
export const Blog = model('Blog', blogSchema)


