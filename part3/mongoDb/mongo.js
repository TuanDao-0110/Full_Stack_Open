const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@fullstack.bu2xfaj.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: String,
})

const Person = mongoose.model('phonebook', personSchema)

const person = new Person({
    name,
    number,
    date: new Date()
})

// person.save().then(result => {
//     console.log(`added ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
// })

Person.find({}).then(result => {
    result.forEach(e => {
        console.log(e)
    })
    mongoose.connection.close()
})