<template>
    <div class="text-xs-center" style="padding: 30px; margin-top: 0px;" v-if="userResume">
        <p>
            loadedUserResume: {{ loadedUserResume }}<br /><br />
            loadedNewResume: {{ loadedNewResume }}<br /><br />
            userResume: {{ userResume }}<br /><br />
        </p>
        <h2>Education</h2>
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
                        Add a new field in education
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            v-model="newEducation.title"
                            label="Title"
                            :counter="30"
                        ></v-text-field>
                        <v-text-field
                            v-model="newEducation.name"
                            label="University/School name"
                            :counter="30"
                        ></v-text-field>
                        <v-text-field
                            v-model="newEducation.location"
                            label="Location"
                            :counter="30"
                        ></v-text-field>
                        <v-textarea
                            v-model="newEducation.description"
                            label="Education description"
                            :counter="60"
                        ></v-textarea>
                        <v-slider
                            v-model="newEducation.duration"
                            label="Study duration"
                            :max="10"
                            :min="0"
                            :step=".5"
                        ></v-slider>
                        <div class="text-xs-center">
                            <small>{{ newEducation.duration }} year(s)</small>
                        </div>    
                        <v-dialog
                            v-model="modalDate"
                            persistent
                            lazy
                            full-width
                            width="290px"
                          >
                            <v-text-field
                                slot="activator"
                                v-model="newEducation.graduation_date"
                                label="Graduation date"
                                prepend-icon="event"
                                readonly
                            ></v-text-field>
                            <v-date-picker v-model="newEducation.graduation_date" type="month" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="modalDate = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="saveDate(newEducation.graduation_date, 0)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
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
                            <!-- candidateEducation[index].graduation_date: {{ candidateEducation[index].graduation_date }}<br /> -->
                            <!-- abc: {{ new Date().toISOString().substr(0, 7) }} -->
                            <v-flex xs12 sm6 style="padding: 20px;">
                                <v-text-field
                                    v-model="candidateEducation[index].title"
                                    label="Title"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 style="padding: 20px;">
                                <v-text-field
                                    v-model="candidateEducation[index].name"
                                    label="University/School name"
                                    :counter="30"
                                    :error-messages="error ? error.education_1_name : null"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 style="padding: 20px;">
                                <v-text-field
                                    v-model="candidateEducation[index].location"
                                    label="Location"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>   
                            <v-flex xs12 sm6 style="padding: 20px;">
                                <v-textarea
                                    v-model="candidateEducation[index].description"
                                    label="Education description"
                                    :counter="60"
                                ></v-textarea>
                            </v-flex>
                            <v-flex xs12 sm6 style="padding: 20px;">
                                <v-slider
                                    v-model="candidateEducation[index].duration"
                                    label="Study duration"
                                    :max="10"
                                    :min=".5"
                                    :step=".5"
                                ></v-slider>
                                <div class="text-xs-center">
                                    <small>{{ candidateEducation[index].duration }} year(s)</small>
                                </div>
                            </v-flex>
                            <v-flex xs12 sm6 style="padding: 20px;">
                                <v-dialog
                                    v-model="modalDate"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                                  >
                                    <v-text-field
                                        slot="activator"
                                        v-model="candidateEducation[index].graduation_date"
                                        label="Graduation date"
                                        prepend-icon="event"
                                        readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="candidateEducation[index].graduation_date" type="month" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modalDate = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="saveDate(candidateEducation[index].graduation_date, 0)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
            <!-- <v-card-actions class="justify-center">
                <v-btn color="orange" @click="saveEducation">Save</v-btn>
            </v-card-actions> -->
        </v-expansion-panel>
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
                    location: '',
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
                    dateModal: false
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
            saveDate (date, index) {
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