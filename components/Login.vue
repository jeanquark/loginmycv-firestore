<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <!-- error: {{ error }}<br /> -->
            <!-- message: {{ this.message }} -->
            <v-alert
                :value="true"
                type="info"
                color="info"
                outline
                class="mb-3"
                v-if="this.message"
            >
                {{ this.message }}
            </v-alert>
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
            <!-- <v-alert
                :value="true"
                type="info"
                color="info"
                outline
                class="mb-3"
                v-if="error && error.code === 'email_not_verified'"
            > -->
            <div class="text-xs-center" v-if="error && error.code === 'email_not_verified' && error.authData">
                <v-btn color="primary" small class="mb-3" @click="sendVerificationEmail(error.authData)" :loading="loadingSendVerificationEmail">Send me a new verification email</v-btn>
            <!-- </v-alert> -->
            </div>
            <v-form v-on:submit.prevent="signUserIn">
                <v-text-field
                    label="Email"
                    name="email"
                    type="email"
                    prepend-icon="person"
                    v-model="form.email"
                ></v-text-field>

                <v-text-field
                    label="Password" 
                	name="password" 
                    type="password"
                    prepend-icon="lock" 
                    v-model="form.password"
                ></v-text-field>

                <v-layout justify-center class="mb-2">
                    <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
                </v-layout>

                <v-layout row wrap class="mb-2">
                    <v-flex xs6 class="px-2">
                        <v-btn block color="#df4a32" class="white--text" :loading="loadingGoogle" @click="signInWithGoogle">Login with Google &nbsp;<font-awesome-icon :icon="['fab', 'google']" /></v-btn>
                    </v-flex>
                    <v-flex xs6 class="px-2">
                        <v-btn block color="#3c5a99" class="white--text" :loading="loadingFacebook" @click="signInWithFacebook">Login with Facebook &nbsp;<font-awesome-icon :icon="['fab', 'facebook-f']" /></v-btn>
                    </v-flex>
                </v-layout>

                <v-layout justify-center class="mb-1"> 
                    <!-- <a href="/candidate/password/reset">Forgot Password</a> -->
                    <v-btn flat color="secondary" @click="switchToForgotPassword">
                        I forgot my password
                    </v-btn>
                </v-layout>
                <v-layout justify-center>
                    <v-btn flat color="primary" @click="switchToRegister">
                        Switch to register
                    </v-btn>
                    <v-btn flat color="secondary" @click="closeModal" v-if="loading">
                        Close
                    </v-btn>
                </v-layout>
            </v-form>
        </v-card-text>
        <!-- <v-card-actions class="justify-center">
            <v-btn flat color="primary" @click="switchToRegister">
                Switch to register
            </v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Noty from 'noty'
	export default {
        inject: ['$validator'], // inject parent validator
        props: ['message'],
        created () {
            // this.$store.commit('clearError')
            // this.$store.commit('setLoading', false)
        },
		data () {
			return {
				form: {
					email: 'jm.kleger@gmail.com',
					password: 'secret'
				},
                // errors: []
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
                    console.log('sendVerificationEmail: ', authData)
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
                    console.log('error: ', error)
                    this.loadingSendVerificationEmail = false
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and the verification email could not be sent.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                }
            },
			async signUserIn () {
                console.log('signUserIn')
                try {
                    await this.$store.dispatch('firebase-auth/signUserIn', this.form)
                    console.log('Success!')
                    // new Noty({
                    //     type: 'success',
                    //     text: 'Log in successfully!',
                    //     timeout: 5000,
                    //     theme: 'metroui'
                    // }).show()
                    this.$router.replace('/candidate/resumes')
                    this.$store.commit('setLoading', false, { root: true })
                } catch (error) {
                    console.log('error from client: ', error)
                    // new Noty({
                    //     type: "error",
                    //     text: "Sorry, an error occured and you could not log in.",
                    //     timeout: 5000,
                    //     theme: "metroui"
                    // }).show()
                }
            },
            async signInWithGoogle () {
                try {
                    console.log('signInWithGoogle')
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
                    console.log('error: ', error)
                    this.loadingGoogle = false
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and you could not log in.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                }
            },
            async signInWithFacebook () {
                try {
                    console.log('signInWithFacebook')
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
                    console.log('error: ', error)
                    this.loadingFacebook = false
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and you could not log in.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                }
            }
		}
	}

</script>

<style scoped>

</style>