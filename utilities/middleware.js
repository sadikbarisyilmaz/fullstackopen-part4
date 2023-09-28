import { User } from "../models/user.js";
import { errorlogger, info } from "./logger.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const requestLogger = (request, response, next) => {
    info('Method:', request.method)
    info('Path:  ', request.path)
    info('Body:  ', request.body)
    info('---')
    next()
}

export const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, request, response, next) => {
    errorlogger(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

export const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization === undefined) {
        next()
    } else {
        request.token = authorization.replace('Bearer ', '')
        next()
    }
}

export const userExtractor = async (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization === undefined) {
        next()
    } else {
        const decodedToken = verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        request.user = user
        next()
    }
}