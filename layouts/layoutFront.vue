<template>
    <v-app id="app" v-cloak>
        <v-navigation-drawer v-model="sideBar" app>
            <v-list dense nav>
				<v-list-item-group color="primary">
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title @click="openLoginModal">Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title @click="openRegisterModal">Register</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
				</v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="sideBar = !sideBar" :class="{'hidden-sm-and-up': !sideBar}"></v-app-bar-nav-icon>
            <v-img src="/images/logo_small.png" max-width="40" class="mx-2"></v-img>&nbsp;
            <v-toolbar-title><nuxt-link to="/" class="link white--text">LoginMyCV</nuxt-link></v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="hidden-xs-only font-weight-bold" v-if="loadedUser && loadedUser.private">
                <v-btn class="success mx-2" nuxt to="/candidate/resumes">My resumes</v-btn>
                <v-btn class="warning mx-2" @click="logout">Logout</v-btn>
                <v-avatar size="40" color="grey lighten-4" class="mx-2" v-if="loadedUser.picture">
                    <v-img :src="loadedUser.picture" alt="user picture"></v-img>
                </v-avatar>
            </div>
            <div class="hidden-xs-only font-weight-bold" v-else>
                <v-btn class="success" @click="openLoginModal">Login</v-btn>
                <v-btn class="success" @click="openRegisterModal">Register</v-btn>
            </div>
        </v-app-bar>

        <v-content>
            <v-container fluid style="padding: 0px;">
                <nuxt />
				<v-row>
                    <!-- Login Candidate Modal -->
                    <v-dialog :value="loginModal" width="600" :persistent="loading ? true : false" @input="closeLoginModal">
                        <Login v-on:switchToRegisterModal="switchToRegister" v-on:switchToForgotPasswordModal="switchToForgotPassword" v-on:closeLoginModal="closeLoginModal" />
                    </v-dialog>

                    <!-- Register Candidate Modal -->
                    <v-dialog v-model="registerModal" width="750" :persistent="loading ? true : false">
                        <Register v-on:switchToLoginModal="switchToLogin" v-on:closeRegisterModal="closeRegisterModal" />
                    </v-dialog>

                    <!-- Forgot Password Modal -->
                    <v-dialog v-model="forgotPasswordModal" width="750">
                        <ForgotPassword />
                    </v-dialog>
				</v-row>
                <br /><br /><br /><br />
				
            </v-container>
        </v-content>

        <v-footer fixed padless color="primary lighten-1">
            <v-row no-gutters justify="center">
                <v-btn v-for="(link, index) in links" :key="index" :to="link.route" color="white" text rounded class="my-2 font-weight-medium">
                    {{ link.name }}
                </v-btn>
                <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
                    {{ new Date().getFullYear() }} — <strong>LoginMyCV</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
	import Login from '~/components/Login'
	import Register from '~/components/Register'
	import ForgotPassword from '~/components/ForgotPassword'
	export default {
		$_veeValidate: {
			validator: 'new' // Give me my own validator scope.
		},
		// inject: ['$validator'], // inject parent validator
		components: { Login, Register, ForgotPassword },
		head: {
			meta: [{ name: 'robots', content: 'noindex' }]
		},
		// middleware: [''],
		mounted() {
			window.addEventListener('scroll', this.onScroll)
			this.$vuetify.theme.dark = false
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.onScroll)
		},
		data() {
			return {
				// message: '',
				// loginModal: false,
				sideBar: false,
				registerModal: false,
				forgotPasswordModal: false,
				links: [
					{
						name: 'Home',
						route: '/'
					},
					{
						name: 'About',
						route: '/about'
					},
					{
						name: 'Packages',
						route: '/packages'
					},
					// {
					// 	name: "Team",
					// 	route: "/team"
					// },
					{
						name: 'Terms & Conditions',
						route: '/terms-conditions'
					},
					{
						name: 'FAQ',
						route: '/faq'
					},
					{
						name: 'Contact Us',
						route: '/contact'
					}
				],
				showFooter: true,
				lastScrollPosition: 0
			}
		},
		computed: {
			loading() {
				return this.$store.getters['loading']
			},
			loadedUser() {
				return this.$store.getters['users/loadedUser']
			},
			loginModal2: {
				get() {
					return this.$store.getters['loginModal']
				},
				// setter
				set(newValue) {
					this.$store.commit('openLoginModal')
				}
			},
			loginModal() {
				// return true
				return this.$store.getters['loginModal']
			}
			// message () {
			//     return this.$store.getters['loadedMessage']
			// }
		},
		methods: {
			switchToLogin() {
				this.registerModal = false
				// this.loginModal = true
				this.$store.commit('openLoginModal')
			},
			switchToRegister() {
				// this.loginModal = false
				this.$store.commit('closeLoginModal')
				this.registerModal = true
			},
			switchToForgotPassword() {
				// this.loginModal = false
				this.$store.commit('closeLoginModal')
				this.forgotPasswordModal = true
			},
			openLoginModal() {
				this.$validator.reset() // Clear validator errors
				// this.message = null
				this.$store.commit('clearError')
				this.$store.commit('setLoading', false)
				// this.loginModal = true
				this.$store.commit('openLoginModal')
			},
			closeLoginModal() {
				// this.loginModal = false
				this.$store.commit('closeLoginModal')
			},
			openRegisterModal() {
				this.$validator.reset() // Clear validator errors
				this.$store.commit('clearError')
				this.$store.commit('setLoading', false)
				this.registerModal = true
			},
			closeRegisterModal() {
				this.registerModal = false
			},
			async logout() {
				await this.$store.dispatch('firebase-auth/signOut')
				this.$router.replace('/')
			},
			onScroll() {
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
	.sidebar {
		color: #fff;
		background: var(--v-primary-lighten1);
	}
</style>