<template>
    <div style="padding: 30px;" v-if="userResume">
        <div>
            resumeSlug: {{ this.resumeSlug }}<br /><br />
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- candidateLongResume.image: {{ candidateLongResume.image }}<br /><br /> -->
            <!-- imageUrl: {{ imageUrl }}<br /><br /> -->
            <!-- imageFile: {{ imageFile }}<br /><br /> -->
            <!-- uploadingNewImage: {{ uploadingNewImage }}<br /><br /> -->
            <!-- error: {{ error }}<br /><br /> -->
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- personalData: {{ this.personalData }}<br /><br /> -->
            userResume: {{ userResume }}<br /><br />
            <!-- errors: {{ errors }}<br /><br /> -->
            
        </div>
        <!-- <v-layout row wrap class="pa-3" style="border: 1px solid var(--v-secondary-base); border-radius: 10px;" v-if="userResume"> -->
        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">General Info</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout v-if="!resumeSlug">
                            <!-- <v-btn color="primary" @click="validate">Validate</v-btn> -->
                            <!-- {{ errors.items.map(e => e.msg) }} -->

                            <v-flex xs10 offset-xs1 class="border">
                                <v-layout justify-center>
                                    <div>
                                        <v-checkbox v-model="userResume.allow_visitor_access" label="Allow direct access for visitors" color="secondary"></v-checkbox>
                                    </div>
                                </v-layout>
                                <!-- <v-layout v-if="userResume.allow_visitor_access">
                                    <v-flex xs12 sm6 mx-3>
                                        <v-text-field
                                            :type="showPassword ? 'text' : 'password'"
                                            name="password"
                                            label="Password"
                                            prepend-icon="lock"
                                            hint="At least 8 characters"
                                            :counter="30"
                                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                            @click:append="showPassword = !showPassword"
                                            v-validate="'required|max:30'"
                                            ref="password"
                                            v-model="userResume.password"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 mx-3>
                                        <v-text-field
                                            type="password"
                                            name="password_confirmation"
                                            label="Password confirmation"
                                            prepend-icon="lock"
                                            v-validate="'required|confirmed:password'"
                                            data-vv-as="Password"
                                            :error-messages="errors ? errors.collect('password_confirmation') : null"
                                            v-model="userResume.password_confirmation"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout> -->
                            </v-flex>
                        </v-layout>

                        <v-layout v-else>
                            <v-flex xs10 offset-xs1 class="border">
                                <v-layout justify-center>
                                    <div>
                                        <v-switch v-model="userResume.allow_visitor_access" label="Allow visitor Access" color="secondary"></v-switch>
                                    </div>
                                </v-layout>
                                <!-- <v-layout v-if="userResume.allow_visitor_access">
                                    <v-flex xs12 sm6 mx-3>
                                        <v-text-field
                                            :type="showPassword ? 'text' : 'password'"
                                            name="password"
                                            label="Password"
                                            prepend-icon="lock"
                                            hint="At least 8 characters"
                                            :counter="30"
                                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                            @click:append="showPassword = !showPassword"
                                            v-validate="'required|max:30'"
                                            ref="password"
                                            v-model="userResume.new_password"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 mx-3>
                                        <v-text-field
                                            type="password"
                                            name="password_confirmation"
                                            label="Password confirmation"
                                            prepend-icon="lock"
                                            v-validate="'required|confirmed:password'"
                                            data-vv-as="Password"
                                            :error-messages="errors ? errors.collect('password_confirmation') : null"
                                            v-model="userResume.new_password_confirmation"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout> -->
                            </v-flex>
                        </v-layout>

                        <v-layout v-if="resumeSlug === undefined">
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Resume identifier*"
                                    name="slug"
                                    prepend-icon="perm_identity"
                                    hint="Must be unique."
                                    :persistent-hint="true"
                                    v-validate="{ required: true, regex: /^[a-z0-9-]+$/ }"
                                    :error-messages="errors ? errors.collect('slug') : null"
                                    data--vv-as="Resume identifier"
                                    v-model="userResume.slug"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm8 class="px-3">
                                <v-text-field
                                    label="Path to your resume"
                                    :value="userResume.slug ? `https://www.loginmycv.com/resume/${userResume.slug}` : ''"
                                    readonly
                                    prepend-icon="web"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout v-else>
                            <v-flex xs10 offset-xs1 class="border">
                                <v-layout justify-center>
                                    <div>
                                        <v-switch v-model="userResume.updateResumeSlug" label="Modify resume slug" color="secondary"></v-switch>
                                    </div>
                                </v-layout>
                                
                                <v-layout v-if="userResume.updateResumeSlug">
                                    <v-flex xs12 sm6 mx-3>
                                        <v-text-field
                                            label="New resume identifier*"
                                            name="new_slug"
                                            prepend-icon="perm_identity"
                                            hint="Must be unique."
                                            :persistent-hint="true"
                                            v-validate="{ required: true, regex: /^[a-z0-9-]+$/ }"
                                            :error-messages="errors ? errors.collect('new_slug') : null"
                                            data--vv-as="Resume identifier"
                                            v-model="userResume.new_slug"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm8 class="px-3">
                                        <v-text-field
                                            label="New path to your resume"
                                            :value="userResume.new_slug ? `https://www.loginmycv.com/resume/${userResume.new_slug}` : ''"
                                            readonly
                                            prepend-icon="web"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Job title"
                                    id="job_title"
                                    name="job_title"
                                    prepend-icon="business_center"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors ? errors.collect('job_title') : null"
                                    data-vv-as="Job title"
                                    :counter="50"
                                    v-model="userResume.job_title"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm8 class="px-3">
                                <v-text-field
                                    label="Job description"
                                    id="job_description"
                                    name="job_description"
                                    prepend-icon="business_center"
                                    v-validate="'required|max:100'"
                                    :error-messages="errors ? errors.collect('job_description') : null"
                                    data-vv-as="Job description"
                                    :counter="100"
                                    v-model="userResume.job_description"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Firstname"
                                    name="firstname"
                                    prepend-icon="person"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors ? errors.collect('firstname') : null"
                                    data-vv-as="Firstname"
                                    v-model="userResume.personal_data.firstname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Lastname"
                                    name="lastname"
                                    prepend-icon="person"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors ? errors.collect('lastname') : null"
                                    data-vv-as="Lastname"
                                    v-model="userResume.personal_data.lastname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    prepend-icon="email"
                                    v-validate="'required|email|max:50'"
                                    :error-messages="errors ? errors.collect('email') : null"
                                    data-vv-as="Email"
                                    v-model="userResume.personal_data.email"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>              
        </v-layout>
        <br />
        <!-- <v-layout row wrap class="pa-3" style="border: 1px solid var(--v-secondary-base); border-radius: 10px;" v-if="userResume"> -->
        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">More about you </h2>
                    </v-card-title>
                    <!-- <p class="text-xs-center">(can be public or private, you choose)</p> -->

                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    v-model="userResume.personal_data.gender"
                                    :items="['female', 'male']"
                                    prepend-icon="person"
                                    attach
                                    chips
                                    label="Gender"
                                    :deletable-chips="true"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    v-model="userResume.personal_data.country_of_residence"
                                    :items="loadedCountries"
                                    item-text="name"
                                    prepend-icon="person"
                                    chips
                                    :deletable-chips="true"
                                    label="Country of residence"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-dialog
                                    ref="dialog"
                                    v-model="modalDate"
                                    :return-value.sync="personal_data.birthday"
                                    persistent
                                    lazy
                                    full-width
                                    width="300px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="personal_data.birthday"
                                            label="Birth date"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="personal_data.birthday">
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="secondary" @click="modalDate = false">Cancel</v-btn>
                                        <v-btn flat color="secondary" @click="$refs.dialog.save(personal_data.birthday)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    v-model="userResume.personal_data.nationalities"
                                    :items="loadedCountries"
                                    item-text="name"
                                    prepend-icon="person"
                                    label="Nationality-ies"
                                    multiple
                                    chips
                                    :deletable-chips="true"
                                    class="abc"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    v-model="userResume.languages"
                                    :items="loadedLanguages"
                                    item-text="name"
                                    prepend-icon="person"
                                    label="Language(s)"
                                    multiple
                                    chips
                                    :deletable-chips="true"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    v-model="userResume.key_competences"
                                    :items="loadedCompetences"
                                    item-text="name"
                                    :return-object="true"
                                    prepend-icon="person"
                                    label="Key competences"
                                    multiple
                                    chips
                                    :deletable-chips="true"
                                ></v-select>
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-flex xs12 sm6 class="px-3">
                                <div v-if="resumeSlug && this.userResume.personal_data && this.userResume.personal_data.picture" class="text-xs-center">
                                    <span>Current picture: </span><br />
                                    <!-- <img :src="`/images/resumes/${userResume.personal_data.picture}`" height="150" /> -->
                                    <img :src="this.userResume.personal_data.picture.downloadUrl" height="150" />
                                </div>                
                                <v-text-field label="My Picture" @click='pickFile' v-model="imageName" prepend-icon='folder_shared' :error-messages="error ? error.image : null" ></v-text-field>
                                <!-- <v-text-field label="My Picture" @click='pickFile' v-model="userResume.personal_data.picture" prepend-icon='folder_shared' :error-messages="error ? error.image : null"></v-text-field>-->
                                <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="image/jpeg"
                                    @change="onFilePicked"
                                >
                            </v-flex>

                            <v-flex xs12 sm6>
                                <div class="text-xs-center">
                                    <img src="/images/loader.gif" width="100" v-if="uploadingNewImage" />
                                </div>
                                <div v-if="imageUrl">
                                    <span>New picture: </span><br />
                                    <img :src="imageUrl" height="150" />
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>            
        </v-layout>

        <v-layout row wrap pa-2 class="">
            <v-flex xs12 class="">
                <v-card :elevation="12" color="red lighten-2" class="white--text" style="border: 1px solid red;">
                    <v-card-title class="justify-center" style="">
                        <h2 class="headline mb-0">Privacy & Security</h2>
                    </v-card-title>

                    <v-card-text class="">
                        <v-layout justify-center class="black--text">
                            <div class="justify-center">
                                <v-radio-group v-model="userResume.visibility" row style="color: black;">
                                    <v-radio label="Public resume" value="public" color="success"></v-radio>
                                    <v-radio label="Semi-private resume" value="semi-private" color="primary"></v-radio>
                                    <v-radio label="Private resume" value="private" color="warning"></v-radio>
                                </v-radio-group>
                            </div>
                        </v-layout>
                        <v-layout row wrap>
                            <v-alert
                                value="public"
                                type="success"
                                v-if="userResume.visibility === 'public'"
                                >
                                <span>An excerpt of your resume with full access to your public data will appear on the frontpage (recommanded option).</span>
                            </v-alert>
                            <v-alert
                                value="semi-private"
                                color="primary"
                                icon="info"
                                v-if="userResume.visibility === 'semi-private'"
                                >
                                <span>An excerpt of your resume will appear on the frontpage. But to gain full access, visitors need to ask for your authorization.</span>
                            </v-alert>
                            <v-alert
                                value="private"
                                type="warning"
                                v-if="userResume.visibility === 'private'"
                                >
                                <span>Your resume will be hidden (visitors will not be able to found you without prior knowledge of your resume slug). To gain access to your resume, visitors need to ask for your authorization.</span>
                            </v-alert>
                        </v-layout>

                        <v-layout row wrap justify-center v-if="userResume.visibility != 'public'" style="margin-top: 20px;">
                            <v-flex xs12>
                                <div class="text-xs-center">
                                    Provide password for visitors' access:
                                </div>
                            </v-flex>
                            <v-flex xs12 sm6 mx-5>
                                <v-text-field
                                    :type="showPassword ? 'text' : 'password'"
                                    name="password"
                                    :label="resumeSlug ? 'New password' : 'Password'"
                                    prepend-icon="lock"
                                    hint="At least 4 characters"
                                    :counter="30"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    @click:append="showPassword = !showPassword"
                                    v-validate="'required|min:4|max:30'"
                                    ref="password"
                                    v-model="userResume.password"
                                    :error-messages="errors ? errors.collect('password') : null"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 mx-5>
                                <v-text-field
                                    type="password"
                                    name="password_confirmation"
                                    :label="resumeSlug ? 'New Password confirmation' : 'Password confirmation'"
                                    prepend-icon="lock"
                                    v-validate="'required|confirmed:password'"
                                    data-vv-as="Password"
                                    :error-messages="errors ? errors.collect('password_confirmation') : null"
                                    v-model="userResume.password_confirmation"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import moment from 'moment'
    import { VueColorpicker } from 'vue-pop-colorpicker'
    export default {
        // props: ['resumeSlug', 'personalData'],
        inject: ['$validator'], // inject parent validator
        components: { VueColorpicker },
        async created () {
            console.log('created')
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
            // this.loadedUserResume = await this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
        },
        async mounted () {
            await this.$store.dispatch('countries/fetchCountries')
            await this.$store.dispatch('languages/fetchLanguages')
            await this.$store.dispatch('competences/fetchCompetences')

            if (this.resumeSlug == undefined) {
                // this.userResume.template_id = 'KZn492txu3znyr8Zz4oL'
                this.loadedNewResume.slug = ''
                // this.loadedNewResume.job_title = 'Web developer'
                // this.loadedNewResume.job_description = 'Develops websites'
                // this.loadedNewResume.personal_data.firstname = 'Jean-Marc'
                // this.loadedNewResume.personal_data.lastname = 'Kleger'
                // this.loadedNewResume.personal_data.email = 'jm.kleger@gmail.com'
            }
        },
        data () {
            return {
                resumeSlug: '',
                imageName: '',
                imageUrl: '',
                imageFile: '',
                // errors: [],
                uploadingNewImage: false,
                // loadedUserResume: {}
                personal_data: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    job_title: '',
                    job_description: '',
                    birthday: '',
                    picture: []
                },
                modalDate: false,
                // date: moment().subtract(30, 'years').format('YYYY-MM-DD'),
                showPassword: false,
                // updateResumeSlug: false
                color: '#fff',
                row: ''
            }
        },
        computed: {
            error () {
                return this.$store.getters['error']
            },
            userResume () {
                if (!this.resumeSlug) {
                    return this.$store.getters['resumes/loadedNewResume']
                } else {
                    return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                }
            },
            loadedNewResume () {
                return this.$store.getters['resumes/loadedNewResume']
            },
            loadedCountries () {
                return this.$store.getters['countries/loadedCountries']
            },
            loadedLanguages () {
                return this.$store.getters['languages/loadedLanguages']
            },
            loadedCompetences () {
                return this.$store.getters['competences/loadedCompetences']
            }
        },
        methods: {
            validate () {
                console.log('validate')
                this.$validator.validateAll()
            },
            saveDate () {
                console.log('saveDate')
                // console.log('date: ', date)
                // this.userResume.personal_data.birthday = date
                this.modalDate = false
            },
            pickFile () {
                this.$refs.image.click()
            },
            onFilePicked (e) {
                this.uploadingNewImage = true
                const files = e.target.files
                console.log('files: ', files)

                // this.userResume.uploads.push(files[0])
                this.userResume.personal_data.picture = files[0]
                this.imageName = files[0].name
                const fileReader = new FileReader ()
                fileReader.readAsDataURL(files[0])
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                    this.uploadingNewImage = false
                })



                // if(files[0] !== undefined) {
                //     this.imageName = files[0].name
                //     if(this.imageName.lastIndexOf('.') <= 0) {
                //         return
                //     }
                //     const fileReader = new FileReader ()
                //     fileReader.readAsDataURL(files[0])
                //     console.log('fileReader: ', fileReader)
                //     fileReader.addEventListener('load', () => {
                //         this.imageUrl = fileReader.result
                //         // this.imageFile = files[0] // this is an image file that can be sent to server...
                //         // this.loadedUserResume.image_new = fr.result
                //         this.userResume.image_new = fileReader.result
                //         this.userResume.uploads.push(fileReader.result)
                //         // this.candidateLongResume.image_new = 'abc'
                //         this.uploadingNewImage = false
                //     })   
                // } else {
                //     this.imageName = ''
                //     this.imageFile = ''
                //     this.imageUrl = ''
                // }
            },
            onChange (color) {
                console.log(color)
            }
        }
    }
</script>

<style scoped>
    .v-input__slot {
        padding-top: 12px;
    }
    .abc .v-input__control .v-input__slot {
        padding-top: 12px;
    }
    .border {
        margin-bottom: 30px;
        padding: 10px;
        border: 1px solid var(--v-secondary-base);
        border-radius: 10px;
    }
</style>