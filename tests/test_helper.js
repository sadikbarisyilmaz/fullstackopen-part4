import { Blog } from "../models/blog"

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

