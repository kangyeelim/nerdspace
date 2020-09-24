const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    db.ref('buddyFinderPosts').once('value', function(snapshot) {   // change to buddyFinderPosts
        var resultArr = [];
        snapshot.forEach(function(child) {
            var key = child.key;
            var value = child.val();
            resultArr.push({
                key: key,
                googleID: value.googleID,
                educationLevel: value.educationLevel,
                yearOfStudy: value.yearOfStudy,
                gender: value.gender,
                interest: value.interest
            })
        })

        res.send({
            value: resultArr,
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