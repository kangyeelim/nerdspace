const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  db.ref('studyRoomRequests').once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        roomID: data.roomID,
        googleID: data.googleID
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

router.route('/byRoomID/:id').get((req, res) => {
  const roomID = req.params.id;
  db.ref('studyRoomRequests')
  .orderByChild('roomID')
  .equalTo(roomID)
  .once("value", function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        roomID: data.roomID,
        googleID: data.googleID
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

router.route('/byGoogleID/:id').get((req, res) => {
  const googleID = req.params.id;
  db.ref('studyRoomRequests')
  .orderByChild('googleID')
  .equalTo(googleID)
  .once("value", function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        roomID: data.roomID,
        googleID: data.googleID
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
  const googleID = req.body.googleID;
  const roomID = req.body.roomID
  var requestRef = db.ref('studyRoomRequests').push();
  requestRef.set({
    'roomID': roomID,
    'googleID': googleID
  }, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send({
        message: 'POST success',
        data: requestRef.key
      })
    }
  });
});

router.route('/update').post((req, res) => {
  const key = req.body.key;
  const googleID = req.body.googleID;
  const roomID = req.body.roomID;
  db.ref('studyRoomRequests').child(key).update({
    'roomID': roomID,
    'googleID': googleID
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

router.route('/:id').delete((req, res) => {
  const key = req.params.id;
  db.ref('studyRoomRequests').child(key).remove(
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
