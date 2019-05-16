const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res) {
	try {
		console.log('req.body: ', req.body);
        const authorization = req.body;
        console.log('authorization: ', authorization);
		
		// await admin.firestore().collection('authorizations').doc(authorization.id).delete();
	
		res.send('POST request to delete authorization went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
		res.status(500).send('Server error, authorization could not be deleted. ' + error);
  	}
});