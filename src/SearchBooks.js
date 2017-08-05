import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class SearchBooks extends Component {
  static propTypes = {
    onSearchBook: PropTypes.func.isRequired,
    searchedBooks: PropTypes.array.isRequired
    // contacts: PropTypes.array.isRequired,
    // onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (q) => {
    this.setState({ query: q.trim() }),
    this.props.onSearchBook(q)
  }

  // clearQuery = () => {
  //   this.setState({ query: '' })
  // }

  render() {
    const { searchedBooks } = this.props
    const { query } = this.state

     let showingResult = searchedBooks
    // if (query) {
    //   const match = new RegExp(escapeRegExp(query), 'i')
    //   showingContacts = this.props.searchedBooks.filter(() => match.test(contact.name))
    // } else {
    //   showingContacts = contacts
    // }

    // // showingContacts.sort(sortBy('name'))    
    console.log("AC SearchBooks showingResult.length="+showingResult.length)

    return (
      <div className="app">
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
                
              </div>
            </div>
            <div className="bookshelf">
            <div className="search-books-results">
              <ol className="books-grid">
              {
                  (showingResult.length > 0) && showingResult.map((book) => (
                                                 
                      <li>
                      <div className="book">
                         {console.log(JSON.stringify(book))}  
                          <div className="book-top">
                          {((book.imageLinks) && (book.imageLinks.thumbnail)) ? (
                            <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          ) : (
                            <div className="book-cover" style={{ width: 128, height: 174 }}></div>                            
                          )}
                          <div className="book-shelf-changer">
                              <select onChange={event => this.props.onUpdateBook(book,event.target.value)}>
                              <option value="none" selected disabled>Move to...</option>

                              {(book.shelf) && (book.shelf === "currentlyReading") ? (
                                <option value="currentlyReading" selected>Currently Reading</option>
                              ) : (
                                <option value="currentlyReading">Currently Reading</option>
                              )}

                              {(book.shelf) && (book.shelf === "wantToRead") ? (
                                <option value="wantToRead" selected>Want to Read</option>
                              ) : (
                                <option value="wantToRead">Want to Read</option>
                              )}

                              {(book.shelf) && (book.shelf === "read") ? (
                                <option value="read" selected>Read</option>
                              ) : (
                                <option value="read">Read</option>
                              )}

                              {(book.shelf) && (book.shelf === "none") ? (
                                <option value="none" selected>None</option>
                              ) : (
                                <option value="none">None</option>
                              )}
                              </select>
                          </div>
                          </div>
 
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{(book.authors) && (book.authors.length > 0) && book.authors.map((author) => (<span>{author}</span>))}
                          </div> 
                      </div>
                      </li>
                  ))
              }
              </ol>
            </div>
            </div>
          </div>
      </div>
    )
  }
}

export default SearchBooks