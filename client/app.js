import React from 'react';
import { Link } from 'react-router-dom';

import { Search } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Link to={'/'}>
        <div>Home</div>
      </Link>
      <Search />
      <Routes />
    </div>
  );
};

export default App;
