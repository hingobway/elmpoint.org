module.exports = JSON.parse(
  Buffer.from(process.env.FIREBASE_CONFIG, 'base64').toString()
);
