const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  db.ref('studyRooms').once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        name: data.name,
        imageUrl: data.imageUrl,
        isThereImage: data.isThereImage,
        memberIDs: data.memberIDs,
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
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const isThereImage = req.body.isThereImage;
  const memberID = req.body.googleID;
  var roomRef = db.ref('studyRooms').push();
  roomRef.set({
    'name': name,
    'imageUrl': imageUrl,
    'isThereImage': isThereImage,
  }, function (error) {
    if (error) {
      res.send(error);
    }
  });
  roomRef.child('members').push().set({
    'memberID': memberID
  }, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send({
        message: 'POST success'
      })
    }
  });
});

router.route('/updateInfo').post((req, res) => {
  const key = req.body.key;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const isThereImage = req.body.isThereImage;
  db.ref('studyRooms').child(key).update({
    'name': name,
    'imageUrl': imageUrl,
    'isThereImage': isThereImage,
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

router.route('/addMembers').post((req, res) => {
  const key = req.body.key;
  const memberID = req.body.googleID;
  db.ref('studyRooms').child(key).child('members').push().set({
    'googleID': memberID
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

router.route('/').delete((req, res) => {
  const key = req.body.key;
  db.ref('studyRooms').child(key).remove(
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
