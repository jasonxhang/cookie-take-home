import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Link to={'/'}>
      </Link>
      <Routes />
    </div>
  );
};

export default App;
