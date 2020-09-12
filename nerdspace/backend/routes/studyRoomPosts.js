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
        imageUrl: data.imageUrl,
        isThereimage: data.isThereimage
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
  const isThereimage = req.body.isThereImage;
  db.ref('studyRoomPosts').push().set({
    'title': title,
    'content': content,
    'imageUrl': imageUrl,
    'isThereimage': isThereimage
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

router.route('/update').post((req, res) => {
  const key = req.body.key;
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const isThereImage = req.body.isThereImage;
  db.ref('studyRoomPosts').child(key).update({
    'title': title,
    'content': content,
    'imageUrl': imageUrl,
    'isThereimage': isThereImage
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

module.exports = router;
