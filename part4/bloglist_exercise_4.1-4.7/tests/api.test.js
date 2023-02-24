const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/model')
const helper = require('./test_helper')
beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('clear all')
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('done')
})
describe('testing api', () => {
    test('get method blog are return as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

describe('testing data', () => {

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('a specific blog is within the returned blog', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.author)
        expect(contents).toContain(
            'Michael'
        )
    })

})


describe('a valid blogs can be added', () => {
    test('post new', async () => {
        const newBlogs = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
        }
        await api
            .post('/api/blogs')
            .send(newBlogs)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await helper.blogsInDb()
        const contents = response.map(r => r.author)
        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toContain('Robert C. Martin')

    })
})


test('note without correct content is not added', async () => {
    const blog = {
        important: true
    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length)
    // expect(response.body).toHaveLength(1)

})
describe('delete', () => {

    test('a blog can be deleted', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        // const contents = blog
    })
})
afterAll(async () => {
    await mongoose.connection.close()
},)