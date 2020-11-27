const mongoose = require('mongoose')


//Creating the book schema (blueprint)
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    rating: {
        type: Number,
    },
    read: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Book', bookSchema)