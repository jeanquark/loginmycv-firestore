<template>
    <div class="text-xs-center pa-4" style="margin-top: 0px;" v-if="userResume">
        <div>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
        </div>
        <h2>Education</h2>
        <v-layout row wrap class="pa-3" v-if="userResume">
            <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
                outline
                v-if="!userResume.education.length > 0"
            >
                You have no item here, please click on the rounded pink button to add one
            </v-alert>
            <v-expansion-panel style="">
                <v-dialog
                    v-model="modalNewEducation"
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
                                Add a new education entry
                            </v-layout>
                        </v-card-title>

                        <v-card-text>
                            <v-text-field
                                v-model="newEducation.title"
                                label="Title"
                                placeholder="Bachelor in Geography"
                                :counter="50"
                            ></v-text-field>
                            <v-text-field
                                v-model="newEducation.school"
                                label="University/School name"
                                placeholder="University of Geneva"
                                :counter="50"
                            ></v-text-field>
                            <v-layout row>
                                <v-flex xs6 class="pr-2">
                                    <v-text-field
                                        v-model="newEducation.city"
                                        label="City"
                                        placeholder="Geneva"
                                        :counter="30"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-2">
                                    <v-text-field
                                        v-model="newEducation.country"
                                        label="Country"
                                        placeholder="Switzerland"
                                        :counter="30"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-flex xs12>
                                <v-textarea
                                    v-model="newEducation.description"
                                    label="Education description"
                                    :counter="200"
                                ></v-textarea>
                            </v-flex>
                            <!-- <v-slider
                                v-model="newEducation.duration"
                                label="Study duration"
                                :max="10"
                                :min="0"
                                :step=".25"
                            ></v-slider>
                            <div class="text-xs-center">
                                <small>{{ newEducation.duration }} year(s)</small>
                            </div> -->
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
                                            v-model="newEducation.start_date"
                                            label="Start date"
                                            prepend-icon="event"
                                            readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="form.startDate" :type="form.startDateType" color="primary" :scrollable="false">
                                            <!-- <v-spacer></v-spacer> -->
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
                                            v-model="newEducation.end_date"
                                            label="Graduation date"
                                            prepend-icon="event"
                                            readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="form.endDate" :type="form.endDateType" color="primary" :scrollable="false">
                                            <!-- <v-spacer></v-spacer> -->
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
                            <v-btn class="success" @click="addNewEducation(newEducation)">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- candidateLongResume: {{ candidateLongResume }}<br /><br /> -->
                <!-- candidateEducation: {{ candidateEducation }}<br /><br /> -->
                <v-expansion-panel-content
                    v-for="(edu, index) in candidateEducation"
                    :key="index"
                >
                    <!-- <v-icon slot="actions" color="primary"><v-icon>cross</v-icon></v-icon> -->
                    <!-- <v-icon slot="actions" color="teal">done</v-icon> -->
                    <!-- <v-icon color="teal">cross</v-icon> -->
                    <!-- @click.native.stop="delete(index)" -->
                    <div slot="header">
                        <v-icon @click.native.stop="deleteItem(index)">cancel</v-icon>
                        <v-icon style="color: #ff5252;" v-if="error && error.education_1_name">error</v-icon>
                        <span style="font-size: 1.5em;">{{ edu.title }}</span>                
                    </div>

                    <!-- form.title: {{ form.title }}<br /><br /> -->
                    <!-- form.graduationDate: {{ form.graduationDate }}<br /><br /> -->
                    <!-- index: {{ index }}<br /><br /> -->
                    <!-- reference: {{ reference }}<br /><br /> -->
                    <v-card style="margin-bottom: 30px; background: black;">
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
                                    <v-text-field
                                        v-model="candidateEducation[index].title"
                                        label="Title"
                                        :counter="50"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 class="pa-3">
                                    <v-text-field
                                        v-model="candidateEducation[index].school"
                                        label="University/School name"
                                        :counter="50"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 class="pa-3">
                                    <v-text-field
                                        v-model="candidateEducation[index].city"
                                        label="City"
                                        :counter="30"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 class="pa-3">
                                    <v-text-field
                                        v-model="candidateEducation[index].country"
                                        label="Country"
                                        :counter="30"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 class="pa-3">
                                    <v-textarea
                                        v-model="candidateEducation[index].description"
                                        label="Education description"
                                        :counter="200"
                                    ></v-textarea>
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
                                                    v-model="candidateEducation[index].start_date"
                                                    label="Start date"
                                                    prepend-icon="event"
                                                    readonly
                                                ></v-text-field>
                                                <v-date-picker v-model="candidateEducation[index].start_date" :type="form.editStartDateType" :scrollable="false">
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
                                                    v-model="candidateEducation[index].end_date"
                                                    label="Graduation date"
                                                    prepend-icon="event"
                                                    readonly
                                                ></v-text-field>
                                                <v-date-picker v-model="candidateEducation[index].end_date" :type="form.editEndDateType" :scrollable="false">
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
                <!-- <v-card-actions class="justify-center">
                    <v-btn color="orange" @click="saveEducation">Save</v-btn>
                </v-card-actions> -->
            </v-expansion-panel>
        </v-layout>
    </div>
