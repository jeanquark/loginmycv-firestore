import { firestore, auth, GoogleAuthProvider, FacebookAuthProvider } from '~/plugins/firebase-client-init.js'
import axios from 'axios'
// import Noty from 'noty'
// import moment = require('moment')
// import moment from 'moment'

export const state = () => ({})

export const mutations = {}

export const actions = {
    async signUserIn ({ commit }, payload) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in vuex state
        return new Promise((resolve, reject) => {
            commit('setLoading', true, { root: true })
            auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(authData => {
                console.log('authData: ', authData)
                console.log('authData.user.uid: ', authData.user.uid)
                let userId = authData.user.uid

                if (!authData.user.emailVerified) {
                    auth.signOut()
                    .then(() => {
                        console.log('You were immediately signed out because your email is not verified.')
                        throw { code: 'email_not_verified', message: 'Your email address is not verified.', authData }
                    })
                    .catch(error => {
                        console.log('error2: ', error)
                        commit('setError', error, { root: true })
                        reject(error)
                    })
                } else {
                    console.log('Email is verified, continue sign in.')
                    firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                        const user = {
                            ...doc.data(),
                            id: doc.id  
                        }
                        console.log('user: ', user)
                        commit('users/setLoadedUser', user, { root: true })
                        commit('setLoading', false, { root: true })
                        resolve()
                    })
                }
            }).catch(error => {
                console.log('error: ', error)
                commit('setError', error, { root: true })
                commit('setLoading', false, { root: true })
                reject(error)
            })
        })
    },
    async signUserIn2 ({ commit }, payload) {
        try {
            commit('setLoading', true, { root: true })
            let authData = await auth.signInWithEmailAndPassword(payload.email, payload.password)
            console.log('authData: ', authData)
            console.log('authData.user.uid: ', authData.user.uid)
            let userId = authData.user.uid
            
            let that = this
            firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                console.log('doc.data(): ', doc.data())
                const user = {
                    ...doc.data(),
                    id: doc.id
                }
                console.log('user: ', user)
                commit('users/setLoadedUser', user, { root: true })
                console.log('Redirect now!')
                commit('setLoading', false, { root: true })
                // that.$router.push('/gamemode_jm')
            })
        } catch(error) {
            console.log('error: ', error)
            commit('setLoading', false, { root: true })
            commit('setError', error, { root: true })
            throw new Error(error)
        }
    },
    async signUserIn3 ({ commit }, payload) {
        console.log(payload)
        try {
            commit('setLoading', true, { root: true })
            let authData = await auth.signInWithEmailAndPassword(
                payload.email,
                payload.password
            )
            // console.log('authData: ', authData)
            // console.log('authData.user.uid: ', authData.user.uid)
            const userId = authData.user.uid
            // console.log('userId: ', userId)

            const snapshot = await firestore.collection('users').doc(userId).get()
            const user = {
                ...snapshot.data(),
                id: snapshot.id
            }

            // console.log('snapshot: ', snapshot)
            // console.log('user: ', user)

            commit('users/setLoadedUser', user, { root: true })
            commit('setLoading', false, { root: true })
        } catch (error) {
            console.log(error)
            commit('setLoading', false, { root: true })
            commit('setError', error, { root: true })
            throw new Error(error)
        }
    },

    async signVisitorIn ({ commit }, payload) {
        try {
            console.log('payload: ', payload)
            // const username = `${payload.form.username}@visitor.loginmycv.com`
            const username = `${payload.slug}@visitor.loginmycv.com`
            console.log('username: ', username)
            let authData = await auth.signInWithEmailAndPassword (
                username,
                payload.password
            )
            console.log('authData: ', authData)
            const authUserId = authData.user.uid
            console.log('authUserId: ', authUserId)
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
            console.log('error2: ', error)
            commit('setError', error, { root: true })
            throw new Error(error)
            // return
        }

        // const authUserId = 'LiBYgaTsW9UgzNjhwu0bhQn4O883'
        // const slug = 'greg'
    },
    async signUserUp({ commit, dispatch }, payload) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in vuex state
        return new Promise((resolve, reject) => {
            console.log('payload: ', payload)
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
                console.log('authData2: ', authData)
                console.log('Process server side registration.')
                authData.firstname = payload.firstname
                authData.lastname = payload.lastname
                return axios.post('/register-new-user', { data: authData })
            })
            .then(verificationEmail => {
                console.log('Email sent: ', verificationEmail)
                return auth.signOut()
            })
            .then(() => {
                console.log('You were immediately signed out because your email is not verified. Open login modal.')
                resolve()
            }).catch (error => {
                console.log('error from firebase auth: ', error)
                commit('setLoading', false, { root: true })
                reject(error)
            })
        })
    },
    async signUserUp2({ commit, dispatch }, payload) {
        try {
            console.log('payload: ', payload)
            let authData = await auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password
            )
            // console.log('authData.user.uid: ', authData.user.uid)
            // authData.user['firstname'] = payload.firstname
            authData.firstname = payload.firstname
            // authData.user['lastname'] = payload.lastname
            authData.lastname = payload.lastname
            // authData.user.email = payload.email
            
            // authData['user']['firstname'] = payload.firstname
            // authData['user']['lastname'] = payload.lastname
            // authData['user']['email'] = payload.email
            
            console.log('authData: ', authData)

            const snapshot = await axios.post('/register-new-user', {
                data: authData
            })
            const newUser = snapshot.data.newUser
            console.log('newUser: ', newUser)
            // dispatch('users/fetchAuthenticatedUser', newUser, { root: true })
            commit('users/setLoadedUser', newUser, { root: true })
            window.location.replace('/candidate/resumes')
        } catch (error) {
            console.log('error: ', error)
            commit('setLoading', false, { root: true })
            throw error
        }
    },
    async signInWithGooglePopup({ commit, dispatch }) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in state
        return new Promise((resolve, reject) => {
            // commit('setLoading', true, { root: true })
            // 1) First sign in with Google
            let userId = ''
            // let authData = ''
            auth.signInWithPopup(GoogleAuthProvider).then(authData => {
                console.log('authData: ', authData)
                console.log('authData.user: ', authData.user)
                userId = authData.user.uid
                console.log('userId: ', userId)
                // 2) Then update users state
                firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                    const registeredUser = {
                        ...doc.data(),
                        id: doc.id  
                    }
                    console.log('registeredUser: ', registeredUser)

                    // If user does not exists, save user data in database at the users node
                    if (!registeredUser.private) {
                        return axios.post('/register-new-user', {
                            type: 'oauth',
                            data: authData
                        })
                        .then(response => {
                            // Load newly registered user in store
                            console.log('response: ', response)
                            console.log('response.data: ', response.data)
                            commit('users/setLoadedUser', response.data.newUser, { root: true })
                            resolve()                            
                        })
                        .catch(function(error) {
                            // commit('setLoading', false, { root: true })
                            reject(error)
                        })
                    } else {
                        commit('users/setLoadedUser', registeredUser, { root: true })
                        resolve()
                    }
                })
            }).catch(error => {
                // commit('setLoading', false, { root: true })
                console.log(error)
                reject(error)
            }) 
        })
    },
    async signInWithGooglePopup2({ commit, dispatch }) {
        try {
            // commit('setLoading', true, { root: true })
            let authData = await auth.signInWithPopup(GoogleAuthProvider)
            console.log('authData: ', authData)
            console.log('authData.user: ', authData.user)
            const userId = authData.user.uid
            console.log('userId: ', userId)

            // Check if user already exists in database
            const snapshot = await firestore.collection('/users/').doc(userId).get()
            if (!snapshot.exists) {
                // Register new user
                const registerNewUser = await axios.post('/register-new-user', {
                    type: 'oauth',
                    data: authData
                })
                const newUser = registerNewUser.data.newUser
                console.log('newUser: ', newUser)
                // commit('setLoading', false, { root: true })
                // await dispatch('users/fetchAuthenticatedUser', newUser, { root: true })
                commit('users/setLoadedUser', newUser, { root: true })
                // window.location.replace('/candidate/resumes')
            } else {
                const user = {
                    ...snapshot.data(),
                    id: snapshot.id
                }
                console.log('user: ', user)
                // commit('setLoading', false, { root: true })
                // await dispatch('users/fetchAuthenticatedUser', user, { root: true })
                commit('users/setLoadedUser', newUser, { root: true })
                window.location.replace('/candidate/resumes')
            }
        } catch (error) {
            console.log('error: ', error)
            commit('setError', error, { root: true })
            // commit('setLoading', false, { root: true })
            throw error
        }
    },
    async signInWithFacebookPopup({ commit }) {
        // Promise is necessary so that redirection does not occur when user is not already loaded in state
        return new Promise((resolve, reject) => {
            // commit('setLoading', true, { root: true })
            // 1) First sign in with Google
            let userId = ''
            // let authData = ''
            auth.signInWithPopup(FacebookAuthProvider).then(authData => {
                console.log('authData: ', authData)
                console.log('authData.user: ', authData.user)
                userId = authData.user.uid
                console.log('userId: ', userId)
                // 2) Then update users state
                firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                    const registeredUser = {
                        ...doc.data(),
                        id: doc.id  
                    }
                    console.log('registeredUser: ', registeredUser)

                    // If user does not exists, save user data in database at the users node
                    if (!registeredUser.private) {
                        return axios.post('/register-new-user', {
                            type: 'oauth',
                            data: authData
                        })
                        .then(response => {
                            // Load newly registered user in store
                            console.log('response: ', response)
                            console.log('response.data: ', response.data)
                            commit('users/setLoadedUser', response.data.newUser, { root: true })
                            resolve()
                        })
                        .catch(function(error) {
                            // commit('setLoading', false, { root: true })
                            reject(error)
                        })
                    } else {
                        commit('users/setLoadedUser', registeredUser, { root: true })
                        resolve()
                    }
                })
            }).catch(error => {
                // commit('setLoading', false, { root: true })
                console.log(error)
                reject(error)
            }) 
        })
    },
    async resetPassword ({ commit }, payload) {
        console.log('payload: ', payload)
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
            console.log('error3: ', error)
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
