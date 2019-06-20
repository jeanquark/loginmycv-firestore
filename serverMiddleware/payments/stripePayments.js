const express = require('express'),
	  bodyParser = require('body-parser'),
	  env = require('dotenv').config(),
	  admin = require('firebase-admin'),
	  moment = require('moment'),
	  stripe = require('stripe')('sk_test_ogfjN22JjsIjOOlB4nLytx7f0005aoKLEd');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res, next) {
	try {
		console.log('req.body: ', req.body);
		const { token, pack, amount_in_cents, currency, valid_until, userId, email, name } = req.body;
		console.log('token: ', token);
		console.log('pack: ', pack);
		console.log('amount_in_cents: ', amount_in_cents);
		console.log('currency: ', currency);
		console.log('valid_until: ', valid_until);
		console.log('userId: ', userId);
		console.log('email: ', email);
		console.log('name: ', name);
		const amount = amount_in_cents;

		// 1) Load the selected package
		// let selectedPack = '';
		// const packRef = await admin.firestore().collection('packages').doc(pack).get();
		// if (packRef.exists) {
		// 	selectedPack = packRef.data();
		// } else {
		// 	throw 'Selected package does not exists.'
		// }
		// console.log('selectedPack: ', selectedPack);


		// 2) Update user with package info
		const userRef = await admin.firestore().collection('users').doc(userId)
		userRef.update({
			_updated_at: moment().unix(),
			'private.package_name': pack.name,
			'private.package_slug': pack.slug,
			'private.maximum_number_of_resumes': pack.maximum_number_of_resumes,
			'private.total_space_in_bytes': pack.total_space_in_bytes,
			'private.available_templates': pack.available_templates,
			'private.package_valid_until': valid_until
		})


		// 3) Process payment
		const charge = await stripe.charges.create({
			amount,
			currency,
			description: `Payment to LoginMyCV`,
			source: token,
			metadata: {
				user_id: userId,
				name,
				email
			},
		});
		console.log('charge: ', charge);


		// 4) Save payment in database
		const newPayment = await admin.firestore().collection('payments').add({
			userId,
			name,
			email,
			amount_in_cents,
			currency,
			package: {
				name: pack.name,
				slug: pack.slug,
				valid_until
			},
			_created_at: moment().unix(),
			_updated_at: moment().unix()
		});

		res.status(200).send(`POST request to make stripe payment went successfully: ${charge}`);
  	} catch (error) {
  		console.log('error: ', error);
		res.status(500).send(`Server error, stripe payment failed: ${error}`);		  
  	}
});

