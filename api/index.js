import express, { json } from 'express'
const app = express()
import cors from 'cors'
import { connect } from 'mongoose'
import "dotenv/config";
import Blog from '../models/blog.js';

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

connect(MONGODB_URI).then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log(err);
})

app.use(cors())
app.use(json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})