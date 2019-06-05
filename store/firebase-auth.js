import { firestore, auth, GoogleAuthProvider, FacebookAuthProvider } from '~/plugins/firebase-client-init.js'
import axios from 'axios'
import Noty from 'noty'
// import moment = require('moment')
import moment from 'moment'

export const state = () => ({})

export const mutations = {}

export const actions = {
    async signUserIn ({ commit }, payload) {
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
    async signUserIn2 ({ commit }, payload) {
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
            commit("setLoading", false, { root: true })
            commit("setError", error, { root: true })
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
            commit("setError", error, { root: true })
            throw new Error(error)
            // return
        }

        // const authUserId = 'LiBYgaTsW9UgzNjhwu0bhQn4O883'
        // const slug = 'greg'
    },

    async signUserUp({ commit, dispatch }, payload) {
        try {
            let authData = await auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password
            )
            console.log('authData: ', authData)
            console.log('authData.user.uid: ', authData.user.uid)
            authData['firstname'] = payload.firstname,
            authData['lastname'] = payload.lastname
            authData['email'] = payload.email
            const snapshot = await axios.post('/register-new-user', {
                data: authData.user
            })
            const newUser = snapshot.data.newUser
            console.log('newUser: ', newUser)
            dispatch('users/fetchAuthenticatedUser', newUser, { root: true })
        } catch (error) {
            console.log('error: ', error)
            commit('setLoading', false, { root: true })
            if (error.code === 'auth/email-already-in-use') {
                new Noty({
                    type: 'error',
                    text: error.message,
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
            }
            // throw new Error(error)
            throw error
        }
    },

    async signInWithGooglePopup({ commit, dispatch }) {
        try {
            commit('setLoading', true, { root: true })
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
                    data: authData.user
                })
                const newUser = registerNewUser.data.newUser
                console.log('newUser: ', newUser)
                await dispatch('users/fetchAuthenticatedUser', newUser, { root: true })
                return
            } else {
                const user = {
                    ...snapshot.data(),
                    id: snapshot.id
                }
                console.log('user: ', user)
                await dispatch('users/fetchAuthenticatedUser', user, { root: true })
                commit('setLoading', false, { root: true })
                return
            }
        } catch (error) {
            console.log('error: ', error)
            commit('setError', error, { root: true })
            commit('setLoading', false, { root: true })
            throw error
        }
    },
    async signInWithFacebookPopup({ commit }) {
        try {
            
        } catch (error) {
            
        }
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
    async signOut({ commit }) {
        commit('setLoading', true, { root: true })
        await auth.signOut()
        commit('users/setLoadedUser', null, { root: true })
        // commit('authorizations/setUserAuthorizations', null, { root: true })
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
