const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


module.exports = app.use(async function (req, res, next) {
	try {
		// console.log('req.body.data: ', req.body.data);
		const authUserId = req.body.authUserId;
		const slug = req.body.slug
		console.log('authUserId: ', authUserId);
		console.log('slug: ', slug);

		// 1) Check authenticated user authorization to read user resume
		let authorization = {};
		const authorizations = await admin.firestore().collection('authorizations').where('user.id', '==', authUserId).where('resume.id', '==', slug).get();
		authorizations.forEach(doc => {
			console.log('doc.data(): ', doc.data());
			authorization = doc.data();
		});
		console.log('authorization: ', authorization);
		let status = ''

		switch (authorization.status) {
			case 'allowed': {
				status = 'accorded';
				break;
			}
			case 'accorded': {
				status = 'accorded';
				// console.log('Accorded');
				break;
			}
			case 'in_process': {
				status = 'in_process';
				// console.log('In process');
				break;
			}
			case 'refused': {
				status = 'refused';
				// console.log('Refused');
				break;
			}
			case 'revoked': {
				status = 'revoked';
				// console.log('Revoked');
				break;
			}
			default: {
				status = 'not_found';
				// console.log('Default case');
			}
		}

		if (status === 'accorded') {
			const userResumes = await admin.firestore().collection('resumes_long').where('slug', '==', slug).get();
			let userResume = {};
			userResumes.forEach(doc => {
				console.log('doc3.data(): ', doc.data());
				userResume = doc.data();
			});
			res.send({
				status: 'allowed',
				resume: userResume
			});
		} else {
			res.send({ status });
		}
		console.log('next...');

		// if (status === 'accorded') {
		// 	// 2) If authorized, fetch resume
		// 	// const snapshot2 = await admin.firestore().collection('resumes_long').where('slug', '==', slug).get();
		// 	// let resumeData = {};
		// 	// snapshot2.forEach(doc => {
		// 	// 	console.log('doc2.data(): ', doc.data());
		// 	// 	resumeData = doc.data();
		// 	// });
		// 	// res.send(resumeData);

		// 	const userResume = await admin.firestore().collection('resumes_long').doc(slug).get();
		// 	console.log('userResume.data(): ', userResume.data());
		// 	if (userResume.data() && userResume.data().user_id === authUserId) {
		// 		res.send(userResume.data());
		// 	}
		// 	// if (userResume.data()) {
		// 	// 	res.send(userResume.data())
		// 	// }
		// } else if (status === 'in_process' || status === 'refused' || status === 'revoked') {
		// 	// res.send(`You can not access resume data. Your authorization status is ${status}`);
		// 	// res.redirect('/');
		// 	// res.send(`${status}`);
		// 	res.send({
		// 		slug,
		// 		status
		// 	});
		// } else {
		// 	// res.send(`Not allowed`);
		// 	res.send({
		// 		slug,
		// 		status: 'not_allowed'
		// 	});
		// }

		// const resumeData = await admin.firestore().collection('resumes_long').where('slug', '==', slug).limit(1);
		// console.log('resumeData.exists: ', resumeData.exists);

  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to check user authorization failed.');
  	}
});