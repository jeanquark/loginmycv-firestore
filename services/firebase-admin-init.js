// ORIGINAL CODE:
const admin = require('firebase-admin');
const key = require('../serviceAccountKey.js');

module.exports = admin.initializeApp({
  	credential: admin.credential.cert(key),
  	databaseURL: `https://${key.project_id}.firebaseio.com`
});


// UPDATED CODE FOR SEEDS:
// const admin = require('firebase-admin');
// const firestoreService = require('firestore-export-import');
// const serviceAccount = require('../serviceAccountKey.js');
// const databaseURL = `https://${serviceAccount.project_id}.firebaseio.com`;
// const fs = require('fs');

// Initiate Firebase App
// firestoreService.initializeApp(serviceAccount, databaseURL);
// module.exports = firestoreService.initializeApp(serviceAccount, databaseURL);

// Start exporting your data
// firestoreService
//  	.backups(['app_parameters', 'authorizations', 'countries', 'key_competences', 'languages', 'resumes_long', 'resumes_short', 'templates', 'users'])
//   	.then(data => {
//   		let jsonData = JSON.stringify(data);
//   		fs.writeFileSync('database/seeds2.json', jsonData);  
//   	})

// Start importing your data
// firestoreService.restore('database/03June2019.json');