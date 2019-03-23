<template>
    <v-app id="app" v-cloak>
    	<v-toolbar dark color="primary">
		    <v-toolbar-side-icon></v-toolbar-side-icon>

		    <v-toolbar-title class="white--text">LoginMyCV</v-toolbar-title>
			
			<v-spacer></v-spacer>

			<v-text-field
        		flat
        		solo-inverted
        		hide-details
        		prepend-inner-icon="search"
        		label="Search"
        		class="hidden-sm-and-down"
      		></v-text-field>

		    <v-spacer></v-spacer>
			
			<!-- <v-btn nuxt to="/register" color="success">Register</v-btn> -->
			<!-- <v-btn nuxt to="/login" color="success">Login</v-btn> -->
			<div v-if="!loadedUser">
				<v-btn color="success" @click="loginModal = true">Login</v-btn>
				<v-btn color="success" @click="registerModal = true">Register</v-btn>
			</div>
			<div v-else>
				<v-btn color="warning" @click="logout">Logout</v-btn>
				<v-btn color="success" nuxt to="/candidate/resumes">My resumes</v-btn>
			</div>

		    <v-btn icon>
		      	<v-icon>search</v-icon>
		    </v-btn>

		    <v-btn icon>
		      	<v-icon>apps</v-icon>
		    </v-btn>

		    <v-btn icon>
		     	<v-icon>refresh</v-icon>
		    </v-btn>

		    <v-btn icon>
		      	<v-icon>more_vert</v-icon>
		    </v-btn>
		</v-toolbar>

        <v-content>
            <!-- <h1>LoginMyCV</h1> -->
            <!-- <v-btn color="primary" @click="addResume" :loading="loading">Add resume</v-btn> -->
            <v-container grid-list-md text-xs-center>
    			<v-layout row wrap>
      				<v-flex xs12>
        				<v-card>
          					<v-card-text class="px-0">
          						<h1>Welcome to LoginMyCV</h1>
          						<h3>This is where you career takes off</h3>
          						<!-- <b>Logged in candidate:</b> {{ auth }}<br /><br /> -->
          						<!-- <v-btn @click="getResume('jeanquark')">Go to jeanquark resume (button)</v-btn><br /> -->
          						<nuxt-link to="/resume/jeanquark">Go to jeanquark resume (client)</nuxt-link><br />
          						<a href="/resume/jeanquark">Go to jeanquark resume (server)</a><br />
          						<!-- <nuxt-link to="/candidate">Go to candidate page</nuxt-link><br /> -->
          						<!-- <v-btn class="warning" @click="getCurrentUserIdToken">Get current user id token</v-btn><br /> -->
          						<!-- <b>loadedShortResumes: </b>{{ loadedShortResumes }}<br /> -->
          						<b>loadedUserReceivedAuthorizations: </b>{{ loadedUserReceivedAuthorizations }}<br />
          						<!-- <b>loadedUserAuthorizationsArray: </b>{{ loadedUserAuthorizationsArray }}<br /> -->
          						<!-- {{ loadedUserAuthorizations ? loadedUserAuthorizations['ZLljq0Ypk5hjHl7aimdX'] : null }}<br /> -->
          					</v-card-text>
        				</v-card>
        			</v-flex>

        			<v-flex xs12 sm6 md4 lg3 v-for="resume of loadedShortResumes" :key="resume.username">
        				<v-card flat hover class="card ma-2">
        					resume.resume_long_id: {{ resume.resume_long_id }}<br />
        					<v-layout fill-height align-center justify-space-around class="pa-2">
                                <v-avatar
                                    :size="78"
                                >
                                    <img :src="`/images/resumes/${resume.image}`" alt="Candidate image" v-if="resume.image">
                                    <img src="/images/resumes/default.jpg" alt="default candidate image" v-else/>
                                </v-avatar>
                            </v-layout>
        					<v-card-title primary-title class="pa-2 justify-center">
        						<div>
        							<h3 class="headline mb-0 text-xs-center">{{ resume.job_title }}</h3>
        							<div class="pt-1 text-xs-center">{{ resume.job_description }}</div>
        						</div>
        					</v-card-title>
        					<v-card-actions>
        						<v-layout justify-center>
        							<div v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]">
	        							<v-btn nuxt color="green" class="white--text elevation-2" :to="`/resume/${resume.slug}`" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status === 'accorded'">View resume</v-btn>
	        							<v-chip color="primary white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status === 'in_process'">Your access request is in process stage</v-chip>
	        						</div>
	        						<v-btn color="primary" class="white--text elevation-2" @click="showAuthModal(resume)" v-else>Request access</v-btn>
	        					</v-layout>
        					</v-card-actions>
        				</v-card>
        			</v-flex>

        			<!-- Login Candidate Modal -->
                    <v-dialog
                        v-model="loginModal"
                        width="500"
                    >
                        <Login v-on:loginChildToParent="switchToRegister" :message="message" />
                    </v-dialog>

                    <!-- Register Candidate Modal -->
                    <v-dialog
                        v-model="registerModal"
                        width="750"
                    >
                        <Register v-on:registerChildToParent="switchToLogin" />
                    </v-dialog>

                    <v-dialog
        				v-model="requestAuthorizationModal"
        				width="500"
    				>
    					<RequestAuthorization :resume="candidateResume" />
    				</v-dialog>

        		</v-layout>

        		
        	</v-container>
        </v-content>

        <v-footer
		    height="auto"
		    color="primary lighten-1"
		>
		    <v-layout
		      	justify-center
		      	row
		      	wrap
		    >
		      	<v-btn
			        v-for="link in links"
		        	:key="link"
		        	color="white"
		        	flat
		        	round
		      	>
			        {{ link }}
		      	</v-btn>
		      	<v-flex
			        primary
		        	lighten-2
		        	py-3
		        	text-xs-center
			        white--text
		        	xs12
		      	>
			        &copy;2019 — <strong>LoginMyCV</strong>
		      	</v-flex>
		    </v-layout>
		 </v-footer>
    </v-app>
