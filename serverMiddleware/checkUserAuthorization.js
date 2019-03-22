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


		// let resumeData = {};
		// if (username === 'jeanquark') {
		// 	resumeData = {
		// 		"job_description" : "Develops and deploy websites & web apps.",
		// 		"job_title":"Web developer",
		// 		"image" : "jeanmarc.jpg",
		// 		"location" : "Switzerland",
		// 		"keys" : ["web", "programmation", "HTML", "CSS", "PHP", "JavaScript"],
		// 		"lastname" : "Kle",
		// 		"firstname" : "Jean-Marc",
		// 		"username" : "jeanquark",
		// 		"email" : "jm.kle@gmail.com",
		// 		"education" : [
		// 			{
		// 				"location" : "Bern",
		// 				"title" : "Master of Science in Economics",
		// 				"school" : "University of Bern"
		// 			},
		// 			{
		// 				"location" : "Geneva",
		// 				"title" : "Bachelor of Science in Economics",
		// 				"school" : "University of Geneva"
		// 			}
		// 		],
		// 		"template" : 1
		// 	};

		// } else if (username === 'ivan') {
		// 	resumeData = {
		// 		"job_description" : "Transform your data into revenues.",
		// 		"job_title":"Data analyst",
		// 		"image" : "ivan.jpg",
		// 		"location" : "Switzerland",
		// 		"keys" : ["data", "econometrics", "data analysis", "market research"],
		// 		"lastname" : "Wo",
		// 		"firstname" : "Ivan",
		// 		"username" : "ivan",
		// 		"email" : "iw@example.com",
		// 		"education" : [
		// 			{
		// 				"location" : "Bern",
		// 				"title" : "Master of Science in Economics",
		// 				"school" : "University of Bern"
		// 			},
		// 			{
		// 				"location" : "Bern",
		// 				"title" : "Bachelor of Science in Economics",
		// 				"school" : "University of Bern"
		// 			}
		// 		],
		// 		"template" : 2
		// 	};
		// }

		// 1) Check authenticated user authorization to read user resume
		let authorization = {};
		const snapshot1 = await admin.firestore().collection('authorizations').where('user.id', '==', authUserId).where('resume.slug', '==', slug).get();
		snapshot1.forEach(doc => {
			console.log('doc1.data(): ', doc.data());
			authorization = doc.data();
		});
		console.log('authorization: ', authorization);
		let status = ''

		switch(authorization.status) {
			case 'accorded': {
				status = 'accorded';
				console.log('Accorded');
				break;
			}
			case 'in_process': {
				status = 'in_process';
				console.log('In process');
				break;
			}
			case 'refused': {
				status = 'refused';
				console.log('Refused');
				break;
			}
			case 'revoked': {
				status = 'revoked';
				console.log('Revoked');
				break;
			}
			default: {
				status = 'not_found';
				console.log('Default case');
			}
		}

		if (status === 'accorded') {
			// 2) If authorized, fetch resume
			const snapshot2 = await admin.firestore().collection('resumes_long').where('slug', '==', slug).get();
			// const snapshot = await admin.firestore().collection('resumes_long').get();
			let resumeData = {};
			snapshot2.forEach(doc => {
				console.log('doc2.data(): ', doc.data());
				resumeData = doc.data();
			});

			res.send(resumeData);
		} else if (status === 'in_process' || status === 'refused' || status === 'revoked') {
			// res.send(`You can not access resume data. Your authorization status is ${status}`);
			// res.redirect('/');
			res.send(`${status}`);

		} else {
			res.send(`Not allowed`);
		}

		// const resumeData = await admin.firestore().collection('resumes_long').where('slug', '==', slug).limit(1);
		// console.log('resumeData.exists: ', resumeData.exists);

  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to get resume failed.');
  	}
});