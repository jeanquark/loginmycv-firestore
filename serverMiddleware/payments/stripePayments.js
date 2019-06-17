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
		const { token, amount_in_cents, currency, pack, userId } = req.body;
		console.log('token: ', token);
		console.log('amount_in_cents: ', amount_in_cents);
		console.log('currency: ', currency);
		console.log('pack: ', pack);
		console.log('userId: ', userId);
		const amount = amount_in_cents;

		// 1) Load the selected package
		let selectedPack = '';
		const packRef = await admin.firestore().collection('packages').doc(pack).get();
		if (packRef.exists) {
			selectedPack = packRef.data()
		} else {
			throw 'Selected package does not exists.'
		}
		console.log('selectedPack: ', selectedPack);

		// 2) Update user with package info
		const userRef = await admin.firestore().collection('users').doc(userId)
		userRef.update({
			_updated_at: moment().unix(),
			package: selectedPack,
			private: {
				maximum_number_of_resumes: selectedPack.maximum_number_of_resumes,
				total_space_in_bytes: selectedPack.total_space_in_bytes,
				available_templates: selectedPack.available_templates,
				valid_until: moment().add('1', 'years').add('1', 'days').unix()
			}
		})

		// 3) Process payment
		const charge = await stripe.charges.create({
			amount,
			currency,
			description: 'Payment from LoginMyCV website',
			source: token,
			receipt_email: 'jm.kleger@gmail.com',
		});
		console.log('charge: ', charge);


		res.status(200).send(`POST request to make stripe payment went successfully: ${charge}`);

  	} catch (error) {
  		console.log('error: ', error);
		res.status(500).send(`Server error, stripe payment failed: ${error}`);		  
  	}
});

