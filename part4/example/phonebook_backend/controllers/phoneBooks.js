const phonebookRouter = require('express').Router()
const PersonModel = require('../models/model')

const getAll = (result) => {
  let newResult = []
  result.forEach(e => {
    newResult.push(e.toJSON())
  })
  return newResult
}
phonebookRouter.get('/', (request, response, next) => {
  PersonModel.find({}).then(result => {
    response.status(200).json(getAll(result))
  }).catch(error => next(error))
})


phonebookRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  PersonModel.findById(id).then(result => {
    if (result) {
      response.status(200).send(result.toJSON())
    } else {
      response.status(404).send(`id ${id} not exist`)
    }

  })
    .catch(error => next(error))
})

phonebookRouter.put('/:id', (request, response, next) => {
  let newData = request.body
  const person = {
    ...newData,
    date: new Date()
  }
  PersonModel.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatePerson => {
      response.status(201).json(updatePerson)
    })
    .catch(error => {
      next(error)
    }
    )
})

phonebookRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  // eslint-disable-next-line no-unused-vars
  PersonModel.findByIdAndRemove(id).then(result => {
    return response.status(204).end()
  }).catch(err => next(err))
})


phonebookRouter.post('/', (request, response, next) => {
  const newData = request.body
  PersonModel.find({ name: newData.name })
    .then(result => {
      if (result.length !== 0) {
        return response.status(404).send('Name must be unique')
      } else {
        const person = new PersonModel({
          name: newData.name,
          number: newData.number,
          date: new Date()
        })
        person
          .save()
        // eslint-disable-next-line no-unused-vars
          .then(result => response.status(201).send(`name ${newData.name} added to phonebook`))
          .catch(error => {
            next(error)
          })
      }
    })
    .catch(err => next(err))
})


module.exports = phonebookRouter