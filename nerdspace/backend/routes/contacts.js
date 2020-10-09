const router = require('express').Router();
const db = require('../firebase').db;

router.route('/').get((req, res) => {
    const id = req.query.id;

    (async () => {
        let contacts = await wrap(id);

        res.send({
            contacts: contacts,
            message: "GET success"
        });
    })();
});

router.route('/').post((req, res) => {
    let ref = db.ref("contacts").push();
    let key = ref.getKey();

    if (req.body.type == "dm") {
        ref.set({
            user1Id: req.body.user1Id,
            user2Id: req.body.user2Id,
            type: "dm"
        });

        db.ref("userChat").push().set({
            chatID: key,
            googleID: req.body.user1Id
        });

        db.ref("userChat").push().set({
            chatID: key,
            googleID: req.body.user2Id
        });
    } else {
        //TODO: Add to userChat
        ref.set({
            type: "group",
            name: req.body.name
        });
    }
    
    res.send({
        message: "POST success"
    });
});

async function wrap(id) {
    const ids = await getChatId(id);
    var contacts = [];

    for (i = 0; i < ids.length; i++) {
        contacts.push(await getContacts(ids[i], id));
    }

    return contacts;
}

async function getChatId(id) {
    let notes = [];

    var snapshot = await db.ref('userChat')
        .orderByChild("googleID")
        .equalTo(id)
        .once('value');

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            notes.push(childSnapshot.val().chatID);
        });
    } else {
        notes.push("nothing");
    }

    return notes;
}

async function getContacts(id, userId) {
    var snapshot = await db.ref('contacts')
        .child(id)
        .once('value');

    if (snapshot.exists()) {
        if (snapshot.val().type == "group") {
            let obj = {
                name: snapshot.val().name,
                id: id
            };
            return obj;
        } else {
            let u1 = snapshot.val().user1Id;
            if (u1 == userId) {
                let name = await getName(snapshot.val().user2Id)
                let obj = {
                    name: name,
                    id: id
                };
                return obj;
            } else {
                let name = await getName(snapshot.val().user1Id)
                let obj = {
                    name: name,
                    id: id
                };
                return obj;
            }
        }
    } else {
        return [];
    }
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
