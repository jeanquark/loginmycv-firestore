const express = require('express'),
	  bodyParser = require('body-parser'),
      admin = require('firebase-admin'),
      //   { check, validationResult } = require('express-validator/check');
      expressValidator = require('express-validator'),
      multer = require('multer');

const app = express();

// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());
app.use(expressValidator());
// app.use(multer());
// let upload = multer();
app.use(multer({ dest: '/file/uploads/' }).any());

module.exports = app.use(async function (req, res, next) {
	try {
        // req
        //     .getValidationResult() // to get the result of above validate fn
        //     .then(validationHandler())
        //     .then(() => {
        //         // console.log('req.body.data: ', req.body.data);
        //         // console.log('req.body.data.personal_data: ', req.body.data.personal_data);
        //         const userResume = req.body.data;
        //         console.log('userResume: ', userResume)

        //         // check(userResume.personal_data.email).exists().isEmail();
        //         // check(userResume.personal_data.firstname).exists();
        //         // check(userResume.personal_data.firstname).isLength({ min: 5, max:5 });

        //         res.send('POST request to create new resume went successfully.');
        //     });
        
        // console.log('upload: ', upload.single())

        console.log('req.body: ', req.body);
        console.log('req.body.data: ', req.body.data);
        // req.checkBody('personal_data.email').isEmail();
        // req.checkBody('personal_data.firstname').exists().isLength({ min: 5, max:5 });
        // req.checkBody('personal_data.lastname').exists().isLength({ max: 30 });
        // req.checkBody('personal_data.username').exists();

        // const errors = req.validationErrors();
        
        // if (errors) {
        //     console.log('errors: ', errors)
        // } else {
        //     res.send('POST request to create new resume went successfully.');
        // }
        // const abc = await req.getValidationResult();
        // console.log('abc: ', abc.array());
        // console.log('req.getValidationResult(): ', req.getValidationResult());
        // console.log('multer.single("personal_data.picture"): ', req.file);
        console.log('req.files: ', req.files);
        console.log('req.files[0]: ', req.files[0]);
        // const abc = JSON.parse(req.files[0]);
        // console.log('req.files[0].originalName: ', abc);
        // console.log('picture size: ', floor((req.body.image_new + 2) / 3) * 4)

        // const storageFileRef = admin.storage().bucket('resumes').child(`OlxfESwPtlgzz4vcjiL4YKsIDZI2/abc.pdf`);
        // const storageFileRef = admin.storage().bucket('resumes/OlxfESwPtlgzz4vcjiL4YKsIDZI2');
        // const snapshot = storageFileRef.file(req.files[0]);
        

        // admin.storage().bucket('resumes/OlxfESwPtlgzz4vcjiL4YKsIDZI2').file(req.files[0]);
        const bucket = admin.storage().bucket('resumes');
        const file = bucket.file('my-file');
        const contents = 'This is the contents of the file.';

        file.save(contents, function(err) {
            if (!err) {
                console.log('File written successfully.');
            } else {
                console.log('error: ', err);
            }
        });
                    
        res.send('POST request to create new resume went successfully.');
  	} catch (error) {
  		console.log('error: ', error);
  		res.end('POST request to create new resume failed.');
  	}
});

// module.exports = app.post('/create-new-resume', upload.none(), function (req, res) {
//     console.log('req.body: ', req.body);
//     console.log('req.files: ', req.files);
// //         console.log('req.file: ', req.file);
//     res.json({ it: 'works!' });
// });