</template>

<script>
    import Noty from 'noty'
    export default {
        created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
        },
        data () {
            return {
                resumeSlug: '',
                modalNewEducation: false,
                modalEditEducation: false,
                modalDate: false,
                reference: 0,
                // picker: new Date().toISOString().substr(0, 7),
                picker: '2019-01',
                newEducation: {
                    name: '',
                    title: '',
                    graduation_date: new Date().toISOString().substr(0, 7),
                    duration: '',
                    description: ''
                },
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
                    title: [],
                    subtitle: [],
                    description: [],
                    studyDuration: [],
                    graduationDate: [],
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
                }
            }
        },
        computed: {
            error () {
                return this.$store.getters['index/error']
            },
            // candidateLongResume () {
            //     return this.$store.getters['index/candidateLongResume']
            // },
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
            candidateEducation () {
                return this.userResume.education
                const educationEmptyArray = []
                // const education = this.$store.getters['index/candidateLongResume'].education
                // const education = this.loadedUserResume.education
                // return education ? education : educationEmptyArray
                // return education
                // return this.$store.getters['index/candidateLongResume'].education


                // const candidateLongResume = this.$store.getters['index/candidateLongResume']
                // console.log('candidateLongResume: ', candidateLongResume)
                // const abc = []
                // for (let i = 1; i <= 5; i++) {
                //     const a = `education_${i}_name`
                //     // console.log('a: ', a)
                //     if (candidateLongResume[`education_${i}_name`]) {
                //         abc.push({
                //             'name': candidateLongResume[`education_${i}_name`],
                //             'slug': candidateLongResume[`education_${i}_slug`],
                //             'description': candidateLongResume[`education_${i}description`],
                //             'location': candidateLongResume[`education_${i}_location`],
                //             'duration': candidateLongResume[`education_${i}_duration`],
                //             'graduation_date': candidateLongResume[`education_${i}_graduation_date`]
                //         })
                //     }
                // }
                // return abc
            }
        },
        methods: {
            saveEducation () {
                console.log('saveEducation')
                console.log(this.form)
            },
            addNewEducation (newEducation) {
                console.log('addNewEducation: ', newEducation)
                // this.candidateEducation.push(
                //     newEducation
                // )
                // if (!this.loadedNewResume.education) {
                //     this.loadedNewResume.education = []
                // }
                // this.loadedNewResume.education.push(newEducation)
                // this.newEducation = {}
                this.userResume.education.push(newEducation)
                this.modalNewEducation = false
                new Noty({
                    type: 'success',
                    text: 'New Education field added!',
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
            },
            editEducation (education, reference) {
                console.log('editEducation')
                console.log('reference: ', reference)
                this.modalEditEducation = false
            },
            saveNewStartDate () {
                this.newEducation.start_date = this.form.startDate
                this.form.modalStartDate = false
            },
            deleteStartDate (index) {
                this.candidateEducation[index].start_date = ''
                this.form.modalStartDate = false
            },
            deleteNewStartDate () {
                this.newEducation.start_date = ''
                this.form.modalStartDate = false
            },
            saveNewEndDate () {
                this.newEducation.end_date = this.form.endDate
                this.form.modalEndDate = false
            },
            deleteEndDate (index) {
                this.candidateEducation[index].end_date = ''
                this.form.modalEndDate = false
            },
            deleteNewEndDate () {
                this.newEducation.end_date = ''
                this.form.modalEndDate = false
            },
            saveDate2 (date, index) {
                console.log('saveDate')
                console.log('date: ', date)
                console.log('index: ', index)
                if (!index) {
                    this.newEducation.graduation_date = date
                } else {
                    this.education[index].graduation_date = date                    
                }
                this.modalDate = false
            },
            deleteItem (index) {
                console.log('delete: ', index)
                this.candidateEducation.splice(index, 1)
            }
        }
    }
</script>

<style scoped>

</style>