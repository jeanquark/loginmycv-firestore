<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Register a new candidate</v-toolbar-title>
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
                            :error-messages="errors.collect('firstname')"
                            v-model="form.firstname"
                        ></v-text-field>

                        <v-text-field
                            label="Lastname"
                            id="lastname"
                            name="lastname"
                            prepend-icon="person"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('lastname')"
                            v-model="form.lastname"
                        ></v-text-field>
                    
                        <v-text-field
                            label="Email"
                            id="email"
                            name="email"
                            prepend-icon="person"
                            v-validate="'required|email'"
                            :error-messages="errors.collect('email')"
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
                            v-validate="'required|max:30'"
                            :counter="30"
                            v-model="form.password"
                        ></v-text-field>

                        <v-text-field
                            label="Confirm Password"
                            name="password_confirmation"
                            prepend-icon="lock" 
                            type="password"
                            v-validate="'required|confirmed:password'"
                            :error-messages="errors.collect('password_confirmation')"
                            data-vv-as="Password"
                            v-model="form.password_confirmation"
                        ></v-text-field>        
                    </v-flex>
                </v-layout>

                <v-layout justify-center>
                    <v-btn color="primary" type="submit" :loading="loading" :disabled="errors.items.length > 0">Register</v-btn>
                </v-layout>    
            </form>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn flat color="primary" @click="switchToLogin">
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
            },
		},
		methods: {
            switchToLogin () {
                this.$emit('registerChildToParent')
            },
			async signUserUp () {
                await this.$validator.validateAll()
                if (!this.errors.any()) {
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
                }
			}
		}
	}

</script>

<style>

</style>