<template>
    <!-- <div v-if="!loading"> -->
	<v-container v-if="!loading">
        <!-- <v-layout row wrap> -->
		<v-row no-gutters>
            <!-- <v-flex xs12 class="mb-3"> -->
			<v-col xs="12" class="mb-3">
                <h2 class="text-center">Create a new resume</h2>
            <!-- </v-flex> -->
			</v-col>
            <!-- error: {{ error }}<br /> -->
            <!-- step: {{ step }}<br /> -->
            <!-- loadedUserResumes: {{ loadedUserResumes }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- this.$validator: {{ this.$validator }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- loadedNewResume.uploads: {{ loadedNewResume.uploads }}<br /><br /> -->
            <!-- loadedNewResume.personal_data.picture: {{ loadedNewResume.personal_data.picture ? loadedNewResume.personal_data.picture.size : null }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- loadedUser: {{ loadedUser }}<br /><br /> -->
            <!-- loadingCreateResume: {{ loadingCreateResume }}<br /><br /> -->
            <!-- loadingUploadFiles: {{ loadingUploadFiles }}<br /><br /> -->
            <!-- stepEducationErrorsArray: {{ stepEducationErrorsArray }}<br /><br /> -->
            <!-- stepPersonalDataErrors: {{ stepPersonalDataErrors }}<br /><br /> -->
            <!-- acceptConditions: {{ acceptConditions }}<br /><br /> -->
        <!-- </v-layout> -->
		</v-row>

        <!-- <v-layout row wrap align-center v-if="loadedUserResumes.length > 0"> -->
		<v-row align="center" v-if="loadedUserResumes.length > 0">
            <!-- <v-flex xs9 sm4 offset-sm6 md3 offset-md8> -->
			<v-col xs="9" sm="4" offset-sm="6" offset-md="8">
                <v-select label="Select a resume to import" :items="loadedUserResumes" item-text="id" :return-object="true" :single-line="false" color="secondary" v-model="importResume"> </v-select>
            <!-- </v-flex> -->
			</v-col>
            <!-- <v-flex xs3 sm2 md1 class="text-xs-right"> -->
			<v-col xs="3" sm="2" md="1" class="text-right">
                <v-btn color="primary" @click="importDataFromResume">Import</v-btn>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>

        <!-- <v-layout row> -->
		<v-row no-gutters>
            <!-- <v-flex xs12> -->
			<v-col xs="12">
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step :step="1" editable v-if="stepTemplateErrors === false">Choose Template</v-stepper-step>
                        <v-stepper-step :step="1" editable :rules="[() => false]" v-else>Choose Template</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :step="2" editable v-if="stepPersonalDataErrors === false">General & Personal Data</v-stepper-step>
                        <v-stepper-step :step="2" editable :rules="[() => false]" v-else>General & Personal Data</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :step="3" editable v-if="stepEducationErrorsArray.length < 1">Education</v-stepper-step>
                        <v-stepper-step :step="3" editable :rules="[() => false]" v-else>Education</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :step="4" editable v-if="stepWorkExperienceErrorsArray.length < 1">Work experience</v-stepper-step>
                        <v-stepper-step :step="4" editable :rules="[() => false]" v-else>Work experience</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :step="5" editable v-if="stepSkillErrorsArray.length < 1">Skills</v-stepper-step>
                        <v-stepper-step :step="5" editable :rules="[() => false]" v-else>Skills</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :step="6" editable v-if="stepFileUploadErrorsArray.length < 1">Files upload</v-stepper-step>
                        <v-stepper-step :step="6" editable :rules="[() => false]" v-else>Files upload</v-stepper-step>

                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content :step="1">
                            <v-card class="mb-5">
                                <template-component />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="2">
                            <v-card class="mb-5">
                                <personal-data-component />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="3">
                            <v-card class="mb-5">
                                <education-component :educationErrors="stepEducationErrorsArray" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="4">
                            <v-card class="mb-5">
                                <work-experience-component :workExperienceErrors="stepWorkExperienceErrorsArray" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="5">
                            <v-card class="mb-5">
                                <skills-component :skillErrors="stepSkillErrorsArray" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="6">
                            <v-card class="mb-5">
                                <file-uploads-component :fileUploadErrors="stepFileUploadErrorsArray" />
                            </v-card>
                        </v-stepper-content>

                    </v-stepper-items>

                    <v-card-actions class="justify-center">
                        <v-btn color="primary" @click.stop="moveOneStepBackward">
                            <v-icon>keyboard_arrow_left</v-icon> Previous
                        </v-btn>
                        <v-btn color="primary" @click.stop="moveOneStepForward">
                            Next <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <!-- <v-layout justify-center> -->
					<v-row no-gutters justify="center">
                        <v-btn class="success" :loading="loadingCreateResume || loadingUploadFiles" @click.stop="creatingResumeDialog = true">Save</v-btn>
                    <!-- </v-layout> -->
					</v-row>
                </v-stepper>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>

        <!-- Modal to create resume -->
        <v-dialog v-model="creatingResumeDialog" width="500" persistent>
            <v-card light>
                <v-card-title class="headline primary white--text justify-center" primary-title>
                    Create resume
                </v-card-title>

                <v-card-text>

                    <!-- <v-layout row wrap justify-center align-center> -->
					<v-row no-gutters justify="center" align="center">
                        <!-- <v-flex xs2 class="text-xs-center"> -->
						<v-col xs="2" class="text-center">
                            <v-avatar size="46" color="grey lighten-4" class="mr-3">
                                <img src="/images/ivan-min.png" alt="avatar">
                            </v-avatar>
                        <!-- </v-flex> -->
						</v-col>

                        <!-- <v-flex xs10> -->
						<v-col xs="10">
                            <p class="px-2 my-0">Your new online resume is about to be created.</p>
                            <ul>
                                <li v-if="!loadedNewResume.education.length">&#8226; You did not add any education &#128528;. That's OK, you can add some later on &#128077;
                                </li>
                                <li v-if="!loadedNewResume.work_experience.length">&#8226; You did not add any work experience &#128528;. That's OK, you can add some later on &#128077;
                                </li>
                            </ul>
                        <!-- </v-flex> -->
						</v-col>

                    <!-- </v-layout> -->
					</v-row>

                    <!-- <v-layout justify-center> -->
					<v-row no-gutters justify="center">
                        <v-checkbox color="primary" v-model="acceptConditions">
                            <template v-slot:label>
                                <div>
                                    I agree with the
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <nuxt-link to="/terms-conditions" target="_blank" @click.stop v-on="on">
                                                Terms & Conditions
                                            </nuxt-link>
                                        </template>
                                        Opens in new window
                                    </v-tooltip>
                                </div>
                            </template>
                        </v-checkbox>
                    <!-- </v-layout> -->
					</v-row>

                    <!-- <v-layout justify-center> -->
					<v-row no-gutters justify="center">
                        <v-btn color="primary" @click.stop="saveResume" :disabled="!acceptConditions" :loading="loadingCreateResume || loadingUploadFiles">Create</v-btn>
                        <v-btn text color="secondary" @click.stop="creatingResumeDialog = false">Cancel</v-btn>
                    <!-- </v-layout> -->
					</v-row>

                    <v-alert :value="loadingUploadFiles" color="secondary" outline>
                        <div class="text-xs-center">
                            <v-progress-circular indeterminate color="secondary"></v-progress-circular> Uploading files...
                        </div>
                    </v-alert>
                    <v-alert :value="loadingCreateResume" color="primary" outline>
                        <div class="text-xs-center">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular> Saving resume...
                        </div>
                    </v-alert>
                </v-card-text>
            </v-card>
        </v-dialog>
    <!-- </div> -->
	</v-container>
</template>

<script>
	import templateComponent from '~/components/resume/TemplateComponent'
	// import personalDataComponent from '~/components/resume/PersonalDataComponent'
	// import educationComponent from '~/components/resume/EducationComponent'
	// import workExperienceComponent from '~/components/resume/WorkExperienceComponent'
	// import skillsComponent from '~/components/resume/SkillsComponent'
	// import fileUploadsComponent from '~/components/resume/FileUploadsComponent'
	import axios from 'axios'
	import Noty from 'noty'
	import { firestore, storage } from '~/plugins/firebase-client-init'
	import moment from 'moment'
	export default {
		$_veeValidate: {
			validator: 'new' // Give me my own validator scope.
		},
		components: {
			templateComponent,
			personalDataComponent: () => import('~/components/resume/PersonalDataComponent'),
			educationComponent: () => import('~/components/resume/EducationComponent'),
			workExperienceComponent: () => import('~/components/resume/WorkExperienceComponent'),
			skillsComponent: () => import('~/components/resume/SkillsComponent'),
			fileUploadsComponent: () => import('~/components/resume/FileUploadsComponent')
		},
		layout: 'layoutBack',
		async created() {
			this.$store.commit('setLoading', true)
			this.$store.commit('clearError')
			await this.$store.commit('resumes/setEmptyResume')

			if (!this.$store.getters['countries/loadedCountries'].length) {
				await this.$store.dispatch('countries/fetchCountries')
			}
			if (!this.$store.getters['languages/loadedLanguages'].length) {
				await this.$store.dispatch('languages/fetchLanguages')
			}
			if (!this.$store.getters['competences/loadedCompetences'].length) {
				await this.$store.dispatch('competences/fetchCompetences')
			}
			if (!this.$store.getters['socialNetworks/loadedSocialNetworks'].length) {
				await this.$store.dispatch('socialNetworks/fetchSocialNetworks')
			}
			this.$store.commit('setLoading', false)
		},
		mounted() {
			// this.errors.clear()
			this.$store.commit('setLoadingFiles', false, { root: true })
			this.$store.commit('setLoadingResume', false, { root: true })
		},
		data() {
			return {
				step: 1,
				creatingResumeDialog: false,
				acceptConditions: false,
				importResume: {},
				stepTemplateErrors: false,
				stepPersonalDataErrors: false,
				stepEducationErrorsArray: [],
				stepWorkExperienceErrorsArray: [],
				stepSkillErrorsArray: [],
				stepFileUploadErrorsArray: []
			}
		},
		computed: {
			loading() {
				return this.$store.getters['loading']
			},
			errors() {
				return this.$store.getters['errors']
			},
			loadedUser() {
				return this.$store.getters['users/loadedUser']
			},
			loadedUserResumes() {
				return this.$store.getters['resumes/loadedUserResumes']
			},
			loadedNewResume() {
				return this.$store.getters['resumes/loadedNewResume']
			},
			loadingCreateResume() {
				return this.$store.getters['loadingResume']
			},
			loadingUploadFiles() {
				return this.$store.getters['loadingFiles']
			}
		},
		methods: {
			moveOneStepForward() {
				if (this.step < 6) {
					this.step += 1
				} else {
					this.step = 1
				}
			},
			moveOneStepBackward() {
				if (this.step != 1) {
					this.step -= 1
				} else {
					this.step = 6
				}
			},
			importDataFromResume() {
				// console.log('importDataFromResume')
				const importedResume = this.importResume
				delete importedResume['slug']
				delete importedResume['name']
				delete importedResume['visitor_id']
				delete importedResume['statistics_last_visits']
				delete importedResume['statistics_views_count']
				this.$store.commit('resumes/setNewResume', importedResume)
			},
			onInput(val) {
				this.steps = parseInt(val)
			},
			async saveResume() {
				try {
					console.log('saveResume')
					// return
					this.loadedNewResume['user_id'] = this.loadedUser.id
					// this.creatingResumeDialog = true

					// this.$validator.validateAll().then(result => {
					// 	console.log('result: ', result)
					// })
					this.loadAllComponents = true
					// validator.validate();
					await this.$validator.validateAll()
					// await this.$validator.validateAll()
					console.log('validateAll done!')
					console.log('this.errors: ', this.errors)
					// return

					if (this.errors && this.errors.items && this.errors.items.length > 0) {
						// Display errors in red in components
						// console.log('Validation error!')

						const templateErrors = this.errors.items.filter(
							item => item.field.includes('menu') || item.field.includes('field')
						)
						if (templateErrors.length > 0) {
							this.stepTemplateErrors = true
						}

						const inputs = [
							'slug',
							'job_title',
							'job_description',
							'firstname',
							'lastname',
							'email',
							'visibiliy',
							'password'
						]
						if (this.errors.items.some(e => inputs.includes(e.field))) {
							// console.log('Personal data errors')
							this.stepPersonalDataErrors = true
						}

						const educationErrors = this.errors.items.filter(item =>
							item.field.includes('education')
						)
						if (educationErrors.length > 0) {
							this.stepEducationErrorsArray = new Array(
								this.loadedNewResume.education.length
							)
							educationErrors.forEach(error => {
								const number = error.field.match(/\d+/g)
								if (number && number.length > 0) {
									// console.log(parseInt(number[0]))
									this.stepEducationErrorsArray.splice(parseInt(number[0]), 1, true)
								}
							})
						}

						const workExperienceErrors = this.errors.items.filter(item =>
							item.field.includes('work_experience')
						)
						if (workExperienceErrors.length > 0) {
							this.stepWorkExperienceErrorsArray = new Array(
								this.loadedNewResume.work_experience.length
							)
							workExperienceErrors.forEach(error => {
								const number = error.field.match(/\d+/g)
								if (number && number.length > 0) {
									// console.log(parseInt(number[0]))
									this.stepWorkExperienceErrorsArray.splice(
										parseInt(number[0]),
										1,
										true
									)
								}
							})
						}

						const skillErrors = this.errors.items.filter(item =>
							item.field.includes('skill')
						)
						if (skillErrors.length > 0) {
							this.stepSkillErrorsArray = new Array(this.loadedNewResume.skills.length)
							skillErrors.forEach(error => {
								const number = error.field.match(/\d+/g)
								if (number && number.length > 0) {
									// console.log(parseInt(number[0]))
									this.stepSkillErrorsArray.splice(parseInt(number[0]), 1, true)
								}
							})
						}

						const fileUploadErrors = this.errors.items.filter(item =>
							item.field.includes('file_title')
						)
						if (fileUploadErrors.length > 0) {
							this.stepFileUploadErrorsArray = new Array(
								this.loadedNewResume.uploads.length
							)
							fileUploadErrors.forEach(error => {
								const number = error.field.match(/\d+/g)
								if (number && number.length > 0) {
									// console.log(parseInt(number[0]))
									this.stepFileUploadErrorsArray.splice(parseInt(number[0]), 1, true)
								}
							})
						}

						this.creatingResumeDialog = false
						new Noty({
							type: 'error',
							text: 'Please check validation errors.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
					} else {
						// console.log('OK, done!')
						// return
						this.$store.commit('setLoadingResume', true, { root: true })
						await this.$store.dispatch('resumes/storeResume', this.loadedNewResume)
						this.$store.commit('setLoadingFiles', false, { root: true })
						this.$store.commit('setLoading', false, { root: true })
						this.creatingResumeDialog = false
						new Noty({
							type: 'success',
							text: 'Your resume was successfully created &#128515;',
							timeout: 5000,
							theme: 'metroui'
						}).show()
						this.$router.push('/candidate/resumes')
					}
				} catch (error) {
					this.creatingResumeDialog = false
					this.$store.commit('setLoadingFiles', false, { root: true })
					this.$store.commit('setLoadingResume', false, { root: true })
					this.$store.commit('setLoading', false, { root: true })

					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and your resume could not be created.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					Object.entries(error).forEach(([key, value]) => {
						if (key === 'server_error' || key === 'slug' || key === 'not_enough_space') {
							// console.log('key: ', key)
							// console.log('value: ', value)
							const field = key.substr(key.indexOf('.') + 1)

							this.$validator.errors.add({
								field: field,
								msg: value
							})

							if (key === 'slug') {
								this.stepPersonalDataErrors = true
							}
							if (key === 'not_enough_space') {
								this.stepFileUploadErrorsArray.push(true)
							}

							new Noty({
								type: 'warning',
								text: value,
								timeout: 8000,
								theme: 'metroui'
							}).show()
						} else {
							console.log('error: ', error)
							// if (process.env.NODE_ENV === 'production') {
							this.$sentry.captureException(new Error(error))
							// }
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.active {
		border: 2px solid var(--v-secondary-base);
	}
	.theme--dark.v-stepper .v-stepper__step--active .v-stepper__label {
		text-shadow: none;
	}
	.error2 {
		color: var(--v-error-base);
		text-shadow: none;
	}
</style>