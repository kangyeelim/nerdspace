const router = require('express').Router();
const db = require('../firebase').db;

router.route('/getBuddy/:id/:gender/:educationlevel/:year/:interest').get((req, res) => {
  const googleID = req.params.id;
  const gender = req.params.gender;
  const educationLevel = req.params.educationlevel;
  const year = req.params.year;
  const interest = req.params.interest;
  var resArr = [];

  // var userName = "";
  // var userEmail = "";
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
      
      var interestArr = Object.values(data.interests); 
      if ((interestArr.includes(interest) && data.googleID != googleID) && (data.yearOfStudy == year && data.gender == gender)) {

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
          // console.log("THISsss" +userName + userEmail);
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
    const original = req.body.originalName;
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

    if (name != original) {
        changeNames(key, name);
    }
    res.send({
        message: 'UPDATE success'
    });
});

async function changeNames(key, name) {
    let contacts = [];
    var i;

    let snapshot = await db.ref("contact")
        .child(key)
        .child("dm")
        .once("value");

    if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
            contacts.push(childSnapshot.val().userId);
        });
    }

    for (i = 0; i < contacts.length; i++) {
        db.ref('contact')
            .child(contacts[i])
            .child("dm")
            .orderByChild("userId")
            .equalTo(key)
            .once("value", function (dmSnapshot) {
                dmSnapshot.forEach(child => {
                    console.log("U P D A T E : " + child.key);
                    console.log("V A L U  E:" + child.val().name);
                    child.update({
                        name: name
                    });
                });
            });
    }

    var groupSnapshot = await db.ref('contact')
        .child(key)
        .child('group')
        .once('value');

    if (groupSnapshot.exists()) {
        groupSnapshot.forEach((groupChild) => {
            console.log("K E Y : " + groupChild.key);

            contacts.push(groupChild.key);
        });
    }

    for (i = 0; i < contacts.length; i++) {
        db.ref('messages')
            .child(contacts[i])
            .orderByChild('googleID')
            .equalTo(key)
            .once('value', function (messageSnapshot) {
                messageSnapshot.forEach((messageChild) => {
                    messageChild.update({
                        name: name
                    });
                });
            });
    }
}

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
