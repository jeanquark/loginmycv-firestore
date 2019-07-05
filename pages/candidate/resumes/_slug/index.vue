<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <h2 class="text-xs-center">Edit resume {{ resumeSlug }}</h2>
                <br />
            </v-flex>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-stepper v-model="step">
 
                    <v-stepper-header>
                        <v-stepper-step :step="1" editable>Choose Template</v-stepper-step>

                        <v-divider></v-divider>

                        <!-- <v-stepper-step :rules="[stepPersonalDataValidate]" :step="2" editable>General & Personal Data</v-stepper-step> -->
                        <v-stepper-step :step="2" editable v-if="stepPersonalDataErrors === false">General & Personal Data</v-stepper-step>
                        <v-stepper-step :step="2" editable :rules="[() => false]" v-else>General & Personal Data</v-stepper-step>

                        <v-divider></v-divider>

                        <!-- <v-stepper-step :rules="[stepEducationValidate]" :step="3" editable>Education</v-stepper-step> -->
                        <v-stepper-step :step="3" editable v-if="stepEducationErrorsArray.length < 1">Education</v-stepper-step>
                        <v-stepper-step :step="3" editable :rules="[() => false]" v-else>Education</v-stepper-step>

                        <v-divider></v-divider>

                        <!-- <v-stepper-step :rules="[stepWorkExperienceValidate]" :step="4" editable>Work experience</v-stepper-step> -->
                        <v-stepper-step :step="4" editable v-if="stepWorkExperienceErrorsArray.length < 1">Work experience</v-stepper-step>
                        <v-stepper-step :step="4" editable :rules="[() => false]" v-else>Work experience</v-stepper-step>

                        <v-divider></v-divider>

                        <!-- <v-stepper-step :rules="[stepSkillsValidate]" :step="5" editable>Skills</v-stepper-step> -->
                        <v-stepper-step :step="5" editable v-if="stepSkillErrorsArray.length < 1">Skills</v-stepper-step>
                        <v-stepper-step :step="5" editable :rules="[() => false]" v-else>Skills</v-stepper-step>

                        <v-divider></v-divider>

                        <!-- <v-stepper-step :step="6" editable>Files upload</v-stepper-step> -->
                        <v-stepper-step :step="6" editable v-if="stepFileUploadErrorsArray.length < 1">Files upload</v-stepper-step>
                        <v-stepper-step :step="6" editable :rules="[() => false]" v-else>Files upload</v-stepper-step>

                        <!-- <v-divider></v-divider>

                        <v-stepper-step :step="7" editable>Other</v-stepper-step> -->

                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content :step="1">
                            <v-card class="mb-5">
                                <template-component :edit="true" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="2">
                            <v-card class="mb-5">
                                <personal-data-component v-if="step == 2" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="3">
                            <v-card class="mb-5">
                                <education-component :educationErrors="stepEducationErrorsArray" v-if="step == 3" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="4">
                            <v-card class="mb-5">
                                <work-experience-component :workExperienceErrors="stepWorkExperienceErrorsArray" v-if="step == 4" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="5">
                            <v-card class="mb-5">
                                <skills-component :skillErrors="stepSkillErrorsArray" v-if="step == 5" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="6">
                            <v-card class="mb-5">
                                <file-uploads-component :fileUploadErrors="stepFileUploadErrorsArray" v-if="step == 6" />
                            </v-card>
                        </v-stepper-content>

                        <!-- <v-stepper-content :step="7">
                            <v-card class="mb-5">
                                <h2>Other</h2>
                            </v-card>
                        </v-stepper-content> -->
                    </v-stepper-items>

                    <v-card-actions class="justify-center">
                        <v-btn
                            color="primary"
                            @click.stop="moveOneStepBackward"
                        >
                            <v-icon>keyboard_arrow_left</v-icon> Previous
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click.stop="moveOneStepForward"
                        >
                            Next <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-layout justify-center>
                        <!-- <v-btn class="success" :loading="loadingUpdateResume || loadingUploadFiles" :disabled="errors && errors.items && errors.items.length > 0" @click="updateResume">Update</v-btn> -->
                        <v-btn class="success" :loading="loadingResume || loadingFiles" @click="updateResume">Update</v-btn>
                        <!-- <v-btn class="warning" @click="validateResume">Validate resume</v-btn> -->
                    </v-layout>          
                </v-stepper>
            </v-flex>
        </v-layout>

        <!-- Modal to update resume -->
        <v-dialog
            v-model="updatingResumeDialog"
            width="500"
            persistent
        >
            <v-layout>
                <v-flex xs12> 
                    <v-card light>
                        <v-card-title
                            class="headline justify-center primary white--text"
                            primary-title
                        >
                            Updating resume
                        </v-card-title>

                        <v-card-text style="min-height: 280px;" class="align-center">
                            <br /><br /><br />
                            <v-alert
                                :value="loadingFiles"
                                color="secondary"
                                outline
                            >
                                <div class="text-xs-center" >
                                    <v-progress-circular indeterminate color="secondary"></v-progress-circular> Uploading files...
                                </div>
                            </v-alert>
                            <v-alert
                                :value="loadingResume"
                                color="primary"
                                outline
                            >
                                <div class="text-xs-center">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular> Updating resume...
                                </div>
                            </v-alert>
                            <br /><br /><br />
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
    </div>
