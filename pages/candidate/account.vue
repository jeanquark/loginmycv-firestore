<template>
	<v-layout row wrap justify-center>
		<v-flex xs12 class="text-xs-center">
			<h2>Manage Account</h2>
		</v-flex>

		<!-- <v-layout justify-center> -->
		<v-flex xs12 class="text-xs-center justify-center">
			<v-dialog
				v-model="dialog"
				lazy
				width="500px"
			>
				<template v-slot:activator="{ on }">
					<v-btn color="error" v-on="on">Delete my account</v-btn>			
				</template>
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
							<li>All the files you have uploaded</li>
						</ul>
						<br />
						There is no possibly to reverse the process.
						We hope you have appreciated the time you spend with us and wish you all good for the future. Thank you for being part of loginMyCV!
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
								@click.stop="deleteMyAccount"
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
	export default {
		layout: 'layoutBack',
		data () {
			return {
				dialog: false,
				userEmail: 'jm.kleger@gmail.com'
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
			}
		},
		methods: {
			async deleteMyAccount () {
				try {
					this.$store.commit('setLoading', true, { root: true })
					console.log('deleteAccount')
					// setTimeout(() => {
						await this.$store.dispatch('users/deleteUser')
						this.$store.commit('setLoading', false, { root: true })
					// }, 3000)
					this.dialog = false
					new Noty({
						type: 'success',
						text: 'Successfully deleted your account.',
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

</style>