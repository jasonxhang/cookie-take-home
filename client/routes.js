import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Main, Results, SingleBook } from './components';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/search" component={Results} />
          <Route exact path="/book/:id" component={SingleBook} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
