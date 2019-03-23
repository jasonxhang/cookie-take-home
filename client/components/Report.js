import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/report');
      this.setState({ data });
    } catch (e) {
      console.error(e);
    }
  }

  clearCookies = async () => {
    await axios.delete('api/report');
    window.location.reload();
  };

  updateCookie = async userId => {
    const id = document.cookie
      .split(';')
      .filter(item => item.includes('userId='))[0]
      .split('=')[1];
    await axios.put('api/report', {id});
    document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "ball= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "counter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.reload();
  };

  colorReport = () => {
    const sessions = Object.keys(this.state.data).reduce((arr, key) => {
      arr.push(this.state.data[key]);
      return arr;
    }, []);

    return sessions.map((session, i) => {
      return (
        <div className="tr" key={i}>
          <div className="td">{session.userId}</div>
          <div className="td">{session.color}</div>
          <div className="td">{session.counter}</div>
        </div>
      );
    });
  };

  render() {
    const showReport = Object.keys(this.state.data).length > 0;
    return (
      showReport && (
        <div className="page-container">
          <div id="table-view">
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="td">User Cookie Id</div>
                  <div className="td">Color</div>
                  <div className="td">Count</div>
                </div>
              </div>
              <div className="tbody">{this.colorReport()}</div>
            </div>
          </div>
          <div className="btn-container">
            <button onClick={() => this.props.history.push('/')}>
              Go back
            </button>
            <button id="clear-btn" onClick={this.clearCookies}>
              Remove all cookies
            </button>
            <button id="update-btn" onClick={this.updateCookie}>
              Delete your cookie
            </button>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(Report);
