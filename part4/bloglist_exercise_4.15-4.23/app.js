const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const userLogin = require('./controllers/loginRouter')
const { unknownEndpoint, requestLogger, errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')
const logger = require('./utils/logger')



mongoose.set('strictQuery', false)
console.log(MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('connect mongoDB')
    })
    .catch(() => {
        logger.error('fail to connect mongoDB')
    })

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
// 1. apply middleware for blogRouter only
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', userLogin)
app.use(requestLogger)
app.use(errorHandler)
app.use(unknownEndpoint)



module.exports = app