'use strict';
const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const fs = require('fs');

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/report', (req, res, next) => {
  try {
    fs.readFile(
      path.join(__dirname, '..', 'public', 'sessionLog.json'),
      (err, data) => {
        if (err) throw err;
        let logData = JSON.parse(data);
        res.json(logData);
      }
    );
  } catch (e) {
    next(e);
  }
});

app.post('/api/report', (req, res, next) => {
  try {
    const { userId, color, counter } = req.body;
    const newData = {
      userId,
      color,
      counter,
    };

    fs.readFile(
      path.join(__dirname, '..', 'public', 'sessionLog.json'),
      (err, data) => {
        if (err) throw err;
        let logData = JSON.parse(data);
        logData[userId] = newData;
        fs.writeFile(
          path.join(__dirname, '..', 'public', 'sessionLog.json'),
          JSON.stringify(logData, undefined, 2),
          err => {
            if (err) throw err;
            console.log('Data written to file');
          }
        );
      }
    );
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.put('/api/report', (req, res, next) => {
  try {
    const {id} = req.body


    fs.readFile(
      path.join(__dirname, '..', 'public', 'sessionLog.json'),
      (err, data) => {
        if (err) throw err;
        let logData = JSON.parse(data);
        delete logData[id]
        fs.writeFile(
          path.join(__dirname, '..', 'public', 'sessionLog.json'),
          JSON.stringify(logData, undefined, 2),
          err => {
            if (err) throw err;
            console.log('Data updated');
          }
        );
      }
    );
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.delete('/api/report', (req, res, next) => {
  try {
    const originalData = {
      Sample: {
        userId: 'example',
        color: 'n/a',
        counter: 'n/a',
      },
    };

    fs.writeFile(
      path.join(__dirname, '..', 'public', 'sessionLog.json'),
      JSON.stringify(originalData, undefined, 2),
      err => {
        if (err) throw err;
        console.log('Data reset');
      }
    );

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () =>
  console.log(`studiously serving silly sounds on port ${PORT}`)
);

module.exports = app;
