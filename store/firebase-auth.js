import { firestore, auth } from "~/plugins/firebase-client-init.js"
import axios from "axios"
import Noty from "noty"
// import moment from "moment"

export const state = () => ({})

export const mutations = {}

export const actions = {
    async signUserIn({ commit }, payload) {
        console.log(payload)
        try {
            commit('setLoading', true, { root: true })
            let authData = await auth.signInWithEmailAndPassword(
                payload.email,
                payload.password
            )
            console.log('authData: ', authData)
            // console.log('authData.user.uid: ', authData.user.uid)
            const userId = authData.user.uid
            console.log('userId: ', userId)

            // const snapshot = firestore.collection('users').where('id', '==', userId).get().then(function(doc) {
            //     if (doc.exists) {
            //         console.log("Document data:", doc.data());
            //         commit("user/setLoadedUser", doc.data(), { root: true })
            //     } else {
            //         // doc.data() will be undefined in this case
            //         console.log("No such document!");
            //     }
            // }).catch(function(error) {
            //     console.log("Error getting document:", error);
            // });

            const snapshot = await firestore.collection('users').where('id', '==', userId).get()
            let user = {}
            snapshot.forEach(doc => {
                user = doc.data()
                // users.push(doc.data())
            })
            console.log('snapshot: ', snapshot)
            // console.log('snapshot.doc(): ', snapshot.doc())
            // console.log('snapshot.data: ', snapshot.data)
            // console.log('snapshot.docs(): ', snapshot.docs())
            // console.log('users: ', users)
            console.log('user: ', user)


            // const snapshot = await firebase
            //     .database()
            //     .ref("/users/" + userId)
            //     .once("value")
            commit('users/setLoadedUser', user, { root: true })
            commit('setLoading', false, { root: true })
        } catch (error) {
            console.log(error)
            commit("setLoading", false, { root: true })
            commit("setError", error, { root: true })
            throw new Error(error)
        }
    },

    async signUserUp({ commit }, payload) {
        // commit('setLoading', true, { root: true })
        try {
            // console.log('payload: ', payload)
            // return

            let authData = await auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password
            )
            console.log('authData: ', authData)
            console.log('authData.user.uid: ', authData.user.uid)
            const userId = authData.user ? authData.user.uid : null
            payload['id'] = userId
            console.log('payload: ', payload)
            const idToken = await auth.currentUser.getIdToken()
            payload['idToken'] = idToken


            return await axios.post('/register-new-user', {data: payload})
            // await firestore.collection('users').add({
            //     email: payload.email,
            //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            //     created_at: new Date(),
            //     updated_at: new Date()
            // })
            // return 'Success'

            
        } catch (error) {
            console.log(error)
            commit('setLoading', false, { root: true })
            if (error.code === 'auth/email-already-in-use') {
                new Noty({
                    type: 'error',
                    text: error.message,
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
            }
            throw new Error(error)
        }
    },

    async signInWithGooglePopup({ commit }) {
        try {
            commit("setLoading", true, { root: true })
            let authData = await Auth.signInWithPopup(GoogleAuthProvider)
            console.log("authData: ", authData)
            console.log("authData.user: ", authData.user)
            const userId = authData.user.uid
            console.log("userId: ", userId)

            // Check if user already exists in database
            const snapshot = await firebase
                .database()
                .ref("/users/" + userId)
                .once("value")
            const registeredUser = snapshot.val()

            // If user does not exists, save user data in database at the user node
            if (!registeredUser) {
                return axios
                    .post("/register-new-user", {
                        type: "oauth",
                        data: authData.user
                    })
                    .then(response => {
                        // Load newly registered user in store
                        commit("users/setLoadedUser", response.data, {
                            root: true
                        })
                        // commit('setLoading', false, { root: true })
                        new Noty({
                            type: "success",
                            text: "Successful registration",
                            timeout: 10000,
                            theme: "metroui"
                        }).show()
                    })
                    .catch(function(error) {
                        commit("setLoading", false, { root: true })
                        new Noty({
                            type: "error",
                            text:
                                "Sorry, an error occured during your registration process.",
                            timeout: 5000,
                            theme: "metroui"
                        }).show()
                    })
            } else {
                // Load user in store
                commit("users/setLoadedUser", registeredUser, { root: true })
                commit("setLoading", false, { root: true })
                // new Noty({type: 'success', text: this.app.i18n.t('messages.login.success'), timeout: 5000, theme: 'metroui'}).show()
            }
        } catch (error) {
            new Noty({
                type: "error",
                text: "Sorry, an error occured during your registration process.",
                timeout: 5000,
                theme: "metroui"
            }).show()
            commit("setError", error, { root: true })
            commit("setLoading", false, { root: true })
        }
    },
    async signInWithFacebookPopup({ commit }) {
        try {
            commit("setLoading", true, { root: true })
            let authData = await Auth.signInWithPopup(FacebookAuthProvider)
            console.log("authData: ", authData)
            console.log("authData.user: ", authData.user)
            const userId = authData.user.uid
            console.log("userId: ", userId)

            // Check if user already exists in database
            const snapshot = await firebase
                .database()
                .ref("/users/" + userId)
                .once("value")
            const registeredUser = snapshot.val()

            // If user does not exists, save user data in database at the user node
            if (!registeredUser) {
                return axios
                    .post("/register-new-user", {
                        type: "oauth",
                        data: authData.user
                    })
                    .then(response => {
                        // Load newly registered user in store
                        commit("users/setLoadedUser", response.data, {
                            root: true
                        })
                        commit("setLoading", false, { root: true })
                        new Noty({
                            type: "success",
                            text: this.app.i18n.t(
                                "messages.registration.success"
                            ),
                            timeout: 10000,
                            theme: "metroui"
                        }).show()
                    })
                    .catch(function(error) {
                        commit("setLoading", false, { root: true })
                        new Noty({
                            type: "error",
                            text:
                                "Sorry, an error occured during your registration process.",
                            timeout: 5000,
                            theme: "metroui"
                        }).show()
                    })
            } else {
                // Load user in store
                commit("users/setLoadedUser", registeredUser, { root: true })
                commit("setLoading", false, { root: true })
                new Noty({
                    type: "success",
                    text: this.app.i18n.t("messages.login.success"),
                    timeout: 5000,
                    theme: "metroui"
                }).show()
            }
        } catch (error) {
            new Noty({
                type: "error",
                text: this.app.i18n.t("messages.login.error"),
                timeout: 5000,
                theme: "metroui"
            }).show()
            commit("setError", error, { root: true })
            commit("setLoading", false, { root: true })
        }
    },
    async signOut({ commit }) {
        commit('setLoading', true, { root: true })
        await auth.signOut()
        commit('users/setLoadedUser', null, { root: true })
        commit('authorizations/setUserAuthorizations', null, { root: true })
        commit('setLoading', false, { root: true })
    },
    async currentUserIdToken () {
        if (auth.currentUser) {
            // return 'abc'
            return auth.currentUser.uid
            const idToken = await auth.currentUser.getIdToken
            console.log('idToken: ', idToken)
            return idToken
        } else {
            return 'No auth user found.'
        }
    }
}

export const getters = {}
