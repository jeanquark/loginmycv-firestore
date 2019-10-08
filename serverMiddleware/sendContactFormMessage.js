const express = require('express'),
	  bodyParser = require('body-parser'),
	  env = require('dotenv').config();

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;
const mailgun = require('mailgun-js')({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});

// global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function (req, res, next) {
	try {
		const data = req.body.data;
		const recipient = req.body.receiverAddress;
		const slug = req.body.resumeSlug;
		console.log('data: ', data);
		console.log('recipient: ', recipient);
		console.log('slug: ', slug);

		const message = {
			from: 'noreply <noreply@loginmycv.com>',
			to: EMAIL_RECIPIENT,
			subject: `You received a new message from your resume "${slug}" hosted on www.loginmycv.com`,
			html: `
				<h2 style="color: #7A528F;">LoginMyCV</h2>
				<p>A message was sent through the contact form of your resume located at the following <a href="http://loginmycv.com/resume/${slug}">location</a>. Here is its content:</p>
				<p><b>Sender:</b> ${data.firstname} ${data.lastname}, ${data.email}</p>
				<p><b>Message:</b> ${data.message}</p>
				<p style="color: #A9A9A9;">Best regards, <br />
				Your loginMyCV team</p>
			`
		};

		const sendEmail = (recipient, message) => new Promise((resolve, reject) => {
			const data = {
				from: message.from,
				to: EMAIL_RECIPIENT,
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

		res.status(200).send(`POST request to send message went successfully.`);
  	} catch (error) {
  		console.log('error: ', error);
  		// res.end('POST request to send message failed.');
		res.status(500).send({ message: 'POST request to send message failed.', error });
  	}
});
