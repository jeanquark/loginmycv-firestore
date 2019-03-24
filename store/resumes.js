export const strict = false
import { firestore, auth } from '~/plugins/firebase-client-init.js'
import moment from 'moment'
import Noty from 'noty'

export const state = () => ({
	resumes_short: [],
	resumes: [],
	userResumes: [],
	newResume: {}
})

// export const state = {
// 	resumes: []
// }

export const mutations = {
	setShortResumes (state, payload) {
		console.log('Call to setShortResumes mutation: ', payload)
		state.resumes_short = payload
	},
	setResumes (state, payload) {
		console.log('Call to setResumes mutation: ', payload)
		state.resumes = payload
	},
	setUserResumes (state, payload) {
		console.log('Call to setUserResumes mutation: ', payload)
		state.userResumes = payload
	},
	setEmptyResume (state) {
		state.newResume = {
			template_id: '',
			personal_data: {},
			education: [],
			work_experience: [],
			skills: []
		}
	},
	setNewResume (state, payload) {
		state.newResume = payload
	}
}

export const actions = {
	// async loadedShortResumes ({ commit }) {
	//     try {
	// 		var resumesRef = firestore.collection('resumes_short');
	//     	const shortResumesArray = []
	//         let allResumesSnapShot = await resumesRef.get();
	//         allResumesSnapShot.forEach(doc => {
	//             // console.log(doc.id, '=>', doc.data().image);
	//             shortResumesArray.push(doc.data())
	//         });
	//         console.log("end")
	//         console.log('shortResumesArray: ', shortResumesArray)
	//         commit('setShortResumes', shortResumesArray)
	//     }
	//     catch (error) {
	//         console.log('Error getting documents', error);
	//     }
	// },
	async storeNewResume ({ commit, rootState }, payload) {
		try {
			commit('setLoading', true, { root: true })
			const authUserId = rootState.users.user.id
			payload['user_id'] = authUserId
			payload['_created_at'] = moment().unix()
			payload['_updated_at'] = moment().unix()
			console.log('payload: ', payload)
			const resume_long = await firestore.collection('resumes_long').add(payload)
			console.log('resume_long: ', resume_long)
			console.log('resume_long.id: ', resume_long.id)

			const resume_short = await firestore.collection('resumes_short').add({
				slug: payload.slug,
				user_id: authUserId,
				resume_long_id: resume_long.id,
				firstname: payload.personal_data.firstname,
				lastname: payload.personal_data.lastname,
				job_title: payload.job_title,
				job_description: payload.job_description,
				country_of_residence: payload.personal_data.country_of_residence ? payload.personal_data.country_of_residence : null,
				languages: payload.personal_data.languages ? payload.personal_data.languages : null,
				key_competences: payload.personal_data.key_competences ? payload.personal_data.key_competences : null,
			})
			commit('setLoading', false, { root: true })
			new Noty({
				type: 'success',
				text: 'Your resume was successfully created.',
				timeout: 5000,
				theme: 'metroui'
			}).show()
		} catch (error) {
			commit('setLoading', false, { root: true })
			console.log('error: ', error)
			new Noty({
				type: 'error',
				text: 'Your resume could not be saved',
				timeout: 5000,
				theme: 'metroui'
			}).show()
		}
	},
	async updateResume ({ commit }, payload) {
		console.log('Call to updateResume: ', payload)
		try {
			commit('setLoading', true, { root: true })
			await firestore.collection('resumes_long').doc(payload.id).update(payload)
			commit('setLoading', false, { root: true })
			new Noty({
				type: 'success',
				text: 'Your resume was sucessfully updated',
				timeout: 5000,
				theme: 'metroui'
			}).show()
		} catch (error) {
			commit('setLoading', false, { root: true })
			console.log('error: ', error)
			new Noty({
				type: 'error',
				text: 'Your resume could not be saved',
				timeout: 5000,
				theme: 'metroui'
			}).show()
		}
	},
	async fetchShortResumes ({ commit }) {
		console.log('Call to fetchShortResumes actions')
		// firestore.collection('resumes_short').onSnapshot(function (querySnapshot) {
		firestore.collection('resumes_short').onSnapshot(snapshot => {
			const shortResumesArray = []
			snapshot.forEach(doc => {
				// shortResumesArray.push(doc.data())
				shortResumesArray.push({...doc.data(), id: doc.id})
			})
			console.log('shortResumesArray: ', shortResumesArray)
			commit('setShortResumes', shortResumesArray)
		})
	},
	async fetchResumes ({ commit }) {
		console.log('Call to fetchResumes action')
		const snapshot = await firestore.collection('resumes').get()
		const resumesArray = []
		snapshot.forEach(doc => {
			resumesArray.push(doc.data())
		})
		console.log('resumesArray: ', resumesArray)
		commit('setResumes', resumesArray)
	},
	async fetchUserResumes ({ commit, rootState }) {
		console.log('Call to fetchResume action')
		// const authUserId = auth.currentUser ? auth.currentUser.uid : null
		// const authUserId = getters['/users']
		// const authUserId = state.resumes.resumes_short[0]
		// console.log('rootState: ', rootState.users.user.uid)
		const authUserId = rootState.users ? rootState.users.user.id : null
		console.log('authUserId: ', authUserId)

		const snapshot = await firestore.collection('resumes_long').where('user_id', '==', authUserId).get()
		let userResumes = []
		snapshot.forEach(doc => {
			userResumes.push({
				id: doc.id,
				...doc.data()
			})
		})
		commit('setUserResumes', userResumes)
	}
}

export const getters = {
	loadedShortResumes (state) {
		return state.resumes_short
	},
	loadedResumes (state) {
		return state.resumes
	},
	loadedUserResumes (state) {
		return state.userResumes
	},
	loadedNewResume (state) {
		return state.newResume
	}
}