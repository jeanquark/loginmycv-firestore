import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// require("dotenv").config();
// import dotenv from 'dotenv'
// dotenv.config({ silent: true })
// import dotenv from 'dotenv'
// dotenv.config()
// require('dotenv').config()
// const config = dotenv.config()

if (!firebase.apps.length) {

    const config = {
        apiKey: 'AIzaSyD36VHk9xdio49ruafhbIkTaM1HDbzd6FA',
        // apiKey: process.env.FIREBASE_API_KEY,
        authDomain: 'loginmycv.firebaseapp.com',
        databaseURL: 'https://loginmycv.firebaseio.com',
        projectId: 'loginmycv',
        storageBucket: 'loginmycv.appspot.com',
        messagingSenderId: '411036483039'
    }

    firebase.initializeApp(config)
    // firebase.firestore().settings({timestampsInSnapshots: true})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
// export { firestore }