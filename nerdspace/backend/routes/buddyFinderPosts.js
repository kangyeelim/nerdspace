const router = require('express').Router();
const db = require('../firebase').db;

<<<<<<< HEAD
router.route('./').get((req, res) => {
=======
router.route('/').get((req, res) => {
>>>>>>> temp
    db.ref('buddyFinderPosts').once('value', function(snapshot) {   // change to buddyFinderPosts
        var resultArr = [];
        snapshot.forEach(function(child) {
            var key = child.key;
            var value = child.val();
            res.push({
                key: key,
                googleID: data.googleID,
                educationLevel: data.educationLevel,
                yearOfStudy: data.yearOfStudy,
                gender: data.gender,
                interest: data.interest
            })
        })

        res.send({
            data: resultArr,
            message: "GET success"
        })
    }, function(error) {
        res.send(error);
    })
})

router.route('/').post((req, res) => {
    const educationLevel = req.body.educationLevel;
    const yearOfStudy = req.body.yearOfStudy;
    const interest = req.body.interest;
    const googleID = req.body.googleID;
<<<<<<< HEAD

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
=======
    const gender = req.body.gender;

    var buddyFinderRef = db.ref('buddyFinderPosts').push();
    buddyFinderRef.set({
    'googleID': googleID,
    'educationLevel': educationLevel,
    'yearOfStudy': yearOfStudy,
    'gender': gender,
    'interest': interest
    }, function (error) {
        if (error) {
        res.send(error);
        }
    });

    // interests.forEach((item, i) => {
    //     buddyFinderRef.child('interests').push().set(item);
    // });
    // res.send({
    //     message: 'POST success'
    // });
>>>>>>> temp
})

router.route('/').delete((req, res) => {
    db.ref('buddyFinderPosts').child(req.body.key).remove(
        function (error) {
            if (error) {
                res.send(error);
            } else {
                res.send({
                message: 'DELETE success'
            })}
        }
    )
})





module.exports = router;