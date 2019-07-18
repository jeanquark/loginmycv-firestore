<template>
    <div class="text-xs-center">
        <v-carousel style="width: 100%; margin: 0px; padding: 0px;">
            <v-carousel-item v-for="(item,i) in carouselItems" :key="i" :src="item.src" :lazy="true"></v-carousel-item>
        </v-carousel>

        <v-container grid-list-md text-xs-center>
            <v-layout row wrap justify-center class="mb-5">
                <v-flex xs12>
                    <h1>Welcome to LoginMyCV</h1>
                    <h2 class="grey--text text--lighten-1" style="font-weight: normal;">Your online CV provider</h2><br />

                    <v-layout justify-center>
                        <v-img src="/images/logo3.png" :lazy-src="'/images/logo3.png'" max-width="220" />
                    </v-layout>
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
                    <h2 class="subtitle display-1 mb-2">How it works</h2>
                    <v-layout>
                        <v-flex xs6>
                            <h4 class="primaryColor">Create a new resume:</h4><br />
                            <!-- <v-img src="/images/frontpage-text.svg" /> -->
                            <v-img src="/images/gifs/create_resume.gif" />
                        </v-flex>
                        <v-flex xs6>
                            <v-img src="/images/frontpage-img6.png" />
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <!-- <v-layout row wrap justify-center>
                <v-flex xs12>
                    <h2 class="subtitle display-1">Browse candidates</h2>
                    <br />
                </v-flex>
                <v-flex xs12 sm6 md4 lg4 v-for="resume of loadedShortResumes" :key="resume.username">
                    <v-hover>
                        <v-card flat class="ma-2" :class="[`elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }">
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
            </v-layout> -->























			<!-- <br /><br /><br /><br /><br /><br /><br /><br /> -->

            <masonry 
				:cols="{default: 4, 1904: 4, 1264: 3, 960: 2, 600: 1}"
				:gutter="{default: '30px', 1904: '30px', 600: '15px'}"
			>
				<div v-for="resume of loadedShortResumes" :key="resume.username">
                    <v-hover>
                        <v-card flat class="my-4" :class="[`elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }">
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
                </div>
            </masonry>










            <v-layout row wrap>
                <!-- Request Authorization Modal -->
                <v-dialog v-model="requestAuthorizationModal" width="500" lazy persistent>
                    <RequestAuthorization :resume="candidateResume" />
                </v-dialog>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
	import firebase from 'firebase/app'
	import { firestore } from '~/plugins/firebase-client-init.js'
	import Noty from 'noty'
	import axios from 'axios'
	import RequestAuthorization from '~/components/RequestAuthorization'
	import Avatar from 'vue-avatar'
	export default {
		components: { RequestAuthorization, Avatar },
		layout: 'layoutFront',
		async created() {
			try {
				await this.$store.dispatch('resumes/fetchShortResumes')
			} catch (error) {
				this.$sentry.captureException(new Error(error))
			}
			const authUser = this.$store.getters['users/loadedUser']
			if (authUser) {
				await this.$store.dispatch(
					'authorizations/fetchUserReceivedAuthorizations',
					authUser.id
				)
			}

			this.$store.commit('clearError')
			this.$store.commit('closeLoginModal')
			this.$store.commit('closeRequestAuthorizationModal')
			this.$store.commit('clearOpenComponent')
			this.$store.commit('clearRedirect')

			// this.$sentry.captureException(new Error('oups, there is an error from the server'))
			// myUndefinedFunction();
		},
		mounted() {},
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
				]
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
				return this.$store.getters[
					'authorizations/loadedUserReceivedAuthorizationsObject'
				]
			},
			requestAuthorizationModal() {
				return this.$store.getters['requestAuthorizationModal']
			}
		},
		methods: {
			async showAuthModal(resume) {
				this.candidateResume = resume
				if (!this.loadedUser) {
					this.$store.commit('setRedirect', '/')
					this.$store.commit(
						'setOpenComponent',
						'openRequestAuthorizationModal'
					)
					this.$store.commit('openLoginModal')
					new Noty({
						type: 'info',
						text:
							'You need to be authenticated to request an authorization.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					return
				} else {
					this.$store.commit('openRequestAuthorizationModal')
				}
			},
			// redirectToResume (slug, id) {
			// 	console.log('redirectToResume: ', slug, id)

			// },
			async logout() {
				try {
					await this.$store.dispatch('firebase-auth/signOut')
					this.$router.replace('/')
				} catch (error) {
					this.$sentry.captureException(new Error(error))
				}
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
