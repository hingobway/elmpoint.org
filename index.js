// PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const https = require('https');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

//
// ENV VARS
const { MONGODB_URI } = process.env;

const upl = multer();

//
// ROUTER INIT
const app = express();
const port = process.env.PORT || 8080;

//
// DB INIT
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'), err => console.log(err));

//
// MIDDLEWARE / CONFIG
app.set('views', path.join(__dirname, '/client'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//
// ROUTES
app.use('/api', require('./api'));

// serve HTML
app.use(async (req, res, next) => {
  app.render(
    'pages' + req.path + (req.path !== '/' ? '.html' : ''),
    (err, page) => {
      if (err) return next();
      res.render('', {
        page
      });
    }
  );
});

// serve static files
app.use(express.static(__dirname + '/public'));

// LISTEN
app.listen(port, () => console.log('Listening on ' + port));

// PINGER
setInterval(() => {
  https.get('https://elmpoint.org');
}, 300000);
