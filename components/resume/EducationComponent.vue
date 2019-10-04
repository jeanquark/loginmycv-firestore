<template>
    <div class="text-xs-center mt-0 pa-4" style="" v-if="userResume">
        <div>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            userResume.education: {{ userResume.education }}<br /><br />
            <!-- educationErrors: {{ educationErrors }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
			newEducation: {{ newEducation }}<br /><br />
			<!-- dyncamicComponent: {{ dynamicComponent }}<br /><br /> -->
			<!-- expanded: {{ expanded }}<br /><br /> -->
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
                <v-dialog lazy dark v-model="modalNewEducation" width="600" :persistent="false">
                    <v-card>
                        <v-card-title class="headline" primary-title>
                            <v-layout class="justify-center">
                                New education entry
								newEducation: {{ newEducation }}<br />
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
									<component :is="dynamicComponent" :resumeSlug="resumeSlug" :newEducation="newEducation" @updateEducation="onUpdateEducation" v-if="dynamicComponent" />
								</v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions class="justify-center" style="padding-bottom: 20px;">
                            <v-btn class="success" :disabled="errors && errors.items && errors.items.filter(item => item.field.includes('education')).length > 0" @click="addNewEducation()">Add</v-btn>&nbsp;
                            <v-btn flat color="secondary" @click="closeModal">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


                <draggable v-model="candidateEducation" group="education" @start="drag=true" @end="drag=false" handle=".handle" style="width: 100%;">
                    <v-expansion-panel-content lazy v-for="(education, index) in candidateEducation" :key="index" v-model="expanded[index]">
                        <div slot="header">
                            <v-layout align-center>
                                <v-btn style="cursor: move;" icon class="handle ml-0">
                                    <v-icon>drag_indicator</v-icon>
                                </v-btn>
                                <v-icon @click.native.stop="deleteItem(index)" class="mr-3">cancel</v-icon>
                                <span style="font-size: 1.5em;" :class="{ 'errorTitle': educationErrors[index] }">{{ education.title }}</span>
                            </v-layout>
                        </div>

                        <v-card class="mb-5" style="background: black;">
							candidateEducation: {{ candidateEducation }}<br /><br />
							<!-- candidateEducation[index]: {{ candidateEducation[index] }}<br /><br /> -->
                            <v-card-text style="">
                                <v-layout row wrap>
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
                                    
									<v-flex xs12 class="pa-3">
										<component :is="dynamicComponent" :resumeSlug="resumeSlug" :index="index" v-if="dynamicComponent && expanded[index]" />
									</v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </draggable>
            </v-expansion-panel>
        </v-layout>
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
				dynamicComponent: null,
				expanded: [], // Control expansion panel open/close state. Necessary for the map inside Leaflet component (template004) to render on mounted
				resumeSlug: '',
				modalNewEducation: false,
				modalEditEducation: false,
				newEducation: {
					name: '',
					title: '',
					school: '',
					city: '',
					country: '',
					description: '',
					start_date: '',
					end_date: ''
				},
			}
		},
		computed: {
			loadDynamicComponent() {
				console.log('this.userResume: ', this.userResume)
				return () =>
					import(`~/components/resume/dynamicTemplatesComponents/${
						this.userResume.template.id
					}/EducationComponent`)
			},
			errors() {
				return this.$store.getters['errors']
			},
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
			closeModal() {
				this.modalNewEducation = false
				this.newEducation = {}
				// this.errors.items.filter(item => item.field.includes('education'))
			},
			onUpdateEducation(e) {
				console.log('onUpdateEducation: ', e)
				this.newEducation['position'] = 'abc'
			},
			saveEducation() {
				console.log('saveEducation')
				console.log(this.form)
			},
			addNewEducation() {
				this.modalNewEducation = false
				// this.userResume.education.push({
				// 	title: this.newEducation.title,
				// 	school: this.newEducation.school,
				// 	country: this.newEducation.country,
				// 	city: this.newEducation.city,
				// 	description: this.newEducation.description,
				// 	start_date: this.newEducation.start_date,
				// 	end_date: this.newEducation.end_date
				// })
				this.userResume.education.push(this.newEducation)
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