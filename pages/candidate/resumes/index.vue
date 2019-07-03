<template>
	<v-layout row wrap>
		<!-- <b>loadedUser:</b> {{ loadedUser }}<br /> -->
		<!-- <b>loadedUserResumes:</b> {{ loadedUserResumes }}<br /> -->
		<!-- getStatistics: {{ getStatistics }}<br /><br /> -->
		<!-- dark: {{ dark }}<br /><br /> -->
		<!-- new Date("2019-01-01"): {{ new Date("2019-01-01") }}<br /><br />
		minDate: {{ minDate }}<br /><br />
		minDate2: {{ minDate2 }}<br /><br /> -->
		<!-- loadedDarkTheme: {{ loadedDarkTheme }}<br /><br /> -->
		<!-- chartOptions2.backgroundColor: {{ chartOptions2.backgroundColor }}<br /><br /> -->
		<v-layout justify-center>
			<h2>My resumes</h2><br /><br />
		</v-layout>
		<v-flex
		 	xs10
		 	offset-xs1
		 	class="text-xs-center"
		>
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
							<td>{{ parseInt(props.item._created_at) | moment('DD MMM YYYY') }}</td>
							<td>{{ parseInt(props.item._updated_at) | moment('from') }}</td>
							<td class="fill-height layout px-0">
								<v-layout class="justify-center">
									<v-btn
									 	flat
									 	icon
									 	nuxt
									 	:to="`/resume/${props.item.slug}`"
									>
										<v-icon small color="secondary">
											input
										</v-icon>
									</v-btn>
									<v-btn
									 	flat
									 	icon
									 	nuxt
									 	:to="`/candidate/resumes/${props.item.slug}`"
									>
										<v-icon small color="success">
											edit
										</v-icon>
									</v-btn>
									<v-btn
									 	flat
									 	icon
									 	@click="requestConfirmation(props.item)"
									>
										<v-icon small color="error">
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
					 	style="z-index: 0"
					 	@click="addResume"
					>
						<v-icon>add</v-icon>
					</v-btn>
				</v-card-text>
			</v-card>
		</v-flex>

		<v-flex
		 	xs10
		 	offset-xs1
		 	class="text-xs-center my-5"
		>
			<h2>Statistics</h2>
			<small>(Number of clicks on your resume(s))</small><br /><br />
			<GChart
			 	type="ColumnChart"
			 	:data="chartData"
			 	:options="chartOptions"
			 	:resizeDebounce="500"
			 	class="ma-2"
			/>
			<br /><br />

			<v-layout row wrap>
				<v-flex xs12 sm6 class="pa-2">
					<v-dialog
						ref="dialog"
						v-model="modalMinDate"
						:return-value.sync="date"
						persistent
						lazy
						full-width
						width="290px"
					>
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="minDate"
								label="Min date"
								prepend-icon="event"
								readonly
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="minDate" scrollable>
							<v-spacer></v-spacer>
							<v-btn flat color="secondary" @click="modalMinDate = false">Cancel</v-btn>
							<v-btn flat color="secondary" @click="updateMinDate">OK</v-btn>
						</v-date-picker>
					</v-dialog>
				</v-flex>

				<v-flex xs12 sm6 class="pa-2">
					<v-dialog
						ref="dialog"
						v-model="modalMaxDate"
						:return-value.sync="date"
						persistent
						lazy
						full-width
						width="290px"
					>
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="maxDate"
								label="Max date"
								prepend-icon="event"
								readonly
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="maxDate" scrollable>
							<v-spacer></v-spacer>
							<v-btn flat color="secondary" @click="modalMaxDate = false">Cancel</v-btn>
							<v-btn flat color="secondary" @click="updateMaxDate">OK</v-btn>
						</v-date-picker>
					</v-dialog>
				</v-flex>
			</v-layout>

			<br /><br />

			<v-list class="ma-2">
				<template v-for="(resume, index) in loadedUserResumes">
					<v-list-tile
					 avatar
					 :key="resume.id"
					 v-if="resume.statistics_last_visits"
					>
						<v-list-tile-content class="text-xs-center justify-center">
							<v-list-tile-sub-title class="">Total number of views for resume "{{ resume.id }}": <v-chip :color="chartOptions.colors[index]">{{ resume.statistics_last_visits.length }}</v-chip>
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider :key="index"></v-divider>
				</template>
			</v-list>





			<!-- minDate: {{ minDate }}<br />
			minDate2: {{ minDate2 }}<br />-->
			<!-- loadedDarkTheme: {{ loadedDarkTheme }}<br /> -->
			<!-- minDate: {{ minDate }}<br /> -->
			<!-- maxDate: {{ maxDate }}<br /> -->
			<!--chartBackgroundColor: {{ chartBackgroundColor }}<br /> -->
		</v-flex>

		<v-snackbar
		 	v-model="snackbar"
			:timeout="0"
		 	:bottom="true"
		 	:auto-height="true"
		>
			<span
			 	class="pa-2"
			 	style="font-size: 1.3em;"
			>Are you sure you want to delete this resume?</span>
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
	import { auth } from '~/plugins/firebase-client-init'
	import Noty from 'noty'
	import { GChart } from 'vue-google-charts'
	import moment from 'moment'
	export default {
		components: { GChart },
		layout: 'layoutBack',
		async created() {
			this.$store.getters['users/loadedUser']
			this.$store.dispatch('resumes/fetchUserResumes')
			if (this.$store.getters['loadedDarkTheme']) {
				this.chartOptions.backgroundColor = '#424242'
				this.chartOptions.hAxis.textStyle.color = '#FFF'
				this.chartOptions.vAxis.textStyle.color = '#FFF'
				this.chartOptions.legend.textStyle.color = '#FFF'
			} else {
				this.chartOptions.backgroundColor = '#FFF'
				this.chartOptions.hAxis.textStyle.color = '#424242'
				this.chartOptions.vAxis.textStyle.color = '#424242'
				this.chartOptions.legend.textStyle.color = '#424242'
			}
		},
		data() {
			return {
				headers: [
					{ text: "N°", value: "index" },
					{ text: "Identifier", value: "slug" },
					{ text: "Language", value: "language" },
					{ text: "Job title", value: "job_title" },
					{ text: "Created at", value: "created_at" },
					{ text: "Last update", value: "updated_at" },
					{ text: "Actions", align: "center", sortable: false }
				],
				snackbar: false,
				confirm: false,
				resume: {},
				chartOptions: {
					chart: {
						title: "Resumes statistics",
						subtitle: "Number of clicks on each resume"
					},
					width: "100%",
					height: 400,
					chartArea: { width: "85%", height: "70%" },
					// bar: { groupWidth: "95%" },
					backgroundColor: '#424242',
					colors: [
						"#7A528F",
						"#FFC107",
						"#E11566",
						"#AF97BB",
						"#FFE083",
						"#F08AB2",
						"#D7CBDD",
						"#FFEFC1",
						"#F7C4D8"
					],
					hAxis: {
						baselineColor: "#FFF",
						gridlines: {
							color: "transparent"
						},
						textStyle: {
							color: "#FFF"
						},
						viewWindow: {
							min: moment().subtract('1', 'months').toDate(),
							max: moment().toDate()
						}
					},
					vAxis: {
						baselineColor: "#FFF",
						textStyle: {
							color: "#FFF"
						}
					},
					legend: {
						position: "top",
						alignment: "center",
						textStyle: {
							color: "#FFF"
						}
					},
					animation: {
						duration: 1000,
						easing: "out"
					}
				},
				date: new Date().toISOString().substr(0, 10),
				minDate: moment().subtract('1', 'months').format('YYYY-MM-DD'),
				maxDate: moment().format('YYYY-MM-DD'),
				modalMinDate: false,
				modalMaxDate: false
			}
		},
		computed: {
			loadedUser() {
				return this.$store.getters["users/loadedUser"];
			},
			loadedUserResumes() {
				return this.$store.getters["resumes/loadedUserResumes"];
			},
			getStatistics() {
				const statistics = []
				this.loadedUserResumes.forEach(resume => {
					if (resume.statistics_last_visits) {
						statistics.push(
							resume.statistics_last_visits.map(visit => {
								return new Date(
									moment(visit * 1000).format('YYYY-MM-DD')
								)
							})
						)
					}
				})
				return statistics
			},
			chartData () {
				let newArray = []
				this.getStatistics.forEach((resume, index) => {
					resume.forEach((click, index2) => {
						console.log('click: ', click.getTime());
						// console.log('filter: ', newArray.filter(value => value[0] === '2019-06-27'))
						const existingValue = newArray.find(
							value => value[0].getTime() === click.getTime()
						)
						console.log('existingValue1: ', existingValue)
						if (existingValue) {
							console.log('existing value!')
							existingValue[index + 1] += 1 || 1
						} else {
							const newEntry = new Array(
								this.getStatistics.length + 1
							).fill(0)
							newEntry[0] = click
							newEntry[index + 1] = 1
							newArray.push(newEntry)
						}
					})
				})
				const headerArray = [{ label: 'Date', type: 'date' }]
				this.loadedUserResumes.forEach(resume => {
					if (resume.statistics_last_visits) {
						headerArray.push(`#clicks on resume ${resume.slug}`)
					}
				})
				newArray.unshift(headerArray)
				console.log('newArray: ', newArray)
				return newArray
			},
			loadedDarkTheme() {
				return this.$store.getters['loadedDarkTheme']
			}
		},
		methods: {
			addResume() {
				console.log('addResume');
				const currentNumberResumes = this.loadedUserResumes.length;
				const maxNumberResumes = this.loadedUser.private
					? this.loadedUser.private.maximum_number_of_resumes
					: 1;
				console.log('currentNumberResumes: ', currentNumberResumes);
				console.log('maxNumberResumes: ', maxNumberResumes);
				if (currentNumberResumes < maxNumberResumes) {
					this.$router.replace('/candidate/resumes/create');
				} else {
					new Noty({
						type: 'warning',
						text: `Sorry, but you are currently limited to ${maxNumberResumes} ${
							maxNumberResumes > 1 ? 'resumes' : 'resume'
						}.`,
						timeout: 5000,
						theme: 'metroui',
						closeWith: ['button']
					}).show();
				}
			},
			editResume() {
				this.$router.replace('/candidate/resumes/edit');
			},
			requestConfirmation(resume) {
				this.resume = resume;
				this.snackbar = true;
			},
			updateMinDate () {
				console.log('minDate: ', this.minDate)
				this.chartOptions.hAxis.viewWindow.min = new Date(this.minDate)
				this.modalMinDate = false
			},
			updateMaxDate () {
				console.log('maxDate: ', this.maxDate)
				this.chartOptions.hAxis.viewWindow.max = new Date(this.maxDate)
				this.modalMaxDate = false
			},
			async deleteResume() {
				try {
					this.snackbar = false;

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
						text:
							'Sorry, an error occured and your resume could not be deleted.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			}
		},
		watch: {
			loadedDarkTheme() {
				if (this.loadedDarkTheme) {
					this.chartOptions.backgroundColor = '#424242'
					this.chartOptions.hAxis.textStyle.color = '#FFF'
					this.chartOptions.vAxis.textStyle.color = '#FFF'
					this.chartOptions.legend.textStyle.color = '#FFF'
				} else {
					this.chartOptions.backgroundColor = '#FFF'
					this.chartOptions.hAxis.textStyle.color = '#424242'
					this.chartOptions.vAxis.textStyle.color = '#424242'
					this.chartOptions.legend.textStyle.color = '#424242'
				}
			}
		}
	}
</script>

<style scoped>

</style>