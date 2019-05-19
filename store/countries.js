export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'

export const state = () => ({
	countries: []
})

export const mutations = {
	setCountries (state, payload) {
		state.countries = payload
	}
}

export const actions = {
	async fetchCountries ({ commit }, payload) {
		const snapshot = await firestore.collection('countries').orderBy('name').get();

		const countriesArray = []
		snapshot.forEach(country => {
			countriesArray.push(country.data())
		})
		commit('setCountries', countriesArray)
	}
}

export const getters = {
	loadedCountries (state) {
		return state.countries
	}
}