const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin'),
	  moment = require('moment');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res, next) {
	try {
		// console.log('req.body.data: ', req.body.data);
		let authorization = req.body.authorization;
		authorization.status = {
			name: 'In process',
			slug: 'in_process'
		};
		authorization.authorizations = {
			personal_data: false,
			picture: false,
			education: false,
			work_experience: false,
			skills: false,
			files: false
		};
		authorization._created_at = moment().unix();
		authorization._updated_at = moment().unix();

		// console.log('authorization: ', authorization);
		
		const newAuthorization = await admin.firestore().collection('authorizations').add(authorization);
		// console.log('newAuthorization.id: ', newAuthorization.id);

		const userId = authorization.user.id;
		// console.log('userId: ', userId);

		const resumeUserId = authorization.resume.user_id;
		// console.log('resumeUserId: ', resumeUserId);

		await admin.firestore().collection('users').doc(userId).update({
			notifications: admin.firestore.FieldValue.arrayUnion({
				authorization_id: newAuthorization.id,
				type: 'authorization',
				value: 'new_authorization_sent'
			})
		});

		await admin.firestore().collection('users').doc(resumeUserId).update({
			notifications: admin.firestore.FieldValue.arrayUnion({
				authorization_id: newAuthorization.id,
				type: 'authorization',
				value: 'new_authorization_received'
			})
		});


		
		res.send('POST request to create authorization went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
		//   res.end('POST request to create authorization failed.');
		res.status(500).send('Server error, authorization could not be created. ' + error);
  	}
});