<template>
    <v-app id="app" v-cloak>
    	<v-toolbar dark color="primary">
		    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
			<v-img src="/images/logo3.png" max-width="40" />

		    <v-toolbar-title class="white--text">LoginMyCV</v-toolbar-title>
			
			<v-spacer></v-spacer>

			<!-- <v-text-field
        		flat
        		solo-inverted
        		hide-details
        		prepend-inner-icon="search"
        		label="Search"
        		class="hidden-sm-and-down"
      		></v-text-field> -->

		    <!-- <v-spacer></v-spacer> -->
			
			<!-- <v-btn nuxt to="/register" color="success">Register</v-btn> -->
			<!-- <v-btn nuxt to="/login" color="success">Login</v-btn> -->
			<div v-if="loadedUser && loadedUser.status != 'visitor'">
				<!-- <v-btn color="success" @click="loginModal = true">Login</v-btn> -->
				<v-btn color="warning" @click="logout">Logout</v-btn>
				<v-btn color="success" nuxt to="/candidate/resumes">My resumes</v-btn>
			</div>
			<div v-else>
				<v-btn color="success" @click="openLoginModal">Login</v-btn>
				<v-btn color="success" @click="registerModal = true">Register</v-btn>
			</div>
		    <!-- <v-btn icon>
		      	<v-icon>apps</v-icon>
		    </v-btn> -->
		</v-toolbar>

        <v-content>
            <v-container grid-list-md text-xs-center>
    			<v-layout row wrap>
      				<v-flex xs12 class="">
        				<v-card class="ma-2 pa-0">
          					<v-card-text class="pa-0">
          						<h1>Welcome to LoginMyCV</h1>
          						<h3>Now your career will take off</h3>
								<br />
								<h2>Deployment with clear config var 5</h2>
								<!-- process.env.PROJECT_ID: {{ process.env.PROJECT_ID }}<br /> -->
          						<!-- <b>Logged in candidate:</b> {{ auth }}<br /><br /> -->
          						<!-- <v-btn @click="getResume('jeanquark')">Go to jeanquark resume (button)</v-btn><br /> -->
          						<nuxt-link to="/resume/jeanquark3">Go to jeanquark's resume (client)</nuxt-link><br />
          						<a href="/resume/jeanquark3">Go to jeanquark's resume (server)</a><br />
          						<a href="/resume/ivan">Go to ivan's resume (server)</a><br />
								<!-- <a href="/resume/greg">Go to greg's resume (server)</a><br /> -->
								<!-- <nuxt-link to="/ivan">Go to Ivan's page</nuxt-link><br /> -->
								<!-- <nuxt-link to="/ivan2">Go to Ivan 2's page</nuxt-link><br /> -->
								<v-btn color="success">Success button</v-btn>
          						<!-- <nuxt-link to="/candidate">Go to candidate page</nuxt-link><br /> -->
          						<!-- <v-btn class="warning" @click="getCurrentUserIdToken">Get current user id token</v-btn><br /> -->
          						<!-- <b>loadedShortResumes: </b>{{ loadedShortResumes }}<br /> -->
          						<!-- <b>loadedUserAuthorizationsArray: </b>{{ loadedUserAuthorizationsArray }}<br /> -->
          						<!-- {{ loadedUserAuthorizations ? loadedUserAuthorizations['ZLljq0Ypk5hjHl7aimdX'] : null }}<br /> -->
          						loadedUser:{{ loadedUser }}<br />
          						<b>loadedUserReceivedAuthorizations: </b>{{ loadedUserReceivedAuthorizations }}<br />
								<b>myArray:</b> {{ myArray }}<br />

								<br /><br />
								<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   									<div v-for="element in myArray" :key="element.id" style="border: 1px solid grey;">{{ element.name }}</div>
								</draggable>

								<br /><br />
								<v-expansion-panel>
									<v-expansion-panel-content
										v-for="(item, i) in myArray"
										:key="i"
									>
										<template v-slot:header>
											<div>{{ item.title }}</div>
										</template>
										<v-card>
											<v-card-text>{{ item.text }}</v-card-text>
										</v-card>
									</v-expansion-panel-content>
								</v-expansion-panel>

								<br /><br />
								<v-expansion-panel>
									<draggable v-model="myArray" group="experience" @start="drag=true" @end="drag=false" handle=".handle" style="width: 100%;">
										<v-expansion-panel-content
											v-for="(item, i) in myArray"
											:key="i"
										>
											<template v-slot:header>
												<v-layout align-center>
													<v-icon class="handle" style="cursor: move">drag_indicator</v-icon>&nbsp;
													<div>{{ item.title }}</div>
												</v-layout>
											</template>
											<v-card>
												<v-card-text>{{ item.text }}</v-card-text>
											</v-card>
										</v-expansion-panel-content>
									</draggable>
								</v-expansion-panel>

          						<v-layout>
	          						<v-flex xs12>
	          							<img src="/images/logo-min.jpg" width="100%" />
	          						</v-flex>
	          					</v-layout>
          					</v-card-text>
        				</v-card>
        			</v-flex>
    			</v-layout>

				<v-layout row wrap justify-center class="mb-5">
					<v-flex xs12>
						<h1>Welcome to LoginMyCV</h1>
						<h2 class="grey--text text--lighten-1" style="font-weight: normal;">Your online CV provider</h2><br />
						<v-layout justify-center>
							<v-img src="/images/logo3.png" max-width="220" />
						</v-layout>
					</v-flex>
				</v-layout>

				<v-layout row wrap justify-center class="">
					<v-flex xs12>
						<h2 class="subtitle display-1">What we offer</h2>
					</v-flex>
				</v-layout>

				
				<v-layout row wrap class="mb-5">
					<v-flex xs12 sm4>
						<v-card flat class="transparent ma-2">
							<v-card-text class="text-xs-center">
								<font-awesome-icon :icon="['fas', 'file-alt']" size="2x" class="primaryColor" />
							</v-card-text>
							<v-card-title primary-title class="layout justify-center">
								<div class="headline text-xs-center">Your online CV for free</div>
							</v-card-title>
							<v-card-text>
								Make use of one of our templates to build your own resume. Simply follow our guidelines to enter personal data, education and work experience and voilà, in not time your resume will be accessible online at the endpoint of your choice.
							</v-card-text>
						</v-card>
					</v-flex>
					<v-flex xs12 sm4>
						<v-card flat class="transparent ma-2">
							<v-card-text class="text-xs-center">
								<font-awesome-icon :icon="['fas', 'lock']" size="2x" class="primaryColor" />
							</v-card-text>
							<v-card-title primary-title class="layout justify-center">
								<div class="headline text-xs-center">Private & Secured data</div>
							</v-card-title>
							<v-card-text>
								All of your data is securely saved in the cloud. You decide who has access to which information. At all time your remain in full control of your data and if you decide to remove some information, it will be completely wiped out from our database.
							</v-card-text>
						</v-card>
					</v-flex>
					<v-flex xs12 sm4>
						<v-card flat class="transparent ma-2">
							<v-card-text class="text-xs-center">
								<font-awesome-icon :icon="['fas', 'search']" size="2x" class="primaryColor" />
							</v-card-text>
							<v-card-title primary-title class="layout justify-center">
								<div class="headline text-xs-center">Let recruiters find you</div>
							</v-card-title>
							<v-card-text>
								An excerpt of your resume can be made visible on the frontpage for potential recruiters to reach out to you or request a full access to your resume. In addition, you are informed of the number of people who clicked on your resume.
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>




				<v-layout row wrap justify-center class="mb-5">
					<v-flex xs12>
						<h2 class="subtitle display-1">How it works</h2>
						<v-img src="/images/how_it_works.svg" />
					</v-flex>
				</v-layout>


				<v-layout row wrap justify-center>
					<v-flex xs12>
						<h2 class="subtitle display-1">Browse candidates</h2>
						<br />
					</v-flex>
					<v-flex xs12 sm6 md4 lg3 v-for="resume of loadedShortResumes" :key="resume.username">
						<!-- resume: {{ resume }}<br /> -->
        				<v-card flat hover class="card ma-2">
        					<!-- resume.resume_long_id: {{ resume.resume_long_id }}<br /> -->
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
								<v-layout justify-center v-if="resume.visibility === 'public'">
									<v-btn color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.slug}`">View resume</v-btn>
								</v-layout>
								<v-layout justify-center v-if="resume.visibility === 'semi-private'">
									<div v-if="loadedUser">
										<div v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]">
											<v-btn nuxt color="green" class="white--text elevation-2" :to="`/resume/${resume.slug}`" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]['user']['id'] === loadedUser.id && loadedUserReceivedAuthorizations[resume.resume_long_id].status === 'accorded'">View resume</v-btn>
											<v-chip color="info white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status === 'in_process'">Your access request is in process stage</v-chip>
	        							</div>
										<v-btn color="primary" class="white--text elevation-2" @click="showAuthModal(resume)" v-if="resume.user_id !== loadedUser.id && !loadedUserReceivedAuthorizations[resume.resume_long_id]">Request access</v-btn>
										<v-btn color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.slug}`" v-if="resume.user_id === loadedUser.id">View my resume</v-btn>
									</div>
									<div v-else>
										<v-btn color="primary" class="white--text elevation-2" @click="showAuthModal(resume)">Request access</v-btn>
									</div>
								</v-layout>
        					</v-card-actions>
        				</v-card>
        			</v-flex>
				</v-layout>


				<v-layout row wrap>
        			

        			<!-- Login Candidate Modal -->
                    <v-dialog
                        v-model="loginModal"
                        width="500"
                    	lazy
						persistent
                    >
                        <Login v-on:loginChildToParent="switchToRegister" :message="message" />
                    </v-dialog>

                    <!-- Register Candidate Modal -->
                    <v-dialog
                        v-model="registerModal"
                        width="750"
                        lazy
						persistent
                    >
                        <Register v-on:registerChildToParent="switchToLogin" />
                    </v-dialog>

                    <v-dialog
        				v-model="requestAuthorizationModal"
        				width="500"
        				lazy
						persistent
    				>
    					<RequestAuthorization v-on:closeModal="requestAuthorizationModal = false" :resume="candidateResume" />
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
	import axios from 'axios'

	import Login from '~/components/Login'
	import Register from '~/components/Register'
	import RequestAuthorization from '~/components/RequestAuthorization'
	import Draggable from 'vuedraggable'
	export default {
		// inject: ['$validator'], // inject vee-validate validator
		components: { Login, Register, RequestAuthorization, Draggable },
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
			// const resume = await this.$store.dispatch('resumes/fetchLongResume', 'jeanquark3')
			// console.log('resume3: ', resume)
			// console.log('process.env.PROJECT_ID: ', process.env.PROJECT_ID)
			// console.log('process.env.PRIVATE_KEY: ', process.env.PRIVATE_KEY)
			// console.log('abc: ', abc)
			// let resumesShortArray = []
			// firestore.collection('resumes_short').onSnapshot(function (querySnapshot) {
			// 	querySnapshot.forEach(function (doc) {
			// 		resumesShortArray.push(doc.data())
			// 	})
			// })
			// console.log('resumeShortArray: ', resumesShortArray)
			// this.$store.commit('resumes/setShortResumes', resumesShortArray)
			// const data2 = [
			// 	{
			// 		"category": "Technical skills",
			// 		"name": "JavaScript",
			// 		"type": "pie",
			// 		"value": 50
			// 	},
			// 	{
			// 		"category": "Technical skills",
			// 		"name": "PHP",
			// 		"type": "bar",
			// 		"value": 30
			// 	},
			// 	{
			// 		"category": "Software skills",
			// 		"name": "Photoshop",
			// 		"type": "bar",
			// 		"value": 20
			// 	},
			// 	{
			// 		"name": "Communication",
			// 		"type": "pie",
			// 		"value": 60
			// 	}
			// ];
			// const data = [ 
			// 	{ 
			// 		"type": "pie", 
			// 		"value": 50, 
			// 		"category": "Technical skills", 
			// 		"subcategory": "Software", 
			// 		"name": "Photoshop" 
			// 	}, 
			// 	{ 
			// 		"name": "Communication", 
			// 		"maxValue": 10, 
			// 		"type": "pie", 
			// 		"value": 30, 
			// 		"category": "Soft skills", 
			// 		"subcategory": "Social interactions" 
			// 	} 
			// ]

			// const res = data.reduce((acc, curr) => {
			// 	if(!acc[curr.category]) acc[curr.category] = []; //If this type wasn't previously stored
			// 	acc[curr.category].push(curr);
			// 	return acc;
			// },{});

			// console.log('res: ', res);

		},
		data () {
			return {
				loading: false,
				// resume: {
				// 	firstname: 'Jean-Marc',
				// 	lastname: 'Kleger',
				// 	email: 'jm.kleger@gmail.com',
				// 	job_title: 'Web developer',
				// 	job_description: 'Develops and deploy websites & web apps',
				// 	education: [
				// 		{
				// 			title: 'Master of Science in Economics',
				// 			school: 'University of Bern',
				// 			location: 'Bern'
				// 		},
				// 		{
				// 			title: 'Bachelor of Science in Economics',
				// 			school: 'University of Genev',
				// 			location: 'Geneva'
				// 		}
				// 	]
				// },
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
				requestAuthorizationModal: false,
				// items: ['foo', 'bar', 'fizz', 'buzz'],
				password: '',
				// myArray2: [
				// 	{
				// 		id: 1,
				// 		title: 'ABC',
				// 		text: 'Some random text'
				// 	},
				// 	{
				// 		id: 2,
				// 		title: 'DEF',
				// 		text: 'Some random text'
				// 	},
				// 	{
				// 		id: 3,
				// 		title: 'GHI',
				// 		text: 'Some random text'
				// 	}
				// ],
				myArray3: this.myArray
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
			myArray: {
				get () { 
					return [
						{
							id: 1,
							title: 'ABC',
							text: 'Some random text'
						},
						{
							id: 2,
							title: 'DEF',
							text: 'Some random text'
						},
						{
							id: 3,
							title: 'GHI',
							text: 'Some random text'
						}
					]
				},
				set (value) {
					console.log(value)
				}
			}
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
			openLoginModal () {
				this.message = null
				this.loginModal = true
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
			redirectToResume (slug, id) {
				console.log('redirectToResume: ', slug, id)

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
	.primaryColor {
		color: var(--v-primary-base);
	}
	.subtitle {
		color: var(--v-secondary-base);
		font-weight: normal;
		/* text-transform: uppercase; */
	}
</style>
