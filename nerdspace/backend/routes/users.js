const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  res.send({
    message: "GET success"
  });
});

router.route('/').post((req, res) => {
  res.send({
    message: "POST success"
  });
});

module.exports = router;
