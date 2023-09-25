import express, { json } from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { blogsRouter } from './controllers/blogs.js'
import { errorHandler, requestLogger, unknownEndpoint } from './utilities/middleware.js'
import { MONGODB_URI } from "./utilities/config.js"
import { error, info } from './utilities/logger.js'

connect(MONGODB_URI).then(() => {
    info("Connected to MongoDB");
}).catch((err) => {
    error(err);
})

export const app = express()
app.use(cors())
app.use(json())

app.use('/api/blogs', blogsRouter)

app.use(requestLogger)
app.use(unknownEndpoint)
app.use(errorHandler)

