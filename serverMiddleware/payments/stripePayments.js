const express = require('express'),
	  bodyParser = require('body-parser'),
	  env = require('dotenv').config(),
	  stripe = require('stripe')('sk_test_ogfjN22JjsIjOOlB4nLytx7f0005aoKLEd');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res, next) {
	try {
		console.log('req.body: ', req.body);
		const { token, amount_in_cents, currency } = req.body;
		console.log('token: ', token);
		console.log('amount: ', amount_in_cents);
		console.log('currency: ', currency);
	

		const charge = await stripe.charges.create({
			amount_in_cents,
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

