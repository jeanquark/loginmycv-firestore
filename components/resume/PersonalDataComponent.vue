<template>
    <div style="padding: 30px;">
        <div>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- candidateLongResume.image: {{ candidateLongResume.image }}<br /><br /> -->
            <!-- imageUrl: {{ imageUrl }}<br /><br /> -->
            <!-- imageFile: {{ imageFile }}<br /><br /> -->
            <!-- uploadingNewImage: {{ uploadingNewImage }}<br /><br /> -->
            <!-- error: {{ error }}<br /><br /> -->
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- personalData: {{ this.personalData }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            
        </div>
        <!-- <v-layout row wrap class="pa-3" style="border: 1px solid var(--v-secondary-base); border-radius: 10px;" v-if="userResume"> -->
        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">General Info <small>(public data)</small></h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout>
                            <v-flex xs10 offset-xs1 id="direct_access">
                                <v-layout justify-center>
                                    <div>
                                        <v-checkbox v-model="userResume.allow_visitor_access" label="Allow direct access for visitors" color="secondary"></v-checkbox>
                                    </div>
                                </v-layout>
                                <v-layout v-if="userResume.allow_visitor_access">
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
                                            :error-messages="errors.collect('password_confirmation')"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-flex xs12 sm4>
                                <v-text-field
                                    label="Resume identifier*"
                                    name="slug"
                                    prepend-icon="perm_identity"
                                    required
                                    hint="Must be unique."
                                    :persistent-hint="true"
                                    v-validate="{ required: true, regex: /^[a-z0-9-]+$/ }"
                                    :error-messages="errors.collect('slug')"
                                    data--vv-as="Resume identifier"
                                    v-model="userResume.slug"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm8>
                                <v-text-field
                                    label="Path to your resume"
                                    :value="userResume.slug ? `https://www.loginmycv.com/resume/${userResume.slug}` : ''"
                                    readonly
                                    prepend-icon="web"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm4>
                                <v-text-field
                                    label="Job title"
                                    id="job_title"
                                    name="job_title"
                                    prepend-icon="business_center"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors.collect('job_title')"
                                    data-vv-as="Job title"
                                    v-model="userResume.job_title"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm8>
                                <v-text-field
                                    label="Job description"
                                    id="job_description"
                                    name="job_description"
                                    prepend-icon="business_center"
                                    v-validate="'required|max:120'"
                                    :error-messages="errors.collect('job_description')"
                                    data-vv-as="Job description"
                                    v-model="userResume.job_description"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm4>
                                <v-text-field
                                    label="Firstname"
                                    name="firstname"
                                    prepend-icon="person"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors.collect('firstname')"
                                    data-vv-as="Firstname"
                                    v-model="userResume.personal_data.firstname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4>
                                <v-text-field
                                    label="Lastname"
                                    name="lastname"
                                    prepend-icon="person"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors.collect('lastname')"
                                    data-vv-as="Lastname"
                                    v-model="userResume.personal_data.lastname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4>
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    prepend-icon="email"
                                    v-validate="'required|email|max:50'"
                                    :error-messages="errors.collect('email')"
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
                    <p class="text-xs-center">(can be public or private, you choose)</p>

                    <v-card-text>
                        <v-layout row wrap>
                            <v-text-field v-model="userResume.user_id"></v-text-field>
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
                                            label="Birthday"
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
                        </v-layout>

                        <v-layout>
                            <v-flex xs12 sm4>
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

                            <v-flex xs12 sm4>
                                <v-select
                                    v-model="userResume.personal_data.languages"
                                    :items="loadedLanguages"
                                    item-text="name"
                                    prepend-icon="person"
                                    label="Language(s)"
                                    multiple
                                    chips
                                    :deletable-chips="true"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm4>
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
                            <v-flex xs12 sm6>
                                <div v-if="resumeSlug" class="text-xs-center">
                                    <span>Current image: </span><br />
                                    <img :src="`/images/resumes/${userResume.personal_data.picture}`" height="150" />
                                </div>                
                                <v-text-field label="My Picture" @click='pickFile' v-model='imageName' prepend-icon='folder_shared' :error-messages="error ? error.image : null"
                                ></v-text-field>
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
                                    <span>New image: </span><br />
                                    <img :src="imageUrl" height="150" />
                                </div>
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
    export default {
        // props: ['resumeSlug', 'personalData'],
        async created () {
            console.log('created')
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
            // this.loadedUserResume = await this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
            await this.$store.dispatch('countries/fetchCountries')
            await this.$store.dispatch('languages/fetchLanguages')
            await this.$store.dispatch('competences/fetchCompetences')
            
        },
        mounted () {
            this.userResume.template_id = 'KZn492txu3znyr8Zz4oL'
            this.loadedNewResume.slug = 'jeanquark'
            this.loadedNewResume.job_title = 'Web developer'
            this.loadedNewResume.job_description = 'Develops websites'
            this.loadedNewResume.personal_data.firstname = 'Jean-Marc'
            this.loadedNewResume.personal_data.lastname = 'Kleger'
            this.loadedNewResume.personal_data.email = 'jm.kleger@gmail.com'
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
                    birthday: ''
                },
                modalDate: false,
                // date: moment().subtract(30, 'years').format('YYYY-MM-DD'),
                showPassword: false
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
            saveDate () {
                console.log('saveDate')
                // console.log('date: ', date)
                // this.userResume.personal_data.birthday = date
                this.modalDate = false
            },
            pickFile () {
                this.$refs.image.click ()
            },
            onFilePicked (e) {
                this.uploadingNewImage = true
                const files = e.target.files
                console.log('files: ', files)
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    console.log('fr: ', fr)
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        // this.imageFile = files[0] // this is an image file that can be sent to server...
                        // this.loadedUserResume.image_new = fr.result
                        this.userResume.image_new = fr.result
                        // this.candidateLongResume.image_new = 'abc'
                        this.uploadingNewImage = false
                    })   
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
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
    #direct_access {
        margin-bottom: 30px;
        padding: 10px;
        border: 1px solid var(--v-secondary-base);
        border-radius: 10px;
    }
</style>