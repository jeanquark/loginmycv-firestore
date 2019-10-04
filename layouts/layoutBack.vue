<template>
    <v-app id="app" v-cloak>
        <v-navigation-drawer v-model="sideBar" app>
            <v-list dense>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app dark>
            <v-app-bar-nav-icon @click.stop="sideBar = !sideBar"></v-app-bar-nav-icon>
            <v-img src="/images/logo_small.png" max-width="40" class="mx-2"></v-img>&nbsp;
            <v-toolbar-title>LoginMyCV</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="hidden-xs-only font-weight-bold">
                <v-btn class="success mx-2">My resumes</v-btn>
                <v-btn class="warning mx-2" @click="logout">Logout</v-btn>
                <v-avatar size="40" color="grey lighten-4" class="mx-2" v-if="loadedUser.picture">
                    <v-img :src="loadedUser.picture" alt="user picture"></v-img>
                </v-avatar>
            </div>
        </v-app-bar>

        <v-content>
            <v-container class="fill-height" fluid>
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
	.v-list__tile--active > div {
		/* color:#FFC107; */
		color: var(--v-secondary-base);
	}
</style>