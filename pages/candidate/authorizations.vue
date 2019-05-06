<template>
	<v-layout row wrap>
		<v-layout justify-center>
			<h2>Manage my authorizations</h2>
		</v-layout>

		<v-flex xs12 class="text-xs-center">

			<!-- <b>loadedUserGivenAuthorizations:</b> {{ loadedUserGivenAuthorizations }}<br /><br /> -->
			<!-- authorizations_sent_new: {{ authorizations_sent_new }}<br /><br /> -->
			<!-- authorizations_sent_new_status: {{ authorizations_sent_new_status }}<br /><br /> -->
			<!-- authorizations_received_new: {{ authorizations_received_new }}<br /><br /> -->

			<v-card flat class="ma-2">
				<v-card-title primary-title class="justify-center">
					List of authorizations people asked you for
				</v-card-title>
				<v-card-text>
					<v-data-table
					    :headers="headersGivenAuthorizations"
					    :items="loadedUserGivenAuthorizations"
					    class="elevation-1"
					    :expand="true"
					>
					    <template v-slot:items="props">
							<tr v-bind:class="[ authorizations_sent_new.includes(props.item.id) ? 'fadeOut' : '']" :key="props.index">
								<td class="text-xs-left">{{ props.item.user.firstname }}</td>
								<td class="text-xs-left">{{ props.item.user.lastname }}</td>
								<td class="text-xs-left">{{ props.item.user.email }}</td>
								<td class="text-xs-left" :class="[ authorizations_sent_new_status.includes(props.item.id) ? 'fadeOut' : '']">{{ props.item.status }}</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['personal_data']" :disabled="props.item.status !== 'access_granted'"></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" color="secondary" v-model="props.item.authorizations['picture']"></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['education']"></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['work_experience']"></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['skills']"></v-checkbox>
								</td>
								<td>{{ parseInt(props.item._created_at) | moment('from') }}</td>					      
								<td>{{ props.item._updated_at }}</td>
								<td class="">
									<v-layout class="justify-center">
										<v-btn color="success" small @click="updateAuthorization(props.item, 'grant_access')" v-if="props.item.status !== 'access_granted'">Grant access</v-btn>

										<v-btn color="primary" small v-if="props.item.status === 'access_granted'" @click="updateAuthorization(props.item, 'update_authorizations')">Update authorization</v-btn>
										<v-btn color="warning" small v-if="props.item.status === 'access_granted'" @click="updateAuthorization(props.item, 'revoke_access')">Revoke access</v-btn>
										<v-btn color="error" small v-if="props.item.status === 'access_revoked'" @click="updateAuthorization(props.item, 'remove_authorization')">Remove</v-btn>
									</v-layout>
								</td>
							</tr>
					    </template>
					</v-data-table>
				</v-card-text>
			</v-card>
		</v-flex>

		<v-flex xs12 class="text-xs-center">
			<b>loadedUserReceivedAuthorizations:</b> {{ loadedUserReceivedAuthorizations }}<br />
			<v-card flat class="ma-2">
				<v-card-title primary-title class="justify-center">
					List of authorizations you requested
				</v-card-title>
				<v-card-text>
					<v-data-table
					    :headers="headersReceivedAuthorizations"
					    :items="loadedUserReceivedAuthorizations"
					    class="elevation-1"
					    :expand="true"
					>
					    <template v-slot:items="props">
							<tr v-bind:class="[ authorizations_received_new.includes(props.item.id) ? 'fadeOut' : '']" :key="props.index">
								<td class="text-xs-left">{{ props.item.resume.firstname }}</td>
								<td class="text-xs-left">{{ props.item.resume.lastname }}</td>
								<td class="text-xs-left">{{ props.item.resume.email }}</td>
								<td class="text-xs-left">{{ props.item.status }}</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['personal_data']" readonly></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['picture']" readonly></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['education']" readonly></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['work_experience']" readonly></v-checkbox>
								</td>
								<td>
									<v-checkbox class="checkbox-center" v-model="props.item.authorizations['skills']" readonly></v-checkbox>
								</td>
								<!-- <td>{{ new Date() | moment('YYYY') }}</td>			       -->
								<td>{{ parseInt(props.item._created_at) | moment('DD MMM YYYY') }}</td>				      
								<td>{{ parseInt(props.item._updated_at) | moment('from') }}</td>
								<td class="">
									<v-layout class="justify-center">
										<v-icon
											small
											class="mr-2"
											@click="editItem(props.item)"
										>
											edit
										</v-icon>
										<v-icon
											small
											@click="deleteItem(props.item)"
										>
											delete
										</v-icon>
										<v-btn color="success" small :to="`/resume/${props.item.resume.slug}`">
											See resume
										</v-btn>
									</v-layout>
								</td>
							</tr>
					    </template>
					</v-data-table>
				</v-card-text>
			</v-card>
		</v-flex>



		<v-dialog
		    v-model="dialog"
		    max-width="500"
		>
		    <v-card>
		        <v-card-title class="headline">Specify granular authorizations</v-card-title>

		        <v-card-text>
		          	<v-container grid-list-md>
		            	<v-layout wrap>
			              	<v-flex xs12 style="border: 1px solid #fff; border-radius: 5px;">
			              		<v-checkbox label="All" v-model="isCheckAll" @click.stop="checkAll" style="justify-content: center;"></v-checkbox>
			              	</v-flex>
			              	selectedAuthorizations: {{ selectedAuthorizations }}<br /><br />
			              	isCheckAll: {{ isCheckAll }}<br /><br />
			              	<v-flex xs6 v-for="authorization in allAuthorizations" :key="authorization.slug">
			                	<v-checkbox :value="authorization" v-model="selectedAuthorizations" :label="authorization.name" @click.stop="updateSelectedAuthorizations(authorization)"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.picture" label="Picture"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.education" label="Education"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.work_experience" label="Work Experience"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.skills" label="Skills"></v-checkbox>
			              	</v-flex>
			            </v-layout>
			        </v-container>
		        </v-card-text>

		        <v-card-actions>
		          	<v-spacer></v-spacer>
		          	<v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
		          	<v-btn
		            	color="green darken-1"
		            	flat="flat"
		            	@click="dialog = false"
		          	>
		            	Grant access
		          	</v-btn>
		        </v-card-actions>
		    </v-card>
		</v-dialog>

	</v-layout>
