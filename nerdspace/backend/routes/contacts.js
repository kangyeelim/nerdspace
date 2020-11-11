const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    const id = req.query.id;
    if (req.query.type == "dm") {
        (async () => {
            let contacts = await getDM(id);

            res.send({
                contacts: contacts,
                message: "GET success"
            });
        })();
    } else {
        (async () => {
            let contacts = await getContacts(id);

            res.send({
                contacts: contacts,
                message: "GET success"
            });
        })();
    }
});

router.route('/:id').post((req, res) => {
    const id = req.body.googleID;
    const room = req.body.roomID;
    db.ref("contact")
        .child(id)
        .child("group")
        .child(room)
        .set({
            name: req.body.name
        });

    res.send({
        message: "POST success"
    });
});

router.route('/').post((req, res) => {
    (async () => {
        let key;

        if (req.body.type == "dm") {
            let ref = db.ref("contact").child(req.body.user1Id).child("dm");

            let check = await ref.orderByChild("userId").equalTo(req.body.user2Id).once("value");
            ref = ref.push();
            if (check.exists()) {
                check.forEach((childSnapshot) => {
                    key = childSnapshot.key;
                });
            } else {
                key = ref.getKey();
                let ref2 = db.ref("contact").child(req.body.user2Id).child("dm").child(key);

                ref.set({
                    userId: req.body.user2Id,
                    name: await getName(req.body.user2Id)
                });

                ref2.set({
                    userId: req.body.user1Id,
                    name: await getName(req.body.user1Id)
                });
            }
        } else {
            let IDs = req.body.IDs;
            var id;
            let ref = db.ref("contact").child(IDs[0]).child("group").push();
            key = ref.getKey();

            for (id of IDs) {
                ref = db.ref("contact").child(id).child("group").child(key);
                ref.set({
                    name: req.body.name
                });
            }
        }

        res.send({
            chatID: key,
            message: "POST success"
        });
    })();
});

async function getDM(id) {
    var contacts = [];

    var dmSnapshot = await db.ref('contact')
        .child(id)
        .child('dm')
        .once('value');

    if (dmSnapshot.exists()) {
        dmSnapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.key)
            let obj = {
                name: childSnapshot.val().name,
                id: childSnapshot.val().userId
            };
            contacts.push(obj);
        });
    }

    return contacts;
}

async function getContacts(id) {
    var contacts = [];

    var groupSnapshot = await db.ref('contact')
        .child(id)
        .child('group')
        .once('value');

    var dmSnapshot = await db.ref('contact')
        .child(id)
        .child('dm')
        .once('value');

    if (groupSnapshot.exists()) {
        groupSnapshot.forEach((child) => {
            let obj = {
                name: child.val().name,
                id: child.key
            };
            contacts.push(obj);
        });
    }

    if (dmSnapshot.exists()) {
        dmSnapshot.forEach((childSnapshot) => {
            let obj = {
                name: childSnapshot.val().name,
                id: childSnapshot.key
            };
            contacts.push(obj);
        });
    }

    return contacts;
}

async function getName(id) {
    let name = '';
    let snapshot = await db.ref('users')
                            .child(id)
                            .once('value');

    if (snapshot.exists()) {
        name = snapshot.child("name").val();
    } else {
        return "Not found";
    }

    return name;
}

router.route('/:key/:googleID').delete((req, res) => {
    const key = req.params.key;
    const memberID = req.params.googleID;
    db.ref('contact')
        .child(memberID)
        .child('group')
        .child(key).remove(function (error) {
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
