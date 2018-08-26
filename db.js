/**
 * This file contains configuration for the Cloud Firestore database.
 * Usage information can be found at the links below.
 *
 * Guide: https://firebase.google.com/docs/firestore/
 * Docs:  https://cloud.google.com/nodejs/docs/reference/firestore/0.15.x/DocumentReference
 */

const admin = require('firebase-admin');

const serviceAccount = require('./firebase.config');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });

module.exports = db;
