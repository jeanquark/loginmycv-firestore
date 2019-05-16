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
			// payload['id'] = payload.uid
		// }
		state.loadedUser = payload
	}
}

export const actions = {
	// async fetchUser ({ commit }, payload) { // Not necessary?
	// 	console.log('Call to fetchUser action: ', payload)
	// 	const snapshot = await firestore.collection('users').doc(payload).get()
	// 	console.log('snapshot.id: ', snapshot.id)
	// 	// commit('setLoadedUser', snapshot.data())
	// 	// commit('setLoadedUser', { id: snapshot.id, ...snapshot.data() })
	// },
	async fetchAuthenticatedUser2 ({ state, commit }, payload) {
		console.log('Call to fetchAuthenticatedUser action: ', payload)
		const snapshot = await firestore.collection('users').doc(payload.uid).get()
		// console.log('snapshot.data(): ', snapshot.data())
		// console.log('snapshot.id: ', snapshot.id)

		// Also get private data in subcollection
		const childSnapshot = await firestore.collection('users').doc(payload.uid).collection('private').doc(payload.uid).get()

		commit('setLoadedUser', { ...snapshot.data(), private: childSnapshot.data(), id: snapshot.id })
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