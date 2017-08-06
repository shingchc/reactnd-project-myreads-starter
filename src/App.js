import React from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentBooks: [],
    wantedBooks: [],
    readBooks: [],
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksDB) => {
      this.setState({
        books: booksDB,
        readBooks: booksDB.filter((book) => (book.shelf === 'read')),
        wantedBooks: booksDB.filter((book) => (book.shelf === 'wantToRead')),
        currentBooks: booksDB.filter((book) => (book.shelf === 'currentlyReading')),
        searchedBooks: []
      })
      // console.log("AC componentDidMount books.length" + this.state.books.length)
      // console.log("AC componentDidMount currentBooks.length" + this.state.currentBooks.length)
      // console.log("AC componentDidMount wantedBooks.length" + this.state.wantedBooks.length)
      // console.log("AC componentDidMount readBooks.length" + this.state.readBooks.length)  
    })
  
  }

  searchBook = (query) => {
    // console.log("AC searchBook query="+query)
    BooksAPI.search(query,10).then((booksDB) => {

      if (booksDB)  {
        this.setState({
          searchedBooks: booksDB
        })
        // console.log("AC searchBook1 booksDB.length="+booksDB.length)
      }
      // console.log("AC searchBook2 searchedBooks.length="+this.state.searchedBooks.length)
    })
    // console.log("AC searchBook3 searchedBooks.length="+this.state.searchedBooks.length)
  }

  updateBook = (book,shelf) => {
    console.log("HELLO!!!"+book.id+" "+shelf)
    BooksAPI.update(book,shelf).then(() => {
      BooksAPI.getAll().then((booksDB) => {
        this.setState({
          books: booksDB,
          readBooks: booksDB.filter((book) => (book.shelf === 'read')),
          wantedBooks: booksDB.filter((book) => (book.shelf === 'wantToRead')),
          currentBooks: booksDB.filter((book) => (book.shelf === 'currentlyReading'))
        })
        // console.log("AC updateBook books.length" + this.state.books.length)
        // console.log("AC updateBook currentBooks.length" + this.state.currentBooks.length)
        // console.log("AC updateBook wantedBooks.length" + this.state.wantedBooks.length)
        // console.log("AC updateBook readBooks.length" + this.state.readBooks.length)
      })
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            readBooks={this.state.readBooks}
            wantedBooks={this.state.wantedBooks}
            currentBooks={this.state.currentBooks}
            onUpdateBook={this.updateBook}
          />
        )}/>
        <Route path='/search' render={({history}) => (
          <SearchBooks
            books={this.state.books}
            searchedBooks={this.state.searchedBooks}
            onSearchBook={this.searchBook}
            onUpdateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
