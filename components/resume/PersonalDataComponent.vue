<template>
    <div class="pa-4" v-if="userResume">
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
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- getCurrentPicture: {{ getCurrentPicture }}<br /><br /> -->
            userResume.uploads: {{ this.userResume.uploads }}<br /><br />
            <!-- <v-btn color="primary" @click="addUpload">Add upload</v-btn> -->
            
        </div>
        <!-- <v-layout row wrap class="pa-3" style="border: 1px solid var(--v-secondary-base); border-radius: 10px;" v-if="userResume"> -->
        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-0">General Info</h2><br />
                        <!-- <h4>(entries with an asterisk (*) are public)</h4> -->
                    </v-card-title>
                    <div class="text-xs-center"><small>(entries with an asterisk (*) are public)</small></div>

                    <v-card-text>
                        <v-layout v-if="resumeSlug === undefined">
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Resume identifier*"
                                    name="slug"
                                    hint="Must be unique."
                                    :persistent-hint="true"
                                    v-validate="{ required: true, regex: /^[a-z0-9-]+$/, max: 50 }"
                                    :error-messages="errors ? errors.collect('slug') : null"
                                    data-vv-as="Resume identifier"
                                    :counter="50"
                                    v-model="userResume.slug"
                                ><font-awesome-icon :icon="['fas', 'address-card']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm8 class="px-3">
                                <v-text-field
                                    label="Path to your resume"
                                    :value="userResume.slug ? `https://www.loginmycv.com/resume/${userResume.slug}` : ''"
                                    readonly
                                ><font-awesome-icon :icon="['fas', 'link']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-3">
                                
                                <v-text-field
                                    label="Job title*"
                                    id="job_title"
                                    name="job_title"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors ? errors.collect('job_title') : null"
                                    data-vv-as="Job title"
                                    :counter="50"
                                    v-model="userResume.job_title"
                                ><font-awesome-icon :icon="['fas', 'briefcase']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm8 class="px-3">
                                <v-text-field
                                    label="Job description*"
                                    id="job_description"
                                    name="job_description"
                                    v-validate="'required|max:100'"
                                    :error-messages="errors ? errors.collect('job_description') : null"
                                    data-vv-as="Job description"
                                    :counter="100"
                                    v-model="userResume.job_description"
                                ><font-awesome-icon :icon="['fas', 'briefcase']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Firstname*"
                                    name="firstname"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors ? errors.collect('firstname') : null"
                                    data-vv-as="Firstname"
                                    :counter="50"
                                    v-model="userResume.personal_data.firstname"
                                ><font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Lastname*"
                                    name="lastname"
                                    v-validate="'required|max:50'"
                                    :error-messages="errors ? errors.collect('lastname') : null"
                                    data-vv-as="Lastname"
                                    :counter="50"
                                    v-model="userResume.personal_data.lastname"
                                ><font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>
                            
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>              
        </v-layout>
        <br />

        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Contact & Social</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-validate="'required|email|max:50'"
                                    :error-messages="errors ? errors.collect('email') : null"
                                    data-vv-as="Email"
                                    v-model="userResume.personal_data.email"
                                ><font-awesome-icon :icon="['fas', 'envelope']" size="1x" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Personal Website"
                                    name="website"
                                    v-validate="{url: {require_protocol: true }}"
                                    :error-messages="errors ? errors.collect('website') : null"
                                    v-model="userResume.personal_data.website"
                                ><font-awesome-icon :icon="['fab', 'chrome']" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>

                            <!-- :mask="'(+####)-###-###-####'" -->
                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="Phone number"
                                    name="phone"
                                    v-validate="{ regex: /^([0-9+()-]+)$/ }"
                                    :error-messages="errors ? errors.collect('phone') : null"
                                    v-model="userResume.personal_data.phone"
                                ><font-awesome-icon :icon="['fas', 'phone']" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>

                            <!-- userResume.social_links: {{ userResume.social_links }} -->
                            <v-flex xs12 sm8 class="px-3">
                                <v-select
                                    label="Social links"
                                    :items="social_links"
                                    attach
                                    chips
                                    multiple
                                    dense
                                    small-chips
                                    deletable-chips
                                    item-text="name"
                                    return-object
                                    v-model="userResume.social_links"
                                ></v-select>
                            </v-flex>

                            <!-- url: { require_protocol: true }} -->
                            <v-flex xs12 sm4 class="px-3" v-for="(social_link, index) of userResume.social_links" :key="index">
                                <v-text-field
                                    :label="social_link.name"
                                    :name="social_link.slug"
                                    v-validate="{ required: true }"
                                    :error-messages="errors ? errors.collect(`${social_link.slug}`) : null"
                                    v-model="userResume.social_links[index]['link']"
                                ><font-awesome-icon :icon="['fab', `${social_link.fontawesome}`]" slot="prepend" style="margin-top: 4px;" /></v-text-field>
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
                        <h2 class="headline mb-0">More about you</h2>
                    </v-card-title>
                    <!-- <p class="text-xs-center">(can be public or private, you choose)</p> -->

                    <v-card-text>
                        <v-layout row wrap class="mb-4">
                            <!-- <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    v-model="userResume.personal_data.gender"
                                    :items="['female', 'male']"
                                    prepend-icon="person"
                                    attach
                                    chips
                                    label="Gender"
                                    :deletable-chips="true"
                                ></v-select>
                            </v-flex> -->

                            <v-flex xs12 sm4 class="px-3">
                                <v-autocomplete
                                    label="Country of residence*"
                                    :items="loadedCountries"
                                    item-text="name"
                                    :return-object="true"
                                    chips
                                    small-chips
                                    :deletable-chips="true"
                                    v-model="userResume.personal_data.country"
                                >
                                    <font-awesome-icon :icon="['fas', 'globe-europe']" slot="prepend" style="margin-top: 4px;" />
                                </v-autocomplete>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-text-field
                                    label="City (State, region)*"
                                    :counter="50"
                                    v-validate="'max:50'"
                                    :error-messages="errors ? errors.collect('City') : null"
                                    data-vv-name="City"
                                    v-model="userResume.personal_data.city"
                                ><font-awesome-icon :icon="['fas', 'city']" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4 class="px-3">
                                <v-dialog
                                    ref="dialog"
                                    :return-value.sync="personal_data.birthday"
                                    persistent
                                    lazy
                                    full-width
                                    width="300px"
                                    v-model="modalDate"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            label="Birth date"
                                            readonly
                                            v-on="on"
                                            v-model="personal_data.birthday"
                                        ><font-awesome-icon :icon="['fas', 'birthday-cake']" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                                    </template>
                                    <v-date-picker v-model="personal_data.birthday">
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="secondary" @click="modalDate = false">Cancel</v-btn>
                                        <v-btn flat color="secondary" @click="$refs.dialog.save(personal_data.birthday)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>
                            <!-- userResume.languages: {{ userResume.languages }}<br /> -->

                        </v-layout>

                        <v-layout class="mb-4">
                            <v-flex xs12 sm4 class="px-3">
                                <v-autocomplete
                                    label="Nationality-ies*"
                                    :items="loadedCountries"
                                    item-text="name"
                                    :return-object="true"
                                    multiple
                                    chips
                                    small-chips
                                    hint="Order matters"
                                    persistent-hint
                                    :deletable-chips="true"
                                    color="secondary"
                                    v-model="userResume.personal_data.nationalities"
                                >
                                    <font-awesome-icon :icon="['fas', 'flag-usa']" slot="prepend" style="margin-top: 4px;" />
                                </v-autocomplete>
                            </v-flex>

                            <!-- <v-flex xs12 sm4 class="px-3">
                                <v-select
                                    label="Key competences"
                                    :items="loadedCompetences"
                                    item-text="name"
                                    :return-object="true"
                                    multiple
                                    chips
                                    small-chips
                                    :deletable-chips="true"
                                    v-model="userResume.key_competences"
                                ><font-awesome-icon :icon="['fas', 'star']" slot="prepend" style="margin-top: 4px;" /></v-select>
                            </v-flex> -->

                            <v-flex xs8 sm5 class="px-3">
                                <!-- item-value="name" -->
                                <v-autocomplete
                                    label="Language(s)*"
                                    :items="loadedLanguages"
                                    item-text="name"
                                    item-value="name"
                                    :return-object="true"
                                    multiple
                                    chips
                                    small-chips
                                    hint="Click checkbox to display levels"
                                    persistent-hint
                                    :deletable-chips="true"
                                    color="secondary"
                                    v-model="userResume.languages"
                                >
                                    <font-awesome-icon :icon="['fas', 'language']" slot="prepend" style="margin-top: 4px;" />
                                </v-autocomplete>
                            </v-flex>

                            <v-flex xs4 sm3 class="px-3">
                                <v-checkbox label="Display language level" color="secondary" v-model="userResume.parameters.show_language_level"></v-checkbox>
                                <!-- <v-checkbox label="Display info" color="secondary" v-model="userResume.parameters.show_language_level"></v-checkbox> -->
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap v-if="userResume.parameters.show_language_level" class="mb-4">
                            <v-flex xs4 v-for="(language, index) in userResume.languages" :key="index" class="px-3">
                                <!-- language: {{ language }}<br /> -->
                                <v-layout class="my-0 pl-3">
                                    <v-flex class="text-xs-left">
                                        <span>{{ language.name }}</span>
                                    </v-flex>
                                    <v-flex class="text-xs-right">
                                        <span>{{ language.value }}%</span>
                                    </v-flex>
                                </v-layout>
                                <v-slider
                                    v-model="language.value"
                                    label=""
                                    min="0"
                                    max="100"
                                    step="10"
                                    color="secondary"
                                    class="mt-0 pl-3"
                                ></v-slider>
                                <v-text-field
                                    :label="`Info ${language.name}`"
                                    v-model="language.info"
                                ><font-awesome-icon :icon="['fas', 'info']" slot="prepend" class="mt-1" /></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout class="mb-4">
                            <v-flex xs12 class="px-3">
                                <v-autocomplete
                                    label="Key competences"
                                    :items="loadedCompetences"
                                    item-text="name"
                                    :return-object="true"
                                    multiple
                                    chips
                                    small-chips
                                    :deletable-chips="true"
                                    color="secondary"
                                    v-model="userResume.key_competences"
                                >
                                    <font-awesome-icon :icon="['fas', 'tools']" slot="prepend" style="margin-top: 4px;" />
                                </v-autocomplete>
                            </v-flex>
                        </v-layout>             

                        <v-layout class="mb-4">
                            <v-flex xs12 sm6 class="px-3">
                                <!-- <div v-if="resumeSlug && this.userResume.personal_data && this.userResume.personal_data.picture" class="text-xs-center"> -->
                                <div v-if="resumeSlug && getCurrentPicture && getCurrentPicture.downloadUrl" class="text-xs-center">
                                    <span>Current picture: </span><br />
                                    <!-- <img :src="this.userResume.personal_data.picture.downloadUrl" height="150" /> -->
                                    <img :src="getCurrentPicture.downloadUrl" height="150" /><br />
                                    
                                </div>                
                                <v-layout row wrap align-center>
                                    <v-flex xs10>
                                        <v-text-field label="My Picture" @click='pickFile' v-model="imageName"><font-awesome-icon :icon="['fas', 'portrait']" slot="prepend" style="margin-top: 4px;" /></v-text-field>
                                        <input
                                            type="file"
                                            style="display: none"
                                            ref="image"
                                            accept="image/jpeg"
                                            data-vv-name="Picture"
                                            v-validate="'image'"
                                            @change="onFilePicked"
                                        >
                                    </v-flex>
                                    <v-flex xs2 class="text-xs-center">
                                        <v-icon @click="removeCurrentPicture" v-if="imageName">delete</v-icon>
                                    </v-flex>
                                </v-layout>
                            </v-flex>

                            <v-flex xs12 sm6>
                                <div class="text-xs-center">
                                    <img src="/images/loader.gif" width="100" v-if="uploadingNewImage" />
                                </div>
                                <div v-if="imageUrl" class="text-xs-center">
                                    <span>New picture: </span><br />
                                    <img :src="imageUrl" height="150" />
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>            
        </v-layout>
        <br />

        <v-layout row wrap pa-2 class="">
            <v-flex xs12 class="">
                <v-card :elevation="12" class="white--text def" style="">
                    <v-card-title class="error lighten-1 justify-center">
                        <h2 class="headline mb-0">Privacy & Security</h2>
                    </v-card-title>

                    <v-card-text class="">
                        <v-layout justify-center>
                            <div class="justify-center">
                                <v-radio-group 
                                    row 
                                    name="visibility" 
                                    v-validate="{ required: true }"
                                    :error-messages="errors ? errors.collect('visibility') : null"
                                    data-vv-as="Privacy"
                                    v-model="userResume.visibility"
                                >
                                    <v-radio label="Public resume" value="public" color="success"></v-radio>
                                    <v-radio label="Semi-private resume" value="semi-private" color="info"></v-radio>
                                    <v-radio label="Private resume" value="private" color="warning"></v-radio>
                                </v-radio-group>
                            </div>
                        </v-layout>
                        <v-layout row wrap>
                            <v-alert
                                value="public"
                                color="success"
                                icon="done"
                                v-if="userResume.visibility === 'public'"
                                >
                                <span class="subheading font-weight-medium">An excerpt of your resume with full access to your public data appears on the frontpage (recommanded option).</span>
                            </v-alert>
                            <v-alert
                                value="semi-private"
                                color="info"
                                icon="info"
                                v-if="userResume.visibility === 'semi-private'"
                                >
                                <span class="subheading font-weight-medium">An excerpt of your resume appears on the frontpage. But to gain full access, visitors need to ask for your authorization, or they need to enter the password that you specify below.</span>
                            </v-alert>
                            <v-alert
                                value="private"
                                color="warning"
                                icon="warning"
                                v-if="userResume.visibility === 'private'"
                                >
                                <span class="subheading font-weight-medium">Your resume is hidden (visitors are not able to find you without prior knowledge of your resume slug). To gain access to your resume, visitors need to ask for your authorization, or they need to enter the password that you specify below.</span>
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
                                    v-validate="{ required: this.userResume.updateResumeSlug && this.userResume.visibility !== 'public' ? true : false, min:4, max:30}"
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
                                    v-validate="{ required: this.userResume.password ? true : false, confirmed: this.userResume.password }"
                                    data-vv-as="Password"
                                    :error-messages="errors ? errors.collect('password_confirmation') : null"
                                    v-model="userResume.password_confirmation"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout v-if="resumeSlug">
                            <v-flex xs10 offset-xs1>
                                <v-layout justify-center>
                                    <div>
                                        <v-switch v-model="userResume.updateResumeSlug" label="Modify resume identifier" color="secondary"></v-switch>
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
                                            data-vv-as="Resume identifier"
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
            // if (!this.userResume.uploads) {
            //     this.userResume.uploads = []
            // }
            
        },
        async mounted () {   
            if (this.resumeSlug == undefined) {
                // this.userResume.template_id = 'KZn492txu3znyr8Zz4oL'
                this.loadedNewResume.slug = ''
                // this.loadedNewResume.job_title = 'Web developer'
                // this.loadedNewResume.job_description = 'Develops websites'
                // this.loadedNewResume.personal_data.firstname = 'Jean-Marc'
                // this.loadedNewResume.personal_data.lastname = 'Kleger'
                // this.loadedNewResume.personal_data.email = 'jm.kleger@gmail.com'
            }
            // if (!this.userResume.uploads) {
            //     this.userResume.uploads = []
            // }
            if (this.userResume.uploads) {
                const picture = this.userResume.uploads.find(upload => upload.type === 'profile_picture' && upload.new)
                if (picture) {
                    this.imageName = picture.name
                    const fileReader = new FileReader ()
                    fileReader.readAsDataURL(picture.file)
                    fileReader.addEventListener('load', () => {
                        this.imageUrl = fileReader.result
                    })
                } 
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
                row: '',
                social_links: [
                    {
                        name: 'Facebook',
                        slug: 'facebook',
                        link: '',
                        fontawesome: 'facebook-f'
                    },
                    {
                        name: 'LinkedIn',
                        slug: 'linkedin',
                        link: '',
                        fontawesome: 'linkedin-in'
                    },
                    {
                        name: 'Github',
                        slug: 'github',
                        link: '',
                        fontawesome: 'github'
                    },
                    {
                        name: 'Pinterest',
                        slug: 'pinterest',
                        link: '',
                        fontawesome: 'pinterest'
                    },
                    {
                        name: 'Quora',
                        slug: 'quora',
                        link: '',
                        fontawesome: 'quora'
                    },
                    {
                        name: 'Skype',
                        slug: 'skype',
                        link: '',
                        fontawesome: 'skype'
                    },
                ]
            }
        },
        computed: {
            // error () {
            //     return this.$store.getters['error']
            // },
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
            },
            getCurrentPicture () {
                if (this.userResume.uploads) {
                    return this.userResume.uploads.find(upload => upload.type === 'profile_picture')
                }
                return null
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
                const files = e.target.files
                console.log('files: ', files)
                if (files[0]) {
                    this.uploadingNewImage = true
                    this.userResume.uploads = this.userResume.uploads.filter(upload => upload.type !== 'profile_picture')
                    this.userResume.uploads.push({
                        file: files[0],
                        name: files[0].name,
                        type: 'profile_picture',
                        size_in_bytes: parseInt(files[0].size),
                        new: true
                    })
    
                    this.imageName = files[0].name
                    const fileReader = new FileReader ()
                    fileReader.readAsDataURL(files[0])
                    fileReader.addEventListener('load', () => {
                        this.imageUrl = fileReader.result
                        this.uploadingNewImage = false
                    })
                }
            },
            onChange (color) {
                console.log(color)
            },
            addUpload () {
                this.userResume.uploads = [{ name: 'abc'}]
            },
            removeCurrentPicture () {
                this.userResume.uploads = this.userResume.uploads.filter(upload => upload.type !== 'profile_picture')
                this.imageUrl = ''
                this.imageName = ''
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
    /* .border {
        margin-bottom: 30px;
        padding: 10px;
        border: 1px solid var(--v-secondary-base);
        border-radius: 10px;
    } */
    .def {
        border: 3px solid var(--v-error-lighten1)
    }
</style>