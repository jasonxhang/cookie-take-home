import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleBook, resetBook } from '../store';
import { Link, withRouter } from 'react-router-dom';
import NoMatch from './NoMatch';

class SingleBook extends Component {
  componentDidMount() {
    const bookId = this.props.match.params.id;
    this.props.fetchSingleBook(bookId);
  }

  componentDidUpdate(prevProps) {
    const latest = this.props.match.params.id;
    const prev = prevProps.match.params.id;
    if (prev !== latest) {
      this.props.fetchSingleBook(latest);
    }
  }

  goBack = () => {
    this.props.resetBook();
    this.props.history.goBack();
  };

  renderCover = bookId => {
    const bibkey = bookId.split(':')[0];
    if (bibkey == 'OLID') {
      return (
        <img
          src={`http://covers.openlibrary.org/b/${bookId.split(':')[0]}/${
            bookId.split(':')[1]
          }-M.jpg`}
        />
      );
    } else {
      return (
        <img src={`https://openlibrary.org/images/icons/avatar_book-sm.png`} />
      );
    }
  };

  render() {
    const bool = this.props.book;
    const book = bool ? bool[Object.keys(bool)[0]] : '';
    const bookId = this.props.match.params.id;
    const { bookMeta } = this.props;

    console.log('book', book);
    console.log('bookMeta', bookMeta);

    return book !== undefined ? (
      <div>
        <div className="button-container">
          <div>
            <button type="button" onClick={this.goBack}>
              Back to results
            </button>
          </div>
        </div>
        <div id="single-page">
          <div className="single-page-item">
            {/* {this.renderDetails(bookMeta, book, bookId)} */}

            <div>
              <h4>{book.details.title}</h4>
              {book.details.subtitle && <p className="subtitle">{book.details.subtitle}</p>}
              {book.details.subtitle == undefined && bookMeta.subtitle && <p className='subtitle'>{bookMeta.subtitle}</p>}


              {book.details.authors && <p>by {book.details.authors[0].name}</p>}
              {book.details.authors == undefined && bookMeta.author_name && <p>by {bookMeta.author_name[0]}</p>}
              <br />
              <p>Description:</p>
              {book.details.subjects &&
                book.details.subjects.map((subject, idx) => (
                  <p key={idx}>{subject}</p>
                ))}
            </div>
          </div>
          <div className="single-page-item">{this.renderCover(bookId)}</div>
        </div>
      </div>
    ) : (
      `Loading...`
    );
  }
}

const mapState = state => {
  return {
    book: state.books.selectedBook,
    bookMeta: state.books.bookMeta,
  };
};

const mapDispatch = dispatch => {
  return {
    resetBook: () => dispatch(resetBook()),
    fetchSingleBook: bookId => dispatch(fetchSingleBook(bookId)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleBook)
);
