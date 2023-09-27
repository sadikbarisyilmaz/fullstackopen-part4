import express, { json } from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { blogsRouter } from './controllers/blogs.js'
import { errorHandler, requestLogger, unknownEndpoint } from './utilities/middleware.js'
import { MONGODB_URI } from "./utilities/config.js"
import { errorlogger, info } from './utilities/logger.js'

connect(MONGODB_URI).then(() => {
    info("Connected to MongoDB");
}).catch((err) => {
    errorlogger(err);
})

export const app = express()
app.use(cors())
app.use(json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

