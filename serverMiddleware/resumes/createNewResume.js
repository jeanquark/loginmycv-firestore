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
        console.log('newResume: ', newResume);

        console.log('app-key: ', req.get('app-key'));
        console.log('app_key: ', app_key);
        // 1) Check API KEY (so that we know request is sent from server)
        if (req.get('app-key') !== app_key) {
            throw {
                'server_error': 'You are not sending this request from an authorized server.'
            }
        }



        // 2) Check slug existence
        const snapshot = await admin.firestore().collection('resumes_long').doc(newResume.slug).get();
        const existingSlug = snapshot.data();
        console.log('existingSlug: ', existingSlug);
        if (existingSlug) {
            throw {
                'slug': 'Slug already exists. Please provide another identifier for the resume.',
            }
        }

        
        newResume._created_at = moment().unix();
        newResume._updated_at = moment().unix();
        newResume['uploads'] = []
        const password = newResume.password;
        delete newResume['id'];
        delete newResume['password'];
        delete newResume['password_confirmation'];
        console.log('password: ', password);



        // 3) Create visitor password 
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



        // 4) Save long & short resumes in DB
        let batch = admin.firestore().batch()
            
        const newLongResume = admin.firestore().collection('resumes_long').doc(newResume.slug)
        batch.set(newLongResume, newResume)

        const newShortResume = admin.firestore().collection('resumes_short').doc()
        batch.set(newShortResume, {
            user_id: newResume.user_id, 
            slug: newResume.slug,
            visibility: newResume.visibility,
            job_title: newResume.job_title,
            job_description: newResume.job_description,
            personal_data: {
                firstname: newResume['personal_data']['firstname'],
                lastname: newResume['personal_data']['lastname'],
                email: newResume['personal_data']['email'],
                country: newResume['personal_data']['country'],
                city: newResume['personal_data']['city']
            },
            key_competences: newResume.key_competences ? newResume.key_competences : null,
            languages: newResume.languages,
            _created_at: newResume._created_at,
            _updated_at: newResume._updated_at
        })

        await batch.commit()

        res.send({
            message: 'POST request to create resume went successfully.',
            data: newShortResume.id
        });
    } catch (error) {
        console.log('error from server: ', error)
        // res.status(500).send(`POST request to update resume failed: ${error}`);
        // res.send({
        //     message: 'Update resume failed.',
        //     error: error
        // });
        
        // Remove uploaded files
        // console.log('newResume: ', newResume)
        res.status(500).send({ error });

        // res.status(500).send({ message: 'Create resume failed.', error });      
    }

});