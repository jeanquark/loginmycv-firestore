<template>
	<v-app v-cloak style="" :style="cssProps" id="app">
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
						}">Home</nuxt-link>
						<nuxt-link class="nav-item" to="#about" v-scroll-to="{
							el: '#about',
							container: '',
							duration: '1000',
							offset: -100
						}">About</nuxt-link>
						<nuxt-link class="nav-item" to="#whatIdo" v-scroll-to="{
							el: '#whatIdo',
							container: '',
							duration: '1000',
							offset: -100
						}">What I do</nuxt-link>
						<nuxt-link class="nav-item" to="#education" v-scroll-to="{
							el: '#education',
							container: '',
							duration: '1000',
							offset: -100
						}">Education & Work experience</nuxt-link>
						<nuxt-link class="nav-item" to="#skills" v-scroll-to="{
							el: '#skills',
							container: '',
							duration: '1000',
							offset: -100
						}">Skills</nuxt-link>
						<nuxt-link class="nav-item" to="#contact" v-scroll-to="{
							el: '#contact',
							container: '',						
							duration: '1000',
							offset: -100
						}">Contact</nuxt-link>
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
						<v-icon>home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Home</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
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
				</v-list-tile>
				<v-list-tile 
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
				</v-list-tile>
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
						<v-icon>business_center</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Education & Work experience</v-list-tile-title>
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
				>
					<v-list-tile-action>
						<v-icon>build</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Skills</v-list-tile-title>
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
						<v-icon>contact_mail</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Contact</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click.stop="sidemenu = !sidemenu">
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Close sidemenu</v-list-tile-title>
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
			</p>
			<br /><br /><br />
			<!-- <v-layout justify-center align-center> -->
			<div v-scroll-spy="{offset: 150}">
			
				<!-- Section Intro -->
				<v-layout class="my-5 section" id="top">
					<v-flex xs12 sm8 offset-sm2>
						<v-layout>
							<v-flex xs12 sm6 style="">
								<v-chip class="primary-color" text-color="white" style="margin: 0px; padding: 6px 20px; border-bottom-left-radius: 0px;"><b>Hello, I'm</b></v-chip><br /><br />
								<h1 id="fullName" class="">Alex Johnson</h1>
								<h2 class="white--text">Product Designer</h2><br />

								<font-awesome-icon :icon="['fas', 'envelope']" class="icon" />getemail@email.com<br />
								<font-awesome-icon :icon="['fas', 'phone']" class="icon" /> +12 986 987 7867<br />
								<font-awesome-icon :icon="['fas', 'location-arrow']" class="icon" /> 37, Pollsatnd, New York, United State<br />
								
								<br />
								<v-layout class="justify-center">
									<v-chip label class="social-link" @click="redirectTo(social.link)" v-for="(social, index) in resume.social_links" :key="index"><font-awesome-icon :icon="['fab', social.fontawesome]" size="2x" /></v-chip>
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
				<v-layout row wrap style="" id="about" class="my-5 section">
					<v-flex xs12 sm8 offset-sm2>
						<v-layout align-center>
							<v-flex xs12 sm6>
								<v-img src="/images/ab-img.png"></v-img>
							</v-flex>
							<v-flex xs12 sm6 style="">
								<h2>About Me</h2>
								<p>Hello, I’m a Patrick, web-developer based on Paris. I have rich experience in web site design & building and customization. Also I am good at</p>
								<v-chip class="skill">php</v-chip>
								<v-chip class="skill">html</v-chip>
								<v-chip class="skill">css</v-chip>
								<v-chip class="skill">wordpress</v-chip>
								<v-chip class="skill">react</v-chip>
								<v-chip class="skill">javascript</v-chip>
								<br /><br />
								<v-chip :color="primaryColor" text-color="white" style="padding: 6px 20px; border-radius: 25px;"><b>Download CV</b></v-chip><br />
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>


				<!-- Section What I do -->
				<v-layout row wrap style="" id="whatIdo" class="my-5 section">
					<v-flex xs12 sm8 offset-sm2>
						<h2 class="text-xs-center">What I do</h2><br /><br />
						<v-layout>
							<v-flex xs12 sm6 v-for="index in 3" :key="index" class="">
								<v-card color="#202026">
									<v-card-title primary-title>
										<div>
											<h3 class="headline mb-0 white--text">UI Design</h3>
										</div>
									</v-card-title>

									<v-card-text class="white--text">
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>


				<!-- Section Education & Work experience -->
				<v-layout row wrap class="my-5 section" id="education" style="border: 2px solid red;">
					<v-flex xs12 sm4 offset-sm2 class="pr-4">
						<h2 class="text-xs-center">Education</h2><br />
						<v-card class="card" v-for="education in resume.education" :key="education.title">
							<v-card-title class="card-title">
								<p>{{ education.title }} from&nbsp;<span class="primaryColor accentuate italic">{{ education.school }}</span></p>
							</v-card-title>
							<v-card-text class="card-text">
								<p class="primaryColor accentuate">{{ formatDate(education.start_date) }} - {{ formatDate(education.end_date) }}</p>
								<p>{{ education.description }}</p>
							</v-card-text>
						</v-card>
					</v-flex>
					<v-flex xs12 sm4 class="pl-4">
						<h2 class="text-xs-center">Work experience</h2><br />
						<v-card class="card" v-for="(work_experience, index) in resume.work_experience" :key="index">
							<v-card-title class="card-title">
								<p>{{ work_experience.job_title }} at&nbsp;<span class="primaryColor accentuate italic">{{ work_experience.company }}</span></p>
							</v-card-title>
							<v-card-text class="card-text">
								<p class="primaryColor accentuate">{{ formatDate(work_experience.start_date) }} - {{ formatDate(work_experience.end_date) }}</p>
								<p>{{ work_experience.job_description }}</p>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
				

				<!-- Section Skills -->
				<!-- <v-layout row wrap style="background: #202026;" id="skills" class="my-5 white--text">
					categories: {{ categories }}<br />
					subcategories: {{ subcategories }}<br />

					<v-flex xs12 sm8 offset-sm2 style="">
						<v-layout row wrap align-center>
							<div v-for="skill in skills" :key="skill.slug">
								Category: {{ skill.name }}
								<div v-for="skill in skill.items" :key="skill.slug">
									Subcategory: {{ skill.name }}
								</div>
								
							</div>
						</v-layout>
					</v-flex>
				</v-layout> -->


				<!-- Section Skills 2 -->
				<!-- <v-layout row wrap style="background: #202026;" id="skills" class="my-5 white--text">
					categories: {{ categories }}<br />
					subcategories: {{ subcategories }}<br />

					<v-flex xs12 sm8 offset-sm2 style="">
						<v-layout row wrap align-center>
							<div v-for="skill in resume.skills" :key="skill.name">
								<v-flex xs12 v-for="category in categories" :key="category">
									<div v-if="skill.category === category && skill.subcategory === ''"></div>
									<v-flex xs12 v-for="subcategory in subcategories" :key="subcategory">
										<div v-if="skill.category === category && skill.subcategory === subcategory">
											<h2>{{ category }}</h2>
											<h3>{{ subcategory }}</h3>
											<v-progress-circular
												:rotate="270"
												:size="100"
												:width="10"
												:value="skill.value"
												:color="primaryColor"
												style="background: #fff; border-radius: 50px;"
											>
												{{ skill.value }}%
											</v-progress-circular><br /><br />
											<p class="text-xs-left">{{ skill.name }}</p>
										</div>
									</v-flex>
								</v-flex>
							</div>
						</v-layout>
					</v-flex>
				</v-layout> -->


				<!-- Section Skills 3 -->
				<v-layout row wrap style="" id="skills" class="my-5 section">
					<v-flex xs12 sm8 offset-sm2 style="">
						<v-layout row wrap justify-center align-center>
							<v-flex xs12 sm6>
								<h2 class="text-xs-center">Technical Skills</h2>
							</v-flex>
							<v-flex xs12 sm6>
								<h2 class="text-xs-center">Professional Skills</h2>
							</v-flex>
						</v-layout>
						
						<v-layout row wrap align-center>
							<v-flex xs12 sm6>
								<div class="mx-5" v-for="index in 5" :key="index">
									<v-layout>
										<v-flex class="text-xs-left">
											<span>JavaScript</span>
										</v-flex>
										<v-flex class="text-xs-right">
											<span>86%</span>
										</v-flex>
									</v-layout>
									<v-progress-linear
										:color="primaryColor"
										height="10"
										value="60"
										style="border-radius: 10px; margin: 6px 0px;"
									></v-progress-linear>
								</div>
							</v-flex>
							<v-flex xs12 sm6>
								<v-layout row wrap class="">
									<v-flex xs6 v-for="index in 4" :key="index" class="pa-3 text-xs-center">
										<v-progress-circular
											:rotate="270"
											:size="100"
											:width="5"
											value="95"
											:color="primaryColor"
										>
											95%
										</v-progress-circular><br /><br />
										Communication
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>


				<!-- Section Contact -->
				<v-layout row wrap id="contact" class="section">
					<v-flex xs12 sm8 offset-sm2>
						<h2 class="text-xs-center">Contact Me</h2>
						<br /><br />
						<v-form style="">
							<v-layout row wrap>
								<v-flex xs6 class="pr-3">
									<v-text-field
										outline
										name="firstname"
										label="First Name"
										v-model="form.firstname"
										v-validate="'required|max:40'"
                                    	:error-messages="errors ? errors.collect('firstname') : null"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs6 class="pl-3">
									<v-text-field
										outline
										name="lastname"
										label="Last name"
										v-model="form.lastname"
										v-validate="'required|max:40'"
                                    	:error-messages="errors ? errors.collect('lastname') : null"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field
										outline
										name="email"
										label="Your Email"
										v-model="form.email"
										v-validate="'required|email'"
                                    	:error-messages="errors ? errors.collect('email') : null"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-textarea
										outline
										name="message"
										label="Your message"
										v-model="form.message"
										v-validate="'required|max:2056'"
                                    	:error-messages="errors ? errors.collect('message') : null"
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

		<v-footer color="blue-grey" class="white--text justify-center" style="padding: 30px 0px;">
			<nuxt-link to="/" class="link"><h3>LoginMyCV</h3></nuxt-link>&nbsp;
			<span>&copy; {{ new Date() | moment('Y') }}</span>
		</v-footer>
    </v-app>
