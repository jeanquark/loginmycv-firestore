<template>
	<div id="app" v-cloak>
        <v-app id="inspire" :dark="dark === true">
            <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
            >
                <v-list dense>
                    <v-list-tile to="/candidate/resumes" class="">
                        <v-list-tile-action>
                            <v-icon>folder_shared</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>My Resumes</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to="/candidate/authorizations">
                        <v-list-tile-action>
                            <v-icon>pan_tool</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Authorizations</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to="/">
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
                    <v-list-tile @click="logoutCandidate()">
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
                <!-- <v-btn flat class="no-hover"> -->
                    <!-- <v-switch v-model="dark" :label="dark ? 'Dark' : 'Light'" hide-details></v-switch> -->
                <!-- </v-btn> -->


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
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"> -->
                                <img src="/images/resumes/jeanmarc.jpg" />
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ loadedUser.firstname }} {{ loadedUser.lastname }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ loadedUser.city }}, {{ loadedUser.country }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn
                                    :class="fav ? 'red--text' : ''"
                                    icon
                                    @click="fav = !fav"
                                >
                                    <v-icon>favorite</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-switch v-model="dark" :label="dark ? 'Dark' : 'Light'" hide-details></v-switch>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>

                    <!-- <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn flat @click="menu = false">Cancel</v-btn>
                        <v-btn color="primary" flat @click="menu = false">Save</v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-menu>


            </v-toolbar>
            <v-content>
                <!-- <v-container fluid fill-height> -->
                <v-container>
            		<nuxt />
                </v-container>
            </v-content>
            <v-footer app fixed class="justify-center">
                <span>LoginMyCV &copy; 2019</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
	export default {
        head: {
            meta: [
                { name: "robots", content: "noindex" }
            ]
        },
        async created () {
            const authUserId = this.loadedUser.id
            console.log('authUserId: ', authUserId)
            await this.$store.dispatch('users/fetchUser', 'OlxfESwPtlgzz4vcjiL4YKsIDZI2')
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
            }
		},
		methods: {
			logoutCandidate () {
				console.log('logoutCandidate')
			}
		}
	}
</script>

<style scoped>
    .no-hover:before {
        background-color: transparent;
    }
</style>