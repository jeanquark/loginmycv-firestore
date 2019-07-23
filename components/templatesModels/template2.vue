<template>
    <v-app v-cloak :style="cssProps" style="">
        <v-toolbar :color="secondaryColor" dark clipped-right height="80px" style="display: inline;">
            <v-toolbar-side-icon @click.stop="sidemenu = !sidemenu"></v-toolbar-side-icon>
            <!-- <v-toolbar-title>Toolbar</v-toolbar-title> -->
			
            <v-layout align-center justify-center fill-height hidden-sm-and-down>
                <v-flex xs12>
                    <div class="text-xs-center" style="vertical-align: middle;" v-scroll-spy-active="{selector: '.nav-item', class: 'custom-active'}">

                        <nuxt-link class="nav-item" to="#top" v-scroll-to="{
							el: '#top',
							container: '',
							duration: '1000',
							offset: -100
						}">{{ resume.menus.presentation ? resume.menus.presentation : 'Presentation' }}</nuxt-link>
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
						}" v-if="resume.parameters && resume.parameters.show_contact_form">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</nuxt-link>
                    </div>
                </v-flex>
            </v-layout>
        </v-toolbar>
        

        <v-content class="pa-0 background-color">
            <div>
                <!-- Section Intro -->
                <v-layout class="my-5 section" id="top">
                    <v-flex xs12 sm8 offset-sm2>
                        <v-layout>
                            <v-flex xs12 sm6 style="">
                                <v-chip class="primary-color-background text-color rounded-border py-2 px-3" v-if="resume.personal_data.greeting_phrase"><b>{{ resume.personal_data.greeting_phrase }}</b>
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
                                    <v-chip label class="social-link" @click="redirectTo(social_network.link)" v-for="(social_network, index) in resume.social_networks" :key="index">
                                        <font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" :color="textColor" />
                                    </v-chip>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6 v-if="profilePicture">
                                <v-layout justify-center>
                                    <v-avatar size="350" color="grey lighten-4" v->
                                        <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="Profile picture" />
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
                                            <v-progress-circular :rotate="270" :size="100" :width="5" :value="s.value" :color="primaryColor" style="background: #191919; border-radius: 50px;">
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
                                            <v-progress-linear :color="primaryColor" height="15" :value="s.value" style="border-radius: 10px;" class="mb-0"></v-progress-linear>
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
                <v-layout row wrap id="contact" class="my-5 section" v-if="resume.parameters && resume.parameters.show_contact_form">
                    <v-flex xs12 sm8 offset-sm2>
                        <h1 class="text-xs-center">Contact Me</h1>
                        <br /><br />
                        <v-form>
                            <v-layout row wrap>
                                <v-flex xs6 class="pr-3">
                                    <v-text-field outline name="firstname_template2" label="First name" :color="primaryColor" :background-color="primaryColor" dark></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-3">
                                    <v-text-field outline name="lastname_template2" label="Last name" :color="primaryColor" :background-color="primaryColor" dark></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field outline name="email_template2" label="Your Email" :color="primaryColor" :background-color="primaryColor" dark></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea outline name="message_template2" label="Your message" :color="primaryColor" :background-color="primaryColor" dark></v-textarea>
                                </v-flex>
                                <v-btn round block large :color="primaryColor" class="white--text" style="padding-top: 0px; padding-bottom: 0px;">Send message</v-btn>
                            </v-layout>
                        </v-form>
                    </v-flex>
                </v-layout>
            </div>
            <br />
        </v-content>

        <v-footer :color="primaryColor" class="white--text justify-center py-4">
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
	import moment from "moment"
	export default {
		props: ["colors"],
		mounted() {
			this.primaryColor = this.colors.primaryColor
			this.secondaryColor = this.colors.secondaryColor
			this.tertiaryColor = this.colors.tertiaryColor
			this.backgroundColor = this.colors.backgroundColor
			this.textColor = this.colors.textColor
		},
		data() {
			return {
				sidemenu: false,
				primaryColor: "",
				secondaryColor: "",
				tertiaryColor: "",
				backgroundColor: "",
				textColor: "",
				resume: {
					job_title: "Product Designer",
					job_description:
						"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
					personal_data: {
						firstname: "Alex",
						middlename: "",
						lastname: "Johnson",
						email: "alex.johnson@example.com",
						phone: "+12 987 654 32 10",
						country: {
							name: "United Kingdom",
							slug: "united_kingdom",
							flag: "united_kindom.png"
						},
						city: "London",
						birthday: "1984-02-28"
					},
					languages: [
						{
							name: "English",
							slug: "english",
							flag: "english.png",
							level: 100
						},
						{
							name: "Spanish",
							slug: "spanish",
							flag: "spanish.png",
							level: 60
						}
					],
					social_network: [
						{
							name: "Github",
							slug: "github",
							fontawesome: "github",
							link: "http://www.github.com",
							color: "#323131"
						},
						{
							name: "Twitter",
							slug: "twitter",
							fontawesome: "twitter",
							link: "http://www.twitter.com",
							color: "#1da1f3"
						},
						{
							name: "LinkedIn",
							slug: "linkedin",
							fontawesome: "linkedin-in",
							link: "http://www.linkedin.com",
							color: "#0274b3"
						}
					],
					education: [
						{
							title: "Art & Multimedia",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
							school: "Oxford University",
							start_date: "2005",
							end_date: "2008",
							country: "United Kingdom",
							city: "Oxford"
						},
						{
							title: "Dramatic Arts",
							description:
								"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
							school: "Cambridge University",
							start_date: "2002",
							end_date: "2005",
							country: "United Kingdom",
							city: "Cambridge"
						}
					],
					work_experience: [
						{
							job_title: "UI/UX Designer",
							job_description:
								"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
							start_date: "2008",
							end_date: "2012",
							company: "Answer Softwares Ltd",
							country: "United Kingdom",
							city: "London"
						},
						{
							job_title: "Product Designer",
							job_description:
								"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
							start_date: "2012",
							end_date: "",
							company: "Asco Int.",
							country: "United Kingdom",
							city: "London"
						}
					],
					skills: [
						{
							name: "CSS",
							category: "Technical skill",
							type: "pie",
							value: 75
						},
						{
							name: "Photoshop",
							category: "Technical skill",
							type: "pie",
							value: 80
						},
						{
							name: "Communication",
							category: "Soft skill",
							type: "bar",
							value: 80
						},
						{
							name: "Writing",
							category: "Soft skill",
							type: "bar",
							value: 60
						}
					],
					uploads: [
						{
							name: "cv.pdf",
							title: "My CV in pdf",
							type: "downloadable_file"
						},
						{
							name: "work_sample.pdf",
							title: "Work Samples",
							type: "downloadable_file"
						},
						{
							name: "hero.png",
							title: "Profile picture",
							type: "profile_picture",
							downloadUrl: "/images/hero.png"
						}
					],
					menus: {
						presentation: 'Presentation',
						education: 'Education',
						skills: 'Skills',
						files: 'Files',
						contact: 'Contact'
					},
					parameters: {
						show_contact_form: true,
						show_language_level: true
					}
				}
			}
		},
		computed: {
			cssProps() {
				return {
					"--primary-color": this.colors.primaryColor,
					"--secondary-color": this.colors.secondaryColor,
					"--tertiary-color": this.colors.tertiaryColor,
					"--background-color": this.colors.backgroundColor,
					"--text-color": this.colors.textColor
				};
			},
			skills () {
				if (this.resume.skills) {
					const res = this.resume.skills.reduce((acc, curr) => {
						if(!acc[curr.category]) acc[curr.category] = [] //If this type wasn't previously stored
						acc[curr.category].push(curr)
						return acc
					},{})
					return res
				}
			},
			nationalities () {
				if (this.resume.personal_data.nationalities) {
					return this.resume.personal_data.nationalities.slice(0).sort((a, b) => a.priority - b.priority)
				}
			},
			languages () {
				if (this.resume.languages) {
					return this.resume.languages.slice(0).sort((a, b) => b.level - a.level)
				}
			},
			files () {
				if (this.resume.uploads) {
					return this.resume.uploads.filter(file => file.type === 'downloadable_file')
				}
			},
			profilePicture() {
				return this.resume.uploads.find(
					upload => upload.type === "profile_picture"
				)
			}
		},
		methods: {
			calculateAge(birthday) {
				return moment().diff(birthday, "years")
			},
			getLanguageQualitativeLevel(level) {
				console.log("level: ", level)
				if (level < 20) {
					return "Beginner"
				} else if (level < 40) {
					return "Low intermediate"
				} else if (level < 60) {
					return "Intermediate"
				} else if (level < 80) {
					return "High intermediate"
				} else if (level < 100) {
					return "Advanced"
				} else if ((level = 100)) {
					return "Mother tongue"
				}
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
		color: var(--primary-color);
	}

	.icon {
		margin-right: 10px;
	}
	.icon:hover {
		color: var(--primary-color);
	}
	.social-link {
		background-color: var(--background-color);
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
	.background-color {
		background: var(--background-color);
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

	>>> .v-chip__content.pointer {
		cursor: pointer !important;
	}
	.rounded-border {
		border-bottom-left-radius: 0px;
	}
</style>