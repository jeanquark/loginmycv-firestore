<template>
	<div>
		<v-breadcrumbs divider="/">
	  		<v-breadcrumbs-item
		        v-for="link in links"
		        :key="link.text"
		        :disabled="link.disabled"
		        :to="link.to"
		        :exact="true"
		      >
	    		{{ link.text }}
	  		</v-breadcrumbs-item>
		</v-breadcrumbs>
	  	<v-flex xs12 sm10 offset-sm1>
	  		<br /><br />
	      	<h1 class="text-md-center">Users</h1>
	      	<br /><br />
	      	<!-- <v-btn color="primary" dark slot="activator" class="mb-2" to="/admin/events/create">Add a User</v-btn> -->
			<!-- loadedUsers: {{ loadedUsers }}<br /> -->
			<v-card>
			    <v-card-title>
			      	Users
			      	<v-spacer></v-spacer>
					<v-text-field
						append-icon="search"
						label="Search"
						single-line
						hide-details
						v-model="search"
					></v-text-field>
			    </v-card-title>
			    <v-data-table
				    :headers="headers"
				    :items="loadedUsers"
				    :search="search"
			    >
					<!-- <template v-slot:items="props"> -->
					<template slot="items" slot-scope="props">
						<td>{{ props.index + 1 }}</td>
						<td>{{ props.item.email }}</td>
						<td>{{ props.item.private && props.item.private.status ? props.item.private.status.name : '' }}</td>
						<td>{{ props.item.firstname }}</td>
						<td>{{ props.item.lastname }}</td>
						<td>{{ props.item.private ? props.item.private.maximum_number_of_resumes : '' }}</td>
						<td>{{ props.item._created_at | moment('DD MMM YYYY') }}</td>
						<td style="white-space: nowrap;">
							<v-btn color="info" small class="" v-if="!props.item.private.status || props.item.private.status.slug !== 'admin'" @click="updateUserClaims(props.item, 'userToAdmin')">
								Grant Admin privileges&nbsp;&nbsp;
								<font-awesome-icon :icon="['fas', 'user-tie']" />
							</v-btn>
							<v-btn color="warning" small @click="updateUserClaims(props.item, 'adminToUser')" v-if="props.item.private && props.item.private.status && props.item.private.status.slug === 'admin'">
								Revoke Admin privileges&nbsp;&nbsp;
								<font-awesome-icon :icon="['fas', 'user-slash']" class="icon" />
							</v-btn>
							<v-btn icon class="mx-0" disabled @click="editItem(props.item)">
								<v-icon color="teal">edit</v-icon>
							</v-btn>
							<v-btn icon class="mx-0" @click="deleteItem(props.item)">
								<v-icon color="pink">delete</v-icon>
							</v-btn>
				        </td>
					</template>

		      		<!-- <v-alert slot="no-results" :value="true" color="error" icon="warning"> -->
		      		<!-- <v-alert v-slot:no-results :value="true" color="error" icon="warning">
		        		Your search for "{{ search }}" found no results.
		      		</v-alert> -->
					<template v-slot:no-data>
						<v-alert :value="true" color="error" icon="warning">
							Sorry, nothing to display here :(
						</v-alert>
					</template>
			    </v-data-table>
			</v-card>
	    </v-flex>
	</div>
</template>

<script>
	import firebase from 'firebase/app'
	import Noty from 'noty'
  	export default {
		layout: 'layoutAdmin',
		created () {
			// if (this.loadedUsers.length < 1) {
				this.$store.dispatch('users/fetchAllUsers')
			// }
		},
		mounted () {
			firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
				// Confirm the user is an Admin.
				if (!!idTokenResult.claims.admin) {
					// Show admin UI.
					console.log('User is ADMIN')
				} else {
					// Show regular user UI.
					console.log('User is not ADMIN')
				}
			})
			.catch((error) => {
				console.log(error)
			})
		},
		data () {
			return {
				search: '',
				headers: [
					// {
					//     text: 'ID',
					//     align: 'left',
					//     sortable: false,
					//     value: 'id'
					// },
					{ text: 'N°', value: 'index'},
					{ text: 'Email', value: 'email' },
					{ text: 'Status', value: 'status.value' },
					{ text: 'Firstname', value: 'firstname' },
					{ text: 'Lastname', value: 'lastname' },
					{ text: 'Max #resumes', value: 'private.maximum_number_of_resumes' },
					{ text: 'Created at', value: '_created_at' },
					{ text: 'Actions', sortable: false }
				],
				users: '',
				links: [
					{
						text: 'Dashboard',
						to: '/admin',
						disabled: false
					},
					{
						text: 'Users',
						to: '/admin/users',
						disabled: true

					}
				],
				selectedRow: '',
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading']
			},
			loadedUsers () {
				return this.$store.getters['users/loadedAllUsers']
			}
		},
		methods: {
			async updateUserClaims(user, action) {
				try {
					console.log('user: ', user)
					console.log('action: ', action)
					// this.selectedRow = user.email
					await this.$store.dispatch('users/updateUserClaims', { user, action })
					new Noty({
						type: 'success',
						text: 'Successfully updated user status.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					console.log('error: ', error)
					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and the user status could not be updated.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			}
		}
  	}
</script>