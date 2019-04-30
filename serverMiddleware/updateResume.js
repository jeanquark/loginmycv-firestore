const express = require('express'),
	  admin = require('firebase-admin'),
	  bodyParser = require('body-parser'),
      validate = require('validate.js'),
      moment = require('moment');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res, next) {
	try {
        // 1) Parse resume data
        let updatedResume = req.body;
        updatedResume._updated_at = moment().unix();
        // console.log('updatedResume: ', updatedResume);
		console.log('app-key: ', req.get('app-key'));
		if (req.get('app-key') !== 'Economics2009!') {
			throw {
				'wrong-app-key': 'You are not sending this request from an authorized server.'
			}
		}

		// 2) Check total file upload size
		// console.log('req.files: ', req.files);
        // const totalSize = req.files.reduce((accumulator, file) => {
        //     return accumulator += file.size
        // }, 0);
		// console.log('totalSize: ', totalSize);
		


		// console.log('Are both uploads objects similar? ', JSON.stringify(oldResumeUploads.data().uploads) === JSON.stringify(newResumeUploads));
		// console.log('jsonDiff: ', jsonDiff.diff(oldResumeUploads.data().uploads, newResumeUploads));
		// console.log('json.Diff.diffString: ', jsonDiff.diffString(oldResumeUploads.data().uploads, newResumeUploads));

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
		// const oldResume = await admin.firestore().collection('resumes_long').doc(updatedResume.id).get();
		// console.log('oldResume.data(): ', oldResume.data());
		// const oldSlug = oldResume.data().slug;
		// console.log('oldSlug: ', oldSlug);

		if (updatedResume.updateResumeSlug) {
			console.log('You changed the resume slug!');
			const snapshot = await admin.firestore().collection('resumes_long').where('slug', '==', updatedResume.new_slug).get();
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
			console.log('It is the same resume slug.');
		}

		// Check to see if resume password needs to be updated
		if (updatedResume.password) {
			console.log('You changed the resume password!');
		} else {
			console.log('It is the same resume password.');
		}
		
		// Update both long and short resumes at the same time (do a batch)
		const batch = admin.firestore().batch();

		// Update long resume
		const updatedLongResume = admin.firestore().collection('resumes_long').doc(updatedResume.id);
		batch.update(updatedLongResume, updatedResume);

		// Update short resume
		var updatedShortResume = admin.firestore().collection('resumes_short').doc(updatedResume.resume_short_id);
		batch.update(updatedShortResume, {
			slug: updatedResume.slug,
			job_title: updatedResume.job_title,
			job_description: updatedResume.job_description,
			// gender: updatedResume.gender,
			country: updatedResume.personal_data.country,
			city: updatedResume.personal_data.city,
			// picture: updatedResume.personal_data.picture,
			keys: updatedResume.skills,
			// languages: updatedResume.languages,
			privacy: updatedResume.privacy,
			user_id: updatedResume.user_id
		});

		// Commit the batch
		// try {
			await batch.commit();
		// } catch {
			// throw {
				// 'resume_update_error': 'An error occured while attempting to update your resume.'
			// }
		// }

		// await admin.firestore().collection('resumes_long').doc(updatedResume.id).update(updatedResume);

        // 8) Send back new resume id & new resume slug
        // res.send(snapshot.id);        
        res.send({
			message: 'POST request to update resume went successfully.',
			newFiles: req.files
            // resume_long_id: resume_long.id,
            // resume_long_slug: newResume.slug
        });
        // res.send('POST request to create new resume went successfully.');
  	} catch (error) {
		console.log('error from server: ', error);
		// throw {
		// 	'resume_update_error': 'An error occured while attempting to update your resu.'
		// }
        // res.send({
        //     message: 'Update resume failed.',
        //     error: error
        // });
		//   res.end(`POST request to update a resume failed: ${error}`);
		// res.send(500, { error: 'POST request to update resume failed.' });
		res.status(500).send(`POST request to update resume failed: ${error}`);
		// res.status(500).send((results[0].id).toString());
  	}
});