const blogRouter = require('express').Router()
const Blog = require('../models/model')
require('express-async-errors')
blogRouter.get('/', async (request, response,) => {
    const blogs = await Blog.find({})
    return response.json(blogs)

})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedNote = await blog.save()
    return response.status(201).json(savedNote)

})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
})
module.exports = blogRouter