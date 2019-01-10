'use strict';

const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const session = require('express-session');
const request = require('request');

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false,
  })
);

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api', require('./api')) // include our routes!
app.get('/api/search', (req, res, next) => {
  const search = req.query.title;
  const requestSettings = {
    url: `http://openlibrary.org/search.json?title=${search}`,
  };

  request(requestSettings, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    } else {
      console.error(error);
      res.json(error);
    }
  });
});

app.get('/api/books/:id', (req, res, next) => {
  const bookId = req.params.id;

  const requestSettings = {
    url: `https://openlibrary.org/api/books?bibkeys=${bookId}&jscmd=details&format=json`,
  };

  request(requestSettings, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    } else {
      console.error(error);
      res.json(err);
    }
  });
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const PORT = 1337;

app.listen(PORT, () =>
  console.log(`studiously serving silly sounds on port ${PORT}`)
);

module.exports = app;
