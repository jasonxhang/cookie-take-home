import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetSearch, fetchBooks } from '../store';
import {withRouter} from 'react-router-dom'



class Search extends Component {

  constructor(props){
    super(props)
      this.state = {
        title: '',
      }

  }
  handleSearch = event => {
    const term = event.target.value;
    this.props.setSearch(term);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.resetSearch()
    const { title } = this.state
    console.log(title)
    this.props.fetchBooks(title);
    this.setState({
      title: '',
    });
    this.props.history.push(`/search/${title}`)
  };

  render() {
    const isEnabled = this.state.title
    return (
      <div>
        <form className="form-group">
          Book Title
          <input
            className="form-control form-control-lg"
            type="text"
            name="title"
            aria-label="Search"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            onClick={this.handleSubmit}
            disabled={!isEnabled}
            className={!isEnabled ? 'disabled' : 'enabled'}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  resetSearch: () => dispatch(resetSearch()),
  fetchBooks: (title) => dispatch(fetchBooks(title))
});


export default withRouter(connect(
  null,
  mapDispatch
)(Search));