</template>

<script>
	import firebase from 'firebase/app'
	import { firestore } from '~/plugins/firebase-client-init.js'
	import Noty from 'noty'
	// import 'noty/lib/noty.css'
	// import 'noty/lib/themes/metroui.css'
	import axios from 'axios'

	import Login from '~/components/Login'
	import Register from '~/components/Register'
	import RequestAuthorization from '~/components/RequestAuthorization'
	export default {
		components: { Login, Register, RequestAuthorization },
		// async asyncData ({ $axios, store }) {
			// const shortResumes = await $axios.$get('/fetch-short-resumes')
			// console.log('shortResumes: ', shortResumes)
			// store.commit('resumes/setShortResumes', shortResumes)
			// await store.dispatch('resumes/loadedShortResumes2')
		// },
		async created () {
			console.log('Entering created lifecycle hook...')
			await this.$store.dispatch('resumes/fetchShortResumes')
			const authUser = this.$store.getters['users/loadedUser']
			console.log('authUser2: ', authUser)
			if (authUser) {
				// await this.$store.dispatch('users/fetchAuthenticatedUser', authUser.uid)
				await this.$store.dispatch('authorizations/fetchUserReceivedAuthorizations', authUser.id)
			}
			// console.log('abc: ', abc)
			// let resumesShortArray = []
			// firestore.collection('resumes_short').onSnapshot(function (querySnapshot) {
			// 	querySnapshot.forEach(function (doc) {
			// 		resumesShortArray.push(doc.data())
			// 	})
			// })
			// console.log('resumeShortArray: ', resumesShortArray)
			// this.$store.commit('resumes/setShortResumes', resumesShortArray)
		},
		data () {
			return {
				loading: false,
				resume: {
					firstname: 'Jean-Marc',
					lastname: 'Kleger',
					email: 'jm.kleger@gmail.com',
					job_title: 'Web developer',
					job_description: 'Develops and deploy websites & web apps',
					education: [
						{
							title: 'Master of Science in Economics',
							school: 'University of Bern',
							location: 'Bern'
						},
						{
							title: 'Bachelor of Science in Economics',
							school: 'University of Genev',
							location: 'Geneva'
						}
					]
				},
				links: [
			        'Home',
			        'About Us',
			        'Team',
			        'Services',
			        'Contact Us'
			    ],
			    message: '',
			    candidateResume: {},
			    loginModal: false,
    			registerModal: false,
    			requestAuthorizationModal: false
			}
		},
		computed: {
			auth () {
				return firebase.auth().currentUser
			},
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			loadedShortResumes () {
				return this.$store.getters['resumes/loadedShortResumes']
			},
			loadedUserReceivedAuthorizations () {
				return this.$store.getters['authorizations/loadedUserReceivedAuthorizationsObject']
			},
			// loadedUserAuthorizationsArray () {
			// 	return this.$store.getters['authorizations/loadedUserAuthorizationsArray']
			// }
		},
		methods: {
			switchToLogin () {
				this.registerModal = false
				this.loginModal = true
			},
			switchToRegister () {
				this.loginModal = false
				this.registerModal = true
			},
			async showAuthModal (resume) {
				console.log('resume: ', resume)
				if (!this.loadedUser) {
					// new Noty({
					// 	type: 'info',
					// 	text: 'Please log in first.',
					// 	timeout: 3000,
					// 	theme: 'metroui'
					// }).show()
					this.message = 'Please log in first to request authorization.'
					return this.loginModal = true
				}
				this.candidateResume = resume
				this.requestAuthorizationModal = true
			},
			async addResume () {
				this.loading = true
		        try {
		        	const snapshot = await firestore.collection('resumes').add(this.resume)
		        	console.log('snapshot: ', snapshot)
		        	this.loading = false
		        	new Noty({
	                    type: 'success',
	                    text: 'Resume was successfully created!',
	                    timeout: 5000,
	                    theme: 'metroui'
	                }).show()
		        } catch (error) {
		        	console.log('error: ', error)
		        	this.loading = false
		        	new Noty({
                    	type: "error",
	                    text: "Sorry, an error occured and your resume could not be created.",
	                    timeout: 5000,
	                    theme: "metroui"
	                }).show()
		        }
		    },
		    async getResume (username) {
		    	try {
		    		console.log('getResume')
			    	// const response = await axios.post('/resume', {id: 1})
			    	const response = await axios.get('/resume/jeanquark')
			    	console.log('response: ', response)
			    	await this.$store.commit('resumes/setResume', response.data)
			    	// const response2 = await this.$store.dispatch('resumes/fetchResume', username)
			    	// console.log('response2: ', response2)
			    	// console.log('Done!')
			    	this.$router.replace('/resume/jeanquark')
			    } catch (error) {
			    	console.log('error: ', error)
			    }
		    },
		    async getCurrentUserIdToken () {
		    	console.log('Clicked getCurrentUserIdToken')
		    	const abc = await this.$store.dispatch('firebase-auth/currentUserIdToken')
		    	console.log('abc: ', abc)
		    	console.log('Done!')
		    },
		    async logout () {
		    	await this.$store.dispatch('firebase-auth/signOut')
		    	this.$router.replace('/')
		    }
		}
	}
</script>

<style scoped>
	[v-cloak] {
		display: none;
	}
</style>
