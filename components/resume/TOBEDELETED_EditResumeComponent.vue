<template>
    <div>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <template v-for="step in steps">
                    <v-stepper-step
                        :key="`${step.id}-header`"
                        :complete="e1 > step"
                        :step="step.id"
                        :editable="true"
                    >
                        {{ step.name }}
                    </v-stepper-step>
      
                    <v-divider
                        v-if="step.id !== steps.length"
                        :key="step.slug"
                    ></v-divider>
                </template>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content
                    v-for="step in steps"
                    :key="`${step.id}-content`"
                    :step="step.id"
                >
                    <v-card style="margin-bottom: 30px;">
                        <p>
                            <!-- candidateLongResume: {{ candidateLongResume }}<br /><br /> -->
                        </p>
                        <template-component v-if="step.id === 1" />
                        <personal-data-component v-if="step.id === 2" />
                        <education-component v-if="step.id === 3" />
                        <skills-component v-if="step.id === 4" />

                        <v-card-actions class="justify-center">
                            <v-btn
                                color="primary"
                                @click="previousStep(step.id)"
                            >
                                <v-icon>keyboard_arrow_left</v-icon> Previous
                            </v-btn>
                            <v-btn
                                color="primary"
                                @click="nextStep(step.id)"
                            >
                                Next <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-btn class="success" @click="saveResume" :loading="loading">Save</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
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
    import skillsComponent from '~/components/resume/SkillsComponent'
	export default {
        components: { templateComponent, personalDataComponent, educationComponent, skillsComponent },
        props: ['candidateId'],
        created () {
            // console.log('System: ', Navigator.appversion)
            console.log('Created from EditResumeComponent')
            // this.$store.dispatch('index/fetchLongResumes')
            // console.log('Props: ', this.candidateId)
            // console.log('props: ', this.candidateId)
            this.$store.dispatch('index/fetchCandidateLongResume', this.candidateId)
            this.$store.commit('index/setLoading', false)
            // this.$noty.info('Test message.')
        },
        mounted () {
            console.log('props: ', this.candidateId)
        },
		data () {
			return {
                e1: 1,
                steps: [
                    {
                        id: 1,
                        name: 'Choose Template',
                        slug: 'template',
                    },
                    {
                        id: 2,
                        name: 'General & Personal Data',
                        slug: 'personal_data'
                    },
                    {
                        id: 3,
                        name: 'Education',
                        slug: 'education'
                    },
                    {
                        id: 4,
                        name: 'Skills',
                        slug: 'skills'
                    },
                    {
                        id: 5,
                        name: 'Work Experience',
                        slug: 'work_experience'
                    }  
                ]
			}
		},
		computed: {
            loading () {
                return this.$store.getters['index/loading']
            },
            candidateLongResume () {
                return this.$store.getters['index/candidateLongResume']
            }
		},
        methods: {
            onInput (val) {
                this.steps = parseInt(val)
            },
            previousStep (n) {
                if (n === 1) {
                    this.e1 = this.steps.length
                } else {
                    this.e1 = n - 1
                }
            },
            nextStep (n) {
                if (n === this.steps.length) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
            },
            async saveResume () {
                try {
                    console.log('saveResume')
                    this.$store.commit('index/setLoading', true)
                    const candidateLongResume = this.candidateLongResume
                    console.log('candidateLongResume: ', candidateLongResume)

                    let updatedCandidateLongResume = {
                        firstname: candidateLongResume.firstname,
                        lastname: candidateLongResume.lastname,
                        email: candidateLongResume.email,
                        phone: candidateLongResume.phone,
                        website: candidateLongResume.website,
                        image: candidateLongResume.image,
                        job_title: candidateLongResume.job_title,
                        job_description: candidateLongResume.job_description,
                    }

                    // Add new Profile picture
                    if (candidateLongResume.image_new) {
                        updatedCandidateLongResume.image_new = candidateLongResume.image_new
                    }

                    // Parse Education Data
                    // for (let i = 1; i <= 5; i++) {
                    candidateLongResume.education.forEach((element, index) => {
                        updatedCandidateLongResume[`education_${index + 1}_name`] = element.name
                        updatedCandidateLongResume[`education_${index + 1}_description`] = element.description
                        updatedCandidateLongResume[`education_${index + 1}_location`] = element.location
                        updatedCandidateLongResume[`education_${index + 1}_duration`] = element.duration
                        updatedCandidateLongResume[`education_${index + 1}_graduation_date`] = element.graduation_date
                    })
                    
                    // Parse Skills Data
                    candidateLongResume.skills.forEach((element, index) => {
                        // console.log('element: ', element)
                        updatedCandidateLongResume[`skill_${index + 1}_category_name`] = element.name
                        updatedCandidateLongResume[`skill_${index + 1}_category_slug`] = element.slug
                        element.children.forEach((subElement, subIndex) => {
                            // console.log('subelement: ', subElement)
                            updatedCandidateLongResume[`skill_${index + 1}_child_${subIndex + 1}_name`] = subElement.name
                            updatedCandidateLongResume[`skill_${index + 1}_child_${subIndex + 1}_slug`] = subElement.slug
                            updatedCandidateLongResume[`skill_${index + 1}_child_${subIndex + 1}_value`] = subElement.value
                        })
                    })

                    console.log('updatedCandidateLongResume: ', updatedCandidateLongResume)

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

                    const response = await axios.patch('/resume-long/1', {updatedCandidateLongResume})
                    console.log('response.data: ', response.data)
                    this.$store.dispatch('index/fetchCandidateLongResume', this.candidateId)
                    // this.$store.commit('index/setLoading', false)
                    this.$noty.success('Your resume has been successfully updated!')
                    return response
                } catch (error) {
                    // console.log('error2: ', error.response.data.message)
                    console.log('error2: ', error.response)
                    this.$store.commit('index/setLoading', false)
                    // new Noty({type: 'success', text: 'Password successfully updated. Use your new credentials for the next login'}).show()
                    this.$noty.error('We\'re sorry, an error occured and your resume could not be updated')
                    throw error
                }
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