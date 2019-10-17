<template>
    <v-app :style="cssProps" v-cloak>
        <div class="fullpage-container text-color">
            <div class="button-group ma-4" v-if="resume.menus && (resume.education.length > 0 || resume.work_experience.length < 10 || resume.skills.length > 0)">
                <button type="button" :class="{active:index == 0}" @click="moveTo(0)">{{ resume.menus.home ? resume.menus.home : 'Presentation' }}</button>
                <button type="button" :class="{active:index == 1}" @click="moveTo(1)" v-if="resume.education && resume.education.length > 0">{{ resume.menus.education ? resume.menus.education : 'Education'}}</button>
                <button type="button" :class="{active:index == 2}" @click="moveTo(2)" v-if="resume.work_experience && resume.work_experience.length > 0">{{ resume.menus.work_experience ? resume.menus.work_experience : 'Work experience' }}</button>
                <button type="button" :class="{active:index == 3}" @click="moveTo(3)" v-if="resume.skills && resume.skills.length > 0">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</button>
                <button type="button" :class="{active:index == 4}" @click="moveTo(4)" v-if="resume.parameters && resume.parameters.show_contact_form">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</button>
            </div>

            <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
                <!-- Section Personal Data -->
                <div class="page page-1" data-index="0" style="height: 100%; overflow-y: auto;" ref="page">
                    <v-row no-gutters align="center" class="subpage" v-animate="{value: animationEffect}" style=" height: 80%; overflow-y: auto;">
                    <!-- <v-col cols="12" class="pa-4"> -->
                        <!-- <v-row no-gutters> -->
                        <!-- <v-col cols="12" sm="6" class="text-center" v-if="profilePicture">
                            <v-avatar :tile="false" :size="300" color="grey lighten-4">
                                <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="profile picture" />
                            </v-avatar>
                        </v-col> -->
                        <v-col cols="12" class="text-center secondary-color-background pa-3 rounded-border" style="">
                            <v-row no-gutters>
                                <v-col cols="12" sm="6" class="text-center" v-if="profilePicture">
                                    <v-avatar :tile="false" :size="300" color="grey lighten-4">
                                        <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="profile picture" />
                                    </v-avatar>
                                </v-col>
                            </v-row>
                            <h1 class="primary-color">{{ resume.personal_data.firstname }} {{ resume.personal_data.middlename }} {{ resume.personal_data.lastname }}</h1><br />
                            <h2>{{ resume.job_title }}</h2><br />
                            <h4>{{ resume.job_description }}</h4>
                            <br /><br />
                            <v-row no-gutters class="text-big text-left">
                                <v-col xs="6" class="mb-3 text-center" v-if="resume.personal_data.city || resume.personal_data.country">
                                    <div v-if="resume.personal_data.city">
                                        <font-awesome-icon :icon="['fas', 'map-marker']" /> {{ resume.personal_data.city }}, {{ resume.personal_data.country.name }}
                                    </div>
                                    <div v-else>
                                        <font-awesome-icon :icon="['fas', 'map-marker']" /> {{ resume.personal_data.country.name }}
                                    </div>
                                </v-col>
                                <v-col xs="6" class="mb-3 text-center" v-if="resume.personal_data.email">
                                    <font-awesome-icon :icon="['fas', 'envelope']" class="icon" /> {{ resume.personal_data.email }}
                                </v-col>
                                <v-col cols="6" class="mb-3" v-if="resume.personal_data.phone_number">
                                    <font-awesome-icon :icon="['fas', 'phone']" class="icon" /> {{ resume.personal_data.phone_number }}
                                </v-col>
                                <v-col class="mb-3" v-if="resume.personal_data.nationalities">
                                    <font-awesome-icon :icon="['fas', 'flag-usa']" class="icon" />
                                    <span v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">
                                        {{ nationality.name }}<span v-if="index + 1 < resume.personal_data.nationalities.length">, </span>
                                    </span>
                                </v-col>
                                <v-col class="mb-3" v-if="resume.languages">
                                    <font-awesome-icon :icon="['fas', 'language']" class="icon" />
                                    <v-chip :color="primaryColor" class="px-2 py-1 ma-2 text-background-color" v-for="(language, index) in resume.languages" :key="index">
                                        {{ language.name }}
                                        <v-progress-linear :color="getLanguageLevelColor(language.value)" height="10" :value="language.value" bottom style="width: 30px; transform: rotate(-90deg);" v-if="language.value"></v-progress-linear>
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-3">
                                <v-col cols="12" class="text-center">
                                    <font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)" class="social-link mx-3" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="pa-4 centered" style="border: 1px solid orangered;">
                                <div class="text-center mx-4" v-for="(file, index) in files" :key="index">
                                    <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" class="social-link" @click="redirectTo(file.downloadUrl)" />
                                    <br />
                                    <p>{{ file.name }}</p>
                                </div>
                            </v-row>
                        </v-col>
                        <!-- </v-row> -->
                    <!-- </v-col> -->

                        <!-- <v-col cols="12" class="pa-4 centered" style="border: 0px solid orangered;">
                            <div class="text-center mx-3" v-for="(file, index) in files" :key="index">
                                <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" class="social-link" @click="redirectTo(file.downloadUrl)" />
                                <br />
                                <p>{{ file.name }}</p>
                            </div>
                        </v-col> -->
                    </v-row>
                </div>

                <!-- Section Education -->
                <div class="page page-2 align-center" data-index="1" style="height: 100%; overflow-y: auto;">
                    <v-row no-gutters justify="center" class="subpage" v-if="resume.education && resume.education.length > 0" v-animate="{value: animationEffect}" style="height: 80%; overflow-y: auto;">
                        <v-col cols="12" sm="6" md="4" v-for="education in resume.education" :key="education.title"  class="pa-2" style="">
                            <v-card class="card text-color secondary-color-background">
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

                <!-- Section Work experience -->
                <div class="page page-3 align-center" data-index="2" style="height: 100%; overflow-y: auto;">
                    <!-- <v-layout row justify-center class="subpage" style="" v-if="resume.work_experience && resume.work_experience.length > 0"> -->
                    <v-row no-gutters justify="center" class="subpage" style="height: 80%; overflow-y: auto;" v-if="resume.work_experience && resume.work_experience.length > 0">
                        <!-- <v-flex xs12 sm6 md4 v-for="(work_experience, index) in resume.work_experience" :key="index" v-animate="{value: animationEffect}" class="pa-2" style="height: 100%;"> -->
                        <v-col cols="12" sm="6" md="4" v-for="(work_experience, index) in resume.work_experience" :key="index" v-animate="{value: animationEffect}" class="pa-2" style="height: 100%;">
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
                        <!-- </v-flex> -->
                        </v-col>
                    <!-- </v-layout> -->
                    </v-row>
                </div>

                <!-- Section Skills -->
                <div class="page page-4 align-center" data-index="3" style="height: 100%; overflow-y: auto;">
                    <!-- <v-layout row wrap class="subpage" style="" v-if="resume.skills && resume.skills.length > 0" v-animate="{value: animationEffect}"> -->
                    <v-row no-gutters class="subpage" style="height: 80%; overflow-y: auto;" v-animate="{value: animationEffect}" v-if="resume.skills && resume.skills.length > 0">
                        <!-- <p class="part-4" v-animate="{value: 'bounceInLeft'}">Skills</p> -->
                        <!-- <v-flex xs12 sm6 v-for="skill in skills" :key="skill.slug" class="pa-4 text-xs-center" style="height: 100%;"> -->
                        <v-col cols="12" sm="6" v-for="skill in skills" :key="skill.slug" class="pa-4 text-center" style="height: 100%;">
                            <h2 class="text-center mb-2">{{ skill[0].category }}</h2>
                            <!-- <v-layout row wrap justify-center> -->
                            <v-row no-gutters justify="center">
                                <!-- <v-flex xs12 sm6 class="my-4 mx-0 px-3" v-for="s in skill" :key="s.name"> -->
                                <v-col cols="12" sm="6" class="my-4 mx-0 px-3" v-for="s in skill" :key="s.name">
                                    <div v-if="s.type === 'pie'" class="">
                                        <v-progress-circular :rotate="270" :size="100" :width="10" :value="s.value" :color="colors.secondaryColor" class="pie">
                                            <span class="text-color">{{ s.value }}%</span>
                                        </v-progress-circular><br /><br />
                                        {{ s.name }}
                                    </div>
                                    <div v-else class="">
                                        <!-- <v-layout> -->
                                        <v-row no-gutters>
                                            <!-- <v-flex class="text-xs-left py-2"> -->
                                            <v-col class="text-left py-2">
                                                <span>{{ s.name }}</span>
                                            <!-- </v-flex> -->
                                            </v-col>
                                            <!-- <v-flex class="text-xs-right py-2"> -->
                                            <v-col class="text-right py-2">
                                                <span>{{ s.value }}%</span>
                                            <!-- </v-flex> -->
                                            </v-col>
                                        <!-- </v-layout> -->
                                        </v-row>
                                        <v-progress-linear :color="colors.secondaryColor" height="20" :value="s.value" class="bar"></v-progress-linear>
                                    </div>
                                    <!-- </div> -->
                                <!-- </v-flex> -->
                                </v-col>
                            <!-- </v-layout> -->
                            </v-row>
                        <!-- </v-flex> -->
                        </v-col>
                    <!-- </v-layout> -->
                    </v-row>
                </div>

                <!-- Section Contact -->
                <div class="page page-5 align-center" data-index="4" style="height: 100%; overflow-y: auto;">
                    <!-- <v-layout row wrap class="subpage" style="" v-animate="{value: animationEffect}" v-if="resume.parameters && resume.parameters.show_contact_form"> -->
                    <v-row no-gutters class="subpage" style="height: 80%; overflow-y: auto;" v-animate="{value: animationEffect}" v-if="resume.parameters && resume.parameters.show_contact_form">
                        <!-- <v-flex xs12 sm8 offset-sm2 class="pa-4" style="height: 100%;"> -->
                        <v-col cols="12" sm="8" offset-sm="2" class="pa-4" style="height: 100%;">
                            <v-form style="">
                                <!-- <v-layout row wrap> -->
                                <v-row no-gutters>
                                    <!-- <v-flex xs6 class="pr-3"> -->
                                    <v-col cols="6" class="pr-3">
                                        <v-text-field outlined name="firstname_template3" :label="resume.fields['firstname'] || 'Firstname'" :rules="contactForm.firstnameRules" v-model="contactForm.firstname"></v-text-field>
                                    <!-- </v-flex> -->
                                    </v-col>
                                    <!-- <v-flex xs6 class="pl-3"> -->
                                    <v-col cols="6" class="pl-3">
                                        <v-text-field outlined name="lastname_template3" :label="resume.fields['lastname'] || 'Lastname'" :rules="contactForm.lastnameRules" v-model="contactForm.lastname"></v-text-field>
                                    <!-- </v-flex> -->
                                    </v-col>
                                    <!-- <v-flex xs12> -->
                                    <v-col cols="12">
                                        <v-text-field outlined dark name="email_template3" :label="resume.fields['email'] || 'Email'" :rules="contactForm.emailRules" v-model="contactForm.email"></v-text-field>
                                    <!-- </v-flex> -->
                                    </v-col>
                                    <!-- <v-flex xs12> -->
                                    <v-col cols="12">
                                        <v-textarea outlined dark name="message_template3" :label="resume.fields['message'] || 'Message'" :rules="contactForm.messageRules" v-model="contactForm.message"></v-textarea>
                                    <!-- </v-flex> -->
                                    </v-col>
                                    <v-btn rounded block large class="white--text pt-0 pb-0" :color="colors.primaryColor">{{ resume.fields['send_message'] || 'Send message' }}</v-btn>
                                <!-- </v-layout> -->
                                </v-row>
                            </v-form>
                        <!-- </v-flex> -->
                        </v-col>
                    <!-- </v-layout> -->
                    </v-row>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['colors'],
		mounted() {
			this.primaryColor = this.colors.primaryColor
			this.secondaryColor = this.colors.secondaryColor
			this.tertiaryColor = this.colors.tertiaryColor
			this.backgroundColor = this.colors.backgroundColor
			this.textColor = this.colors.textColor
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
					beforeChange(ele, current, next) {},
					afterChange(ele, current) {
						// console.log('ele.dataset.index: ', ele.dataset.index)
						this.vm.setIndex(ele.dataset.index)
					}
				},
				column: 6,
				animationEffect: 'zoomIn',
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: '',
				textColor: '',
				contactForm: {
					valid: true,
					firstname: '',
					lastname: '',
					email: '',
					message: '',
				},
				resume: {
					job_title: 'Product Designer',
					job_description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
					personal_data: {
						firstname: 'Alex',
						middlename: '',
						lastname: 'Johnson',
						email: 'alex.johnson@example.com',
						phone: '+12 987 654 32 10',
						country: {
							name: 'United Kingdom',
							slug: 'united_kingdom',
							flag: 'united_kindom.png'
						},
						city: 'London',
						birthday: '1984-02-28'
					},
					picture: '/images/hero.png',
					languages: [
						{
							name: 'English',
							slug: 'english',
							flag: 'english.png',
							level: 100
						},
						{
							name: 'Spanish',
							slug: 'spanish',
							flag: 'spanish.png',
							level: 60
						}
					],
					social_network: [
						{
							name: 'Github',
							slug: 'github',
							fontawesome: 'github',
							link: 'http://www.github.com',
							color: '#323131'
						},
						{
							name: 'Twitter',
							slug: 'twitter',
							fontawesome: 'twitter',
							link: 'http://www.twitter.com',
							color: '#1da1f3'
						},
						{
							name: 'LinkedIn',
							slug: 'linkedin',
							fontawesome: 'linkedin-in',
							link: 'http://www.linkedin.com',
							color: '#0274b3'
						}
					],
					education: [
						{
							title: 'Art & Multimedia',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
							school: 'Oxford University',
							start_date: '2005',
							end_date: '2008',
							country: 'United Kingdom',
							city: 'Oxford'
						},
						{
							title: 'Dramatic Arts',
							description:
								'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
							school: 'Cambridge University',
							start_date: '2002',
							end_date: '2005',
							country: 'United Kingdom',
							city: 'Cambridge'
						},
                        {
                            title: 'Art & Multimedia 2',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                            school: 'Oxford University',
                            start_date: '2005',
                            end_date: '2008',
                            country: 'United Kingdom',
                            city: 'Oxford'
                        },
                        {
                            title: 'Dramatic Arts 2',
                            description:
                                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            school: 'Cambridge University',
                            start_date: '2002',
                            end_date: '2005',
                            country: 'United Kingdom',
                            city: 'Cambridge'
                        },
                        {
                            title: 'Art & Multimedia 3',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                            school: 'Oxford University',
                            start_date: '2005',
                            end_date: '2008',
                            country: 'United Kingdom',
                            city: 'Oxford'
                        },
                        {
                            title: 'Dramatic Arts 3',
                            description:
                                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            school: 'Cambridge University',
                            start_date: '2002',
                            end_date: '2005',
                            country: 'United Kingdom',
                            city: 'Cambridge'
                        },
                        {
                            title: 'Art & Multimedia 4',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                            school: 'Oxford University',
                            start_date: '2005',
                            end_date: '2008',
                            country: 'United Kingdom',
                            city: 'Oxford'
                        },
                        {
                            title: 'Dramatic Arts 4',
                            description:
                                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            school: 'Cambridge University',
                            start_date: '2002',
                            end_date: '2005',
                            country: 'United Kingdom',
                            city: 'Cambridge'
                        },
					],
					work_experience: [
						{
							job_title: 'UI/UX Designer',
							job_description:
								'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
							start_date: '2008',
							end_date: '2012',
							company: 'Answer Softwares Ltd',
							country: 'United Kingdom',
							city: 'London'
						},
						{
							job_title: 'Product Designer',
							job_description:
								'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
							start_date: '2012',
							end_date: '',
							company: 'Asco Int.',
							country: 'United Kingdom',
							city: 'London'
						}
					],
					skills: [
						{
							name: 'CSS',
							category: 'Technical skill',
							type: 'pie',
							value: 75
						},
						{
							name: 'Photoshop',
							category: 'Technical skill',
							type: 'pie',
							value: 80
						},
						{
							name: 'Communication',
							category: 'Soft skill',
							type: 'bar',
							value: 80
						},
						{
							name: 'Writing',
							category: 'Soft skill',
							type: 'bar',
							value: 60
						}
					],
					uploads: [
						{
							name: 'cv.pdf',
							title: 'My CV in pdf',
							type: 'downloadable_file'
						},
						{
							name: 'work_sample.pdf',
							title: 'Work Samples',
							type: 'downloadable_file'
						},
						{
							name: 'hero.png',
							title: 'Profile picture',
							type: 'profile_picture',
							downloadUrl: '/images/hero.png'
						}
					],
					menus: {
						presentation: 'Presentation',
						education: 'Education',
						skills: 'Skills',
						files: 'Files',
						contact: 'Contact'
					},
					fields: {},
					contact_form_validation: {},
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
					'--primary-color': this.colors.primaryColor,
					'--secondary-color': this.colors.secondaryColor,
					'--tertiary-color': this.colors.tertiaryColor,
					'--background-color': this.colors.backgroundColor,
					'--text-color': this.colors.textColor
				}
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
			},
			profilePicture() {
				return this.resume.uploads.find(upload => upload.type === 'profile_picture')
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
			moveTo(index) {
				this.$refs.fullpage.$fullpage.moveTo(index, true)
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

	.button-group {
		position: absolute;
		z-index: 9;
		width: 100%;
		margin-bottom: 50px;
	}
	.button-group button {
		display: inline-block;
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
    .text-background-color {
        color: var(--background-color);
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

	.social-link {
		color: var(--text-color);
	}
	.social-link:hover {
		color: var(--primary-color);
		cursor: pointer;
	}

	.card {
		/*color: var(--text-color);*/
		/*background-color: var(--secondary-color);*/
		padding: 5px 0px;
		border-radius: 10px;
	}
	.card-title {
        /*color: var(--primary-color);*/
		padding: 10px 20px;
		font-size: 1.3em;
	}
	.card-text {
        /*color: var(--text-color);*/
		padding: 0px 20px;
	}
	.card-date {
		/*color: var(--primary-color);*/
		font-weight: 500;
		padding: 10px 0px;
	}

	::-webkit-scrollbar {
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
	}
	/*>>> .v-text-field--outline .v-label {
		color: var(--text-color);
	}
    >>> .v-text-field__slot input {
        color: red
    }*/
    >>> .theme--dark.v-label {
        color: var(--text-color);
    }
</style>