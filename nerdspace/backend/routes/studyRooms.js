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

router.route('/byKeyword/:keyword').get((req, res) => {
  const keyword = req.params.keyword;

  db.ref('studyRooms').orderByChild('name')
  .startAt(keyword)
  .endAt(keyword + "\uf8ff")
  .once('value',
  function (snapshot) {
    var resArr = [];
    snapshot.forEach(function (child) {
      var key = child.key;
      var data = child.val();
      resArr.unshift({
        key: key,
        name: data.name,
        imageUrl: data.imageUrl,
        isThereImage: data.isThereImage,
        members: data.members
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

  db.ref('studyRooms')
  .child(key)
  .once('value',
  function (snapshot) {
    console.log(snapshot.val())
    res.send({
      data: snapshot.val(),
      message: 'GET success'
    })
  }, function (error) {
      res.send(error);
  });
});


router.route('/').post((req, res) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const isThereImage = req.body.isThereImage;
  const memberIDs = req.body.googleIDs;
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
  memberIDs.forEach(id => {
    roomRef.child('members').push().set(memberID);
  })
  
  res.send({
    message: 'POST success',
    data: roomRef.key
  })
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
  db.ref('studyRooms').child(key).child('members').push().set(memberID);

  res.send({
    message: 'UPDATE success'
  });
});

router.route('/removeMember/:key/:googleID').delete((req, res) => {
  const key = req.params.key;
  const memberID = req.params.googleID;
  var ref = db.ref('studyRooms').child(key).child('members');
  var query = ref.orderByKey();
  query.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var pkey = childSnapshot.key;
      var chval = childSnapshot.val();
      if (chval == memberID) {
        console.log(Object.values(snapshot.val()).length);
        const numOfMembers = Object.values(snapshot.val()).length;

        ref.child(pkey).remove(function (error) {
          if (error) {
            res.send(error);
          } else {
            res.send({
              message: 'DELETE MEMBER success',
              data: numOfMembers
            });
          }
        });
      }
    });
  });
});

router.route('/:id').delete((req, res) => {
  const key = req.params.id;
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
