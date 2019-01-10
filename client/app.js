import React from 'react';

import { Search } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <div>Book Search</div>
      <Search />
      <Routes />
    </div>
  );
};

export default App;
