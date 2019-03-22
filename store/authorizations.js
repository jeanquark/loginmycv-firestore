export const strict = false
import { firestore } from "~/plugins/firebase-client-init.js"

export const state = () => ({
	user_received_authorizations_array: [],
	user_received_authorizations_object: {},
	user_given_authorizations: []
})

export const mutations = {
	setUserReceivedAuthorizationsArray (state, payload) {
		console.log('Call to setUserAuthorizations mutation: ', payload)
		state.user_received_authorizations_array = payload
        // state.loadedEvents = Object.assign({}, state.loadedEvents, { [payload.date]: payload })
	},
	setUserReceivedAuthorizationsObject (state, payload) {
		state.user_received_authorizations_object = payload
	},
	setUserGivenAuthorizations (state, payload) {
		state.user_given_authorizations = payload
	}
}

export const actions = {
	async fetchUserReceivedAuthorizations ({ commit }, payload) {
		console.log('Call to fetchUserReceivedAuthorizations actions: ', payload)
		firestore.collection('authorizations').where('user.id', '==', payload).onSnapshot(snapshot => {
			let authorizationsObject = {}
			const authorizationsArray = []
			snapshot.forEach(doc => {
				// console.log('doc.data().resumes: ', doc.data().resumes)
				// userAuthorizations.push(doc.data().resumes)
				// userAuthorizations = doc.data()
				// Object.assign({}, userAuthorizations, { [doc.id]: {...doc.data()} })
				authorizationsObject[doc.data().resume.id] = { ...doc.data() }
				authorizationsArray.push(doc.data())
			})
			commit('setUserReceivedAuthorizationsObject', authorizationsObject)
			commit('setUserReceivedAuthorizationsArray', authorizationsArray)
		})
	},
	async fetchUserGivenAuthorizations ({ commit }, payload) {
		console.log('Call to fetchUserGivenAuthorizations actions: ', payload)
		firestore.collection('authorizations').where('resume.id', '==', payload).onSnapshot(snapshot => {
			// let userAuthorizations = {}
			const authorizationsArray = []
			snapshot.forEach(doc => {
				// console.log('doc.data().resumes: ', doc.data().resumes)
				// userAuthorizations.push(doc.data().resumes)
				// userAuthorizations = doc.data().resumes
				authorizationsArray.push({ ...doc.data(), id: doc.id })
			})
			// commit('setUserAuthorizations', userAuthorizations)
			commit('setUserGivenAuthorizations', authorizationsArray)
		})
	},
	async sendAuthorizationRequest ({ commit }, payload) {
		console.log('payload: ', payload)
		// await firestore.collection('authorizations').add({
			
		// })
	}
}

export const getters = {
	loadedUserReceivedAuthorizationsArray (state) {
		return state.user_received_authorizations_array
	},
	loadedUserReceivedAuthorizationsObject (state) {
		return state.user_received_authorizations_object
	},
	loadedUserGivenAuthorizations (state) {
		return state.user_given_authorizations
	}
}