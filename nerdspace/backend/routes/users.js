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
  .orderByChild("googleID")
  .equalTo(googleID)
  .once("value", function(snapshot, error) {
    if (snapshot.exists()) {
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
          rooms: data.rooms ? data.rooms : {}
        });
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
  })
});

router.route('/').post((req, res) => {
  const googleID = req.body.googleID;
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const ref = db.ref('users').push();
  const key = ref.key;
  ref.set({
    'name': name,
    'imageUrl': imageUrl,
    'googleID': googleID,
    'email': email
  }, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send({
        key: key,
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
  db.ref('users').child(key).update({
    'name': name,
    'imageUrl': imageUrl,
    'googleID': googleID,
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
  db.ref('users')
  .orderByChild('googleID')
  .equalTo(googleID)
  .once('value', function(snapshot, error) {
    if (snapshot.exists()) {
      var key;
      snapshot.forEach(function (child) {
        key = child.key;
        db.ref('users').child(key).child('rooms').push().set(roomID)
      });

      res.send({
        key: key,
        message: 'ROOM ID added to user'
      })
    } else {
      res.send({
        message: 'User does not exist.'
      })
    }
  });
});

router.route('/removeRoom/:roomID/:googleID').delete((req, res) => {
  const roomID = req.params.roomID;
  const googleID = req.params.googleID;
  db.ref('users')
  .orderByChild('googleID')
  .equalTo(googleID)
  .once('value', function(snapshot, error) {
    if (snapshot.exists()) {
      snapshot.forEach(function (child) {
        var key = child.key;
        var ref = db.ref('users').child(key).child('rooms');
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
      })
    }
  })
});


module.exports = router;
