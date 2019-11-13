export const strict = false
import { firestore } from "~/plugins/firebase-client-init.js"
import firebase from 'firebase/app'

export const state = () => ({
	templates: [],
	lastVisible: null
})

export const mutations = {
	// setTemplates (state, payload) {
	// 	console.log('Call to setTemplates mutation: ', payload)
	// 	state.templates = payload
	// },
	addTemplates (state, payload) {
		state.templates = [...state.templates, ...payload]
		// state.template.push(...payload)
	},
	setLastVisible (state, payload) {
		state.lastVisible = payload
	}
}

export const actions = {
	async fetchTemplates ({ commit, state }) {
		try {
			console.log('Call to fetchTemplates action')
			let snapshot = {}
			// Fetch page 1 of templates
			if (state.templates.length < 1) {
				snapshot = await firestore.collection('templates').where('active', '==', true).orderBy(firebase.firestore.FieldPath.documentId()).limit(2).get()
				const lastVisible = snapshot.docs[snapshot.docs.length - 1]
				commit('setLastVisible', lastVisible.id)
			} else {
				// Fetch subsequent pages of templates
				const lastVisible = state.lastVisible
				console.log('lastVisible: ', lastVisible)
				snapshot = await firestore.collection('templates').where('active', '==', true).orderBy(firebase.firestore.FieldPath.documentId()).startAfter(lastVisible).limit(2).get()
				console.log('snapshot: ', snapshot)
				const updatedLastVisible = snapshot.docs[snapshot.docs.length - 1]
				console.log('updatedLastVisible: ', updatedLastVisible)
				if (updatedLastVisible) {
					commit('setLastVisible', updatedLastVisible.id)
				} 
			}

			const templatesArray = []
			snapshot.forEach(doc => {
				templatesArray.push({...doc.data(), id: doc.id})
			})
			console.log('templatesArray: ', templatesArray)
			// commit('setTemplates', templatesArray)
			commit('addTemplates', templatesArray)
		} catch (error) {
			throw error
		}
	},
	async fetchTemplate ({ commit }, payload) {
		try {
			console.log('Call to fetchTemplate action: ', payload)
			const doc = await firestore.collection('templates').doc(payload).get()
			if (doc.exists) {
				console.log('doc.data(): ', doc.data())
				return doc.data()
			}
			throw 'no_template_found'
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	}
}

export const getters = {
	loadedTemplates (state) {
		return state.templates
	}
}