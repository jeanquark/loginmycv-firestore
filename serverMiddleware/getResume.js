const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin'),
	  admin2 = require('../services/firebase-admin-init');

// global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// module.exports = app.get('/resume/:id', (req, res, next) => {
//   	res.send('API root');
// });

// module.exports = app.use('/resume', function (req, res, next) {
module.exports = app.use(async function (req, res, next) {
	try {
		console.log('req.url: ', req.url);
		console.log('Entering serverMiddleware...');


  		
		// Get authenticated user token
		// if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
  //       	console.log('Found "Authorization" header');
  //       	// Read the ID Token from the Authorization header.
  //       	return Promise.resolve(req.headers.authorization.split("Bearer ")[1]);
  //   	} else {
  //   		console.log('No authorization header found.');
  //   	}
		// const abc = await req.headers.authorization.split("Bearer ")[1]
		// console.log('abc: ', abc)

  		// Get auth user id
        // const decodedToken = await admin.auth().verifyIdToken(req.body.data.idToken);
        // console.log('decodedToken: ', decodedToken);
        // const uid = decodedToken.uid;
        // console.log('uid: ', uid);


  		// res.end('Ending request');
  		const userId = '8FACFLO7TJMY9P9HZZwSOMvC3423';

  		// const snapshot = await admin.firestore().collection('authorizations').where('user_id', '==', userId).get();
  		// // const snapshot = await admin.firestore().collection('authorizations').get();
  		// // const snapshot = await admin.firestore();
  		// let authorization = {};
  		// snapshot.forEach(doc => {
  		// 	authorization = doc.data();
  		// });
  		// // res.locals.resume = resumeData;
  		// console.log('authorization: ', authorization);


  		// res.redirect('/resume/jeanquark');
  		const resumeData = {
			"job_description" : "Develops and deploy websites & web apps.",
			"job_title":"Web developer",
			"image" : "jeanmarc.jpg",
			"location" : "Switzerland",
			"keys" : ["web", "programmation", "HTML", "CSS", "PHP", "JavaScript"],
			"lastname" : "Kle",
			"firstname" : "Jean-Marc",
			"username" : "jeanquark",
			"email" : "jm.kle@gmail.com",
			"education" : [
				{
					"location" : "Bern",
					"title" : "Master of Science in Economics",
					"school" : "University of Bern"
				},
				{
					"location" : "Geneva",
					"title" : "Bachelor of Science in Economics",
					"school" : "University of Geneva"
				}
			],
			"template" : 1
		};
		// res.locals.resume = resumeData;
		// req.resume = resumeData;
		res.resume = resumeData;

  		console.log('Done with serverMiddleware!');

  		next();
		// res.send(resumeData);
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('GET request to resume failed.');
  	}
});

// module.exports = app.use(async function (req, res, next) {
// 	try {
// 		console.log('Call resume');
// 		console.log('req.url: ', req.url);
// 		console.log('req.body: ', req.body);

// 		const resumeData = {
// 			"job_description" : "Develops and deploy websites & web apps.",
// 			"job_title":"Web developer",
// 			"image" : "jeanmarc.jpg",
// 			"location" : "Switzerland",
// 			"keys" : ["web", "programmation", "HTML", "CSS", "PHP", "JavaScript"],
// 			"lastname" : "Kle",
// 			"firstname" : "Jean-Marc",
// 			"username" : "jeanquark",
// 			"email" : "jm.kle@gmail.com",
// 			"education" : [
// 				{
// 					"location" : "Bern",
// 					"title" : "Master of Science in Economics",
// 					"school" : "University of Bern"
// 				},
// 				{
// 					"location" : "Geneva",
// 					"title" : "Bachelor of Science in Economics",
// 					"school" : "University of Genev"
// 				}
// 			]
// 		};
// 		console.log('Resume found: ', resumeData);

// 		res.set('resume', resumeData);
// 		// res.send('GET request to resume went successfully.');
// 		// res.send(resumeData);
// 		next();
// 		// next(resumeData);
// 		// res.render('/resume/jeanquark', {});
// 		// req.userResume = resumeData;
// 		// res.redirect('/resume/1/jeanquark');
// 	}
// 	catch (error) {
// 		console.log('Error');
// 		res.end('GET request to resume failed.');
// 	}
// });