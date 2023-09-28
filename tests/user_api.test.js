import { disconnect } from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import { hash } from 'bcrypt'
import { usersInDb } from './test_helper.js'
import { User } from '../models/user.js'


const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    }, 1000000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }, 1000000)


    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    }, 1000000)


    test('user without username property is not added', async () => {

        const usersAtStart = await usersInDb()

        const newUser = {
            name: "user2",
            password: "2"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 1000000)
}, 100000)


afterAll(async () => {
    await disconnect()
})

