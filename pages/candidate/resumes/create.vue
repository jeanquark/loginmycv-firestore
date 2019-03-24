<template>
    <div>
        <v-layout row wrap>
            <h2 class="text-xs-center">Create a new resume</h2>
            <!-- error: {{ error }}<br /> -->
            step: {{ step }}<br />
            loadedUserResume: {{ loadedUserResume }}<br /><br />
            loadedNewResume: {{ loadedNewResume }}<br /><br />
            errors: {{ errors }}<br /><br />
        </v-layout>
        <v-layout row>
            <v-flex xs12>
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step step="1" editable>Choose Template</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :rules="[stepPersonalDataValidate]" step="2" editable>General & Personal Data</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :rules="[stepEducationValidate]" step="3" editable>Education</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :rules="[stepSkillsValidate]" step="4" editable>Skills</v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card style="margin-bottom: 30px;">
                            <template-component :edit="true" />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card style="margin-bottom: 30px;">
                            <personal-data-component />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card style="margin-bottom: 30px;">
                            <education-component />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-card style="margin-bottom: 30px;">
                            <skills-component />
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
                	<v-btn class="success" :loading="loading" :disabled="errors.items.length > 0" @click="saveResume">Save</v-btn>
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
    import Noty from 'noty'
	export default {
        components: { templateComponent, personalDataComponent, educationComponent, skillsComponent },
        layout: 'layoutBack',
        async created () {
            // console.log('System: ', Navigator.appversion)
            // this.$store.dispatch('index/fetchCandidateLongResume', this.candidateId = null)
            this.$store.commit('setLoading', false)
            this.$store.commit('clearError')
            await this.$store.commit('resumes/setEmptyResume')
        },
		data () {
			return {
                step: 1
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading']
            },
            error () {
                return this.$store.getters['error']
            },
            loadedUserResume () {
                return this.$store.getters['resumes/loadedUserResume']
            },
            loadedNewResume () {
            	return this.$store.getters['resumes/loadedNewResume']
            }
		},
		methods: {
            stepPersonalDataValidate () {
                // console.log('stepPersonalDataError')
                if (this.error && (
                        this.error.firstname || 
                        this.error.lastname || 
                        this.error.email ||
                        this.error.job_title ||
                        this.error.job_description)
                    ){
                    return false
                }
                return true
            },
            stepEducationValidate () {
                if (this.error && (
                    this.error.education_1_name || 
                    this.error.education_1_description || 
                    this.error.education_1_location ||
                    this.error.education_2_name || 
                    this.error.education_2_description || 
                    this.error.education_2_location ||
                    this.error.education_3_name || 
                    this.error.education_3_description || 
                    this.error.education_3_location ||
                    this.error.education_4_name || 
                    this.error.education_4_description || 
                    this.error.education_4_location ||
                    this.error.education_5_name || 
                    this.error.education_5_description || 
                    this.error.education_5_location)
                ){
                    return false
                }
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
                // await this.$validator.validateAll()
                // if (!this.errors.any()) {
                //     console.log('OK, save!')
                //     // this.$store.dispatch('resumes/storeNewResume', this.loadedNewResume)
                // }
                if (
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
                }
            },
            async saveResume2 () {
                try {
                    console.log('saveResume')
                    this.$store.commit('index/setLoading', true)
                    const candidateLongResume = this.candidateLongResume
                    console.log('candidateLongResume: ', candidateLongResume)

                    let newCandidateLongResume = {
                        template_id: candidateLongResume.template_id,
                        firstname: candidateLongResume.firstname,
                        lastname: candidateLongResume.lastname,
                        email: candidateLongResume.email,
                        phone: candidateLongResume.phone,
                        website: candidateLongResume.website,
                        image: candidateLongResume.image_new,
                        job_title: candidateLongResume.job_title,
                        job_description: candidateLongResume.job_description,
                    }

                    // Add new Profile picture
                    if (candidateLongResume.image) {
                        newCandidateLongResume.image = candidateLongResume.image
                    }

                    // Parse Education Data
                    // for (let i = 1; i <= 5; i++) {
                    candidateLongResume.education.forEach((element, index) => {
                        newCandidateLongResume[`education_${index + 1}_title`] = element.title
                        newCandidateLongResume[`education_${index + 1}_name`] = element.name
                        newCandidateLongResume[`education_${index + 1}_description`] = element.description
                        newCandidateLongResume[`education_${index + 1}_location`] = element.location
                        newCandidateLongResume[`education_${index + 1}_duration`] = element.duration
                        newCandidateLongResume[`education_${index + 1}_graduation_date`] = element.graduation_date
                    })
                    
                    // Parse Skills Data
                    candidateLongResume.skills.forEach((element, index) => {
                        console.log('element: ', element)
                        newCandidateLongResume[`skill_${index + 1}_category_name`] = element.name
                        newCandidateLongResume[`skill_${index + 1}_category_slug`] = element.slug
                        element.children.forEach((subElement, subIndex) => {
                            console.log('subelement: ', subElement)
                            newCandidateLongResume[`skill_${index + 1}_child_${subIndex + 1}_name`] = subElement.name
                            newCandidateLongResume[`skill_${index + 1}_child_${subIndex + 1}_slug`] = subElement.slug
                            newCandidateLongResume[`skill_${index + 1}_child_${subIndex + 1}_value`] = subElement.value
                        })
                    })

                    console.log('newCandidateLongResume: ', newCandidateLongResume)

                    // return

                    // for (let i = 1; i <= 5; i++) {
                    //     if (response.data[`skill_${i}_category_name`]) {
                    //         abc.skills.push({
                    //             'name': response.data[`skill_${i}_category_name`],
                    //             'slug': response.data[`skill_${i}_category_slug`],
                    //             'children': []
                    //         })
                    //         for (let j = 1; j <= 5; j++) {    
                    //             if (response.data[`skill_${i}_child_${j}_name`]) {
                    //                 // console.log('i: ', i)
                    //                 abc.skills[i - 1]['children'].push({
                    //                     'name': response.data[`skill_${i}_child_${j}_name`],
                    //                     'slug': response.data[`skill_${i}_child_${j}_slug`],
                    //                     'value': response.data[`skill_${i}_child_${j}_value`],
                    //                 })
                    //             }
                    //         }
                    //     }
                    // }

                    const response = await axios.post('/resume-long', newCandidateLongResume)
                    console.log('response.data: ', response.data)
                    // this.$store.commit('index/setLoading', false)
                    // this.$noty.success('Your resume has been successfully created!')
                    window.location.href = '/candidate'
                    // return response
                } catch (error) {
                    // console.log('error2: ', error.response.data.message)
                    console.log('error2: ', error.response)
                    // new Noty({type: 'success', text: 'Password successfully updated. Use your new credentials for the next login'}).show()
                    this.$store.commit('index/setLoading', false)
                    this.$store.commit('index/setError', error.response.data.errors)
                    this.$noty.error('We\'re sorry, an error occured and your resume could not be updated')
                    throw error
                }
            }
		},
        watch: {
        }
	}
</script>

<style scoped>
	.active {
        border: 2px solid #FFC107;
    }
</style>