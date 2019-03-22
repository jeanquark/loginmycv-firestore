<template>
    <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title
        >
            Request access to {{ this.resume.firstname }} {{ this.resume.lastname }}'s resume
        </v-card-title>

        <v-card-text>
            <!-- Would you like to send a request to get access to {{ this.resume.firstname }} {{ this.resume.lastname }}'s resume? -->
            resume: {{ this.resume }}<br />
            <!-- loadedUser: {{ loadedUser }}<br /> -->

            <v-form>
                <v-text-field
                    name="firstname"
                    label="Your firstname"
                    type="text"
                    prepend-icon="person"
                    required
                    v-model="form.firstname"
                ></v-text-field>

                <v-text-field
                    name="lastname" 
                    label="Your lastname" 
                    type="text"
                    prepend-icon="lock" 
                    required
                    v-model="form.lastname"
                ></v-text-field>

                <v-text-field
                    name="email"
                    label="Your mail"
                    type="email"
                    prepend-icon="person"
                    required
                    v-model="form.email"
                ></v-text-field>

                <v-textarea
                    name="message"
                    label="Your message"
                    prepend-icon="person"
                    v-model="form.message"
                ></v-textarea>

                <!-- <v-layout justify-center>
                    <v-btn color="primary" type="submit" :loading="loading">Sej</v-btn>
                </v-layout> -->
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
            <!-- <v-spacer></v-spacer> -->
            <v-btn
                color="primary"
                flat
                @click="sendRequest"
            >
                Send request
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Noty from 'noty'
    export default {
        props: ['resume'],
        async mounted () {
            // await this.$store.dispatch('users/fetchAuthenticatedUser')
            // this.form.firstname = this.loadedUser.firstname
            // this.form.lastname = this.loadedUser.lastname
            // this.form.email = this.loadedUser.email
        },
        data () {
            return {
                form: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    message: ''
                }
            }
        },
        computed: {
            loading () {
                return this.$store.getters['loading']
            },
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            }
        },
        methods: {
            async sendRequest () {
                console.log(this.form)
                // this.$store.dispatch('authorizations/sendAuthorizationRequest', {
                //     resume: {
                //         id: this.resume.id,
                //         firstname: this.resume.firstname,
                //         lastname: this.resume.lastname,
                //         email: this.resume.email,
                //         slug: this.resume.slug
                //     },
                //     user: {
                //         id: this.loadedUser.id,
                //         firstname: this.form.firstname,
                //         lastname: this.form.lastname,
                //         email: this.form.email,
                //         message: this.form.message
                //     }
                // })
                const authorization = {
                    resume: {
                        id: this.resume.resume_long_id,
                        firstname: this.resume.firstname,
                        lastname: this.resume.lastname,
                        email: this.resume.email,
                        slug: this.resume.slug
                    },
                    user: {
                        id: this.loadedUser.id,
                        firstname: this.form.firstname,
                        lastname: this.form.lastname,
                        email: this.form.email,
                        message: this.form.message
                    }
                }
                try {
                    await axios.post('/create-resume-authorization', { authorization })
                    new Noty({
                        type: 'success',
                        text: 'Request sent successfully.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                } catch (error) {
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and your resume could not be created.',
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