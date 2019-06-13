<template>
	<div>
		<v-app v-if="loadingPage">
			<v-content>
				<v-container fluid fill-height>
					<v-layout align-center justify-center>
						<v-img src="/images/loader.gif" max-width="200px"></v-img>
					</v-layout>
				</v-container>
			</v-content>
		</v-app>
		<v-app v-else>
			<v-navigation-drawer
			  fixed
			  :clipped="$vuetify.breakpoint.lgAndUp"
			  app
			  v-model="drawer"
			>
				<v-list>
					<template v-for="item in items">
						<v-layout
						  row
						  v-if="item.heading"
						  align-center
						  :key="item.heading"
						>
							<v-flex xs6>
								<v-subheader v-if="item.heading">
									{{ item.heading }}
								</v-subheader>
							</v-flex>
							<v-flex xs6 class="text-xs-center">
								<a href="#!" class="body-2 black--text">EDIT</a>
							</v-flex>
						</v-layout>
						<v-list-group
						  v-else-if="item.children"
						  v-model="item.model"
						  :key="item.text"
						  :prepend-icon="item.model ? item.icon : item['icon-alt']"
						  append-icon=""
						>
							<v-list-tile slot="activator">
								<v-list-tile-content>
									<v-list-tile-title>
										{{ item.text }}
									</v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
							<v-list-tile
							  v-for="(child, index) in item.children"
							  :key="index"
							>
								<v-list-tile-action v-if="child.icon">
									<v-icon>{{ child.icon }}</v-icon>
								</v-list-tile-action>
								<v-list-tile-content>
									<v-list-tile-title>
										{{ child.text }}
									</v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
						</v-list-group>
						<v-list-tile v-else :key="item.text" :to="item.to" :exact="item.exact">
							<v-list-tile-action>
								<!-- <v-icon style="padding-bottom: 5px;">{{ item.icon }}</v-icon> -->
								<font-awesome-icon :icon="['fas', item.icon ]" class="icon" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>
									{{ item.text }}
								<!-- <nuxt-link class="" :to="item.to">{{ item.text }}</nuxt-link> -->
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</template>
				</v-list>
			</v-navigation-drawer>

			<v-toolbar
			  color="primary"
			  dark
			  app
			  :clipped-left="$vuetify.breakpoint.lgAndUp"
			  fixed
			>
				<v-toolbar-title style="width: 300px" class="ml-0">
					<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
						<!-- <span class="hidden-sm-and-down" @click="backToSite">Retour au site</span> -->
						<v-btn color="success" class="hidden-sm-and-down" @click="backToSite">Back to site</v-btn>
						<v-icon class="hidden-md-and-up" @click="backToSite">arrow_back</v-icon>
						<!-- <nuxt-link class="hidden-sm-and-down" to="/" style="color: #fff;">Retour au site</nuxt-link> -->
					</v-toolbar-title>
				<!-- <v-text-field
				  flat
				  solo-inverted
				  prepend-icon="search"
				  label="Search"
				  class="hidden-sm-and-down"
				></v-text-field> -->
				<v-spacer></v-spacer>
				<span v-if="user">{{ user.email }}</span>
				<v-btn color="error" @click="logout">Logout</v-btn>
				<v-btn icon large>
					<v-avatar size="32px" tile>
						<!-- <img
						src="https://vuetifyjs.com/static/doc-images/logo.svg"
						alt="Vuetify"
						> -->
					</v-avatar>
				</v-btn>
			</v-toolbar>
			<v-content>
				<nuxt/>
			</v-content>
		</v-app>
	</div>
</template>

<script>
	export default {
		head: {
			meta: [
				{ name: 'robots', content: 'noindex' }
			],
			link: []
		},
		// middleware: ['admin-check'],
		created () {
			setTimeout(() => {
			  	this.loadingPage = false
			}, 1000)
		},
		mounted() {
		},
		data () {
			return {
				dialog: false,
				drawer: null,
				loadingPage: true,
				items: [
					{ icon: 'th', text: 'Dashboard', to: '/admin', exact: true },
					{ icon: 'users', text: 'Users', to: '/admin/users', exact: false },
				]
			}
		},
		computed: {
			user () {
				return this.$store.getters['users/loadedUser']
			},
		},
		methods: {
			backToSite () {
				this.$router.push('/')
			},
			logout () {
				this.$store.dispatch('firebase-auth/signOut').then(() => {
					this.$router.push('/')
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
