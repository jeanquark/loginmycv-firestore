import moment from 'moment'
import { firestore } from '~/plugins/firebase-client-init.js'

export const strict = false

export const state = () => ({
    loading: false,
    loadingResume: false,
    loadingFiles: false,
    error: {},
    errors: [],
    notification: {} 
})

export const mutations = {
    setLoading (state, payload) {
        state.loading = payload
    },
    setLoadingResume (state, payload) {
        state.loadingResume = payload
    },
    setLoadingFiles (state, payload) {
        state.loadingFiles = payload
    },
    setError (state, payload) {
        console.log('setError mutation called')
        state.error = payload
    },
    setNotification (state, payload) {
        state.notification = payload
    },
    addError (state, payload) {
        console.log('addError mutation called')
        console.log(payload)
        state.errors.push(payload)
    },
    clearError (state) {
        console.log('Call to clearError mutation')
        state.error = null
        state.errors = []
    }
}

export const actions = {
    // ORIGINAL nuxtServerInit function
    // nuxtServerInit ({commit}, {req}) {
    //     if (req.user) {
    //         console.log('Entering nuxtServerInit')
    //         console.log(req.user)
    //         commit('users/setUser', req.user, { root: true })
    //     }
    // },

    async nuxtServerInit ({ commit, dispatch }, { req }) {
        console.log('Entering nuxtServerInit', moment().format('DD-MM-YYYY HH:mm:ss'))
        if (req.user) {
            console.log('User is logged in from nuxtServerInit')
            console.log('req.user: ', req.user)
            // commit('users/setLoadedUser', req.user, { root: true })
            // await dispatch('users/fetchAuthenticatedUser', req.user)
            // const userId = req.user.uid
            // console.log("userId: ", userId)
            // // dispatch('users/loadedUser', userId, { root: true})
            // commit("users/setLoadedUser", req.user, { root: true })
            // this.$router.push({ path: "home" })

            // await dispatch('users/fetchAuthenticatedUser', req.user)
            commit('users/setLoadedUser', req.user, { root: true })
        } else {
            console.log('User is not logged in from nuxtServerInit')
        }
    },
    async nuxtClientInit({ commit, rootGetters }) { // Added package (not present in default nuxt)
        try {
            console.log('nuxtClientInit')
            const userId = rootGetters['users/loadedUser'] ? rootGetters['users/loadedUser'].uid : null
            console.log('userId from nuxtClientInit: ', userId)
            // const userId = 'AdGWmQi4aadNeVgQxkfRKZHQzvb2'
            
            if (userId) {
                // const snapshot = await firestore.collection('users').doc(userId).collection('private').doc(userId).get()
                // console.log('snapshot.data(): ', snapshot.data())
                firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                    // console.log('doc.data() from nuxtClientInit: ', doc.data())
                    commit('users/setLoadedUser', { ...doc.data(), id: doc.id }, { root: true })
		            // commit('users/setLoadedUser', { ...doc.data(), private: snapshot.data(), id: doc.id })
                })
            }
        } catch (error) {
            console.log('nuxtClientInit error: ', error)
        }
      }
}

export const getters = {
    loading (state) {
        return state.loading
    },
    loadingResume (state) {
        return state.loadingResume
    },
    loadingFiles (state) {
        return state.loadingFiles
    },
    error (state) {
        return state.error
    },
    errors (state) {
        return state.errors
    },
    notification (state) {
        return state.notification
    }
}
