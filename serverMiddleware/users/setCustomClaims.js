const express = require('express'),
      bodyParser = require('body-parser'),
      admin = require('firebase-admin');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res, next) {
    try {
        // console.log('SETCUSTOMCLAIMS');
        const action = req.body.action;
        const userEmail = req.body.userEmail;

        if (action == 'userToAdmin') {
            const user = await admin.auth().getUserByEmail(userEmail)

            // No async/await promises available with setCustomUserClaims method
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            }).then(() => {
                // Update database
                admin.firestore().collection('users').doc(user.uid).update(
                    {
                        'status': {
                            slug: 'admin',
                            name: 'Administrator'
                        }
                    }
                )
            }).then(() => {
                res.send(user);
            }).catch((error) => {
                console.log('error: ', error)
                // throw (new Error(error));
                // Why can't we just propagate this error to the parent block?
                res.status(500).send(`Server error, user could not get new claims: ${error}`);
            })
        }

        if (action == 'adminToUser') {
            const user = await admin.auth().getUserByEmail(userEmail);

            // No async/await promises available with setCustomUserClaims method
            return admin.auth().setCustomUserClaims(
                user.uid, 
                null
            ).then(() => {
                // Update database
                admin.firestore().collection('users').doc(user.uid).update(
                    {
                        'status': null
                    }
                )
            }).then(() => {
                res.send(user);
            }).catch((error) => {
                console.log('error: ', error);
                // throw (new Error(error));
                // Why can't we just propagate this error to the parent block?
                res.status(500).send(`Server error, user could not get new claims: ${error}`);
            });
        }
    } catch (error) {
        console.log('error: ', error)
        res.status(500).send(`Server error, user could not get new claims: ${error}`);
    }
});