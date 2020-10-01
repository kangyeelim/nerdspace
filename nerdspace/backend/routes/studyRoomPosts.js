const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  db.ref('studyRoomPosts').once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        title: data.title,
        content: data.content,
        imageUrl: data.images,
        isThereImage: data.isThereImage,
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

router.route('/getByRoom/:id').get((req, res) => {
  const roomID = req.params.id;
  db.ref('studyRoomPosts')
  .orderByChild('roomID')
  .equalTo(roomID)
  .once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.unshift({
        key: key,
        title: data.title,
        content: data.content,
        imageUrl: data.images,
        isThereImage: data.isThereImage,
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

router.route('/').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const isThereImage = req.body.isThereImage;
  const roomID = req.body.roomID;
  const googleID = req.body.googleID;
  var postRef = db.ref('studyRoomPosts').push();
  postRef.set({
    'title': title,
    'content': content,
    'isThereImage': isThereImage,
    'roomID': roomID,
    'googleID': googleID
  }, function (error) {
    if (error) {
      res.send(error);
    }
  });
  imageUrl.forEach((url) => {
    postRef.child('images').push().set(url);
  })
  res.send({
    message: 'POST success',
    data: postRef.key
  })
});

router.route('/update').post((req, res) => {
  const key = req.body.key;
  const title = req.body.title;
  const content = req.body.content;
  db.ref('studyRoomPosts').child(key).update({
    'title': title,
    'content': content,
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
  db.ref('studyRoomPosts').child(key).remove(
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
