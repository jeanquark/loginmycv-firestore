const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin')
	  moment = require('moment');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res, next) {
	try {
		// console.log('req.body.data: ', req.body.data);
		let authorization = req.body.authorization;
		authorization.status = 'in_process';
		authorization.authorizations = {
			personal_data: false,
			picture: false,
			education: false,
			work_experience: false,
			skills: false
		};
		authorization._created_at = moment().unix();
		authorization._updated_at = moment().unix();

		console.log('authorization: ', authorization);
		
		await admin.firestore().collection('authorizations').add(authorization)

		
		res.send('POST request to create authorization went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to create authorization failed.');
  	}
});