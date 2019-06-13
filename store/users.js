export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'
import firebase from 'firebase/app'
import axios from 'axios'
import moment from 'moment'

export const state = () => ({
	loadedUser: null,
	loadedAllUsers: []
})

export const mutations = {
	setLoadedUser (state, payload) {
		console.log('Call to setLoadedUser mutation: ', payload)
		// if (!payload.id) {
		// 	payload['id'] = payload.uid
		// }
		// const email = payload.email
		// console.log('email: ', email)
		// if (email && email.substr(email.length - 22 === '@visitor.loginmycv.com')) {
		// if (email === 'jeanquark3@visitor.loginmycv.com') {
			// payload.status = 'visitor'
		// }
		state.loadedUser = payload
	},
	setAllUsers (state, payload) {
		state.loadedAllUsers = payload
	}
}

export const actions = {
	async fetchAuthenticatedUser ({ commit }, payload) {
		console.log('Call to fetchAuthenticatedUser action: ', payload)
		const userId = payload.id
		if (userId) {
			firestore.collection('users').doc(userId).onSnapshot(function(doc) {
				commit('users/setLoadedUser', { ...doc.data(), id: doc.id }, { root: true })
			})
        }
	},
	async fetchAllUsers ({ commit }) {
		console.log('Call to fetchAllUsers action')
		// const snapshot = await firestore.collection('users').get()
		// console.log('snapshot: ', snapshot.docs.map(doc => doc.data()))
        // commit('setAllUsers', snapshot.docs.map(doc => doc.data()))
        firestore.collection('users').onSnapshot(function (querySnapshot) {
            const users = []
            querySnapshot.forEach(function (doc) {
                users.push(doc.data());
            })
            console.log('users: ', users)
            commit('setAllUsers', users)
        })
	},
	async updateUserAccount({ commit, state, dispatch }, payload) {
        // We have to update user custom claims in token and user status in database
        console.log('async updateUserAccount')
        try {
            const userId = payload.user.id
            const userEmail = payload.user.email
            const action = payload.action
            let status = {}
            if (action == 'userToAdmin') {
                status = {
                    value: 'admin',
                    _updated_at: moment().unix()
                }
            } else if (action == 'adminToUser') {
                status = {
                    value: 'user',
                    _updated_at: moment().unix()
                }
            }
            console.log('status: ', status)

            const customClaims = await axios.post('/set-custom-claims', { userEmail, action })
            console.log('customClaims: ', customClaims)
            return

            let promises = []
            promises.push(axios.post('/set-custom-claims', { userEmail, action }))
            promises.push(axios.post('/update-user-status', { userId, status }))

            axios
                .all(promises)
                .then(
                    axios.spread(function(claims, status) {
                        console.log('claims: ', claims)
                        console.log('status: ', status)
                        new Noty({
                            type: 'success',
                            text: 'Successfully updated user status.',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                    })
                )
                .catch(error => {
                    console.log('error: ', error)
                    new Noty({
                        type: 'error',
                        text: 'Could not update user status.' + error,
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
	async deleteUserNotifications ({ rootGetters }) {
		const userId = rootGetters['users/loadedUser'].id
		const notifications = rootGetters['users/loadedUser'].notifications
		// console.log('notifications: ', notifications)
		await firestore.collection('users').doc(userId).update({
			notifications: notifications.filter(notification => notification.type !== 'authorization')
		})
	}
}

export const getters = {
	loadedUser (state) {
		return state.loadedUser
	},
	loadedAllUsers (state) {
		return state.loadedAllUsers
	}
}