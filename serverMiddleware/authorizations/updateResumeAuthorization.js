const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin')
	  moment = require('moment');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res) {
	try {
		const authorization = req.body;
		const userId = authorization.user.id;
		const resumeUserId = authorization.resume.user_id;

		// console.log('authorization: ', authorization);
		// console.log('userId: ', userId);
		// console.log('resumeUserId: ', resumeUserId);

		const snapshot = await admin.firestore().collection('authorizations').doc(authorization.id).get();
		const oldStatus = snapshot.data().status;
		// console.log('oldStatus: ', oldStatus);

		await admin.firestore().collection('authorizations').doc(authorization.id).update({
			...authorization, _updated_at: moment().unix()
		});

		if (oldStatus.slug != authorization.status.slug) { // Add user notifications only if status changed
			await admin.firestore().collection('users').doc(userId).update({
				notifications: admin.firestore.FieldValue.arrayUnion({
					authorization_id: authorization.id,
					type: 'authorization',
					value: 'new_authorization_status'
				})
			});

			await admin.firestore().collection('users').doc(resumeUserId).update({
				notifications: admin.firestore.FieldValue.arrayUnion({
					authorization_id: authorization.id,
					type: 'authorization',
					value: 'new_authorization_status'
				})
			});
		}

		res.send('POST request to update authorization went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
		res.status(500).send(`Server error, authorization could not be updated. ${error}`);
  	}
});