<template>
	<v-layout row wrap justify-center>
		<v-flex xs12 class="text-xs-center">
			<h2>Manage my Account</h2>
			<br />
		</v-flex>

		<v-flex xs12>
			<v-card>
				<v-card-text>
					<v-layout row wrap>
						<v-flex xs12 sm6>
							<v-text-field
								prepend-icon="user"
								v-model="loadedUser.firstname"
							>
								<template v-slot:label>
									Firstname <font-awesome-icon :icon="['fas', 'edit']" />
								</template>
							</v-text-field>
						</v-flex>
						<v-flex xs12 sm6>
							<v-text-field
								prepend-icon="user"
								v-model="loadedUser.lastname"
							>
								<template v-slot:label>
									Lastname <font-awesome-icon :icon="['fas', 'edit']" />
								</template>
							</v-text-field>
						</v-flex>
						<v-flex xs12 sm6>
							<v-text-field
								label="Email"
								prepend-icon="user"
								readonly
								v-model="loadedUser.email"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 v-if="loadedUser.status">
							<v-text-field
								label="Status"
								prepend-icon="user"
								readonly
								v-model="loadedUser.status"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6>
							<v-text-field
								label="Account creation date"
								prepend-icon="user"
								readonly
								:value="loadedUser._created_at | moment('ddd, MMMM Do YYYY HH:mm')"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6>
							<v-text-field
								label="Last update"
								prepend-icon="user"
								readonly
								:value="loadedUser._updated_at | moment('ddd, MMMM Do YYYY HH:MM')"
							></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row wrap class="mx-4 my-2 private">
						<v-flex xs12 sm6>
							<v-list class="mx-3">
								<v-list-tile>
									<v-list-tile-content>
										<v-list-tile-title>
											{{ loadedUser.private.package_name }} package
											<nuxt-link to="/packages" class="link"><font-awesome-icon :icon="['fas', 'arrow-right']" /> Upgrade</nuxt-link>
										</v-list-tile-title>
									</v-list-tile-content>		
								</v-list-tile>
								<v-list-tile >
									<v-list-tile-content>
										<v-list-tile-title v-if="loadedUser.private.package_valid_until">
											Valid until: {{ loadedUser.private.package_valid_until | moment('ddd, MMM Do YYYY') }}
										</v-list-tile-title>
										<v-list-tile-title v-else>
											No validity ending
										</v-list-tile-title>
									</v-list-tile-content>		
								</v-list-tile>
							</v-list>
						</v-flex>
						<v-flex xs12 sm6 class="">
							<v-list class="mx-3">
								<v-list-tile
									avatar
								>
									<v-list-tile-avatar>
										<img :src="`/images/packages/${loadedUser.private.maximum_number_of_resumes}_primary.jpg`">
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-title>
											Maximum number of resumes
										</v-list-tile-title>
									</v-list-tile-content>
									
								</v-list-tile>
								<v-list-tile
									avatar
								>
									<v-list-tile-avatar>
										<img :src="`/images/packages/${loadedUser.private.available_templates}_secondary.jpg`">
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-title>
											Available templates
										</v-list-tile-title>
									</v-list-tile-content>
									
								</v-list-tile>
								<v-list-tile
									avatar
								>
									<v-list-tile-avatar>
										<img :src="`/images/packages/${loadedUser.private.total_space_in_bytes/(1024 * 1024)}MB_tertiary.jpg`">
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-title>
											Total available space in MB
										</v-list-tile-title>
									</v-list-tile-content>			
								</v-list-tile>
							</v-list>
						</v-flex>
					</v-layout>
				</v-card-text>

				<v-card-actions>
					<v-layout justify-center>
						<v-btn
							color="info"
							:loading="loadingUpdate"
							@click.stop="updateAccount"
						>
							Update
						</v-btn>
						<v-btn
							color="error"
							:flat="false"
							:loading="loading"
							@click.stop="dialog = true"
						>
							Delete account
						</v-btn>
					</v-layout>
				</v-card-actions>
			</v-card>
		</v-flex>

		<!-- <v-layout justify-center> -->
		<v-flex xs12 class="text-xs-center justify-center">
			<v-dialog
				v-model="dialog"
				lazy
				width="500px"
			>
				<v-card>
					<v-card-title
						class="headline error"
						primary-title
					>
						Deleting your account
					</v-card-title>

					<v-card-text>
						We are so sorry to see you go &#128546; But don't worry, you can come back anytime you want&#128077;! Please note that by deleting your account, we will suppress every bit of information we have on you, that includes:
						<br />
						<ul>
							<li>Your user profile</li>
							<li>All your resumes</li>
							<li>All the files you uploaded</li>
						</ul>
						<br />
						There is no possibly to reverse the process.
						We hope you have appreciated your time with us and wish you all good for the future. Thank you for being part of loginMyCV!
						<br /><br />
						<v-text-field
							v-model="userEmail"
							label="Please type your email address"
							prepend-icon="user"
						></v-text-field>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-layout justify-center>
							<v-btn
								color="secondary"
								:flat="false"
								:disabled="disabled"
								:loading="loading"
								@click.stop="deleteAccount"
							>
								Delete my account
							</v-btn>
						</v-layout>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-flex>
	</v-layout>
</template>

<script>
	import Noty from 'noty'
	import moment from 'moment'
	export default {
		layout: 'layoutBack',
		data () {
			return {
				dialog: false,
				userEmail: '',
				loadingUpdate: false,
				loadingDelete: false
			}
		},
		computed: {
			errors () {
				return this.$store.getters['errors']
			},
			loading () {
				return this.$store.getters['loading']
			},
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			disabled () {
				return this.userEmail !== this.loadedUser.email
			},
			createdAt () {
				// return this.loadedUser._created_at
				return moment(this.loadedUser._created_at).format('YYYY-MM-DD')
			}
		},
		methods: {
			async updateAccount () {
				try {
					this.loadingUpdate = true
					await this.$store.dispatch('users/updateUserAccount', { 
						firstname: this.loadedUser.firstname,
						lastname: this.loadedUser.lastname
					})
					this.loadingUpdate = false
					new Noty({
						type: 'success',
						text: 'Account info updated successfully &#128515;',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					console.log('error: ', error)
					this.loadingUpdate = false
					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and your account info could not be updated successfully.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			},
			async deleteAccount () {
				try {
					this.$store.commit('setLoading', true, { root: true })
					console.log('deleteAccount')
					await this.$store.dispatch('users/deleteUser')
					this.$store.commit('setLoading', false, { root: true })
					new Noty({
						type: 'success',
						text: 'Successfully deleted your account &#128075;',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					this.$router.push('/')
				} catch (error) {
					console.log('error: ', error)
					this.$store.commit('setLoading', false, { root: true })
					this.dialog = false
					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and your account could not be deleted.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			}
		}
	}
</script>

<style scoped>
	.private {
		border: 2px solid var(--v-secondary-base);
		border-radius: 10px;
	}
	.link {
		color: var(--v-secondary-base);
	}
</style>