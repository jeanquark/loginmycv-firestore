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
        let newResume = req.body;
        // console.log('newResume.uploads: ', newResume.uploads);
        
        // console.log('picture: ', picture);
        // throw new Error();

        newResume._created_at = moment().unix();
        newResume._updated_at = moment().unix();
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
        for (let social_link of newResume.social_links) {
            const validation = validate(social_link, {'link': { url: true }})
            if (validation != undefined) {
                throw { [`${social_link.slug}`] : [`${social_link.name} is not a valid url`] };
            }
        }
        if (newResume.password) {
            constraints['password'] = { presence: true, length: { maximum: 30 }};
            constraints['password_confirmation'] = { presence: true, equality: 'password'};
        }

        const validation = validate(newResume, constraints);
        console.log('validation: ', validation);
        if (validation != undefined) {
            throw validation;
        }
        console.log('Form is valid, continue saving in DB');
        
        const password = newResume.password;
        delete newResume['id'];
        delete newResume['password'];
        delete newResume['password_confirmation'];

        if (password) { // Creating resume's password
            try {
                console.log('Update visitor\'s password: ', password);
                const user = await admin.auth().getUserByEmail(`${newResume.slug}@visitor.loginmycv.com`);
                console.log('user.uid: ', user.uid);
                await admin.auth().deleteUser(user.uid);
            } catch (error) { // User does not exist
                console.log('user does not exist');
            }
            const newUser = await admin.auth().createUser({
                email: `${newResume.slug}@visitor.loginmycv.com`,
                emailVerified: false,
                password: password,
                displayName: `${newResume.slug}@visitor`,
                disabled: false
            });
            const visitor_id = newUser.uid;
            newResume['visitor_id'] = visitor_id;
        }

        const picture = newResume.uploads.find(upload => {
            return upload.type === 'profile_picture'
        });

        const batch = admin.firestore().batch();
        
        const newLongResume = admin.firestore().collection('resumes_long').doc(newResume.slug);
        batch.set(newLongResume, newResume);

        const newShortResume = admin.firestore().collection('resumes_short').doc(newResume.resume_short_id);
        batch.set(newShortResume, {
            job_title: newResume.job_title,
            job_description: newResume.job_description,
            personal_data: {
                firstname: newResume['personal_data']['firstname'],
                lastname: newResume['personal_data']['lastname'],
                email: newResume['personal_data']['email'],
                country: newResume['personal_data']['country'],
                city: newResume['personal_data']['city']
            },
            picture: picture ? picture.dowloadUrl : '',
            keys: newResume.skills,
            languages: newResume.languages,
        });
        await batch.commit();

        res.send({
            message: 'POST request to create resume went successfully.',
        });
    } catch (error) {
        console.log('error from server: ', error)
        // res.status(500).send(`POST request to update resume failed: ${error}`);
        // res.send({
        //     message: 'Update resume failed.',
        //     error: error
        // });
        res.status(500).send({ message: 'Create resume failed.', error });      
    }

});