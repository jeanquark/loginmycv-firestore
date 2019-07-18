import moment from 'moment'
import { firestore } from '~/plugins/firebase-client-init.js'

export const strict = false

export const state = () => ({
    loading: false,
    loadingResume: false,
    loadingFiles: false,
    error: null,
    errors: [],
    notification: {},
    loginModal: false,
    requestAuthorizationModal: false,
    redirect: '',
    openComponent: null,
    darkTheme: true
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
        // console.log('setError mutation called')
        state.error = payload
    },
    // setNotification (state, payload) {
    //     state.notification = payload
    // },
    // addError (state, payload) {
    //     console.log('addError mutation called')
    //     console.log(payload)
    //     state.errors.push(payload)
    // },
    clearError (state) {
        // console.log('Call to clearError mutation: ')
        state.error = null
        state.errors = []
    },
    openLoginModal (state) {
        // console.log('openLoginModal')
        state.loginModal = true
    },
    closeLoginModal (state) {
        // console.log('closeLoginModal')
        state.loginModal = false
    },
    openRequestAuthorizationModal (state) {
        // console.log('openLoginModal')
        state.requestAuthorizationModal = true
    },
    closeRequestAuthorizationModal (state) {
        // console.log('closeLoginModal')
        state.requestAuthorizationModal = false
    },
    // setMessage (state, payload) {
    //     console.log('setMessage: ', payload)
    //     state.message = payload
    // },
    // clearMessage (state) {
    //     state.message = ''
    // },
    setRedirect (state, payload) {
        state.redirect = payload
    },
    clearRedirect (state) {
        state.redirect = null
    },
    setOpenComponent (state, payload) {
        // console.log('setOpenComponent: ', payload)
        state.openComponent = payload
    },
    clearOpenComponent (state) {
        state.openComponent = null
    },
    toggleTheme (state) {
        state.darkTheme = !state.darkTheme
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
        // console.log('Entering nuxtServerInit', moment().format('DD-MM-YYYY HH:mm:ss'))
        // console.log('req.headers.host: ', req.headers.host)
        if (req.user) {
            // console.log('User is logged in from nuxtServerInit')
            // console.log('req.user: ', req.user)
            commit('users/setLoadedUser', req.user, { root: true })
        } else {
			// console.log('User is not logged in from nuxtServerInit')
			// DO NOT PROCESS
        }
    },
    async nuxtClientInit({ commit, rootGetters }) { // Added package (not present by default in Nuxt)
        try {
            // console.log('nuxtClientInit')
            const userId = rootGetters['users/loadedUser'] ? rootGetters['users/loadedUser'].uid : null
            // console.log('userId from nuxtClientInit: ', userId)
            // const email = rootGetters['users/loadedUser'] ? rootGetters['users/loadedUser'].email : null
            
            if (userId) {
                firestore.collection('users').doc(userId).onSnapshot(function(doc) {
                    commit('users/setLoadedUser', { ...doc.data(), id: doc.id }, { root: true })
                })
            }
        } catch (error) {
			// console.log('nuxtClientInit error: ', error)
			// DO NOT PROCESS
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
    // notification (state) {
    //     return state.notification
    // },
    loginModal (state) {
        return state.loginModal
    },
    requestAuthorizationModal (state) {
        return state.requestAuthorizationModal
    },
    loadedRedirect (state) {
        return state.redirect
    },
    loadedOpenComponent (state) {
        return state.openComponent
    },
    loadedDarkTheme (state) {
        return state.darkTheme
    }
}
