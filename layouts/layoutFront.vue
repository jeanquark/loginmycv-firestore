<template>
    <v-app id="app" v-cloak>

        <v-navigation-drawer fixed v-model="sideBar" left app class="sidebar">
            <v-list dense v-if="loadedUser && loadedUser.private">
                <v-list-tile avatar class="my-2">
                    <v-list-tile-avatar size="40" v-if="loadedUser.picture">
                        <img :src="loadedUser.picture" alt="user picture">
                    </v-list-tile-avatar>
                    <v-list-tile-content class="white--text">
                        <v-list-tile-title>
                            {{ loadedUser.firstname }} {{ loadedUser.lastname }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider color="white"></v-divider>
                <v-list-tile class="white--text mt-2" to="/admin" v-ripple v-if="loadedUser.status && loadedUser.status.slug === 'admin'">
                    <v-list-tile-action>
                        <v-icon color="white">account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Admin</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="white--text" :class="{'mt-2': !loadedUser.status}" to="/candidate/resumes" v-ripple>
                    <v-list-tile-action>
                        <v-icon color="white">folder_shared</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>My resumes</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="white--text" @click.stop="logout" v-ripple>
                    <v-list-tile-action>
                        <v-icon color="white">exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list dense v-else>
                <v-list-tile class="white--text my-2" v-ripple>
                    <v-list-tile-action>
                        <v-icon color="white">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content @click.stop="openLoginModal">
                        <v-list-tile-title>Login</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile class="white--text my-2" v-ripple>
                    <v-list-tile-action>
                        <v-icon color="white">person_add</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content @click.stop="openRegisterModal">
                        <v-list-tile-title>Register</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list>
                <v-divider color="white"></v-divider>
                <v-list-tile class="white--text my-2" v-ripple>
                    <v-list-tile-action>
                        <v-icon color="white">close</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content @click.stop="sideBar = false">
                        <v-list-tile-title>Close</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app dark color="primary">
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <nuxt-link to="/">
                <v-layout align-center>
                    <img src="/images/logo_small.png" width="40" />&nbsp;
                    <v-toolbar-title class="hidden-xs-only white--text">LoginMyCV</v-toolbar-title>
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
            <v-btn color="info" nuxt to="/admin" class="hidden-xs-only" v-if="loadedUser && loadedUser.status && loadedUser.status.slug === 'admin'">Admin</v-btn>
            <div class="hidden-xs-only" v-if="loadedUser && loadedUser.private">
                <v-btn color="success" nuxt to="/candidate/resumes">My resumes</v-btn>
                <v-btn color="warning" @click="logout">Logout</v-btn>
                <v-avatar size="40" color="grey lighten-4" v-if="loadedUser.picture">
                    <img :src="loadedUser.picture" alt="user picture">
                </v-avatar>
            </div>
            <div class="hidden-xs-only" v-else>
                <v-btn color="success" @click="openLoginModal">Login</v-btn>
                <v-btn color="success" @click="openRegisterModal">Register</v-btn>
            </div>
            <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="sideBar = !sideBar"></v-toolbar-side-icon>
        </v-toolbar>

        <v-content>
            <v-container fluid style="padding: 0px;">
                <nuxt />
                <v-layout row wrap>
                    <!-- Login Candidate Modal -->
                    <!-- v-model="loginModal" -->
                    <v-dialog :value="loginModal" width="500" lazy :persistent="true" @input="closeLoginModal">
                        <Login v-on:switchToRegisterModal="switchToRegister" v-on:switchToForgotPasswordModal="switchToForgotPassword" v-on:closeLoginModal="closeLoginModal" />
                    </v-dialog>

                    <!-- Register Candidate Modal -->
                    <v-dialog v-model="registerModal" width="750" lazy :persistent="true">
                        <Register v-on:switchToLoginModal="switchToLogin" v-on:closeRegisterModal="closeRegisterModal" />
                    </v-dialog>

                    <!-- Forgot Password Modal -->
                    <v-dialog v-model="forgotPasswordModal" width="750" lazy>
                        <ForgotPassword />
                    </v-dialog>
                </v-layout>
            </v-container>
        </v-content>

        <!-- :fixed="this.$route.path != '/'" -->
        <v-footer height="auto" color="primary lighten-1" app v-if="showFooter">
            <v-layout justify-center row wrap>
                <v-btn v-for="(link, index) in links" :key="index" color="white" flat round :to="link.link">
                    {{ link.name }}
                </v-btn>
                <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
                    &copy;{{ new Date().getFullYear() }} — <strong>LoginMyCV</strong>
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
	import Login from "~/components/Login";
	import Register from "~/components/Register";
	import ForgotPassword from "~/components/ForgotPassword";
	export default {
		$_veeValidate: {
			validator: "new" // Give me my own validator scope.
		},
		// inject: ['$validator'], // inject parent validator
		components: { Login, Register, ForgotPassword },
		head: {
			meta: [{ name: "robots", content: "noindex" }]
		},
		// middleware: [''],
		mounted() {
			window.addEventListener("scroll", this.onScroll);
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.onScroll);
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
						name: "Home",
						link: "/"
					},
					{
						name: "About",
						link: "/about"
					},
					{
						name: "Packages",
						link: "/packages"
					},
					// {
					// 	name: "Team",
					// 	link: "/team"
					// },
					{
						name: "Terms & Conditions",
						link: "/terms-conditions"
					},
					{
						name: "FAQ",
						link: "/faq"
					},
					{
						name: "Contact Us",
						link: "/contact"
					}
				],
				showFooter: true,
				lastScrollPosition: 0
			};
		},
		computed: {
			loading() {
				return this.$store.getters["loading"];
			},
			loadedUser() {
				return this.$store.getters["users/loadedUser"];
			},
			loginModal2: {
				get() {
					return this.$store.getters["loginModal"];
				},
				// setter
				set(newValue) {
					this.$store.commit("openLoginModal");
				}
			},
			loginModal() {
				// return true
				return this.$store.getters["loginModal"];
			}
			// message () {
			//     return this.$store.getters['loadedMessage']
			// }
		},
		methods: {
			switchToLogin() {
				this.registerModal = false;
				// this.loginModal = true
				this.$store.commit("openLoginModal");
			},
			switchToRegister() {
				// this.loginModal = false
				this.$store.commit("closeLoginModal");
				this.registerModal = true;
			},
			switchToForgotPassword() {
				// this.loginModal = false
				this.$store.commit("closeLoginModal");
				this.forgotPasswordModal = true;
			},
			openLoginModal() {
				this.$validator.reset(); // Clear validator errors
				// this.message = null
				this.$store.commit("clearError");
				this.$store.commit("setLoading", false);
				// this.loginModal = true
				this.$store.commit("openLoginModal");
			},
			closeLoginModal() {
				// this.loginModal = false
				this.$store.commit("closeLoginModal");
			},
			openRegisterModal() {
				this.$validator.reset(); // Clear validator errors
				this.$store.commit("clearError");
				this.$store.commit("setLoading", false);
				this.registerModal = true;
			},
			closeRegisterModal() {
				this.registerModal = false;
			},
			async logout() {
				await this.$store.dispatch("firebase-auth/signOut");
				this.$router.replace("/");
			},
			onScroll() {
				// Get the current scroll position
				const currentScrollPosition =
					window.pageYOffset || document.documentElement.scrollTop;
				// Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
				if (currentScrollPosition < 0) {
					return;
				}

				// Stop executing this function if the difference between
				// current scroll position and last scroll position is less than some offset
				if (
					Math.abs(currentScrollPosition - this.lastScrollPosition) < 60
				) {
					return;
				}
				// Here we determine whether we need to show or hide the footer
				this.showFooter = currentScrollPosition < this.lastScrollPosition;
				// Set the current scroll position as the last scroll position
				this.lastScrollPosition = currentScrollPosition;
			}
		}
	};
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