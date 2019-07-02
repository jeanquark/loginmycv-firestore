const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res, next) {
	try {
		const authUserId = req.body.authUserId;
		const slug = req.body.slug

		// 1) Check authenticated user authorization to read user resume
		let authorization = {};
		const authorizations = await admin.firestore().collection('authorizations').where('user.id', '==', authUserId).where('resume.id', '==', slug).get();
		authorizations.forEach(doc => {
			authorization = doc.data();
		});
		
		// 2) Define status variable
		let status = ''
		if (authorization.status) {
			switch (authorization.status.slug) {
				case 'allowed': {
					status = 'accorded';
					break;
				}
				case 'accorded': {
					status = 'accorded';
					break;
				}
				case 'in_process': {
					status = 'in_process';
					break;
				}
				case 'refused': {
					status = 'refused';
					break;
				}
				case 'revoked': {
					status = 'revoked';
					break;
				}
				default: {
					status = 'not_found';
				}
			}
		}

		// 3) Fetch resume is authorization is accorded
		if (status === 'accorded') {
			console.log('Status is accorded!')
			const snapshot = await admin.firestore().collection('resumes_long').doc(slug).get();
			const resume = {
				...snapshot.data(),
				id: snapshot.id
			}
			res.send({
				status: 'allowed',
				resume
			});
		} else {
			res.send({ status });
		}
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to check user authorization failed.');
  	}
});