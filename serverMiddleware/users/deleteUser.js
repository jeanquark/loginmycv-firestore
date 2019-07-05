const express = require('express'),
      bodyParser = require('body-parser'),
      moment = require('moment'),
      admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res) {
    try {
		const userToDelete = req.body.userId;
		const visitorsToDelete = req.body.visitorsToDelete;

		// 1) Delete all visitors accounts
		for (let visitor of visitorsToDelete) {
			await admin.auth().deleteUser(visitor)
		}
		// 2) Delete user account
		await admin.auth().deleteUser(userToDelete)
        
        res.send({
            message: 'POST request to delete user account went successfully.'
        });
    } 
    catch (error) {
        res.status(500).send(`Server error, user could not be deleted ${error}`);
    }
});