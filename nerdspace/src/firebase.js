let firebase = require('firebase');
require('firebase/storage');
require('dotenv').config();

const firebaseApp = firebase.initializeApp({
  //insert the config object
  apiKey: process.env.API_KEY,
  authDomain: "nerdspace.firebaseapp.com",
  databaseURL: "https://nerdspace.firebaseio.com",
  projectId: "nerdspace",
  storageBucket: "nerdspace.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
});

const db = firebaseApp.database();

exports.db = db;
