<template>
    <!-- <v-layout row wrap> -->
    <v-row no-gutters>
        <!-- <v-layout justify-center> -->
        <v-row no-gutters justify="center" class="my-2">
            <h2>Manage authorizations</h2>
            <!-- </v-layout> -->
        </v-row>

        <!-- <v-flex xs12 class="text-xs-center"> -->
        <v-col cols="12" class="text-center">

            <!-- <b>loadedUserGivenAuthorizations:</b> {{ loadedUserGivenAuthorizations }}<br /><br /> -->
            <!-- new_authorizations_received: {{ new_authorizations_received }}<br /><br /> -->
            <!-- new_authorizations_sent: {{ new_authorizations_sent }}<br /><br /> -->
            <!-- new_authorizations_status: {{ new_authorizations_status }}<br /><br /> -->

            <v-card flat class="ma-2">
                <v-card-title primary-title class="justify-center">
                    <h5 class="font-weight-medium">List of authorizations you were asked for</h5>
                </v-card-title>
                <v-card-text>
                    <v-data-table :headers="headersGivenAuthorizations" :items="loadedUserGivenAuthorizations" class="elevation-1">
                        <!-- <template v-slot:items="props"> -->
                        <template v-slot:body="{ items }">
                            <tbody>
                                <tr v-bind:class="[ new_authorizations_received.includes(item.id) ? 'fadeOut' : '']" v-for="(item, index) in items" :key="index">
                                    <td class="text-left">{{ item.resume.id }}</td>
                                    <td class="text-left">{{ item.user.firstname }}</td>
                                    <td class="text-left">{{ item.user.lastname }}</td>
                                    <td class="text-left">{{ item.user.email }}</td>
                                    <td class="text-left" v-if="item.user.message">{{ item.user.message.substr(0, 6) }} [...]</td>
                                    <td class="text-left" v-else></td>
                                    <td class="text-left" :class="[ new_authorizations_status.includes(item.id) ? 'fadeOut' : '']">{{ item.status ? item.status.name : '' }}</td>
                                    <!-- <td>
    									<v-checkbox class="checkbox-center" v-model="item.authorizations['personal_data']" :disabled="item.status !== 'access_granted'"></v-checkbox>
    								</td>
    								<td>
    									<v-checkbox class="checkbox-center" color="secondary" v-model="item.authorizations['picture']"></v-checkbox>
    								</td>
    								<td>
    									<v-checkbox class="checkbox-center" v-model="item.authorizations['education']"></v-checkbox>
    								</td>
    								<td>
    									<v-checkbox class="checkbox-center" v-model="item.authorizations['work_experience']"></v-checkbox>
    								</td>
    								<td>
    									<v-checkbox class="checkbox-center" v-model="item.authorizations['skills']"></v-checkbox>
    								</td> -->
                                    <!-- <td>
    									<v-checkbox class="checkbox-center" color="secondary" readonly v-model="item.authorizations['files']"></v-checkbox>
    								</td> -->
                                    <!-- <td>{{ parseInt(item._created_at) | moment('from') }}</td>-->
                                    <td class="text-left">{{ parseInt(item._updated_at) | moment('from') }}</td>
                                    <!-- <td>
    									<v-layout class="justify-center">
    										<v-avatar size="34" class="mr-2 avatar-edit">
    											<v-icon
    												class="icon-edit"
    												@click="openModal('edit', 'userGivenAuthorizations', index)"
    											>
    												edit
    											</v-icon>
    										</v-avatar>
    										<v-avatar size="34" class="avatar-delete">
    											<v-icon
    												class="icon-delete"
    												@click="openModal('delete', 'userGivenAuthorizations', index)"
    											>
    												delete
    											</v-icon>
    										</v-avatar>
    									</v-layout>
    								</td> -->
                                    <td class="text-left">
                                        <v-layout align-center fill-height>
                                            <v-btn text icon @click="openModal('edit', 'userGivenAuthorizations', index)">
                                                <v-icon small color="success">mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn text icon @click="requestConfirmation(item)">
                                                <v-icon small color="error">mdi-delete</v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            <!-- </v-flex> -->
        </v-col>

        <!-- <v-flex xs12 class="text-xs-center"> -->
        <v-col cols="12" class="text-center">
            <!-- <b>loadedUserReceivedAuthorizations:</b> {{ loadedUserReceivedAuthorizations }}<br /> -->
            <v-card flat class="ma-2">
                <v-card-title primary-title class="justify-center">
                    <h5 class="font-weight-medium">List of the authorizations you requested</h5>
                </v-card-title>
                <v-card-text>
                    <v-data-table :headers="headersReceivedAuthorizations" :items="loadedUserReceivedAuthorizations" class="elevation-1">
                        <!-- <template v-slot:items="props"> -->
						<template v-slot:body="{ items }">
							<tbody>
                            	<tr v-bind:class="[ new_authorizations_sent.includes(item.id) ? 'fadeOut' : '']" v-for="(item, index) in items" :key="index">
									<td class="text-left">{{ item.resume.firstname }}</td>
									<td class="text-left">{{ item.resume.lastname }}</td>
									<!-- <td class="text-left">{{ item.resume.email }}</td> -->
									<td class="text-left">
										<v-btn small color="success" nuxt :to="`/resume/${item.resume.id}`" target="_blank" :disabled="item.status.slug !== 'accorded'">View resume</v-btn>
									</td>
									<td class="text-left">{{ item.status ? item.status.name : '' }}</td>
									<!-- <td>
										<v-checkbox class="checkbox-center" v-model="item.authorizations['personal_data']" readonly></v-checkbox>
									</td>
									<td>
										<v-checkbox class="checkbox-center" v-model="item.authorizations['picture']" readonly></v-checkbox>
									</td>
									<td>
										<v-checkbox class="checkbox-center" v-model="item.authorizations['education']" readonly></v-checkbox>
									</td>
									<td>
										<v-checkbox class="checkbox-center" v-model="item.authorizations['work_experience']" readonly></v-checkbox>
									</td>
									<td>
										<v-checkbox class="checkbox-center" v-model="item.authorizations['skills']" readonly></v-checkbox>
									</td> -->
									<!-- <td>{{ parseInt(item._created_at) | moment('DD MMM YYYY') }}</td>-->
									<td class="text-left">{{ parseInt(item._updated_at) | moment('from') }}</td>
									<td class="text-left">
										<!-- <v-layout align-center fill-height> -->
										<v-row no-gutters align="center" class="fill-height">
											<v-btn text icon @click="openModal('edit', 'userReceivedAuthorizations', index)">
												<v-icon small color="success">mdi-pencil</v-icon>
											</v-btn>
											<v-btn text icon @click="requestConfirmation(item)">
												<v-icon small color="error">mdi-delete</v-icon>
											</v-btn>
										<!-- </v-layout> -->
										</v-row>
									</td>
                            	</tr>
							</tbody>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            <!-- </v-flex> -->
        </v-col>

        <v-dialog v-model="modal" max-width="500" persistent>
            <v-card>
                <v-card-title class="headline">
                    <!-- <v-layout class="justify-center"> -->
                    <v-row no-gutters justify="center">
                        {{ action === 'edit' ? 'Edit authorization' : 'Are you sure?' }}
                        <!-- </v-layout> -->
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md v-if="action === 'edit' && authorizationType === 'userGivenAuthorizations'">
                        <!-- <v-layout row wrap> -->
                        <v-row no-gutters>
                            <!-- authorization: {{ authorization }}<br /><br /> -->
                            <!-- loadedUserGivenAuthorizations: {{ loadedUserGivenAuthorizations[authorizationIndex] }}<br /> -->
                            <!-- <v-flex xs6> -->
                            <v-col cols="6">
                                Firstname:
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                {{ loadedUserGivenAuthorizations[authorizationIndex].user.firstname }}
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                Lastname:
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                {{ loadedUserGivenAuthorizations[authorizationIndex].user.lastname }}
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                Email:
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                {{ loadedUserGivenAuthorizations[authorizationIndex].user.email }}
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                Message:
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols6> -->
                            <v-col cols="6">
                                {{ loadedUserGivenAuthorizations[authorizationIndex].user.message }}
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- <v-flex cols12 class="mt-2"> -->
                            <v-col cols="12" class="mt-2">
                                <v-select :items="status" label="Status" item-text="name" return-object color="secondary" v-model="loadedUserGivenAuthorizations[authorizationIndex].status"></v-select>
                                <!-- </v-flex> -->
                            </v-col>
                            <!-- Files: -->
                            <!-- <v-flex xs12>
								<v-layout class="justify-center">
									Authorizations:
								</v-layout>
								<v-checkbox label="View files" color="secondary" v-model="loadedUserGivenAuthorizations[authorizationIndex].authorizations.files"></v-checkbox>
							</v-flex> -->
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
                            <!-- </v-layout> -->
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn color="success" @click="updateAuthorization" v-if="action === 'edit'" :loading="loading">
                        Update
                    </v-btn>
                    <v-btn color="error" @click="deleteAuthorization" v-if="action === 'delete'">
                        Yes, delete
                    </v-btn>
                    <v-btn color="secondary" text @click="modal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbarDeleteAuthorization" :timeout="5000" :bottom="true">
            <span class="pa-2" style="font-size: 1.3em;">Are you sure you want to delete authorization?</span>
            <v-btn color="pink" text @click.stop="deleteAuthorization">
                <span style="font-size: 1.3em;">Yes</span>
            </v-btn>
            <v-btn color="secondary" text @click="snackbarDeleteAuthorization = false">
                <span style="font-size: 1.3em;">No</span>
            </v-btn>
        </v-snackbar>
        <!-- </v-layout> -->
    </v-row>
