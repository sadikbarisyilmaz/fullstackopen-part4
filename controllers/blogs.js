import { Router } from "express";
import { Blog } from "../models/blog.js";

export const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {

    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch (error) {
        response.status(404).json(error);
    }

});

blogsRouter.post('/', async (request, response) => {

    try {
        const blog = new Blog(request.body);
        const result = await blog.save();
        response.status(201).json(result);

    } catch (error) {
        response.status(400).json(error);
    }
});