// ORIGINAL CODE:
const admin = require("firebase-admin");
const key = require("../serviceAccountKey.js");

module.exports = admin.initializeApp({
  	credential: admin.credential.cert(key),
  	databaseURL: `https://${key.project_id}.firebaseio.com`
});


// UPDATED CODE FOR SEEDS:
// const admin = require("firebase-admin");
// const firestoreService = require('firestore-export-import');
// const serviceAccount = require("../serviceAccountKey.js");
// const databaseURL = `https://${serviceAccount.project_id}.firebaseio.com`;
// const fs = require('fs');

// // Initiate Firebase App
// // firestoreService.initializeApp(serviceAccount, databaseURL);
// module.exports = firestoreService.initializeApp(serviceAccount, databaseURL);

// // Start exporting your data
// firestoreService
//  	.backups(['resumes_long', 'resumes_short', 'authorizations', 'users', 'templates', 'key_competences', 'countries', 'languages'])
//   	.then(data => {
//   		let jsonData = JSON.stringify(data);
//   		fs.writeFileSync('database/seeds.json', jsonData);  
//   	})

// // Seed database
// // firestoreService.restore('database/seeds.json');