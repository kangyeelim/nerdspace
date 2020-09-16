const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    res.send({
        message: "GET success"
    });
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    const timestamp = Date.now();
    db.ref('users').push().set({
        'username': name,
        'message': message,
        'timestamp': timestamp
    });

    res.send({
        message: "POST success"
    });
});

module.exports = router;
