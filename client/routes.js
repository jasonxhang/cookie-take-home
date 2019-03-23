import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Report } from './components';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/report" component={Report} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
