const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogRouter = require('./controllers/blogRouter')
const { unknownEndpoint, requestLogger } = require('./utils/middleware')
const logger = require('./utils/logger')



mongoose.set('strictQuery', false)
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

app.use('/api/blogs', blogRouter)


app.use(requestLogger)
app.use(unknownEndpoint)



module.exports = app