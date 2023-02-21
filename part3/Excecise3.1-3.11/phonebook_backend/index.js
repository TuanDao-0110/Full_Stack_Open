const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token("req-body", function (req, res) {
    return JSON.stringify(req.body);
});
const cors = require('cors')


const data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "name": "Graces Hopper",
        "number": "4242",
        "id": 19515
    },
    {
        "name": "tuan",
        "number": "4242",
        "id": 45591
    }
]
const HOST = 'localhost'
const PORT = process.env.PORT || 3001
const generateId = () => {
    return Math.floor(Math.random() * 90000) + 10000;
}
const checkObjectKeysAndValues = (obj) => {
    if (obj.hasOwnProperty("name") && obj.hasOwnProperty("number") &&
        obj["name"] && obj["number"]) {
        return true;
    }
    return false;
}
const checkName = (newData, data) => {
    return data.findIndex(person => person.name.toLowerCase() === (newData.name.toLowerCase()))
}
app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :req-body'));

app.use(express.json())
app.use(express.static('build'))

app.get("/api/persons", (request, respone) => {
    respone.status(200).json(data)
})
app.get('/info', (request, response) => {
    const now = new Date()
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    const content = `
    <p>
    
    Phonebook has info for ${data.length} people 
    </p>
    <p>
    ${formattedDate}
    </p>
    `
    response.status(200).send(content)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const persons = data.filter(i => i.id === Number(id))
    if (persons.length) {
        return response.status(200).send(persons)
    }
    return response.status(404).send(`id ${id} not found`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);


    const index = data.findIndex(person => person.id === Number(id));

    if (index !== -1) {
        data.splice(index, 1);
        return response.status(204).send(`id ${id} deleted success`);
    }
    return response.status(404).send(`id ${id} not exists`);
});
app.post("/api/persons", (request, respone) => {
    let newData = request.body
    if (newData === undefined) {
        return respone.status(404).send('No Data ')
    }
    if (!checkObjectKeysAndValues(newData)) {
        return respone.status(404).send('Data in wrong format or empty ')
    }
    // get file
    if (checkName(newData, data) !== -1) {
        return respone.status(404).send("Name must be unique")
    }
    // new id
    let newId = generateId()
    const index = data.findIndex(person => person.id === Number(newId));
    // make sure id not dupicate
    while (index !== -1) {
        newId = generateId()
    }
    // push new data
    data.push({ ...newData, id: newId })
    return respone.status(201).send(`name ${newData.name} added to phonebook`)
})
app.listen(PORT, HOST, () => {
    console.log(`listening at host ${HOST} port ${PORT}....`)
})

