const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    db.ref('buddyFinderPosts').once('value', function(snapshot) {   // change to buddyFinderPosts
        var resultArr = [];
        snapshot.forEach(function(child) {
            var key = child.key;
            var data = child.val();
            resultArr.push({
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

router.route('/byGoogleID/:id').get((req, res) => {
    const googleID = req.params.id;
    db.ref('buddyFinderPosts')
    .orderByChild('googleID')
    .equalTo(googleID)
    .once("value", function (snapshot) {
      var resArr = [];
      snapshot.forEach(function (child) {
        var key = child.key;
        var data = child.val();
        resArr.push({
            key: key,
            googleID: data.googleID,
            educationLevel: data.educationLevel,
            yearOfStudy: data.yearOfStudy,
            gender: data.gender,
            interest: data.interest
        });
      });
      res.send({
        data: resArr,
        message: 'GET success'
      });
    }, function (error) {
        res.send({
          message: 'No requests found',
          error: error
        });
    });
  });
  

router.route('/').post((req, res) => {
    const educationLevel = req.body.educationLevel;
    const yearOfStudy = req.body.yearOfStudy;
    const interest = req.body.interest;
    const googleID = req.body.googleID;
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

})

router.route('/:id').delete((req, res) => {
    const key = req.params.id;
    db.ref('buddyFinderPosts').child(key).remove(
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