const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler, requestLogger } = require('./utils/middleware')
const phonebookRouter = require('./controllers/phoneBooks')
const phonebookInfoRouter = require('./controllers/phoneBooksInfo')

// eslint-disable-next-line no-unused-vars
morgan.token('req-body', function (req, res) {
  return JSON.stringify(req.body)
})


mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI,).then(() => {
  logger.info('connecting to mongoDB')
}).catch((error) => {
  logger.error('error connecting to MongoDB', error.message)
})



app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :req-body'))
app.use(express.json())
app.use(express.static('build'))
app.use('/api/persons', phonebookRouter)
app.get('/info', phonebookInfoRouter)


app.use(requestLogger)
app.use(unknownEndpoint)
app.use(errorHandler)



module.exports = app

