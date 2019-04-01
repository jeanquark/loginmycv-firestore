const express = require('express'),
      admin = require('firebase-admin'),
      validate = require('validate.js'),
      multer = require('multer');

const app = express();
app.use(multer().any());

module.exports = app.use(async function (req, res, next) {
	try {
        // 1) Check total file upload size
        const totalSize = req.files.reduce((accumulator, file) => {
            return accumulator += file.size
        }, 0);
        console.log('totalSize: ', totalSize);
        if (totalSize > 10 * 1024 * 1024) {
            console.log('Total uploaded files size is bigger than 10MB');
        } else {
            console.log('Total uploaded files size is smaller than 10MB');
        }
        
        // 2) Parse resume data
        const newResume = JSON.parse(req.body.data);
        console.log('newResume: ', newResume);
        

        // 2) Check if slug is already used by another resume
        const snapshot = await admin.firestore().collection('resumes_long').where('slug', '==', newResume.slug).get();
        // const snapshot = await admin.firestore().collection('resumes_long').where('slug', '==', 'jeanquark').get();
        const resumesArray = []
		snapshot.forEach(doc => {
			resumesArray.push(doc.data())
        })
        console.log('resumesArray: ', resumesArray);
        console.log('resumesArray.length: ', resumesArray.length);
        if (resumesArray.length > 0) {
            throw 'Slug already exists!';
        }

        // 3) Perform validation on new resume
        const constraints = {
            'personal_data.email': {presence: true, email: true},
            'personal_data.firstname': {presence: true, length: {maximum: 5}},
        };

        const validation = validate(newResume, constraints);
        console.log('validation: ', validation);
        if (validation != undefined) {
            console.log('Form is not valid. Here are the messages: ', validation);
            throw validation;
        } else {
            console.log('Form is valid, save in DB');
        }

        // function ValidationErrors(errors, options, attributes, constraints) {
        //     Error.captureStackTrace(this, this.constructor);
        //     this.errors = errors;
        //     this.options = options;
        //     this.attributes = attributes;
        //     this.constraints = constraints;
        // }
        // ValidationErrors.prototype = new Error();
        // validate.async(newResume, constraints, {wrapErrors: ValidationErrors})
        //     .then(function (success) {
        //         console.log('success: ', success);
        //     })
        //     .catch(ValidationErrors, function(error) {
        //         // Handle the validation errors
        //         console.log("ValidationErrors", error);
        //     })

        // 4) Save resume in resume_long collection
        // const snapshot = await admin.firestore().collection('resumes_long').add(newResume);
        // console.log('snapshot.id: ', snapshot.id);


        // 5) Save resume in resume_short collection

        // 6) Send back new resume id
        // res.send(snapshot.id);        

        res.send('POST request to create new resume went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to create new resume failed.');
  	}
});