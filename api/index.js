const express = require('express');
const Err = require('./err');

const r = new express.Router();

r.use((req, res) => Err(res)(404, 'NOT_FOUND'));

module.exports = r;
