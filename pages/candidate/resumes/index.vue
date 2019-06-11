<template>
    <v-layout row wrap>
    	<!-- <b>loadedUser:</b> {{ loadedUser }}<br /> -->
    	<!-- <b>loadedUserResumes:</b> {{ loadedUserResumes }}<br /> -->
        <v-layout justify-center>
            <h2>My resumes</h2><br /><br />
        </v-layout>
        <v-flex xs10 offset-xs1 class="text-xs-center">
        	<v-card flat class="ma-2">
				<v-card-text>
					<v-data-table
					    :headers="headers"
					    :items="loadedUserResumes"
					    class="elevation-1"
					    :expand="true"
					>
					    <template v-slot:items="props">
					     	<td class="text-xs-left">{{ props.index + 1 }}</td>
					      	<td class="text-xs-left">{{ props.item.slug }}</td>
							<td class="text-xs-left">{{ props.item.language ? props.item.language.name : '' }}</td>
					      	<td class="text-xs-left">{{ props.item.job_title }}</td>
					      	<!-- <td class="text-xs-left">{{ props.item.job_description }}</td> -->
					      	<td>{{ parseInt(props.item._created_at) | moment('DD MMM YYYY') }}</td>					      
							<td>{{ parseInt(props.item._updated_at) | moment('from') }}</td>
							<td class="fill-height layout px-0">
								<v-layout class="justify-center">
									<v-btn flat icon nuxt :to="`/candidate/resumes/${props.item.slug}`">
										<v-icon small color="success">
											edit
										</v-icon>
									</v-btn>
									<v-btn flat icon @click="requestConfirmation(props.item)">
										<v-icon small color="error">
											delete
										</v-icon>
									</v-btn>
								</v-layout>
							</td>
					    </template>
					</v-data-table>
	                <!-- to="/candidate/resumes/create" -->
					<v-btn
	                    fab
	                    absolute
	                    small
	                    bottom
	                    right
	                    color="pink"
	                    slot="activator"
	                    @click="addResume"
	                >
	                    <v-icon>add</v-icon>
	                </v-btn>
				</v-card-text>
			</v-card>
            <!-- <edit-resume-component :candidate-id="loadedUser.id"></edit-resume-component> -->
        </v-flex>
        <v-flex xs10 offset-xs1 class="text-xs-center">
            <!-- <create-resume-component></create-resume-component> -->
        </v-flex>

        <v-snackbar
	      	v-model="snackbar"
			:timeout="0"
	      	:bottom="true"
	      	:auto-height="true"
	    >
	      	<span class="pa-2" style="font-size: 1.3em;">Are you sure you want to delete this resume?</span>
	      	<v-btn
	        	color="pink"
	        	flat
	        	@click="deleteResume"
	      	>
	        	<span style="font-size: 1.3em;">Yes</span>
	      	</v-btn>
	      	<v-btn
	        	color="secondary"
	        	flat
	        	@click="snackbar = false"
	      	>
	        	<span style="font-size: 1.3em;">No</span>
	      	</v-btn>
	    </v-snackbar>
    </v-layout>
</template>

<script>
	// import CreateResumeComponent from '~/components/resume/CreateResumeComponent'
	// import EditResumeComponent from '~/components/resume/EditResumeComponent'
	import { auth } from '~/plugins/firebase-client-init'
	import Noty from 'noty'
	export default {
		layout: 'layoutBack',
		middleware: [],
		// components: { CreateResumeComponent, EditResumeComponent },
		created () {
			this.$store.getters['users/loadedUser']
			this.$store.dispatch('resumes/fetchUserResumes')
			// const authUserId = auth.currentUser ? auth.currentUser.uid : null
			// console.log('authUserId client: ', authUserId)
		},
		data () {
			return {
				headers: [
					{ text: 'N°', value: 'index' },
					{ text: 'Slug', value: 'slug' },
					{ text: 'Language', value: 'language'},
		          	{ text: 'Job title', value: 'job_title' },
		          	// { text: 'Job description', value: 'job_description' },
		          	{ text: 'Created at', value: 'created_at' },
		          	{ text: 'Last update', value: 'updated_at' },
		          	{ text: 'Actions', align: 'center', sortable: false }
		        ],
		        snackbar: false,
		        confirm: false,
		        resume: {}
			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			loadedUserResumes () {
				return this.$store.getters['resumes/loadedUserResumes']
			}
		},
		methods: {
			addResume () {
				console.log('addResume')
				const currentNumberResumes = this.loadedUserResumes.length
				const maxNumberResumes = this.loadedUser.private ? this.loadedUser.private.maximum_number_of_resumes : 1
				console.log('currentNumberResumes: ', currentNumberResumes)
				console.log('maxNumberResumes: ', maxNumberResumes)
				if (currentNumberResumes < maxNumberResumes) {
	            	this.$router.replace('/candidate/resumes/create')
				} else {
					new Noty({
						type: 'warning',
						text: `Sorry, but you are currently limited to ${maxNumberResumes} ${maxNumberResumes > 1 ? 'resumes' : 'resume'}.`,
						timeout: 5000,
						theme: 'metroui',
						closeWith: ['button'],
					}).show()
				}
			},
			editResume () {
				this.$router.replace('/candidate/resumes/edit')
			},
			requestConfirmation (resume) {
				this.resume = resume
				this.snackbar = true
			},
			async deleteResume () {
				try {
					// const resume = this.resume
					this.snackbar = false

					console.log('deleteResume: ', this.resume)
					await this.$store.dispatch('resumes/deleteResume', this.resume)
					this.resumeId = ''
					new Noty({
						type: 'success',
						text: 'Successfully deleted resume',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and your resume could not be deleted.',
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