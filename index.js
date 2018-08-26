// PACKAGES
const express = require('express');
const bp = require('body-parser');
const https = require('https');
const path = require('path');
const ejs = require('ejs');

//
// ROUTER INIT
const app = express();
const port = process.env.PORT || 8080;

//
// DB INIT
const db = require('./db');

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

// error 404
app.use((req, res) => res.status(404).send('404 Not Found'));

//
// LISTEN
app.listen(port, () => console.log('Listening on ' + port));

//
// PINGER
setInterval(() => {
  https.get('https://elmpoint.org');
}, 300000);
