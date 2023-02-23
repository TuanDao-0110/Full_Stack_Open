const phonebookInfoRouter = require('express').Router()
const PersonModel = require('../models/model')


phonebookInfoRouter.get('/', (request, response, next) => {
  const now = new Date()
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }
  const formattedDate = now.toLocaleDateString('en-US', options)

  PersonModel.find({}).then(result => {
    const content = `
    <p>
    
    Phonebook has info for ${result.length} people 
    </p>
    <p>
    ${formattedDate}
    </p>
    `
    response.status(200).send(content)
  }).catch(error => next(error))
})



module.exports = phonebookInfoRouter
