const express = require('express');
const jwt = require('jsonwebtoken');
const Err = require('./err');

const { SITE_PASSWORD, JWT_SECRET } = process.env;

const sign = ip =>
  new Promise(r =>
    jwt.sign(
      {
        user: ip
      },
      JWT_SECRET,
      { issuer: 'ORG.ELMPOINT/PRIMARY', expiresIn: '7d' },
      (err, str) => {
        if (err) return console.log(new Error(err));
        r(str);
      }
    )
  );

const r = new express.Router();

r.post('/general', async (req, res) => {
  if (req.body && req.body.password) {
    if (req.body.password === SITE_PASSWORD)
      return res.json({
        token: await sign(req.headers['x-forwarded-for'] || !!0)
      });
    Err(res)(401, 'INCORRECT_PASSWORD');
  } else Err(res)(400, 'MISSING_DATA');
});

module.exports = r;
