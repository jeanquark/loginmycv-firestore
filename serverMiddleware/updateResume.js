const express = require('express'),
      admin = require('firebase-admin'),
      validate = require('validate.js'),
	  multer = require('multer'),
	  jsonDiff = require('json-diff'),
      moment = require('moment');

const app = express();
app.use(multer().any());

module.exports = app.use(async function (req, res, next) {
	try {
        // 1) Parse resume data
        let resume = JSON.parse(req.body.data);
        resume._created_at = moment().unix();
        resume._updated_at = moment().unix();
        console.log('resume: ', resume);
		console.log('app-key: ', req.get('app-key'))

		// 2) Check total file upload size
		console.log('req.files: ', req.files);
        const totalSize = req.files.reduce((accumulator, file) => {
            return accumulator += file.size
        }, 0);
		console.log('totalSize: ', totalSize);
		
		// Compare old uploads state with new uploads state to catch any difference
		const oldResumeUploads = await admin.firestore().collection('resumes_long').doc(resume.id).get();
		console.log('oldResumeUploads.data().uploads: ', oldResumeUploads.data().uploads);

		const newResumeUploads = resume.uploads;
		console.log('newResumeUploads: ', newResumeUploads);


		// console.log('Are both uploads objects similar? ', JSON.stringify(oldResumeUploads.data().uploads) === JSON.stringify(newResumeUploads));
		console.log('jsonDiff: ', jsonDiff.diff(oldResumeUploads.data().uploads, newResumeUploads));
		console.log('json.Diff.diffString: ', jsonDiff.diffString(oldResumeUploads.data().uploads, newResumeUploads));

		// Retrieve user total space
        // const userPrivateData = await admin.firestore().collection('users').doc(resume.user_id).collection('private').doc(resume.user_id).get();
        // const userTotalSpace = userPrivateData.data().total_space_in_bytes;
        // const userUsedSpace = userPrivateData.data().used_space_in_bytes;
        // console.log('userTotalSpace: ', userTotalSpace);
        // console.log('userUsedSpace: ', userUsedSpace);

        // if (totalSize + userUsedSpace > userTotalSpace) {
        //     console.log('Total uploaded files size is bigger than 10MB');
        //     throw {
        //         message: 'Total uploaded files size is bigger than 10MB'
        //     }
        // } else {
        //     console.log('Total uploaded files size is smaller than 10MB');
		// }
		
		// 3) Get old resume slug to check if there is a new slug and if it is already used by another resume
		const oldResume = await admin.firestore().collection('resumes_long').doc(resume.id).get();
		// console.log('oldResume.data(): ', oldResume.data());
		const oldSlug = oldResume.data().slug;
		// console.log('oldSlug: ', oldSlug);

		if (resume.updateResumeSlug) {
			console.log('You changed the resume slug!');
			const snapshot = await admin.firestore().collection('resumes_long').where('slug', '==', resume.new_slug).get();
			const resumesArray = [];
			snapshot.forEach(doc => {
				resumesArray.push(doc.data());
			})
			console.log('resumesArray: ', resumesArray);
			console.log('resumesArray.length: ', resumesArray.length);
			if (resumesArray.length > 0) {
				throw {
					'slug': 'Slug already exists. Please provide another identifier for the resume.'
				}
			}
			// Update visitor profile data
		} else {
			console.log('It is the same resume slug');
		}
        


        // 8) Send back new resume id & new resume slug
        // res.send(snapshot.id);        
        res.send({
            message: 'POST request to update resume went successfully.',
            // resume_long_id: resume_long.id,
            // resume_long_slug: newResume.slug
        });
        // res.send('POST request to create new resume went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
        res.send({
            message: 'Update resume failed.',
            error: error
        });
  		// res.end(`POST request to create new resume failed: ${error}`);
  	}
});