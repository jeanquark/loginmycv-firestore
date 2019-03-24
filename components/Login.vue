<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login User</v-toolbar-title>
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
            <v-form v-on:submit.prevent="signUserIn">
                <v-text-field
                    name="email"
                    label="Email"
                    type="email"
                    prepend-icon="person"
                    required
                    v-model="form.email"
                ></v-text-field>

                <v-text-field
                	name="password" 
                    label="Password" 
                    type="password"
                    prepend-icon="lock" 
                    required
                    v-model="form.password"
                ></v-text-field>

                <v-layout justify-center>
                    <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
                </v-layout>
                <v-layout justify-center> 
                    <a href="/candidate/password/reset">Forgot Password</a>
                </v-layout>
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn flat color="primary" @click="switchToRegister">
                Switch to register
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
	import axios from 'axios'
	export default {
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
                this.$emit('loginChildToParent')
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
            }
		}
	}

</script>

<style>

</style>