<template>
    <v-app :style="cssProps" v-cloak>
        <div class="fullpage-container">

			<!-- Navigation -->
            <div class="button-group ma-4" v-if="resume.menus && (resume.education.length > 0 || resume.work_experience.length < 10 || resume.skills.length > 0)">
                <button type="button" :class="{active:index == 0}" @click="moveTo(0)">{{ resume.menus.home ? resume.menus.home : 'Presentation' }}</button>
                <button type="button" :class="{active:index == 1}" @click="moveTo(1)" v-if="resume.education && resume.education.length > 0">{{ resume.menus.education ? resume.menus.education : 'Education'}}</button>
                <button type="button" :class="{active:index == 2}" @click="moveTo(2)" v-if="resume.work_experience && resume.work_experience.length > 0">{{ resume.menus.work_experience ? resume.menus.work_experience : 'Work experience' }}</button>
                <button type="button" :class="{active:index == 3}" @click="moveTo(3)" v-if="resume.skills && resume.skills.length > 0">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</button>
                <button type="button" :class="{active:index == 4}" @click="moveTo(4)" v-if="resume.parameters && resume.parameters.show_contact_form">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</button>
            </div>


            <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
                
                

				<!-- Section Personal Data -->
                <div class="page-1 page" data-index="0" style="max-height: 100%; overflow-y: auto; display: block; border: 2px solid blue;" ref="page">
                    <v-row no-gutters align="center" class="subpage pt-3" v-animate="{value: animationEffect}" style="border: 2px solid green;">
                        <v-col cols="12" class="text-center pa-3 rounded-border" style="">
                            <v-row no-gutters justify="center" v-if="profilePicture">
                                <v-col cols="12" sm="6" class="text-center" >
                                    <v-avatar :tile="false" :size="300" color="grey lighten-4">
                                        <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="profile picture" />
                                    </v-avatar>
                                </v-col>
                            </v-row>
                            <h1 class="primary-color">{{ resume.personal_data.firstname }} {{ resume.personal_data.middlename }} {{ resume.personal_data.lastname }}</h1><br />
                            <h2>{{ resume.job_title }}</h2><br />
                            <h3>{{ resume.job_description }}</h3>
                            <br /><br />
                            <v-row no-gutters justify="center" align="center" class="text-big">
                                <v-col cols="4" class="mb-3 text-center" v-if="resume.personal_data.city || resume.personal_data.country">
                                    <div v-if="resume.personal_data.city">
                                        <font-awesome-icon :icon="['fas', 'map-marker']" size="1x" /> {{ resume.personal_data.city }}, {{ resume.personal_data.country.name }}
                                    </div>
                                    <div v-else>
                                        <font-awesome-icon :icon="['fas', 'map-marker']" size="1x" /> {{ resume.personal_data.country.name }}
                                    </div>
                                </v-col>
                                <v-col cols="4" class="mb-3 text-center" v-if="resume.personal_data.email">
                                    <font-awesome-icon :icon="['fas', 'envelope']" size="1x" class="icon" /> {{ resume.personal_data.email }}
                                </v-col>
                                <v-col cols="4" class="mb-3" v-if="resume.personal_data.phone_number">
                                    <font-awesome-icon :icon="['fas', 'phone']" size="1x" class="icon" /> {{ resume.personal_data.phone_number }}
                                </v-col>
                                <v-col cols="4" class="mb-3" v-if="resume.personal_data.nationalities">
                                    <font-awesome-icon :icon="['fas', 'flag-usa']" size="1x" class="icon" />
                                    <span v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">
                                        {{ nationality.name }}<span v-if="index + 1 < resume.personal_data.nationalities.length">, </span>
                                    </span>
                                </v-col>
                                <v-col cols="4" class="mb-3" v-if="resume.languages">
                                    <font-awesome-icon :icon="['fas', 'language']" size="1x" class="icon" />
                                    <v-chip :color="primaryColor" class="px-2 py-1 ma-2 text-background-color" v-for="(language, index) in resume.languages" :key="index">
                                        {{ language.name }}
                                        <v-progress-linear :color="getLanguageLevelColor(language.value)" height="10" :value="language.value" bottom style="width: 30px; transform: rotate(-90deg);" v-if="language.value"></v-progress-linear>
                                    </v-chip>
                                </v-col>
                                <v-col cols="4" class="text-center" v-if="resume.social_networks">
                                    <font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)" class="social-link mx-3" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-4 pa-4 centered" style="">
								<br /><br /><br /><br />
                                <div class="text-center mx-4" v-for="(file, index) in files" :key="index">
                                    <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" class="social-link" @click="redirectTo(file.downloadUrl)" />
                                    <br />
                                    <p>{{ file.name }}</p>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>

				<!-- Section Education -->
				<div class="page-2 page align-center" data-index="1" style="height: 100%; overflow-y: auto; border: 2px solid blue;">
                    <v-row no-gutters justify="center" align="center" class="subpage pt-3" style="height: 100%; border: 2px solid green;" v-if="resume.education && resume.education.length > 0" v-animate="{value: animationEffect}">
                        <v-col cols="12" sm="6" md="4" v-for="education in resume.education" :key="education.title" class="pa-2" style="">
                            <v-card class="card text-color secondary-color-background" style="">
                                <v-card-title class="card-title">
                                    <span class="text-color font-weight-bold">{{ education.title }}</span>&nbsp;from&nbsp;<span class="primary-color font-weight-bold font-italic">{{ education.school }}</span><br />
                                </v-card-title>
                                <v-card-text class="card-text text-color" style="">
                                    <p class="text-color" v-if="!education.end_date">{{ education.start_date }}</p>
                                    <p class="text-color" v-else>{{ education.start_date }} - {{ education.end_date }}</p>
                                    <p class="text-color">{{ education.description }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

				<!-- Section Work Experience -->
				<div class="page-3 page align-center" data-index="2" style="height: 100%; overflow-y: auto; border: 2px solid blue;">
                    <v-row no-gutters justify="center" align="center" style="border: 2px solid green;" class="subpage pt-3" v-if="resume.work_experience && resume.work_experience.length > 0">
                        <v-col cols="12" sm="6" md="4" v-for="(work_experience, index) in resume.work_experience" :key="index" v-animate="{value: animationEffect}" class="pa-2">
                            <v-card class="card secondary-color-background" style="">
                                <v-card-title class="card-title text-color">
                                    <span class="font-weight-bold">{{ work_experience.job_title }}</span>&nbsp;at&nbsp;<span class="primary-color font-weight-bold font-italic">{{ work_experience.company }}</span><br />
                                </v-card-title>
                                <v-card-text class="card-text text-color">
                                    <p class="text-color font-italic" v-if="!work_experience.end_date">{{ work_experience.start_date }}</p>
                                    <p class="text-color font-italic" v-else>{{ work_experience.start_date }} - {{ work_experience.end_date }}</p>
                                    <p class="text-color">{{ work_experience.job_description }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

				<!-- Section Skills -->
				<div class="page-4 page align-center" data-index="3" style="height: 100%; overflow-y: auto; border: 2px solid blue;">
                    <v-row no-gutters justify="center" align="center" class="subpage pt-3" style="" v-animate="{value: animationEffect}" v-if="resume.skills && resume.skills.length > 0">
                        <v-col cols="12" sm="6" v-for="skill in skills" :key="skill.slug" class="pa-4 text-center" style="">
                            <h2 class="text-center mb-2">{{ skill[0].category }}</h2>
                            <v-row no-gutters justify="center">
                                <v-col cols="12" sm="6" class="my-4 mx-0 px-3" v-for="s in skill" :key="s.name">
                                    <div v-if="s.type === 'pie'" class="">
                                        <v-progress-circular :rotate="270" :size="100" :width="10" :value="s.value" :color="secondaryColor" class="pie">
                                            <span class="text-color">{{ s.value }}%</span>
                                        </v-progress-circular><br /><br />
                                        {{ s.name }}
                                    </div>
                                    <div v-else class="">
                                        <v-row no-gutters>
                                            <v-col class="text-left py-2">
                                                <span>{{ s.name }}</span>
                                            </v-col>
                                            <v-col class="text-right py-2">
                                                <span>{{ s.value }}%</span>
                                            </v-col>
                                        </v-row>
                                        <v-progress-linear :color="secondaryColor" height="20" :value="s.value" class="bar"></v-progress-linear>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>

				<!-- Section Contact -->
				<div class="page-5 page align-center" data-index="4" style="height: 100%; overflow-y: auto; border: 2px solid blue;">
                    <v-row no-gutters justify="center" align="center" class="subpage pt-3" style="" v-animate="{value: animationEffect}" v-if="resume.parameters && resume.parameters.show_contact_form">
                        <v-col cols="12" sm="10" md="8" class="pa-4" style="">
							<h1 class="text-center">{{ resume.menus['contact'] || 'Contact' }}</h1>
							<br /><br />
                            <v-form style="">
                                <v-row no-gutters justify="center">
                                    <v-col cols="6" class="pr-3">
                                        <v-text-field outlined name="firstname_template3" :label="resume.fields['firstname'] || 'Firstname'" :rules="contactForm.firstnameRules" v-model="contactForm.firstname"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="pl-3">
                                        <v-text-field outlined name="lastname_template3" :label="resume.fields['lastname'] || 'Lastname'" :rules="contactForm.lastnameRules" v-model="contactForm.lastname"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field outlined dark name="email_template3" :label="resume.fields['email'] || 'Email'" :rules="contactForm.emailRules" v-model="contactForm.email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea outlined dark name="message_template3" :label="resume.fields['message'] || 'Message'" :rules="contactForm.messageRules" v-model="contactForm.message"></v-textarea>
                                    </v-col>
                                    <v-btn rounded block large class="white--text pt-0 pb-0" :color="primaryColor">{{ resume.fields['send_message'] || 'Send message' }}</v-btn>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-row>
                </div>

				<div class="page-6 page" style="overflow-y: auto;">
                    <div style="height: 1200px; border: 2px solid red;">
                        <h1 class="part-1" v-animate="{value: 'bounceInLeft'}">vue-fullpage.js</h1>
                        <h3 class="" v-animate="{value: 'bounceInLeft'}">A sigle-page scroll plugin based on vue@2.x,support for mobile and PC .</h3>
                        <div>
                            <p class="part-1" v-animate="{value: 'bounceInRight'}">vue-fullpage</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
	import axios from 'axios'
	import Noty from 'noty'

	export default {
		inject: ['$validator'], // Inject vee-validate validator
		props: ['resume'],
		head() {
			return {
				title: this.title,
				meta: [{ hid: 'description', name: 'description', content: 'Ma description personnalisée' }],
				link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' }]
			}
		},
		mounted() {
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
			this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : '#424242'
			this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#7A528F'
			this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#FFF'
			this.profilePicture = this.resume.uploads.find(upload => upload.type === 'profile_picture')
		},
		data() {
			return {
				index: 0,
				pageNum: 0,
				opts: {
					start: 0,
					dir: 'v',
					loop: false,
					duration: 300,
					beforeChange: function(ele, current, next) {
						console.log('before', current, next)
						this.index = next
					},
					afterChange: function(ele, current) {
						this.index = current
						console.log('after', current)
					}
				},
				contactForm: {
					firstname: '',
					lastname: '',
					email: '',
					message: ''
				},
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: '',
				textColor: '',
				profilePicture: {},
				column: 6,
				animationEffect: 'zoomIn'
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
			loading() {
				return this.$store.getters['loading']
			},
			errors() {
				return this.$store.getters['errors']
			},
			snackbar() {
				return this.$store.getters['snackbar']
			},
			clearSnackbar() {
				return this.$store.commit('clearSnackbar', false, { root: true })
			},
			skills() {
				if (this.resume.skills) {
					const res = this.resume.skills.reduce((acc, curr) => {
						if (!acc[curr.category]) acc[curr.category] = [] // If this type wasn't previously stored
						acc[curr.category].push(curr)
						return acc
					}, {})
					return res
				}
			},
			nationalities() {
				if (this.resume.personal_data.nationalities) {
					return this.resume.personal_data.nationalities.slice(0).sort((a, b) => a.priority - b.priority)
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
			},
			presentationColumns() {
				if (this.files && this.files.length > 0) {
					return 6
				}
				return 12
			}
		},
		methods: {
			setIndex(newIndex) {
				// console.log('newIndex: ', newIndex)
				this.index = newIndex
			},
			moveTo: function(index) {
				this.$refs.fullpage.$fullpage.moveTo(index, true)
			},
			showPage: function() {
				this.pageNum++
				this.$refs.fullpage.$fullpage.$update()
			},
			calculateAge(birthday) {
				return moment().diff(birthday, 'years')
			},
			getLanguageLevelColor(level) {
				if (level < 25) {
					return 'error'
				} else if (level <= 50) {
					return 'warning'
				} else if (level <= 75) {
					return 'info'
				} else {
					return 'success'
				}
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
					this.$store.commit('setLoading', true)
					await this.$validator.validateAll()
					if (this.errors && this.errors.items && this.errors.items.length > 0) {
						this.$store.commit('setLoading', false)
						new Noty({
							type: 'error',
							text: 'Please check validation errors.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
					} else {
						console.log('sendMessage: ', this.form)
						await axios.post('/send-contact-form-message', {
							data: this.contactForm,
							receiverAddress: this.resume.personal_data.email,
							resumeSlug: this.resume.slug
						})
						this.$store.commit('setLoading', false)
						new Noty({
							type: 'success',
							text: 'Your message was sent successfully.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
						this.$store
					}
				} catch (error) {
					console.log('error: ', error)
					this.$store.commit('setLoading', false)
					new Noty({
						type: 'error',
						text: 'Sorry, an error ocurred and your message could not be sent.',
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
	[v-cloak] {
		display: none;
	}
	* {
		-webkit-overflow-scrolling: touch;
	}
	body {
		margin: 0;
		color: green;
	}
	/* .fullpage-container {
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
		} */
	.fullpage-wp {
		display: flex;
		width: 100%;
		height: 100%;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.fullpage-wp.anim {
		transform: translate3d(0, 0, 0);
		-webkit-transition: all 500ms ease-out 0s;
		transition: all 500ms ease-out 0s;
	}
	.fullpage-wp.fullpage-wp-h {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	/* .page {
			box-sizing: border-box;
			display: block;
			position: relative;
			width: 100%;
			height: 100%;
			flex-shrink: 0;
			overflow: hidden;
		} */

	.button-group {
		position: absolute;
		/* top: 30px; */
		/* left: 30px; */
		z-index: 9;
		width: 100%;
		/* padding-top: 30px; */
		/* padding-left: 30px; */
		margin-bottom: 50px;
	}
	.button-group button {
		display: inline-block;
		/* margin: 10px; */
		color: #000;
		background: #fff;
		background: rgba(255, 255, 255, 0.5);
		-webkit-border-radius: 10px;
		border-radius: 10px;
		padding: 9px 18px;
		border: none;
		outline: none;
	}
	.button-group button.active {
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
	}

	.animated {
		opacity: 1;
	}

	.fullpage-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.page {
		display: block;
		height: 100%;
		overflow-y: auto;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
	.subpage {
		margin-top: 50px;
		margin-bottom: 20px;
	}
	.page-1 {
		padding-top: 50px;
		background-image: linear-gradient(120deg, var(--background-color), #fff);
	}
	.page-2 {
		padding-top: 50px;
		background-image: linear-gradient(120deg, var(--primary-color), #fff);
	}
	.page-3 {
		padding-top: 50px;
		background-image: linear-gradient(120deg, var(--background-color), #fff);
	}
	.page-4 {
		padding-top: 50px;
		background-image: linear-gradient(120deg, var(--primary-color), #fff);
	}
	.page-5 {
		padding-top: 50px;
		background-image: linear-gradient(120deg, var(--background-color), #fff);
	}

	.text-color {
		color: var(--text-color);
	}
	.primary-color {
		/* color: yellow; */
		color: var(--primary-color);
	}
	.secondary-color-background {
		background: var(--secondary-color);
	}

	.text-big {
		font-size: 1.2em;
	}
	.centered {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.active {
		color: red;
	}
	.pie {
		background: var(--primary-color);
		border-radius: 50px;
	}
	.bar {
		border-radius: 10px;
		margin: 0px 0px;
	}
	.rounded-border {
		border-radius: 10px;
	}
	/*>>.theme--dark.v-label {
			color: yellow;
		}
		.theme--dark.v-input:not(.v-input--is-disabled) input, .theme--dark.v-input:not(.v-input--is-disabled) textarea {
			color: #000;
		}*/

	.social-link {
		color: var(--text-color);
	}
	.social-link:hover {
		color: var(--primary-color);
		cursor: pointer;
	}

	.card {
		color: var(--text-color);
		background-color: var(--secondary-color);
		padding: 5px 0px;
		border-radius: 10px;
	}
	.card-title {
		/* text-align: center; */
		padding: 10px 20px;
		font-size: 1.3em;
	}
	.card-text {
		padding: 0px 20px;
	}
	.card-date {
		color: var(--primary-color);
		font-weight: 500;
		padding: 10px 0px;
	}

	/* ::-webkit-scrollbar {
			width: 15px;
		}
		::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 5px;
			z-index: 10;
		}
		::-webkit-scrollbar-thumb {
			background: var(--background-color);
			border-radius: 5px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: var(--text-color);
		} */
	>>> .v-text-field--outline .v-label {
		color: var(--text-color);
	}
</style>