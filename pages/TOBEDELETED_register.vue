<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Register form 2</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field 
                                        prepend-icon="person" 
                                        name="email" 
                                        label="Email" 
                                        type="email"
                                        v-model="form.email"
                                    ></v-text-field>
                                    <v-text-field 
                                        id="password" 
                                        prepend-icon="lock" 
                                        name="password" 
                                        label="Password" 
                                        type="password"
                                        v-model="form.password"
                                    ></v-text-field>
                                    <v-text-field
                                        id="password_confirmation"
                                        prepend-icon="lock"
                                        name="password_confirmation"
                                        label="Password confirmation"
                                        type="password"
                                        v-model="form.password_confirmation"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn nuxt to="/" color="default">Cancel</v-btn>
                                <v-btn color="primary" @click.prevent="signUserUp">Register</v-btn>
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
    import 'noty/lib/noty.css'
    import 'noty/lib/themes/metroui.css'
    export default {
        data () {
            return {
                drawer: null,
                form: {
                    email: 'jm.kleger@gmail.com',
                    password: 'secret',
                    password_confirmation: 'secret'
                }
            }
        },
        computed: {

        },
        methods: {
            async signUserUp () {
                console.log('signUserUp')
                console.log('this.form: ', this.form)
                try {
                    await this.$store.dispatch('firebase-auth/signUserUp', this.form)
                    console.log('Success!')
                    new Noty({
                        type: 'success',
                        text: 'Registered successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                } catch(error) {
                    console.log('error: ', error)
                    new Noty({
                        type: "error",
                        text: "Sorry, an error occured and you could not be registered.",
                        timeout: 5000,
                        theme: "metroui"
                    }).show()
                }
                // if (this.$i18n.locale != 'en') {
                //     this.$router.replace('/' + this.$i18n.locale + '/home')
                // } else {
                //     this.$router.replace('/home')
                // }
            }
        }
    }
</script>