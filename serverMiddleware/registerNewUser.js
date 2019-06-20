const express = require('express'),
      bodyParser = require('body-parser'),
      moment = require('moment'),
      admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function buildUserObject (payload, privateData) {
    let user = {
        // id: payload.user.uid,
        firstname: payload.firstname ? payload.firstname : '',
        lastname: payload.lastname ? payload.lastname : '',
        email: payload.user ? payload.user.email : '',
        private: privateData,
        notifications: [],
        _created_at: moment().unix(),
        _updated_at: moment().unix()
    };
    return user;
}

function buildUserObjectOauth (payload, privateData) {
    const spaceIndex = payload.user && payload.user.displayName ? payload.user.displayName.indexOf(' ') : 0;
    console.log('spaceIndex: ', spaceIndex);
    const firstname = payload.user && payload.user.displayName ? payload.user.displayName.substr(0, spaceIndex) : '';
    console.log('firstname: ', firstname);
    const lastname = payload.user && payload.user.displayName ? payload.user.displayName.substr(spaceIndex + 1) : '';
    console.log('lastname: ', lastname);

    let user = {
        // id: payload.uid,
        firstname,
        lastname,
        email: payload.user && payload.user.email ? payload.user.email : '',
        picture: payload.user && payload.user.photoURL ? payload.user.photoURL : '',
        private: privateData,
        notifications: [],
        _created_at: moment().unix(),
        _updated_at: moment().unix()
    };
    return user;
}

module.exports = app.use(async function (req, res) {
    try {
        console.log('REGISTER NEW USER');
        console.log('req.body.data: ', req.body.data);

        let privateData = {
            package_name: 'Basic',
            package_slug: 'basic',
            maximum_number_of_resumes: 1,
            total_space_in_bytes: 5242880, // 5MB
            available_templates: 1
        };
        const basicPackage = await admin.firestore().collection('packages').doc('basic').get();
        if (basicPackage.exists) {
            privateData.package_name = basicPackage.data().name
            privateData.package_slug = basicPackage.data().slug
            privateData.maximum_number_of_resumes = basicPackage.data().maximum_number_of_resumes
            privateData.total_space_in_bytes = basicPackage.data().total_space_in_bytes
            privateData.available_templates = basicPackage.data().available_templates
        }
        console.log('privateData: ', privateData);

        let newUser = {};
        const userId = req.body.data.user.uid;
        if (req.body.type === 'oauth') {
            newUser = buildUserObjectOauth(req.body.data, privateData);
            console.log('newUser: ', newUser);
        } else {
            newUser = buildUserObject(req.body.data, privateData);
            console.log('newUser: ', newUser);
        }

        console.log('userId: ', userId);
        console.log('newUser2: ', newUser);
        
        await admin.firestore().collection('users').doc(userId).set(newUser);
        newUser['id'] = userId;
        
        res.send({
            message: 'POST request to register new user went successfully.',
            newUser
        });
    } 
    catch (error) {
        res.status(500).send(`Server error, candidate could not be registered ${error}`);
    }
});