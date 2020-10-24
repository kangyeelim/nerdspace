const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  db.ref('studyTimes').once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        roomId: data.roomId
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

router.route('/byRoomID/:roomID').get((req, res) => {
  const key = req.params.roomID;
  var resArr =[];
  db.ref('studyTimes')
  .orderByChild('roomId')
  .equalTo(key)
  .once('value',
  function (snapshot) {
    snapshot.forEach(function(child) {
      var key = child.key;
      var data = child.val();
      resArr.unshift({
        key: key,
        roomId: data.roomId,
        times: data.times,
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
  const roomId = req.body.roomId;
  const times = req.body.times;

  var roomRef = db.ref('studyTimes').push();
  roomRef.set({
    'roomId': roomId,
    'times': times
  }, function (error) {
    if (error) {
      res.send(error);
    }
  });
  res.send({
    message: 'POST success',
    data: roomRef.key
  })
});


router.route('/updateInfo').post((req, res) => {
  const key = req.body.key;
  const roomId = req.body.roomId;
  const times = req.body.times;
  db.ref('studyTimes').child(key).update({
    'roomId': roomId,
    'times': times
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

router.route('/update/byRoomID').post((req, res) => {
  const roomId = req.body.roomId;
  const userId = req.body.userId;
  const time = req.body.time;
  db.ref('studyTimes').
  orderByChild('roomId')
  .equalTo(roomId)
  .once('value', function(snapshot) {
    snapshot.forEach(function (child) {
      var key = child.key;
      db.ref('studyTimes')
      .child(key)
      .child('times')
      .child(userId)
      .remove();
      db.ref('studyTimes')
      .child(key)
      .child('times')
      .child(userId)
      .update(time);
    });
    res.send({
      message: 'UPDATE success'
    })
  }, function(err) {
    res.send(err);
  })
});


router.route('/:id').delete((req, res) => {
  const key = req.params.id;
  db.ref('studyTimes').child(key).remove(
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
