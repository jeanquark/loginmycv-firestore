<template>
	<v-app v-cloak :style="cssProps" id="app">
	    <v-toolbar
	      :color="secondaryColor"
	      dark
	      fixed
	      app
	      clipped-right
		  height="80px"
	    >
	      	<v-toolbar-side-icon @click.stop="sidemenu = !sidemenu"></v-toolbar-side-icon>
	      	<!-- <v-toolbar-title>Toolbar</v-toolbar-title> -->
      		<v-layout align-center justify-center fill-height hidden-sm-and-down>
		   		<v-flex xs12>
		           <div class="text-xs-center" style="vertical-align: middle;" v-scroll-spy-active="{selector: '.nav-item', class: 'custom-active'}">
						<!-- <span class="nav-item">Home</span>
						<span class="nav-item">About</span>
						<span class="nav-item">What I do</span>
						<span class="nav-item">Skills</span>
						<span class="nav-item">Contact</span> -->

						<nuxt-link class="nav-item" to="#top" v-scroll-to="{
							el: '#top',
							container: '',
							duration: '1000',
							offset: -100
						}">{{ resume.menus.presentation ? resume.menus.presentation : 'Presentation' }}</nuxt-link>
						<!-- <nuxt-link class="nav-item" to="#about" v-scroll-to="{
							el: '#about',
							container: '',
							duration: '1000',
							offset: -100
						}">About</nuxt-link> -->
						<!-- <nuxt-link class="nav-item" to="#whatIdo" v-scroll-to="{
							el: '#whatIdo',
							container: '',
							duration: '1000',
							offset: -100
						}">What I do</nuxt-link> -->
						<nuxt-link class="nav-item" to="#education" v-scroll-to="{
							el: '#education',
							container: '',
							duration: '1000',
							offset: -100
						}">{{ resume.menus.education ? resume.menus.education : 'Education & Work Experience' }}</nuxt-link>
						<nuxt-link class="nav-item" to="#skills" v-scroll-to="{
							el: '#skills',
							container: '',
							duration: '1000',
							offset: -100
						}" v-if="resume.skills && resume.skills.length > 0">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</nuxt-link>
						<nuxt-link class="nav-item" to="#files" v-scroll-to="{
							el: '#files',
							container: '',
							duration: '1000',
							offset: -100
						}" v-if="files && files.length > 0">{{ resume.menus.files ? resume.menus.files : 'Files' }}</nuxt-link>
						<nuxt-link class="nav-item" to="#contact" v-scroll-to="{
							el: '#contact',
							container: '',						
							duration: '1000',
							offset: -100
						}">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</nuxt-link>
		            </div>
	            </v-flex>
	        </v-layout>
		</v-toolbar>
		<v-navigation-drawer
			v-model="sidemenu"
			fixed
			app
		>
			<v-list dense>
				<v-list-tile 
					to="#top"
					v-scroll-to="{
						el: '#top',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon :color="primaryColor">home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title><span class="primary-color">{{ resume.menus.presentation ? resume.menus.presentation : 'Presentation' }}</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<!-- <v-list-tile 
					to="#about" 
					v-scroll-to="{
						el: '#about',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>perm_identity</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>About</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile> -->
				<!-- <v-list-tile 
					to="#whatIdo"
					v-scroll-to="{
						el: '#whatIdo',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>view_list</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>What I do</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile> -->
				<v-list-tile 
					to="#education"
					v-scroll-to="{
						el: '#education',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon :color="primaryColor">business_center</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title><span class="primary-color">{{ resume.menus.education ? resume.menus.education : 'Education & Work Experience' }}</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#skills"
					v-scroll-to="{
						el: '#skills',
						container: '',
						duration: '1000',
						offset: -100
					}"
					v-if="resume.skills && resume.skills.length > 0"
				>
					<v-list-tile-action>
						<v-icon :color="primaryColor">build</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title><span class="primary-color">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#files"
					v-scroll-to="{
						el: '#files',
						container: '',
						duration: '1000',
						offset: -100
					}"
					v-if="files && files.length > 0"
				>
					<v-list-tile-action>
						<v-icon :color="primaryColor">picture_as_pdf</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title><span class="primary-color">{{ resume.menus.files ? resume.menus.files : 'Files' }}</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#contact"
					v-scroll-to="{
						el: '#contact',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon :color="primaryColor">contact_mail</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title><span class="primary-color">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click.stop="sidemenu = !sidemenu">
					<v-list-tile-action>
						<v-icon :color="primaryColor">exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title><span class="primary-color">Close sidemenu</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-content style="background: black;">
			<!-- <v-container fluid fill-height style="border: 2px solid orange;"> -->
			<p class="white--text">
				<!-- resume: {{ this.resume }}<br /> -->
				<!-- color: {{ this.resume.color }}<br /> -->
				<!-- categories: {{ categories }}<br /> -->
				<!-- subcategories: {{ subcategories }}<br /> -->
				<!-- skills: {{ skills }}<br /> -->
				<!-- files: {{ files }}<br /> -->
			</p>
			<br /><br /><br />
			<!-- <v-layout justify-center align-center> -->
			<div v-scroll-spy="{offset: 150}">
			
				<!-- Section Intro -->
				<v-layout class="my-5 section" id="top">
					<v-flex xs12 sm8 offset-sm2>
						<v-layout>
							<v-flex xs12 sm6 style="">
								<v-chip class="primary-color-background text-color rounded-border py-2 px-3" v-if="resume.personal_data.greeting_phrase"
									><b>{{ resume.personal_data.greeting_phrase }}</b>
								</v-chip><br /><br />
								<h1 id="fullName" class="">{{ resume.personal_data.firstname }} {{ resume.personal_data.middlename ? resume.personal_data.middlename : '' }} {{ resume.personal_data.lastname }}</h1>
								<h2 class="">{{ resume.job_title }}</h2><br />

								<div class="mb-1">
									<font-awesome-icon :icon="['fas', 'envelope']" class="icon" />{{ resume.personal_data.email }}
								</div>
								<div class="mb-1" v-if="resume.personal_data.phone_number">
									<font-awesome-icon :icon="['fas', 'phone']" class="icon" /> {{ resume.personal_data.phone_number }}
								</div>
								<div class="mb-1">
									<font-awesome-icon :icon="['fas', 'map-marker']" class="icon" /> {{ resume.personal_data.city }}, {{ resume.personal_data.country ? resume.personal_data.country.name : null }}
								</div>
								<div class="mb-1" v-if="resume.personal_data.nationalities">
									<font-awesome-icon :icon="['fas', 'flag-usa']" class="icon" />
									<span v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">
										{{ nationality.name }}<span v-if="index + 1 < resume.personal_data.nationalities.length">, </span>
									</span>
								</div>
								<div class="mb-1" v-if="resume.languages">
									<font-awesome-icon :icon="['fas', 'language']" class="icon" />
									<span v-for="(language, index) in resume.languages" :key="index">
										{{ language.name }}<span v-if="index + 1 < resume.languages.length">, </span>
									</span>
								</div>								
								<br />
								<v-layout class="justify-center">
									<v-chip label class="social-link" @click="redirectTo(social_network.link)" v-for="(social_network, index) in resume.social_networks" :key="index"><font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" :color="textColor" /></v-chip>
									<!-- <v-chip label class="social-link"><font-awesome-icon :icon="['fab', 'linkedin-in']" size="2x" /></v-chip> -->
									<!-- <v-chip label class="social-link"><font-awesome-icon :icon="['fab', 'github']" size="2x" /></v-chip> -->
								</v-layout>
							</v-flex>
							<v-flex xs12 sm6 style="">
								<v-layout justify-center>
									<v-avatar
										size="350"
										color="grey lighten-4"
									>
										<img src="/images/hero.png" alt="avatar">
									</v-avatar>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>


				<!-- Section About -->
				<v-layout row wrap style="" id="about" class="my-5 section" v-if="resume.personal_data.short_description">
					<v-flex xs12 sm8 offset-sm2>
						<v-layout align-center>
							<v-flex xs12 sm6 pr-5 class="hidden-xs-only">
								<v-img src="/images/ab-img.png"></v-img>
							</v-flex>
							<v-flex xs12 sm6 style="">
								<h2>About Me</h2>
								<p>{{ resume.personal_data.short_description }}</p>
								<v-chip class="skill" v-for="(competence, index) in resume.key_competences" :key="index">{{ competence.name }}</v-chip>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>



				<!-- Section Education & Work experience -->
				<v-layout row wrap class="my-5 section" id="education">
					<v-flex xs12 sm4 offset-sm2 class="pr-4">
						<h1 class="text-xs-center">Education</h1><br />
						<v-card class="card" v-for="education in resume.education" :key="education.title">
							<v-card-title class="card-title">
								{{ education.title }} from&nbsp;<span class="primary-color accentuate italic">{{ education.school }}</span>
							</v-card-title>
							<v-card-text class="card-text">
								<p class="primary-color accentuate" v-if="!education.end_date">{{ education.start_date }}</p>
								<p class="primary-color accentuate" v-else>{{ education.start_date }} - {{ education.end_date }}</p>
								<p>{{ education.description }}</p>
							</v-card-text>
						</v-card>
					</v-flex>
					<v-flex xs12 sm4 class="pl-4">
						<h1 class="text-xs-center">Work experience</h1><br />
						<v-card class="card" v-for="(work_experience, index) in resume.work_experience" :key="index">
							<v-card-title class="card-title">
								{{ work_experience.job_title }} at&nbsp;<span class="primary-color accentuate italic">{{ work_experience.company }}</span>
							</v-card-title>
							<v-card-text class="card-text">
								<p class="primary-color accentuate" v-if="!work_experience.end_date">{{ work_experience.start_date }}</p>
								<p class="primary-color accentuate" v-else>{{ work_experience.start_date }} - {{ work_experience.end_date }}</p>
								<p>{{ work_experience.job_description }}</p>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
	


				<!-- Section Skills  -->
				<v-layout row wrap id="skills" class="my-5 section">
					<v-flex xs12 sm8 offset-sm2 style="">
						<v-layout row wrap justify-center>
							<v-flex xs12 sm6 v-for="(skill, index) in skills" :key="index" class="pa-3 text-xs-center">
								<div>
									<!-- index: {{ index }} -->
									<h1 class="text-xs-center mb-3">{{ skill[0].category }}</h1>
									<div class="mx-0" v-for="s in skill" :key="s.name">
										<div v-if="s.type === 'pie'">
											<v-progress-circular
												:rotate="270"
												:size="100"
												:width="5"
												:value="s.value"
												:color="primaryColor"
												style="background: #191919; border-radius: 50px;"
											>
												{{ s.value }}%
											</v-progress-circular><br /><br />
											{{ s.name }}
										</div>
										<div class="mb-4" v-else>
											<v-layout class="pb-0">
												<v-flex class="text-xs-left">
													<span>{{ s.name }}</span>
												</v-flex>
												<v-flex class="text-xs-right">
													<span>{{ s.value }}%</span>
												</v-flex>
											</v-layout>
											<v-progress-linear
												:color="primaryColor"
												height="15"
												:value="s.value"
												style="border-radius: 10px;"
												class="mb-0"
											></v-progress-linear>
										</div>
									</div>
								</div>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>


				<!-- Section Files -->
				<v-layout row wrap id="files" class="my-5 section" v-if="files && files.length > 0">
					<v-flex xs12 sm8 offset-sm2>
						<h1 class="text-xs-center">Files</h1>
						<br /><br />
						<v-layout row wrap justify-center>
							<v-flex xs6 md4 lg3 v-for="(file, index) in files" :key="index" class="pa-2" style="">
								<v-card hover @click="redirectTo(file.downloadUrl)" class="secondary-color-background">
									<v-card-title class="">
										<v-layout justify-center>
											<h3 class="text-xs-center text-color">{{ file.title }}</h3>
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
				<v-layout row wrap id="contact" class="my-5 section">
					<v-flex xs12 sm8 offset-sm2>
						<h1 class="text-xs-center">Contact Me</h1>
						<br /><br />
						<v-form>
							<v-layout row wrap>
								<v-flex xs6 class="pr-3">
									<v-text-field
										outline
										name="firstname_template2"
										label="First name"
										v-model="contactForm.firstname"
										v-validate="'required|max:40'"
										:error-messages="errors ? errors.collect('firstname_template2') : null"
										data-vv-as="First name"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs6 class="pl-3">
									<v-text-field
										outline
										name="lastname_template2"
										label="Last name"
										v-model="contactForm.lastname"
										v-validate="'required|max:40'"
										:error-messages="errors ? errors.collect('lastname_template2') : null"
										data-vv-as="Last name"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field
										outline
										name="email_template2"
										label="Your Email"
										v-model="contactForm.email"
										v-validate="'required|email'"
										:error-messages="errors ? errors.collect('email_template2') : null"
										data-vv-as="Email"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-textarea
										outline
										name="message_template2"
										label="Your message"
										v-model="contactForm.message"
										v-validate="'required|max:2056'"
										:error-messages="errors ? errors.collect('message_template2') : null"
										data-vv-as="Message"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-textarea>
								</v-flex>
								<v-btn round block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" :color="primaryColor" @click.prevent="sendMessage">Send message</v-btn>
							</v-layout>
						</v-form>
					</v-flex>
				</v-layout>
			</div>
			<br />
		</v-content>

		<v-footer :color="primaryColor" class="white--text justify-center py-4">
			<!-- <span class="ml-2">{{ new Date() | moment('Y') }} - </span> -->
			<nuxt-link to="/" class="link">
				<v-layout align-center justify-center>
					<img src="/images/logo_small.png" width="30" />&nbsp;
					<span class="title">LoginMyCV</span>
				</v-layout>
			</nuxt-link>
		</v-footer>
    </v-app>
