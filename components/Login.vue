<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-alert
                :value="error"
                type="error"
                color="error"
                outline
                class="mb-3"
                v-if="error"
            >
                {{ error.message }}
            </v-alert>
        
            <div class="text-xs-center" v-if="error && error.code === 'email_not_verified' && error.authData">
                <v-btn color="primary" small class="mb-3" @click="sendVerificationEmail(error.authData)" :loading="loadingSendVerificationEmail">Send me a new verification email</v-btn>
            </div>

            <v-form v-on:submit.prevent="signUserIn">
                <v-text-field
                    label="Email"
                    name="email"
                    type="email"
                    prepend-icon="mdi-account"
                    v-model="form.email"
                ></v-text-field>

                <v-text-field
                    label="Password" 
                	name="password" 
                    type="password"
                    prepend-icon="mdi-lock-question" 
                    v-model="form.password"
                ></v-text-field>

                <!-- <v-layout justify-center class="mb-2"> -->
				<v-row no-gutters justify="center" class="mb-2">
                    <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
                <!-- </v-layout> -->
				</v-row>

                <!-- <v-layout row wrap class="mt-3 mb-2"> -->
				<v-row no-gutters class="mt-3 mb-2">
                    <!-- <v-flex xs12 sm6 class="px-2"> -->
					<v-col xs="12" sm="6" class="px-2">
                        <v-btn block color="#df4a32" class="white--text" :loading="loadingGoogle" @click="signInWithGoogle">Login with Google &nbsp;<font-awesome-icon :icon="['fab', 'google']" /></v-btn>
                    <!-- </v-flex> -->
					</v-col>
                    <!-- <v-flex xs12 sm6 class="px-2"> -->
					<v-col xs="12" sm="6" class="px-2">
                        <v-btn block color="#3c5a99" class="white--text" :loading="loadingFacebook" @click="signInWithFacebook">Login with Facebook &nbsp;<font-awesome-icon :icon="['fab', 'facebook-f']" /></v-btn>
                    <!-- </v-flex> -->
					</v-col>
                <!-- </v-layout> -->
				</v-row>

                <!-- <v-layout justify-center class="mb-1">  -->
				<v-row no-gutters justify="center" class="mb-1">
                    <v-btn text color="secondary" @click="switchToForgotPassword">
                        I forgot my password
                    </v-btn>
                <!-- </v-layout> -->
				</v-row>
                <!-- <v-layout justify-center> -->
				<v-row no-gutters justify="center">
                    <v-btn text color="primary" @click="switchToRegister">
                        Switch to register
                    </v-btn>
                    <v-btn text color="secondary" @click="closeModal">
                        Close
                    </v-btn>
                <!-- </v-layout> -->
				</v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Noty from 'noty'
	export default {
        inject: ['$validator'], // inject parent validator
        created () {
        },
		data () {
			return {
				form: {
					email: '',
					password: ''
				},
                loadingGoogle: false,
                loadingFacebook: false,
                loadingSendVerificationEmail: false
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading']
            },
            error () {
                return this.$store.getters['error']
            }
		},
		methods: {
            closeModal () {
                this.$emit('closeLoginModal')
            },
            switchToRegister () {
                this.$emit('switchToRegisterModal')
            },
            switchToForgotPassword () {
                this.$emit('switchToForgotPasswordModal')
            },
            async sendVerificationEmail (authData) {
                try {
                    // console.log('sendVerificationEmail: ', authData)
                    this.loadingSendVerificationEmail = true
                    await this.$store.dispatch('firebase-auth/sendVerificationEmail', authData)
                    this.loadingSendVerificationEmail = false
                    this.$store.commit('clearError')
                    new Noty({
                        type: 'success',
                        text: 'Email sent successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                } catch (error) {
					// console.log('error: ', error)
                    this.loadingSendVerificationEmail = false
                    new Noty({
						type: 'error',
                        text: 'Sorry, an error occured and the verification email could not be sent.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
					this.$sentry.captureException(new Error(error))
                }
            },
			async signUserIn () {
                try {
                    // console.log('signUserIn')
                    await this.$store.dispatch('firebase-auth/signUserIn', this.form)
                    // console.log('Success!')
                    this.$store.commit('closeLoginModal')
                    if (this.$store.getters['loadedOpenComponent']) {
                        this.$store.commit(this.$store.getters['loadedOpenComponent'])
                        this.$store.commit('clearOpenComponent')
                    }
                    if (this.$store.getters['loadedRedirect']) {
                        this.$router.replace(this.$store.getters['loadedRedirect'])
                        this.$store.commit('clearRedirect')
                    } else {
                        this.$router.replace('/candidate/resumes')
                    }
                    this.$store.commit('setLoading', false, { root: true })
                } catch (error) {
					// console.log('error from client: ', error)
                    this.$store.commit('setLoading', false, { root: true })
                    new Noty({
						type: "error",
                        text: "Sorry, an error occured and you could not log in.",
                        timeout: 5000,
                        theme: "metroui"
                    }).show()
					this.$sentry.captureException(new Error(error))
                }
            },
            async signInWithGoogle () {
                try {
                    // console.log('signInWithGoogle')
                    this.loadingGoogle = true
                    await this.$store.dispatch('firebase-auth/signInWithGooglePopup')
                    this.loadingGoogle = false
                    if (this.$store.getters['loadedOpenComponent']) {
                        this.$store.commit(this.$store.getters['loadedOpenComponent'])
                        this.$store.commit('clearOpenComponent')
			            this.$store.commit('closeLoginModal')
                    }
                    if (this.$store.getters['loadedRedirect']) {
                        this.$router.replace(this.$store.getters['loadedRedirect'])
                        this.$store.commit('clearRedirect')
			            this.$store.commit('closeLoginModal')
                    } else {
                        this.$router.replace('/candidate/resumes')
			            this.$store.commit('closeLoginModal')                        
                    }
                } catch (error) {
					// console.log('error: ', error)
                    this.loadingGoogle = false
                    new Noty({
						type: 'error',
                        text: 'Sorry, an error occured and you could not log in.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
					this.$sentry.captureException(new Error(error))
                }
            },
            async signInWithFacebook () {
                try {
                    // console.log('signInWithFacebook')
                    this.loadingFacebook = true
                    await this.$store.dispatch('firebase-auth/signInWithFacebookPopup')
                    new Noty({
                        type: 'success',
                        text: 'Login went successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                    this.loadingFacebook = false
                    if (this.$store.getters['loadedOpenComponent']) {
                        this.$store.commit(this.$store.getters['loadedOpenComponent'])
                        this.$store.commit('clearOpenComponent')
                    }
                    if (this.$store.getters['loadedRedirect']) {
                        this.$router.replace(this.$store.getters['loadedRedirect'])
                        this.$store.commit('clearRedirect')
                    } else {
                        this.$router.replace('/candidate/resumes')
                    }
                } catch (error) {
                    // console.log('error: ', error)
                    this.loadingFacebook = false
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and you could not log in.',
                        timeout: 5000,
                        theme: 'metroui'
					}).show()
					this.$sentry.captureException(new Error(error))
                }
            },
            openRequestAuthorizationModal () {
                this.$store.commit('closeLoginModal')
                this.$store.commit('openRequestAuthorizationModal')
                this.$router.replace('/')
            }
		}
	}

</script>

<style scoped>

</style>