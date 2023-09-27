import { disconnect } from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import { Blog } from '../models/blog.js'
import { blogsInDb, initialBlogs, nonExistingId } from './test_helper.js'

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 1000000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 1000000)

test("the id property is defined", async () => {
    const blogsAtStart = await blogsInDb()

    expect(blogsAtStart[0].id).toBeDefined();
});

test("default likes is 0", async () => {

    const newBlog = {
        title: 'default likes is 0',
        author: "Blog3", url: "Blog3"
    }

    const request = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(request.body.likes).toEqual(0);
});

// test('all blogs are returned', async () => {
//     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(initialBlogs.length)
// }, 1000000)

// test('a specific blog is within the returned blogss', async () => {
//     const response = await api.get('/api/blogs')

//     const contents = response.body.map(r => r.title)
//     expect(contents).toContain(
//         'Blog1'
//     )
// }, 1000000)

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

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
}, 1000000)

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: "Blog2", likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
}, 1000000)


// test('a specific blog can be viewed', async () => {
//     const blogsAtStart = await blogsInDb()

//     const blogToView = blogsAtStart[0]

//     const resultBlog = await api
//         .get(`/api/blogs/${blogToView.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)

//     expect(resultBlog.body).toEqual(blogToView)
// }, 1000000)

test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
}, 1000000)

// test("a blogs like property can be updated", async () => {
//     const blogsAtStart = await blogsInDb()
//     const blogToUpdate = blogsAtStart[0]

//     console.log(blogToUpdate);

//     await api
//         .put(`/api/blogs/${blogToUpdate.id}`, { title: "Blog0", author: "Blog0", url: "Blog0", likes: 100 })
//         .expect(201)

//     const blogsAtEnd = await blogsInDb()

//     expect(blogsAtEnd[0].likes).toEqual(100)

// })


afterAll(async () => {
    await disconnect()
})

