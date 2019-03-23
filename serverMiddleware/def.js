const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res, next) {
	try {
		// console.log('req.body.data: ', req.body.data);
		const authUserId = req.body.auth_user_id;
		const authorization = req.body.authorization;
		const action = req.body.action;
		let authorizations = authorization.authorizations;
		const resumeId = authorization.resume.id;
		console.log('authUserId: ', authUserId);
		console.log('authorization: ', authorization);
		console.log('authorizations: ', authorizations);
		console.log('authorization.id: ', authorization.id);
		console.log('action: ', action);
		console.log('resumeId: ', resumeId);

		// Check if the authenticated user who is sending the request actually has a resume with the provided id
		// const resumeRef = admin.firestore().collection('resumes_long');
		// const query = await resumeRef.where('user_id', '==', resumeId);
		// console.log('query: ', query);
		// console.log('query.data(): ', query.data());
		const snapshot = await admin.firestore().collection('resumes_long').where('user_id', '==', authUserId).get();
		const authUserResumes = [];
		snapshot.forEach(doc => {
			authUserResumes.push(doc.data().user_id);
			// console.log(doc);
		});
		console.log('authUserResumes: ', authUserResumes);

		if (authUserResumes.length > 0) {
			console.log('OK, update resume.');
			if (action === 'grant_access' || 'update_authorizations') {
				await admin.firestore().collection('authorizations').doc(authorization.id).update({
					authorizations,
					status: 'access_granted',
					_updated_at: admin.firestore.FieldValue.serverTimestamp()
				});
			}
			if (action === 'revoke_access') {
				// authorizations['personale_data'] = false;
				// authorizations['picture'] = false;
				// authorizations['education'] = false;
				// authorizations['work_experience'] = false;
				// authorizations['skills'] = false;

				for (let authorization in authorizations) {
					console.log(authorizations[authorization]);
					authorizations[authorization] = false;
				}
				console.log('authorizations2: ', authorizations);

				await admin.firestore().collection('authorizations').doc(authorization.id).update({
					authorizations,
					status: 'access_revoked',
					_updated_at: admin.firestore.FieldValue.serverTimestamp()
				});
			}
			if (action === 'remove_authorization') {
				await admin.firestore().collection('authorizations').doc(authorization.id).delete();
			}
		}

		// const abc = await admin.firestore().collection('authorizations').doc(authorization.id).get();

		// console.log('abc: ', abc);
		// console.log('abc.data(): ', abc.data());

		
		res.send('POST request to update authorization went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to update authorization failed.');
  	}
});