<template>
    <v-layout row wrap>
    	<!-- <b>loadedUser:</b> {{ loadedUser }}<br /> -->
    	<!-- <b>loadedUserResumes:</b> {{ loadedUserResumes }}<br /> -->
		<!-- getStatistics: {{ getStatistics }}<br /><br /> -->
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



        <v-flex xs10 offset-xs1 class="text-xs-center my-5">
            <!-- <create-resume-component></create-resume-component> -->
			<h2>Statistics</h2>
			<small>(# clicks on resumes)</small><br /><br />
			<GChart
			 	type="ColumnChart"
			 	:data="chartData"
			 	:options="chartOptions"
				class="ma-2"
			 	@ready="onChartReady"
			/>
			<br /><br />
			Total number of clicks:<br /><br />
			<div v-for="resume in loadedUserResumes" :key="resume.id">
				<p v-if="resume.statistics_last_visits">
					resume "{{ resume.slug }}":
					{{ resume.statistics_last_visits.length }}
				</p>
			</div>
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
	import { GChart } from 'vue-google-charts'
	import moment from 'moment'
	export default {
		components: { GChart },
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
					{ text: 'Identifier', value: 'slug' },
					{ text: 'Language', value: 'language'},
		          	{ text: 'Job title', value: 'job_title' },
		          	// { text: 'Job description', value: 'job_description' },
		          	{ text: 'Created at', value: 'created_at' },
		          	{ text: 'Last update', value: 'updated_at' },
		          	{ text: 'Actions', align: 'center', sortable: false }
		        ],
		        snackbar: false,
		        confirm: false,
				resume: {},
				// minDate: moment().subtract(2, 'months'),
				minDate: new Date(),
				maxDate: new Date(),
				chartOptions: {
					chart: {
						title: "Clicks",
						subtitle: "Number of clicks on resume"
					},
					width: "100%",
					height: 400,
					bar: { groupWidth: "95%" },
					isStacked: true,
					colors: ["#7A528F", "#FFC107", "#E11566"],
					// colors: ["#7A528F"],
					hAxis: {
						viewWindowMode: "explicit",
						viewWindow: {
							// min: new Date("2019-06-01"),
							min: this.minDate,
							// max: new Date("2019-06-31"),
							max: this.maxDate
						},
						// slantedText:false, slantedTextAngle:45
					},
					vAxis: {
						viewWindow: {
							// max: 10
							// max: 
						}
					},
					legend: {
						position: 'top',
						alignment: 'center'
					},
					chartArea: { width: '85%', height: '70%'},
				}
			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			loadedUserResumes () {
				return this.$store.getters['resumes/loadedUserResumes']
			},
			getStatistics () {
				const statistics = []
				this.loadedUserResumes.forEach(resume => {
					if (resume.statistics_last_visits) {
						statistics.push(
							resume.statistics_last_visits.map(visit => {
								// return moment(visit * 1000).toDate()
								// return new Date(moment(visit * 1000).format('YYYY-MM-DD'))
								// return moment(visit * 1000).format('YYYY-MM-DD')
								return new Date(moment(visit * 1000).format('YYYY-MM-DD'))
							})
						)
					}
				})
				return statistics
			},
			chartData () {
				let newArray = []
				this.getStatistics.forEach((resume, index) => {
					console.log('resume: ', resume)
					
					resume.forEach((click, index2) => {
						console.log('click: ', click.getTime())
						// console.log('filter: ', newArray.filter(value => value[0] === '2019-06-27'))
						const existingValue = newArray.find(value => value[0].getTime() === click.getTime())
						console.log('existingValue1: ', existingValue)
						if (existingValue) {
							console.log('existing value!')
							existingValue[index + 1] += 1 || 1
						} else {
							const newEntry = new Array(this.getStatistics.length + 1).fill(0)
							newEntry[0] = click
							newEntry[index + 1] = 1
							newArray.push(newEntry)
							console.log('newEntry: ', newEntry)
						}
					})
				})
				// newArray.unshift(['Date', 'View #1', 'Views #2'])
				const headerArray = ['Date']
				this.loadedUserResumes.forEach(resume => {
					headerArray.push(`Resume ${resume.slug}`)
				})
				newArray.unshift(headerArray)
				console.log('newArray: ', newArray)
				return newArray
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
			onChartReady (chart, google) {
      			// now we have google lib loaded. Let's create data table based using it.
      			this.createDataTable(google)
			},
			createDataTable(google) {
				const data = new google.visualization.DataTable();
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