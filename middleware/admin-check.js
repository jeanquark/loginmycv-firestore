import firebase from 'firebase/app'

export default function({ store, redirect, error }) {
    console.log('Entering admin-check')
    if (process.client) {
        console.log('process client')
        if (firebase.auth().currentUser) {
            console.log('Current user')
            firebase
                .auth()
                .currentUser.getIdTokenResult()
                .then(idTokenResult => {
                    console.log(idTokenResult)
                    if (!!idTokenResult.claims.admin) {
                        console.log('Authenticated as admin')
                    } else {
                        console.log(
                            'Authenticated but no admin priviledges, redirect to candidate pages'
                        )
                        return redirect('/candidate/resumes')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            console.log('Unauthenticated, redirect to index')
            return redirect('/')
        }
    } else {
        console.log('process server')
    }
}