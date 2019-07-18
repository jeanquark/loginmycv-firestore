import { firestore, auth, GoogleAuthProvider, FacebookAuthProvider } from '~/plugins/firebase-client-init.js'
import axios from 'axios'

export const state = () => ({})

export const mutations = {}

export const actions = {
    async signUserIn ({ commit }, payload) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in vuex state
        return new Promise((resolve, reject) => {
            commit('setLoading', true, { root: true })
            auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(authData => {
                // console.log('authData: ', authData)
                // console.log('authData.user.uid: ', authData.user.uid)
                let userId = authData.user.uid

                // if (!authData.user.emailVerified) {
                //     auth.signOut()
                //     .then(() => {
                //         console.log('You were immediately signed out because your email is not verified.')
                //         throw { code: 'email_not_verified', message: 'Your email address is not verified.', authData }
                //     })
                //     .catch(error => {
                //         console.log('error2: ', error)
                //         commit('setError', error, { root: true })
                //         reject(error)
                //     })
                // } else {
                    console.log('Email is verified, continue sign in.')
                    firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                        const user = {
                            ...doc.data(),
                            id: doc.id  
                        }
                        // console.log('user: ', user)
                        commit('users/setLoadedUser', user, { root: true })
                        commit('setLoading', false, { root: true })
                        resolve()
                    })
                // }
            }).catch(error => {
                // console.log('error: ', error)
                commit('setError', error, { root: true })
                commit('setLoading', false, { root: true })
                reject(error)
            })
        })
    },
    async signVisitorIn ({ commit }, payload) {
        try {
            // console.log('payload: ', payload)
            const username = `${payload.slug}@visitor.loginmycv.com`
            // console.log('username: ', username)
            let authData = await auth.signInWithEmailAndPassword (
                username,
                payload.password
            )
            // console.log('authData: ', authData)
            const authUserId = authData.user.uid
            // console.log('authUserId: ', authUserId)
            // Do not create user in store
            
            // const user = {
            //     id: authUserId,
            //     status: 'visitor',
            //     email: authData.user.email
            //     // ...authData.user
            // }
            // console.log('user: ', user)
            // commit('users/setLoadedUser', user, { root: true })
        } catch (error) {
            // console.log('error2: ', error)
            commit('setError', error, { root: true })
            throw new Error(error)
            // return
        }
    },
    async signUserUp({ commit, dispatch }, payload) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in vuex state
        return new Promise((resolve, reject) => {
            // console.log('payload: ', payload)
            auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password
            )
            .then(authData => {
                console.log('authData: ', authData)
                authData.user.sendEmailVerification()
                return authData
            })
            .then(authData => {
                // console.log('authData2: ', authData)
                // console.log('Process server side registration.')
                authData.firstname = payload.firstname
                authData.lastname = payload.lastname
                return axios.post('/register-new-user', { data: authData })
            })
            .then(verificationEmail => {
                console.log('Email sent: ', verificationEmail)
                return auth.signOut()
            })
            .then(() => {
                // console.log('You were immediately signed out because your email is not verified. Open login modal.')
                resolve()
            }).catch (error => {
                // console.log('error from firebase auth: ', error)
                commit('setLoading', false, { root: true })
                reject(error)
            })
        })
    },
    async signInWithGooglePopup({ commit, dispatch }) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in state
        return new Promise((resolve, reject) => {
            // 1) First sign in with Google
            auth.signInWithPopup(GoogleAuthProvider).then(authData => {
                // console.log('authData: ', authData)
                // console.log('authData.user: ', authData.user)
                const userId = authData.user ? authData.user.uid : null
                // console.log('userId: ', userId)
                // 2) Then update users state
                firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                    const registeredUser = {
                        ...doc.data(),
                        id: doc.id  
                    }
                    // console.log('registeredUser: ', registeredUser)

                    // If user does not exists, save user data in database at the users node
                    if (!registeredUser.private) {
                        return axios.post('/register-new-user', {
                            type: 'oauth',
                            data: authData
                        })
                        .then(response => {
                            // Load newly registered user in store
                            // console.log('response: ', response)
                            // console.log('response.data: ', response.data)
                            commit('users/setLoadedUser', response.data.newUser, { root: true })
                            resolve()      
                        })
                        .catch(function(error) {
                            reject(error)
                        })
                    } else {
                        commit('users/setLoadedUser', registeredUser, { root: true })
                        resolve()
                    }
                })
            }).catch(error => {
                // console.log(error)
                commit('setError', error, { root: true })
                reject(error)
            }) 
        })
    },
    async signInWithFacebookPopup({ commit }) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in state
        return new Promise((resolve, reject) => {
            // commit('setLoading', true, { root: true })
            // 1) First sign in with Facebook
            auth.signInWithPopup(FacebookAuthProvider).then(authData => {
                // console.log('authData: ', authData)
                // console.log('authData.user: ', authData.user)
                const userId = authData.user ? authData.user.uid : null
                // console.log('userId: ', userId)
                // 2) Then update users state
                firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                    const registeredUser = {
                        ...doc.data(),
                        id: doc.id  
                    }
                    // console.log('registeredUser: ', registeredUser)

                    // If user does not exists, save user data in database at the users node
                    if (!registeredUser.private) {
                        return axios.post('/register-new-user', {
                            type: 'oauth',
                            data: authData
                        })
                        .then(response => {
                            // Load newly registered user in store
                            // console.log('response: ', response)
                            // console.log('response.data: ', response.data)
                            commit('users/setLoadedUser', response.data.newUser, { root: true })
                            resolve()
                        })
                        .catch(function(error) {
                            reject(error)
                        })
                    } else {
                        commit('users/setLoadedUser', registeredUser, { root: true })
                        resolve()
                    }
                })
            }).catch(error => {
                // console.log(error)
                commit('setError', error, { root: true })
                reject(error)
            }) 
        })
    },
    async resetPassword ({ commit }, payload) {
        // console.log('payload: ', payload)
        // var auth = firebase.auth();
        // var emailAddress = "user@example.com";

        auth.sendPasswordResetEmail(payload).then(function() {
            console.log('Email sent')
        }).catch(function(error) {
            console.log('error: ', error)
        })
    },
    async sendVerificationEmail ({ commit }, authData) {
        try {
            await authData.user.sendEmailVerification()
        } catch (error) {
            // console.log('error3: ', error)
            throw error
        }
    },
    async signOut({ commit }) {
        commit('setLoading', true, { root: true })
        await auth.signOut()
        commit('users/setLoadedUser', null, { root: true })
        // commit('authorizations/setUserAuthorizations', null, { root: true })
        commit('setLoading', false, { root: true })
    },
    async currentUserIdToken () {
        if (auth.currentUser) {
            return auth.currentUser.uid
        } else {
            return 'No auth user found.'
        }
    }
}

export const getters = {}
