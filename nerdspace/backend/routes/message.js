const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    res.send({
        message: "GET success"
    });
});

router.route('/').post((req, res) => {
    const name = req.body.username;
    const message = req.body.message;
    const id = req.body.senderId;
    const room = req.body.room;
    const timestamp = Date.now();
    db.ref('messages').child(room).push().set({
        'username': name,
        'googleID': id,
        'message': message,
        'timestamp': timestamp
    });

    res.send({
        message: "POST success"
    });
});

module.exports = router;
