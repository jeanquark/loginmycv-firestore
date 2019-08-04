const express = require('express'),
      admin = require('firebase-admin'),
      bodyParser = require('body-parser'),
      validate = require('validate.js'),
      moment = require('moment');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const app_key = process.env.APP_KEY;

module.exports = app.use(async function (req, res) {
    try {
        let newResume = req.body.newResume;
        const userPackageValidity = req.body.userPackageValidity;
        console.log('newResume: ', newResume);

        // console.log('app-key: ', req.get('app-key'));
        // console.log('app_key: ', app_key);
        // 1) Check API KEY (so that we know request is sent from server)
        // if (req.get('app-key') !== app_key) {
        //     throw {
        //         'server_error': 'You are not sending this request from an authorized server.'
        //     }
        // }
		


        // 2) Check slug existence
        const snapshot = await admin.firestore().collection('resumes_long').doc(newResume.slug).get();
        const existingSlug = snapshot.data();
        console.log('existingSlug: ', existingSlug);
        if (existingSlug) {
            throw {
                'slug': 'Slug already exists. Please provide another identifier for the resume.',
            }
        }

		// throw {
		// 	'slug': 'Slug already exists. Please provide another identifier for the resume.',
		// }

		

        // 3) Check again total uploads size (but this time serverside)
        const user = await admin.firestore().collection('users').doc(newResume.user_id).get();
		const totalSpaceInBytes = user.data().private.total_space_in_bytes;
		
        let totalUploadSize = 0;
        const userResumes = await admin.firestore().collection('resumes_long').where('user_id', '==', newResume.user_id).get();
        userResumes.forEach(doc => {
            // const uploads = doc.data().uploads;
            doc.data().uploads.forEach(upload => {
                totalUploadSize += parseInt(upload.size_in_bytes)
            });
        });

        newResume.uploads.forEach(upload => {
            totalUploadSize += parseInt(upload.size_in_bytes)
        });

        if (totalUploadSize > totalSpaceInBytes) {
            throw {
                'not_enough_space': 'Not enough space. Please remove some files.'
            }
        }

        console.log('newResume.package_valid_until: ', newResume.package_valid_until)

        
        newResume._created_at = moment().unix();
        newResume._updated_at = moment().unix();
        newResume['uploads'] = [];
        const password = newResume.password;
        delete newResume['id'];
        delete newResume['password'];
        delete newResume['password_confirmation'];

        // Activate package to make it visible
        if (userPackageValidity && userPackageValidity < moment().unix()) {
            newResume['active'] = false;
        } else {
            newResume['active'] = true;
        }


        // 4) Create visitor auth account 
        if (password) {
            try {
                console.log('Update visitor\'s password: ', password);
                const user = await admin.auth().getUserByEmail(`${newResume.slug}@visitor.loginmycv.com`);
                console.log('user.uid: ', user.uid);
                await admin.auth().deleteUser(user.uid);
            } catch (error) { // User does not exist
                console.log('user does not exist');
            }
            try {
                const newUser = await admin.auth().createUser({
                    email: `${newResume.slug}@visitor.loginmycv.com`,
                    emailVerified: false,
                    password: password,
                    displayName: `${newResume.slug}@visitor`,
                    disabled: false
                });
                const visitor_id = newUser.uid;
                newResume['visitor_id'] = visitor_id;
            } catch (error) {
                throw {
                    'server_error': 'Visitor with password access could not be created.'
                }
            }
        }


        // 5) Update template counter
        const incrementUsers = admin.firestore.FieldValue.increment(1);
        const templateToIncrementRef = admin.firestore().collection('templates').doc(newResume.template_id);
        templateToIncrementRef.update({ count_users: incrementUsers });



        // 6) Save long & short resumes in DB
        let batch = admin.firestore().batch();
        const newShortResume = admin.firestore().collection('resumes_short').doc();
        newResume['resume_short_id'] = newShortResume.id;
        const newLongResume = admin.firestore().collection('resumes_long').doc(newResume.slug);
        // newResume['resume_long_id'] = newLongResume.id;
            
        // const newLongResume = admin.firestore().collection('resumes_long').doc(newLongResume.id);
        batch.set(newLongResume, newResume);

        batch.set(newShortResume, {
            user_id: newResume.user_id,
            resume_long_id: newResume.slug,
            visibility: newResume.visibility,
            active: newResume.active,
            job_title: newResume.job_title,
            job_description: newResume.job_description,
            firstname: newResume.personal_data.firstname ? newResume.personal_data.firstname : '',
            lastname: newResume.personal_data.lastname ? newResume.personal_data.lastname : '',
            country: newResume.personal_data.country ? newResume.personal_data.country : '',
            city: newResume.personal_data.city ? newResume.personal_data.city : '',
            key_competences: newResume.key_competences ? newResume.key_competences : null,
            languages: newResume.languages ? newResume.languages : null,
            _created_at: newResume._created_at,
            _updated_at: newResume._updated_at
        });

        await batch.commit();

        res.send({
            message: 'POST request to create resume went successfully.',
            newLongResumeId: newLongResume.id,
            newShortResumeId: newShortResume.id
        });
    } catch (error) {
        console.log('error from server: ', error)
		res.status(500).send({ message: 'Create resume failed.', error });
    }
});