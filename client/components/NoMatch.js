import React, { Component } from 'react';

const NoMatch = props => {
  // console.log("unique props state:", props.state);
  return (
    <div>
      <h1>Sorry the page you're looking for doesn't exist</h1>
      <img id="errorcat" src="https://i.imgur.com/unzfnaD.jpg" />
    </div>
  );
};

export default NoMatch;
