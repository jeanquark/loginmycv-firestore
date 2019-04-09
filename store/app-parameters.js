export const strict = false
import { firestore } from "~/plugins/firebase-client-init.js"

export const state = () => ({
	app_parameters: {}
})

export const mutations = {
	setAppParameters (state, payload) {
        state.app_parameters = Object.assign({}, state.app_parameters, { [payload]: payload })
	}
}

export const actions = {
	async fetchAppParameters ({ commit }, payload) {
		const snapshot = await firestore.collection('app_parameters').get()
		// console.log('snapshot: ', snapshot)
		let appParameters = {}
		snapshot.forEach(doc => {
			console.log('doc.data().key: ', doc.data().key)
			appParameters[doc.data().key] = { ...doc.data() }
		})
		commit('setAppParameters', appParameters)
	}
}

export const getters = {
	loadedAppParameters (state) {
		return state.app_parameters
	}
}