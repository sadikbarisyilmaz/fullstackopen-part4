import { set, Schema, model } from "mongoose";
import "dotenv/config";

set("strictQuery", false);

const blogSchema = new Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Blog = model('Blog', blogSchema)


