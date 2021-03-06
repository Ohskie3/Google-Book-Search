const router = require('express').Router()
const { Book } = require('../models')
const axios = require('axios')

router.get('/books', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}`)
  .then(({ data: { items: books } }) => {
    res.json(books)
    console.log(books)
    // Book.find({})
    //   .then(books => res.json(books))
    //   .catch(err => console.log(err))
  .catch(err => console.log(err))
  })
})

router.post('/books', (req, res) => {
  Book.create(req.body)
  .then(book => res.json(book))
  .catch(err => console.log(err))
})

router.put('/books/:id', (req, res) => {
Book.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err))
})

router.delete('/books/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
  })

module.exports = router 

