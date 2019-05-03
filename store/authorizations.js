export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'
import Noty from 'noty'

export const state = () => ({
	user_received_authorizations_array: [],
	user_received_authorizations_object: {},
	user_given_authorizations_array: [],
	// user_given_authorizations_object: {}
})

export const mutations = {
	setUserReceivedAuthorizationsArray (state, payload) {
		console.log('Call to setUserAuthorizationsArray mutation: ', payload)
		state.user_received_authorizations_array = payload
        // state.loadedEvents = Object.assign({}, state.loadedEvents, { [payload.date]: payload })
	},
	setUserReceivedAuthorizationsObject (state, payload) {
		state.user_received_authorizations_object = payload
	},
	setUserGivenAuthorizationsArray (state, payload) {
		console.log('Call to setUserGivenAuthorizationsArray mutation: ', payload)
		state.user_given_authorizations_array = payload
	},
	// setUserGivenAuthorizationsObject (state, payload) {
	// 	state.user_given_authorizations_object = payload
	// }
}

export const actions = {
	async fetchUserReceivedAuthorizations ({ commit, rootState }) {
		console.log('Call to fetchUserReceivedAuthorizations actions')
		try {
			const userId = rootState['users']['user']['id']
			// console.log('userId: ', userId)
			firestore.collection('authorizations').where('user.id', '==', userId).onSnapshot(snapshot => {
				let authorizationsObject = {}
				const authorizationsArray = []
				snapshot.forEach(doc => {
					authorizationsObject[doc.data().resume.id] = { ...doc.data() }
					authorizationsArray.push({ ...doc.data(), id: doc.id })
				})
				commit('setUserReceivedAuthorizationsObject', authorizationsObject)
				commit('setUserReceivedAuthorizationsArray', authorizationsArray)
			})
		} catch (error) {
			throw error
		}
	},
	async fetchUserGivenAuthorizations ({ commit, rootState }) {
		try {
			console.log('Call to fetchUserGivenAuthorizations actions')
			const userId = rootState['users']['user']['id']
			firestore.collection('authorizations').where('resume.user_id', '==', userId).onSnapshot(snapshot => {
				// let userAuthorizationObject = {}
				const authorizationsArray = []
				snapshot.forEach(doc => {
					// console.log('doc.data().resumes: ', doc.data().resumes)
					// userAuthorizations.push(doc.data().resumes)
					// authorizationsObject[doc.data().resume.id] = { ...doc.data() }
					authorizationsArray.push({ ...doc.data(), id: doc.id })
				})
				// commit('setUserGivenAuthorizationsObject', authorizationsObject)
				commit('setUserGivenAuthorizationsArray', authorizationsArray)
			})
		} catch (error) {
			throw error
		}
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
	loadedUserGivenAuthorizationsArray (state) {
		return state.user_given_authorizations_array
	},
	// loadedUserGivenAuthorizationsObject (state) {
	// 	return state.user_given_authorizations_object
	// }
}