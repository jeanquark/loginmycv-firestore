<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <!-- <v-img src="/images/loader.gif" max-width="200px" v-if="!candidate.resume_long_id"></v-img> -->
                    <v-flex xs12 sm8 md4 v-cloak>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Password protected resume</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
									<p class="text-xs-center">Have a password? Gain direct access to {{ slug }}'s resume now!</p>
									<!-- error: {{ error }}<br /> -->
									<!-- errors: {{ errors }}<br /> -->
                                    <!-- <v-text-field 
                                        prepend-icon="person" 
                                        name="username" 
                                        label="Username" 
                                        type="text"
                                        v-model="form.username"
                                        style="display: none"
                                    ></v-text-field> -->
                                    <v-text-field
                                        prepend-icon="lock" 
                                        name="password" 
                                        label="Password" 
                                        type="password"
                                        v-model="form.password"
										:error-messages="error ? error.message : ''"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn nuxt to="/" color="default">Cancel</v-btn>
                                <v-btn color="primary" @click.prevent="signVisitorIn">Access {{ firstname}} resume</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
	import Noty from 'noty'
	import { firestore } from '~/plugins/firebase-client-init'
    export default {
		async mounted () {
			// const slug = params.slug
			// console.log('slug: ', slug)
			// this.$store.commit('clearError', { root: true })
            this.slug = this.$route.params.slug
			console.log('this.slug: ', this.slug)
            // this.form.username = slug

            // // Check that resume exists
            // let candidate = {}
            // const snapshot = await firestore.collection('resumes_short').where('resume_long_id', '==', slug).get()
            // snapshot.forEach(doc => {
            //     candidate = doc.data()
            // })
            // console.log('candidate: ', candidate)
            // if (!candidate.resume_long_id) {
            //     console.log('No resume with this slug')
            //     new Noty({
            //         type: 'error',
            //         text: 'Resume not found.',
            //         timeout: 5000,
            //         theme: 'metroui'
            //     }).show()
            //     this.$router.push('/')
            // } else {
            //     console.log('candidate exists.')
            //     this.candidate = candidate
            // }
		},
        data () {
            return {
				// user: '',
				slug: '',
                candidate: {},
				firstname: '',
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        computed: {
			error () {
				return this.$store.getters['error']
			},
			errors () {
				return this.$store.getters['errors']
			}
        },
        methods: {
            async signVisitorIn () {
				console.log('signVisitorIn')
				this.$store.commit('clearError', { root: true })				
                try {
                    await this.$store.dispatch('firebase-auth/signVisitorIn', { slug: this.slug, password: this.form.password })
                    // console.log('Success!')
                    // new Noty({
                    //     type: 'success',
                    //     text: 'Access allowed!',
                    //     timeout: 5000,
                    //     theme: 'metroui'
					// }).show()
					this.$router.push(`/resume/${this.slug}`)
                } catch (error) {
                    console.log('error login: ', error)
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

<style scoped>
    [v-cloak] {
        display: none;
    }
</style>