import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class ListBooks extends Component {
  static propTypes = {
    // book: PropTypes.array.isRequired,
    // books: PropTypes.array.isRequired,
    // readBooks: PropTypes.array.isRequired,
    // onDeleteContact: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            this.props.currentBooks.map((book) => (
                                <li>
                                <div className="book">
                                    <div className="book-top">
                                    {((book.imageLinks) && (book.imageLinks.thumbnail)) ? (
                                        <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    ) : (
                                        <div className="book-cover" style={{ width: 128, height: 174 }}></div>                            
                                    )}
                                    <div className="book-shelf-changer">
                                        <select onChange={event => this.props.onUpdateBook(book,event.target.value)}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading" selected>Currently Reading</option>
                                        <option value="wantToRead" >Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{(book.authors) && (book.authors.length > 0) && book.authors.map((author) => (<span>{author}</span>))}</div>
                                </div>
                                </li>
                            ))
                        }
                        </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            this.props.wantedBooks.map((book) => (
                                <li>
                                <div className="book">
                                    <div className="book-top">
                                    {((book.imageLinks) && (book.imageLinks.thumbnail)) ? (
                                        <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    ) : (
                                        <div className="book-cover" style={{ width: 128, height: 174 }}></div>                            
                                    )}
                                    <div className="book-shelf-changer">
                                        <select onChange={event => this.props.onUpdateBook(book,event.target.value)}>
                                        <option value="none"  disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead" selected>Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    {/* {JSON.stringify(book.imageLinks.thumbnail)}  */}
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{(book.authors) && (book.authors.length > 0) && book.authors.map((author) => (<span>{author}</span>))}</div>
                                </div>
                                </li>
                            ))
                        }                        
                        </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            this.props.readBooks.map((book) => (
                                <li>
                                <div className="book">
                                    <div className="book-top">
                                    {((book.imageLinks) && (book.imageLinks.thumbnail)) ? (
                                        <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    ) : (
                                        <div className="book-cover" style={{ width: 128, height: 174 }}></div>                            
                                    )}
                                    <div className="book-shelf-changer">
                                        <select onChange={event => this.props.onUpdateBook(book,event.target.value)}>
                                        <option value="none"  disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead" >Want to Read</option>
                                        <option value="read" selected>Read</option>
                                        <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    {/* {JSON.stringify(book.imageLinks.thumbnail)}  */}
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{(book.authors) && (book.authors.length > 0) && book.authors.map((author) => (<span>{author}</span>))}</div> 
                                </div>
                                </li>
                            ))
                        }
                        </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link
                    to='/search'
                    className='open-search'
                >Search book</Link>
            </div>
        </div>
    )
  }
}

export default ListBooks