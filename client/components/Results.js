import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoMatch from './NoMatch';
import { fetchBooks, storeMeta } from '../store';

import { Link, withRouter } from 'react-router-dom';
import { isBoolean } from '../../node_modules/util';

class Results extends Component {
  handleClick = book => {
    this.props.storeMeta(book);
  };

  renderCover = book => {
    if (book.cover_edition_key) {
      return (
        <img
          src={`http://covers.openlibrary.org/b/olid/${
            book.cover_edition_key
          }-S.jpg`}
        />
      );
    } else {
      return (
        <img src={`https://openlibrary.org/images/icons/avatar_book-sm.png`} />
      );
    }
  };

  renderBookId = book => {
    if (book.cover_edition_key) {
      return `OLID:${book.cover_edition_key}`;
    } else if (book.oclc) {
      return `OCLC:${book.oclc[0]}`;
    } else if (book.lccn) {
      return `LCCN:${book.lccn[0]}`;
    } else if (book.isbn) {
      return `ISBN:${book.isbn[0]}`;
    } else if (book.edition_key) {
      return `OLID:${book.edition_key[0]}`;
    }
  };

  render() {
    const books = this.props.books.docs;
    const searchTitle = this.props.history.location.pathname.split('/')[2];
    if (!books) {
      this.props.fetchBooks(searchTitle);
    }
    return (
      <div id="results-main">
        <div id="sidebar">
          <div>
            Showing results for "{searchTitle}"
          </div>
          <br />
        </div>

        <div id="all-books-container">
          {books ? (
            books.map((book, idx) => (
              <div className="single-grid" key={idx}>
                <Link to={`/book/${this.renderBookId(book)}`}>
                  <div
                    className="single-grid-header"
                    onClick={() => this.handleClick(book)}
                  >
                    <h3>{book.title}</h3>
                    {book.author_name && <p>by {book.author_name}</p>}
                    {this.renderCover(book)}
                    <p>first published in {book.first_publish_year}</p>
                    {book.edition_key && <p>{book.edition_key.length} editions</p>}

                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    books: state.books.books,
  };
};

const mapDispatch = dispatch => ({
  fetchBooks: title => dispatch(fetchBooks(title)),
  storeMeta: book => dispatch(storeMeta(book)),
});
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Results)
);
