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
        members: data.members,
        posts: data.posts
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
  const members = data.members;
  const posts = [];
  db.ref('studyRooms').push().set({
    'name': name,
    'imageUrl': imageUrl,
    'members': members,
    'isThereimage': isThereimage,
    'posts': posts
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
  const name = req.body.name;
  const members = req.body.members;
  const imageUrl = req.body.imageUrl;
  const isThereImage = req.body.isThereImage;
  const posts = req.body.posts;
  db.ref('studyRooms').child(key).update({
    'name': name,
    'imageUrl': imageUrl,
    'members': members,
    'isThereimage': isThereimage,
    'posts': posts
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
