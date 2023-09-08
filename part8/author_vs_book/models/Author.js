const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 10
    },
    born: {
        type: Number
    }
})

schema.path('name').validate(v=> { 
    if  ( v.length <10) return 'name must be at least 10 characters'
})


module.exports = mongoose.model('Author', schema)