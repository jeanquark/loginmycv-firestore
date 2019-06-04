<template>
	<v-layout row wrap>
		<v-layout justify-center>
			<h2>Manage authorizations</h2>
		</v-layout>

		<v-flex xs12 class="text-xs-center">

			<!-- <b>loadedUserGivenAuthorizations:</b> {{ loadedUserGivenAuthorizations }}<br /><br /> -->
			<!-- new_authorizations_received: {{ new_authorizations_received }}<br /><br /> -->
			<!-- new_authorizations_sent: {{ new_authorizations_sent }}<br /><br /> -->
			<!-- new_authorizations_status: {{ new_authorizations_status }}<br /><br /> -->

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
							<tr v-bind:class="[ new_authorizations_received.includes(props.item.id) ? 'fadeOut' : '']" :key="props.index">
								<td class="text-xs-left">{{ props.item.resume.id }}</td>
								<td class="text-xs-left">{{ props.item.user.firstname }}</td>
								<td class="text-xs-left">{{ props.item.user.lastname }}</td>
								<td class="text-xs-left">{{ props.item.user.email }}</td>
								<td class="text-xs-left">{{ props.item.user.message.substr(0, 6) }} [...]</td>
								<td class="text-xs-left" :class="[ new_authorizations_status.includes(props.item.id) ? 'fadeOut' : '']">{{ props.item.status ? props.item.status.name : '' }}</td>
								<!-- <td>
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
								</td> -->
								<td>
									<v-checkbox class="checkbox-center" color="secondary" readonly v-model="props.item.authorizations['files']"></v-checkbox>
								</td>
								<!-- <td>{{ parseInt(props.item._created_at) | moment('from') }}</td>-->
								<td>{{ parseInt(props.item._updated_at) | moment('from') }}</td>
								<!-- <td>
									<v-layout class="justify-center">
										<v-avatar size="34" class="mr-2 avatar-edit">
											<v-icon
												class="icon-edit"
												@click="openModal('edit', 'userGivenAuthorizations', props.index)"
											>
												edit
											</v-icon>
										</v-avatar>
										<v-avatar size="34" class="avatar-delete">
											<v-icon
												class="icon-delete"
												@click="openModal('delete', 'userGivenAuthorizations', props.index)"
											>
												delete
											</v-icon>
										</v-avatar>
									</v-layout>
								</td> -->
								<td class="fill-height layout px-0">
									<v-layout class="justify-center">
										<v-btn flat icon nuxt :to="`/candidate/resumes/${props.item.slug}`">
											<v-icon small color="success" @click="openModal('edit', 'userGivenAuthorizations', props.index)">
												edit
											</v-icon>
										</v-btn>
										<v-btn flat icon>
											<v-icon small color="error" @click="openModal('delete', 'userGivenAuthorizations', props.index)">
												delete
											</v-icon>
										</v-btn>
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
							<tr v-bind:class="[ new_authorizations_sent.includes(props.item.id) ? 'fadeOut' : '']" :key="props.index">
								<td class="text-xs-left">{{ props.item.resume.firstname }}</td>
								<td class="text-xs-left">{{ props.item.resume.lastname }}</td>
								<!-- <td class="text-xs-left">{{ props.item.resume.email }}</td> -->
								<td class="text-xs-left"><v-btn small color="success" nuxt :to="`/resume/${props.item.resume.id}`" target="_blank">View resume</v-btn></td>
								<td class="text-xs-left">{{ props.item.status ? props.item.status.name : '' }}</td>
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
								<!-- <td>{{ parseInt(props.item._created_at) | moment('DD MMM YYYY') }}</td>-->
								<td>{{ parseInt(props.item._updated_at) | moment('from') }}</td>
								<td class="">
									<v-layout class="justify-center">
										<v-icon
											small
											class="mr-2 icon"
											@click="editItem(props.item)"
										>
											edit
										</v-icon>
										<v-icon
											small
											@click="deleteItem(props.item)"
											class="icon"
										>
											delete
										</v-icon>
									</v-layout>
								</td>
							</tr>
					    </template>
					</v-data-table>
				</v-card-text>
			</v-card>
		</v-flex>


		<v-dialog
		    v-model="modal"
		    max-width="500"
			persistent
		>
		    <v-card>
		        <v-card-title class="headline">
					<v-layout class="justify-center">
						{{ action === 'edit' ? 'Edit authorization' : 'Are you sure?' }}
					</v-layout>
				</v-card-title>
		        <v-card-text>
		          	<v-container grid-list-md v-if="action === 'edit' && authorizationType === 'userGivenAuthorizations'">
		            	<v-layout row wrap>
							<!-- authorization: {{ authorization }}<br /><br /> -->
							<!-- loadedUserGivenAuthorizations: {{ loadedUserGivenAuthorizations[authorizationIndex] }}<br /> -->
							<v-flex xs6>
								Firstname:
							</v-flex>
							<v-flex xs6>
								{{ loadedUserGivenAuthorizations[authorizationIndex].user.firstname }}
							</v-flex>
							<v-flex xs6>
								Lastname:
							</v-flex>
							<v-flex xs6>
								{{ loadedUserGivenAuthorizations[authorizationIndex].user.lastname }}
							</v-flex>
							<v-flex xs6>
								Email:
							</v-flex>
							<v-flex xs6>
								{{ loadedUserGivenAuthorizations[authorizationIndex].user.email }}
							</v-flex>
							<v-flex xs6>
								Message:
							</v-flex>
							<v-flex xs6>
								{{ loadedUserGivenAuthorizations[authorizationIndex].user.message }}
							</v-flex>
							<v-flex xs12 class="mt-2">
								<v-select
									:items="status"
									label="Status"
									item-text="name"
									return-object
									color="secondary"
									v-model="loadedUserGivenAuthorizations[authorizationIndex].status"
								></v-select>
							</v-flex>
							<!-- Files: -->
							<v-flex xs12>
								<v-layout class="justify-center">
									Authorizations:
								</v-layout>
								<v-checkbox label="View files" color="secondary" v-model="loadedUserGivenAuthorizations[authorizationIndex].authorizations.files"></v-checkbox>
							</v-flex>
			              	<!-- <v-flex xs12 style="border: 1px solid #fff; border-radius: 5px;">
			              		<v-checkbox label="All" v-model="isCheckAll" @click.stop="checkAll" style="justify-content: center;"></v-checkbox>
			              	</v-flex> -->
			              	<!-- selectedAuthorizations: {{ selectedAuthorizations }}<br /><br />
			              	isCheckAll: {{ isCheckAll }}<br /><br />
			              	<v-flex xs6 v-for="authorization in allAuthorizations" :key="authorization.slug">
			                	<v-checkbox :value="authorization" v-model="selectedAuthorizations" :label="authorization.name" @click.stop="updateSelectedAuthorizations(authorization)" color="primary"></v-checkbox>
			                </v-flex> -->
			                <!-- <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.picture" label="Picture" color="primary"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.education" label="Education" color="primary"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.work_experience" label="Work Experience" color="primary"></v-checkbox>
			                </v-flex>
			                <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.skills" label="Skills" color="primary"></v-checkbox>
			              	</v-flex>
							  <v-flex xs6>
			                	<v-checkbox v-model="form.authorizations.files" label="Downloadable files" color="primary"></v-checkbox>
			              	</v-flex> -->
			            </v-layout>
			        </v-container>
		        </v-card-text>

		        <v-card-actions class="justify-center">
		          	<v-btn
		            	color="success"
		            	@click="updateAuthorization"
						v-if="action === 'edit'"
						:loading="loading"
		          	>
		            	Update
		          	</v-btn>
					<v-btn
		            	color="error"
		            	@click="deleteAuthorization"
						v-if="action === 'delete'"
		          	>
		            	Yes, delete
		          	</v-btn>
		          	<v-btn color="secondary" flat @click="modal = false">Close</v-btn>
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
			// Displaying notifications effects
			this.$store.getters['users/loadedUser'].notifications.forEach(notification => {
				if (notification.type === 'authorization') {
					console.log('notification: ', notification)
					if (notification.value === 'new_authorization_sent') {
						this.new_authorizations_sent.push(notification.authorization_id)
					}
					
					if (notification.value === 'new_authorization_received') {
						this.new_authorizations_received.push(notification.authorization_id)
					}
					if (notification.value === 'new_authorization_status') {
						this.new_authorizations_status.push(notification.authorization_id)
					}
				}
			})
			// Delete all user notifications that are of type "authorization"
			this.$store.dispatch('users/deleteUserNotifications')
		},
		data () {
			return {
		        headersGivenAuthorizations: [
					{ text: 'Resume', value: 'resume.id'},
		          	{ text: 'Firstname', align: 'left', value: 'user.firstname' },
		          	{ text: 'Lastname', value: 'user.lastname' },
					{ text: 'Email', value: 'user.email' },
					{ text: 'Message', value: 'user.message' },
					{ text: 'Status', align: 'left', value: 'status.slug' },
					{ text: 'View files', align: 'left', value: 'authorizations.files' },
		          	// { text: 'View Personal data', value: 'authorizations.personal_data' },
		          	// { text: 'View Picture', value: 'authorizations.picture' },
		          	// { text: 'View Education', value: 'authorizations.education' },
		          	// { text: 'View Work experience', value: 'authorizations.work_experience' },
		          	// { text: 'View Skills', value: 'authorizations.skills' },
		          	// { text: 'Created at', value: '_created_at' },
		          	{ text: 'Last update', value: '_updated_at' },
		          	{ text: 'Actions', sortable: false }
		        ],
				headersReceivedAuthorizations: [
		          	{ text: 'Firstname', align: 'left', value: 'firstname' },
		          	{ text: 'Lastname', value: 'lastname' },
					// { text: 'Email', value: 'email' },
					{ text: 'Resume', value: 'resume.id' },
					{ text: 'Status', align: 'left', value: 'status' },
		          	{ text: 'View Personal data', value: 'authorizations.personal_data' },
		          	{ text: 'View Picture', value: 'authorizations.picture' },
		          	{ text: 'View Education', value: 'authorizations.education' },
		          	{ text: 'View Work experience', value: 'authorizations.work_experience' },
		          	{ text: 'View Skills', value: 'authorizations.skills' },
		          	// { text: 'Created at', value: '_created_at' },
		          	{ text: 'Last update', value: '_updated_at' },
		          	{ text: 'Actions', sortable: false }
		        ],
				modal: false,
				action: '',
				authorizationType: '',
				authorizationIndex: '',
				status: [
					{
						name: 'In process',
						slug: 'in_process'
					},
					{
						name: 'Allowed',
						slug: 'allowed'
					},
					{
						name: 'Refused',
						slug: 'refused'
					}
				],
				allAuthorizations: [
		        	{
		        		name: 'Personal data',
		        		slug: 'personal_data'
		        	},
		        	{
		        		name: 'Picture',
		        		slug: 'picture'
					},
					{
		        		name: 'Education',
		        		slug: 'education'
					},
					{
		        		name: 'Work experience',
		        		slug: 'work_experience'
					},
					{
						name: 'Skills',
						slug: 'skills'
					},
					{
		        		name: 'Downloadable files',
		        		slug: 'downloadable_files'
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
				new_authorizations_sent: [],
				new_authorizations_received: [],
				new_authorizations_status: [],
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading']
			},
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
			async updateAuthorization () {
				try {
					console.log('authorizationType: ', this.authorizationType)
					console.log('authorizationIndex: ', this.authorizationIndex)
					this.$store.commit('setLoading', true, { root: true })
					let authorization = {}
					if (this.authorizationType === 'userGivenAuthorizations') {
						authorization = this.loadedUserGivenAuthorizations[this.authorizationIndex]
					} else if (this.authorizationType === 'userReceivedAuthorizations') {
						authorization = this.loadedUserReceivedAuthorizations[this.authorizationIndex]
					}
					console.log('authorization: ', authorization)
					await this.$store.dispatch('authorizations/updateAuthorization', authorization)
					this.$store.commit('setLoading', false, { root: true })
					this.modal = false
					new Noty({
						type: 'success',
						text: 'Successfully updated authorization.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					console.log('error: ', error)
					this.$store.commit('setLoading', false, { root: true })
					this.modal = false
					new Noty({
						type: 'error',
						text: 'Sorry an error occured and the authorization could not be updated.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			},
			async deleteAuthorization () {
				try {
					this.$store.commit('setLoading', true, { root: true })
					console.log('authorizationType: ', this.authorizationType)
					console.log('authorizationIndex: ', this.authorizationIndex)
					let authorization = {}
					if (this.authorizationType === 'userGivenAuthorizations') {
						authorization = this.loadedUserGivenAuthorizations[this.authorizationIndex]
					} else if (this.authorizationType === 'userReceivedAuthorizations') {
						authorization = this.loadedUserReceivedAuthorizations[this.authorizationIndex]
					}
					console.log('authorization: ', authorization)
					await this.$store.dispatch('authorizations/deleteAuthorization', authorization)
					this.$store.commit('setLoading', false, { root: true })
					this.modal = false
					new Noty({
						type: 'success',
						text: 'Successfully deleted authorization.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					console.log('error: ', error)
					this.$store.commit('setLoading', false, { root: true })
					this.modal = false
					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and the authorization could not be deleted.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			},
			async updateAuthorization2 (authorization, action) {
				if (action === 'grant_access') {
					this.authorizationModal = true
					return
				}
				console.log('grantAccess: ', authorization)
				// const auth_user_id = this.loadedUser.id
				const auth_user_id = auth.currentUser ? auth.currentUser.uid : null
				console.log('auth_user_id: ', auth_user_id)
				const abc = await axios.post('/update-resume-authorization', { auth_user_id, authorization, action })
				console.log('abc: ', abc)
			},
			openModal (action, type, index) {
				console.log('action: ', action)
				console.log('type: ', type)
				console.log('index: ', index)
				this.action = action
				this.authorizationType = type
				this.authorizationIndex = index
				this.modal = true
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
		padding-top: 10px; 
	}
	.avatar-edit:hover {
		background: var(--v-info-base);
	}
	.icon-edit {
		color: var(--v-info-base);
	}
	.icon-edit:hover {
		color: #fff;
	}
	.avatar-delete:hover {
		background: var(--v-error-base);
	}
	.icon-delete {
		color: var(--v-error-base);
	}
	.icon-delete:hover {
		color: #fff;
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
    	animation: fadeout 8s linear forwards;
    	-webkit-animation: fadeout 8s linear forwards;
	}
	@keyframes fadeout {
  		100% { background-color: transparent; }
	}
	@-webkit-keyframes fadenout {
  		100% { background-color: transparent; }
	}
</style>