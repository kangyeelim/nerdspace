const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  db.ref('profiles').once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        googleID: data.googleID,
        educationLevel: data.educationLevel,
        year: data.year,
        gender: data.gender,
        interests: data.interests,
      });
    });

    res.send({
      data: resArr,
      message: 'GET success'
    });
  }, function (error) {
      res.send(error);
  });
});

router.route('/').post((req, res) => {
  const googleID = req.body.googleID;
  const educationLevel = req.body.educationLevel;
  const year = req.body.year;
  const gender = req.body.gender;
  const interests = req.body.interests;
  var profileRef = db.ref('profiles').push();
  profileRef.set({
    'googleID': googleID,
    'educationLevel': educationLevel,
    'year': year,
    'gender': gender
  }, function (error) {
    if (error) {
      res.send(error);
    }
  });

  interests.forEach((item, i) => {
    profileRef.child('interests').push().set(item);
  });
  res.send({
    message: 'POST success'
  });
});

router.route('/updateInfo').post((req, res) => {
  const googleID = req.body.googleID;
  const educationLevel = req.body.educationLevel;
  const year = req.body.year;
  const gender = req.body.gender;
  db.ref('profiles').child(key).update({
    'googleID': googleID,
    'educationLevel': educationLevel,
    'year': year,
    'gender': gender
  }, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send({
        message: 'UPDATE success'
      })
    }
  });
});

router.route('/updateInterests').post((req, res) => {
  const key = req.body.key;
  const interests = req.body.interests;
  var profileRef = db.ref('profiles').child(key);
  profileRef.child('interests').remove(
    function (error) {
    if (error) {
      res.send(error);
    }
  });
  interests.forEach((item, i) => {
    profileRef.child('interests').push().set(item);
  });
  res.send({
    message: 'POST success'
  });
});

router.route('/:id').delete((req, res) => {
  const key = req.params.id;
  db.ref('profiles').child(key).remove(
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send({
          message: 'DELETE success'
        });
      }
    });
});


module.exports = router;
