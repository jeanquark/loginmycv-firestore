<template>
    <v-app id="app" v-cloak>
        <v-navigation-drawer app v-model="sideBar">
            <v-list dense flat>
                <v-list-item to="/candidate/resumes" ripple>
                    <v-list-item-action>
                        <v-icon>mdi-folder-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>My Resumes</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/candidate/authorizations" ripple>
                    <v-list-item-action>
                        <v-icon v-if="getUserAuthorizationsNotifications < 1">mdi-human</v-icon>
                        <v-badge color="primary" v-else>
                            <template v-slot:badge>
                                <span>{{ getUserAuthorizationsNotifications }}</span>
                            </template>
                            <v-icon>mdi-human</v-icon>
                        </v-badge>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Authorizations</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/candidate/account" ripple>
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>My Account</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list subheader>
                <v-list-item @click="logoutCandidate()" ripple>
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app dark>
            <v-app-bar-nav-icon @click.stop="sideBar = !sideBar"></v-app-bar-nav-icon>
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="hidden-xs-only font-weight-bold">
                <v-btn class="warning mx-2" @click="logout">Logout</v-btn>
                <v-avatar size="40" color="grey lighten-4" class="mx-2" v-if="loadedUser && loadedUser.picture">
                    <v-img :src="loadedUser.picture" alt="user picture"></v-img>
                </v-avatar>
            </div>
        </v-app-bar>

        <v-content>
        	<v-container>
            	<nuxt />
            </v-container>
        </v-content>

        <v-footer app fixed class="justify-center">
            <span>LoginMyCV &copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
	import Avatar from 'vue-avatar'
	export default {
		head: {
			meta: [{ name: 'robots', content: 'noindex' }]
		},
		middleware: ['auth-check'],
		components: { Avatar },
		async created() {
			// const authUserId = this.loadedUser.id
			// console.log('authUserId from layoutBack: ', authUserId)
			// await this.$store.dispatch('users/fetchUser', authUserId)

			// this.$vuetify.theme.dark = true
		},
		mounted () {
			this.$vuetify.theme.dark = true
		},
		data() {
			return {
				sideBar: true,
				dark: true,
				items: [{ title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me 2' }],
				fav: true,
				menu: false,
				message: false,
				hints: true
			}
		},
		computed: {
			loadedUser() {
				return this.$store.getters['users/loadedUser']
			},
			getUserAuthorizationsNotifications() {
				try {
					return this.loadedUser.notifications.filter(notification => notification.type === 'authorization').length
				} catch (error) {
					return null
				}
			},
			// loadedTheme () {
			//     return this.$store.getters['loadedTheme']
			// },
			// toggleTheme () {
			//     return this.$store.commit('toggleTheme')
			// },
			loadedDarkTheme: {
				// return this.$store.getters['loadedTheme']
				get() {
					// return true
					return this.$store.getters['loadedDarkTheme']
				},
				// setter
				set(payload) {
					this.$store.commit('toggleTheme')
				}
			}
		},
		methods: {
			async logout() {
				console.log('logout')
				await this.$store.dispatch('firebase-auth/signOut')
				this.$router.replace('/')
			}
		}
	}
</script>

<style scoped>
	.no-hover:before {
		background-color: transparent;
	}
	.v-list-item--active {
		color: var(--v-secondary-base);
	}
	.v-list__tile--active > div {
		/* color:#FFC107; */
		/*color: var(--v-secondary-base);*/
	}
	/*>>>.theme--dark.v-list-item--active:before, .theme--dark.v-list-item--active:hover:before, .theme--dark.v-list-item:focus:before {
		opacity: 0;
	}*/
</style>