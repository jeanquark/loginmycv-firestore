<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="amber">
            <v-toolbar-title>Register a new candidate</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <form @submit.prevent="signUserUp">
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-text-field
                            label="Firstname"
                            id="firstname"
                            name="firstname"
                            prepend-icon="person"
                            required
                            v-model="form.firstname"
                        ></v-text-field>

                        <v-text-field
                            label="Lastname"
                            id="lastname"
                            name="lastname"
                            prepend-icon="person"
                            required
                            v-model="form.lastname"
                        ></v-text-field>
                    
                        <v-text-field
                            label="Email"
                            id="email"
                            name="email"
                            prepend-icon="person"
                            required
                            v-model="form.email"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                        <v-text-field
                            label="Username"
                            id="username"
                            name="username"
                            prepend-icon="person"
                            required
                            v-model="form.username"
                        ></v-text-field>

                        <v-text-field
                            label="Password"
                            id="password"
                            name="password"
                            prepend-icon="lock" 
                            type="password"
                            required
                            v-model="form.password"
                        ></v-text-field>

                        <v-text-field
                            label="Confirm Password"
                            id="password_confirmation"
                            name="password_confirmation"
                            prepend-icon="lock" 
                            type="password"
                            required
                            v-model="form.password_confirmation"
                        ></v-text-field>        
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs6 offset-xs3>
                        <v-checkbox
                            value="1"
                            label="Provide a password to protect my resume"
                            type="checkbox"
                            color="amber"
                            text-xs-center
                            v-model="form.protectResume"
                        ></v-checkbox>
                        
                        <div v-if="form.protectResume">
                            <v-text-field
                                label="Password to access your resume"
                                id="guest_password"
                                name="guest_password"
                                prepend-icon="lock" 
                                type="password"
                                v-model="form.guest_password"
                            ></v-text-field>

                            <v-text-field
                                label="Confirm password"
                                id="guest_password_confirmation"
                                name="guest_password_confirmation"
                                prepend-icon="lock" 
                                type="password"
                                v-model="form.guest_password_confirmation"
                            ></v-text-field>
                        </div>
                    </v-flex>
                </v-layout>

                <v-layout justify-center>
                    <v-btn color="primary" type="submit" :loading="loading">Register</v-btn>
                </v-layout>    
            </form>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn flat @click="switchToLogin">
                Switch to login
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
	import axios from 'axios'
	export default {
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
                    username: '',
                    password: '',
                    password_confirmation: '',
                    protectResume: '',
                    guest_password: '',
                    guest_password_confirmation: ''
				},
			}
		},
		computed: {
            loading () {
                return this.$store.getters['index/loading']
            },
            error () {
                return this.$store.getters['index/error']
            }
		},
		methods: {
            switchToLogin () {
                this.$emit('registerChildToParent')
            },
			async signUserUp () {
				console.log('signUserUp')
                this.$store.commit('setLoading', true)
				const registerData = this.form
                console.log('registerData: ', registerData)
                try {
                    await this.$store.dispatch('firebase-auth/signUserUp', registerData)
                    this.$store.commit('setLoading', false)
                } catch (error) {
                    this.$store.commit('setError', error.response.data.errors)
                    this.$store.commit('setLoading', false)
                    this.$router.replace('/candidate')
                }
          //       console.log('registerData: ', registerData)
	        	// try {
	        	// 	const snapshot = await axios.post('/register-new-user', registerData)
	        	// 	console.log('snapshot: ', snapshot)
          //           this.$store.commit('clearError')
          //           // this.$store.commit('index/setLoading', false)
	        	// 	// window.location.href = '/candidate'
	        	// } catch (error) {
	        	// 	// console.log('error2: ', error)
          //           console.log('error2: ', error.response)
          //           this.$store.commit('setError', error.response.data.errors)
          //           this.$store.commit('setLoading', false)
	        	// 	// this.errors.push(error.response.data.message)
	        	// }
			}
		}
	}

</script>

<style>

</style>