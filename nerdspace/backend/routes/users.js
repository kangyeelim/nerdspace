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
        email: data.email,
        rooms: data.rooms ? data.rooms : {}
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
        .child(googleID)
        .once("value", function (snapshot, error) {
            if (snapshot.exists()) {
                var resArr = [];
                var key = googleID;
                var data = snapshot.val();

                resArr.push({
                    key: key,
                    name: data.name,
                    imageUrl: data.imageUrl,
                    email: data.email,
                    rooms: data.rooms ? data.rooms : {}
                });

                res.send({
                    data: resArr,
                    message: 'GET success'
                });
            } else {
                res.send({
                    message: 'User does not exist.'
                })
            }
        });
});

router.route('/').post((req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const ref = db.ref('users').push();
  const key = ref.key;
  console.log(key)
  ref.set({
    'name': name,
    'imageUrl': imageUrl,
    'email': email
  }, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send({
        data: key,
        message: 'POST success'
      })
    }
  });
});

router.route('/update').post((req, res) => {
  const key = req.body.key;
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  db.ref('users').child(key).update({
    'name': name,
    'imageUrl': imageUrl,
    'email': email
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

router.route('/addRoomID').post((req, res) => {
  const roomID = req.body.roomID;
  const googleID = req.body.googleID;
    var ref = db.ref('users')
        .child(googleID)
        .child('rooms')
        .push();
    var key = ref.getKey();
    ref.set(roomID);

    res.send({
        key: key,
        message: 'ROOM ID added to user'
    })
});

router.route('/removeRoom/:roomID/:googleID').delete((req, res) => {
  const roomID = req.params.roomID;
  const googleID = req.params.googleID;
  var ref = db.ref('users')
        .child(googleID)
        .child('rooms');
    var query = ref.orderByKey();
        query.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var pkey = childSnapshot.key;
        var chval = childSnapshot.val();
        if (chval == roomID) {
            ref.child(pkey).remove(function (error) {
            if (error) {
                res.send(error);
            } else {
                res.send({
                message: 'DELETE ROOMID success'
                });
            }
            });
        }
        });
    });
});

router.route('/byEmail').get((req, res) => {
    const email = req.query.email;
    db.ref('users')
        .orderByChild("email")
        .equalTo(email)
        .once("value", function (snapshot, error) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.key;

                    res.send({
                        data: key,
                        message: 'GET success'
                    });
                });
            } else {
              res.send({
                 message: 'User does not exist.'
              })
            }
        });
});


module.exports = router;
