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
			colors: {},
			parameters: {},
			others: []
		}
	},
	setNewResume (state, payload) {
		// console.log('setNewResume: ', payload)
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
	async fetchLongResume ({ commit }, payload) {
		try {
			console.log('Call to fetchLongResume action: ', payload)
			const snapshot = await firestore.collection('resumes_long').doc(payload).get()
			const resume = snapshot.data()
			console.log('resume: ', resume)
			return resume

		} catch (error) {
			console.log('error from fetchLongResume action: ', error)
			// new Noty({
			// 	type: 'error',
			// 	text: 'Sorry, an error occured and the resume could not be retrieved.',
			// 	timeout: 5000,
			// 	theme: 'metroui'
			// }).show()
			throw error
		}

		// const snapshot = await firestore.collection('resumes_long').where('visibility', '==', 'public').get()
		// const resumesArray = []
		// snapshot.forEach(doc => {
		// 	if (doc.data().slug === 'jeanquark2') {
		// 		resumesArray.push({ ...doc.data(), id: doc.id })
		// 	}
		// })
		// console.log('resumesArray: ', resumesArray)
		// // commit('setLongResumes', resumesArray)
		// return resumesArray[0]
	},
	async fetchShortResumes ({ commit }) {
		console.log('Call to fetchShortResumes actions')
		// firestore.collection('resumes_short').onSnapshot(function (querySnapshot) {
		firestore.collection('resumes_short').onSnapshot(snapshot => {
			const shortResumesArray = []
			snapshot.forEach(resume => {
				if (resume.data().visibility !== 'private') {
					shortResumesArray.push({ ...resume.data(), id: resume.id })
				}
			})
			console.log('shortResumesArray: ', shortResumesArray)
			commit('setShortResumes', shortResumesArray)
		})
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
					console.log('snapshot: ', snapshot)
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
	async storeResume ({ commit, dispatch, getters, rootGetters }, payload) {
		try {
			const newResume = payload
			console.log('newResume: ', newResume)
			console.log('newResume.slug: ', newResume.slug)

			// 1) Check slug existence
			// NEED TO PROCESS SERVERSIDE DUE TO FIRESTORE RULES!
			try {
				await axios.post('/check-resume-slug', { slug: newResume.slug }, {
					headers: {
						'app-key': process.env.APP_KEY
					}
				})
			} catch (error) {
				console.log('error from axios post: ', error)
				throw {
	                'slug': 'Slug already exists. Please provide another identifier for the resume.'
	            }
			}

			// try {
	        	// const snapshot = await firestore.collection('resumes_long').doc(newResume.slug).get();
	        	// // const snapshot = await firestore.collection('resumes_long').where('slug', '==', newResume.slug).get()
	        	// const existingSlug = snapshot.data()
	        	// console.log('existingSlug: ', existingSlug)
		        // if (existingSlug) {
		        // 	throw {
		        //         'slug': 'Slug already exists. Please provide another identifier for the resume.'
		        //     }
		        // }
				
			// } catch (error) {
	  //           throw {
	  //               'slug': 'Slug already exists. Please provide another identifier for the resume.',
	  //           }		
			// }

			delete newResume['id']
			const password = newResume['password']
			delete newResume['password']
        	delete newResume['password_confirmation']
        	const uploads = newResume['uploads']
        	console.log('uploads: ', uploads)
        	newResume['uploads'] = []
        	newResume['_created_at'] = moment().unix()
        	newResume['_updated_at'] = moment().unix()

	        // 2) Create visitor profile if password
	        if (password) {
                console.log('Update visitor\'s password: ', password)
                try {
                	const user = await auth.getUserByEmail(`${newResume.slug}@visitor.loginmycv.com`)
	                console.log('user.uid: ', user.uid)
	                await auth.deleteUser(user.uid)
	            } catch (error) { // User does not exist
	                console.log('user does not exist')
	            }
	            const newUser = await auth.createUser({
	                email: `${newResume.slug}@visitor.loginmycv.com`,
	                emailVerified: false,
	                password: password,
	                displayName: `${newResume.slug}@visitor`,
	                disabled: false
	            })
	            const visitor_id = newUser.uid
	            newResume['visitor_id'] = visitor_id
	        }

        	// 3) Save both resumes (long & short)
			let batch = firestore.batch()
	        
	        const newLongResume = firestore.collection('resumes_long').doc(newResume.slug)
	        batch.set(newLongResume, newResume)

	        const newShortResume = firestore.collection('resumes_short').doc()
	        batch.set(newShortResume, {
	            user_id: newResume.user_id, 
	            slug: newResume.slug,
	            visibility: newResume.visibility,
	            job_title: newResume.job_title,
	            job_description: newResume.job_description,
	            personal_data: {
	                firstname: newResume['personal_data']['firstname'],
	                lastname: newResume['personal_data']['lastname'],
	                email: newResume['personal_data']['email'],
	                country: newResume['personal_data']['country'],
	                city: newResume['personal_data']['city']
	            },
	            key_competences: newResume.key_competences ? newResume.key_competences : null,
	            languages: newResume.languages,
	        	_created_at: newResume._created_at,
	        	_updated_at: newResume._updated_at
	        })

	        await batch.commit()


	        // 4) Get all user existing uploads
			await dispatch('fetchUserResumes')
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

			// 5) Get all new uploads file size
			const filesToAdd = []
			if (uploads) {
				uploads.forEach(upload => {
					totalUploadSize += parseInt(upload.size_in_bytes)				
					filesToAdd.push(upload)
				})
			}
			console.log('totalUploadSize: ', totalUploadSize)

			// 6) Check that total upload size does not exceed available space
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw 'Files could not be uploaded because your do not have enough space.'
			}
			console.log('filesToAdd: ', filesToAdd)
			console.log('totalUploadSize: ', totalUploadSize)
			console.log('userTotalSpace: ', userTotalSpace)

			// 7) Effectively upload files to storage
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

			// 8) Update long & short resumes with uploads
			if (uploads && uploads.length > 0) {
				console.log('update resumes_long')
				await firestore.collection('resumes_long').doc(newResume.slug).update({
					uploads
				})
				console.log('newShortResume.id: ', newShortResume.id)
				const picture = uploads.find(upload => upload.type === 'profile_picture')
				console.log('picture: ', picture)
				if (picture) {
					console.log('update resumes_short')
					console.log('newResume.user_id: ', newResume.user_id)
					await firestore.collection('resumes_short').doc(newShortResume.id).update({
						picture: picture.downloadUrl
					})
				}
			}

		} catch (error) {
			console.log('error from storeResume action: ', error)
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
				throw 'Files could not be uploaded because your do not have enough space.'
			}
			console.log('filesToAdd: ', filesToAdd)
			console.log('totalUploadSize: ', totalUploadSize)
			console.log('userTotalSpace: ', userTotalSpace)

			// return 
			for (let file of filesToAdd) {
				console.log('file: ', file)
				if (file.file) {
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
	async deleteResume ({ commit }, payload) {
		try {
			console.log('payload: ', payload)

			throw new Error()

			// Delete files in storage

			// const batch = firestore.batch()

			// const resume_long = db.collection('resumes_long').doc(payload)
			// batch.delete(resume_long)

			// const resume_short = db.collection('resumes_short').where('slug', '==', payload)
			// batch.delete(resume_short)

			// await batch.commit()
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