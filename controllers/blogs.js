import { Router } from "express";
import { Blog } from "../models/blog.js";
import "express-async-errors"
import { User } from "../models/user.js";

export const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs);

});

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log("body.userId: ", body.userId);
    const user = await User.findById(body.userId)
    console.log("User: ", user);
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog);

});

blogsRouter.put('/:id', async (request, response) => {

    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
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