const router = require('express').Router();
const db = require('../firebase').db;

router.route('/getBuddy/:id/:gender/:educationlevel/:year/:interest').get((req, res) => {
  const googleID = req.params.id;
  const gender = req.params.gender;
  const educationLevel = req.params.educationlevel;
  const year = req.params.year;
  const interest = req.params.interest;
  var resArr = [];

  db.ref('profiles')
  .orderByChild('educationLevel')
  .equalTo(educationLevel)
  .once('value', function (snapshot) {
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();

      var interestArr = Object.values(data.interests);
      if ((interestArr.includes(interest) && key != googleID) && (data.yearOfStudy == year && data.gender == gender) && (data.educationLevel == educationLevel)) {
        resArr.unshift({
          key: key,
          googleID: key,
          educationLevel: data.educationLevel,
          year: data.yearOfStudy,
          gender: data.gender,
          interest: data.interests,
          name: data.name,
          email: data.email,
          imageUrl: data.imageUrl
        });
      }
    });

    res.send({
      data: resArr,  
      message: 'GET success'
    });
  }, function (error) {
      res.send(error);
  });
});

router.route('/:id').get((req, res) => {
  const key = req.params.id;
  var resArr = [];

  db.ref('profiles')
  .child(key)
  .once("value", function (snapshot, error) {
      if (snapshot.exists()) {
          var resArr = [];
          var data = snapshot.val();

          res.send({
              data: {
                key: key,
                googleID: key,
                educationLevel: data.educationLevel,
                year: data.yearOfStudy,
                gender: data.gender,
                interest: data.interests,
                name: data.name,
                bio: data.bio,
                email: data.email,
                imageUrl: data.imageUrl
              },
              message: 'GET success'
          });
      } else {
          res.send({
              message: 'User does not exist.'
          })
      }
  });
});

router.route('/updateProfile').post((req, res) => {
    const key = req.body.key;
    const interests = req.body.interests;
    const edu = req.body.educationLevel;
    const year = req.body.yearOfStudy;
    const gender = req.body.gender;
    const name = req.body.name;
    const bio = req.body.bio;
    const pic = req.body.imageUrl;
    const email = req.body.email;
    db.ref('profiles').child(key).update({
        'name': name,
        'bio': bio,
        'gender': gender,
        'yearOfStudy': year,
        'educationLevel': edu,
        'imageUrl': pic,
        'email': email
    }, function (error) {
        if (error) {
            res.send(error);
        }
    });
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
        message: 'UPDATE success'
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
