require("dotenv").config();
let config = require("./nuxt.config.js");

if (config.dev) {
    module.exports = {
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: "firebase-adminsdk-k5k94@loginmycv.iam.gserviceaccount.com",
        client_id: "116651560969124640882",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k5k94%40loginmycv.iam.gserviceaccount.com"
    };
} else {
    console.log('!config.dev')
    // console.log('process.env: ', process.env)
    console.log('process.env.PROJECT_ID: ', process.env.PROJECT_ID)
    module.exports = {
        type: "service_account",
        // project_id: "loginmycv",
        project_id: process.env.PROJECT_ID,
        // private_key_id: "e9edffcf42299972a451539f53e8d1204865a600",
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        // private_key: JSON.parse(process.env.PRIVATE_KEY),
        // private_key: process.env.PRIVATE_KEY,
        client_email: "firebase-adminsdk-k5k94@loginmycv.iam.gserviceaccount.com",
        client_id: "116651560969124640882",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k5k94%40loginmycv.iam.gserviceaccount.com"
    };
}