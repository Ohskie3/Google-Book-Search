const { model, Schema } = require('mongoose')

const BookSchema = new Schema({
  title: String,
  cover: String,
  authors: String,
  description: String,
  infoLink: String
})


module.exports = model('Book', BookSchema)
