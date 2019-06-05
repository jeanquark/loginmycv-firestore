const express = require('express'),
      bodyParser = require('body-parser'),
      moment = require('moment'),
      admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function buildUserObject (payload, maximum_number_of_resumes, total_space_in_bytes) {
    let user = {
        // id: payload.user.uid,
        firstname: payload.firstname ? payload.firstname : '',
        lastname: payload.lastname ? payload.lastname : '',
        email: payload.user ? payload.user.email : '',
        private: {
            maximum_number_of_resumes,
            total_space_in_bytes
        },
        notifications: [],
        _created_at: moment().unix(),
        _updated_at: moment().unix()
    };
    return user;
}

function buildUserObjectOauth (payload, maximum_number_of_resumes, total_space_in_bytes) {
    const spaceIndex = payload.displayName ? payload.displayName.indexOf(' ') : 0;
    console.log('spaceIndex: ', spaceIndex);
    const firstname = payload.displayName ? payload.displayName.substr(0, spaceIndex) : '';
    console.log('firstname: ', firstname);
    const lastname = payload.displayName ? payload.displayName.substr(spaceIndex + 1) : '';
    console.log('lastname: ', lastname);

    let user = {
        // id: payload.uid,
        firstname,
        lastname,
        email: payload.user.email ? payload.user.email : '',
        picture: payload.user.photoURL ? payload.user.photoURL : '',
        private: {
            maximum_number_of_resumes,
            total_space_in_bytes
        },
        notifications: [],
        _created_at: moment().unix(),
        _updated_at: moment().unix()
    };
    return user;
}

module.exports = app.use(async function (req, res, next) {
    try {
        console.log('REGISTER NEW USER');
        console.log('req.body.data: ', req.body.data);

        const app_parameters = await admin.firestore().collection('app_parameters').doc('users').get();
        let maximum_number_of_resumes = 1;
        let total_space_in_bytes = 5242880;
        if (app_parameters.exists) {
            maximum_number_of_resumes = app_parameters.data().initial_resumes_number
            total_space_in_bytes = app_parameters.data().initial_space_in_bytes
        }

        let newUser = {};
        const userId = req.body.data.user.uid;
        if (req.body.type === 'oauth') {
            newUser = buildUserObjectOauth(req.body.data, maximum_number_of_resumes, total_space_in_bytes);
            console.log('newUser: ', newUser);
        } else {
            newUser = buildUserObject(req.body.data, maximum_number_of_resumes, total_space_in_bytes);
            console.log('newUser: ', newUser);
        }

        console.log('userId: ', userId);
        console.log('newUser2: ', newUser);
        
        await admin.firestore().collection('users').doc(userId).set(newUser);
        newUser['id'] = userId;
        

        // const newUser = buildCandidateObject(req.body.data);
        // console.log('newUser: ', newUser);

        // const store = admin.firestore();
        // if (newUser.id) {
        //     store.collection('users').doc(newUser.id).set(newUser);
        // } else {
        //     store.collection('users').add(newUser);
        // }

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

        // res.send(newUser);
        res.send({
            message: 'POST request to register new user went successfully.',
            newUser
        });
    } 
    catch (error) {
        res.status(500).send(`Server error, candidate could not be registered ${error}`);
    }
});