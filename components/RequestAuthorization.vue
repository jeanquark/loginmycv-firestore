<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Request access <span if="this.resume.firstname">to {{ this.resume.firstname }}'s resume</span></v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <v-form>
                <v-text-field
                    name="firstname"
                    label="Your firstname"
                    type="text"
                    prepend-icon="person"
                    required
                    v-model="form.firstname"
                    :counter="50"
                    v-validate="'required|max:50'"
                    data-vv-as="Firstname"
                    :error-messages="errors ? errors.collect('firstname') : null"
                ></v-text-field>

                <v-text-field
                    name="lastname" 
                    label="Your lastname" 
                    type="text"
                    prepend-icon="lock" 
                    required
                    v-model="form.lastname"
                    :counter="50"
                    v-validate="'required|max:50'"
                    data-vv-as="Lastname"
                    :error-messages="errors ? errors.collect('lastname') : null"
                ></v-text-field>

                <v-text-field
                    name="email"
                    label="Your mail"
                    type="email"
                    prepend-icon="person"
                    required
                    v-model="form.email"
                    v-validate="'required|email'"
                    data-vv-as="Email"
                    :error-messages="errors ? errors.collect('email') : null"
                ></v-text-field>

                <v-textarea
                    name="message"
                    label="Your message"
                    prepend-icon="person"
                    v-model="form.message"
                    :counter="500"
                    v-validate="'max:500'"
                    data-vv-as="Message"
                    :error-messages="errors ? errors.collect('message') : null"
                ></v-textarea>

            </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
            <v-btn
                color="primary"
                @click="sendRequest"
                :loading="loading"
                :disabled="errors && errors.items.length > 0"
            >
                Send request
            </v-btn><br /><br />
            <v-btn color="secondary" flat @click="closeModal">Cancel</v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center">
            <small v-if="loading && waiting" class="primaryColor">Almost there...</small>
        </v-card-actions>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Noty from 'noty'
    export default {
        inject: ['$validator'], // inject vee-validate validator
        props: ['resume'],
        async mounted () {
            this.$store.commit('setLoading', false)
            this.form.firstname = this.loadedUser ? this.loadedUser.firstname : ''
            this.form.lastname = this.loadedUser ? this.loadedUser.lastname : ''
            this.form.email = this.loadedUser ? this.loadedUser.email : ''
        },
        data () {
            return {
                form: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    message: ''
                },
                waiting: false
            }
        },
        computed: {
            loading () {
                return this.$store.getters['loading']
            },
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
            
        },
        methods: {
            closeModal () {
                this.$emit('closeRequestAuthorizationModal')
            },
            wait () {
                setTimeout(() => {
                    this.waiting = true
                }, 2000)
            },
            async sendRequest () {
                this.$store.commit('setLoading', true)
                await this.$validator.validateAll()

                if (!this.errors.any()) {
                    const authorization = {
                        resume: {
                            id: this.resume.resume_long_id,
                            user_id: this.resume.user_id,
                            firstname: this.resume.personal_data ? this.resume.personal_data.firstname : '',
                            lastname: this.resume.personal_data ? this.resume.personal_data.lastname : '',
                            email: this.resume.personal_data ? this.resume.personal_data.email : ''
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
                        this.wait()
                        await axios.post('/create-resume-authorization', { authorization })
                        this.$store.commit('setLoading', false)
                        this.$emit('closeModal')
                        new Noty({
                            type: 'success',
                            text: 'Your authorization request was sent successfully.',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                    } catch (error) {
                        this.$store.commit('setLoading', false)
                        new Noty({
                            type: 'error',
                            text: 'Sorry, an error occured and your request could not be processed.',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .primaryColor {
        color: var(--v-primary-base);
    }
</style>