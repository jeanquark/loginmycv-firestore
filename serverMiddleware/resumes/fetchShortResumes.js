const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin');

const app = express();

module.exports = app.use(async function (req, res, next) {
	try {
		console.log('Entering fetch short resumes serverMiddleware');

		const shortResumes = await admin.firestore().collection('resumes_short').get();

		console.log('Fetching short resumes done!');
		
		res.send(shortResumes);
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('GET request to resume failed.');
  	}
});