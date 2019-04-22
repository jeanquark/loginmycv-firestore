const express = require('express'),
	  bodyParser = require('body-parser'),
	  env = require("dotenv").config();

const MAILGUN_API = process.env.MAILGUN_API;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: MAILGUN_API, domain: MAILGUN_DOMAIN});

// global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res, next) {
	try {
		console.log('req.body.data: ', req.body.data);
		console.log('req.body.receiverAddress: ', req.body.receiverAddress);
		console.log('req.body.slug: ', req.body.slug);
		console.log('app-key: ', req.get('app-key'));

		const message = {
			from: 'General Office <info@loginmycv.com>',
			to: 'jm.kleger@gmail.com',
			subject: 'You received a message for your resume @loginMyCV',
			html: '<h2>LoginMyCV</h2><p>A message was sent through your contact form at the following address: <a href="localhost:3000/resume/ivan" target="_blank">ivan</a></p>'
		};
		const recipient = req.body.receiverAddress;

		// mailgun.messages().send(data, (error, body) => {
		// 	console.log(body);
		// });

	


		const sendEmail = (recipient, message) => new Promise((resolve, reject) => {
			const data = {
				from: message.from,
				to: recipient,
				subject: message.subject,
				html: message.html,
			};

			mailgun.messages().send(data, (error) => {
				if (error) {
					return reject(error);
				}
				return resolve();
			});
		});

		await sendEmail(recipient, message);
		res.json({message: 'Your message has been sent'});
		await next();

		res.send('POST request to send message went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to send message failed.');
  	}
});
