import { Schema, model } from 'mongoose'
import uniqueValidator from "mongoose-unique-validator"

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        minlength: 3,
        required: true,
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})


export const User = model('User', userSchema)