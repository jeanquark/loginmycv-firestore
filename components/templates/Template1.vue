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

			<!-- Section Personal data -->
			<v-layout row wrap class="margin-top margin-bottom">
			    <v-flex xs12 sm8 offset-sm2>
			      	<v-card elevation-10 v-if="resume.personal_data" class="secondary-color-background">
			    		<v-card-text>
							<v-layout row wrap>
								<v-flex xs12 class="mb-2">
									<h1 class="text-xs-center mb-2 text-color">{{ resume.job_title }}</h1>
									<h3 class="text-xs-center mb-2">{{ resume.job_description }}</h3>
								</v-flex>
								<v-flex v-bind="{[`xs12 sm${column}`]: true}">									
									<v-layout row wrap class="text-big">
										<v-flex xs12 sm6 class="pa-2">
											<span>Firstname: <b>{{ resume.personal_data.firstname }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.middlename">
											<span>Middle name: <b>{{ resume.personal_data.middlename }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Lastname: <b>{{ resume.personal_data.lastname }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.birthday">
											<span>Age: <b>{{ calculateAge(resume.personal_data.birthday) }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>City: <b>{{ resume.personal_data.city }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Country: <b>{{ resume.personal_data.country }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.email">
											<span>Email: <b>{{ resume.personal_data.email }}</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2" v-if="resume.personal_data.phone_number">
											<span>Phone number: <b>{{ resume.personal_data.phone_number }}</b></span>
										</v-flex>
									</v-layout>
									<v-layout row wrap class="px-2 text-big" v-if="resume.personal_data.nationalities || resume.languages">
										<v-flex xs12 sm6 v-if="resume.personal_data.nationalities">
											<div v-if="resume.personal_data.nationalities.length > 1" class="text-xs-left">
												<span>Nationalities:</span>
												<ul class="list-horizontal">
													<li v-for="(nationality, index) in nationalities" :key="index"><b>{{ nationality.name }}</b></li>
												</ul>
											</div>
											<div v-else>
												<span>Nationality: <b>{{ resume.personal_data.nationalities[0].name }}</b></span>
											</div>
										</v-flex>
										<v-flex xs12 sm6 class="text-xs-center pa-2" v-if="resume.languages">
											<div v-if="resume.languages.length > 1" class="text-xs-left">
												<span>Languages:</span>
												<ul class="list-horizontal">
													<li v-for="(language, index) in languages" :key="index">
														<b>{{ language.name }}</b>
														<span v-if="resume.parameters.show_languages_levels"> - {{ getLanguageQualitativeLevel(language.level) }}</span>
													</li>
												</ul>
											</div>
											<div v-else>
												<span>Language: {{ resume.languages[0].name }}</span>
											</div>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12 v-if="resume.personal_data.short_description">
											<span>{{ resume.personal_data.short_description }}</span>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2" v-if="resume.social_links">
										<v-flex xs12 class="text-xs-center">
											<v-chip label v-for="(social, index) in resume.social_links" :key="index" class="social-link" @click="redirectTo(social.link)">
												<font-awesome-icon :icon="['fab', social.fontawesome]" size="2x" />
											</v-chip>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2" v-if="resume.key_competences">
										<v-flex xs12>
											key competences
										</v-flex>
									</v-layout>

								</v-flex>
								<v-flex xs12 sm4 v-if="profilePicture">
									<v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" />
								</v-flex>
							</v-layout>
			    		</v-card-text>
			      	</v-card>
			    </v-flex>
			</v-layout>
			

			<!-- Section Education -->
			<v-layout row wrap class="margin-bottom" v-if="resume.education">
				<v-flex xs12 sm8 offset-sm2>
			      	<h2 class="text-xs-center display-1 text-color">Education</h2>
			      	<br />
			      	<v-card class="secondary-color-background">
						<v-expansion-panel expand :value="[1]">
						    <v-expansion-panel-content v-for="(education, index) in resume.education" :key="index" style="background: var(--secondary-color);">
						      	<template v-slot:header>
							        <h3><v-icon :color="primaryColor" class="mr-2">school</v-icon> {{ education.title }}, {{ education.school }}</h3>
						      	</template>
						      	<v-card>
							        <v-card-text class="tertiary-color-background">
							        	<p>
							        		{{ education.city }} - {{ education.country }},
							        		<i>from {{ education.start_date }}</i> <span v-if="education.end_date"></span> <i>to {{ education.end_date }}</i>
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
			<v-layout row wrap class="margin-bottom" v-if="resume.work_experience">
				<v-flex xs12 sm8 offset-sm2>
			      	<h2 class="text-xs-center display-1 text-color">Work experience</h2>
			      	<br />
			      	<v-card class="secondary-color-background">
						<v-expansion-panel expand :value="[1]">
						    <v-expansion-panel-content v-for="(work_experience, index) in resume.work_experience" :key="index" style="background: var(--secondary-color);">
						      	<template v-slot:header>
							        <h3><v-icon :color="primaryColor" class="mr-2">work</v-icon> {{ work_experience.job_title }} at {{ work_experience.company }}</h3>
						      	</template>
						      	<v-card>
							        <v-card-text class="tertiary-color-background">
							        	<p>
							        		{{ work_experience.city }} - {{ work_experience.country }},
							        		<i>from {{ work_experience.start_date }}</i> <span v-if="work_experience.end_data">to</span> <i>to {{ work_experience.end_date }}</i>
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
			<v-layout row wrap class="margin-bottom" v-if="resume.skills">
				<v-flex xs12 sm8 offset-sm2>
			      	<h2 class="text-xs-center display-1 text-color">Skills</h2>
			      	<br />
			      	<v-card class="secondary-color-background">
						<v-layout row wrap justify-center>
							<v-flex xs12 v-for="(skill, index) in skills" :key="index" class="pa-3 text-xs-center">
								<!-- skill: {{ skill }}<br /> -->
								<h3 class="text-xs-center mb-2">{{ skill[0].category }}</h3>
								<v-layout align-center justify-center>
									<v-flex xs12 sm6 md4 lg3 class="mx-0" v-for="s in skill" :key="s.name">
										<div v-if="s.type === 'pie'">
											<v-progress-circular
												:rotate="270"
												:size="100"
												:width="10"
												:value="s.value"
												:color="primaryColor"
												style=""
											>
												{{ s.value }}%
											</v-progress-circular><br />
											<span color="textColor">{{ s.name }}</span>
										</div>
										<div v-else><!-- type === 'bar' -->
											<v-layout class="my-2">
												<v-flex class="text-xs-left">
													<span>{{ s.name }}</span>
												</v-flex>
												<v-flex class="text-xs-right">
													<span>{{ s.value }}%</span>
												</v-flex>
											</v-layout>
											<!-- {{ s.name }} {{ s.value }}% -->
											<v-progress-linear
												height="10"
												:value="s.value"
												:color="primaryColor"
												class="mb-4"
												style="border-radius: 10px; margin: 0px 0px;"
											></v-progress-linear>
										</div>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
			      	</v-card>
		      	</v-flex>
		    </v-layout>


			<!-- Section Files -->
			<v-layout row wrap class="margin-bottom" v-if="files.length > 0">
				<v-flex xs12 sm8 offset-sm2>
				    <h2 class="text-xs-center display-1 text-color">Files</h2>
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
		</v-content>

		<v-footer :color="backgroundColor" class="white--text justify-center pa-4">
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
	export default {
		head () {
		    return {
		  //     	title: `${this.resume.personal_data.firstname}'s resume`,
		  //     	meta: [
			 //        { hid: 'description', name: 'description', content: `Resume of ${this.resume.personal_data.firstname} ${this.resume.personal_data.lastname}` }
				// ],
				// link: [
				// 	// { type: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' }
				// ]
		    }
		},
		props: ['resume'],
		mounted () {
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#FFF'
			this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : '#EFEFEF'
			this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#FFF'
			this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#000'

			this.profilePicture = this.resume.uploads.find(upload => upload.type === 'profile_picture')
			if (!this.profilePicture) {
				this.column = 12
			}
		},
		data () {
			return {
				layoutWindow: 0,
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: '',
				textColor: '',
				profilePicture: {},
				column: 8
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
			}
		},
		methods: {
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
				window.open(link, '_blank')
			}
		}
	}
</script>

<style scoped>
	.abc {
		background-color: yellow;
	}
	p, span, h1, h2, h3, h4, li {
		color: var(--text-color);
	}
	.text-big {
		font-size: 1.2em;
	}
	ul.list-horizontal {
		padding: 0px;
	}
	.list-horizontal li {
		display:inline-block;
		margin-right: 10px;
	}
	.list-horizontal li:before {
		content: "\2022";
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
	>>>.v-chip__content {
		cursor: pointer !important;
	}
</style>