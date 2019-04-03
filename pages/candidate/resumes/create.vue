<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <h2 class="text-xs-center">Create a new resume</h2>
            </v-flex>
            <!-- error: {{ error }}<br /> -->
            <!-- step: {{ step }}<br /> -->
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            loadedNewResume: {{ loadedNewResume }}<br /><br />
            errors: {{ errors }}<br /><br />
            loadedNewResume.uploads: {{ loadedNewResume.uploads }}<br /><br />
        </v-layout>
        <v-layout row>
            <v-flex xs12>

<v-btn color="primary" @click="validate('step-1')">Validate</v-btn>

            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step step="1" editable>Choose Template</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :rules="[() => false]" step="2" editable>General & Personal Data</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :rules="[stepEducationValidate]" step="3" editable>Education</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4" editable>Work experience</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :rules="[stepSkillsValidate]" step="5" editable>Skills</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="6" editable>Files upload</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="7" editable>Other</v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card style="margin-bottom: 30px;">
                            <template-component :edit="true" />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card style="margin-bottom: 30px;">
                            <personal-data-component :slug-already-in-use="slugAlreadyInUse" />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card style="margin-bottom: 30px;">
                            <education-component />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-card style="margin-bottom: 30px;">
                            Work experience
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="5">
                        <v-card style="margin-bottom: 30px;">
                            <skills-component />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="6">
                        <v-card style="margin-bottom: 30px;">
                            <file-uploads-component />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="7">
                        <v-card style="margin-bottom: 30px;">
                            Other
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
                
                <v-card-actions class="justify-center">
                    <v-btn
                        color="primary"
                        @click.stop="step -= 1"
                    >
                        <v-icon>keyboard_arrow_left</v-icon> Previous
                    </v-btn>
                    <v-btn
                        color="primary"
                        @click.stop="step += 1"
                    >
                        Next <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-layout justify-center>
                	<v-btn class="success" :loading="loadingCreateResume || loadingUploadFiles" :disabled="errors.items.length > 0" @click="saveResume">Save</v-btn>
                </v-layout>
                <v-layout justify-center>
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
                </v-layout>
            </v-stepper>
        </v-flex>
        </v-layout>
    </div>
</template>

