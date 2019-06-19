export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'

export const state = () => ({
	packages: []
})

export const mutations = {
	setPackages (state, payload) {
		state.packages = payload
	}
}

export const actions = {
	async fetchPackages ({ commit }, payload) {
		const snapshot = await firestore.collection('packages').orderBy('price').get();

		const packagesArray = []
		snapshot.forEach(pack => {
			packagesArray.push(pack.data())
		})
		commit('setPackages', packagesArray)
	}
}

export const getters = {
	loadedPackages (state) {
		return state.packages
	}
}