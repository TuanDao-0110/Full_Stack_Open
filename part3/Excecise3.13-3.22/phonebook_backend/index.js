const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PersonModel = require('./model')
require('dotenv').config()

morgan.token("req-body", function (req, res) {
    return JSON.stringify(req.body);
});
const cors = require('cors')
const assert = require('assert')

const url = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
mongoose.set('strictQuery', false)
mongoose.connect(url, () => {
    console.log('connect success mongoDB')
})
// 1. middleware
const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.message === 'wrong format') {
        return response.status(404).send('Data in wrong format or empty ')
    }
    if (error.message === 'length error') {
        return response.status(404).send('Data in wrong format or empty ')
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown endpoint' })
}
// 2. condition check
const checkObjectKeysAndValues = (obj) => {
    if (obj.hasOwnProperty("name") && obj.hasOwnProperty("number") &&
        obj["name"] && obj["number"]) {
        return true;
    }
    return false;
}
const validateCheck = (obj) => {
    return Object.keys(obj)[0]
}

// 3. get all
const getAll = (result) => {
    let newResult = []
    result.forEach(e => {
        newResult.push(e.toJSON())
    })
    return newResult
}
// 4. set middleware
app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :req-body'));

app.use(express.json())
// 5. front page
app.use(express.static('build'))

app.get("/api/persons", (request, response, next) => {
    PersonModel.find({}).then(result => {
        response.status(200).json(getAll(result))
    }).catch(error => next(error))
})
app.get('/info', (request, response, next) => {
    const now = new Date()
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', options);

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

app.get('/api/persons/:id', (request, response, next) => {
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
app.put('/api/persons/:id', (request, response, next) => {
    let newData = request.body
    if (!checkObjectKeysAndValues(newData)) {
        return next(Error('wrong format'))
    }

    const person = {
        ...newData,
        date: new Date()
    }

    PersonModel.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatePerson => {
            response.status(201).json(updatePerson)
        })
        .catch(error => {
            const { message, path } = error.errors.name.properties
            return response.status(404).send(`path ${path} ${message}`)
        }
        )

})
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    PersonModel.findByIdAndRemove(id).then(result => {
        return response.status(204).end()
    }).catch(err => next(err))
});
app.post("/api/persons", (request, response, next) => {
    const newData = request.body
    PersonModel.find({ name: newData.name })
        .then(result => {
            if (result.length !== 0) {
                return response.status(404).send("Name must be unique")
            } else {
                const person = new PersonModel({
                    name: newData.name,
                    number: newData.number,
                    date: new Date()
                })
                person
                    .save()
                    .then(result => response.status(201).send(`name ${newData.name} added to phonebook`))
                    .catch(error => {
                        let type = validateCheck(error.errors)

                        const { message, path } = error.errors[`${type}`].properties
                        return response.status(404).send(`path ${path} ${message}`)

                    })
            }
        })
        .catch(err => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening at  port ${PORT}....`)
})