</template>

<script>
	// import abc from '~/plugins/jm-essai.js'
	// import jQuery from 'jquery'
	import axios from 'axios'
	import Noty from 'noty'
	import moment from 'moment'
	export default {
		inject: ['$validator'], // inject vee-validate validator
		head () {
		    return {
		      	title: this.title,
		      	meta: [
			        { hid: 'description', name: 'description', content: 'Ma description personnalisée' }
				],
				link: [
					// { type: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' }
				]
		    }
		},
		props: ['resume'],
		mounted () {
			// this.primaryColor = '#a97afd'
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#fff'
			this.secondaryColor = '#202026'
			this.backgroundColor = '#000'
			this.textColor = '#fff'


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
				backgroundColor: '',
				textColor: '',
				form: {
					firstname: '',
					lastname: '',
					email: '',
					message: ''
				},
				skills: {
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
					'--background-collor': this.backgroundColor,
					'--text-color': this.textColor
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
			subcategories () {
				const subcategories = []
				this.resume.skills.forEach(skill => {
					if (!subcategories.includes(skill.subcategory)) {
						subcategories.push(skill.subcategory)
					}
				})
				return subcategories
			},
			// errors () {
            //     return this.$store.getters['errors']
            // }
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
						console.log('sendMessage: ', this.form)
						await axios.post('/send-contact-form-message', { data: this.form, receiverAddress: 'me@example.com', slug: 'ivan' }, {
							headers: {
								'app-key': process.env.APP_KEY
							}
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
			redirectTo (link) {
				window.open(link, '_blank');
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
	.primary-color {
		background: var(--primary-color);
		/* background-color: blue; */
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
		color: var(--primary-color);
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
	.primaryColor {
		color: var(--primary-color);
	}
	.accentuate {
		font-weight: 500;
		white-space: nowrap;
	}
	.italic {
		font-style: italic;
	}
</style>