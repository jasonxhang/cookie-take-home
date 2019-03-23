import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import uuid from 'uuid';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      counter: 0,
      seen: null,
    };
    this.saveData = this.saveData.bind(this);
  }

  //send data to server
  async saveData(userId, color, counter) {
    await axios.post('api/report', { userId, color, counter });
  }

  componentDidMount() {
    const id = uuid.v4();
    //new session
    if (
      document.cookie.split(';').filter(item => item.includes('ball='))
        .length == 0
    ) {
      const num = Math.random();
      //set initial ball color
      if (num < 0.5) {
        this.setState({
          color: 'red',
        });
        document.cookie = 'ball=red;max-age=31536000';
        this.saveData(id, 'red', 1);
      } else {
        this.setState({
          color: 'blue',
        });
        document.cookie = 'ball=blue;counter=1;max-age=31536000';
        this.saveData(id, 'blue', 1);
      }
      this.setState({
        counter: 1,
      });
      document.cookie = 'counter=1;max-age=31536000';
      document.cookie = 'userId=' + id + ';max-age=31536000';
    } else {
      //same user
      const color = document.cookie
        .split(';')
        .filter(item => item.includes('ball='))[0]
        .split('=')[1];
      const counter = document.cookie
        .split(';')
        .filter(item => item.includes('counter='))[0]
        .split('=')[1];
      const id = document.cookie
        .split(';')
        .filter(item => item.includes('userId='))[0]
        .split('=')[1];
      const newCount = Number(counter) + 1;
      //update count on the cookie
      document.cookie = 'counter=' + newCount + ';max-age=31536000';
      this.saveData(id, color, newCount);
      this.setState({ color, counter: newCount, seen: true });
    }
  }

  //render the correct ball
  showBall = () => {
    return this.state.color == 'red' ? (
      <div>
        <img
          src={
            'https://us.123rf.com/450wm/cobalt/cobalt1509/cobalt150900050/45663879-stock-vector-glass-sphere-red-vector-ball-.jpg?ver=6'
          }
        />
      </div>
    ) : (
      <div>
        <img
          src={'https://www.ministicks.com/v/vspfiles/photos/BALL-BLUE-2T.jpg'}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="page-container">
        <div id="title">Lucky Ball Generator</div>
        <div>
          <p className="notifier">
            You got {this.state.color}
            {this.state.seen && ' (again)'}!
          </p>
        </div>
        <div className="img" id="ball-img">
          {this.showBall()}
        </div>
        <div className="btn-container">
          <Link to="/report">
            <button>Go to cookie report</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
