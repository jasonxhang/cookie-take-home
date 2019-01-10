import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS';
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK';
const SET_SEARCH = 'SET_SEARCH';
const RESET_SEARCH = 'RESET_SEARCH';
const RESET_BOOK = 'RESET_BOOK';
const STORE_META = 'STORE_META';

/**
 * INITIAL STATE
 */
const initState = {
  books: [],
  search: '',
  selectedBook: {},
  bookMeta: {},
};

/**
 * ACTION CREATORS
 */
const getBooks = books => ({
  type: GET_BOOKS,
  books,
});

const getSingleBook = book => ({
  type: GET_SINGLE_BOOK,
  book,
});

export const storeMeta = book => ({
  type: STORE_META,
  book,
});

export const setSearch = search => ({
  type: SET_SEARCH,
  search,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});

export const resetBook = () => ({
  type: RESET_BOOK,
});

/**
 * THUNK CREATORS
 */
export const fetchBooks = title => async dispatch => {
  try {
    const { data } = await axios.get(`/api/search?title=${title}`);
    const action = getBooks(data);
    dispatch(action);
  } catch (e) {
    console.error(e);
  }
};

export const fetchSingleBook = bookId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/books/${bookId}`);
    const action = getSingleBook(data);
    dispatch(action);
  } catch (e) {
    console.error(e);
  }
};

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.books,
      };
    case GET_SINGLE_BOOK:
      return {
        ...state,
        selectedBook: action.book,
      };
    case STORE_META:
      return {
        ...state,
        bookMeta: action.book,
      };
    case SET_SEARCH:
      return { ...state, search: action.search };
    case RESET_SEARCH:
      return { ...state, books: [], selectedBook: {} };
    case RESET_BOOK:
      return { ...state, selectedBook: {} };
    default:
      return state;
  }
}