</template>

<script>
	import axios from 'axios'
	import Noty from 'noty'
	import moment from 'moment'
	export default {
		inject: ['$validator'], // inject vee-validate validator
		props: ['resume'],
		head () {
		    return {
		      	title: this.title,
		      	meta: [
			        { hid: 'description', name: 'description', content: 'Ma description personnalisée' }
				],
				link: []
		    }
		},
		mounted () {
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : 'green'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : 'orange'
			this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : 'pink'
			this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : 'yellow'
			this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : 'red'
			// this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#a97afd'
			// this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
			// this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : '#202026'
			// this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#000'
			// this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#fff'
		},
		data () {
		    return {
		      	title: `${this.resume.personal_data.firstname}'s resume`,
		      	links: [
		      		{
		      			name: 'ABC',
		      			slug: 'abc'
		      		},
		      		{
		      			name: 'DEF',
		      			slug: 'def'
		      		}
		      	],
				//   drawer: false,
				sidemenu: false,
      			// drawerRight: null,
      			// right: false,
				  // left: false
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: '',
				textColor: '',
				contactForm: {
					firstname: '',
					lastname: '',
					email: '',
					message: ''
				},
				skills2: {
					technical_skills: {
						name: 'Technical skills',
						slug: 'technical_skills',
						type: 'category',
						items: [
							{
								name: 'Software skills',
								slug: 'software_skills',
								type: 'subcategory',
								items: [
									{
										name: 'PHP',
										value: 50
									},
									{
										name: 'Photoshop',
										value: 60
									}
								]
							},
							{
								name: 'Hardware skills',
								slug: 'hardware_skills',
								type: 'subcategory',
								items: [
									{
										name: 'Linux',
										value: 20
									}
								]
							}
						]
					}
				}
		    }
		},
		computed: {
			cssProps() { 
				return {
					'--primary-color': this.primaryColor,
					'--secondary-color': this.secondaryColor,
					'--tertiary-color': this.tertiaryColor,
					'--background-collor': this.backgroundColor,
					'--text-color': this.textColor
				}
			},
			errors () {
                return this.$store.getters['errors']
            },
			skills () {
				// return this.resume.skills
				if (this.resume.skills) {
					const res = this.resume.skills.reduce((acc, curr) => {
						if(!acc[curr.category]) acc[curr.category] = [] //If this type wasn't previously stored
						acc[curr.category].push(curr)
						return acc
					},{})
					return res
				}
			},
			files () {
				if (this.resume.uploads) {
					return this.resume.uploads.filter(file => file.type === 'downloadable_file')
				}
			},
			categories () {
				const categories = []
				this.resume.skills.forEach(skill => {
					if (!categories.includes(skill.category)) {
						categories.push(skill.category)
					}
				})
				return categories
			},

			// subcategories () {
			// 	const subcategories = []
			// 	this.resume.skills.forEach(skill => {
			// 		if (!subcategories.includes(skill.subcategory)) {
			// 			subcategories.push(skill.subcategory)
			// 		}
			// 	})
			// 	return subcategories
			// },
		},
		methods: {
			formatDate (date) {
				if (date && date.length > 7) {
					return moment(date).format('YYYY MMM DD')
				} else if (date && date.length > 4) {
					return moment(date).format('YYYY MMMM')
				} else {
					return date
				}
			},
			async sendMessage () {
				try {
					await this.$validator.validateAll()
					if (this.errors && this.errors.items && this.errors.items.length > 0) {
						new Noty({
							type: 'error',
							text: 'Please check validation errors.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
					} else {
						console.log('sendMessage: ', this.contactForm)
						await axios.post('/send-contact-form-message', { 
							data: this.contactForm,
							receiverAddress: 'me@example.com'
						})
						new Noty({
							type: 'success',
							text: 'Your message was successfully sent.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
					}
				} catch (error) {
					console.log('error: ', error)
					new Noty({
						type: 'error',
						text: 'Sorry, an error ocurred and your message could not be sent.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
			},
			calculateAge (birthday) {
				return moment().diff(birthday, 'years')
			},
			getLanguageQualitativeLevel (level) {
				console.log('level: ', level)
				if (level < 20) {
					return 'Beginner'
				} else
				if (level < 40) {
					return 'Low intermediate'
				} else
				if (level < 60) {
					return 'Intermediate'
				} else
				if (level < 80) {
					return 'High intermediate'
				} else
				if (level < 100) {
					return 'Advanced'
				} else
				if (level = 100) {
					return 'Mother tongue'
				}
			},
			redirectTo (link) {
				console.log('link: ', link)
				window.open(link, '_blank')
			}
		}
	}
</script>

<style scoped>
	[v-cloak] {
		display: none;
	}
	.nav-item {
		color: #fff;
		text-decoration: none;
		font-size: 1.5em;
		font-weight: bolder;
		margin: 0px 20px;
	}
	.nav-item:hover {
		padding-bottom: 10px;
		cursor: pointer;
		color: var(--primary-color);
	}
	.custom-active {
		/* color: red; */
		padding-bottom: 10px;
		border-bottom: white solid 1px;
	}
	.label {
		margin-top: 5px;
		margin-right: 10px;
	}
	.label:hover {
		background-color: var(--primary-color);
	}
	#fullName {
		color: var(--primary-color)
	}
	
	.icon {
		margin-right: 10px;
		/* background-color: #000; */
	}
	.icon:hover {
		color: var(--primary-color);
	}
	/* .chip {
		background-color: #000;
		padding: 3px;
		border-radius: 8px;
	}
	.chip:hover {
		background-color: var(--primary-color);
		cursor: pointer;
	} */
	.social-link {
		background-color: var(--background-color);
		/* background-color: var(--primary-color); */
		/* color: var(--primary-color); */
		cursor: pointer;
	}
	.social-link:hover {
		background-color: var(--primary-color);
		color: var(--background-color);
		cursor: pointer;
	}
	.skill {
		background-color: var(--background-color);
		color: var(--text-color);
		border: 1px solid var(--primary-color);
		border-radius: 4px;
	}
	.skill:hover {
		background-color: var(--primary-color);
	}
	/* .chip {
		color: var(--primary-color);
		background-color: #fff;
		border-radius: 2px;
	}
	.chip:hover {
		color: #fff;
		background-color: var(--primary-color);
	} */
	.link {
		color: #fff;
		text-decoration: none;
	}
	.section {
		color: var(--text-color);
	}
	.card {
		color: var(--text-color);
		background-color: var(--secondary-color);
		padding: 5px 0px;
		margin: 20px 0px;
	}
	.card-title {
		/* text-align: center; */
		padding: 20px 20px;
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
	.primary-color {
		color: var(--primary-color);
	}
	.secondary-color {
		color: var(--secondary-color);
	}
	.primary-color-background {
		background-color: var(--primary-color);
	}
	.secondary-color-background {
		background-color: var(--secondary-color);
	}
	.text-color {
		color: var(--text-color);
	}
	.accentuate {
		font-weight: 500;
		white-space: nowrap;
	}
	.italic {
		font-style: italic;
	}
	/* >>>.v-chip__content { */
	>>>.v-chip__content.pointer {
		cursor: pointer !important;
	}
	.rounded-border {
		border-bottom-left-radius: 0px;
	}
</style>