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
        console.log('req.body: ', req.body);
        console.log('req.body.slug: ', req.body.slug);
        const slug = req.body.slug;

        console.log('app-key: ', req.get('app-key'));
        console.log('app_key: ', app_key);
        // if (req.get('app-key') !== app_key) {
        //     throw {
        //         'wrong-app-key': 'You are not sending this request from an authorized server.'
        //     }
        // }

        // Check slug existence
        const snapshot = await admin.firestore().collection('resumes_long').doc(slug).get();
        const existingSlug = snapshot.data();
        // console.log('existingSlug: ', existingSlug);
        if (existingSlug) {
            throw {
                'slug': 'Slug already exists. Please provide another identifier for the resume.'
            }
        }

        res.send({
            message: 'POST request to check resume slug went successfully.',
        });
    } catch (error) {
        console.log('error from server: ', error);
        // res.send(error);
        // res.status(409).json({'slug': 'Slug already exists');
        res.status(500).send({ message: 'Check resume slug failed.', error });
    }
});