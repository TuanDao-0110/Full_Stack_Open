const blogRouter = require('express').Router()
const Blog = require('../models/model')
require('express-async-errors')

blogRouter
    .get('/', async (request, response,) => {
        const blogs = await Blog.find({})
        return response.json(blogs)

    })
    .get('/:id', async (request, response) => {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            return response.json(blog)
        } return response.status(404).end()
    })
    .post('/', async (request, response) => {
        const blog = new Blog(request.body)
        const savedNote = await blog.save()
        return response.status(201).json(savedNote)
    })
    .delete('/:id', async (request, response) => {
        const id = request.params.id
        await Blog.findByIdAndRemove(id)
        return response.status(204).end()
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