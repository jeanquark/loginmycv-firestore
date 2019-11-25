<template>
        <v-app v-cloak :style="cssProps">
        <!-- <v-content class="background-color"> -->
        <v-container class="background-color">
            <v-row no-gutters class="margin-top margin-bottom">
                <v-col cols="12" sm="8" offset-sm="2">
                    <v-card elevation-10 v-if="resume.personal_data" class="secondary-color-background">
                        <v-card-text>
                            <v-row no-gutters>
                                <v-col cols="12" class="my-5">
                                    <h1 class="text-center mb-4 text-color">{{ resume.job_title }}</h1>
                                    <h3 class="text-center mb-4 px-3">{{ resume.job_description }}</h3>
                                </v-col>
                            </v-row>
                            <v-row no-gutters align="start">
                                <v-col cols="9" style="">
                                    <v-row no-gutters align="center" class="text-big">
                                        <v-col cols="12" sm="6" class="pa-2">
                                            <span>{{ resume.fields['firstname'] || 'Firstname' }}: <b>{{ resume.personal_data.firstname }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.middlename">
                                            <span>{{ resume.fields['middlename'] || 'Middlename' }}: <b>{{ resume.personal_data.middlename }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2">
                                            <span>{{ resume.fields['lastname'] || 'Lastname' }}: <b>{{ resume.personal_data.lastname }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.birthday">
                                            <span>{{ resume.fields['age'] || 'Age' }}: <b>{{ calculateAge(resume.personal_data.birthday) }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.city">
                                            <span>{{ resume.fields['city'] || 'City' }}: <b>{{ resume.personal_data.city }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.country">
                                            <span>{{ resume.fields['country'] || 'Country' }}: <b>{{ resume.personal_data.country.name }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.email">
                                            <span>{{ resume.fields['email'] || 'Email' }}: <b>{{ resume.personal_data.email }}</b></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2">
                                            <span>{{ resume.fields['phone_number'] || 'Phone number' }}: <b>{{ resume.personal_data.phone_number }}</b></span>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="pa-2 text-big" v-if="resume.personal_data.nationalities || resume.languages">
                                        <v-col cols="12" sm="6" v-if="resume.personal_data.nationalities">
                                            <div v-if="resume.personal_data.nationalities.length > 1" class="text-left">
                                                <span>{{ resume.fields['nationalities'] || 'Nationalities' }}:</span>
                                                <ul class="list-horizontal">
                                                    <li v-for="(nationality, index) in nationalities" :key="index"><b>{{ nationality.name }}</b></li>
                                                </ul>
                                            </div>
                                            <div v-else>
                                                <span>{{ resume.fields['nationality'] || 'Nationality' }}: <b>{{ resume.personal_data.nationalities[0].name }}</b></span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="text-center pa-2" v-if="resume.languages">
                                            <div v-if="resume.languages.length > 1" class="text-center">
                                                <div class="mb-2 text-color">{{ resume.fields['languages'] || 'Languages'}}:</div>
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
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="my-3 px-2">
                                        <v-col cols="12" v-if="resume.personal_data.short_description">
                                            <span>{{ resume.personal_data.short_description }}</span>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="my-3 px-2" v-if="resume.social_networks">
                                        <v-col cols="12" class="text-center">
                                            <span v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)">
                                                <font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" class="social-link" />
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="my-3 px-2" v-if="resume.key_competences">
                                        <v-col cols="12">
                                            {{ resume.fields['key_competences'] || 'Key competences' }}
                                        </v-col>
                                    </v-row>

                                </v-col>
                                <v-col cols="3" v-if="profilePicture" style="">
                                    <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" max-width="100%" alt="profile picture" />
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Work experience -->
            <v-row no-gutters class="margin-bottom" v-if="resume.work_experience && resume.work_experience.length > 0" style="">
                <v-col cols="12" sm="8" offset-sm="2" style="">
                    <h2 class="text-center display-1 primary-color">{{ resume.menus['work_experience'] || 'Work Experience' }}</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-expansion-panels multiple accordion v-model="openedPanels">
                            <v-expansion-panel v-for="(work_experience, index) in resume.work_experience" :key="index" style="">
                                <v-expansion-panel-header class="tertiary-color-background" style="">
                                    <v-row no-gutters align="center">
                                        <h3>
                                            <v-icon :color="primaryColor" class="mr-2">mdi-briefcase</v-icon> {{ work_experience.job_title }} at {{ work_experience.company }}
                                        </h3>
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="tertiary-color-background" style="">
                                    <v-card flat>
                                        <v-card-text class="secondary-color-background">
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
                        </v-expansion-panels>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Education -->
            <v-row no-gutters class="margin-bottom" v-if="resume.education && resume.education.length > 0">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color">{{ resume.menus['education'] || 'Education' }}</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-expansion-panels multiple accordion v-model="openedPanels">
                            <v-expansion-panel v-for="(education, index) in resume.education" :key="index">
                                <v-expansion-panel-header class="tertiary-color-background">
                                    <v-row no-gutters align="center">
                                        <h3>
                                            <v-icon :color="primaryColor" class="mr-2">mdi-school</v-icon> {{ education.title }}, {{ education.school }}
                                        </h3>
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="tertiary-color-background">
                                    <v-card flat>
                                        <v-card-text class="secondary-color-background">
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
                        </v-expansion-panels>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Skills -->
            <v-row no-gutters class="margin-bottom" v-if="resume.skills && resume.skills.length > 0">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color">{{ resume.menus['skills'] || 'Skills' }}</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-row no-gutters justify="center">
                            <v-col cols="12" class="text-center pa-3" v-for="(skill, index) in skills" :key="index">
                                <h3 class="text-center mb-2">{{ skill[0].category }}</h3>
                                <v-row no-gutters justify="center" align="center">
                                    <v-col cols="12" sm="6" lg="3" class="mx-3" v-for="s in skill" :key="s.name">
                                        <div v-if="s.type === 'pie'">
                                            <v-progress-circular :rotate="270" :size="100" :width="15" :value="s.value" :color="primaryColor" style="">
                                                {{ s.value }}%
                                            </v-progress-circular><br />
                                            <span color="textColor">{{ s.name }}</span>
                                        </div>
                                        <div v-else>
                                            <v-row no-gutters class="my-2">
                                                <v-col class="text-left">
                                                    <span>{{ s.name }}</span>
                                                </v-col>
                                                <v-col class="text-right">
                                                    <span>{{ s.value }}%</span>
                                                </v-col>
                                            </v-row>
                                            <v-progress-linear height="15" :value="s.value" :color="primaryColor" class="my-2" style="border-radius: 10px; margin: 0px 0px;"></v-progress-linear>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Files -->
            <v-row no-gutters class="margin-bottom" v-if="files && files.length > 0">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color">{{ resume.menus['files'] || 'Files' }}</h2>
                    <br />
                    <v-row no-gutters justify="center">
                        <v-col cols="6" md="4" lg="3" class="pa-2" v-for="(file, index) in files" :key="index">
                            <v-hover v-slot:default="{ hover }">
                                <v-card @click="redirectTo(file.downloadUrl)" :elevation="hover ? '12' : '0'" class="secondary-color-background">
                                    <v-card-title class="">
                                        <v-row no-gutters justify="center">
                                            <h5 class="text-center text-color">{{ file.title }}</h5>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text class="text-center">
                                        <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" :class="[hover ? 'tertiary-color' : 'primary-color']" /><br />
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Section Contact -->
            <v-row no-gutters class="margin-bottom" id="contact" v-if="resume.parameters && resume.parameters.show_contact_form">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color">{{ resume.menus['contact'] || 'Contact' }}</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-form ref="form" lazy-validation v-model="contactForm.valid">
                            <v-row class=" pa-5 ">
                                <v-col xs="6" class="pr-3">
                                    <v-text-field name="firstname_contact" :label="resume.fields['firstname'] || 'Firstname'" outlined dark :color="primaryColor" :background-color="primaryColor" :rules="contactForm.firstnameRules" v-model="contactForm.firstname"></v-text-field>
                                </v-col>
                                <v-col xs="6" class="pl-3">
                                    <v-text-field outlined name="lastname_template1" :label="resume.fields['lastname'] || 'Lastname'" :rules="contactForm.lastnameRules" :color="primaryColor" :background-color="primaryColor" dark v-model="contactForm.lastname"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field outlined name="email_template1" :label="resume.fields['email'] || 'Email'" :rules="contactForm.emailRules" :color="primaryColor" :background-color="primaryColor" dark v-model="contactForm.email"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea outlined name="message_template1" :label="resume.fields['message'] || 'Message'" :rules="contactForm.messageRules" :color="primaryColor" :background-color="primaryColor" dark v-model="contactForm.message"></v-textarea>
                                </v-col>
                                <v-btn rounded block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" :color="primaryColor" :disabled="!contactForm.valid" @click.prevent="sendMessage">{{ resume.fields['send_message'] || 'Send message' }}</v-btn>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <!-- </v-content> -->
        </v-container>

        <v-footer :color="primaryColor" class="white--text justify-center my-4">
            <nuxt-link to="/" class="link">
                <v-row no-gutters justify="center" align="center" class="py-4">
                    <img src="/images/logo_small.png" width="30" />&nbsp;
                    <span class="title">LoginMyCV</span>
                </v-row>
            </nuxt-link>
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
				openedPanels: [0],
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
	.button {
		padding-top: 0px;
		padding-bottom: 0px;
	}
	.primary-color {
		color: var(--primary-color);
	}
	.primary-color-background {
		background: var(--primary-color);
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
		margin: 0 8px;
		cursor: pointer;
	}
	.social-link:hover {
		color: var(--background-color);
	}
	.progress-linear {
		border-radius: 10px;
		margin: 0px 0px;
		background: var(--primary-color);
		color: var(--primary-color);
	}
	/*>>> .v-text-field--outline .v-label {
			color: var(--text-color);
		}*/
	>>> .theme--dark.v-label {
		color: var(--text-color);
	}
</style>