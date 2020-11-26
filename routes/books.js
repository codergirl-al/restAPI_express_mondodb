const express = require('express')
const book = require('../models/book')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async(req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.post('/', async(req, res) => {
    const currentBook = new Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        read: req.body.read
    })

    try {
        const a1 = await currentBook.save()
        res.json(a1)
    }catch(err) {
        res.send('Error' + err)
    }
})

router.get('/:id', async(req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch(err) {
        res.send('Error ' + err)
    }
})

router.put('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        book.read = req.body.read
        const a1 = await book.save()
        res.json(book)
    } catch(err) {
        res.send('Error ' + err)
    }
})

router.delete('/:id', async(req, res) => {
    Book.findByIdAndRemove({_id: req.params.id}).then(function(book) {
        res.json(book)
    })
})

module.exports = router