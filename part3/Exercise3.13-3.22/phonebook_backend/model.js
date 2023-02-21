const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length >= 4
      },
      message: props => `${props.value} is shorter than the minimun allowed length (3)`,
    },
    required: [true, 'name required']

  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return (/\d{2,}-\d{7,}/.test(v) && v.length > 8)
      },
      message: props => `${props.value} is valid phone numbers`
    },
    required: [true, 'phone required']
  },
  date: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('phonebook', personSchema)
