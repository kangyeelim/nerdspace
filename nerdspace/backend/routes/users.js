const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    res.send({
        message: "GET success"
    });
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const interests = req.body.interests;
    db.ref('users').push().set({
        'username': name,
        'age': age,
        'interests': interests
    });

    res.send({
        message: "POST success"
    });
});

module.exports = router;
