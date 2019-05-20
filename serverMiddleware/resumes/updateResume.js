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
		updatedResume._updated_at = moment().unix();
		// console.log('updatedResume: ', updatedResume);
		console.log('app-key: ', req.get('app-key'));
		console.log('app_key: ', app_key);
		if (req.get('app-key') !== app_key) {
			throw {
				'wrong-app-key': 'You are not sending this request from an authorized server.'
			}
		}


		// 1) Perform validation
		const constraints = {
            'job_title': { presence: true, length: { maximum: 50 }},
            'job_description': { presence: true, length: { maximum: 250 }},
            'personal_data.email': { presence: true, email: true },
            'personal_data.firstname': { presence: true, length: { maximum: 50 }},
			'personal_data.lastname': { presence: true, length: { maximum: 50 }},
			'personal_data.city': { length: { maximum: 50 }},
			'personal_data.website': { url: true },
			'personal_data.phone': { format: '[0-9+()-]+'},
		};
		for (let social_link of updatedResume.social_links) {
			const validation = validate(social_link, {'link': { url: true }})
			if (validation != undefined) {
				throw { [`${social_link.slug}`] : [`${social_link.name} is not a valid url`] };
			}
		}
		if (updatedResume.updateResumeSlug) {
			constraints['new_slug'] = {
				presence: true, 
				format: {
					pattern: "[a-z0-9-]+", 
					flags: "i", 
					message: "Slug can only contain a-z, 0-9 and -"
				}
			}
		}
		if (updatedResume.password) {
			constraints['password'] = { presence: true, length: { maximum: 30 }};
			constraints['password_confirmation'] = { presence: true, equality: 'password'};
		}

		const validation = validate(updatedResume, constraints);
        console.log('validation: ', validation);
        if (validation != undefined) {
            throw validation;
        }
		console.log('Form is valid, continue saving in DB');
		


		if (updatedResume.updateResumeSlug) { // Updating the resume slug

			// Do not forget to update authorizations collection
			console.log('You changed the resume slug!');
			// const snapshot = await admin.firestore().collection('resumes_long').where('slug', '==', updatedResume.new_slug).get();
			// const resumesArray = [];
			// snapshot.forEach(doc => {
			// 	resumesArray.push(doc.data());
			// })
			// console.log('resumesArray: ', resumesArray);
			// console.log('resumesArray.length: ', resumesArray.length);
			// if (resumesArray.length > 0) {
			// 	throw {
			// 		'slug': 'Slug already exists. Please provide another identifier for the resume.'
			// 	}
			// }
			const snapshot = await admin.firestore().collection('resumes_long').doc(updatedResume.new_slug).get();
			console.log('snapshot.data(): ', snapshot.data());
			if (!snapshot.data()) { // If a resume with the new slug does not already exists
				const oldSlug = updatedResume.slug;
				const newSlug = updatedResume.new_slug;
				const password = updatedResume.password;
				updatedResume['slug'] = newSlug;
				delete updatedResume['updateResumeSlug'];
				delete updatedResume['new_slug'];
				delete updatedResume['id'];
				delete updatedResume['password'];
				delete updatedResume['password_confirmation'];

				if (password) { // Updating resume's password
					try {
						console.log('Update visitor\'s password: ', password);
						const user = await admin.auth().getUserByEmail(`${oldSlug}@visitor.loginmycv.com`);
						console.log('user.uid: ', user.uid);
						await admin.auth().deleteUser(user.uid);
					} catch (error) { // User does not exist
						console.log('user does not exist');
					}
					const newUser = await admin.auth().createUser({
						email: `${newSlug}@visitor.loginmycv.com`,
						emailVerified: false,
						password: password,
						// password: 'secret',
						displayName: `${newSlug}@visitor`,
						disabled: false
					});
					console.log('password: ', password);
					console.log('newUser: ', newUser);
					const visitor_id = newUser.uid;
					console.log('visitor_id: ', visitor_id);
				}
				updatedResume['visitor_id'] = visitor_id;

				const batch = admin.firestore().batch();
			
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
					// gender: updatedResume.gender,
					// picture: updatedResume.personal_data.picture,
					keys: updatedResume.skills,
					// languages: updatedResume.languages,
					visibility: updatedResume.visibility,
				});
				await batch.commit();
	
				await admin.firestore().collection('resumes_long').doc(oldSlug).delete();
				
				if (updatedResume.visibility === 'public') {
					try {
						console.log('Update visibility to public');
						const user = await admin.auth().getUserByEmail(`${oldSlug}@visitor.loginmycv.com`);
						console.log('user.uid: ', user.uid);
						await admin.auth().deleteUser(user.uid);
					} catch (error) { // No existing user
						// console.log('error from server: ', error);
						console.log('No existing user');
					}
				}
				
				// Update visitor profile data
				res.send({
					message: 'POST request to update resume went successfully.',
				});
			} else {
				throw {
					'new_slug': 'Slug already exists. Please provide another identifier for the resume.'
				}
			}

		} else { // Not updating the resume slug
			console.log('Not updating the resume slug');
			const password = updatedResume.password;
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
					await admin.auth().deleteUser(user.uid);
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
				// gender: updatedResume.gender,
				// picture: updatedResume.personal_data.picture,
				keys: updatedResume.skills,
				// languages: updatedResume.languages,
			});
			await batch.commit();

			res.send({
				message: 'POST request to update resume went successfully.',
			});
		}
	} catch (error) {
		console.log('error from server: ', error)
		// res.status(500).send(`POST request to update resume failed: ${error}`);
		// res.send({
        //     message: 'Update resume failed.',
        //     error: error
		// });
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