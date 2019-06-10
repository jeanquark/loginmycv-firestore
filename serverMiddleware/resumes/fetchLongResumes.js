const express = require('express'),
	  bodyParser = require('body-parser'),
	  admin = require('firebase-admin');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res) {
	try {
        console.log('req.body: ', req.body);
		let payload = req.body.data;
		console.log('Entering fetchLongResumes serverMiddleware: ', payload);

        const querySnapshot = await admin.firestore().collection('resumes_long').where('slug', '==', payload).get();
        const resumesArray = [];
        querySnapshot.forEach(doc => {
            console.log('doc.data(): ', doc.data())
            resumesArray.push(doc.data())
        })

		console.log('Fetching long resumes: ', resumesArray);
		
		res.send(resumesArray);
		// res.send({
        //     message: 'POST request to create resume went successfully.',
        //     newLongResumeId: newLongResume.id,
        //     newShortResumeId: newShortResume.id
        // });
  	} catch (error) {
  		console.log('error: ', error);
		// res.end('GET request to resume failed.');
		res.status(500).send({ message: 'Fetch resume failed.', error });
  	}
});