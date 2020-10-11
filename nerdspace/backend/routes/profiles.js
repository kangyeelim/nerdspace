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
  var resArr = [];

  var userName = "";
  var userEmail = "";
  // var userKey;
  // var userData;
  // var userArr;

  db.ref('profiles')
  .orderByChild('educationLevel')
  .equalTo(educationLevel)
  .once('value', function (snapshot) {
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      
      console.log(data.educationLevel + data.gender + data.year);
      var interestArr = Object.values(data.interests); 
      if ((interestArr.includes(interest) && data.googleID != googleID) && (data.year == year && data.gender == gender)) {

        // db.ref('users').orderByChild('googleID')
        //   .equalTo(data.googleID)
        //   .once('value', function (snapshot) {
            
        //     snapshot.forEach(function (child, error) {
        //       userKey = child.key;
        //       userData = child.val();

        //       userName = userData.name;
        //       userEmail = userData.email;
        //       userArr.unshift({
        //         name: userData.name,
        //         email: userData.name
        //       })
        //       // resArr.unshift({
        //       //   key: key,
        //       //   googleID: data.googleID,
        //       //   educationLevel: data.educationLevel,
        //       //   year: data.year,
        //       //   gender: data.gender,
        //       //   interest: data.interests,
        //       //   name: userData.name,
        //       //   email: userData.email
        //       // });
        //       console.log("THIS" +userData.name + userData.email);
        //     });
        //   })
          

          // userName = userArr.filter(el => el != null );
          // userEmail = userArr.filter(el => el != null );
          console.log("THISsss" +userName + userEmail);
        resArr.unshift({
          key: key,
          googleID: data.googleID,
          educationLevel: data.educationLevel,
          year: data.year,
          gender: data.gender,
          interest: data.interests,
          name: userName,
          email: userEmail
        });
      }
    });
    console.log("RESARR" + resArr);
    // var results = resArr.filter((obj) => {
    //   return (obj.googleID != googleID) && (obj.year == year) && (obj.gender == gender) 
    // }) //(obj.interest.includes(interest)) &&
    // console.log(results);

    res.send({
      data: resArr,    //docData, //results,  
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
