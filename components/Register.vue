<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <form @submit.prevent="signUserUp('register')" data-vv-scope="register">
                <!-- <v-layout row wrap> -->
				<v-row no-gutters>
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

                    <!-- <v-flex xs6> -->
					<v-col cols="6">
							<!--  -->
						
                        <v-text-field
                            label="Firstname"
                            id="firstname"
                            name="firstname"
                            prepend-icon="mdi-account"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors ? errors.collect('register.firstname') : null"
                            v-model="form.firstname"
							:success="form.firstname.length > 0 ? true : false"
							:append-icon="form.firstname.length > 0 ? 'mdi-check' : ''"
                        ></v-text-field>

                        <v-text-field
                            label="Lastname"
                            id="lastname"
                            name="lastname"
                            prepend-icon="mdi-account"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors ? errors.collect('register.lastname') : null"
                            v-model="form.lastname"
							:success="form.lastname.length > 0 ? true : false"
							:append-icon="form.lastname.length > 0 ? 'mdi-check' : ''"
                        ></v-text-field>
                    
                        <v-text-field
                            label="Email"
                            id="email"
                            name="email"
                            prepend-icon="mdi-email"
                            v-validate="'required|email'"
                            :error-messages="errors ? errors.collect('register.email') : null"
                            v-model="form.email"
							:success="form.email.length > 0 ? true : false"
							:append-icon="form.email.length > 0 ? 'mdi-check' : ''"
                        ></v-text-field>
                    <!-- </v-flex> -->
					</v-col>

                    <!-- <v-flex xs6> -->
					<v-col cols="6">
                        <v-text-field
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock-question" 
                            type="password"
                            ref="password"
                            v-validate="'required|min:6|max:30'"
                            :error-messages="errors ? errors.collect('register.password') : null"
                            data-vv-as="Password"
                            :counter="30"
                            v-model="form.password"
							:success="form.password.length > 0 ? true : false"
							:append-icon="errors && errors.collect('register.password').length || !form.password.length ? '' : 'mdi-check'"
                        ></v-text-field>

                        <v-text-field
                            label="Confirm Password"
                            name="password_confirmation"
                            prepend-icon="mdi-lock-question" 
                            type="password"
                            v-validate="'required|confirmed:password'"
                            :error-messages="errors ? errors.collect('register.password_confirmation') : null"
                            data-vv-as="Password"
                            v-model="form.password_confirmation"
							:success="form.password_confirmation.length > 0 ? true : false"
							:append-icon="errors && errors.collect('register.password_confirmation').length || !form.password_confirmation.length ? '' : 'mdi-check'"
                        ></v-text-field>        
                    <!-- </v-flex> -->
					</v-col>
                <!-- </v-layout> -->
				</v-row>

                <!-- <v-layout justify-center> -->
				<v-row justify="center">
                    <v-btn color="primary" type="submit" :loading="loading">Register</v-btn>
                <!-- </v-layout> -->
				</v-row>

                <!-- <v-layout row wrap class="mt-3 mb-2"> -->
				<v-row class="mt-3 mb-2">
                    <!-- <v-flex xs12 sm6 class="px-2"> -->
					<v-col cols="12" sm="6" class="px-2">
                        <v-btn block color="#df4a32" class="white--text" :loading="loadingGoogle" @click="signInWithGoogle">Register with Google &nbsp;<font-awesome-icon :icon="['fab', 'google']" /></v-btn>
                    <!-- </v-flex> -->
					</v-col>
                    <!-- <v-flex xs12 sm6 class="px-2"> -->
					<v-col cols="12" sm="6" class="px-2">
                        <v-btn block color="#3c5a99" class="white--text" :loading="loadingFacebook" @click="signInWithFacebook">Register with Facebook &nbsp;<font-awesome-icon :icon="['fab', 'facebook-f']" /></v-btn>
                    <!-- </v-flex> -->
					</v-col>
                <!-- </v-layout> -->
				</v-row>

                <!-- <v-layout justify-center> -->
				<v-row justify="center">
                    <v-btn text color="primary" @click="switchToLogin">
                        Switch to login
                    </v-btn>
                    <v-btn text color="secondary" @click="closeModal">
                        Close
                    </v-btn>
                <!-- </v-layout> -->
				</v-row>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Noty from 'noty'
	export default {
        inject: ['$validator'], // inject parent validator
        created () {
            this.$store.commit('clearError')
            this.$store.commit('setLoading', false)
        },
		data () {
			return {
				form: {
					firstname: '',
					lastname: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                loadingGoogle: false,
                loadingFacebook: false
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading']
            },
            error () {
                return this.$store.getters['error']
            },
		},
		methods: {
            switchToLogin () {
                this.$emit('switchToLoginModal')
            },
            closeModal () {
                this.$emit('closeRegisterModal')
            },
            async signUserUp (scope) {
                await this.$validator.validateAll(scope)
                if (!this.errors.any()) {
                    // console.log('signUserUp!')
                    try {
                        this.$store.commit('setLoading', true, { root: true })
                        await this.$store.dispatch('firebase-auth/signUserUp', this.form)
                        this.$store.commit('setLoading', false, { root: true })
                        new Noty({
                            type: 'success',
                            text: `Registration went successfully. Please check your inbox at ${this.form.email} to confirm your identity. Welcome aboard &#128522;!`,
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                        this.switchToLogin()
                    } catch (error) {
                        // console.log('error2: ', error)
                        this.$store.commit('setError', error)
                        this.$store.commit('setLoading', false, { root: true })
                        if (error.code === 'auth/email-already-in-use') {
                            new Noty({
                                type: 'error',
                                text: error.message,
                                timeout: 5000,
                                theme: 'metroui'
                            }).show()
                        } else {
                            new Noty({
                                type: 'error',
                                text: 'Sorry, an error occured and the registration process was interrupted.',
                                timeout: 5000,
                                theme: 'metroui'
                            }).show()
							this.$sentry.captureException(new Error(error))
						}
                    }
                }
            },
            async signInWithGoogle () {
                try {
                    // console.log('signInWithGoogle')
                    this.loadingGoogle = true
                    await this.$store.dispatch('firebase-auth/signInWithGooglePopup')
                    new Noty({
                        type: 'success',
                        text: 'Login went successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                    this.loadingGoogle = false
                    this.$router.replace('/candidate/resumes')
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
                    this.$router.replace('/candidate/resumes')
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
            }
		}
	}
</script>

<style scoped>
	/* >>> .v-input__icon--append .v-icon { 
    	color: yellow !important;
	} */
</style>