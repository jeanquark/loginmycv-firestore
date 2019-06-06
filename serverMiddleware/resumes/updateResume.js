const express = require('express'),
	  admin = require('firebase-admin'),
	  bodyParser = require('body-parser'),
      validate = require('validate.js'),
      moment = require('moment');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const app_key = process.env.APP_KEY;

module.exports = app.use(async function (req, res, next) {
	try {
		let updatedResume = req.body;
		console.log('updatedResume: ', updatedResume);
		updatedResume._updated_at = moment().unix();

        // 1) Check API KEY (so that we know request is sent from server)
		if (req.get('app-key') !== app_key) {
			throw {
				'server_error': 'You are not sending this request from an authorized server.'
			}
		}


		if (updatedResume.updateResumeSlug) { // Updating the resume slug
			console.log('You changed the resume slug!');

			// 2) Check slug existence
			const slugSnapshot = await admin.firestore().collection('resumes_long').doc(updatedResume.new_slug).get();
			const existingSlug = slugSnapshot.data();
			console.log('existingSlug: ', existingSlug);
			if (existingSlug) {
				throw {
					'new_slug': 'Slug already exists. Please provide another identifier for the resume.',
				}
			}


			// 3) Update visitor account
			const oldSlug = updatedResume.slug;
			const newSlug = updatedResume.new_slug;
			console.log('newSlug: ', newSlug);
			const password = updatedResume.password;
			const picture = updatedResume.uploads ? updatedResume.uploads.find(upload => upload.type === 'profile_picture') : null;
			updatedResume['picture'] = picture ? picture.downloadUrl : null;
			updatedResume['slug'] = newSlug;
			delete updatedResume['updateResumeSlug'];
			delete updatedResume['new_slug'];
			delete updatedResume['id'];
			delete updatedResume['password'];
			delete updatedResume['password_confirmation'];

			if (!password) {
				throw {
					'server_error': 'When modifying the resume slug, you need to provide a password.',
				}
			}

			try {
				console.log('Update visitor\'s password: ', password);
				const user = await admin.auth().getUserByEmail(`${newSlug}@visitor.loginmycv.com`);
				console.log('user.uid: ', user.uid);
				await admin.auth().deleteUser(user.uid);
			} catch (error) { // User does not exist
				console.log('user does not exist');
			}
			const newUser = await admin.auth().createUser({
				email: `${newSlug}@visitor.loginmycv.com`,
				emailVerified: false,
				password: password,
				displayName: `${newSlug}@visitor`,
				disabled: false
			});
			console.log('password: ', password);
			console.log('newUser: ', newUser);
			const visitor_id = newUser.uid;
			console.log('visitor_id: ', visitor_id);
			updatedResume['visitor_id'] = visitor_id;



			// 4) Retrieve all relevant authorizations
			const authorizations = [];
			const snapshot3 = await admin.firestore().collection('authorizations').where('resume.id', '==', updatedResume.slug).get();
			snapshot3.forEach(doc => {
				authorizations.push({ ...doc.data(), id: doc.id })
			});
			console.log('authorizations: ', authorizations);


			// 5) Update both resumes (short & long), as well as all concerned authorizations
			let batch = admin.firestore().batch();

			authorizations.forEach(authorization => {
				console.log('authorization: ', authorization)
				const authorizationRef = admin.firestore().collection('authorizations').doc(authorization.id)
				batch.update(authorizationRef, {
					['resume.id']: updatedResume.new_slug
				});
			});
		
			const newLongResume = admin.firestore().collection('resumes_long').doc(newSlug);
			batch.set(newLongResume, updatedResume);

			const updatedShortResume = admin.firestore().collection('resumes_short').doc(updatedResume.resume_short_id);
			batch.update(updatedShortResume, {
				resume_long_id: newSlug,
				job_title: updatedResume.job_title,
				job_description: updatedResume.job_description,
				personal_data: {
					firstname: updatedResume['personal_data']['firstname'],
					lastname: updatedResume['personal_data']['lastname'],
					email: updatedResume['personal_data']['email'],
					country: updatedResume['personal_data']['country'],
					city: updatedResume['personal_data']['city']
				},
				picture: picture ? picture.downloadUrl : null,
				key_competences: updatedResume.key_competences ? updatedResume.key_competences : null,
				languages: updatedResume.languages,
				visibility: updatedResume.visibility,
			});

			await batch.commit();
				
			res.send({
				message: 'POST request to update resume went successfully.',
			});





		} else { // Not updating the resume slug
			console.log('Not updating the resume slug');
			const password = updatedResume.password;
			const picture = updatedResume['uploads'] ? updatedResume.uploads.find(upload => upload.type === 'profile_picture') : null
			updatedResume['picture'] = picture ? picture.downloadUrl : null;
			delete updatedResume['updateResumeSlug'];
			delete updatedResume['new_slug'];
			delete updatedResume['id'];
			delete updatedResume['password'];
			delete updatedResume['password_confirmation'];

			if (password) { // Updating resume's password
				try {
					console.log('Update visitor\'s password: ', password);
					const user = await admin.auth().getUserByEmail(`${updatedResume.slug}@visitor.loginmycv.com`);
					console.log('user.uid: ', user.uid);
					// await admin.auth().deleteUser(user.uid);
				} catch (error) { // User does not exist
					console.log('user does not exist');
				}
				const newUser = await admin.auth().createUser({
					email: `${updatedResume.slug}@visitor.loginmycv.com`,
					emailVerified: false,
					password: password,
					displayName: `${updatedResume.slug}@visitor`,
					disabled: false
				});
				const visitor_id = newUser.uid;
				updatedResume['visitor_id'] = visitor_id;
			}


			// 2) Update both resumes (short & long)
			const batch = admin.firestore().batch();
			
			const newLongResume = admin.firestore().collection('resumes_long').doc(updatedResume.slug);
			batch.set(newLongResume, updatedResume);

			const updatedShortResume = admin.firestore().collection('resumes_short').doc(updatedResume.resume_short_id);
			batch.update(updatedShortResume, {
				job_title: updatedResume.job_title,
				job_description: updatedResume.job_description,
				personal_data: {
					firstname: updatedResume['personal_data']['firstname'],
					lastname: updatedResume['personal_data']['lastname'],
					email: updatedResume['personal_data']['email'],
					country: updatedResume['personal_data']['country'],
					city: updatedResume['personal_data']['city']
				},
				picture: picture ? picture.downloadUrl : null,
				key_competences: updatedResume.key_competences ? updatedResume.key_competences : null,
				languages: updatedResume.languages,
				visibility: updatedResume.visibility
			});
			await batch.commit();

			res.send({
				message: 'POST request to update resume went successfully.',
			});
		}
	} catch (error) {
		console.log('error from server: ', error)
		res.status(500).send({ message: 'Update resume failed.', error });
	}


	// try {
    //     // 1) Parse resume data
    //     let updatedResume = req.body;
    //     updatedResume._updated_at = moment().unix();
    //     // console.log('updatedResume: ', updatedResume);
	// 	console.log('app-key: ', req.get('app-key'));
	// 	console.log('app_key: ', app_key);
	// 	if (req.get('app-key') !== app_key) {
	// 		throw {
	// 			'wrong-app-key': 'You are not sending this request from an authorized server.'
	// 		}
	// 	}

	// 	// 2) Check total file upload size
	// 	// console.log('req.files: ', req.files);
    //     // const totalSize = req.files.reduce((accumulator, file) => {
    //     //     return accumulator += file.size
    //     // }, 0);
	// 	// console.log('totalSize: ', totalSize);
		


	// 	// console.log('Are both uploads objects similar? ', JSON.stringify(oldResumeUploads.data().uploads) === JSON.stringify(newResumeUploads));
	// 	// console.log('jsonDiff: ', jsonDiff.diff(oldResumeUploads.data().uploads, newResumeUploads));
	// 	// console.log('json.Diff.diffString: ', jsonDiff.diffString(oldResumeUploads.data().uploads, newResumeUploads));

	// 	// Retrieve user total space
    //     // const userPrivateData = await admin.firestore().collection('users').doc(resume.user_id).collection('private').doc(resume.user_id).get();
    //     // const userTotalSpace = userPrivateData.data().total_space_in_bytes;
    //     // const userUsedSpace = userPrivateData.data().used_space_in_bytes;
    //     // console.log('userTotalSpace: ', userTotalSpace);
    //     // console.log('userUsedSpace: ', userUsedSpace);

    //     // if (totalSize + userUsedSpace > userTotalSpace) {
    //     //     console.log('Total uploaded files size is bigger than 10MB');
    //     //     throw {
    //     //         message: 'Total uploaded files size is bigger than 10MB'
    //     //     }
    //     // } else {
    //     //     console.log('Total uploaded files size is smaller than 10MB');
	// 	// }
		
	// 	// 3) Get old resume slug to check if there is a new slug and if it is already used by another resume
	// 	// const oldResume = await admin.firestore().collection('resumes_long').doc(updatedResume.id).get();
	// 	// console.log('oldResume.data(): ', oldResume.data());
	// 	// const oldSlug = oldResume.data().slug;
	// 	// console.log('oldSlug: ', oldSlug);

		

	// 	// Check to see if resume password needs to be updated
	// 	if (updatedResume.password) {
	// 		console.log('You changed the resume password!');
	// 	} else {
	// 		console.log('It is the same resume password.');
	// 	}

	// 	// console.log('updatedResume.privacy: ', updatedResume.privacy);

	// 	// 4) Update auth profile for visitors
	// 	if (updatedResume.privacy === 'public') {
	// 		console.log('updatedResume.slug: ', updatedResume.slug);
	// 		try {
	// 			const user = await admin.auth().getUserByEmail(`${updatedResume.slug}@visitor.loginmycv.com`);
	// 			console.log('user.uid: ', user.uid);
	// 			await admin.auth().deleteUser(user.uid);
	// 		} catch (error) { // No existing user
	// 			console.log('error from server: ', error);
	// 		}
	// 	} else {
	// 		try {
	// 			await admin.auth().getUserByEmail(`${updatedResume.slug}@visitor.loginmycv.com`);
	// 		} catch (error) { // No existing user
	// 			const newUser = await admin.auth().createUser({
	// 				email: `${updatedResume.slug}@visitor.loginmycv.com`,
	// 				emailVerified: false,
	// 				password: updatedResume.password,
	// 				displayName: `${updatedResume.slug}@visitor`,
	// 				disabled: false
	// 			});
	// 			// console.log('newUser: ', newUser);
	// 			console.log('error from server: ', error);
	// 		}
	// 	}

	// 	console.log('def');

	// 	const newId = admin.firestore().collection('resumes_long').doc();
	// 	console.log('newId: ', newId);
		
	// 	// Update both long and short resumes at the same time (do a batch)
	// 	const batch = admin.firestore().batch();

	// 	// Update long resume
	// 	const updatedLongResume = admin.firestore().collection('resumes_long').doc(updatedResume.id);
	// 	batch.update(updatedLongResume, updatedResume);

	// 	// Update short resume
	// 	var updatedShortResume = admin.firestore().collection('resumes_short').doc(updatedResume.resume_short_id);
	// 	batch.update(updatedShortResume, {
	// 		slug: updatedResume.slug,
	// 		job_title: updatedResume.job_title,
	// 		job_description: updatedResume.job_description,
	// 		// gender: updatedResume.gender,
	// 		country: updatedResume.personal_data.country,
	// 		city: updatedResume.personal_data.city,
	// 		// picture: updatedResume.personal_data.picture,
	// 		keys: updatedResume.skills,
	// 		// languages: updatedResume.languages,
	// 		privacy: updatedResume.privacy,
	// 		user_id: updatedResume.user_id
	// 	});

	// 	// Commit the batch
	// 	// try {
	// 		await batch.commit();
	// 	// } catch {
	// 		// throw {
	// 			// 'resume_update_error': 'An error occured while attempting to update your resume.'
	// 		// }
	// 	// }

	// 	// await admin.firestore().collection('resumes_long').doc(updatedResume.id).update(updatedResume);

    //     // 8) Send back new resume id & new resume slug
    //     // res.send(snapshot.id);        
    //     res.send({
	// 		message: 'POST request to update resume went successfully.',
	// 		newFiles: req.files
    //         // resume_long_id: resume_long.id,
    //         // resume_long_slug: newResume.slug
    //     });
    //     // res.send('POST request to create new resume went successfully.');
  	// } catch (error) {
	// 	console.log('error from server: ', error);
	// 	// throw {
	// 	// 	'resume_update_error': 'An error occured while attempting to update your resu.'
	// 	// }
    //     // res.send({
    //     //     message: 'Update resume failed.',
    //     //     error: error
    //     // });
	// 	//   res.end(`POST request to update a resume failed: ${error}`);
	// 	// res.send(500, { error: 'POST request to update resume failed.' });
	// 	res.status(500).send(`POST request to update resume failed: ${error}`);
	// 	// res.status(500).send((results[0].id).toString());
  	// // }
});