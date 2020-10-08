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
        .orderByChild("id")
        .equalTo(id)
        .once('value');

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            notes.push(childSnapshot.val().chatID);
        });
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
                let obj = {
                    name: snapshot.val().user2Name,
                    id: id
                };
                return obj;
            } else {
                let obj = {
                    name: snapshot.val().user1Name,
                    id: id
                };
                return obj;
            }
        }
    } else {
        return [];
    }
}

module.exports = router;
