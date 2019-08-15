export const strict = false
import { firestore } from '~/plugins/firebase-client-init.js'
import Noty from 'noty'
import axios from 'axios'

export const state = () => ({
	user_received_authorizations: [],
	user_received_authorizations_object: {},
	user_given_authorizations: [],
	// user_given_authorizations_object: {}
})

export const mutations = {
	setUserReceivedAuthorizations (state, payload) {
		console.log('Call to setUserAuthorizations mutation: ', payload)
		state.user_received_authorizations = payload
        // state.loadedEvents = Object.assign({}, state.loadedEvents, { [payload.date]: payload })
	},
	// Object for rapid lookup of user authorizations on each resume on homepage
	setUserReceivedAuthorizationsObject (state, payload) {
		state.user_received_authorizations_object = payload
	},
	setUserGivenAuthorizations (state, payload) {
		console.log('Call to setUserGivenAuthorizations mutation: ', payload)
		state.user_given_authorizations = payload
	},
	// setUserGivenAuthorizationsObject (state, payload) {
	// 	state.user_given_authorizations_object = payload
	// }
}

export const actions = {
	async fetchUserReceivedAuthorizations ({ commit, rootGetters }) {
		try {
			console.log('Call to fetchUserReceivedAuthorizations actions')
			const userId = rootGetters['users/loadedUser'].id ? rootGetters['users/loadedUser'].id : rootGetters['users/loadedUser'].uid
			// console.log('userId: ', userId)
			firestore.collection('authorizations').where('user.id', '==', userId).onSnapshot(snapshot => {
				let authorizationsObject = {}
				const authorizationsArray = []
				snapshot.forEach(doc => {
					authorizationsObject[doc.data().resume.id] = { ...doc.data() }
					authorizationsArray.push({ ...doc.data(), id: doc.id })
				})
				commit('setUserReceivedAuthorizationsObject', authorizationsObject)
				commit('setUserReceivedAuthorizations', authorizationsArray)
			})
		} catch (error) {
			console.log('error from fetchUserReceivedAuthorizations: ', error)
			throw error
		}
	},
	async fetchUserGivenAuthorizations ({ commit, rootGetters }) {
		try {
			console.log('Call to fetchUserGivenAuthorizations actions')
			const userId = rootGetters['users/loadedUser'].id
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
				commit('setUserGivenAuthorizations', authorizationsArray)
			})
		} catch (error) {
			console.log('error from fetchUserGivenAuthorizations: ', error)
			throw error
		}
	},
	async sendAuthorizationRequest ({ commit }, payload) {
		console.log('payload: ', payload)
		// await firestore.collection('authorizations').add({
			
		// })
	},
	async updateAuthorization ({ }, payload) {
		try {
			console.log('payload: ', payload)			
			await axios.post('/update-resume-authorization', payload)
		} catch (error) {
			console.log('error from updateAuthorization action')
			throw error
		}
	},
	async deleteAuthorization (payload) {
		try {
			console.log('payload: ', payload)
			await axios.post('/delete-resume-authorization', payload)
		} catch (error) {
			throw error
		}
	}
}

export const getters = {
	loadedUserReceivedAuthorizations (state) {
		return state.user_received_authorizations
	},
	loadedUserReceivedAuthorizationsObject (state) {
		return state.user_received_authorizations_object
	},
	loadedUserGivenAuthorizations (state) {
		return state.user_given_authorizations
	},
	// loadedUserGivenAuthorizationsObject (state) {
	// 	return state.user_given_authorizations_object
	// }
}