export const strict = false
import { firestore, storage, auth } from '~/plugins/firebase-client-init.js'
import firebase from 'firebase/app'
import moment from 'moment'
import axios from 'axios'

export const state = () => ({
	allResumes: [],
	shortResumes: [],
	resumes: [],
	userResumes: [],
	newResume: {}
})


export const mutations = {
	setAllResumes(state, payload) {
		state.allResumes = payload
	},
	setShortResumes (state, payload) {
		// console.log('Call to setShortResumes mutation: ', payload)
		state.shortResumes = payload
	},
	setResumes (state, payload) {
		// console.log('Call to setResumes mutation: ', payload)
		state.resumes = payload
	},
	setUserResumes (state, payload) {
		// console.log('Call to setUserResumes mutation: ', payload)
		state.userResumes = payload
	},
	setEmptyResume (state) {
		state.newResume = {
			template_id: '',
			// slug: 'johndoe',
			slug: '',
			// job_title: 'Web developer',
			job_title: '',
			// job_description: 'Develops websites & web apps',
			job_description: '',
			personal_data: {
				// firstname: 'John',
				firstname: '',
				// lastname: 'Doe',
				lastname: '',
				// email: 'john.doe@example.com'
				email: ''
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
		state.newResume = payload
	}
}

export const actions = {
	async fetchAllResumes ({ commit }) {
		console.log('fetchAllResumes')
		// const snapshot = await firestore.collection('resumes_long').orderBy('_updated_at').limit(2).get()

		// const firstBlock = firestore.collection('resumes_long').orderBy('_updated_at').limit(2)
		const firstBlock = firestore.collection('resumes_long').limit(2)

		const snapshot = await firstBlock.get()
		const lastVisible = snapshot.docs[snapshot.docs.length - 1]
		console.log('lastVisible: ', lastVisible)

		const nextBlock = firestore.collection('resumes_long').orderBy('_updated_at').startAfter(lastVisible).limit(2)
		const snapshot2 = await nextBlock.get()
		console.log('snapshot2: ', snapshot2)

		// .then(function (documentSnapshots) {
		//   // Get the last visible document
		//   var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
		//   console.log("last", lastVisible);

		//   // Construct a new query starting at this document,
		//   // get the next 25 cities.
		//   var next = db.collection("cities")
		//           .orderBy("population")
		//           .startAfter(lastVisible)
		//           .limit(25);
		// });

		const resumesArray = []
		snapshot.forEach(resume => {
			resumesArray.push({ ...resume.data(), id: resume.id })
		})
		console.log('resumesArray: ', resumesArray)
		commit('setAllResumes', resumesArray)
	},
	async fetchShortResumes ({ commit }) {
		// console.log('Call to fetchShortResumes actions')
		firestore.collection('resumes_short').where('active', '==', true).where('visibility', '>=', 'public').onSnapshot(snapshot => {
			const shortResumesArray = []
			snapshot.forEach(resume => {
				shortResumesArray.push({ ...resume.data(), id: resume.id })
			})
			// console.log('shortResumesArray: ', shortResumesArray)
			commit('setShortResumes', shortResumesArray)
		})
	},
	async fetchLongResume ({ commit, dispatch, rootGetters }, payload) {
		try {
			// console.log('Call to fetchLongResume action: ', payload)
			// 1) Fetch resume if its visibility is set to public or you are logged in as a visitor or it is your resume (see database rules) 
			const snapshot = await firestore.collection('resumes_long').doc(payload).get()
			const resume = {
				...snapshot.data(),
				id: snapshot.id
			}
			if (!resume.active) {
				throw 'resume_is_not_active'
			}
			// console.log('resume from store: ', resume)

			// 2) Increment views counter if you are not accessing your own resume
			if (rootGetters['loadedUser'] && rootGetters['loadedUser'].id === resume.user_id) {
				return resume
			} else {
				// console.log('rootGetters[loadedUser]: ', rootGetters['users/loadedUser'])
				dispatch('incrementViewCounter', { resumeId: resume.id, lastVisits: resume.statistics_last_visits })
				return resume
			}
		} catch (error) {
			// console.log('error from fetchLongResume action: ', error)
			if (error === 'resume_is_not_active') {
				throw 'resume_is_not_active'
			}
		}
		// console.log('next...')

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
			// console.log('error check-user-authorization: ', error)
			throw error
		}
	},
	async fetchUserResumes ({ commit, rootGetters }) {
		try {
			// console.log('Call to fetchUserResumes action')
			const userId = rootGetters['users/loadedUser'].id
			// console.log('authUserId: ', userId)

			// const snapshot = await firestore.collection('resumes_long').where('user_id', '==', userId).get()
			// snapshot.forEach(doc => {
			// 	console.log('doc.data(): ', doc.data())
			// })

			if (userId) {
				firestore.collection('resumes_long').where('user_id', '==', userId).onSnapshot(snapshot => {
					const userResumes = []
					snapshot.forEach(doc => { // Also include uploaded files
						userResumes.push({
							id: doc.id,
							...doc.data(),
						})
					})
					commit('setUserResumes', userResumes)
				})
			}
		} catch (error) {
			// console.log('error from fetchUserResumes: ', error)
			throw error
		}
	},
	async storeResume ({ commit, getters, dispatch, rootGetters }, payload) {
		try {
			// console.log('payload: ', payload)
			const newResume = payload
			const userPackageValidity = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.package_valid_until : null
			// console.log('newResume: ', newResume)
            // console.log('userPackageValidity: ', userPackageValidity)
			

			// 1) Create resume server-side
			const createdResume = await axios.post('/create-new-resume', { newResume, userPackageValidity}, {
				headers: {
					'app-key': process.env.APP_KEY
				}
			})
			// console.log('createdResume: ', createdResume)
			const newLongResumeId = createdResume.data.newLongResumeId
			const newShortResumeId = createdResume.data.newShortResumeId

	        commit('setLoadingResume', false, { root: true })
	        commit('setLoadingFiles', true, { root: true })


	        // 2) Get all user existing uploads
			const userExistingResumes = getters['loadedUserResumes']
            // console.log('userExistingResumes: ', userExistingResumes)
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
			// console.log('totalUploadSize: ', totalUploadSize)


			// 4) Check that total upload size does not exceed available space
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw {
					'not_enough_space': 'Files could not be uploaded because your do not have enough space.'
				}
			}
			// console.log('filesToAdd: ', filesToAdd)
			// console.log('totalUploadSize: ', totalUploadSize)
			// console.log('userTotalSpace: ', userTotalSpace)


			// 5) Effectively upload files to storage
			for (let file of filesToAdd) {
				// console.log('file: ', file)
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
					// console.log('newUpload: ', newUpload)
					const index = uploads.findIndex(upload => upload.name === file.name)
					uploads[index] = newUpload
				}
			}
			// console.log('uploads2: ', uploads)


			// 6) Update long & short resumes with uploads
			if (uploads && uploads.length > 0) {
				// console.log('update resumes_long')
				await firestore.collection('resumes_long').doc(newLongResumeId).update({
					uploads
				})
				const picture = uploads.find(upload => upload.type === 'profile_picture')
				// console.log('picture: ', picture)
				if (picture) {
					// console.log('update resumes_short')
					await firestore.collection('resumes_short').doc(newShortResumeId).update({
						picture: picture.downloadUrl
					})
				}
			}
		} catch (error) {
			// console.log('error from storeResume action: ', error)
			if (error.response && error.response.data && error.response.data.error) {
				throw error.response.data.error
			}
			throw error
		}
	},
	async updateResume ({ commit, dispatch, rootGetters }, payload) {
		try {
			// console.log('payload: ', payload)
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

			// console.log('filesToDelete: ', filesToDelete)
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
			const userTotalSpace = rootGetters['users/loadedUser'].private ? rootGetters['users/loadedUser'].private.total_space_in_bytes : 0
			if (totalUploadSize > userTotalSpace) {
				throw {
					'not_enough_space': 'Files could not be uploaded because your do not have enough space. Remove some files or buy extra space.'
				}
			}
			// console.log('filesToAdd: ', filesToAdd)
			// console.log('totalUploadSize: ', totalUploadSize)
			// console.log('userTotalSpace: ', userTotalSpace)

			for (let file of filesToAdd) {
				// console.log('file: ', file)
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
					// console.log('newUpload: ', newUpload)
					const index = payload.uploads.findIndex(upload => upload.name === file.name)
					payload.uploads[index] = newUpload
				}
			}
			// console.log('payload: ', payload)
			commit('setLoadingFiles', false, { root: true })
			commit('setLoadingResume', true, { root: true })


			// 3) Check if template has changed, if it has, update template users number on the server
			const oldTemplate = oldResume.data().template_id
			const newTemplate = payload.template_id
			// console.log('oldTemplate: ', oldTemplate)
			// console.log('newTemplate: ', newTemplate)
			if (oldTemplate !== newTemplate) {
				payload.updateTemplateUsersCounter = {
					increment: newTemplate,
					decrement: oldTemplate
				}
			}


			// 4) Update resume on the server
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
			// console.log('updatedResumeName: ', payload)
			await firestore.collection('resumes_long').doc(payload.resumeId).update({
				name: payload.newValue,
				_updated_at: moment().unix()
			})
		} catch (error) {
			// console.log('error')
			throw error
		}
	},
	async updateResumeActiveStatus ({}, payload) {
		try {
			// Perform check to see if user is allowed to have an extra active resume
			// console.log('updateResumeActiveStatus: ', payload)
			await firestore.collection('resumes_long').doc(payload.resumeId).update({
				active: payload.newValue,
				_updated_at: moment().unix()
			})
		} catch (error) {
			// console.log('error')
			throw error
		}
	},
	async deleteResume ({ commit, getters }, payload) {
		try {
			const resumeToDelete = payload


			// 1) Retrieve all user files
			const userFiles = []
			getters['loadedUserResumes'].forEach(resume => {
				if (resume.uploads) {
					resume.uploads.forEach(upload => {
						userFiles.push(upload)
					})
				}
			})
			

			// 2) Only delete files that are not present in another resume 
			const filesToDelete = []
			if (payload.uploads.length > 0) {
				payload.uploads.forEach(file => {
					if (userFiles.filter(a => a.name === file.name).length < 2) {
						// console.log('Removing: ', file.name)
						filesToDelete.push(file)
					}
				})
			}


			// 3) Try delete files but do not fail if files are non-existent
			try {
				for (let file of filesToDelete) {
					const fileRef = storage.ref('resumes').child(`${resumeToDelete.user_id}/${file.name}`)
					await fileRef.delete()
				}
			} catch (error) {
				// NO ERROR PROCESSING
			}



			// 4) Try delete visitor access in Firebase Auth via server call but do not fail if user is non-existent
			try {
				const visitorsToDelete = []
				visitorsToDelete.push(resumeToDelete.visitor_id)
				const userId = null
				await axios.post('/delete-user', { userId, visitorsToDelete })
			} catch (error) {
				// NO ERROR PROCESSING
			}


			const batch = firestore.batch()

			// 5) Delete authorizations related to this resume
			const authorizationsToDelete = await firestore.collection('authorizations').where('resume.id', '==', resumeToDelete.id).get()
			authorizationsToDelete.forEach(authorization => {
				batch.delete(authorization.ref)
			})
			

			// 6) Delete long resume
			const resume_long = firestore.collection('resumes_long').doc(resumeToDelete.slug)
			batch.delete(resume_long)


			// 7) Delete short resume
			const resume_short = await firestore.collection('resumes_short').doc(resumeToDelete.resume_short_id)
			batch.delete(resume_short)


			await batch.commit()

		} catch (error) {
			// console.log('error: ', error)
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
			resumeRef.update({ statistics_views_count: incrementViews, statistics_last_visits: lastVisits })
		} catch (error) {
			// console.log('error: ', error)
			throw error
		}
	}
}

export const getters = {
	loadedAllResumes (state) {
		return state.allResumes
	},
	loadedShortResumes (state) {
		return state.shortResumes
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