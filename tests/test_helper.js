import { Blog } from "../models/blog"
import { User } from "../models/user"
import supertest from 'supertest'
import { app } from '../app.js'

const api = supertest(app)

export const initialBlogs = [
    { title: "Blog0", author: "Blog0", url: "Blog0", likes: 0 },
    { title: "Blog1", author: "Blog1", url: "Blog1", likes: 1 },
]

export const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

export const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

export const testUserToken = async () => {
    const AuthUser = {
        username: "root",
        password: "sekret",
    };

    const AuthUserResult = await api
        .post("/login")
        .send(AuthUser)
        .expect(200);

    const token = AuthUserResult.body.token;

    return token
}