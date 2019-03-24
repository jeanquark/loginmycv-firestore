export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'

export const state = () => ({
	languages: []
})

export const mutations = {
	setLanguages (state, payload) {
		state.languages = payload
	}
}

export const actions = {
	async fetchLanguages ({ commit }, payload) {
		const snapshot = await firestore.collection('languages').get();

		const languagesArray = []
		snapshot.forEach(language => {
			languagesArray.push(language.data())
		})
		commit('setLanguages', languagesArray)
	}
}

export const getters = {
	loadedLanguages (state) {
		return state.languages
	}
}