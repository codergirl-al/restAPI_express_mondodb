const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const url = 'mongodb://localhost/books'

const app = express()

//Connect to database
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('CONNECTED')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

const bookRouter = require('./routes/books')
app.use('/books', bookRouter)

//Error handling
app.use((req, res, next) => {
    const err = new Error("Not found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

//in Postman: http://localhost:9000/books
app.listen(9000, () => {
    console.log('SERVER STARTED')
})