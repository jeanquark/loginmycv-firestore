////////////////////////////////////
//     command to run in cli:     //
//     firestore-export --accountCredentials path/to/credentials/file.json --backupFile /backups/myDatabase.json --nodePath collectionA/document1/collectionCC
  //
//     https://www.npmjs.com/package/node-firestore-import-export
////////////////////////////////////

const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./.accountCredentials.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const schema = {
	menus: {}
};

const firestore2json = (db, schema, current) => {
	return Promise.all(
		Object.keys(schema).map(collection => {
			return db
				.collection(collection)
				.get()
				.then(data => {
					let promises = [];
					data.forEach(doc => {
						if (!current[collection]) current[collection] = { __type__: 'collection' };
						current[collection][doc.id] = doc.data();
						promises.push(
							firestore2json(
								db.collection(collection).doc(doc.id),
								schema[collection],
								current[collection][doc.id]
							)
						);
					});
					return Promise.all(promises);
				});
		})
	).then(() => current);
};

firestore2json(admin.firestore(), { ...schema }, {}).then(res =>
	fs.writeFileSync('./database/export.json', JSON.stringify(res, null, 2), 'utf8')
).catch((error) => {
	console.log('error: ', error)
});