export const strict = false
import { firestore } from "~/plugins/firebase-client-init.js"

export const state = () => ({
	templates: [],
})

export const mutations = {
	setTemplates (state, payload) {
		console.log('Call to setTemplates mutation: ', payload)
		state.templates = payload
	}
}

export const actions = {
	async fetchTemplates ({ commit }) {
		console.log('Call to fetchTemplates action')
		const snapshot = await firestore.collection('templates').get()
		const templatesArray = []
		snapshot.forEach(doc => {
			templatesArray.push({...doc.data(), id: doc.id})
		})
		console.log('templatesArray: ', templatesArray)
		commit('setTemplates', templatesArray)
	}
}

export const getters = {
	loadedTemplates (state) {
		return state.templates
	}
}