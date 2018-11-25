const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.verify = token =>
  new Promise(r => {
    jwt.verify(token, JWT_SECRET, (err, obj) => {
      if (err) return r(false);
      r(obj);
    });
  });