</template>

<script>
	import moment from 'vue-moment'
	import { auth } from '~/plugins/firebase-client-init'
	import axios from 'axios'
	import Noty from 'noty'
	export default {
		layout: 'layoutBack',
		middleware: [],
		async mounted() {
			try {
				if (this.$store.getters['authorizations/loadedUserReceivedAuthorizations'].length < 1) {
					await this.$store.dispatch('authorizations/fetchUserReceivedAuthorizations')
				}
				if (this.$store.getters['authorizations/loadedUserGivenAuthorizations'].length < 1) {
					await this.$store.dispatch('authorizations/fetchUserGivenAuthorizations')
				}
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
		data() {
			return {
				headersGivenAuthorizations: [
					{ text: 'Resume', value: 'resume.id' },
					{ text: 'Firstname', align: 'left', value: 'user.firstname' },
					{ text: 'Lastname', value: 'user.lastname' },
					{ text: 'Email', value: 'user.email' },
					{ text: 'Message', value: 'user.message' },
					{ text: 'Status', align: 'left', value: 'status.slug' },
					// { text: 'View files', align: 'left', value: 'authorizations.files' },
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
					{ text: 'Resume', align: 'left', value: 'resume.id' },
					{ text: 'Status', align: 'left', value: 'status' },
					// { text: 'View Personal data', value: 'authorizations.personal_data' },
					// { text: 'View Picture', value: 'authorizations.picture' },
					// { text: 'View Education', value: 'authorizations.education' },
					// { text: 'View Work experience', value: 'authorizations.work_experience' },
					// { text: 'View Skills', value: 'authorizations.skills' },
					// { text: 'Created at', value: '_created_at' },
					{ text: 'Last update', align: 'left', value: '_updated_at' },
					{ text: 'Actions', align: 'left', sortable: false }
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
				authorization: {},
				snackbarDeleteAuthorization: false
			}
		},
		computed: {
			loading() {
				return this.$store.getters['loading']
			},
			loadedUser() {
				return this.$store.getters['user/loadedUser']
			},
			loadedUserReceivedAuthorizations() {
				return this.$store.getters['authorizations/loadedUserReceivedAuthorizations']
			},
			loadedUserGivenAuthorizations() {
				return this.$store.getters['authorizations/loadedUserGivenAuthorizations']
			}
		},
		methods: {
			// abc () {
			// 	this.selectAll = false
			// },
			requestConfirmation(authorization) {
				console.log('requestConfirmation')
				this.authorization = authorization
				this.snackbarDeleteAuthorization = true
			},
			updateCheckAll(authorization) {
				if (this.selectedAuthorizations.length == this.allAuthorizations.length) {
					this.isCheckAll = true
				} else {
					this.isCheckAll = false
				}
			},
			updateSelectedAuthorizations(authorization) {
				if (!this.selectedAuthorizations.find(item => item === authorization)) {
					this.selectedAuthorizations.push(authorization)
					this.updateCheckAll()
				} else {
					this.selectedAuthorizations = this.selectedAuthorizations.filter(item => item != authorization)
					this.updateCheckAll()
				}
			},
			checkAll() {
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
			async updateAuthorization() {
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
			async deleteAuthorization() {
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
			async updateAuthorization2(authorization, action) {
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
			openModal(action, type, index) {
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
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	.fadeOut {
		background-color: var(--v-secondary-base);
		animation: fadeout 8s linear forwards;
		-webkit-animation: fadeout 8s linear forwards;
	}
	@keyframes fadeout {
		100% {
			background-color: transparent;
		}
	}
	@-webkit-keyframes fadenout {
		100% {
			background-color: transparent;
		}
	}
</style>