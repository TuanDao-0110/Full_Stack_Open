const testingRouter = require('express').Router()

const Blogs = require('../models/model')
const User = require('../models/user')
testingRouter.post('/reset', async (request, response) => {
    console.log('reset router')
    await Blogs.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})
module.exports = testingRouter

