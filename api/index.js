const express = require('express');

const r = new express.Router();

r.use((req, res) => res.status(404).json({ error: 'NOT_FOUND' }));

module.exports = r;
