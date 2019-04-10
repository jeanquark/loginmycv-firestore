<template>
    <v-layout row wrap>
    	<b>loadedUser:</b> {{ loadedUser }}<br />
    	<!-- <b>loadedUserResumes:</b> {{ loadedUserResumes }}<br /> -->
        <v-layout justify-center>
            <h2>My resumes</h2><br />
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
					      	<td class="text-xs-left">{{ props.item.job_title }}</td>
					      	<td class="text-xs-left">{{ props.item.job_description }}</td>
					      	<td>{{ parseInt(props.item._created_at) | moment('DD MMM YYYY') }}</td>					      
							<td>{{ parseInt(props.item._updated_at) | moment('from') }}</td>
							<td class="fill-height layout px-0">
								<v-layout class="justify-center">
									<v-btn flat icon nuxt :to="`/candidate/resumes/${props.item.slug}`">
										<v-icon small color="success">
											edit
										</v-icon>
									</v-btn>
									<v-btn flat icon>
										<v-icon small color="error" @click="deleteItem(props.item)">
											delete
										</v-icon>
									</v-btn>
								</v-layout>
							</td>
					    </template>
					</v-data-table>
					<v-btn
	                    fab
	                    absolute
	                    small
	                    bottom
	                    right
	                    color="pink"
	                    slot="activator"
	                    to="/candidate/resumes/create"
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
    </v-layout>
</template>

<script>
	// import CreateResumeComponent from '~/components/resume/CreateResumeComponent'
	// import EditResumeComponent from '~/components/resume/EditResumeComponent'
	import { auth } from '~/plugins/firebase-client-init'
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
		          	{ text: 'Job title', value: 'job_title' },
		          	{ text: 'Job description', value: 'job_description' },
		          	{ text: 'Created at', value: 'created_at' },
		          	{ text: 'Last update', value: 'updated_at' },
		          	{ text: 'Actions', align: 'center', sortable: false }
		        ]
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
			editResume () {
				this.$router.replace('/candidate/resumes/edit')
			}
		}
	}
</script>

<style scoped>

</style>