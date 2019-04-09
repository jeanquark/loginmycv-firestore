export const strict = false
import { firestore, storage, auth } from '~/plugins/firebase-client-init.js'
import moment from 'moment'
import Noty from 'noty'
import axios from 'axios'

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
			skills: [],
			uploads: [],
			others: []
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
			// Resume was already created serverside, there remains to upload images and files
			console.log('payload: ', payload)

			// 1) Send resume to server to save
			const config = { headers: { 'Content-Type': 'multipart/form-data' } };
			let formData = new FormData();
			formData.append('data', JSON.stringify(payload))
			for (let fileUpload of payload.uploads) {
				formData.append('file', fileUpload)
			}
			const createNewResume = await axios.post('/create-new-resume', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'app-key': process.env.APP_KEY
				}
			})
			console.log('createNewResume: ', createNewResume)
			const newResumeId = createNewResume.data.resume_long_id

			if (newResumeId) {
				// 2) Upload & save picture
				if (payload.personal_data.picture) {
					console.log('Save picture')
					const picture = payload.personal_data.picture
					const storageFileRef = storage.ref('resumes').child(`${payload.user_id}/${picture.name}`)
					const uploadedPicture = await storageFileRef.put(picture)
					const downloadUrl = await uploadedPicture.ref.getDownloadURL()
					const newPicture = {
						name: uploadedPicture.metadata.name,
						size_in_bytes: uploadedPicture.metadata.size,
						downloadUrl: downloadUrl,
						_created_at: moment().unix(),
						_updated_at: moment().unix()
					}
					console.log('newPicture', newPicture)
					// firestore.collection('resumes_long').doc(newResumeId).update({
					// 	'personal_data.picture': newPicture
					// })
				}

				// 3) Upload & save files
				if (payload.uploads.length > 0) {
					let uploadedFiles = []
					for (const [index, file] of payload.uploads.entries()) {
						console.log('Save files')
						const storageFileRef = storage.ref('resumes').child(`${payload.user_id}/${file.name}`)
						const uploadedFile = await storageFileRef.put(file)
						const downloadUrl = await uploadedFile.ref.getDownloadURL()
						const newFile = {
							name: uploadedFile.metadata.name,
							size_in_bytes: uploadedFile.metadata.size,
							downloadUrl: downloadUrl,
							_created_at: moment().unix(),
							_updated_at: moment().unix()
						}
						uploadedFiles.push(newFile)	
					}
					console.log('uploadedFiles: ', uploadedFiles)
					// firestore.collection('resumes_long').doc(newResumeId).update({
					// 	uploads: uploadedFiles						
					// })
				}
			} else {
				// An error occured on the server, send it back to the frontend
				throw createNewResume.data.error
			}
		} catch (error) {
			throw error
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
		const authUserId = rootState.users ? rootState.users.user.id : null
		console.log('authUserId: ', authUserId)

		// Read data once
		// const snapshot = await firestore.collection('resumes_long').where('user_id', '==', authUserId).get()
		// let userResumes = []
		// snapshot.forEach(doc => {
		// 	userResumes.push({
		// 		id: doc.id,
		// 		...doc.data()
		// 	})
		// })

		// Get realtime updates
		// const snapshot = await firestore.collection('resumes_long').where('user_id', '==', authUserId).onSnapshot()
		// let userResumes = []
		// snapshot.forEach(doc => {
		// 	userResumes.push({
		// 		id: doc.id,
		// 		...doc.data()
		// 	})
		// })
		// commit('setUserResumes', userResumes)

		firestore.collection('resumes_long').where('user_id', '==', authUserId).onSnapshot(snapshot => {
        	const userResumes = []
			snapshot.forEach(doc => {
				userResumes.push({
					id: doc.id,
					...doc.data()
				})
			})
			commit('setUserResumes', userResumes)
    	})
	
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