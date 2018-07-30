const axios = require('axios');
require('./index');

const domain = 'http://localhost:8080';

setTimeout(
  () =>
    axios
      .get(domain + '/')
      .catch(console.error)
      .then(() =>
        axios
          .get(daomin + '/api/')
          .catch(console.error)
          .then(() => process.exit())
      ),
  3000
);