<script>
	import templateComponent from '~/components/resume/TemplateComponent'
    import personalDataComponent from '~/components/resume/PersonalDataComponent'
    import educationComponent from '~/components/resume/EducationComponent'
    import skillsComponent from '~/components/resume/SkillsComponent'
    import fileUploadsComponent from '~/components/resume/FileUploadsComponent'
    import axios from 'axios'
    import Noty from 'noty'
    import { firestore, storage } from '~/plugins/firebase-client-init'
	export default {
        components: { templateComponent, personalDataComponent, educationComponent, skillsComponent, fileUploadsComponent },
        layout: 'layoutBack',
        async created () {
            // console.log('System: ', Navigator.appversion)
            // this.$store.dispatch('index/fetchCandidateLongResume', this.candidateId = null)
            this.$store.commit('setLoading', false)
            this.$store.commit('clearError')
            await this.$store.commit('resumes/setEmptyResume')
            const snapshot2 = await firestore.collection('users').doc('OlxfESwPtlgzz4vcjiL4YKsIDZI2').collection('private').doc('OlxfESwPtlgzz4vcjiL4YKsIDZI2').get()
            // const snapshot2 = await firestore.collection('users').doc('OlxfESwPtlgzz4vcjiL4YKsIDZI2').collection('private').getDocuments()
            console.log('snapshot2: ', snapshot2)
            console.log('snapshot2.data(): ', snapshot2.data())

        },
		data () {
			return {
                step: 1,
                loadingCreateResume: false,
                loadingUploadFiles: false,
                uploadedFiles: [],
                slugAlreadyInUse: false
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading']
            },
            error () {
                return this.$store.getters['error']
            },
            errors () {
                return this.$store.getters['errors']
            },
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
            loadedUserResume () {
                return this.$store.getters['resumes/loadedUserResume']
            },
            loadedNewResume () {
            	return this.$store.getters['resumes/loadedNewResume']
            }
		},
		methods: {
            validate (scope) {
                console.log('validate')
                this.$validator.validateAll(scope)
            },
            stepPersonalDataValidate () {
                // console.log('stepPersonalDataError')
                // if (this.error && (
                //         this.error.firstname || 
                //         this.error.lastname || 
                //         this.error.email ||
                //         this.error.job_title ||
                //         this.error.job_description)
                //     ){
                //     return false
                // }
                return true
            },
            stepEducationValidate () {
                // if (this.error && (
                //     this.error.education_1_name || 
                //     this.error.education_1_description || 
                //     this.error.education_1_location ||
                //     this.error.education_2_name || 
                //     this.error.education_2_description || 
                //     this.error.education_2_location ||
                //     this.error.education_3_name || 
                //     this.error.education_3_description || 
                //     this.error.education_3_location ||
                //     this.error.education_4_name || 
                //     this.error.education_4_description || 
                //     this.error.education_4_location ||
                //     this.error.education_5_name || 
                //     this.error.education_5_description || 
                //     this.error.education_5_location)
                // ){
                //     return false
                // }
                return true
            },
            stepSkillsValidate () {
                return true
            },
			onInput (val) {
                this.steps = parseInt(val)
            },
            async saveResume () {
            	console.log('saveResume')
                console.log('this.loadedNewResume: ', this.loadedNewResume)
                // Perform vee-validate check
                

                if ( // Client-side validation
                    !this.loadedNewResume.template_id || 
                    !this.loadedNewResume.slug ||
                    !this.loadedNewResume.job_title ||
                    !this.loadedNewResume.job_description ||
                    !this.loadedNewResume.personal_data.firstname ||
                    !this.loadedNewResume.personal_data.lastname ||
                    !this.loadedNewResume.personal_data.email
                ) {
                    console.log('Please complete all form entries')
                } else {
                    // Check for slug uniqueness
                    console.log('OK proceed to saveResume')
                    await this.$validator.validateAll()
                    if (!this.errors.any()) {
                        console.log('OK, save!')
                        this.loadedNewResume.user_id = this.loadedUser.id
                        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                        let formData = new FormData();
                        formData.append('data', JSON.stringify(this.loadedNewResume))
                        for (let fileUpload of this.loadedNewResume.uploads) {
                            // console.log('upload: ', upload)
                            formData.append('file', fileUpload)
                        }
                        this.loadingCreateResume = true
                        const createNewResume = await axios.post('/create-new-resume', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })
                        console.log('createNewResume: ', createNewResume)
                        const newResumeId = createNewResume.data.resume_long_id
                        if (newResumeId) {
                            // If return is valid, resume was saved to DB, there remains to save files in firebase storage
                            if (this.loadedNewResume.uploads.length > 0) {
                                // If files are to be uploaded
                                try {
                                    // const newResumeId = 'kJqSRstu8QyjKwEU77i5'
                                    this.loadingCreateResume = false
                                    // 1) Save files in storage
                                    const newPromise = new Promise((resolve, reject) => {
                                        this.loadingUploadFiles = true
                                        for (const [index, fileUpload] of this.loadedNewResume.uploads.entries()) {
                                            console.log('fileUpload: ', fileUpload)
                                            this.uploadedFiles.push({ name: fileUpload.name, progress: 0 })
                                            const storageFileRef = storage.ref('resumes').child(`${this.loadedUser.id}/${fileUpload.name}`)
                                            const uploadTask = storageFileRef.put(fileUpload)
                                            // Track down upload progress. Careful: callback function...
                                            const that = this
                                            uploadTask.on('state_changed', function (snapshot) {
                                                that.uploadedFiles[index]['progress'] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                                console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                                                that.uploadedFiles[index]['size'] = snapshot.totalBytes
                                            }, function (error) {
                                                console.log('upload error: ', error)
                                                reject()
                                            }, function () {
                                                console.log('success')
                                                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                                    // console.log('File available at', downloadURL)
                                                    that.uploadedFiles[index]['downloadUrl'] = downloadURL
                                                })
                                                resolve()
                                            })
                                        }
                                    }).then(() => {
                                        // 2) Save reference in firestore
                                        firestore.collection('resumes_long').doc(newResumeId).update({
                                            uploads: this.uploadedFiles
                                        })
                                    }).then(() => {
                                        // 3) Stop loader
                                        console.log('Done!')
                                        this.loadingUploadFiles = false
                                        new Noty({
                                            type: 'success',
                                            text: 'Your resume was successfully created.',
                                            timeout: 8000,
                                            theme: 'metroui'
                                        }).show()
                                    }).catch((error) => {
                                        console.log('error: ', error)
                                        this.loadingUploadFiles = false
                                        throw 'error'
                                    })

                                } catch (error) {
                                    console.log('error2: ', error)
                                    this.loadingUploadFiles = false
                                }
                            } else {
                                this.loadingCreateResume = false
                                new Noty({
                                    type: 'success',
                                    text: 'Your resume was successfully created.',
                                    timeout: 5000,
                                    theme: 'metroui'
                                }).show()
                            }
                        } else {
                            // An error occured on the server
                            this.loadingCreateResume = false
                            console.log('An error occured on the server: ')
                            new Noty({
                                type: 'error',
                                text: `${createNewResume.data.message}`,
                                timeout: 8000,
                                theme: 'metroui'
                            }).show()
                            console.log('createNewResume.data.error: ', createNewResume.data.error)
                            Object.entries(createNewResume.data.error).forEach(([key, value]) => {
                                new Noty({
                                    type: 'warning',
                                    text: value,
                                    timeout: 8000,
                                    theme: 'metroui'
                                }).show()
                            })
                        }
                    }
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