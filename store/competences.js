export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'

export const state = () => ({
	competences: []
})

export const mutations = {
	setCompetences (state, payload) {
		state.competences = payload
	}
}

export const actions = {
	async fetchCompetences ({ commit }, payload) {
		const snapshot = await firestore.collection('key_competences').get();

		const competencesArray = []
		snapshot.forEach(competence => {
			competencesArray.push(competence.data())
		})
		commit('setCompetences', competencesArray)
	}
}

export const getters = {
	loadedCompetences (state) {
		return state.competences
	}
}