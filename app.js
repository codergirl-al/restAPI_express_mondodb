const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const url = 'mongodb://localhost/books'

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('CONNECTED')
})

app.use(express.json())

const bookRouter = require('./routes/books')
app.use('/books', bookRouter)

//in Postman: http://localhost:9000/books
app.listen(9000, () => {
    console.log('SERVER STARTED')
})