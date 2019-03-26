import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

if (!firebase.apps.length) {

    const config = {
        apiKey: 'AIzaSyD36VHk9xdio49ruafhbIkTaM1HDbzd6FA',
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