import { disconnect } from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import { Blog } from '../models/blog.js'

const api = supertest(app)

const initialBlogs = [
    { title: "Blog0", author: "Blog0", url: "Blog0", likes: 0 },
    { title: "Blog1", author: "Blog1", url: "Blog1", likes: 1 },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
}, 1000000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 1000000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
}, 1000000)

test('a specific blog is within the returned blogss', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Blog1'
    )
}, 1000000)

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: "Blog2", url: "Blog2", likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
}, 1000000)

test('blog without title is not added', async () => {
    const newBlog = {
        author: "Blog2", url: "Blog2", likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    const response = await api.get('/api/blogs')


    expect(response.body).toHaveLength(initialBlogs.length)
}, 1000000)

afterAll(async () => {
    await disconnect()
})

