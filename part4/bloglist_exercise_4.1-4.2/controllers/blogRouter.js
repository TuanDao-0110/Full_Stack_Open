const blogRouter = require('express').Router()
const Blog = require('../models/model')
blogRouter.get('/', (request, response, next) => {
    console.log('get')
    Blog
        .find({})
        .then(blogs => {
            return response.json(blogs)
        }).catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => next(error))
})

module.exports = blogRouter