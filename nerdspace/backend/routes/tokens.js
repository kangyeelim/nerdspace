const router = require('express').Router();
const db = require('../firebase').db;

router.route('/byAccessToken/:id').get((req, res) => {
  const token = req.params.id;
  db.ref('tokens')
  .orderByChild("access_token")
  .equalTo(token)
  .once("value", function(snapshot, error) {
    if (snapshot.exists()) {
      var resArr = [];
      snapshot.forEach(function (child) {
        var key = child.key;
        var data = child.val();

        resArr.push({
          key: key,
          access_token: data.access_token,
          token_id: data.token_id,
          session_state: data.session_state,
          name: data.name
        });
      });

      res.send({
        data: resArr,
        message: 'GET success'
      });
    } else {
      res.send({
        message: 'Token does not exist.'
      })
    }
  })
});

router.route('/').post((req, res) => {
  const access_token = req.body.access_token;
  const token_id = req.body.token_id;
  const session_state = req.body.session_state;
  const name = req.body.name;
  db.ref('tokens').push().set({
    'access_token': access_token,
    'token_id': token_id,
    'session_state': session_state,
    'name':name
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
  const access_token = req.body.access_token;
  const token_id = req.body.token_id;
  const session_state = req.body.session_state;
  const name = req.body.name
  db.ref('tokens')
  .orderByChild('access_token')
  .equalTo(access_token)
  .once("value", function(snapshot, error) {
    if (snapshot.exists()) {
      snapshot.forEach(function(child) {
        var key = child.key;
        db.ref('tokens').child(key).update({
          'access_token': access_token,
          'token_id': token_id,
          'session_state': session_state,
          'name':name
        })
      })
      res.send({
        message: 'UPDATE success'
      });
    } else {
      res.send({
        message: 'Token does not exist.'
      })
    }
  })
});

router.route('/byAccessToken/:id').delete((req, res) => {
  const token = req.params.id;
  db.ref('tokens')
  .orderByChild("access_token")
  .equalTo(token)
  .once("value", function(snapshot, error) {
    if (snapshot.exists()) {
      snapshot.forEach(function (child) {
        var key = child.key;
        db.ref('tokens').child(key).remove();
      });

      res.send({
        message: 'DELETE success'
      });
    } else {
      res.send({
        message: 'Token does not exist.'
      })
    }
  })
});

router.route('/byTokenId/:id').delete((req, res) => {
  const token_id = req.params.id;
  db.ref('tokens')
  .orderByChild("token_id")
  .equalTo(token_id)
  .once("value", function(snapshot, error) {
    if (snapshot.exists()) {
      snapshot.forEach(function (child) {
        var key = child.key;
        db.ref('tokens').child(key).remove();
      });

      res.send({
        message: 'DELETE success'
      });
    } else {
      res.send({
        message: 'Token does not exist.'
      })
    }
  })
});


module.exports = router;
