<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <h2 class="text-xs-center">Create a new resume</h2>
            </v-flex>
            <!-- error: {{ error }}<br /> -->
            <!-- step: {{ step }}<br /> -->
            loadedUserResumes: {{ loadedUserResumes }}<br /><br />
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- loadedNewResume.uploads: {{ loadedNewResume.uploads }}<br /><br /> -->
            <!-- loadedNewResume.personal_data.picture: {{ loadedNewResume.personal_data.picture ? loadedNewResume.personal_data.picture.size : null }}<br /><br /> -->
            errors: {{ errors }}<br /><br />
            <!-- loadedUser: {{ loadedUser }}<br /><br /> -->
            loadingCreateResume: {{ loadingCreateResume }}<br /><br />
            loadingUploadFiles: {{ loadingUploadFiles }}<br /><br />
            stepEducationErrorsArray: {{ stepEducationErrorsArray }}<br /><br />
            stepPersonalDataErrors: {{ stepPersonalDataErrors }}<br /><br />
        </v-layout>

        <v-layout row wrap align-center v-if="loadedUserResumes.length > 0">
            <v-flex xs12 sm4>
                <div class="text-xs-left">
                    Import data from existing resume:
                </div>
            </v-flex>
            <v-flex xs6 sm4>
                <!-- importResume: {{ importResume }}<br /> -->
                <v-select
                    label="Select resume"
                    :items="loadedUserResumes"
                    item-text="id"
                    :return-object="true"
                    :single-line="false"
                    color="secondary"
                    v-model="importResume"
                ></v-select>
            </v-flex>
            <v-flex xs6 sm4>
                <v-btn color="primary" @click="importDataFromResume">Import</v-btn>
            <!-- </div> -->
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs12>

            <!-- <v-btn color="primary" @click="validate">Validate</v-btn> -->
            <!-- <v-btn color="primary" @click="$validator.validateAll()">Validate</v-btn> -->

                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step :step="1" editable>Choose Template</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :step="2" editable v-if="stepPersonalDataErrors === false">General & Personal Data</v-stepper-step>
                        <v-stepper-step :step="2" editable :rules="[() => false]" v-else>General & Personal Data</v-stepper-step>

                        <v-divider></v-divider>

                        <!-- <v-stepper-step :rules="[stepEducationValidate2]" :step="3" editable>Education</v-stepper-step> -->
                        <!-- <v-stepper-step :step="3"><span :class="{ 'error2': hasError('education') }">Education</span></v-stepper-step> -->
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

                        <!-- <v-divider></v-divider> -->

                        <!-- <v-stepper-step :step="7" editable>Other</v-stepper-step> -->

                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content :step="1">
                            <v-card class="mb-5">
                                <template-component />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="2">
                            <v-card class="mb-5">
                                <personal-data-component v-if="step == 2" />
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content :step="3">
                            <v-card class="mb-5">
                                <!-- <education-component :educationErrors="[ true, false ]" /> -->
                                <!-- <education-component :educationErrors="stepError2.educationArray" /> -->
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

                        <v-stepper-content :step="7">
                            <v-card class="mb-5">
                                Other
                            </v-card>
                        </v-stepper-content>
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
                        <!-- <v-btn class="success" :loading="loadingCreateResume || loadingUploadFiles" :disabled="errors && errors.items && errors.items.length > 0" @click="saveResume">Save</v-btn> -->
                        <v-btn class="success" :loading="loadingCreateResume || loadingUploadFiles" @click="saveResume">Save</v-btn>
                    </v-layout>
                    <!--<v-layout justify-center>
                        <v-alert
                            :value="loadingCreateResume"
                            color="info"
                            outline
                        >
                            <v-progress-circular indeterminate color="info"></v-progress-circular> Create resume...
                        </v-alert>

                        <v-alert
                            :value="loadingUploadFiles"
                            color="secondary"
                            outline
                        >
                            <div class="text-xs-center">
                                <v-progress-circular indeterminate color="secondary"></v-progress-circular> Uploading files
                            </div>
                            <div v-for="(uploadedFile, index) of uploadedFiles" :key="index">
                                {{ uploadedFile.name }} - {{ uploadedFile.progress }}%
                            </div>
                        </v-alert>

                        <v-alert
                            :value="uploadedFiles.length > 0 && !loadingCreateResume && !loadingUploadFiles"
                            color="success"
                            outline
                        >
                            <h3 class="text-xs-center">New resume created!</h3>
                            <p class="text-xs-center">{{ uploadedFiles.length }} file(s) uploaded.</p>
                            <div v-for="(uploadedFile, index) of uploadedFiles" :key="index">
                                <a :href="uploadedFile.downloadUrl" target="_blank">{{ uploadedFile.name }}</a><br /><br />
                            </div>
                        </v-alert>
                    </v-layout>-->
                </v-stepper>
            </v-flex>
        </v-layout>

        <!-- Modal to create resume -->
        <v-dialog
            v-model="creatingResumeDialog"
            width="500"
            persistent
        >
            <v-card light>
                <v-card-title
                    class="headline primary white--text justify-center"
                    primary-title
                >
                    Create resume
                </v-card-title>

                <v-card-text>
                    <v-alert
                        :value="loadingCreateResume"
                        color="primary"
                        outline
                    >
                        <div class="text-xs-center">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular> Saving resume in database...
                        </div>
                    </v-alert>
                    <v-alert
                        :value="loadingUploadFiles"
                        color="secondary"
                        outline
                    >
                        <div class="text-xs-center">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular> Uploading files...
                        </div>
                    </v-alert>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	import templateComponent from '~/components/resume/TemplateComponent'
    import personalDataComponent from '~/components/resume/PersonalDataComponent'
    import educationComponent from '~/components/resume/EducationComponent'
    import workExperienceComponent from '~/components/resume/WorkExperienceComponent'
    import skillsComponent from '~/components/resume/SkillsComponent'
    import fileUploadsComponent from '~/components/resume/FileUploadsComponent'
    import axios from 'axios'
    import Noty from 'noty'
    import { firestore, storage } from '~/plugins/firebase-client-init'
    import moment from 'moment'
	export default {
        inject: ['$validator'], // inject parent validator
        components: { templateComponent, personalDataComponent, educationComponent, workExperienceComponent, skillsComponent, fileUploadsComponent },
        layout: 'layoutBack',
        async created () {
            // console.log('System: ', Navigator.appversion)
            // this.$store.dispatch('index/fetchCandidateLongResume', this.candidateId = null)
            this.$store.commit('setLoading', false)
            this.$store.commit('clearError')
            await this.$store.commit('resumes/setEmptyResume')
            // const snapshot2 = await firestore.collection('users').doc('OlxfESwPtlgzz4vcjiL4YKsIDZI2').collection('private').doc('OlxfESwPtlgzz4vcjiL4YKsIDZI2').get()
            // const snapshot2 = await firestore.collection('users').doc('OlxfESwPtlgzz4vcjiL4YKsIDZI2').collection('private').getDocuments()
            // console.log('snapshot2: ', snapshot2)
            // console.log('snapshot2.data(): ', snapshot2.data())
            // this.errors.items = []
            if (!this.$store.getters['countries/loadedCountries']) {
                // console.log('Fetching countries...')
                await this.$store.dispatch('countries/fetchCountries')
            }
            if (!this.$store.getters['languages/loadedLanguages']) {
                await this.$store.dispatch('languages/fetchLanguages')
            }
            if (!this.$store.getters['competences/loadedCompetences']) {
                await this.$store.dispatch('competences/fetchCompetences')
            }
        },
        mounted () {
            // this.$validator.reset()
            this.errors.clear();
            this.$store.commit('setLoadingFiles', false, { root: true })
            this.$store.commit('setLoadingResume', false, { root: true })
        },
		data () {
			return {
                step: 1,
                uploadedFiles: [],
                creatingResumeDialog: false,
                importResume: {},
                stepError2: {
                    educationArray: [true, false]
                },
                // hasError: true
                // stepEducationErrors: false,
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
            // error () {
            //     return this.$store.getters['error']
            // },
            errors () {
                return this.$store.getters['errors']
            },
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
            // loadedUserResume () {
            //     return this.$store.getters['resumes/loadedUserResume']
            // },
            loadedUserResumes () {
                return this.$store.getters['resumes/loadedUserResumes'] 
            },
            loadedNewResume () {
            	return this.$store.getters['resumes/loadedNewResume']
            },
            loadingCreateResume () {
                return this.$store.getters['loadingResume']
            },
            loadingUploadFiles () {
                return this.$store.getters['loadingFiles']
            },
            // hasError () {
            //     return true
            // },
		},
		methods: {
            hasError (step) {
                console.log('Call to hasError: ', step)
                // if (this.errors.items && this.errors.items.length > 0) {
                //     console.log('There are some errors!')
                //     if (this.errors.items.filter(item => item.field.includes(step))) {
                //         console.log('There is an error in education step!')
                //         return true
                //     }
                //     return false
                // }
                // return false
            },
            stepPersonalDataValidate () {
                console.log('call to stepPersonalDataValidate')
                // if (this.errors.items.some(e => e.field === ('job_title')) ||
                //     this.errors.items.some(e => e.field === 'slug')
                // ) {
                //     return false
                // }
                // return true
                const inputs = ['slug', 'job_title', 'job_description', 'firstname', 'lastname', 'email']
                // if (this.errorsArray.some(e => inputs.includes(e))) {
                if (this.errors && this.errors.items && this.errors.items.some(e => inputs.includes(e.field))) {
                    return false
                }
                return true
            },
            stepEducationValidate () {
                // console.log('stepEducationValidate: ', this.errors)
                // this.stepError2.educationArray.length = 0
                // if (this.errors && this.errors.items && this.errors.items.length > 0) {
                //     const abc = this.errors.items.filter(item => item.field.includes('education'))
                //     if (abc.length > 0) {
                //         console.log('stepEducation error!')
                //         console.log('abc: ', abc)
                //         // console.log(abc.map(a => a.field.match(/\d+/g)))
                //         abc.forEach(a => {
                //             this.stepError.educationArray[a.field.match(/\d+/g)] = true
                            
                //         })
                //         return false
                //     }
                // }
                // return true
            },
            stepEducationValidate2 (value) {
                console.log('Call to stepEducationValidate2')
                if (value) {
                    return false
                }
                return true
            },
            stepWorkExperienceValidate () {
                return true
            },
            stepSkillsValidate () {
                return true
            },
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
            importDataFromResume () {
                console.log('importDataFromResume')
                this.$store.commit('resumes/setNewResume', this.importResume)
            },
			onInput (val) {
                this.steps = parseInt(val)
            },
            async saveResume () {
                try {
                    console.log('saveResume')
                    // console.log('this.loadedNewResume: ', this.loadedNewResume)

                    // const userExistingUploads = this.$store.getters['resumes/loadedUserResumes']
                    // const userExistingUploads = [{ slug: 'jeanquark', uploads: [{ name: 'abc', size_in_bytes: 100}, {name: 'def', size_in_bytes: 200}]}, { slug: 'jeanquark2', uploads: [{ name: 'ghi', size_in_bytes: 300}, { name: 'jkl', size_in_bytes: 400}]}]
                    // console.log('userExistingUploads: ', userExistingUploads)
                    // let sum = 0
                    // userExistingUploads.forEach(resume => {
                    //     resume.uploads.forEach(upload => {
                    //         sum += upload.size_in_bytes
                    //     })
                    // })
                    // console.log('sum: ', sum)
                    // return

                    this.creatingResumeDialog = true
                    // this.loadingCreateResume = true
                    // this.$store.commit('setLoadingFiles', true, { root: true })
                    await this.$validator.validateAll()
                    if (this.errors && this.errors.items && this.errors.items.length > 0) { // Display errors in red in components
                        const inputs = ['slug', 'job_title', 'job_description', 'firstname', 'lastname', 'email']
                        if (this.errors.items.some(e => inputs.includes(e.field))) {
                            console.log('Personal data errors')
                            this.stepPersonalDataErrors = true
                        }

                        const educationErrors = this.errors.items.filter(item => item.field.includes('education'))
                        if (educationErrors.length > 0) {
                            this.stepEducationErrorsArray = new Array(this.loadedNewResume.education.length)
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
                            this.stepWorkExperienceErrorsArray = new Array(this.loadedNewResume.work_experience.length)
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
                            this.stepSkillErrorsArray = new Array(this.loadedNewResume.skills.length)
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
                            this.stepFileUploadErrorsArray = new Array(this.loadedNewResume.uploads.length)
                            fileUploadErrors.forEach(error => {
                                const number = error.field.match(/\d+/g)
                                if (number && number.length > 0) {
                                    console.log(parseInt(number[0]))
                                    this.stepFileUploadErrorsArray.splice(parseInt(number[0]), 1, true)
                                }
                            })
                        }

                        this.creatingResumeDialog = false
                        // this.loadingCreateResume = false
                        new Noty({
                            type: 'error',
                            text: 'Please check validation errors.',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                    } else {
                        // this.$store.commit('setLoadingResume', true, { root: true })
                        await this.$store.dispatch('resumes/storeResume', this.loadedNewResume)
                        // this.$store.commit('setLoadingFiles', false, { root: true })
                        // this.$router.push('/candidate/resumes')
                        this.creatingResumeDialog = false
                        new Noty({
                            type: 'success',
                            text: 'Your resume was created successfully.',
                            timeout: 5000,
                            theme: 'metroui'
                        }).show()
                    }
                } catch (error) {
                    this.creatingResumeDialog = false
                    this.$store.commit('setLoadingFiles', false, { root: true })
                    this.$store.commit('setLoadingResume', false, { root: true })

                    console.log('error from catch block: ', error)
                    new Noty({
                        type: 'error',
                        text: 'Sorry, an error occured and your resume could not be created.',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                    Object.entries(error).forEach(([key, value]) => {
                        if (key === 'server_error' || key === 'slug' || key === 'not_enough_space') {
                            console.log('key: ', key)
                            console.log('value: ', value)
                            const field = key.substr(key.indexOf('.') + 1)

                            this.$validator.errors.add({
                                field: field,
                                msg: value,
                            })

                            new Noty({
                                type: 'warning',
                                text: value,
                                timeout: 8000,
                                theme: 'metroui'
                            }).show()
                        }
                        // } else {

                        // }
                    })
                    // if (error.response && error.response.data && error.response.data.error) {
                    //     new Noty({
                    //         type: 'error',
                    //         text: 'Your resume could not be updated.',
                    //         timeout: 5000,
                    //         theme: 'metroui'
                    //     }).show()

                    //     Object.entries(error.response.data.error).forEach(([key, value]) => {
                    //         if (key !== 'filesToDelete') {
                    //             console.log('key: ', key)
                    //             console.log('value: ', value)
                    //             const field = key.substr(key.indexOf('.') + 1)

                    //             this.$validator.errors.add({
                    //                 field: field,
                    //                 msg: value,
                    //             })

                    //             new Noty({
                    //                 type: 'warning',
                    //                 text: value,
                    //                 timeout: 8000,
                    //                 theme: 'metroui'
                    //             }).show()
                    //         }
                    //     })
                    // } else {
                    //     new Noty({
                    //         type: 'error',
                    //         text: 'Sorry, an error occured and your resume could not be updated.',
                    //         timeout: 8000,
                    //         theme: 'metroui'
                    //     }).show()
                    // }
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
        /* color: green; */
    }
    /* .theme--dark.v-stepper .v-stepper__step__step {
        color: green !important;
    } */

    /* .abc > .v-stepper__label {
        color: red;
    } */
    .error2 {
        color: var(--v-error-base);
        text-shadow: none;
    }
</style>