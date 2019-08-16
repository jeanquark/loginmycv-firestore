<template>
    <div class="text-xs-center mt-0 pa-4" style="" v-if="userResume">
        <div>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- userResume.education: {{ userResume.education }}<br /><br /> -->
            <!-- educationErrors: {{ educationErrors }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
			expanded: {{ expanded }}<br /><br />
        </div>
        <h2>Education</h2>
        <v-layout row wrap class="pa-3" v-if="userResume">
            <v-alert :value="true" color="warning" icon="priority_high" outline v-if="!userResume.education.length > 0">
                There is no item in here, please click on the rounded pink button to add one
            </v-alert>
            <v-btn fab absolute bottom right color="pink" @click.stop="openNewEducationModal">
                <v-icon>add</v-icon>
            </v-btn>
            <v-expansion-panel style="">
                <v-dialog lazy v-model="modalNewEducation" width="500" :persistent="false">
                    <v-card>
                        <v-card-title class="headline" primary-title>
                            <v-layout class="justify-center">
                                Add a new entry
                            </v-layout>
                        </v-card-title>

                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field label="Title" name="education_title" placeholder="Bachelor in Geography" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('education_title') : null" data-vv-as="Title" v-model="newEducation.title" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="University/School/Institute" name="education_school" placeholder="University of Geneva" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('education_school') : null" data-vv-as="School" v-model="newEducation.school" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pr-2">
                                    <v-text-field label="City" name="education_city" placeholder="Geneva" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('education_city') : null" data-vv-as="City" v-model="newEducation.city" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-2">
                                    <v-text-field label="Country" name="education_country" placeholder="Switzerland" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('education_country') : null" data-vv-as="Country" v-model="newEducation.country" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Description" name="education_description" v-validate="{ max: 500 }" :error-messages="errors ? errors.collect('education_description') : null" data-vv-as="Description" v-model="newEducation.description" :counter="500"></v-textarea>
                                </v-flex>
                                <v-flex xs6 class="pr-2">
                                    <v-text-field label="Start date" name="education_start_date" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('education_start_date') : null" data-vv-as="Start date" v-model="newEducation.start_date" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-2">
                                    <v-text-field label="Graduation date" name="education_graduation_date" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('education_graduation_date') : null" data-vv-as="Graduation date" v-model="newEducation.end_date" :counter="50"></v-text-field>
                                </v-flex>
								<v-flex xs12 class="mt-4 pl-2">
									<component :is="dynamicComponent" :resumeSlug="resumeSlug" v-if="dynamicComponent" />
								</v-flex>
                            </v-layout>
                            <!--<v-layout row>
                                <v-flex xs6>
                                    <v-dialog
                                        v-model="form.modalEndDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="300px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="newEducation.end_date"
                                            label="Graduation date"
                                            prepend-icon="event"
                                            readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="form.endDate" :type="form.endDateType" color="primary" :scrollable="false">
                                            <v-layout justify-center>
                                                <v-btn flat color="error" @click="deleteNewEndDate">Remove</v-btn>
                                                <v-btn flat color="secondary" @click="form.modalEndDate = false">Cancel</v-btn>
                                                <v-btn flat color="success" @click="saveNewEndDate">OK</v-btn>
                                            </v-layout>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex xs6>
                                    <v-layout justify-center>
                                        <div>
                                            <v-radio-group v-model="form.endDateType" row>
                                                <v-radio label="Month" value="month" color="secondary"></v-radio>
                                                <v-radio label="Day" value="date" color="secondary"></v-radio>
                                            </v-radio-group>
                                        </div>
                                    </v-layout>
                                </v-flex>
                            </v-layout>-->

                        </v-card-text>
                        <v-card-actions class="justify-center" style="padding-bottom: 20px;">
                            <v-btn class="success" :disabled="errors && errors.items && errors.items.filter(item => item.field.includes('education')).length > 0" @click="addNewEducation()">Add</v-btn>&nbsp;
                            <!-- <v-btn class="success" @click="addNewEducation(newEducation)">Add</v-btn> -->
                            <v-btn flat color="secondary" @click="closeModal">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


                <draggable v-model="candidateEducation" group="education" @start="drag=true" @end="drag=false" handle=".handle" style="width: 100%;">
                    <v-expansion-panel-content lazy v-for="(education, index) in candidateEducation" :key="index" v-model="expanded[index]">
                        <!-- <v-icon slot="actions" color="primary"><v-icon>cross</v-icon></v-icon> -->
                        <!-- <v-icon slot="actions" color="teal">done</v-icon> -->
                        <!-- <v-icon color="teal">cross</v-icon> -->
                        <!-- @click.native.stop="delete(index)" -->
                        <div slot="header">
                            <v-layout align-center>
                                <v-btn style="cursor: move;" icon class="handle ml-0">
                                    <v-icon>drag_indicator</v-icon>
                                </v-btn>
                                <v-icon @click.native.stop="deleteItem(index)" class="mr-3">cancel</v-icon>
                                <!-- <v-icon color="red" class="mr-2">warning</v-icon> -->
                                <!-- <span style="font-size: 1.5em;" :class="hasError(`education${index}`)">{{ education.title }}</span> -->
                                <span style="font-size: 1.5em;" :class="{ 'errorTitle': educationErrors[index] }">{{ education.title }}</span>
                                <!-- hasError: {{ hasError('education') }} -->
                            </v-layout>
                        </div>

                        <!-- form.title: {{ form.title }}<br /><br /> -->
                        <!-- form.graduationDate: {{ form.graduationDate }}<br /><br /> -->
                        <!-- index: {{ index }}<br /><br /> -->
                        <!-- reference: {{ reference }}<br /><br /> -->
                        <v-card class="mb-5" style="background: black;">
                            <v-card-text style="">
                                <v-layout row wrap>
                                    <!-- Name: {{ edu.name }}<br />
                                    Location: {{ edu.location }}<br />
                                    Description: {{ edu.description }}<br />
                                    Duration: {{ edu.duration }} years<br />
                                    Graduation Date: {{ edu.graduation_date }}<br /> -->
                                    <!-- abc: {{ new Date().toISOString().substr(0, 7) }} -->
                                    <!-- candidateEducation[index]: {{ candidateEducation[index] }}<br /> -->
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="Title" :name="`education_title_${index}`" v-validate="{ required: true, max: 50 }" :error-messages="errors ? errors.collect(`education_title_${index}`) : null" data-vv-as="Title" v-model="candidateEducation[index].title" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="University/School/Institute name" :name="`education_school_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`education_school_${index}`) : null" data-vv-as="University/School/Institute" v-model="candidateEducation[index].school" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="City" :name="`education_city_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`education_city_${index}`) : null" data-vv-as="City" v-model="candidateEducation[index].city" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="Country" :name="`education_country_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`education_country_${index}`) : null" data-vv-as="Country" v-model="candidateEducation[index].country" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 class="pa-3">
                                        <v-textarea label="Education description" :name="`education_description_${index}`" v-validate="{ max: 200 }" :error-messages="errors ? errors.collect(`education_description_${index}`) : null" data-vv-as="Description" v-model="candidateEducation[index].description" :counter="200"></v-textarea>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="Start date" :name="`education_start_date_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`education_start_date_${index}`) : null" data-vv-as="Start date" v-model="candidateEducation[index].start_date" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="Graduation date" :name="`education_graduation_date_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`education_graduation_date_${index}`) : null" data-vv-as="Graduation date" v-model="candidateEducation[index].end_date" :counter="50"></v-text-field>
                                    </v-flex>
                                    
									<!-- <v-layout row wrap> -->
									<v-flex xs12 class="pa-3">
										<!-- <div style="width: 100%; max-height: 500px;"> -->
										<!-- <div> -->
										<component :is="dynamicComponent" :resumeSlug="resumeSlug" :index="index" v-if="dynamicComponent && expanded[index]" />
										<!-- </div> -->
									</v-flex>
								<!-- </v-layout> -->
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </draggable>

                
            </v-expansion-panel>

        </v-layout>
        <!-- <v-layout row wrap>
            <v-flex xs12 sm12 md8>
                <div style="width: 100%; max-height: 500px;">
                    <component :is="dynamicComponent" :resumeSlug="resumeSlug" v-if="dynamicComponent" />
                </div>
            </v-flex>
            <v-flex xs12 sm12 md4>
                Markers:
            </v-flex>
        </v-layout> -->
    </div>
</template>

<script>
	import Noty from 'noty'
	import Draggable from 'vuedraggable'

	export default {
		inject: ['$validator'], // Inject parent validator
		components: { Draggable },
		props: ['educationErrors'],
		created() {
			const resumeSlug = this.$route.params.slug
			console.log('resumeSlug: ', resumeSlug)
			this.resumeSlug = resumeSlug
		},
		mounted() {
			this.loadDynamicComponent()
				.then(() => {
					this.dynamicComponent = () => this.loadDynamicComponent()
				})
				.catch(() => {
					this.dynamicComponent = null
				})
		},
		data() {
			return {
				resumeSlug: '',
				modalNewEducation: false,
				modalEditEducation: false,
				// modalDate: false,
				// reference: 0,
				// picker: new Date().toISOString().substr(0, 7),
				// picker: '2019-01',
				newEducation: {
					name: '',
					title: '',
					city: '',
					country: '',
					description: '',
					start_date: '',
					end_date: ''
				},
				dynamicComponent: null,
				expanded: [] // Control expansion panel open/close state. Necessary for the map inside Leaflet component (template004) to render on mounted
				// education: [
				//     {
				//         name: 'Graphic Design',
				//         slug: 'graphic_design',
				//         location: 'St-Patrick University',
				//         duration: 2.5,
				//         graduation_date: '2019-02',
				//         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
				//     },
				//     {
				//         name: 'Master of Web Design',
				//         slug: 'master_of_web_design',
				//         location: 'St-Patrick University',
				//         duration: 2,
				//         graduation_date: '2019-02',
				//         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
				//     }
				// ],
			}
		},
		computed: {
			// error () {
			//     return this.$store.getters['index/error']
			// },
			errors() {
				return this.$store.getters['errors']
			},
			// candidateLongResume () {
			//     return this.$store.getters['index/candidateLongResume']
			// },
			loadedUserResume() {
				return this.$store.getters['resumes/loadedUserResumes'].find(
					resume => resume.slug === this.resumeSlug
				)
			},
			userResume() {
				if (this.resumeSlug) {
					return this.$store.getters['resumes/loadedUserResumes'].find(
						resume => resume.slug === this.resumeSlug
					)
				} else {
					return this.$store.getters['resumes/loadedNewResume']
				}
			},
			loadedNewResume() {
				return this.$store.getters['resumes/loadedNewResume']
			},
			candidateEducation: {
				get() {
					return this.userResume.education
				},
				set(value) {
					this.userResume.education = value
				}
			},
			// candidateEducation () {
			//     return this.userResume.education
			//     // const educationEmptyArray = []
			// }
			// hasError2 () {
			//     return true
			// },
			loadDynamicComponent() {
				console.log('this.userResume: ', this.userResume)
				return () =>
					import(`~/components/resume/dynamicTemplatesComponents/${
						this.userResume.template_id
					}/EducationComponent`)
			}
		},
		methods: {
			openNewEducationModal() {
				console.log('createNewEducation')
				if (this.userResume.education && this.userResume.education.length < 30) {
					this.modalNewEducation = true
				} else {
					new Noty({
						type: 'warning',
						text: 'No more than 30 items allowed!',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			},
			// open () {
			//     console.log('open')
			//     // this.$validator.validateAll()
			//     return 'open'
			// },
			// hasError (item) {
			//     console.log('Call to hasError: ', item)
			//     // return true
			//     // return 'error1'
			//     // if (this.errors && this.errors.items && this.errors.items.some(e => e.includes(item))) {
			//     //     return 'error'
			//     // }
			//     if (this.errors && this.errors.items && this.errors.items.filter(item => item.field.includes('education_title_0')).length > 0) {
			//         console.log('hasError!')
			//         return true
			//     }
			//     return false
			// },
			closeModal() {
				this.modalNewEducation = false
				this.newEducation = {}
				// this.errors.items.filter(item => item.field.includes('education'))
			},
			saveEducation() {
				console.log('saveEducation')
				console.log(this.form)
			},
			addNewEducation() {
				this.modalNewEducation = false
				this.userResume.education.push({
					title: this.newEducation.title,
					school: this.newEducation.school,
					country: this.newEducation.country,
					city: this.newEducation.city,
					description: this.newEducation.description,
					start_date: this.newEducation.start_date,
					end_date: this.newEducation.end_date
				})
				this.newEducation = {}
				new Noty({
					type: 'success',
					text: 'New Education added!',
					timeout: 5000,
					theme: 'metroui'
				}).show()
			},
			editEducation(education) {
				console.log('editEducation')
				// console.log('reference: ', reference)
				this.modalEditEducation = false
			},
			// saveNewStartDate () {
			//     this.newEducation.start_date = this.form.startDate
			//     this.form.modalStartDate = false
			// },
			// deleteStartDate (index) {
			//     this.candidateEducation[index].start_date = ''
			//     this.form.modalStartDate = false
			// },
			// deleteNewStartDate () {
			//     this.newEducation.start_date = ''
			//     this.form.modalStartDate = false
			// },
			// saveNewEndDate () {
			//     this.newEducation.end_date = this.form.endDate
			//     this.form.modalEndDate = false
			// },
			// deleteEndDate (index) {
			//     this.candidateEducation[index].end_date = ''
			//     this.form.modalEndDate = false
			// },
			// deleteNewEndDate () {
			//     this.newEducation.end_date = ''
			//     this.form.modalEndDate = false
			// },
			// saveDate2 (date, index) {
			//     console.log('saveDate')
			//     console.log('date: ', date)
			//     console.log('index: ', index)
			//     if (!index) {
			//         this.newEducation.graduation_date = date
			//     } else {
			//         this.education[index].graduation_date = date
			//     }
			//     this.modalDate = false
			// },
			deleteItem(index) {
				console.log('delete: ', index)
				this.candidateEducation.splice(index, 1)
			}
		}
	}
</script>

<style scoped>
	.errorTitle {
		/* background: none; */
		color: var(--v-error-base);
	}
</style>