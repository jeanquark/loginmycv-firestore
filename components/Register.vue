<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <form @submit.prevent="signUserUp">
                <v-layout row wrap>
                    <!-- errors: {{ errors }} -->
                    <v-flex xs6>
                        <v-text-field
                            label="Firstname"
                            id="firstname"
                            name="firstname"
                            prepend-icon="person"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors ? errors.collect('firstname') : null"
                            v-model="form.firstname"
                        ></v-text-field>

                        <v-text-field
                            label="Lastname"
                            id="lastname"
                            name="lastname"
                            prepend-icon="person"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors ? errors.collect('lastname') : null"
                            v-model="form.lastname"
                        ></v-text-field>
                    
                        <v-text-field
                            label="Email"
                            id="email"
                            name="email"
                            prepend-icon="person"
                            v-validate="'required|email'"
                            :error-messages="errors ? errors.collect('email') : null"
                            v-model="form.email"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                        <!-- <v-text-field
                            label="Username"
                            id="username"
                            name="username"
                            prepend-icon="person"
                            v-validate="'required|max:30'"
                            :counter="30"
                            :error-messages="errors.collect('username')"
                            v-model="form.username"
                        ></v-text-field> -->

                        <v-text-field
                            label="Password"
                            name="password"
                            prepend-icon="lock" 
                            type="password"
                            ref="password"
                            v-validate="'required|min:6|max:30'"
                            :error-messages="errors ? errors.collect('password') : null"
                            data-vv-as="Password"
                            :counter="30"
                            v-model="form.password"
                        ></v-text-field>

                        <v-text-field
                            label="Confirm Password"
                            name="password_confirmation"
                            prepend-icon="lock" 
                            type="password"
                            v-validate="'required|confirmed:password'"
                            :error-messages="errors ? errors.collect('password_confirmation') : null"
                            data-vv-as="Password"
                            v-model="form.password_confirmation"
                        ></v-text-field>        
                    </v-flex>
                </v-layout>

                <v-layout justify-center>
                    <v-btn color="primary" type="submit" :loading="loading" :disabled="errors && errors.items.length > 0">Register</v-btn>
                </v-layout>
                <v-layout justify-center>
                    <v-btn flat color="primary" @click="switchToLogin">
                        Switch to login
                    </v-btn>
                </v-layout>
            </form>
        </v-card-text>
        <!-- <v-card-actions class="justify-center">
            <v-btn flat color="primary" @click="switchToLogin">
                Switch to login
            </v-btn>
        </v-card-actions> -->
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
            // this.errors = null
        },
		data () {
			return {
				form: {
					firstname: '',
					lastname: '',
                    email: '',
                    username: '',
                    password: '',
                    password_confirmation: ''
				}
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
			async signUserUp () {
                await this.$validator.validateAll()
                if (!this.errors.any()) {
                    console.log('signUserUp!')
                    try {
                        this.$store.commit('setLoading', true, { root: true })
                        await this.$store.dispatch('firebase-auth/signUserUp', this.form)
                        this.$store.commit('setLoading', false, { root: true })
                        // this.$router.replace('/candidate/resumes')
                        // this.$router.push('/candidate/resumes')
                        // redirect('/candidate/resumes')
                    } catch (error) {
                        console.log('error2: ', error)
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
                        }
                    }
                }
			}
		}
	}

</script>

<style scoped>

</style>