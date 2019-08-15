export const strict = false
import { firestore, storage } from '~/plugins/firebase-client-init.js'
import firebase from 'firebase/app'
import axios from 'axios'
import moment from 'moment'

export const state = () => ({
	user: null,
	allUsers: []
})

export const mutations = {
	setLoadedUser (state, payload) {
		console.log('Call to setLoadedUser mutation: ', payload)
		// if (!payload.id) {
		// 	payload['id'] = payload.uid
		// }
		// const email = payload.email
		// console.log('email: ', email)
		// if (email && email.substr(email.length - 22 === '@visitor.loginmycv.com')) {
		// if (email === 'jeanquark3@visitor.loginmycv.com') {
			// payload.status = 'visitor'
		// }
		state.user = payload
	},
	setAllUsers (state, payload) {
		state.allUsers = payload
	}
}

export const actions = {
	async fetchAuthenticatedUser ({ commit }, payload) {
		console.log('Call to fetchAuthenticatedUser action: ', payload)
		const userId = payload.id
		if (userId) {
			firestore.collection('users').doc(userId).onSnapshot(function(doc) {
				commit('users/setLoadedUser', { ...doc.data(), id: doc.id }, { root: true })
			})
        }
	},
	async fetchAllUsers ({ commit }) {
		console.log('Call to fetchAllUsers action')
		// const snapshot = await firestore.collection('users').get()
		// console.log('snapshot: ', snapshot.docs.map(doc => doc.data()))
        // commit('setAllUsers', snapshot.docs.map(doc => doc.data()))
        firestore.collection('users').onSnapshot(function (querySnapshot) {
            const users = []
            querySnapshot.forEach(function (doc) {
                users.push(doc.data());
            })
            console.log('users: ', users)
            commit('setAllUsers', users)
        })
    },
    async updateUserAccount ({ }, payload) {
        try {
            console.log('payload: ', payload)
            const userId = firebase.auth().currentUser.uid
            console.log('userId: ', userId)
            await firestore.collection('users').doc(userId).update({
                firstname: payload.firstname,
                lastname: payload.lastname,
            })
        } catch (error) {
            throw error
        }
    },
	async updateUserClaims ({ commit, state, dispatch }, payload) {
        try {
            // We have to update user custom claims in token and user status in database
            console.log('async updateUserClaims')
            // const userId = payload.user.id
            const userId = firebase.auth().currentUser.uid
            const userEmail = payload.user.email
            const action = payload.action
            // let status = {}
            // if (action == 'userToAdmin') {
            //     status = {
            //         value: 'admin',
            //         _updated_at: moment().unix()
            //     }
            // } else if (action == 'adminToUser') {
            //     status = {
            //         value: 'user',
            //         _updated_at: moment().unix()
            //     }
            // }
            console.log('status: ', status)
            console.log('userEmail: ', userEmail)
            console.log('action: ', action)
            const customClaims = await axios.post('/set-custom-claims', { userEmail, action })
            console.log('customClaims: ', customClaims)
            return
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
	async deleteUserNotifications ({ rootGetters }) {
		const userId = rootGetters['users/loadedUser'].id
		const notifications = rootGetters['users/loadedUser'].notifications
		// console.log('notifications: ', notifications)
		await firestore.collection('users').doc(userId).update({
			notifications: notifications.filter(notification => notification.type !== 'authorization')
		})
    },
    async deleteUser ({ rootGetters }) {
        try {
            console.log('deleteUser')
            const user = firebase.auth().currentUser
            console.log('user: ', user)
            const userId = user.uid
            console.log('userId: ', userId)

            // 1) Delete all user files in Firebase storage
            const filesToDelete = []
            const visitorsToDelete = []
            const longResumes = await firestore.collection('resumes_long').where('user_id', '==', userId).get()
            longResumes.forEach(longResume => {
                console.log('longResume.data(): ', longResume.data())
                visitorsToDelete.push(longResume.data().visitor_id)
                if (longResume.data().uploads) {
                    longResume.data().uploads.forEach(upload => {
                        filesToDelete.push(upload.name)
                    })
                }
            })
            console.log('filesToDelete: ', filesToDelete)
            console.log('visitorsToDelete: ', visitorsToDelete)

            try {
                for (let fileToDelete of filesToDelete) {
                    console.log('fileToDelete: ', fileToDelete)
                    await storage.ref('resumes').child(`${userId}/${fileToDelete}`).delete()
                }
            } catch (error) {
                // NO ERROR PROCESSING
            }

            // 2) Delete user profile & visitor access in Firebase Auth
            await axios.post('/delete-user', { userId, visitorsToDelete })

            
            // 3) Delete user in Firestore 
            const batch = firestore.batch()
            const userRef = await firestore.collection('users').doc(userId)
            batch.delete(userRef)


            // 4) Delete user shortResumes in Firestore
            const shortResumes = await firestore.collection('resumes_short').where('user_id', '==', userId).get()
            shortResumes.forEach(shortResume => {
                console.log('shortResume: ', shortResume)
                const shortResumeRef = firestore.collection('resumes_short').doc(shortResume.id)
                batch.delete(shortResumeRef)
            })


            // 5) Delete user longResumes in Firestore
            longResumes.forEach(longResume => {
                console.log('longResume: ', longResume)
                const longResumeRef = firestore.collection('resumes_long').doc(longResume.id)
                batch.delete(longResumeRef)
            })
            
            await batch.commit()
        } catch (error) {
            throw error
        }
    }
}

export const getters = {
	loadedUser (state) {
		return state.user
	},
	loadedAllUsers (state) {
		return state.allUsers
	}
}