const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: (v) => {
                return v.length >= 3
            },
            message: 'user name must be at least 3 characters long'
        },
        required: [true],
        unique: true
    },
    name: {
        type: String,
        required: [true]
    },
    passwordHash: {
        type: String,
        required: [true]
    }
    ,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog'
        }
    ],
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})


module.exports = mongoose.model('user', userSchema)