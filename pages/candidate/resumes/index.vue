<template>
    <!-- <v-layout row wrap> -->
	<v-row no-gutters>
        <!-- <v-flex xs12> -->
		<v-col>
            <!-- <b>loadedUser:</b> {{ loadedUser }}<br /> -->
            <!-- <b>loadedUserResumes:</b> {{ loadedUserResumes }}<br /><br /> -->
            <!-- getStatistics: {{ getStatistics }}<br /><br /> -->
            <!-- dark: {{ dark }}<br /><br /> -->
            <!-- new Date("2019-01-01"): {{ new Date("2019-01-01") }}<br /><br />
			minDate: {{ minDate }}<br /><br />
     		minDate2: {{ minDate2 }}<br /><br />-->
            <!-- loadedDarkTheme: {{ loadedDarkTheme }}<br /><br /> -->
            <!-- chartOptions2.backgroundColor: {{ chartOptions2.backgroundColor }}<br /><br /> -->
            <!-- loadingArray: {{ loadingArray }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- resumesNames: {{ resumesNames }}<br /><br /> -->
            <!-- newResumeNameMap: {{ newResumeNameMap }}<br /><br /> -->
            <!-- <div id="myDiv">
                <h1>abc</h1>
				<p>def</p>
            </div> -->
        <!-- </v-flex> -->
		</v-col>

        <!-- <v-layout justify-center> -->
		<v-row no-gutters>
            <h2 class="text-center">My resumes</h2>
            <br />
            <br />
        <!-- </v-layout> -->
		</v-row>
        <!-- <v-flex xs12 class="text-xs-center" id="myDiv"> -->
		<v-col cols="12" class="text-center">
            <v-card flat class="ma-2">
                <v-card-text class="ma-0 pa-0">
                    <v-data-table :headers="headers" :items="loadedUserResumes" class="elevation-1">
                        <template v-slot:body="{ items }">
							<tbody>
								<tr v-for="(item, index) in items" :key="index">
									<td class="text-left">{{ index + 1 }}</td>
									<td class="text-left">
										<!-- <v-layout align-center fill-height> -->
										<v-row no-gutters align="center" class="fill-height">
											<!-- :value="props.item.name" -->
											<v-text-field :name="`name${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`name${index}`) : null" data-vv-as="Name" :value="item.name" @input="updateName($event, item.id)" class="mr-2"></v-text-field>

											<font-awesome-icon :icon="['fas', 'save']" size="lg" @click="updateResumeName({ resumeId: item.id, newValue: newResumeNameMap.get(item.id), index: index })" class="icon" v-if="newResumeNameMap.get(item.id) !== item.name && !loadingArray.length > 0 && (errors && errors.items ? errors.items.length < 1 : null)" />

											<!-- <font-awesome-icon :icon="['fas', 'save']" size="lg" @click="updateResumeName({ resumeId: item.id, newName: item.name, index: index })" class="icon" v-if="resumesNames[index] !== item.name && !loadingArray.length > 0 && item.name && (errors && errors.items ? errors.items.length < 1 : null)" />-->
											<font-awesome-icon :icon="['fas', 'spinner']" spin size="lg" v-if="loadingArray.length > 0 && loadingArray[index]" />
										<!-- </v-layout> -->
										</v-row>
									</td>
									<td>
										<v-checkbox v-model="item.active" color="success" @click.stop="updateResumeActiveStatus({ resumeId: item.id, newValue: !item.active })"></v-checkbox>
									</td>
									<td class="text-left">{{ item.slug }}</td>
									<td class="text-left">{{ item.language ? item.language.name : '' }}</td>
									<td class="text-left">{{ item.job_title }}</td>
									<td>{{ parseInt(item._created_at) | moment('DD MMM YYYY') }}</td>
									<td>{{ parseInt(item._updated_at) | moment('from') }}</td>
									<td class="px-0">
										<!-- <v-layout class="justify-center fill-height align-center"> -->
										<!-- <v-layout align-center justify-center fill-height> -->
										<v-row no-gutters justify="center" align="center" class="fill-height">
											<!-- <v-btn flat icon @click="convertToPdf(item.slug)">
												<v-icon small color="blue">picture_as_pdf</v-icon>
											</v-btn> -->
											<v-btn text icon target="_blank" :href="`/resume/${item.slug}`">
												<v-icon small color="secondary">mdi-open-in-new</v-icon>
											</v-btn>
											<v-btn text icon nuxt :to="`/candidate/resumes/${item.slug}`">
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
                    <v-btn fab absolute small bottom right color="pink" slot="activator" style="z-index: 0" @click="addResume">
                        <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        <!-- </v-flex> -->
		</v-col>

        <!-- <v-flex xs10 offset-xs1 class="text-xs-center my-5" v-if="loadedUserResumes.length > 0 && getStatistics.length > 0"> -->
		<v-col xs="10" offset-xs="1" class="text-center my-5" v-if="loadedUserResumes.length > 0 && getStatistics.length > 0">
            <h2 class="text-center">Statistics</h2>
            <small>(Number of clicks on your resume(s))</small>
            <br />
            <br />
            <GChart type="ColumnChart" :data="chartData" :options="chartOptions" :resizeDebounce="500" class="ma-2" />
            <br />
            <br />

            <!-- <v-layout row wrap> -->
			<v-row no-gutters>
                <!-- <v-flex xs12 sm6 class="pa-2"> -->
				<v-col xs="12" sm="6" class="pa-2">
                    <v-dialog ref="dialog" v-model="modalMinDate" :return-value.sync="date" persistent lazy full-width width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="minDate" label="Min date" prepend-icon="mdi-calendar-range" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="minDate" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="secondary" @click="modalMinDate = false">Cancel</v-btn>
                            <v-btn text color="secondary" @click="updateMinDate">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                <!-- </v-flex> -->
				</v-col>

                <!-- <v-flex xs12 sm6 class="pa-2"> -->
				<v-col xs="12" sm="6" class="pa-2">
                    <v-dialog ref="dialog" v-model="modalMaxDate" :return-value.sync="date" persistent lazy full-width width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="maxDate" label="Max date" prepend-icon="mdi-calendar-range" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="maxDate" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="secondary" @click="modalMaxDate = false">Cancel</v-btn>
                            <v-btn text color="secondary" @click="updateMaxDate">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                <!-- </v-flex> -->
				</v-col>
            <!-- </v-layout> -->
			</v-row>

            <br />
            <br />

            <v-list class="ma-2">
                <!--<template v-for="(resume, index) in loadedUserResumes">
                    <v-list-tile avatar :key="resume.id" v-if="resume.statistics_last_visits">
                        <v-list-tile-content class="text-xs-center justify-center">
                            <v-list-tile-sub-title class>
                                Total number of views for resume "{{ resume.id }}":
                                <v-chip :color="chartOptions.colors[index]" class="white--text">{{ resume.statistics_last_visits.length }}</v-chip>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="index"></v-divider>
                </template>-->
            </v-list>
        <!-- </v-flex> -->
		</v-col>

        <v-snackbar v-model="snackbarDeleteResume" :timeout="5000" :bottom="true">
            <span class="pa-2" style="font-size: 1.3em;">Are you sure you want to delete resume {{ resume.slug }}?</span>
            <v-btn color="pink" text @click="deleteResume">
                <span style="font-size: 1.3em;">Yes</span>
            </v-btn>
            <v-btn color="secondary" text @click="snackbarDeleteResume = false">
                <span style="font-size: 1.3em;">No</span>
            </v-btn>
        </v-snackbar>

        <v-snackbar :value="snackbarNoResume" :timeout="0" :bottom="true">
            <v-avatar size="48" color="grey lighten-4" class="mr-3">
                <img src="/images/ivan-min.jpg" alt="avatar">
            </v-avatar>

            <span class="pa-2" style="font-size: 1.3em;">Hey! It looks like you have no resume at the moment. Start off by clicking the <v-btn fab small color="pink" class="ml-0 disabled-button">
                <v-icon>add</v-icon>
                </v-btn> button</span>
            <v-btn color="secondary" text @click="snackbarNoResume = false">
                <span style="font-size: 1.3em;">Close</span>
            </v-btn>
        </v-snackbar>
    <!-- </v-layout> -->
	</v-row>
</template>

<script>
	import { auth } from '~/plugins/firebase-client-init'
	import Noty from 'noty'
	import { GChart } from 'vue-google-charts'
	import moment from 'moment'
	if (process.client) {
		window.html2pdf = require('html2pdf.js')
	}
	export default {
		inject: ['$validator'], // Inject vee-validate validator
		components: { GChart },
		layout: 'layoutBack',
		async created() {
			this.$store.commit('setLoading', false)
			this.$store.getters['users/loadedUser']

			if (!this.loadedUserResumes || this.loadedUserResumes.length < 1) {
				await this.$store.dispatch('resumes/fetchUserResumes')
				if (this.loadedUserResumes.length < 1) {
					this.snackbarNoResume = true
				}
			}
			
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
		async mounted() {
			this.$store.getters['resumes/loadedUserResumes'].forEach(resume => {
				console.log('resume.name: ', resume.name)
				this.newResumeNameMap.set(resume.id, resume.name)
			})
		},
		data() {
			return {
				headers: [
					{ text: 'N°', value: 'index' },
					{ text: 'Name (not public)', value: 'name', sortable: true },
					{ text: 'Active?', value: 'active' },
					{ text: 'Identifier', value: 'slug' },
					{ text: 'Language', value: 'language' },
					{ text: 'Job title', value: 'job_title' },
					{ text: 'Created at', value: 'created_at' },
					{ text: 'Last update', value: 'updated_at' },
					{ text: 'Actions', align: 'center', sortable: false }
				],
				snackbarDeleteResume: false,
				snackbarNoResume: false,
				confirm: false,
				resume: {},
				chartOptions: {
					chart: {
						title: 'Resumes statistics',
						subtitle: 'Number of clicks on each resume'
					},
					width: '100%',
					height: 400,
					chartArea: { width: '85%', height: '70%' },
					// bar: { groupWidth: "95%" },
					backgroundColor: '#424242',
					colors: [
						'#7A528F',
						'#FFC107',
						'#E11566',
						'#AF97BB',
						'#FFE083',
						'#F08AB2',
						'#D7CBDD',
						'#FFEFC1',
						'#F7C4D8'
					],
					hAxis: {
						baselineColor: '#FFF',
						gridlines: {
							color: 'transparent'
						},
						textStyle: {
							color: '#FFF'
						},
						viewWindow: {
							min: moment()
								.subtract('1', 'months')
								.toDate(),
							max: moment().toDate()
						}
					},
					vAxis: {
						baselineColor: '#FFF',
						textStyle: {
							color: '#FFF'
						}
					},
					legend: {
						position: 'top',
						alignment: 'center',
						textStyle: {
							color: '#FFF'
						}
					},
					animation: {
						duration: 1000,
						easing: 'out'
					}
				},
				date: new Date().toISOString().substr(0, 10),
				minDate: moment()
					.subtract('1', 'months')
					.format('YYYY-MM-DD'),
				maxDate: moment().format('YYYY-MM-DD'),
				modalMinDate: false,
				modalMaxDate: false,
				loadingArray: [],
				resumesNames: [],
				newResumeName: '',
				newResumeNameMap: new Map()
			}
		},
		computed: {
			errors() {
				return this.$store.getters['errors']
			},
			loadedUser() {
				return this.$store.getters['users/loadedUser']
			},
			loadedUserResumes() {
				return this.$store.getters['resumes/loadedUserResumes']
			},
			getStatistics() {
				const statistics = []
				this.loadedUserResumes.forEach(resume => {
					if (resume.statistics_last_visits) {
						statistics.push(
							resume.statistics_last_visits.map(visit => {
								return new Date(moment(visit * 1000).format('YYYY-MM-DD'))
							})
						)
					}
				})
				return statistics
			},
			chartData() {
				console.log('chartData computed method called')
				let newArray = []
				this.getStatistics.forEach((resume, index) => {
					resume.forEach((click, index2) => {
						// console.log('click: ', click.getTime());
						// console.log('filter: ', newArray.filter(value => value[0] === '2019-06-27'))
						const existingValue = newArray.find(
							value => value[0].getTime() === click.getTime()
						)
						// console.log('existingValue1: ', existingValue)
						if (existingValue) {
							// console.log('existing value!')
							existingValue[index + 1] += 1 || 1
						} else {
							const newEntry = new Array(this.getStatistics.length + 1).fill(0)
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
				// console.log('newArray: ', newArray)
				return newArray
			},
			loadedDarkTheme() {
				return this.$store.getters['loadedDarkTheme']
			}
			// resumesNames () {
			// 	const resumesNames = []
			// 	this.loadedUserResumes.forEach(resume => {
			// 	// if (resume) {
			// 		console.log('resume.name: ', resume.name)
			// 		if (resume.name) {
			// 			// resumesNames.push(resume.name)
			// 			resumesNames.push(JSON.parse(JSON.stringify(resume.name)))
			// 		} else {
			// 			// resumesNames.push('')
			// 		}
			// 		// const resumeName = JSON.parse(JSON.stringify(resume.name))
			// 	// }
			// 	})
			// 	return resumesNames
			// }
		},
		methods: {
			convertToPdf(resumeSlug) {
				console.log('convertToPdf: ', resumeSlug)

				var element = document.getElementById('myDiv')
				console.log('element: ', element)
				var opt = {
					// margin: 0,
					// filename: 'myfile.pdf',
					// image: { type: 'jpeg', quality: 0.98 },
					// html2canvas: { scale: 2 },
					// jsPDF: { unit: 'cm', format: [60, 60], orientation: 'portrait' }
					margin: 1,
					filename: 'myFile.pdf',
					html2canvas: { dpi: 24, letterRendering: true },
					jsPDF: {
						orientation: 'portrait',
						// unit: 'mm',
						format: 'a4'
					}
				}

				html2pdf()
					.set(opt)
					.from(element)
					.save()
			},
			updateName($event, resumeId) {
				// console.log('updateName: ', $event, resumeId)
				this.newResumeNameMap.set(resumeId, $event)
				// console.log(this.newResumeNameMap)
			},
			async updateResumeName(payload) {
				try {
					// console.log('payload: ', payload)
					this.loadingArray = new Array(payload.index + 1)
					this.loadingArray.splice(payload.index, 1, true)

					await this.$store.dispatch('resumes/updateResumeName', payload)
					this.loadingArray = []
					new Noty({
						type: 'success',
						text: 'Updated resume name successfully!',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					this.loadingArray = []
					console.log('error: ', error)
					new Noty({
						type: 'error',
						text:
							'Sorry, an error occured and the name of the resume could not be updated.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					this.$sentry.captureException(new Error(error))
				}
			},
			async updateResumeActiveStatus(payload) {
				try {
					await this.$store.dispatch('resumes/updateResumeActiveStatus', payload)
					new Noty({
						type: 'success',
						text: 'Updated resume status successfully!',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					// console.log('error: ', error)
					new Noty({
						type: 'error',
						text:
							'Sorry, an error occured and the status of the resume could not be updated.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					this.$sentry.captureException(new Error(error))
				}
			},
			addResume() {
				// console.log('addResume')
				const currentNumberResumes = this.loadedUserResumes.length
				const maxNumberResumes = this.loadedUser.private
					? this.loadedUser.private.maximum_number_of_resumes
					: 1
				// console.log('currentNumberResumes: ', currentNumberResumes)
				// console.log('maxNumberResumes: ', maxNumberResumes)
				if (currentNumberResumes < maxNumberResumes) {
					this.$router.replace('/candidate/resumes/create')
				} else {
					new Noty({
						type: 'warning',
						text: `Sorry, but you are currently limited to ${maxNumberResumes} ${
							maxNumberResumes > 1 ? 'resumes' : 'resume'
						}.`,
						timeout: 5000,
						theme: 'metroui',
						closeWith: ['button']
					}).show()
				}
			},
			editResume() {
				this.$router.replace('/candidate/resumes/edit')
			},
			requestConfirmation(resume) {
				this.resume = resume
				this.snackbarDeleteResume = true
			},
			updateMinDate() {
				// console.log('minDate: ', this.minDate)
				this.chartOptions.hAxis.viewWindow.min = new Date(this.minDate)
				this.modalMinDate = false
			},
			updateMaxDate() {
				// console.log('maxDate: ', this.maxDate)
				this.chartOptions.hAxis.viewWindow.max = new Date(this.maxDate)
				this.modalMaxDate = false
			},

			async deleteResume() {
				try {
					this.snackbar = false
					// console.log('deleteResume: ', this.resume)
					await this.$store.dispatch('resumes/deleteResume', this.resume)
					this.resumeId = ''
					new Noty({
						type: 'success',
						text: 'Successfully deleted resume &#128077;',
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
					this.$sentry.captureException(new Error(error))
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
	.icon {
		color: var(--v-secondary-base);
	}
	.icon:hover {
		color: var(--v-success-base);
		cursor: pointer;
	}
	.disabled {
		color: #ccc;
		cursor: default;
	}
	.disabled:hover {
		color: '#ccc';
		cursor: default;
	}
	.v-input--selection-controls {
		padding-top: 10px;
	}
	.disabled-button {
		pointer-events: none;
	}
</style>