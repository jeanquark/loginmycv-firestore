<template>
    <div class="text-xs-center">
        <!-- <v-carousel style="width: 100%; margin: 0px; padding: 0px;">
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" :src="item.src" :lazy="true"></v-carousel-item>
        </v-carousel> -->

    	<div>
			<!-- loadedShortResumes: {{ loadedShortResumes }}<br /><br /> -->
			loadedUserReceivedAuthorizations: {{ loadedUserReceivedAuthorizations }}<br /><br />
			<!-- ref.resumesNext: {{ ref.resumesNext }}<br /><br /> -->
			<!-- <p>lastVisible: {{ lastVisible }}</p> -->
			<!-- loadedLastVisible: {{ loadedLastVisible }}<br /><br /> -->
		</div>

        <!-- <v-container grid-list-md text-xs-center> -->
		<v-container class="text-center">
            <!-- <v-layout row wrap justify-center class="mb-5"> -->
			<v-row no-gutters justify="center" class="mb-5">
                <!-- <v-flex xs12> -->
				<v-col>
                    <h1>Welcome to LoginMyCV</h1>
                    <h2 class="grey--text text--lighten-1" style="font-weight: normal;">Your online CV provider</h2><br />

                    <!-- <v-layout justify-center> -->
					<v-row no-gutters justify="center">
                        <v-img src="/images/logo3.png" :lazy-src="'/images/logo3.png'" max-width="220" />
                    <!-- </v-layout> -->
					</v-row>
                <!-- </v-flex> -->
				</v-col>
            <!-- </v-layout> -->
			</v-row>

            <!-- <v-layout row wrap class="mb-5"> -->
			<v-row no-gutters class="mb-5">
                <!-- <v-flex xs12 sm4> -->
				<v-col>
                    <v-card flat class="transparent ma-2">
                        <v-card-text class="text-xs-center">
                            <font-awesome-icon :icon="['fas', 'file-alt']" size="2x" class="primaryColor" />
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                            <div class="headline text-xs-center">Your online CV for free</div>
                        </v-card-title>
                        <v-card-text>
                            Make use of one of our templates to build your own resume. Simply follow our guidelines to enter personal data, education and work experience and voilà, in no time your resume will be accessible online at the endpoint of your choice.
                        </v-card-text>
                    </v-card>
                <!-- </v-flex> -->
				</v-col>
                <!-- <v-flex xs12 sm4> -->
				<v-col>
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
                <!-- </v-flex> -->
				</v-col>
                <!-- <v-flex xs12 sm4> -->
				<v-col>
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
                <!-- </v-flex> -->
				</v-col>
            <!-- </v-layout> -->
			</v-row>

            <!-- <v-layout row wrap justify-center class="mb-5"> -->
			<v-row no-gutters justify="center" class="mb-5">
                <!-- <v-flex xs12> -->
				<v-col>
                    <h2 class="subtitle display-1 mb-2">How it works</h2>
                    <!-- <v-layout> -->
					<v-row no-gutters>
                        <!-- <v-flex xs6> -->
						<v-col cols="6">
                            <h4 class="primaryColor">Create a new resume:</h4><br />
                            <!-- <v-img src="/images/frontpage-text.svg" /> -->
                            <v-img src="/images/gifs/create_resume.gif"></v-img>
                        <!-- </v-flex> -->
						</v-col>
                        <!-- <v-flex xs6> -->
						<v-col cols="6">
                            <v-img src="/images/frontpage-img6.png"></v-img>
                        <!-- </v-flex> -->
						</v-col>
                    <!-- </v-layout> -->
					</v-row>
                <!-- </v-flex> -->
				</v-col>
            <!-- </v-layout> -->
			</v-row>

            <!--<v-layout row wrap justify-center>
                <v-flex xs12>
                    <h2 class="subtitle display-1">Browse candidates</h2>
                    <br />
                </v-flex>
                <v-flex xs12 sm6 md4 lg12 v-for="resume of loadedShortResumes" :key="resume.username">
                    <v-hover>
                        <v-card flat height="300" class="ma-2 align-center" :class="[`elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }" style="overflow-x: hidden; overflow-y: auto;">
                            <v-layout row wrap>
                                <v-flex xs12 style="white-space: nowrap;">
                                    <div class="country-flag" v-if="resume.country">
                                        <v-img :src="`/images/countries/${resume.country.slug}.png`" width="20" class="mb-1"></v-img>
                                    </div>
                                    <div class="language-flag">
                                        <v-img :src="`/images/languages/${language.slug}.png`" width="20" class="mb-1" v-for="(language, index) in resume.languages" :key="index"></v-img>
                                    </div>
                                    <v-avatar :size="78" class="mb-2" v-if="resume.picture">
                                        <img :src="`${resume.picture}`" alt="Candidate picture">
                                    </v-avatar>
                                    <v-layout justify-center v-else>
                                        <avatar justify-center :username="`${resume.firstname} ${resume.lastname}`" :size="78" class="text-xs-center mb-2"></avatar>
                                    </v-layout>
                                </v-flex>
                            </v-layout>

                            <v-layout fill-height align-center justify-space-around>
                                <div>
                                    <v-card-text>
                                        <h3 class="headline mb-0 text-xs-center">{{ resume.job_title }}</h3>
                                        <div class="pt-1 px-2 text-xs-center">{{ resume.job_description }}</div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout justify-center v-if="resume.visibility === 'public'">
                                            <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.resume_long_id}`">View resume</v-btn>
                                        </v-layout>
                                        <v-layout justify-center v-if="resume.visibility === 'semi-private'">
                                            <div v-if="loadedUser">
                                                <div v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]">
                                                    <v-btn small nuxt color="success" class="white--text elevation-2" :to="`/resume/${resume.resume_long_id}`" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]['user']['id'] === loadedUser.id && loadedUserReceivedAuthorizations[resume.resume_long_id].status && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug === 'accorded'">View resume</v-btn>
                                                    <v-chip small color="info white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status  && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug=== 'in_process'">Your access request is in process stage</v-chip>
                                                    <v-chip small color="warning white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status  && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug=== 'revoked'">Your access request has been revoked</v-chip>
                                                    <v-chip small color="error white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status  && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug=== 'refused'">Your access request was refused</v-chip>
                                                </div>
                                                <v-btn small color="primary" class="white--text elevation-2" @click="showAuthModal(resume)" v-if="resume.user_id !== loadedUser.id && !loadedUserReceivedAuthorizations[resume.resume_long_id]">Request access</v-btn>
                                                <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.resume_long_id}`" v-if="resume.user_id === loadedUser.id">View my resume</v-btn>
                                            </div>
                                            <div v-else>
                                                <v-btn small color="primary" class="white--text elevation-2" @click="showAuthModal(resume)">Request access</v-btn>
                                            </div>
                                        </v-layout>
                                    </v-card-actions>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>-->

            <!-- <br /><br /><br /><br /><br /><br /><br /><br /> -->
            <!-- <v-layout row wrap justify-center> -->
			<v-row no-gutters justify="center">
                <!-- <v-flex xs12 sm6> -->
				<v-col :sm="6">
                    <video autoplay loop muted playsinline controls class poster="/images/logo.png" style="border: 1px solid red; width: 100%; height: 500px;">
                        <!-- <source type="video/mp4" src="/videos/video-tif.mp4"> -->
                    </video>
                <!-- </v-flex> -->
				</v-col>
            <!-- </v-layout> -->
			</v-row>

            <!-- <v-layout row wrap> -->
			<v-row no-gutters>
                <!-- Request Authorization Modal -->
                <v-dialog v-model="requestAuthorizationModal" width="500" persistent>
                    <RequestAuthorization :resume="candidateResume" @closeModal="onCloseAuthModal" />
                </v-dialog>
            <!-- </v-layout> -->
			</v-row>

            <masonry :cols="{default: 4, 1904: 4, 1264: 3, 960: 2, 600: 1}" :gutter="{default: '30px', 1904: '30px', 600: '15px'}" v-if="infiniteScrollReady">
                <div v-for="resume of loadedShortResumes" :key="resume.id">
                    <v-hover>
                        <v-card text class="my-4" :class="[`elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }">
                            <!-- <v-layout row wrap> -->
							<v-row no-gutters>
                                <!-- <v-flex xs12 style="white-space: nowrap;"> -->
								<v-col cols="12" style="white-space: nowrap;">
                                    <div class="country-flag" v-if="resume.country">
                                        <v-img :src="`/images/countries/${resume.country.slug}.png`" width="20" class="mb-1"></v-img>
                                    </div>
                                    <div class="language-flag">
                                        <v-img :src="`/images/languages/${language.slug}.png`" width="20" class="mb-1" v-for="(language, index) in resume.languages" :key="index"></v-img>
                                    </div>
                                    <v-avatar :size="78" class="mb-2" v-if="resume.picture">
                                        <img :src="`${resume.picture}`" alt="Candidate picture">
                                    </v-avatar>
                                    <!-- <v-layout justify-center v-else> -->
									<v-row justify="center" v-else>
                                        <avatar justify-center :username="`${resume.firstname} ${resume.lastname}`" :size="78" class="text-xs-center mb-2"></avatar>
                                    <!-- </v-layout> -->
									</v-row>
                                <!-- </v-flex> -->
								</v-col>
                            <!-- </v-layout> -->
							</v-row>

                            <!-- <v-layout fill-height align-center justify-space-around> -->
							<v-row justify="space-around" align="center" class="fill-height">
                                <div>
                                    <v-card-text>
                                        <h3 class="headline mb-0 text-xs-center">{{ resume.job_title }}</h3>
                                        <div class="pt-1 px-2 text-xs-center">{{ resume.job_description }}</div>
                                        <div class="pt-1 px-2 text-xs-center">Visibility: {{ resume.visibility }}</div>
                                        <div class="pt-1 px-2 text-xs-center">Public: {{ resume.public }}</div>
										<div class="pt-1 px-2 text-xs-center">_created_at: {{ resume._created_at }}</div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <!-- <v-layout justify-center v-if="resume.visibility === 'public'"> -->
										<v-row no-gutters justify="center" v-if="resume.visibility === 'public'">
                                            <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.resume_long_id}`">View resume</v-btn>
                                        <!-- </v-layout> -->
										</v-row>
                                        <!-- <v-layout justify-center v-if="resume.visibility === 'semi-private'"> -->
										<v-row no-gutters justify="center" v-if="resume.visibility === 'semi-private'">
                                            <div v-if="loadedUser">
                                                <div v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]">
                                                    <v-btn small nuxt color="success" class="white--text elevation-2" :to="`/resume/${resume.resume_long_id}`" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id]['user']['id'] === loadedUser.id && loadedUserReceivedAuthorizations[resume.resume_long_id].status && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug === 'accorded'">View resume</v-btn>
                                                    <v-chip small color="info white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status  && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug=== 'in_process'">Your access request is being processed</v-chip>
                                                    <v-chip small color="warning white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status  && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug=== 'revoked'">Your access request has been revoked</v-chip>
                                                    <v-chip small color="error white--text" v-if="loadedUserReceivedAuthorizations[resume.resume_long_id].status  && loadedUserReceivedAuthorizations[resume.resume_long_id].status.slug=== 'refused'">Your access request was refused</v-chip>
                                                </div>
                                                <v-btn small color="primary" class="white--text elevation-2" @click="showAuthModal(resume)" v-if="resume.user_id !== loadedUser.id && !loadedUserReceivedAuthorizations[resume.resume_long_id]">Request access</v-btn>
                                                <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.resume_long_id}`" v-if="resume.user_id === loadedUser.id">View my resume</v-btn>
                                            </div>
                                            <div v-else>
                                                <v-btn small color="primary" class="white--text elevation-2" @click="showAuthModal(resume)">Request access</v-btn>
                                            </div>
                                        <!-- </v-layout> -->
										</v-row>
                                    </v-card-actions>
                                </div>
                            <!-- </v-layout> -->
							</v-row>
                        </v-card>
                    </v-hover>
                </div>
                <!-- <infinite-loading @infinite="fetchMoreResumes" v-if="infiniteScrollReady"></infinite-loading> -->
            </masonry>
			<infinite-loading @infinite="fetchMoreResumes" v-if="infiniteScrollReady"></infinite-loading>

            <!-- <div v-for="(item, index) in list" :key="index">
                {{ index }}: {{ item.title }}
            </div>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->

            <!-- <div v-for="(item, index) in resumes" :key="index">
                {{ index }}: {{ item.resume_long_id }}
            </div>
            <v-btn small color="info" @click.stop="loadMore()">Load more</v-btn> -->

            <!-- <v-layout row wrap justify-center>
                <div v-for="(item, index) in resumes" :key="index">
                    {{ index }}: {{ item.resume_long_id }}<br />
                </div>
				<infinite-loading @infinite="infiniteHandler" v-if="infiniteScrollReady"></infinite-loading>
            </v-layout> -->

        </v-container>
    </div>
