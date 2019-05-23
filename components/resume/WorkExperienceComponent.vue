<template>
    <div class="text-xs-center pa-4" style="margin-top: 0px;" v-if="userResume">
        <h2>Work Experience</h2>
        <v-layout row wrap class="pa-3" v-if="userResume">
            <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
                outline
                v-if="!userResume.work_experience.length > 0"
            >
                There is no item here, please click on the rounded pink button to add one
            </v-alert>
            <v-expansion-panel style="">
                <v-dialog
                    v-model="modalNewWorkExperience"
                    width="500"
                    activator
                >
                    <v-btn
                        fab
                        absolute
                        bottom
                        right
                        color="pink"
                        slot="activator"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                    <v-card>
                        <v-card-title
                            class="headline"
                            primary-title
                        >
                            <v-layout class="justify-center">
                                Add a new work experience entry
                            </v-layout>
                        </v-card-title>

                        <v-card-text>
                            <v-text-field
                                label="Company"
                                name="company_dialog"
                                placeholder="Google Inc."
                                v-model="newWorkExperience.company"
                                v-validate="{ max: 50 }"
                                :error-messages="errors ? errors.collect('company_dialog') : null"
                                data-vv-as="Company"
                                :counter="50"
                            ></v-text-field>
                            <v-text-field
                                label="Job title"
                                name="job_title_dialog"
                                placeholder="Sofware engineer"
                                v-model="newWorkExperience.job_title"
                                v-validate="{ max: 50 }"
                                :error-messages="errors ? errors.collect('job_title_dialog') : null"
                                data-vv-as="Job title"
                                :counter="50"
                            ></v-text-field>
                            <v-flex xs12>
                                <v-textarea
                                    label="Job description/responsibility"
                                    name="description_dialog"
                                    v-model="newWorkExperience.job_description"
                                    v-validate="{ max: 500 }"
                                    :error-messages="errors ? errors.collect('description_dialog') : null"
                                    data-vv-as="Description"
									:counter="500"
								></v-textarea>
							</v-flex>
                            <v-layout row>
                                <v-flex xs6 class="pr-2">
                                    <v-text-field
                                        label="City"
                                        name="city_dialog"
                                        placeholder="San Francisco CA"
                                        v-model="newWorkExperience.city"
                                        v-validate="{ max: 50 }"
                                        :error-messages="errors ? errors.collect('city_dialog') : null"
                                        data-vv-as="City"
                                        :counter="50"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-2">
                                    <v-text-field
                                        label="Country"
                                        name="country_dialog"
                                        placeholder="USA"
                                        v-model="newWorkExperience.country"
                                        v-validate="{ max: 50 }"
                                        :error-messages="errors ? errors.collect('country_dialog') : null"
                                        data-vv-as="Country"
                                        :counter="50"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs6>
                                    <v-dialog
                                        v-model="form.modalStartDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="300px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="newWorkExperience.start_date"
                                            label="Start date"
                                            prepend-icon="event"
                                            readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="form.startDate" :type="form.startDateType" color="primary" :scrollable="false">
                                            <v-layout justify-center>
                                                <v-btn flat color="error" @click="deleteNewStartDate">Remove</v-btn>
                                                <v-btn flat color="secondary" @click="form.modalStartDate = false">Cancel</v-btn>
                                                <v-btn flat color="success" @click="saveNewStartDate">OK</v-btn>
                                            </v-layout>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex xs6>
                                    <v-layout justify-center>
                                        <div>
                                            <v-radio-group v-model="form.startDateType" row>
                                                <v-radio label="Month" value="month" color="secondary"></v-radio>
                                                <v-radio label="Day" value="date" color="secondary"></v-radio>
                                            </v-radio-group>
                                        </div>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
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
                                            v-model="newWorkExperience.end_date"
                                            label="End date"
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
                            </v-layout>
                        </v-card-text>
                        <v-card-actions class="justify-center" style="padding-bottom: 20px;">
                            <v-btn class="success" @click="addNewWorkExperience(newWorkExperience)">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>



                <draggable v-model="candidateWorkExperience" group="experience" @start="drag=true" @end="drag=false" handle=".handle" style="width: 100%;">
                    <v-expansion-panel-content
                        v-for="(workExperience, index) in candidateWorkExperience"
                        :key="index"
                    >
                        <div slot="header">
                            <v-layout align-center>
                                <!-- <v-icon class="handle" style="cursor: move">drag_indicator</v-icon>&nbsp; -->
                                <v-btn style="cursor: move;" icon class="handle ml-0"><v-icon>drag_indicator</v-icon></v-btn>
                                <v-icon @click.native.stop="deleteItem(index)" class="mr-3">cancel</v-icon>
                                <!-- <v-icon style="color: #ff5252;" v-if="error && error.education_1_name">error</v-icon> -->
                                <span style="font-size: 1.5em;">{{ workExperience.company }}</span>
                                <!-- <v-btn small color="secondary">Order</v-btn> -->
                            </v-layout>         
                        </div>

                        <v-card style="margin-bottom: 30px; background: black;">
                            <v-card-text style="">
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 class="pa-3">
                                            <!-- v-validate="{ required: true, max: 50 }"
                                            :error-messages="errors ? errors.collect('company') : null"
                                            data-vv-as="Company" -->
                                        <v-text-field
                                            label="Company"
                                            name="company"
                                            v-model="candidateWorkExperience[index].company"
                                            :counter="50"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                            <!-- v-validate="{ required: true, max: 50 }"
                                            :error-messages="errors ? errors.collect('job_title') : null"
                                            data-vv-as="Job title" -->
                                        <v-text-field
                                            label="Job title"
                                            name="job_title"
                                            v-model="candidateWorkExperience[index].job_title"
                                            :counter="50"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 class="pa-3">
                                            <!-- v-validate="{ required: true, max: 50 }"
                                            :error-messages="errors ? errors.collect('description') : null"
                                            data-vv-as="Description" -->
                                        <v-textarea
                                            label="Job description/responsibility"
                                            name="description"
                                            v-model="candidateWorkExperience[index].job_description"
                                            :counter="200"
                                        ></v-textarea>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                            <!-- v-validate="{ required: true, max: 50 }"
                                            :error-messages="errors ? errors.collect('city') : null"
                                            data-vv-as="City" -->
                                        <v-text-field
                                            label="City"
                                            name="city"
                                            v-model="candidateWorkExperience[index].city"
                                            :counter="50"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                            <!-- v-validate="{ required: true, max: 50 }"
                                            :error-messages="errors ? errors.collect('country') : null"
                                            data-vv-as="Country" -->
                                        <v-text-field
                                            label="Country"
                                            name="country"
                                            v-model="candidateWorkExperience[index].country"
                                            :counter="50"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-layout row>
                                            <v-flex xs6>
                                                <v-dialog
                                                    v-model="form.modalStartDate"
                                                    persistent
                                                    lazy
                                                    full-width
                                                    width="300px"
                                                >
                                                    <v-text-field
                                                        slot="activator"
                                                        v-model="candidateWorkExperience[index].start_date"
                                                        label="Start date"
                                                        prepend-icon="event"
                                                        readonly
                                                    ></v-text-field>
                                                    <v-date-picker v-model="candidateWorkExperience[index].start_date" :type="form.editStartDateType" :scrollable="false">
                                                        <v-layout justify-center>
                                                            <v-btn flat color="error" @click="deleteStartDate(index)">Remove</v-btn>
                                                            <v-btn flat color="secondary" @click="form.modalStartDate = false">Cancel</v-btn>
                                                            <v-btn flat color="success" @click="form.modalStartDate = false">OK</v-btn>
                                                        </v-layout>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-layout justify-center>
                                                    <div>
                                                        <v-radio-group v-model="form.editStartDateType" row>
                                                            <v-radio label="Month" value="month" color="secondary"></v-radio>
                                                            <v-radio label="Day" value="date" color="secondary"></v-radio>
                                                        </v-radio-group>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-layout row>
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
                                                        v-model="candidateWorkExperience[index].end_date"
                                                        label="End date"
                                                        prepend-icon="event"
                                                        readonly
                                                    ></v-text-field>
                                                    <v-date-picker v-model="candidateWorkExperience[index].end_date" :type="form.editEndDateType" :scrollable="false">
                                                        <v-layout justify-center>
                                                            <v-btn flat color="error" @click="deleteEndDate(index)">Remove</v-btn>
                                                            <v-btn flat color="secondary" @click="form.modalEndDate = false">Cancel</v-btn>
                                                            <v-btn flat color="success" @click="form.modalEndDate = false">OK</v-btn>
                                                        </v-layout>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-layout justify-center>
                                                    <div>
                                                        <v-radio-group v-model="form.editEndDateType" row>
                                                            <v-radio label="Month" value="month" color="secondary"></v-radio>
                                                            <v-radio label="Day" value="date" color="secondary"></v-radio>
                                                        </v-radio-group>
                                                    </div>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
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
        inject: ['$validator'],
        components: { Draggable },
        created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
        },
        data () {
            return {
                resumeSlug: '',
                modalNewWorkExperience: false,
				modalEditWorkExperience: false,
				newWorkExperience: {
					// company: ''
				},



                // modalDate: false,
                // reference: 0,
                // picker: new Date().toISOString().substr(0, 7),
                // picker: '2019-01',
                // newEducation: {
                //     name: '',
                //     title: '',
                //     graduation_date: new Date().toISOString().substr(0, 7),
                //     duration: '',
                //     description: ''
                // },
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
                form: {
                    // title: [],
                    // subtitle: [],
                    // description: [],
                    // studyDuration: [],
                    // graduationDate: [],
                    // date: [new Date().toISOString().substr(0, 7)],
                    // dateMenu: [false],
                    modalStartDate: false,
                    startDate: '',
                    startDateType: 'month',
                    modalEndDate: false,
                    endDate: '',
                    endDateType: 'month',
                    editStartDateType: 'month',
                    editEndDateType: 'month'
                },
                candidateWorkExperience2: [
                    { "city": "San Francisco", "company": "Google Inc", "country": "USA", "end_date": "2019-06-30", "job_description": "Worked on the Chrome browser", "job_title": "Software engineer", "start_date": "2019-05-16" }, 
                    { "city": "Los Angeles", "company": "ABC media Group Ltd", "country": "USA", "end_date": "2018-10-15", "job_description": "Worked on improving media quality", "job_title": "Media Analyst", "start_date": "2017" } 
                ],
                // candidateWorkExperience3: []
            }
        },
        computed: {
            error () {
                return this.$store.getters['index/error']
            },
            loadedUserResume () {
                return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
            },
            userResume () {
                if (this.resumeSlug) {
                    return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                } else {
                    return this.$store.getters['resumes/loadedNewResume']
                }
            },
            loadedNewResume () {
                return this.$store.getters['resumes/loadedNewResume']
            },
            // candidateWorkExperience () {
            //     return this.userResume.work_experience
            // },
            candidateWorkExperience : {
                get () {
                    return this.userResume.work_experience
                },
                set (value) {
                    this.userResume.work_experience = value
                }
            }
        },
        methods: {
            // saveEducation () {
            //     console.log('saveEducation')
            //     console.log(this.form)
            // },
            addNewWorkExperience (newWorkExperience) {
                this.userResume.work_experience.push(newWorkExperience)
                this.modalNewWorkExperience = false
                new Noty({
                    type: 'success',
                    text: 'New work experience field added!',
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
            },
            // editEducation (education, reference) {
            //     console.log('editEducation')
            //     console.log('reference: ', reference)
            //     this.modalEditWorkExperience = false
            // },
            saveNewStartDate () {
                this.newWorkExperience.start_date = this.form.startDate
                this.form.modalStartDate = false
            },
            deleteStartDate (index) {
                this.candidateWorkExperience[index].start_date = ''
                this.form.modalStartDate = false
            },
            deleteNewStartDate () {
                this.newWorkExperience.start_date = ''
                this.form.modalStartDate = false
            },
            saveNewEndDate () {
                this.newWorkExperience.end_date = this.form.endDate
                this.form.modalEndDate = false
            },
            deleteEndDate (index) {
                this.candidateWorkExperience[index].end_date = ''
                this.form.modalEndDate = false
            },
            deleteNewEndDate () {
                this.newWorkExperience.end_date = ''
                this.form.modalEndDate = false
            },
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
            deleteItem (index) {
                console.log('delete: ', index)
                this.candidateWorkExperience.splice(index, 1)
            }
        }
    }
</script>

<style scoped>

</style>