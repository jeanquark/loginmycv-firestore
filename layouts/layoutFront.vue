<template>
    <v-app id="app" v-cloak>
        <v-toolbar dark color="primary">
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <nuxt-link to="/">
                <v-layout align-center>
				    <img src="/images/logo_small.png" width="40" />&nbsp;
                    <v-toolbar-title class="white--text">LoginMyCV</v-toolbar-title>
                </v-layout>
            </nuxt-link>
            
            <v-spacer></v-spacer>

            <!-- <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="search"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field> -->

            <!-- <v-spacer></v-spacer> -->
            
            <!-- <v-btn nuxt to="/register" color="success">Register</v-btn> -->
            <!-- <v-btn nuxt to="/login" color="success">Login</v-btn> -->
            <div v-if="loadedUser && loadedUser.private">
                <!-- <v-btn color="success" @click="loginModal = true">Login</v-btn> -->
                <v-btn color="warning" @click="logout">Logout</v-btn>
                <v-btn color="success" nuxt to="/candidate/resumes">My resumes</v-btn>
            </div>
            <div v-else>
                <v-btn color="success" @click="openLoginModal">Login</v-btn>
                <v-btn color="success" @click="registerModal = true">Register</v-btn>
            </div>
            <!-- <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn> -->
        </v-toolbar>

        <v-content>
            <nuxt />
            <v-layout row wrap>
                <!-- Login Candidate Modal -->
                <v-dialog
                    v-model="loginModal"
                    width="500"
                    lazy
                >
                    <Login v-on:switchToRegisterModal="switchToRegister" v-on:switchToForgotPasswordModal="switchToForgotPassword" :message="message" />
                </v-dialog>

                <!-- Register Candidate Modal -->
                <v-dialog
                    v-model="registerModal"
                    width="750"
                    lazy
                >
                    <Register v-on:registerChildToParent="switchToLogin" />
                </v-dialog>

                <!-- Forgot Password Modal -->
                <v-dialog
                    v-model="forgotPasswordModal"
                    width="750"
                    lazy
                >
                    <ForgotPassword />
                </v-dialog>
        	</v-layout>
        </v-content>
        <!-- :fixed="this.$route.path != '/'" -->
        <v-footer
		    height="auto"
		    color="primary lighten-1"
            
            :fixed="false"
		>
		    <v-layout
		      	justify-center
		      	row
		      	wrap
		    >
		      	<v-btn
			        v-for="(link, index) in links"
		        	:key="index"
		        	color="white"
		        	flat
		        	round
                    :to="link.link"
		      	>
					{{ link.name }}
		      	</v-btn>
		      	<v-flex
			        primary
		        	lighten-2
		        	py-3
		        	text-xs-center
			        white--text
		        	xs12
		      	>
			        &copy;2019 — <strong>LoginMyCV</strong>
		      	</v-flex>
		    </v-layout>
		</v-footer>
    </v-app>
</template>

<script>
    import Login from '~/components/Login'
	import Register from '~/components/Register'
	import ForgotPassword from '~/components/ForgotPassword'
	export default {
		components: { Login, Register, ForgotPassword },
        data () {
            return {
                message: '',
                loginModal: false,
                registerModal: false,
                forgotPasswordModal: false,
                links: [
			        {
						name: 'Home',
						link: '/'
					},
					{
						name: 'About Us',
						link: '/about'
					},
					{
						name: 'Team',
						link: '/team'
					},
					// {
					// 	name: 'Services',
					// 	link: '/services'
					// },
					{
						name: 'Contact Us',
						link: '/contact'
					}
			    ],
            }
        },
        computed: {
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
        },
        methods: {
            switchToLogin () {
                this.registerModal = false
                this.loginModal = true
            },
            switchToRegister () {
                this.loginModal = false
                this.registerModal = true
            },
            switchToForgotPassword () {
                this.loginModal = false
                this.forgotPasswordModal = true
            },
            openLoginModal () {
                this.message = null
                this.loginModal = true
            },
            async logout () {
                await this.$store.dispatch('firebase-auth/signOut')
                this.$router.replace('/')
            }
        }
	}
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }
    .link {
		text-decoration: none;
		color: #fff;
	}
</style>