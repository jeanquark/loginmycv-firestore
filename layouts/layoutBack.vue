<template>
	<!-- <div id="app" v-cloak v-if="loadedUser && loadedUser.private"> -->
        <!-- <v-app id="app" :dark="dark === true" v-cloak> -->
        <v-app id="app" :dark="loadedDarkTheme" v-cloak>
            <v-navigation-drawer
                v-model="drawer"
				clipped
                fixed
                app
            >
                <v-list :dense="true" :two-line="true">
                    <v-list-tile to="/candidate/resumes" v-ripple>
                        <v-list-tile-action>
                            <v-icon>folder_shared</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>My Resumes</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to="/candidate/authorizations" v-ripple>
                        <v-list-tile-action>
                            <v-icon v-if="getUserAuthorizationsNotifications < 1">pan_tool</v-icon>
                            <v-badge color="primary" v-else>
                                <template v-slot:badge>
                                    <span>{{ getUserAuthorizationsNotifications }}</span>
                                </template>
                                <v-icon>pan_tool</v-icon>
                            </v-badge>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Authorizations</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to="/candidate/account" v-ripple>
                        <v-list-tile-action>
                            <v-icon>account_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>My Account</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to="/" v-ripple>
                        <v-list-tile-action>
                            <v-icon>arrow_back</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Go Back to Homepage</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
                <v-list subheader>
                    <v-list-tile @click="logoutCandidate()" v-ripple>
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title to="/">LoginMyCV</v-toolbar-title>
                <v-spacer></v-spacer>


                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-x
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                            icon
                            v-on="on"
                        >
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <v-list-tile avatar v-if="loadedUser">
                                <v-list-tile-avatar v-if="loadedUser.picture">
                                    <img :src="loadedUser.picture" />
                                </v-list-tile-avatar>

                                <avatar :rounded="true" :username="`${loadedUser.firstname} ${loadedUser.lastname}`" class="mr-2" v-else></avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ loadedUser.firstname }} {{ loadedUser.lastname }}</v-list-tile-title>
                                    <v-list-tile-sub-title v-if="loadedUser.city">{{ loadedUser.city }}, {{ loadedUser.country }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon color="red">favorite</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <!-- <v-switch v-model="dark" :label="dark ? 'Dark' : 'Light'" hide-details></v-switch> -->
                                    <v-switch v-model="loadedDarkTheme" :label="loadedDarkTheme ? 'Dark' : 'Light'" hide-details></v-switch>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-toolbar>
            
            <v-content v-if="loadedUser && loadedUser.id">
                <!-- <v-container fluid fill-height> -->
                <v-container>
                    <!-- loadedUser.notifications: {{ loadedUser.notifications.filter(notification => notification.type === 'authorization').length }} -->
            		<nuxt />
                </v-container>
            </v-content>
            <v-footer app fixed class="justify-center">
                <span>LoginMyCV &copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </v-app>
    <!-- </div> -->
</template>

<script>
	import Avatar from 'vue-avatar'
	export default {
        head: {
            meta: [
                { name: "robots", content: "noindex" }
            ]
		},
		middleware: ['auth-check'],
		components: { Avatar },
        async created () {
            // const authUserId = this.loadedUser.id
            // console.log('authUserId from layoutBack: ', authUserId)
            // await this.$store.dispatch('users/fetchUser', authUserId)
        },
		data () {
			return {
				drawer: null,
                dark: true,
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' }
                ],
                fav: true,
                menu: false,
                message: false,
                hints: true
			}
		},
		computed: {
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
            getUserAuthorizationsNotifications () {
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
                get () {
                    // return true
                    return this.$store.getters['loadedDarkTheme']
                },
                // setter
                set (payload) {
                    this.$store.commit('toggleTheme')
                }
            }
		},
		methods: {
			async logoutCandidate () {
                console.log('logoutCandidate')
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