// PACKAGES
const express = require('express');
const bp = require('body-parser');
const cp = require('cookie-parser');
const https = require('https');
const path = require('path');
const ejs = require('ejs');
const qs = require('querystring');

const auth = require('./auth');

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
app.use(cp());

//
// ROUTES
app.use('/api', require('./api'));

// authenticate protected endpoints
app.use(async (req, res, next) => {
  if (!req.path.match(/^\/auth\/(?!$)/i)) return next();
  if (req.cookies.auth && (await auth.verify(req.cookies.auth))) return next();
  res.redirect(
    '/auth?' + qs.stringify(Object.assign({ path: req.path }, req.query))
  );
});
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
