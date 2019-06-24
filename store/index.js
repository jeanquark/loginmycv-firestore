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
    // message: '',
    redirect: '',
    // snackbar: {}
    openComponent: null
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
        console.log('Call to clearError mutation: ')
        state.error = null
        state.errors = []
    },
    openLoginModal (state) {
        console.log('openLoginModal')
        state.loginModal = true
    },
    closeLoginModal (state) {
        console.log('closeLoginModal')
        state.loginModal = false
    },
    openRequestAuthorizationModal (state) {
        console.log('openLoginModal')
        state.requestAuthorizationModal = true
    },
    closeRequestAuthorizationModal (state) {
        console.log('closeLoginModal')
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
        console.log('setOpenComponent: ', payload)
        state.openComponent = payload
    },
    clearOpenComponent (state) {
        state.openComponent = null
    },
    // setSnackbar (state, payload) {
    //     state.snackbar = {
    //         show: payload.show,
    //         type: payload.type,
    //         message: payload.message
    //     }
    // },
    // clearSnackbar (state, payload) {
    //     console.log('clearSnackbar!')
    //     state.snackbar = {
    //         show: false
    //     }
    // }
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
        // Check for subdomain:
        console.log('req.headers.host: ', req.headers.host)
        // context.redirect('http://google.ch')
        if (req.user) {
            console.log('User is logged in from nuxtServerInit')
            console.log('req.user: ', req.user)
            // commit('users/setLoadedUser', req.user, { root: true })
            // await dispatch('users/fetchAuthenticatedUser', req.user)
            // const userId = req.user.uid
            // console.log("userId: ", userId)
            // // dispatch('users/loadedUser', userId, { roost: true})
            // commit("users/setLoadedUser", req.user, { root: true })
            // this.$router.push({ path: "home" })

            // await dispatch('users/fetchAuthenticatedUser', req.user)
            // if (req.user.email === 'jeanquark3@visitor.loginmycv.com') {
                // req.user['status'] = 'visitor'
            // }
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
            const email = rootGetters['users/loadedUser'] ? rootGetters['users/loadedUser'].email : null
            
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
    },
    loginModal (state) {
        return state.loginModal
    },
    requestAuthorizationModal (state) {
        return state.requestAuthorizationModal
    },
    // loadedMessage (state) {
    //     return state.message
    // },
    loadedRedirect (state) {
        return state.redirect
    },
    // snackbar (state) {
    //     return state.snackbar
    // }
    loadedOpenComponent (state) {
        return state.openComponent
    }
}
