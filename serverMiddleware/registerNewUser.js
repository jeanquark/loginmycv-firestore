const express = require('express'),
      bodyParser = require('body-parser'),
      moment = require('moment'),
      admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function buildCandidateObject (payload) {
    let candidate = {};
    candidate.id = payload.id;
    candidate.email = payload.email;
    candidate._created_at = moment().unix();
    candidate._updated_at = moment().unix();
    return candidate;
}

module.exports = app.use(async function (req, res, next) {
    try {
        console.log('REGISTER NEW USER');
        console.log('req.body.data: ', req.body.data);

        const newUser = buildCandidateObject(req.body.data);
        console.log('newUser: ', newUser);

        const store = admin.firestore();
        if (newUser.id) {
            store.collection('users').doc(newUser.id).set(newUser);
        } else {
            store.collection('users').add(newUser);
        }

        // Get auth user id
        // const decodedToken = await admin.auth().verifyIdToken(req.body.data.idToken);
        // console.log('decodedToken: ', decodedToken);
        // const uid = decodedToken.uid;
        // console.log('uid: ', uid);
       
        // const password_encode = btoa(newCandidate.password)

        // const newRecruiter = await admin.auth().createUser({
        //     email: 'loginmycv_recruiter_jm.kleger@gmail.com',
        //     emailVerified: false,
        //     phoneNumber: "+11234567890",
        //     password: newCandidate.password,
        //     displayName: "Recruiter",
        //     photoURL: "http://www.example.com/photo.png",
        //     disabled: false
        // });

        // store.collection('recruiters').doc(newCandidate.id).set({
        //     id: req.body.data.id,
        //     candidate_id: newCandidate.id,
        //     password_encode: req.body.data.password_encode
        // });

        res.send(newUser);
    } 
    catch (error) {
        res.status(500).send('Server error, candidate could not be registered. ' + error);
    }
});