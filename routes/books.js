const express = require('express')
const book = require('../models/book')
const router = express.Router()
const Book = require('../models/book')

//Get all books from db
router.get('/', async(req, res, next) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch(err) {
        next(new Error("Can't get a list of all books"))
    }
})

//Post book to db
router.post('/', async(req, res, next) => {
    try {
        const currentBook = new Book({
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            read: req.body.read
        })
        const a1 = await currentBook.save()
        res.json(a1)
    } catch(err) {
        next(new Error("Can't add book to database"))
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch(err) {
        next(new Error("Can't find book with the given id"))
    }
})

//Edit book by id in db
router.put('/:id', async(req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        book.read = req.body.read
        const a1 = await book.save()
        res.json(book)
    } catch(err) {
        next(new Error("Can't edit book."))
    }
})
//Delete book from db
router.delete('/:id', async(req, res, next) => {
    try {
        Book.findByIdAndRemove({_id: req.params.id}).then(function(book) {
            res.json(book)
        })
    } catch(err) {
        next(new Error("Can't remove a non-existing book"))
    }
})

module.exports = router