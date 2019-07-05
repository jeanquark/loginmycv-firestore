<template>
    <v-app id="app" v-cloak>
        <v-toolbar app dark color="primary">
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
            <v-btn color="info" nuxt to="/admin" v-if="loadedUser && loadedUser.status && loadedUser.status.slug === 'admin'">Admin</v-btn>
            <div v-if="loadedUser && loadedUser.private">
                <v-btn color="success" nuxt to="/candidate/resumes">My resumes</v-btn>
                <v-btn color="warning" @click="logout">Logout</v-btn>
                <v-avatar
                    size="40"
                    color="grey lighten-4"
                    v-if="loadedUser.picture"
                >
                    <img :src="loadedUser.picture" alt="user picture">
                </v-avatar>
            </div>
            <div v-else>
                <v-btn color="success" @click="openLoginModal">Login</v-btn>
                <v-btn color="success" @click="openRegisterModal">Register</v-btn>
            </div>
        </v-toolbar>

        <v-content>
            <v-container fluid style="padding: 0px;">
                <nuxt />
                <v-layout row wrap>
                    <!-- Login Candidate Modal -->
                        <!-- v-model="loginModal" -->
                    <v-dialog
                        :value="loginModal"
                        width="500"
                        lazy
                        :persistent="true"
                        @input="closeLoginModal"
                    >
                        <Login v-on:switchToRegisterModal="switchToRegister" v-on:switchToForgotPasswordModal="switchToForgotPassword" v-on:closeLoginModal="closeLoginModal" />
                    </v-dialog>

                    <!-- Register Candidate Modal -->
                    <v-dialog
                        v-model="registerModal"
                        width="750"
                        lazy
                        :persistent="true"
                    >
                        <Register v-on:switchToLoginModal="switchToLogin" v-on:closeRegisterModal="closeRegisterModal" />
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
            </v-container>
        </v-content>
        
        <!-- :fixed="this.$route.path != '/'" -->
        <v-footer
		    height="auto"
		    color="primary lighten-1"
            app
            v-if="showFooter"
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
			        &copy;{{ new Date().getFullYear() }} — <strong>LoginMyCV</strong>
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
        $_veeValidate: {
            validator: 'new' // give me my own validator scope.
        },
        // inject: ['$validator'], // inject parent validator
        components: { Login, Register, ForgotPassword },
        head: {
            meta: [
                { name: "robots", content: "noindex" }
            ]
        },
        // middleware: [''],
        mounted () {
            window.addEventListener('scroll', this.onScroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.onScroll)
        },
        data () {
            return {
                // message: '',
                // loginModal: false,
                registerModal: false,
                forgotPasswordModal: false,
                links: [
			        {
						name: 'Home',
						link: '/'
					},
					{
						name: 'About',
						link: '/about'
					},
					{
						name: 'Team',
						link: '/team'
					},
					{
						name: 'Packages',
						link: '/packages'
					},
					{
						name: 'Contact Us',
						link: '/contact'
					}
                ],
                showFooter: true,
                lastScrollPosition: 0
            }
        },
        computed: {
            loading () {
                return this.$store.getters['loading']
            },
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
            loginModal2: {
                get () {
                    return this.$store.getters['loginModal']
                },
                // setter
                set (newValue) {
                    this.$store.commit('openLoginModal')
                }
            },
            loginModal () {
                // return true
                return this.$store.getters['loginModal']
            },
            // message () {
            //     return this.$store.getters['loadedMessage']
            // }
        },
        methods: {
            switchToLogin () {
                this.registerModal = false
                // this.loginModal = true
                this.$store.commit('openLoginModal')
            },
            switchToRegister () {
                // this.loginModal = false
                this.$store.commit('closeLoginModal')
                this.registerModal = true
            },
            switchToForgotPassword () {
                // this.loginModal = false
                this.$store.commit('closeLoginModal')
                this.forgotPasswordModal = true
            },
            openLoginModal () {
                this.$validator.reset() // Clear validator errors
                // this.message = null
                this.$store.commit('clearError')
                this.$store.commit('setLoading', false)
                // this.loginModal = true
                this.$store.commit('openLoginModal')
            },
            closeLoginModal () {
                // this.loginModal = false
                this.$store.commit('closeLoginModal')
            },
            openRegisterModal () {
                this.$validator.reset() // Clear validator errors
                this.$store.commit('clearError')
                this.$store.commit('setLoading', false)
                this.registerModal = true
            },
            closeRegisterModal () {
                this.registerModal = false
            },
            async logout () {
                await this.$store.dispatch('firebase-auth/signOut')
                this.$router.replace('/')
            },
            onScroll () {
                // Get the current scroll position
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
                // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
                if (currentScrollPosition < 0) {
                    return
                }

                // Stop executing this function if the difference between
                // current scroll position and last scroll position is less than some offset
                if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
                    return
                }
                // Here we determine whether we need to show or hide the footer
                this.showFooter = currentScrollPosition < this.lastScrollPosition
                // Set the current scroll position as the last scroll position
                this.lastScrollPosition = currentScrollPosition
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