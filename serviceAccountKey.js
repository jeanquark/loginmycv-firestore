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
        // private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIaeqKsq3DL6mB\npDYlo0yPlldy0U6BwoqGy1v71oltFApBYam4qdzZkEycOpXPz/kBab9KjyuNzZj/\n0t642dH9KkqC3WPZB7QI207xjvWFemEyiucVY3TTrGfpMZYJ5ZfYF3787rQokpop\nFbBuaxo4B+vgBZXCwAiIAtvmskV0sGJJFoBMg4/T6BUu0zwEzm/gsyx1U9tQIdSz\nAO5uVz799W9AsBYGq1TZyialuEeQMboMJX1ttBp3XbLDf6Ras0ci7tZ1sLJE0v3Q\nEuU7AxiPw9xq3ZGVljBqjJdR4IG2WfskW4U8ccyWHx8mRgwKBurrzDKZopycxhYN\n2nq19U8TAgMBAAECggEACAHnW5xRAgP0/1eKzE0ugWwt2UoQm3Gk7EbSyYikXAXZ\ndQxMZjLvPogb74ANvUxfdBWADaATyuoki1AnEvatA7L9YCYtV54NrO7qRA+Ess0V\ndhoDqqCbKdvxGOmgx4tzWjByI/P7ocVdwHd74aWI2iVC4OQIPExE6v5GP/zudn+F\ng66m476y/xURIuhB3Bj+TgFdVAPFylVEi6gZ5mXqrqe8lbNFc7XOkv3RoSTDT+Dg\nPjEXjAHnaVM2HgVR7Ek4VoQ/nm1ijU4f6brQpDggaKz+kNZiMhcc9jxZmFaewrWM\n7oIDCa3+oPOXnfI4UEdGlR2XIlExj9ZTuFqT08NVHQKBgQDwlnAkInwGQesjYvX/\n/bdcv+ZLQS41oPBN95JkdE6nq5AQaZTfm1egvJT4qA3IciWQyGWfFolRg35X8pHQ\n40iSks+mqhZpabChmT3VdGbmgLkDbHK2oddCLqO+CX6D9MsEzvNRxbvoJqmwkgjp\nL9IWk7NjWnJOn0hvuNCaSB9xxQKBgQDVQKN4CZyCTt2W0+Qy2hVTETCqg/aLCGYv\nYr5offALQ+K7VT0GUfr0Bhi3y6tU92lefdasa9lzoSaIscv0pcrxmDpaNWKPYCCg\nwycmECcbvRM7XN089wooB0fxUJL2V7JKdJmRfutwGWczR8DApYz6oU6B7EzQsz+c\nljgmsH8C9wKBgQDKQT4/MnpfbFU35371WR8oKu94vnARh53dfc6lAp4JGRLAqXIN\nVXOiXkdCj00fAM8R21aLGpAQZeH2H6d0G06sYh2NeBnlPoPOJpyz8Op8xyRCe44o\neQAU1E61eRfR6R4viadGTFv++1nWZb52Asy0TDEXyjakYAWuXomH2jANHQKBgCwv\nX2+Atk/9nUYiEzdCHob+mdHK0+uMyvdog0FNTs5Wu4TLLYDAvbmQBdEXPyG0vb1Z\nX4CMPBsMOdq61CKVs44JV5XXV9uTNE97AAKP+Dp0G6cCH8kA+ra+g3aJllm6Y/Ov\nYx5VaNzqNorWhCamZqaLg6PB3UykxzpfmbTSfw6TAoGBANeE+2gHpCxlWkL0RXBt\n0p7koT46qPEvpxpSuxz/b1xXm2u2TSLFMZRbJT0p7lhe/Ffh9fVuRQDsg297X3Ja\nqKbzNCwC9deClwNAvKBxE8aH2zl1BAZCIhbVv3h2of98guY10wA4mgEUbYlBalhU\nY2ugPm2PCwwHWgLOq2jaJfHc\n-----END PRIVATE KEY-----\n",
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