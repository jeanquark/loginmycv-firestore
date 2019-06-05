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
                color="info"
                icon="info"
                outline
                class=""
                v-if="this.message"
            >
                {{ this.message }}
            </v-alert><br />
            <v-alert
                :value="error"
                color="error"
                icon="error"
                outline
            >
                {{ error }}
            </v-alert><br />
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
                        <v-btn block color="#df4a32" class="white--text" @click="signInWithGoogle">Login with Google</v-btn>
                    </v-flex>
                    <v-flex xs6 class="px-2">
                        <v-btn block color="#3c5a99" class="white--text" @click="signInWithFacebook" :disabled="true">Login with Facebook</v-btn>
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
            this.$store.commit('clearError')
            this.$store.commit('setLoading', false)
        },
		data () {
			return {
				form: {
					email: 'jm.kleger@gmail.com',
					password: 'secret'
				},
				// errors: []
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
            switchToRegister () {
                this.$emit('switchToRegisterModal')
            },
            switchToForgotPassword () {
                this.$emit('switchToForgotPasswordModal')
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
                } catch (error) {
                    console.log('error: ', error)
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
                    await this.$store.dispatch('firebase-auth/signInWithGooglePopup')
                    new Noty({
                        type: 'success',
                        text: 'Login went successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                    this.$router.replace('/candidate/resumes')
                } catch (error) {
                    console.log('error: ', error)
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and you could not log in.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                }
            },
            async signInWithFacebook () {
                console.log('signInWithFacebook')
                await this.$store.dispatch('firebase-auth/signInWithFacebookPopup')
                this.$router.replace('/candidate/resumes')
            },
		}
	}

</script>

<style scoped>

</style>