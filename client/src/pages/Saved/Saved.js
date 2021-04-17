import { useState, useEffect } from 'react'
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350
  },
  media: {
    height: 150
  }
}))

const Saved = () => {
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    books: []
  })

  const handleDeleteBook= id => {
    Book.deleteBook(id)
      .then(() => {
        const books = [bookState.books]
        setBookState({ ...bookState, books })
      })
  }

  useEffect(() => {
    Book.getBooks()
      .then(({ data: books }) => {
        setBookState({ ...bookState, books })
      })
  }, [])

  return (
    <>
      {
        bookState.books.length
          ? bookState.books.map(book => (
            <Card key={book._id} className={classes.root}>
              <CardHeader
                title={book.title}
                subheader={book.author.length ? `Created by ${book.author}` : 'Creator unknown'}
              />
              <CardMedia
                className={classes.media}
                image={book.source}
                title={book.title}
              />
              <CardActions>
                <Button
                  size='small'
                  color='secondary'
                  onClick={() => handleDeleteBook(book._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
            ))
          : null
      }
    </>
  )
}

export default Saved