</template>

<script>
	import firebase from 'firebase/app' // To be removed
	import { firestore } from '~/plugins/firebase-client-init.js' // To be removed
	import Noty from 'noty'
	import axios from 'axios'
	import RequestAuthorization from '~/components/RequestAuthorization'
	import Avatar from 'vue-avatar'
	// import InfiniteLoading from 'vue-infinite-loading'
	import moment from 'moment'
	export default {
		components: { RequestAuthorization, Avatar },
		layout: 'layoutFront',
		// asyncData({ params }) {
		// 	console.log('asyncData')
		// },
		async created() {
			if (process.server) {
				console.log('server side call')
			}
			// try {
			// 	await this.$store.dispatch("resumes/fetchShortResumes");
			// } catch (error) {
			// 	this.$sentry.captureException(new Error(error));
			// }
			const authUser = this.$store.getters['users/loadedUser']
			if (authUser) {
				await this.$store.dispatch(
					'authorizations/fetchUserReceivedAuthorizations',
					authUser.id
				)
			}
			console.log('moment().unix(): ', moment().unix())
			console.log('moment().valueOf(): ', moment().valueOf())

			this.$store.commit('clearError')
			this.$store.commit('closeLoginModal')
			this.$store.commit('closeRequestAuthorizationModal')
			this.$store.commit('clearOpenComponent')
			this.$store.commit('clearRedirect')
			// this.$store.commit('resumes/clearShortResumes')
			// this.$store.commit('resumes/setLastVisible', moment().unix())
			// this.$store.commit('resumes/setLastVisible', 300)

			if (!this.$store.getters['resumes/loadedLastVisible']) {
				this.$store.commit('resumes/setLastVisible', moment().unix())
			}
			console.log('firebase.firestore.FieldValue.serverTimestamp(): ', firebase.firestore.FieldValue.serverTimestamp())

			// this.ref.resumes = firestore.collection('resumes_short').orderBy('_created_at', 'desc')
			// const firstPage = this.ref.resumes.limit(this.paging.resumes_per_page)
			// this.handleQuestions(firstPage)

			// let abc
			// if (process.server) {
			// 	console.log('PROCESS SERVER')
			// 	abc = await this.$store.dispatch('resumes/fetchShortResumesPerPage')
			// } else {
			// 	// this.infiniteScrollReady = true
			// }
			// console.log('abc: ', abc)
			// // this.$store.commit('resumes/clearShortResumes')
			// if (abc !== undefined) {
			// 	this.$store.commit('resumes/clearShortResumes')
			// 	const resumesArray = []
 			// 	abc.forEach(resume => {
			// 		resumesArray.push({ ...resume.data(), id: resume.id })
			// 	})
			// 	console.log('resumesArray: ', resumesArray)
			// 	this.$store.commit('resumes/setShortResumes', resumesArray)
			// 	this.infiniteScrollReady = true
			// 	if (abc.empty) {
			// 		this.paging.end = true
			// 	}
			// 	const lastVisible = abc.docs[abc.size - 1]
			// 	console.log('lastVisible: ', lastVisible)
			// 	this.ref.resumesNext = lastVisible
			// 	// this.$store.commit('resumes/setLastVisible', lastVisible)
			// }
			// this.ref.resumes = firestore
			// 	.collection('resumes_short')
			// 	.where('public', '==', true)
			// 	.where('active', '==', true)
			// 	.orderBy('_created_at', 'desc')
			// const firstPage = this.ref.resumes.limit(this.paging.resumes_per_page)
			// this.handleResumes(firstPage)

			// this.$sentry.captureException(new Error('oups, there is an error from the server'))
			// myUndefinedFunction();
		},
		mounted() {
			this.infiniteScrollReady = true
		},
		data() {
			return {
				// loading: false,
				candidateResume: {},
				carouselItems: [
					{
						src: '/images/carousel1.png'
						// src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
					},
					{
						src: '/images/carousel2.png'
						// src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
					},
					{
						src: '/images/carousel3.png'
						// src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
					}
					// {
					// 	src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
					// }
				],
				page: 1,
				list: [],
				lastVisible: {},
				lastVisible2: {},
				//
				resumes: [],
				paging: {
					resumes_per_page: 1,
					end: false,
					loading: false
				},
				ref: {
					resumes: null,
					resumesNext: null
				},
				infiniteScrollReady: false
			}
		},
		computed: {
			auth() {
				return firebase.auth().currentUser
			},
			loadedUser() {
				return this.$store.getters['users/loadedUser']
			},
			loadedShortResumes() {
				return this.$store.getters['resumes/loadedShortResumes']
			},
			loadedUserReceivedAuthorizations() {
				// return this.$store.getters['authorizations/loadedUserReceivedAuthorizations']
				return this.$store.getters['authorizations/loadedUserReceivedAuthorizationsObject']
			},
			requestAuthorizationModal() {
				return this.$store.getters['requestAuthorizationModal']
			},
			// loadedLastVisible () {
			// 	return this.$store.getters['resumes/loadedLastVisible']
			// }
		},
		methods: {
			async showAuthModal(resume) {
				this.candidateResume = resume
				if (!this.loadedUser) {
					this.$store.commit('setRedirect', '/')
					this.$store.commit('setOpenComponent', 'openRequestAuthorizationModal')
					this.$store.commit('openLoginModal')
					new Noty({
						type: 'info',
						text: 'You need to be authenticated to request an authorization.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					return
				} else {
					this.$store.commit('openRequestAuthorizationModal')
				}
			},
			onCloseAuthModal() {
				this.$store.commit('closeRequestAuthorizationModal')
			},
			async logout() {
				try {
					await this.$store.dispatch('firebase-auth/signOut')
					this.$router.replace('/')
				} catch (error) {
					this.$sentry.captureException(new Error(error))
				}
			},
			async handleResumes(ref) {
				// console.log('ref: ', ref)
				console.log('this.infiniteScrollReady: ', this.infiniteScrollReady)
				const documentSnapshots = await ref.get()
				this.infiniteScrollReady = true
				/* If documentSnapshots is empty, then we have loaded all of pages */
				if (documentSnapshots.empty) {
					this.paging.end = true
					return documentSnapshots
				}

				documentSnapshots.forEach(doc => {
					let questionData = doc.data()
					questionData.id = doc.id
					this.resumes.push(questionData)
				})

				/* Build reference for next page */
				const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1]

				if (!lastVisible) {
					return
				}

				this.ref.resumesNext = this.ref.resumes
					.startAfter(lastVisible)
					.limit(this.paging.resumes_per_page)

				return documentSnapshots
			},
			async infiniteHandler($state) {
				if (this.paging.end) {
					$state.complete()
					return
				}

				this.paging.loading = true
				const documentSnapshots = await this.handleResumes(this.ref.resumesNext)
				setTimeout(() => {
					$state.loaded()
					this.paging.loading = false
					if (documentSnapshots.empty) {
						/* If there is no more questions to load, set paging.end to true */
						this.paging.end = true
					}
				}, 2000)
			},
			async fetchMoreResumes($state) {
				console.log('fetchMoreResumes')
				// this.lastVisible = {name: 'abc'}
				if (this.paging.end) {
					$state.complete()
					return
				}
				this.paging.loading = true

				const snapshot = await this.$store.dispatch('resumes/fetchShortResumesPerPage')
				setTimeout(() => {
					console.log('snapshot: ', snapshot)

					$state.loaded()
					this.paging.loading = false
					if (snapshot.empty) {
						this.paging.end = true
						return
					}
					const shortResumesArray = []
					snapshot.forEach(resume => {
						shortResumesArray.push({ ...resume.data(), id: resume.id })
					})
					console.log('shortResumesArray: ', shortResumesArray)
					this.$store.commit('resumes/addShortResumes', shortResumesArray)
					const lastVisible = shortResumesArray[shortResumesArray.length - 1]._created_at
					console.log('lastVisible: ', lastVisible)
					this.$store.commit('resumes/setLastVisible', lastVisible - 1)
				}, 3000)
			},
			// handleResumes2(ref) {
			// 	return new Promise((resolve, reject) => {
			// 		// setTimeout(() => {
			// 			// if (ref) {
			// 			ref.get().then(documentSnapshots => {
			// 				/* If documentSnapshots is empty, then we have loaded all of pages */
			// 				if (documentSnapshots.empty) {
			// 					this.paging.end = true
			// 					resolve(documentSnapshots)
			// 				}

			// 				documentSnapshots.forEach(doc => {
			// 					let questionData = doc.data()
			// 					questionData.id = doc.id
			// 					this.resumes.push(questionData)
			// 				})

			// 				/* Build reference for next page */
			// 				const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1]

			// 				if (!lastVisible) {
			// 					return
			// 				}

			// 				this.ref.resumesNext = this.ref.resumes
			// 					.startAfter(lastVisible)
			// 					.limit(this.paging.resumes_per_page)

			// 				resolve(documentSnapshots)
			// 			})
			// 			// }
			// 		// }, 2000)
			// 	})
			// },

			// infiniteHandler($state) {
			// 	axios
			// 		.get('//hn.algolia.com/api/v1/search_by_date?tags=story', {
			// 			params: {
			// 				page: this.page
			// 			}
			// 		})
			// 		.then(({ data }) => {
			// 			if (data.hits.length) {
			// 				setTimeout(() => {
			// 					this.page += 1
			// 					this.list.push(...data.hits)
			// 					$state.loaded()
			// 				}, 3000)
			// 			} else {
			// 				$state.complete()
			// 			}
			// 		})
			// },
			loadMore() {
				if (this.paging.end) {
					return
				}

				this.paging.loading = true
				this.handleQuestions(this.ref.resumesNext).then(documentSnapshots => {
					this.paging.loading = false

					if (documentSnapshots.empty) {
						/* If there is no more questions to load, set paging.end to true */
						this.paging.end = true
					}
				})
			},
			handleQuestions(ref) {
				return new Promise((resolve, reject) => {
					ref.get().then(documentSnapshots => {
						/* If documentSnapshots is empty, then we have loaded all of pages */
						if (documentSnapshots.empty) {
							this.paging.end = true
							resolve(documentSnapshots)
						}

						documentSnapshots.forEach(doc => {
							let questionData = doc.data()
							questionData.id = doc.id
							this.resumes.push(questionData)
						})

						/* Build reference for next page */
						const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1]

						if (!lastVisible) {
							return
						}

						this.ref.resumesNext = this.ref.resumes
							.startAfter(lastVisible)
							.limit(this.paging.resumes_per_page)

						resolve(documentSnapshots)
					})
				})
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
	}
	.link {
		text-decoration: none;
		color: #fff;
	}
	.country-flag {
		position: absolute;
		top: 15px;
		left: 0px;
	}
	.language-flag {
		position: absolute;
		top: 15px;
		right: 0px;
	}
</style>
