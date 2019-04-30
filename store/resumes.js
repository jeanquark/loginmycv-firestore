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
	},
	// setResumeUploads (state, payload) {
	// }
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
	async fetchShortResumes ({ commit }) {
		console.log('Call to fetchShortResumes actions')
		// firestore.collection('resumes_short').onSnapshot(function (querySnapshot) {
		firestore.collection('resumes_short').onSnapshot(snapshot => {
			const shortResumesArray = []
			snapshot.forEach(resume => {
				if (resume.data().privacy !== 'private') {
					shortResumesArray.push({...resume.data(), id: resume.id})
				}
			})
			console.log('shortResumesArray: ', shortResumesArray)
			commit('setShortResumes', shortResumesArray)
		})
	},
	fetchUserResumes ({ commit, rootState }) {
		console.log('Call to fetchUserResumes action')
		const authUserId = rootState.users && rootState.users.user ? rootState.users.user.id : null
		// const authUserId = auth.currentUser.uid
		console.log('authUserId: ', authUserId)

		firestore.collection('resumes_long').where('user_id', '==', authUserId).onSnapshot(snapshot => {
        	const userResumes = []
			snapshot.forEach(doc => { // Also include uploaded files
				// doc.ref.collection('uploads').doc(doc.id).get().then(childSnapshot => {
					userResumes.push({
						id: doc.id,
						// uploads: childSnapshot.data().uploads,
						...doc.data(),
					})
				// })
			})
			commit('setUserResumes', userResumes)
		})
	},
	// fetchResumeUploads ({ commit }, payload) {
	// 	const authUserId = auth.currentUser.uid
	// 	console.log('payload: ', payload)
	// 	const resumeId = payload
	// 	const resumeUploads = []
	// 	firestore.collection('resumes_long').doc(resumeId).collection('uploads').doc(resumeId).onSnapshot(snapshot => {
	// 		snapshot.forEach(doc => {
	// 			resumeUploads.push(
	// 				...doc.data()
	// 			)
	// 		})
	// 	})
	// 	commit('setResumeUploads', resumeUploads)
	// },
	async storeNewResume ({ commit, rootState }, payload) {
		try {
			console.log('payload: ', payload)

			// 1) Send resume to server to save
			// const config = { headers: { 'Content-Type': 'multipart/form-data' } };
			let formData = new FormData();
			formData.append('data', JSON.stringify(payload))
			for (let fileUpload of payload.uploads) {
				formData.append('file', fileUpload)
			}
			// Also add candidate picture
			formData.append('file', payload.personal_data.picture)

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
					for (const [index, upload] of payload.uploads.entries()) {
						console.log('Save files: ', upload)
						const storageFileRef = storage.ref('resumes').child(`${payload.user_id}/${upload.name}`)
						const uploadedFile = await storageFileRef.put(upload.file)
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
		try {
			// console.log('payload: ', payload)
			const oldResume = await firestore.collection('resumes_long').doc(payload.id).get();

			// 1) Get all files to delete
			const filesToDelete = []
			oldResume.data().uploads.forEach(file => {
				if (!payload.uploads.find(upload => upload.name === file.name && upload._updated_at === file._updated_at)) {
					filesToDelete.push(file)
				}
			})
			console.log('filesToDelete: ', filesToDelete)
			for (let file of filesToDelete) {
				const uploadRef = await storage.ref('resumes').child(`${payload.user_id}/${file.name}`)
				if (uploadRef) {
					uploadRef.delete()
				}
			}

			// 2) Get all files to upload
			const filesToAdd = []
			payload.uploads.forEach(upload => {
				if (!oldResume.data().uploads.find(file => file.name === upload.name && file._updated_at === upload._updated_at)) {
					filesToAdd.push(upload)
				}
			})
			console.log('filesToAdd: ', filesToAdd)
			for (let file of filesToAdd) {
				const uploadedFile = await storage.ref('resumes').child(`${payload.user_id}/${file.name}`).put(file.file)
				const downloadUrl = await uploadedFile.ref.getDownloadURL()
				const newUpload = {
					name: uploadedFile.metadata.name,
					size_in_bytes: uploadedFile.metadata.size,
					downloadUrl: downloadUrl,
					title: file.title,
					_created_at: moment().unix(),
					_updated_at: moment().unix()
				}
				console.log('newUpload: ', newUpload)
				const index = payload.uploads.findIndex(upload => upload.name === file.name)
				payload.uploads[index] = newUpload
			}
			console.log('payload2: ', payload)

			// 3) Update resume on the server
			const updatedResume = await axios.post('/update-resume', payload, {
				headers: {
					'app-key': process.env.APP_KEY
				}
			})
		} catch (error) {
			console.log('error from client: ', error)
			throw new Error(error)
		}	
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