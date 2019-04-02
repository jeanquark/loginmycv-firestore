const express = require('express'),
      admin = require('firebase-admin'),
      validate = require('validate.js'),
      multer = require('multer'),
      moment = require('moment');

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
            throw 'Total uploaded files size is bigger than 10MB';
        } else {
            console.log('Total uploaded files size is smaller than 10MB');
        }
        
        // 2) Parse resume data
        let newResume = JSON.parse(req.body.data);
        newResume._created_at = moment().unix();
        newResume._updated_at = moment().unix();
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
        const pattern = /^[a-z0-9-]+$/;
        const constraints = {
            'slug': {
                presence: true, 
                format: {
                    pattern: "[a-z0-9-]+", 
                    flags: "i", 
                    message: "Slug can only contain a-z, 0-9 and -"
                }
            },
            // 'job_title': {presence: true, length: {maximum: 5}},
            // 'job_description': {presence: true, length: {maximum: 5}},
            // 'personal_data.email': {presence: true, email: true},
            // 'personal_data.firstname': {presence: true, length: {maximum: 5}},
            // 'personal_data.lastname': {presence: true, length: {maximum: 5}},
        };

        const validation = validate(newResume, constraints);
        console.log('validation: ', validation);
        if (validation != undefined) {
            console.log('Form is not valid. Here are the messages: ', validation);
            throw validation;
        }
        console.log('Form is valid, save in DB');

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

        // 4) Save resume in resumes_long collection
        
        const resume_long = await admin.firestore().collection('resumes_long').add(newResume);
        console.log('resume_long.id: ', resume_long.id);
        // console.log('user_id: ', admin.auth().currentUser);

        // 5) Save resume in resumes_short collection
        const resume_short = await admin.firestore().collection('resumes_short').add({
            resume_long_id: resume_long.id,
            user_id: newResume.user_id,
            slug: newResume.slug,
            firstname: newResume.personal_data.firstname,
            lastname: newResume.personal_data.lastname,
            job_title: newResume.job_title,
            job_description: newResume.job_description,
            picture: '',
            key_competences: newResume.key_competences ? newResume.key_competences : [],
            languages: newResume.languages ? newResume.languages : []
        })

        // 6) Save user for password access
        console.log('Allow direct access? ', newResume.allow_direct_access);
        if (newResume.allow_direct_access) {
            const authVisitor = await admin.auth().createUser({
                email: `${newResume.slug}@visitor.loginmycv.com`,
                // emailVerified: false,
                password: newResume.password
            })
            console.log('authVisitor: ', authVisitor);
            const authVisitorId = authVisitor.uid;
            const newUser = await admin.firestore().collection('users').doc(authVisitorId).set({
                id: authVisitorId,
                email: authVisitor.email,
                type: 'visitor'
            })
            // Also give authenrization for this newly created user
            const authorization = {
                status: 'in_process',
                type: 'visitor',
                authorizations: {
                    personal_data: false,
                    picture: false,
                    education: false,
                    work_experience: false,
                    skills: false
                },
                user: {
                    id: authVisitorId,
                    email: authVisitor.email
                },
                resume: {
                    id: resume_long.id,
                    slug: newResume.slug
                },
                _created_at: moment().unix(),
                _updated_at: moment().unix()
            }
            await admin.firestore().collection('authorizations').add(authorization);
        }


        // 7) Send back new resume id & new resume slug
        // res.send(snapshot.id);        
        res.send({
            message: 'Post request to create new resume went successfully.',
            resume_long_id: resume_long.id,
            resume_long_slug: newResume.slug
        });
        // res.send('POST request to create new resume went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
  		res.end(`POST request to create new resume failed: ${error}`);
  	}
});