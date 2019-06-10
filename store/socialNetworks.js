export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'

export const state = () => ({
	socialNetworks: []
})

export const mutations = {
	setSocialNetworks (state, payload) {
		state.socialNetworks = payload
	}
}

export const actions = {
	async fetchSocialNetworks ({ commit }) {
		console.log('fetchSocialNetworks')
		const snapshot = await firestore.collection('social_networks').get();

		const socialNetworksArray = []
		snapshot.forEach(socialNetwork => {
			socialNetworksArray.push(socialNetwork.data())
		})
		commit('setSocialNetworks', socialNetworksArray)
	}
}

export const getters = {
	loadedSocialNetworks (state) {
		return state.socialNetworks
	}
}