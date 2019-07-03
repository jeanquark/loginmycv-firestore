export const strict = false
import { firestore, storage, auth } from '~/plugins/firebase-client-init.js'
import firebase from 'firebase/app'
import moment from 'moment'
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
			slug: 'johndoe',
			// slug: '',
			job_title: 'Web developer',
			// job_title: '',
			job_description: 'Develops websites & web apps',
			// job_description: '',
			personal_data: {
				firstname: 'John',
				// firstname: '',
				lastname: 'Doe',
				// lastname: '',
				email: 'john.doe@example.com'
				// email: ''
			},
			education: [],
			work_experience: [],
			skills: [],
			uploads: [],
			social_networks: [],
			visibility: '',
			active: true,
			colors: {},
			parameters: {},
			menus: [],
			labels: [],
			others: []
		}
	},
	setNewResume (state, payload) {
		// console.log('setNewResume: ', payload)
		state.newResume = payload
	}
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
		firestore.collection('resumes_short').where('active', '==', true).where('visibility', '>=', 'public').onSnapshot(snapshot => {
			const shortResumesArray = []
			snapshot.forEach(resume => {
				// if (resume.data().visibility !== 'private') {
					shortResumesArray.push({ ...resume.data(), id: resume.id })
				// }
			})
			console.log('shortResumesArray: ', shortResumesArray)
			commit('setShortResumes', shortResumesArray)
		})
	},
	async fetchLongResume ({ commit, dispatch, rootGetters }, payload) {
		try {
			console.log('Call to fetchLongResume action: ', payload)
			// 1) Fetch resume if its visibility is set to public or you are logged in as a visitor or it is your resume (see database rules) 
			const snapshot = await firestore.collection('resumes_long').doc(payload).get()
			const resume = {
				...snapshot.data(),
				id: snapshot.id
			}
			if (!resume.active) {
				throw 'resume_is_not_active'
			}
			console.log('resume from store: ', resume)

			// 2) Increment views counter if you are not accessing your own resume
			if (rootGetters['loadedUser'] && rootGetters['loadedUser'].id === resume.user_id) {
				return resume
			} else {
				console.log('rootGetters[loadedUser]: ', rootGetters['users/loadedUser'])
				dispatch('incrementViewCounter', { resumeId: resume.id, lastVisits: resume.statistics_last_visits })
				return resume
			}
		} catch (error) {
			console.log('error from fetchLongResume action: ', error)
			if (error === 'resume_is_not_active') {
				throw 'resume_is_not_active'
			}
		}
		console.log('next...')

		// 3) Try to fetch resume if user has authorization
		try {
			const slug = payload
			const authUser = rootGetters['users/loadedUser']
    		if (authUser && authUser.status != 'visitor') { // User is authenticated and is not a visitor
				const authUserId = authUser.id ? authUser.id : authUser.uid
				const resume = await axios.post('/check-user-authorization', { authUserId, slug })
				const status = resume.data ? resume.data.status : ''
				if (status === 'allowed') {
					// Increment views counter if authenticated user is not accessing his own resume
					if (resume.data.resume.user_id === authUserId) {
						return resume.data.resume
					} else {
						dispatch('incrementViewCounter', { resumeId: resume.data.resume.id, lastVisits: resume.data.resume.statistics_last_visits })
						return resume.data.resume
					}
				}
			}
		} catch (error) {
			console.log('error check-user-authorization: ', error)
		}
	},
	async fetchUserResumes ({ commit, rootGetters }) {
		try {
			console.log('Call to fetchUserResumes action')
			// const authUserId = auth.currentUser.uid
			const userId = rootGetters['users/loadedUser'].id
			// const userId = 'OlxfESwPtlgzz4vcjiL4YKsIDZI2'
			console.log('authUserId: ', userId)

			const snapshot = await firestore.collection('resumes_long').where('user_id', '==', userId).get()
			snapshot.forEach(doc => {
				console.log('doc.data(): ', doc.data())
			})

			if (userId) {
				firestore.collection('resumes_long').where('user_id', '==', userId).onSnapshot(snapshot => {
					const userResumes = []
					// console.log('snapshot: ', snapshot)
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
			}
		} catch (error) {
			console.log('error from fetchUserResumes: ', error)
		}
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
	async storeResume ({ commit, getters, rootGetters }, payload) {
		try {
			console.log('payload: ', payload)
			const newResume = payload
			const userPackageValidity = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.package_valid_until : null
			console.log('newResume: ', newResume)
            console.log('userPackageValidity: ', userPackageValidity)
			
			// 1) Create resume server-side
			const createdResume = await axios.post('/create-new-resume', { newResume, userPackageValidity}, {
				headers: {
					'app-key': process.env.APP_KEY
				}
			})
			console.log('createdResume: ', createdResume)
			const newLongResumeId = createdResume.data.newLongResumeId
			const newShortResumeId = createdResume.data.newShortResumeId

	        commit('setLoadingResume', false, { root: true })
	        commit('setLoadingFiles', true, { root: true })

	        // 2) Get all user existing uploads
			// await dispatch('fetchUserResumes')
			// const userExistingUploads = rootGetters['resumes/loadedUserResumes']
			const userExistingResumes = getters['loadedUserResumes']
            console.log('userExistingResumes: ', userExistingResumes)
            let totalUploadSize = 0
            if (userExistingResumes) {
	            userExistingResumes.forEach(resume => {
	            	if (resume && resume.uploads) {
		                resume.uploads.forEach(upload => {
		                    totalUploadSize += parseInt(upload.size_in_bytes)
		                })
	            	}
	            })
            }

			// 3) Get all new uploads file size
			const uploads = newResume.uploads
			const filesToAdd = []
			if (uploads) {
				uploads.forEach(upload => {
					totalUploadSize += parseInt(upload.size_in_bytes)				
					filesToAdd.push(upload)
				})
			}
			console.log('totalUploadSize: ', totalUploadSize)

			// 4) Check that total upload size does not exceed available space
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw {
					'not_enough_space': 'Files could not be uploaded because your do not have enough space.'
				}
			}
			console.log('filesToAdd: ', filesToAdd)
			console.log('totalUploadSize: ', totalUploadSize)
			console.log('userTotalSpace: ', userTotalSpace)

			// 5) Effectively upload files to storage
			for (let file of filesToAdd) {
				console.log('file: ', file)
				if (file.name && file.file) { // File is not already existent
					const uploadedFile = await storage.ref('resumes').child(`${newResume.user_id}/${file.name}`).put(file.file)
					const downloadUrl = await uploadedFile.ref.getDownloadURL()
					const newUpload = {
						name: uploadedFile.metadata.name,
						size_in_bytes: uploadedFile.metadata.size,
						downloadUrl: downloadUrl,
						title: file.title ? file.title : '',
						type: file.type,
						_created_at: moment().unix(),
						_updated_at: moment().unix()
					}
					console.log('newUpload: ', newUpload)
					const index = uploads.findIndex(upload => upload.name === file.name)
					uploads[index] = newUpload
				}
			}
			console.log('uploads2: ', uploads)
			// console.log('payload2: ', payload)
			// commit('setLoadingFiles', false, { root: true })
			// commit('setLoadingResume', true, { root: true })

			// 6) Update long & short resumes with uploads
			if (uploads && uploads.length > 0) {
				console.log('update resumes_long')
				await firestore.collection('resumes_long').doc(newLongResumeId).update({
					uploads
				})
				// console.log('newShortResume.id: ', newShortResume.id)
				const picture = uploads.find(upload => upload.type === 'profile_picture')
				console.log('picture: ', picture)
				if (picture) {
					console.log('update resumes_short')
					// console.log('newResume.user_id: ', newResume.user_id)
					await firestore.collection('resumes_short').doc(newShortResumeId).update({
					// await firestore.collection('resumes_short').where('resume_short_id', '==', newResume.user_id).update({
						picture: picture.downloadUrl
					})
				}
			}
		} catch (error) {
			console.log('error from storeResume action: ', error)
			if (error.response && error.response.data && error.response.data.error) {
				throw error.response.data.error
			}
			throw error
		}
	},
	async storeResume2 ({ commit, rootGetters }, payload) {
		try {
			console.log('payload: ', payload)
			commit('setLoadingFiles', true, { root: true })

			// 1) Get all user existing uploads
			const userExistingUploads = rootGetters['resumes/loadedUserResumes']
            console.log('userExistingUploads: ', userExistingUploads)
            let totalUploadSize = 0
            userExistingUploads.forEach(resume => {
                resume.uploads.forEach(upload => {
                    totalUploadSize += parseInt(upload.size_in_bytes)
                })
            })

			// 2) Get all new uploads file size
			const filesToAdd = []
			payload.uploads.forEach(upload => {
				totalUploadSize += parseInt(upload.size_in_bytes)				
				filesToAdd.push(upload)
			})
			console.log('totalUploadSize: ', totalUploadSize)

			// 3) Check that total uploads size is not greater than available space
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw 'Files could not be uploaded because your do not have enough space.'
			}
			console.log('filesToAdd: ', filesToAdd)
			console.log('totalUploadSize: ', totalUploadSize)
			console.log('userTotalSpace: ', userTotalSpace)

			// 4) Effectively upload files to storage
			payload.newUploads = [];
			for (let file of filesToAdd) {
				console.log('file: ', file)
				if (file.name && file.file) {
					const uploadedFile = await storage.ref('resumes').child(`${payload.user_id}/${file.name}`).put(file.file)
					const downloadUrl = await uploadedFile.ref.getDownloadURL()
					const newUpload = {
						name: uploadedFile.metadata.name,
						size_in_bytes: uploadedFile.metadata.size,
						downloadUrl: downloadUrl,
						title: file.title,
						type: file.type,
						_created_at: moment().unix(),
						_updated_at: moment().unix()
					}
					console.log('newUpload: ', newUpload)
					const index = payload.uploads.findIndex(upload => upload.name === file.name)
					payload.uploads[index] = newUpload
					payload.newUploads.push(newUpload)
				}
			}
			console.log('payload2: ', payload)
			commit('setLoadingFiles', false, { root: true })
			commit('setLoadingResume', true, { root: true })

			// 5) Store resume on the server
			const updatedResume = await axios.post('/create-new-resume', payload, {
				headers: {
					'app-key': process.env.APP_KEY
				}
			})
			commit('setLoadingResume', false, { root: true })
		} catch (error) {
			console.log('error from storeResume: ', error)
			// console.log('error: ', error.response.data.error)
			if (error.response && error.response.data && error.response.data.error) {
				if (error.response.data.error.filesToDelete) {
					const filesToDelete = error.response.data.error.filesToDelete
					console.log('Delete these files: ', filesToDelete)
					const userId = rootGetters['users/loadedUser'].id
					// console.log('userId: ', userId)

					for (let file of filesToDelete) {
						console.log('file: ', file)
						await storage.ref('resumes').child(`${userId}/${file.name}`).delete()
					}
				}
				throw error
			}
			throw new error()
		}
	},
	async storeResume3 ({ commit, rootState }, payload) {
		try {
			console.log('payload: ', payload)
			return

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
	async updateResume ({ commit, rootGetters }, payload) {
		try {
			console.log('payload: ', payload)
			commit('setLoadingFiles', true, { root: true })
			const oldResume = await firestore.collection('resumes_long').doc(payload.slug).get();

			// 1) Retrieve & delete all files to delete
			const filesToDelete = []
			oldResume.data().uploads.forEach(file => {
				console.log('old file: ', file)
				if (!payload.uploads.find(upload => upload.name === file.name)) {
					console.log('file to delete: ', file)
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

			// 2) Retrieve & upload all files to upload
			const filesToAdd = []
			let totalUploadSize = 0
			payload.uploads.forEach(upload => {
				totalUploadSize += parseInt(upload.size_in_bytes)
				if (!oldResume.data().uploads.find(file => file.name === upload.name && file._updated_at === upload._updated_at)) {
					filesToAdd.push(upload)
				}
			})
			// if (!oldResume.data().uploads.find(file => file.type === 'picture' && file.name === upload.name && file._updated_at === upload._updated_at)) {
				// filesToAdd.push(payload.personal_data.picture)
			// }
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw {
					'not_enough_space': 'Files could not be uploaded because your do not have enough space. Remove some files or buy extra space.'
				}
			}
			console.log('filesToAdd: ', filesToAdd)
			console.log('totalUploadSize: ', totalUploadSize)
			console.log('userTotalSpace: ', userTotalSpace)

			// throw {
			// 	'not_enough_space': 'Files could not be uploaded because your do not have enough space. Remove some files or buy extra space.'
			// }


			for (let file of filesToAdd) {
				console.log('file: ', file)
				if (file.name && file.file) {
					const uploadedFile = await storage.ref('resumes').child(`${payload.user_id}/${file.name}`).put(file.file)
					const downloadUrl = await uploadedFile.ref.getDownloadURL()
					const newUpload = {
						name: uploadedFile.metadata.name,
						size_in_bytes: uploadedFile.metadata.size,
						downloadUrl: downloadUrl,
						title: file.title,
						type: file.type,
						_created_at: moment().unix(),
						_updated_at: moment().unix()
					}
					console.log('newUpload: ', newUpload)
					const index = payload.uploads.findIndex(upload => upload.name === file.name)
					payload.uploads[index] = newUpload
				}
			}
			console.log('payload: ', payload)
			commit('setLoadingFiles', false, { root: true })
			commit('setLoadingResume', true, { root: true })

			// 3) Update resume on the server
			await axios.post('/update-resume', payload, {
				headers: {
					'app-key': process.env.APP_KEY
				}
			})
			commit('setLoadingResume', false, { root: true })
		} catch (error) {
			// console.log('error2: ', error)
			commit('setLoadingFiles', false, { root: true })
			commit('setLoadingResume', false, { root: true })
			throw error
		}
	},
	async updateResumeName ({ }, payload) {
		try {
			console.log('updatedResumeName: ', payload)
			await firestore.collection('resumes_long').doc(payload.resumeId).update({
				name: payload.newName
			})
		} catch (error) {
			console.log('error')
			throw error
		}
	},
	async updateResume2 ({ commit, rootGetters }, payload) {
		try {
			console.log('payload: ', payload)
			commit('setLoadingFiles', true, { root: true })
			const oldResume = await firestore.collection('resumes_long').doc(payload.slug).get();

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
			let totalUploadSize = 0
			payload.uploads.forEach(upload => {
				totalUploadSize += parseInt(upload.size_in_bytes)
				if (!oldResume.data().uploads.find(file => file.name === upload.name && file._updated_at === upload._updated_at)) {
					filesToAdd.push(upload)
				}
			})
			// if (!oldResume.data().uploads.find(file => file.type === 'picture' && file.name === upload.name && file._updated_at === upload._updated_at)) {
				// filesToAdd.push(payload.personal_data.picture)
			// }
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw {
					'not_enough_space': 'Files could not be uploaded because your do not have enough space.'
				}
			}
			console.log('filesToAdd: ', filesToAdd)
			console.log('totalUploadSize: ', totalUploadSize)
			console.log('userTotalSpace: ', userTotalSpace)

			for (let file of filesToAdd) {
				console.log('file: ', file)
				if (file.name && file.file) {
					const uploadedFile = await storage.ref('resumes').child(`${payload.user_id}/${file.name}`).put(file.file)
					const downloadUrl = await uploadedFile.ref.getDownloadURL()
					const newUpload = {
						name: uploadedFile.metadata.name,
						size_in_bytes: uploadedFile.metadata.size,
						downloadUrl: downloadUrl,
						title: file.title,
						type: file.type,
						_created_at: moment().unix(),
						_updated_at: moment().unix()
					}
					console.log('newUpload: ', newUpload)
					const index = payload.uploads.findIndex(upload => upload.name === file.name)
					payload.uploads[index] = newUpload
				}
			}
			console.log('payload: ', payload)
			commit('setLoadingFiles', false, { root: true })
			commit('setLoadingResume', true, { root: true })

			// 3) Update resume on the server
			const updatedResume = await axios.post('/update-resume', payload, {
				headers: {
					'app-key': process.env.APP_KEY
				}
			})
			commit('setLoadingResume', false, { root: true })
		} catch (error) {
			// console.log('error2: ', error)
			commit('setLoadingFiles', false, { root: true })
			commit('setLoadingResume', false, { root: true })
			throw error
		}
	},
	async deleteResume ({ commit, getters }, payload) {
		try {
			console.log('payload: ', payload)
			const resumeToDelete = payload

			// Don't forget to delete all relevant authorizations
			

			// throw new Error()

			// Delete files in storage if they are not present in another resume

			// 1) Retrieve all files to delete

			// 2) Retrieve all candidate files
			// const userResumes = getters['loadedUserResumes'].map(resume => resume.uploads)
			const userFiles = []

			getters['loadedUserResumes'].forEach(resume => {
				if (resume.uploads) {
					resume.uploads.forEach(upload => {
						if (userFiles.filter(file => file.name === upload.name)) {

						}
						userFiles.push(upload)
					})
				}
			})
			console.log('userFiles: ', userFiles)

			const filesToDelete = []
			// 3) Count object occurences
			if (payload.uploads.length > 0) {
				payload.uploads.forEach(file => {
					if (userFiles.filter(a => a.name === file.name).length < 2) {
						console.log('Removing: ', file.name)
						filesToDelete.push(file)
					}
				})
			}
			console.log('filesToDelete: ', filesToDelete)



			const batch = firestore.batch()

			console.log('resumeToDelete.slug: ', resumeToDelete.slug)
			const resume_long = firestore.collection('resumes_long').doc(resumeToDelete.slug)
			console.log('resume_long: ', resume_long)
			batch.delete(resume_long)


			// const shortResumesArray = []
			const snapshot = await firestore.collection('resumes_short').where('slug', '==', resumeToDelete.slug).get()
			snapshot.forEach(shortResume => {
				// shortResume.ref.delete()
				batch.delete(shortResume.ref)
			})

			await batch.commit()

			// for (let file of filesToDelete) {
			// 	await storage.ref(`/resumes/${resumeToDelete.user_id}/${file.name}`).delete()
			// }

		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async incrementViewCounter ({ }, payload) {
		try {
			const incrementViews = firebase.firestore.FieldValue.increment(1)
			const lastVisits = payload.lastVisits
			
			if (lastVisits && lastVisits.length >= 10) {
				lastVisits.shift()
				lastVisits.push(moment().unix())
			} else {
				lastVisits.push(moment().unix())
			}
			const resumeRef = firestore.collection('resumes_long').doc(`${payload.resumeId}`)
			resumeRef.update({ statitsics_views_count: incrementViews, statistics_last_visits: lastVisits })
		} catch (error) {
			console.log('error: ', error)
			throw error
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