<template>
    <v-app v-cloak :style="cssProps" id="app" v-if="this.resume">
        <v-content class="background-color">
            <!-- <b>this.resume:</b> {{ this.resume }}<br /><br /><br /> -->
            <!-- <p class="primary-color">
				primaryColor: {{ this.primaryColor }}<br />
				secondaryColor: {{ this.secondaryColor }}<br />
				tertiaryColor: {{ this.tertiaryColor }}<br />
				backgroundColor: {{ this.backgroundColor }}<br />
				textColor: {{ this.textColor }}<br />
			</p><br /><br /> -->
            <!-- <p class="primary-color">Some random text</p> -->

            <!-- Section Personal data -->
            <v-layout row wrap class="margin-top margin-bottom">
                <v-flex xs12 sm8 offset-sm2>
                    <v-card elevation-10 v-if="resume.personal_data" class="secondary-color-background">
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12 class="mb-4">
                                    <h1 class="text-xs-center mb-4 text-color">{{ resume.job_title }}</h1>
                                    <h3 class="text-xs-center mb-4 px-3">{{ resume.job_description }}</h3>
                                </v-flex>
                                <v-flex v-bind="{[`xs12 sm${column}`]: true}">
                                    <v-layout row wrap align-center class="text-big">
                                        <v-flex xs12 sm6 class="pa-2">
                                            <span>{{ resume.fields['firstname'] || 'Firstname' }}: <b>{{ resume.personal_data.firstname }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.middlename">
                                            <span>{{ resume.fields['middlename'] || 'Middlename' }}: <b>{{ resume.personal_data.middlename }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2">
                                            <span>{{ resume.fields['lastname'] || 'Lastname' }}: <b>{{ resume.personal_data.lastname }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.birthday">
                                            <span>{{ resume.fields['age'] || 'Age' }}: <b>{{ calculateAge(resume.personal_data.birthday) }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.city">
                                            <span>{{ resume.fields['city'] || 'City' }}: <b>{{ resume.personal_data.city }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.country">
                                            <span>{{ resume.fields['country'] || 'Country' }}: <b>{{ resume.personal_data.country.name }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.email">
                                            <span>{{ resume.fields['email'] || 'Email' }}: <b>{{ resume.personal_data.email }}</b></span>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.phone_number">
                                            <span>{{ resume.fields['phone_number'] || 'Phone number' }}: <b>{{ resume.personal_data.phone_number }}</b></span>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap class="pa-2 text-big" v-if="resume.personal_data.nationalities || resume.languages">
                                        <v-flex xs12 sm6 v-if="resume.personal_data.nationalities">
                                            <div v-if="resume.personal_data.nationalities.length > 1" class="text-xs-left">
                                                <span>{{ resume.fields['nationalities'] || 'Nationalities' }}:</span>
                                                <ul class="list-horizontal">
                                                    <li v-for="(nationality, index) in nationalities" :key="index"><b>{{ nationality.name }}</b></li>
                                                </ul>
                                            </div>
                                            <div v-else>
                                                <span>{{ resume.fields['nationality'] || 'Nationality' }}: <b>{{ resume.personal_data.nationalities[0].name }}</b></span>
                                            </div>
                                        </v-flex>
                                        <v-flex xs12 sm6 class="text-xs-center pa-2" v-if="resume.languages">
                                            <div v-if="resume.languages.length > 1" class="text-xs-left">
                                                <span>{{ resume.fields['languages'] || 'Languages'}}:</span>
                                                <ul class="list-horizontal">
                                                    <li v-for="(language, index) in languages" :key="index">
                                                        <b>{{ language.name }}</b>
                                                        <span v-if="resume.parameters.show_languages_levels"> - {{ getLanguageQualitativeLevel(language.level) }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div v-else>
                                                <span>{{ resume.fields['language'] || 'language' }}: {{ resume.languages[0].name }}</span>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="my-3 px-2">
                                        <v-flex xs12 v-if="resume.personal_data.short_description">
                                            <span>{{ resume.personal_data.short_description }}</span>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="my-3 px-2" v-if="resume.social_networks">
                                        <v-flex xs12 class="text-xs-center">
                                            <v-chip label v-for="(social_network, index) in resume.social_networks" :key="index" class="social-link" @click="redirectTo(social_network.link)">
                                                <font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" />
                                            </v-chip>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="my-3 px-2" v-if="resume.key_competences">
                                        <v-flex xs12>
                                            {{ resume.fields['key_competences'] || 'Key competences' }}
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex xs12 sm4 v-if="profilePicture">
                                    <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="profile picture" />
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>

            <!-- Section Education -->
            <v-layout row wrap class="margin-bottom" v-if="resume.education && resume.education.length > 0">
                <v-flex xs12 sm8 offset-sm2>
                    <h2 class="text-xs-center display-1 primary-color">Education</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-expansion-panel expand :value="[1]">
                            <v-expansion-panel-content v-for="(education, index) in resume.education" :key="index" style="background: var(--secondary-color);">
                                <template v-slot:header>
                                    <h3>
                                        <v-icon :color="primaryColor" class="mr-2">school</v-icon> {{ education.title }}, {{ education.school }}
                                    </h3>
                                </template>
                                <v-icon slot="actions" color="primary">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text class="tertiary-color-background">
                                        <p v-if="!education.end_date">
                                            {{ education.city }} - {{ education.country }},
                                            <i>since {{ education.start_date }}</i>
                                        </p>
                                        <p v-else>
                                            {{ education.city }} - {{ education.country }},
                                            <i>from {{ education.start_date }} to {{ education.end_date }}</i>
                                        </p>
                                        <p>{{ education.description }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card>
                </v-flex>
            </v-layout>

            <!-- Section Work experience -->
            <v-layout row wrap class="margin-bottom" v-if="resume.work_experience && resume.work_experience.length > 0">
                <v-flex xs12 sm8 offset-sm2>
                    <h2 class="text-xs-center display-1 primary-color">Work experience</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-expansion-panel expand :value="[1]">
                            <v-expansion-panel-content v-for="(work_experience, index) in resume.work_experience" :key="index" style="background: var(--secondary-color);">
                                <template v-slot:header>
                                    <h3>
                                        <v-icon :color="primaryColor" class="mr-2">work</v-icon> {{ work_experience.job_title }} at {{ work_experience.company }}
                                    </h3>
                                </template>
                                <v-icon slot="actions" color="primary">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text class="tertiary-color-background">
                                        <p v-if="!work_experience.end_date">
                                            {{ work_experience.city }} - {{ work_experience.country }},
                                            <i>since {{ work_experience.start_date }}</i>
                                        </p>
                                        <p v-else>
                                            {{ work_experience.city }} - {{ work_experience.country }},
                                            <i>from {{ work_experience.start_date }} to {{ work_experience.end_date }}</i>
                                        </p>
                                        <p>{{ work_experience.job_description }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card>
                </v-flex>
            </v-layout>

            <!-- Section Skills -->
            <v-layout row wrap class="margin-bottom" v-if="resume.skills && resume.skills.length > 0">
                <v-flex xs12 sm8 offset-sm2>
                    <h2 class="text-xs-center display-1 primary-color">Skills</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 v-for="(skill, index) in skills" :key="index" class="pa-3 text-xs-center">
                                <!-- skill: {{ skill }}<br /> -->
                                <h3 class="text-xs-center mb-2">{{ skill[0].category }}</h3>
                                <v-layout align-center justify-center>
                                    <v-flex xs12 sm6 md4 lg3 class="mx-3" v-for="s in skill" :key="s.name">
                                        <div v-if="s.type === 'pie'">
                                            <v-progress-circular :rotate="270" :size="100" :width="15" :value="s.value" :color="primaryColor" style="">
                                                {{ s.value }}%
                                            </v-progress-circular><br />
                                            <span color="textColor">{{ s.name }}</span>
                                        </div>
                                        <div v-else>
                                            <!-- type === 'bar' -->
                                            <v-layout class="my-2">
                                                <v-flex class="text-xs-left">
                                                    <span>{{ s.name }}</span>
                                                </v-flex>
                                                <v-flex class="text-xs-right">
                                                    <span>{{ s.value }}%</span>
                                                </v-flex>
                                            </v-layout>
                                            <!-- {{ s.name }} {{ s.value }}% -->
                                            <v-progress-linear height="15" :value="s.value" :color="primaryColor" class="my-2" style="border-radius: 10px; margin: 0px 0px;"></v-progress-linear>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>

            <!-- Section Files -->
            <v-layout row wrap class="margin-bottom" v-if="files && files.length > 0">
                <v-flex xs12 sm8 offset-sm2>
                    <h2 class="text-xs-center display-1 primary-color">Files</h2>
                    <br />
                    <v-layout row wrap justify-center>
                        <v-flex xs6 md4 lg3 v-for="(file, index) in files" :key="index" class="pa-2" style="">
                            <v-card hover @click="redirectTo(file.downloadUrl)" class="secondary-color-background">
                                <v-card-title class="">
                                    <v-layout justify-center>
                                        <h3 class="text-xs-center">{{ file.title }}</h3>
                                    </v-layout>
                                </v-card-title>
                                <v-card-text class="text-xs-center">
                                    <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" :color="primaryColor" class="" /><br />
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <!-- Section Contact -->
            <v-layout row wrap id="contact" class="my-5 section" v-if="resume.parameters && resume.parameters.show_contact_form">
                <v-flex xs12 sm8 offset-sm2>
                    <h2 class="text-xs-center display-1 primary-color">{{ resume.menus['contact'] || 'Contact' }}</h2>
                    <br /><br />
                    <v-form ref="form" lazy-validation v-model="contactForm.valid">
                        <v-layout row wrap class="secondary-color-background pa-5">
                            <v-flex xs6 class="pr-3">
                                <v-text-field name="firstname_contact" :label="resume.fields['firstname'] || 'Firstname'" outline dark :color="primaryColor" :background-color="primaryColor" :rules="contactForm.firstnameRules" v-model="contactForm.firstname"></v-text-field>
                            </v-flex>
                            <v-flex xs6 class="pl-3">
                                <v-text-field outline name="lastname_template1" :label="resume.fields['lastname'] || 'Lastname'" :rules="contactForm.firstnameRules" :color="primaryColor" :background-color="primaryColor" dark v-model="contactForm.lastname"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field outline name="email_template1" :label="resume.fields['email'] || 'Email'" :rules="contactForm.emailRules" :color="primaryColor" :background-color="primaryColor" dark v-model="contactForm.email"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea outline name="message_template1" :label="resume.fields['message'] || 'Message'" :rules="contactForm.messageRules" :color="primaryColor" :background-color="primaryColor" dark v-model="contactForm.message"></v-textarea>
                            </v-flex>
                            <v-btn round block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" :color="primaryColor" :disabled="!contactForm.valid" @click.prevent="sendMessage">{{ resume.fields['send_message'] || 'Send message' }}</v-btn>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-content>

        <v-footer :color="primaryColor" class="white--text justify-center pa-4">
            <nuxt-link to="/" class="link">
                <v-layout align-center justify-center>
                    <img src="/images/logo_small.png" width="30" />&nbsp;
                    <span class="title">LoginMyCV</span>
                </v-layout>
            </nuxt-link>
            <!-- <span class="ml-2">{{ new Date() | moment('Y') }}</span> -->
        </v-footer>
    </v-app>
</template>

<script>
	import moment from 'moment'
	import Noty from 'noty'
	export default {
		inject: ['$validator'], // Inject vee-validate validator
		props: ['resume'],
		head() {
			return {
				title: this.title,
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: `Resume of ${this.resume.personal_data.firstname}`
					}
				],
				link: []
			}
		},
		mounted() {
			this.primaryColor =
				this.resume.colors && this.resume.colors.primaryColor
					? this.resume.colors.primaryColor
					: '#FFF'
			this.secondaryColor =
				this.resume.colors && this.resume.colors.secondaryColor
					? this.resume.colors.secondaryColor
					: '#7A528F'
			this.tertiaryColor =
				this.resume.colors && this.resume.colors.tertiaryColor
					? this.resume.colors.tertiaryColor
					: '#202026'
			this.backgroundColor =
				this.resume.colors && this.resume.colors.backgroundColor
					? this.resume.colors.backgroundColor
					: '#424242'
			this.textColor =
				this.resume.colors && this.resume.colors.textColor
					? this.resume.colors.textColor
					: 'FFF'

			this.profilePicture = this.resume.uploads.find(upload => upload.type === 'profile_picture')
			if (!this.profilePicture) {
				this.column = 12
			}
		},
		data() {
			return {
				title: `${this.resume.personal_data.firstname}'s resume`,
				layoutWindow: 0,
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: '',
				textColor: '',
				profilePicture: {},
				column: 8,
				contactForm: {
					valid: true,
					firstname: '',
					lastname: '',
					email: '',
					message: '',
					firstnameRules: [
						v => !!v || this.resume.contact_form_validation.firstname_is_required || 'Firstname is required',
						v => v.length <= 50 || this.resume.contact_form_validation.firstname_max_length || 'Firstname must be less than 50 characters'
					],
					lastnameRules: [
						v => !!v || this.resume.contact_form_validation.lastname_is_required || 'Lastname is required',
						v => v.length <= 50 || this.resume.contact_form_validation.lastname_max_length || 'Lastname must be less than 50 characters'
					],
					emailRules: [
						v => !!v || this.resume.contact_form_validation.email_is_required || 'Email is required',
						v => /.+@.+/.test(v) || this.resume.contact_form_validation.email_is_valid || 'Email must be valid'
					],
					messageRules: [
						v => !!v || this.resume.contact_form_validation.message_is_required || 'Message is required',
						v => v.length <= 2056 || this.resume.contact_form_validation.message_max_length || 'Message must be less than 2056 characters'
					]
				}
			}
		},
		computed: {
			cssProps() {
				return {
					'--primary-color': this.primaryColor,
					'--secondary-color': this.secondaryColor,
					'--tertiary-color': this.tertiaryColor,
					'--background-color': this.backgroundColor,
					'--text-color': this.textColor
				}
			},
			errors() {
				return this.$store.getters['errors']
			},
			skills() {
				if (this.resume.skills) {
					const res = this.resume.skills.reduce((acc, curr) => {
						if (!acc[curr.category]) acc[curr.category] = [] //If this type wasn't previously stored
						acc[curr.category].push(curr)
						return acc
					}, {})
					return res
				}
			},
			nationalities() {
				if (this.resume.personal_data.nationalities) {
					return this.resume.personal_data.nationalities
						.slice(0)
						.sort((a, b) => a.priority - b.priority)
				}
			},
			languages() {
				if (this.resume.languages) {
					return this.resume.languages.slice(0).sort((a, b) => b.level - a.level)
				}
			},
			files() {
				if (this.resume.uploads) {
					return this.resume.uploads.filter(file => file.type === 'downloadable_file')
				}
			}
		},
		methods: {
			calculateAge(birthday) {
				return moment().diff(birthday, 'years')
			},
			getLanguageQualitativeLevel(level) {
				console.log('level: ', level)
				if (level < 20) {
					return 'Beginner'
				} else if (level < 40) {
					return 'Low intermediate'
				} else if (level < 60) {
					return 'Intermediate'
				} else if (level < 80) {
					return 'High intermediate'
				} else if (level < 100) {
					return 'Advanced'
				} else if ((level = 100)) {
					return 'Mother tongue'
				}
			},
			async sendMessage() {
				try {
					if (this.$refs.form.validate()) {
						await axios.post('/send-contact-form-message', {
							data: this.contactForm,
							receiverAddress: 'me@example.com'
						})
						new Noty({
							type: 'success',
							text: this.resume.contact_form_validation.success_message || 'Your message was sent successfully.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
					} else {
						new Noty({
							type: 'error',
							text: this.resume.contact_form_validation.validation_errors || 'Please check validation errors.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
						
					}
				} catch (error) {
					console.log('error: ', error)
					new Noty({
						type: 'error',
						text: this.resume.contact_form_validation.failure_message || 'Sorry, an error ocurred and your message could not be sent.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			},
			redirectTo(link) {
				window.open(link, '_blank')
			}
		}
	}
</script>

<style scoped>
	.abc {
		background-color: yellow;
	}
	p,
	span,
	h1,
	h2,
	h3,
	h4,
	li {
		color: var(--text-color);
	}
	.text-big {
		font-size: 1.2em;
	}
	ul.list-horizontal {
		padding: 0px;
	}
	.list-horizontal li {
		display: inline-block;
		margin-right: 10px;
	}
	.list-horizontal li:before {
		content: '\2022';
		color: var(--text-color);
		font-weight: bold;
		display: inline-block;
		width: 1em;
	}
	.primary-color {
		color: var(--primary-color);
	}
	.secondary-color {
		color: var(--secondary-color);
	}
	.tertiary-color-background {
		background: var(--tertiary-color);
	}
	.background-color {
		background-color: var(--background-color);
	}
	.text-color {
		color: var(--text-color);
	}
	.secondary-color-text {
		color: var(--secondary-color);
	}
	.secondary-color-background {
		background-color: var(--secondary-color);
	}
	.margin-top {
		margin-top: 80px;
	}
	.margin-bottom {
		margin-bottom: 80px;
	}
	.link {
		text-decoration: none;
	}
	.social-link {
		background-color: var(--secondary-color);
		color: var(--primary-color);
	}
	.social-link:hover {
		background-color: var(--primary-color);
		color: var(--background-color);
	}
	>>> .v-chip__content {
		cursor: pointer !important;
	}
</style>