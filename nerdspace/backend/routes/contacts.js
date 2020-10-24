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

router.route('/').post((req, res) => {
    (async () => {
        let key;

        if (req.body.type == "dm") {
            let ref = db.ref("contact").child(req.body.user1Id).child("dm").push();
            key = ref.getKey();

            postDM(ref, req.body.user2Id)
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

async function postDM(ref, id) {
    ref.set({
        userId: id,
        name: await getName(id)
    });
}

async function getDM(id) {
    var contacts = [];

    var dmSnapshot = await db.ref('contact')
        .child(id)
        .child('dm')
        .once('value');

    if (dmSnapshot.exists()) {
        dmSnapshot.forEach((childSnapshot) => {
            let obj = {
                name: childSnapshot.val().name,
                id: childSnapshot.val().userID
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
                id: childSnapshot.val().userID
            };
            contacts.push(obj);
        });
    }

    return contacts;
}

async function getName(id) {
    let name = '';

    var snapshot = await db.ref('users')
        .orderByChild("googleID")
        .equalTo(id)
        .once('value');

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            name = childSnapshot.val().name;
        });
    } else {
        return "Not found";
    }

    return name;
}

module.exports = router;
