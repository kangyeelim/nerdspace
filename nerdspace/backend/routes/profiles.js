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

router.route('/getBuddy/:id/:gender/:educationlevel/:year/:interest').get((req, res) => {
  const googleID = req.params.id;
  const gender = req.params.gender;
  const educationLevel = req.params.educationlevel;
  const year = req.params.year;
  const interest = req.params.interest;
  var name = "";
  var email = "";

  // db.ref('profiles')
  // .where("googleID", "!=", googleID)
  // .where("interest", "==", interest)
  // .where("educationLevel", "==", educationLevel) 
  // .where("yearOfStudy", "==", yearOfStudy)
  // .once('value', function (snapshot) {
  //   var resArr = [];
  //   snapshot.forEach(function (child) {
  //     var key = child.key;
  //     var data = child.val();
  //     resArr.push({
  //       key: key,
  //       googleID: data.googleID,
  //       educationLevel: data.educationLevel,
  //       year: data.year,
  //       gender: data.gender,
  //       interests: data.interests,
  //     });
  //   })


  // const routeRef = db.collection("profiles");
  // const googleIDFilter = googleID ? routeRef.where("googleID", "!=", googleID) : routeRef;
  // const interestFilter = interest ? routeRef.where("interest", "==", interest) : googleIDFilter;
  // const educationLevelFilter = educationLevel ? interestFilter.where("educationLevel", "==", educationLevel) : interestFilter;
  // const yearOfStudyFilter = yearOfStudy ? educationLevel.where("yearOfStudy", "==", yearOfStudy) : educationLevelFilter;
  // yearOfStudyFilter.get().then(snapshot => {
  //   // The snapshot returned by `where().get()` does not have a `data()` reference since it returns multiple documents, it has `docs` property which is an array of all the documents matched
  //   snapshot.docs.forEach(doc => {
  //     const docData = { ...doc.data(), id: doc.id };
  //     console.log(docData);
  // })

  db.ref('profiles')
  .orderByChild('interest')
  .equalTo(interest)
  .once('value', function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      console.log(data.educationLevel + data.gender);
      if ((data.educationLevel == educationLevel && data.googleID != googleID) && (data.year == year && data.gender == gender)) {

        db.ref('users').orderByChild('googleID')
          .equalTo(googleID)
          .once('value', function (snapshot) {
            snapshot.forEach(function (child) {
              var userKey = child.key;
              var userData = child.val();
              name = userData.name;
              email = userData.email;
            });
          })

        resArr.unshift({
          key: key,
          googleID: data.googleID,
          educationLevel: data.educationLevel,
          year: data.year,
          gender: data.gender,
          interest: data.interest,
          name: name,
          email: email
        });
      }
    });
    console.log(resArr);

    res.send({
      data: resArr,    //docData, //
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
