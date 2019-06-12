const express = require('express'),
	  admin = require('firebase-admin')
      http = require('http'),
      url = require('url'),
      bodyParser = require('body-parser');

// const app = connect();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app.use(function (req, res, next) {
    console.log('SETCUSTOMCLAIMS');
    // const query = url.parse(req.url,true).query;
    // console.log(query);
    console.log(req.body);
    // console.log(req.body.userEmail);
    const action = req.body.action;
    const userEmail = req.body.userEmail;
    // const uid = req.body.uid;
    // console.log(action);
    console.log('userEmail: ', userEmail);
    // console.log(uid);
    // res.send('user');

    if (action == 'userToAdmin') {
        console.log(action);
        // res.end('Hello from Connect!\n');
        admin.auth().getUserByEmail(userEmail).then((user) => {
        // admin.auth().getUser(uid).then((user) => {
            console.log(user);
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            }).then(() => {
                console.log('user: ', user);
                // res.send('user');
                console.log('USERTOADMIN');
                res.send(user);
                // res.end();
                // res.end();
            });
            // res.end();
            // next();
            // res.end('Hello from Connect!\n');
            // return user;
            // next();
            // res.end(user);
            // return user;
            // res.send({user: 'abc'});
            
        }).catch((error) => {
            console.log(error);
            // res.end({user2: 'user'})
            res.end();
        });
    }

    if (action == 'adminToUser') {
        console.log(action);
        return admin.auth().getUserByEmail(userEmail).then((user) => {
        // admin.auth().getUser(uid).then((user) => {
            console.log('user: ', user);
            return admin.auth().setCustomUserClaims(user.uid, null)
                .then(() => {
                    // res.send({'user': 'abc'});
                    console.log('ADMINTOUSER');
                    res.send(user);
                    // console.log(user);
                    // res.end();
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        });
    }
    
    // res.end('Hello from Connect!\n');
});