<template>
    <v-layout row wrap>
        <h2 class="text-xs-center">Edit your resume</h2>
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
                            step: {{ step }}<br /><br />
                            loadedUserResume: {{ loadedUserResume }}<br /><br />
                            <!-- resumeSlug: {{ resumeSlug }}<br /><br /> -->
                        </p>
                        <!-- <template-component v-if="step.id === 1" :resume-slug="loadedUserResume ? loadedUserResume.slug : null" /> -->
                        <template-component v-if="step.id === 1" />
                        <!-- <personal-data-component v-if="step.id === 2" :resume-slug="loadedUserResume ? loadedUserResume.slug : null" :personal-data="loadedUserResume ? loadedUserResume.personal_data : null" /> -->
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
                    <v-layout justify-center>
                        <v-btn color="success" @click="updateResume" :loading="loading">Update</v-btn>
                    </v-layout>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-layout>
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
        layout: 'layoutBack',
        middleware: [],
        async created () {
            console.log('Created from EditResumeComponent')
            const resume = this.$route.params.slug
            console.log('resume: ', resume)
            this.resumeSlug = resume
            await this.$store.dispatch('resumes/fetchUserResumes')
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
                ],
                resumeSlug: ''
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading']
            },
            loadedUserResume () {
                return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
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
            async updateResume () {
                try {
                    console.log('saveResume')
                    console.log(this.loadedUserResume)
                    // return response
                } catch (error) {
                    // console.log('error2: ', error.response.data.message)
                    console.log('error2: ', error.response)
                    this.$store.commit('setLoading', false)
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