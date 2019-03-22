<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field 
                                        prepend-icon="person" 
                                        name="login" 
                                        label="Login" 
                                        type="text"
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
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn nuxt to="/" color="default">Cancel</v-btn>
                                <v-btn color="primary" @click.prevent="signUserIn">Login</v-btn>
                                Not registered yet ? Sign up now, it's free!
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
                form: {
                    email: 'jm.kleger@gmail.com',
                    password: 'secret'
                }
            }
        },
        computed: {

        },
        methods: {
            signUserIn () {
                console.log('signUserIn')
                try {
                    this.$store.dispatch('firebase-auth/signUserIn', this.form)
                    console.log('Success!')
                    new Noty({
                        type: 'success',
                        text: 'Log in successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                } catch (error) {
                    console.log('error: ', error)
                    new Noty({
                        type: "error",
                        text: "Sorry, an error occured and you could not log in.",
                        timeout: 5000,
                        theme: "metroui"
                    }).show()
                }
            }
        }
    }
</script>