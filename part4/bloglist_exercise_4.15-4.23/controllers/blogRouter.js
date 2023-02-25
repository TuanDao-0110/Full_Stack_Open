const blogRouter = require('express').Router()
const Blog = require('../models/model')
const User = require('../models/user')
require('express-async-errors')

blogRouter
    .get('/', async (request, response,) => {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        return response.json(blogs)

    })
    .get('/:id', async (request, response) => {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            return response.json(blog)
        } return response.status(404).end()
    })
    .post('/', async (request, response) => {
        const { author, title, url, likes } = request.body
        if (!request.user.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(request.user.id)
        const blog = new Blog({
            author,
            title,
            url,
            likes,
            user: user.id
        })
        const savedNote = await blog.save()
        user.blogs = user.blogs.concat(savedNote.id)
        await user.save()
        return response.status(201).json(savedNote)
    })
    .delete('/:id', async (request, response) => {
        const id = request.params.id
        if (!request.user.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const blog = await Blog.findById(id)
        const user = await User.findById(request.user.id)
        if (blog.user.toString() === user.id.toString()) {
            user.blogs = user.blogs.filter(e => e.toString() !== id.toString())
            user.save()
            await blog.remove()

            return response.status(204).end()

        }
    })
    .put('/:id', async (request, response) => {
        const id = request.params.id
        const { author, title, url, likes } = request.body
        const blog = {
            author,
            title,
            url,
            likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        return response.json(updatedBlog)
    })
module.exports = blogRouter