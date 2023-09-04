const mongoose = require('mongoose');
const { schema } = require('./Author');
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 10
    },
    published: {
        type: Number,
        required: true,
    },
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Author'
    // },
    author: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true,
    }
})

schema.path('title').validate((v) => {
    if (v.length < 10) return 'title should be at least 10 characters'
})

module.exports = mongoose.model('Book', schema)
