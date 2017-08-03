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
    showSearchPage: true,
    currentBooks: [],
    wantedBooks: [],
    readBooks: [],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksDB) => {
      this.setState({
        books: booksDB,
        readBooks: booksDB.filter((book) => (book.shelf === 'read')),
        wantedBooks: booksDB.filter((book) => (book.shelf === 'wantToRead')),
        currentBooks: booksDB.filter((book) => (book.shelf === 'currentlyReading'))
      })
      console.log("AC componentDidMount books.length" + this.state.books.length)
      console.log("AC componentDidMount currentBooks.length" + this.state.currentBooks.length)
      console.log("AC componentDidMount wantedBooks.length" + this.state.wantedBooks.length)
      console.log("AC componentDidMount readBooks.length" + this.state.readBooks.length)  
    })
  
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
        console.log("AC updateBook books.length" + this.state.books.length)
        console.log("AC updateBook currentBooks.length" + this.state.currentBooks.length)
        console.log("AC updateBook wantedBooks.length" + this.state.wantedBooks.length)
        console.log("AC updateBook readBooks.length" + this.state.readBooks.length)
      })
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            //books={this.state.books}
            readBooks={this.state.readBooks}
            wantedBooks={this.state.wantedBooks}
            currentBooks={this.state.currentBooks}
            onUpdateBook={this.updateBook}
          />
        )}/>
        <Route path='/search' render={({history}) => (
          <SearchBooks/>
        )}/>
      </div>
      
      // <div className="app">
      //   {this.state.showSearchPage ? (
      //     <div className="search-books">
      //       <div className="search-books-bar">
      //         <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
      //         <div className="search-books-input-wrapper">
      //           {/* 
      //             NOTES: The search from BooksAPI is limited to a particular set of search terms.
      //             You can find these search terms here:
      //             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
      //             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      //             you don't find a specific author or title. Every search is limited by search terms.
      //           */}
      //           <input type="text" placeholder="Search by title or author"/>
                
      //         </div>
      //       </div>
      //       <div className="search-books-results">
      //         <ol className="books-grid"></ol>
      //       </div>
      //     </div>
      //   ) : (
      // </div>
    )
  }
}

export default BooksApp
