import { Router } from "express";
import { Blog } from "../models/blog.js";
import "express-async-errors"
import { errorHandler } from "../utilities/middleware.js";
export const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({});
    response.json(blogs);

});

blogsRouter.post('/', async (request, response) => {

    const blog = new Blog(request.body);

    const result = await blog.save()
    response.status(201).json(result);

});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

})