</template>

<script>
	import moment from 'vue-moment'
	import { auth } from '~/plugins/firebase-client-init'
	import axios from 'axios'
	import Noty from 'noty'
	export default {
		layout: 'layoutBack',
		middleware: [],
		async mounted () {
			try {
				await this.$store.dispatch('authorizations/fetchUserReceivedAuthorizations')
				await this.$store.dispatch('authorizations/fetchUserGivenAuthorizations')
			} catch (error) {
				new Noty({
					type: 'error',
					text: 'Sorry, an error occured while trying to fetch your authorizations.',
					timeout: 5000,
					theme: 'metroui'
				}).show()
			}
			this.$store.getters['users/loadedUser'].notifications.forEach(notification => {
				if (notification.type === 'authorization') {
					console.log('notification: ', notification)
					if (notification.value === 'authorization_sent_new') {
						this.authorizations_sent_new.push(notification.id)
					}
					if (notification.value === 'authorization_sent_new_status') {
						this.authorizations_sent_new_status.push(notification.id)
					}
					if (notification.value === 'authorization_received_new') {
						this.authorizations_received_new.push(notification.id)
					}
				}
			})
		},
		data () {
			return {
		        headersGivenAuthorizations: [
		          	{ text: 'Firstname', align: 'left', value: 'firstname' },
		          	{ text: 'Lastname', value: 'lastname' },
		          	{ text: 'Email', value: 'email' },
					{ text: 'Status', align: 'left', value: 'status' },
		          	{ text: 'View Personal data', value: 'authorizations.personal_data' },
		          	{ text: 'View Picture', value: 'authorizations.picture' },
		          	{ text: 'View Education', value: 'authorizations.education' },
		          	{ text: 'View Work experience', value: 'authorizations.work_experience' },
		          	{ text: 'View Skills', value: 'authorizations.skills' },
		          	{ text: 'Created at', value: '_created_at' },
		          	{ text: 'Updated at', value: '_updated_at' },
		          	{ text: 'Actions', sortable: false }
		        ],
				headersReceivedAuthorizations: [
		          	{ text: 'Firstname', align: 'left', value: 'firstname' },
		          	{ text: 'Lastname', value: 'lastname' },
		          	{ text: 'Email', value: 'email' },
					{ text: 'Status', align: 'left', value: 'status' },
		          	{ text: 'View Personal data', value: 'authorizations.personal_data' },
		          	{ text: 'View Picture', value: 'authorizations.picture' },
		          	{ text: 'View Education', value: 'authorizations.education' },
		          	{ text: 'View Work experience', value: 'authorizations.work_experience' },
		          	{ text: 'View Skills', value: 'authorizations.skills' },
		          	{ text: 'Created at', value: '_created_at' },
		          	{ text: 'Updated at', value: '_updated_at' },
		          	{ text: 'Actions', sortable: false }
		        ],
		        dialog: false,
		        allAuthorizations: [
		        	{
		        		name: 'Personal data',
		        		slug: 'personal_data'
		        	},
		        	{
		        		name: 'Picture',
		        		slug: 'picture'
		        	}
		        ],
		        selectedAuthorizations: [],
		        form: {
		        	authorizations: {
		        		personal_data: true,
		        		picture: true,
		        		education: true,
		        		work_experience: true,
		        		skills: true
		        	}
		        },
		        selectAll: true,
				isCheckAll: false,
				authorizations_sent_new: [],
				authorizations_sent_new_status: [],
				authorizations_received_new: []
			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['user/loadedUser']
			},
			loadedUserReceivedAuthorizations () {
				return this.$store.getters['authorizations/loadedUserReceivedAuthorizationsArray']
			},
			loadedUserGivenAuthorizations () {
				return this.$store.getters['authorizations/loadedUserGivenAuthorizationsArray']
			}
		},
		methods: {
			abc () {
				this.selectAll = false
			},
			updateCheckAll (authorization) {
		      	if (this.selectedAuthorizations.length == this.allAuthorizations.length) {
		         	this.isCheckAll = true;
		      	} else {
		         	this.isCheckAll = false;
		      	}
		    },
		    updateSelectedAuthorizations (authorization) {
		    	if (!this.selectedAuthorizations.find(item => item === authorization)) {
		    		this.selectedAuthorizations.push(authorization)
		    		this.updateCheckAll()
		    	} else {
		    		this.selectedAuthorizations = this.selectedAuthorizations.filter(item => item != authorization)
		    		this.updateCheckAll()
		    	}
		    },
		    checkAll () {
		    	console.log('checkAll')
		    	if (this.isCheckAll) {
		    		this.isCheckAll = false
		    		this.selectedAuthorizations = []
			    } else {
			    	this.isCheckAll = true
			    	for (let authorization in this.allAuthorizations) {
			    		this.selectedAuthorizations.push(this.allAuthorizations[authorization])
			    	}
			    }
		    },
			select() {
				console.log('select: ', this.selectAll)
				// this.selectAll = !this.selectAll
				if (this.selectAll) {
					console.log('Deselect')
					for (let authorization in this.form.authorizations) {
						// console.log('this.form.authorizations[authorization]: ', this.form.authorizations[authorization])
						console.log('authorization: ', authorization)
						this.form.authorizations[authorization] = false
					}
					// this.selectAll = false
				} else {
					console.log('Select All')
					for (let authorization in this.form.authorizations) {
						// console.log('this.form.authorizations[authorization]: ', this.form.authorizations[authorization])
						console.log('authorization: ', authorization)

						this.form.authorizations[authorization] = true
					}
					// this.selectAll = true
				}
				this.selectAll = !this.selectAll
			},
			async updateAuthorization (authorization, action) {
				if (action === 'grant_access') {
					this.dialog = true
					return
				}
				console.log('grantAccess: ', authorization)
				// const auth_user_id = this.loadedUser.id
				const auth_user_id = auth.currentUser ? auth.currentUser.uid : null
				console.log('auth_user_id: ', auth_user_id)
				const abc = await axios.post('/update-resume-authorization', { auth_user_id, authorization, action })
				console.log('abc: ', abc)
			}
		}
	}
</script>

<style scoped>
	/*.v-input__slot {
	  align-items: center;
	  justify-content: center;
	}*/
	.hidden {
		display: none;
	}
	.checkbox-center {
		justify-content: center;
		padding-top: 20px; 
	}

	.fade-enter-active {
  		transition: opacity 4s;
		background-color: var(--v-secondary-base);
	}
	.fade-enter, .fade-leave-to {
  		opacity: 0;
	}

	.fadeOut {
		background-color: var(--v-secondary-base);
    	animation: fadeout 5s linear forwards;
    	-webkit-animation: fadeout 5s linear forwards;
	}
	@keyframes fadeout {
  		100% { background-color: transparent; }
	}
	@-webkit-keyframes fadenout {
  		100% { background-color: transparent; }
	}
</style>