const express = require('express'),
      bodyParser = require('body-parser'),
      admin = require('firebase-admin');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res) {
    try {
        console.log('UPDATE USER STATUS');
        const userId = req.body.userId;
        const status = req.body.status;

        console.log('userId: ', userId);
        console.log('status: ', status);
        // const userEmail = req.body.userEmail;
        const userRef = admin.firestore().collection('users').doc(userId);
        console.log('userRef: ', userRef);
        await userRef.update({
            status
        });
        
        res.end('User status was successfully updated from the server.');
    }
    catch(error) {
        res.status(500).send(`Server error, user status could not be updated: ${error}`);
    }
});