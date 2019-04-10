export const strict = false
import { firestore } from "~/plugins/firebase-client-init.js"

export const state = () => ({
	user: null
})

export const mutations = {
	setLoadedUser (state, payload) {
		console.log('Call to setLoadedUser mutation: ', payload)
		// if (!payload.id) {
			// payload['id'] = payload.uid
		// }
		state.user = payload
	}
}

export const actions = {
	async fetchUser ({ commit }, payload) {
		console.log('Call to fetchUser action: ', payload)
		const snapshot = await firestore.collection('users').doc(payload).get()
		console.log('snapshot.id: ', snapshot.id)
		// commit('setLoadedUser', snapshot.data())
		// commit('setLoadedUser', { id: snapshot.id, ...snapshot.data() })
	},
	async fetchAuthenticatedUser ({ state, commit }, payload) {
		console.log('Call to fetchAuthenticatedUser action: ', payload)
		const snapshot = await firestore.collection('users').doc(payload.uid).get()
		// console.log('snapshot.data(): ', snapshot.data())
		// console.log('snapshot.id: ', snapshot.id)

		// Also get private data in subcollection
		const childSnapshot = await firestore.collection('users').doc(payload.uid).collection('private').doc(payload.uid).get()

		commit('setLoadedUser', { ...snapshot.data(), private: childSnapshot.data(), id: snapshot.id })
	}
}

export const getters = {
	loadedUser (state) {
		return state.user
	}
}