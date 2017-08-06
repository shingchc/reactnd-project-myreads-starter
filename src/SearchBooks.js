import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class SearchBooks extends Component {
  static propTypes = {
    onSearchBook: PropTypes.func.isRequired,
    searchedBooks: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired
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
    const { searchedBooks, books } = this.props
    const { query } = this.state

    let showingResult = searchedBooks
    
    // console.log("AC SearchBooks books.length="+books.length)

    if (showingResult.length > 0)  {
      showingResult.forEach(function(element) {

        // console.log("AC SearchBooks element="+element.id + " title="+ element.title + " shelf="+element.shelf)
        
        let found = (books.find((book1) => (book1.id === element.id))) 
        if (found)  {
          // console.log("AC SearchBooks found="+found.id + " title="+ found.title + " shelf="+found.shelf)
          element.shelf = found.shelf
        }
      }, this);
    }

    return (
      <div className="app">
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
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

                          <div className="book-top">
                          {((book.imageLinks) && (book.imageLinks.thumbnail)) ? (
                            <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          ) : (
                            <div className="book-cover" style={{ width: 128, height: 174 }}></div>                            
                          )}
                          <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={event => this.props.onUpdateBook(book,event.target.value)}>
                                <option value="non" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
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