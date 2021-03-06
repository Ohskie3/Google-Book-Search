const router = require('express').Router()
const { Book } = require('../models')

router.get('/', (req, res) => {
  res.render('search')
})

router.get('/books', (req, res) => Book.find()
  .then(books => {
    console.log(books)
    res.render('books', { books })
  })
  .catch(err => console.log(err)))

router.get('/books/:id', (req, res) => Book.findById(req.params.id)
  .then(book => res.render('book', { book }))
  .catch(err => console.log(err)))

module.exports = router