</template>

<script>
	// import axios from 'axios'
    // import Noty from 'vuejs-noty'
    // import 'vuejs-noty/dist/vuejs-noty.css'
    // import 'css/noty.css'

    import templateComponent from '~/components/resume/TemplateComponent'
    import personalDataComponent from '~/components/resume/PersonalDataComponent'
    import educationComponent from '~/components/resume/EducationComponent'
    import workExperienceComponent from '~/components/resume/WorkExperienceComponent'
    import skillsComponent from '~/components/resume/SkillsComponent'
    import fileUploadsComponent from '~/components/resume/FileUploadsComponent'
    import Noty from 'noty'

	export default {
        inject: ['$validator'], // inject parent validator
        components: { templateComponent, personalDataComponent, educationComponent, workExperienceComponent, skillsComponent, fileUploadsComponent },
        layout: 'layoutBack',
        middleware: [],
        async created () {
            console.log('Created from EditResumeComponent')
            const resume = this.$route.params.slug
            console.log('resume: ', resume)
            this.resumeSlug = resume
            this.$store.commit('clearError')
            this.$store.commit('setLoadingFiles', false)
            this.$store.commit('setLoadingResume', false)

            if (this.$store.getters['countries/loadedCountries'].length < 1) {
                console.log('Fetching countries...')
                await this.$store.dispatch('countries/fetchCountries')
            }
            // if (this.$store.getters['languages/loadedLanguages'].length < 1) {
                await this.$store.dispatch('languages/fetchLanguages')
            // }
            // if (this.$store.getters['competences/loadedCompetences'].length < 1) {
                await this.$store.dispatch('competences/fetchCompetences')
            // }
            // if (this.$store.getters['socialNetworks/loadedSocialNetworks'].length < 1) {
                await this.$store.dispatch('socialNetworks/fetchSocialNetworks')
            // }
        },
        async mounted () {
        },
		data () {
			return {
                step: 1,
                // steps: [
                //     {
                //         id: 1,
                //         name: 'Choose Template',
                //         slug: 'template',
                //     },
                //     {
                //         id: 2,
                //         name: 'General & Personal Data',
                //         slug: 'personal_data'
                //     },
                //     {
                //         id: 3,
                //         name: 'Education',
                //         slug: 'education'
                //     },
                //     {
                //         id: 4,
                //         name: 'Skills',
                //         slug: 'skills'
                //     },
                //     {
                //         id: 5,
                //         name: 'Work Experience',
                //         slug: 'work_experience'
                //     }  
                // ],
                resumeSlug: '',
                // loadingUpdateResume: false,
                // loadingUploadFiles: false,
                updatingResumeDialog: false,
                stepPersonalDataErrors: false,
                stepEducationErrorsArray: [],
                stepWorkExperienceErrorsArray: [],
                stepSkillErrorsArray: [],
                stepFileUploadErrorsArray: []
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading']
            },
            errors () {
                return this.$store.getters['errors']
            },
            loadedUserResume () {
                return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
            },
            loadingResume () {
                return this.$store.getters['loadingResume']
            },
            loadingFiles () {
                return this.$store.getters['loadingFiles']
            }
		},
        methods: {
            // stepPersonalDataValidate () {
            //     return true
            // },
            // stepEducationValidate () {
            //     return true
            // },
            // stepWorkExperienceValidate () {
            //     return true
            // },
            // stepSkillsValidate () {
            //     return true
            // },
            // onInput (val) {
            //     this.steps = parseInt(val)
            // },
            moveOneStepForward () {
                if (this.step < 7) {
                    this.step += 1
                } else {
                    this.step = 1
                }
            },
            moveOneStepBackward () {
                if (this.step != 1) {
                    this.step -= 1
                } else {
                    this.step = 7
                }
            },
            async updateResume () {
                try {
                    this.updatingResumeDialog = true
                    await this.$validator.validateAll()
                    if (this.errors && this.errors.items && this.errors.items.length > 0) { // Display errors in red in components
                        const inputs = ['slug', 'job_title', 'job_description', 'firstname', 'lastname', 'email']
                        if (this.errors.items.some(e => inputs.includes(e.field))) {
                            console.log('Personal data errors')
                            this.stepPersonalDataErrors = true
                        }

                        const educationErrors = this.errors.items.filter(item => item.field.includes('education'))
                        if (educationErrors.length > 0) {
                            this.stepEducationErrorsArray = new Array(this.loadedUserResume.education.length)
                            educationErrors.forEach(error => {
                                const number = error.field.match(/\d+/g)
                                if (number && number.length > 0) {
                                    console.log(parseInt(number[0]))
                                    this.stepEducationErrorsArray.splice(parseInt(number[0]), 1, true)
                                }
                            })
                        }

                        const workExperienceErrors = this.errors.items.filter(item => item.field.includes('work_experience'))
                        if (workExperienceErrors.length > 0) {
                            this.stepWorkExperienceErrorsArray = new Array(this.loadedUserResume.work_experience.length)
                            workExperienceErrors.forEach(error => {
                                const number = error.field.match(/\d+/g)
                                if (number && number.length > 0) {
                                    console.log(parseInt(number[0]))
                                    this.stepWorkExperienceErrorsArray.splice(parseInt(number[0]), 1, true)
                                }
                            })
                        }

                        const skillErrors = this.errors.items.filter(item => item.field.includes('skill'))
                        if (skillErrors.length > 0) {
                            this.stepSkillErrorsArray = new Array(this.loadedUserResume.skills.length)
                            skillErrors.forEach(error => {
                                const number = error.field.match(/\d+/g)
                                if (number && number.length > 0) {
                                    console.log(parseInt(number[0]))
                                    this.stepSkillErrorsArray.splice(parseInt(number[0]), 1, true)
                                }
                            })
                        }

                        const fileUploadErrors = this.errors.items.filter(item => item.field.includes('file_title'))
                        if (fileUploadErrors.length > 0) {
                            this.stepFileUploadErrorsArray = new Array(this.loadedUserResume.uploads.length)
                            fileUploadErrors.forEach(error => {
                                const number = error.field.match(/\d+/g)
                                if (number && number.length > 0) {
                                    console.log(parseInt(number[0]))
                                    this.stepFileUploadErrorsArray.splice(parseInt(number[0]), 1, true)
                                }
                            })
                        }

                        this.updatingResumeDialog = false
                        new Noty({
                            type: 'error',
                            text: 'Please check validation errors.',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                    } else {
                        await this.$store.dispatch('resumes/updateResume', this.loadedUserResume)
                        this.updatingResumeDialog = false
                        new Noty({
                            type: 'success',
                            text: 'Your resume was updated successfully!',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                        this.$router.push('/candidate/resumes')
                    }
                } catch (error) {
                    this.updatingResumeDialog = false
                    this.$store.commit('setLoadingFiles', false, { root: true })
                    this.$store.commit('setLoadingResume', false, { root: true })

                    console.log('error from catch block: ', error)
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and your resume could not be updated.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                    Object.entries(error).forEach(([key, value]) => {
                        if (key === 'server_error' || key === 'new_slug' || key === 'not_enough_space') {
                            console.log('key: ', key)
                            console.log('value: ', value)
                            const field = key.substr(key.indexOf('.') + 1)

                            if (key !== 'server_error' && key !== 'not_enough_space') {
                                this.$validator.errors.add({
                                    field: field,
                                    msg: value,
                                })
                            }

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
                        }
                    })
                }
            },
            async updateResume2 () {
                try {
                    console.log('this.loadedUserResume: ', this.loadedUserResume)
                    this.updatingResumeDialog = true
                    this.loadingResume = true
                    const updateResume = await this.$store.dispatch('resumes/updateResume', this.loadedUserResume)
                    this.updatingResumeDialog = false
                    this.loadingResume = false
                    console.log('updateResume: ', updateResume)
                    
                    new Noty({
                        type: 'success',
                        text: 'Your resume was updated successfully!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                    this.$router.push('/candidate/resumes')
                } catch (error) {
                    // console.log('error updateResume: ', error)
                    this.updatingResumeDialog = false
                    this.loadingResume = false
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and your resume could not be updated.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                }
            },
            validateResume () {
                 this.$validator.validateAll()
            }
        },
        watch: {
            steps (val) {
                if (this.e1 > val) {
                    this.e1 = val
                }
            }
        }
	}

</script>

<style scoped>
    .active {
        border: 2px solid #FFC107;
    }
</style>