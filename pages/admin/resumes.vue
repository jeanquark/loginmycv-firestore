<template>
	<!-- <div> -->
	<v-container>
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
	  	<!-- <v-flex xs12 sm10 offset-sm1> -->
		<v-row no-gutters>
			<v-col xs="12" sm="10" offset-sm="1">
				<br /><br />
				<h1 class="text-md-center">Resumes</h1>
				<br /><br />
				<v-card>
					<v-card-title>
						Resumes
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
						:headers="dessertsHeaders"
						:items="desserts"
						class="elevation-1"
					></v-data-table>

					<!-- <v-data-table
						:headers="headers"
						:items="loadedAllResumes"
						:search="search"
					>
						<template v-slot:items="props">
							<td>{{ props.index + 1 }}</td>
							<td>{{ props.item.personal_data.firstname }}</td>
							<td>{{ props.item.personal_data.lastname }}</td>
							<td>{{ props.item.personal_data.email }}</td>
							<td>{{ props.item.visibility }}</td>
							<td>{{ props.item.active }}</td>
							<td>{{ props.item._updated_at | moment('DD MMM YYYY') }}</td>
							<td style="white-space: nowrap;">
								<v-btn icon class="mx-0" disabled @click="editItem(props.item)">
									<v-icon color="teal">edit</v-icon>
								</v-btn>
								<v-btn icon class="mx-0" @click="deleteItem(props.item)">
									<v-icon color="pink">delete</v-icon>
								</v-btn>
							</td>
						</template>

						<template v-slot:no-data>
							<v-alert :value="true" color="error" icon="warning">
								Sorry, nothing to display here :(
							</v-alert>
						</template>
					</v-data-table> -->
				</v-card>
			</v-col>
	    <!-- </v-flex> -->
		</v-row>
	<!-- </div> -->
	</v-container>
</template>

<script>
	import Noty from 'noty'
  	export default {
		layout: 'layoutAdmin',
		created () {
			// if (this.loadedUsers.length < 1) {
				// this.$store.dispatch('resumes/fetchAllResumes')
			// }
		},
		mounted () {
		},
		data () {
			return {
				search: '',
				headers: [
					{ text: 'N°', value: 'index'},
					{ text: 'Firstname', value: 'firstname' },
					{ text: 'Lastname', value: 'lastname' },
					{ text: 'Email', value: 'email' },
					{ text: 'Visibility', value: 'visibility' },
					{ text: 'Active', value: 'active' },
					{ text: 'Last update', value: '_updated_at' },
					{ text: 'Actions', sortable: false }
				],
				// users: '',
				links: [
					{
						text: 'Dashboard',
						to: '/admin',
						disabled: false
					},
					{
						text: 'Users',
						to: '/admin/resumes',
						disabled: true

					}
				],
				selectedRow: '',
				totalResumes: 0,
				options: {},
				dessertsHeaders: [
		          {
		            text: 'Dessert (100g serving)',
		            align: 'left',
		            sortable: false,
		            value: 'name',
		          },
		          { text: 'Calories', value: 'calories' },
		          { text: 'Fat (g)', value: 'fat' },
		          { text: 'Carbs (g)', value: 'carbs' },
		          { text: 'Protein (g)', value: 'protein' },
		          { text: 'Iron (%)', value: 'iron' },
		        ],
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading']
			},
			loadedAllResumes () {
				return this.$store.getters['resumes/loadedAllResumes']
			},
			desserts () {
				return [
		          {
		            name: 'Frozen Yogurt',
		            calories: 159,
		            fat: 6.0,
		            carbs: 24,
		            protein: 4.0,
		            iron: '1%',
		          },
		          {
		            name: 'Ice cream sandwich',
		            calories: 237,
		            fat: 9.0,
		            carbs: 37,
		            protein: 4.3,
		            iron: '1%',
		          },
		          {
		            name: 'Eclair',
		            calories: 262,
		            fat: 16.0,
		            carbs: 23,
		            protein: 6.0,
		            iron: '7%',
		          },
		          {
		            name: 'Cupcake',
		            calories: 305,
		            fat: 3.7,
		            carbs: 67,
		            protein: 4.3,
		            iron: '8%',
		          },
		          {
		            name: 'Gingerbread',
		            calories: 356,
		            fat: 16.0,
		            carbs: 49,
		            protein: 3.9,
		            iron: '16%',
		          },
		          {
		            name: 'Jelly bean',
		            calories: 375,
		            fat: 0.0,
		            carbs: 94,
		            protein: 0.0,
		            iron: '0%',
		          },
		          {
		            name: 'Lollipop',
		            calories: 392,
		            fat: 0.2,
		            carbs: 98,
		            protein: 0,
		            iron: '2%',
		          },
		          {
		            name: 'Honeycomb',
		            calories: 408,
		            fat: 3.2,
		            carbs: 87,
		            protein: 6.5,
		            iron: '45%',
		          },
		          {
		            name: 'Donut',
		            calories: 452,
		            fat: 25.0,
		            carbs: 51,
		            protein: 4.9,
		            iron: '22%',
		          },
		          {
		            name: 'KitKat',
		            calories: 518,
		            fat: 26.0,
		            carbs: 65,
		            protein: 7,
		            iron: '6%',
		          }
		        ]
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