export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'
import firebase from 'firebase/app'

export const state = () => ({
	loadedUser: null
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
	}
}