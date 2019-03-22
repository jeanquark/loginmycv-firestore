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
	async setAuthenticatedUser ({ state, commit }, payload) {
		console.log('Call to fetchAuthenticatedUser action: ', payload)
		// const authUser = state.user.id
		const snapshot = await firestore.collection('users').doc(payload.uid).get()
		// const user = {
		// 	id: payload.uid,
		// 	email: payload.email,
		// 	firstname: payload.firstname
		// }
		console.log('snapshot.data(): ', snapshot.data())
		console.log('snapshot.id: ', snapshot.id)
		// commit('setLoadedUser', snapshot.data())
		commit('setLoadedUser', { ...snapshot.data(), id: snapshot.id })
	}
}

export const getters = {
	loadedUser (state) {
		return state.user
	}
}