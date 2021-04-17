import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Book from '../../utils/BookAPI'
import Form from '../../components/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350
  },
  media: {
    height: 150
  }
}))

const Home = () => {
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    search: '',
    books: []
  })

  const handleInputChange = ({ target }) => {
    setBookState({ ...bookState, [target.name]: target.value })
  }

  const handleSearchBook = event => {
    event.preventDefault()
    Book.getBooks(bookstate.search)
      .then(({ data: books }) => {
        console.log(books)
        setBookState({ ...bookState, books })
      })
      .catch(err => console.error(err))
  }

  const handleSaveBook = book => {
    Book.addBook(book)
      .then(() => {
        const books = [bookState.books]
        setBookState({ ...bookState, books })
      })
  }

  return (
    <>
      <Form
        search={bookState.search}
        handleInputChange={handleInputChange}
        handleSearchBook={handleSearchBook}
      />
      {
        bookState.books.length
          ? bookState.books.map(book => (
            <Card key={book.id} className={classes.root}>
              <CardHeader
                title={book.title}
                subheader={book.username.length ? `Created by ${book.username}` : 'Creator unknown'}
              />
              <CardMedia
                className={classes.media}
                image={book.images.original.url}
                title={book.title}
              />
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  onClick={() => handleSaveBook({
                    title: book.title,
                    source: book.images.original.url,
                    url: book.url,
                    author: book.username,
                    bookId: book.id
                  })}
                >
                  Save
                </Button>
                <Button
                  size='small'
                  color='primary'
                  href={book.url}
                >
                  View
                </Button>
              </CardActions>
            </Card>
            ))
          : null
      }
    </>
  )
}

export default Home
