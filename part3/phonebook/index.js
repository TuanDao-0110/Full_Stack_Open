const express = require('express')
const app = express()
const fs = require('fs');
const filePath = './data.json';

const data = require('./data.json')

const host = 'localhost'
const port = 3001
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
app.use(express.json())

app.get("/api/persons", (request, respone) => {
    respone.status(200).send(data)
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

    let data = JSON.parse(fs.readFileSync(filePath));

    const index = data.findIndex(person => person.id === Number(id));

    if (index !== -1) {
        data.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
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
    let data = JSON.parse(fs.readFileSync(filePath));
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
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return respone.status(200).send(`name ${newData.name} added to phonebook`)
})
app.listen(port, host, () => {
    console.log(`listening at host ${host} port ${port}....`)
})

