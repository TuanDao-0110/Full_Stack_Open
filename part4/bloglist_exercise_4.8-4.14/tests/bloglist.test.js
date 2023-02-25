const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/model')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('clear all')
    await Blog.insertMany(helper.initialBlogs)
    console.log('done')
})

describe('step 2: verifies that the unique identifier property of the blog posts is named id', () => {
    test('BlogPost has a unique identifier property named "id"', () => {
        const post = new Blog({ title: 'Test Post', body: 'Lorem ipsum' })
        expect(post.id).toBeDefined()
    })
})

describe('step 3: a valid blogs can be added', () => {
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

describe('step 4: tesing likes property is missing from request, it will default to value 0', () => {
    test('test post new with missing likes property', async () => {
        const newBlogs = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        }
        let response = await api
            .post('/api/blogs')
            .send(newBlogs)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(response.body.likes).toBe(0)
    })
})
describe('step 5: blog without correct content is not added', () => {
    test('fails with statuscode 400 if data is invalid', async () => {
        const blog = {
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        }
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

        const response = await helper.blogsInDb()

        expect(response).toHaveLength(helper.initialBlogs.length)

    })
    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()
        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })
    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '63f95a4693cb63d33111621'
        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })

})
describe('delete', () => {

    test('a blog can be deleted', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        // after delete
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const contents = blogAtEnd.map(e => e.author)
        expect(contents).not.toContain(blogToDelete.author)

    })

})
describe('update', () => {
    const newBlog = {
        'title': 'React patterns',
        'author': 'Michael',
        'url': 'https://reactpatterns.com/',
        'likes': 50
    }
    test('update with valid id and data return status 200', async () => {
        const blogAtStart = await helper.blogsInDb()
        await api
            .put(`/api/blogs/${blogAtStart[0].id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '63f95eea32d10292c6779b1'
        await api
            .put(`/api/blogs/${invalidId}`)
            .send(newBlog)
            .expect(400)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
},)
