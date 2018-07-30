// PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const https = require('https');
const multer = require('multer');

// ENV VARS
const { MONGODB_URI } = process.env;

const upl = multer();

// ROUTER INIT
const app = express();
const port = process.env.PORT || 8080;

// DB INIT
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(
    () => console.log('MongoDB connected'),
    err => console.log(new Error('MongoDB failed to connect.'))
  );

// MIDDLEWARE
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// ROUTES
app.use('/api', require('./api'));

app.use(express.static(__dirname + '/client'));

// LISTEN
app.listen(port, () => console.log('Listening on ' + port));

// PINGER
setInterval(() => {
  https.get('https://elmpoint.org');
}, 300000);
