const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
  db.ref('users').once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.push({
        key: key,
        name: data.name,
        imageUrl: data.imageUrl,
        googleID: data.googleID,
        email: data.email,
        postIDs: data.postIDs ? data.postIDs : [],
        friendIDs: data.friendIDs ? data.friendIDs : [],
        roomIDs: data.roomIDs ? data.roomIDs : []
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
  db.ref('users')
  .orderByChild('googleID')
  .equalTo(googleID)
  .once("value", function(snapshot, error) {
    if (snapshot.exists()) {
      res.send({
        message: 'User exists',
        data: snapshot.val()
      })
    } else {
      res.send({
        message: 'User does not exist.'
      })
    }
  })
})

router.route('/').post((req, res) => {
  const googleID = req.body.googleID;
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const roomIDs = [];
  const friendIDs = [];
  const postIDs = [];
  db.ref('users').push().set({
    'name': name,
    'imageUrl': imageUrl,
    'googleID': googleID,
    'email': email,
    'postIDs': postIDs,
    'friendIDs': friendIDs,
    'roomIDs': roomIDs
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
  const googleID = req.body.googleID;
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const roomIDs = req.body.roomIDs;
  const friendIDs = req.body.friendIDs;
  const postIDs = req.body.postIDs;
  db.ref('users').child(key).update({
    'name': name,
    'imageUrl': imageUrl,
    'googleID': googleID,
    'email': email,
    'postIDs': postIDs,
    'friendIDs': friendIDs,
    'roomIDs': roomIDs
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
