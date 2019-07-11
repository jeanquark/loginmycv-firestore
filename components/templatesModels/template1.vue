<template>
	<v-app v-cloak id="app" :style="cssProps">
		<p> 
			<!-- userResume: {{ userResume }}<br /> -->
			resumeSlug: {{ resumeSlug }}<br />
			colors: {{ colors }}<br />
		</p>
		<v-content class="background-color">
			<v-layout row wrap class="margin-top margin-bottom">
			    <v-flex xs12 sm8 offset-sm2>
			      	<v-card elevation-10 class="secondary-color-background">
			    		<v-card-text>
							<v-layout row wrap>
								<v-flex xs12 class="mb-4">
									<h1 class="text-xs-center mb-2 text-color">resume.job_title</h1>
									<h3 class="text-xs-center mb-2">resume.job_description</h3>
								</v-flex>
								<v-flex xs12 sm8>									
									<v-layout row wrap align-center class="text-big">
										<v-flex xs12 sm6 class="pa-2">
											<span>Firstname: <b>resume.personal_data.firstname</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Middle name: <b>resume.personal_data.middlename</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Lastname: <b>resume.personal_data.lastname</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Age: <b>calculateAge(resume.personal_data.birthday)</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>City: <b>resume.personal_data.city</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Country: <b>resume.personal_data.country.name</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Email: <b>resume.personal_data.email</b></span>
										</v-flex>
										<v-flex xs12 sm6 class="pa-2">
											<span>Phone number: <b>resume.personal_data.phone_number</b></span>
										</v-flex>
									</v-layout>
									<v-layout row wrap class="px-2 text-big">
										<v-flex xs12 sm6>
											<div class="text-xs-left">
												<span>Nationalities:</span>
												<ul class="list-horizontal">
													<li><b>nationality.name</b></li>
												</ul>
											</div>
											
										</v-flex>
										<v-flex xs12 sm6 class="text-xs-center pa-2">
											<div class="text-xs-left">
												<span>Languages:</span>
												<ul class="list-horizontal">
													<li>
														<b>language.name</b>
														<span> - getLanguageQualitativeLevel(language.level)</span>
													</li>
												</ul>
											</div>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12>
											<span>resume.personal_data.short_description</span>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12 class="text-xs-center">
											<v-chip label class="social-link">
												<font-awesome-icon :icon="['fab', 'facebook-f']" size="2x" />
											</v-chip>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12>
											key competences
										</v-flex>
									</v-layout>

								</v-flex>
								<v-flex xs12 sm4>
									<v-img 
										src="/images/profilePicture.png"
										lazy-src="/images/profilePicture.png"
										alt="profile picture" 
									/>
								</v-flex>
							</v-layout>
			    		</v-card-text>
			      	</v-card>
			    </v-flex>
			</v-layout>
			

			<!-- Section Education -->
			<v-layout row wrap class="margin-bottom">
				<v-flex xs12 sm8 offset-sm2>
			      	<h2 class="text-xs-center display-1 primary-color">Education</h2>
			      	<br />
			      	<v-card class="secondary-color-background">
						<v-expansion-panel expand :value="[1]">
						    <v-expansion-panel-content v-for="(education, index) in resume.education" :key="index" style="background: var(--secondary-color);">
						      	<template v-slot:header>
							        <h3><v-icon :color="primaryColor" class="mr-2">school</v-icon> education.title, education.school</h3>
						      	</template>
								<v-icon slot="actions" color="primary">$vuetify.icons.expand</v-icon>
						      	<v-card>
							        <v-card-text class="tertiary-color-background">
							        	<p v-if="!education.end_date">
							        		education.city - education.country,
							        		<i>since education.start_date</i>
							        	</p>
							        	<p v-else>
							        		education.city - education.country,
							        		<i>from education.start_date to education.end_date</i>
							        	</p>
							        	<p>education.description</p>
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
							        <h3><v-icon :color="primaryColor" class="mr-2">work</v-icon> work_experience.job_title at work_experience.company</h3>
						      	</template>
								<v-icon slot="actions" color="primary">$vuetify.icons.expand</v-icon>
						      	<v-card>
							        <v-card-text class="tertiary-color-background">
							        	<p v-if="!work_experience.end_date">
							        		work_experience.city - work_experience.country,
							        		<i>since work_experience.start_date</i>
							        	</p>
										<p v-else>
											work_experience.city - work_experience.country,
							        		<i>from work_experience.start_date to work_experience.end_date</i>
										</p>
							        	<p>work_experience.job_description</p>
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
							<v-flex xs12 v-for="(skill, index) in resume.skills" :key="index" class="pa-3 text-xs-center">
								<!-- skill: skill<br /> -->
								<h3 class="text-xs-center mb-2">skill[0].category</h3>
								<v-layout align-center justify-center>
									<v-flex xs12 sm6 md4 lg3 class="mx-3" v-for="s in skill" :key="s.name">
										<div v-if="s.type === 'pie'">
											<v-progress-circular
												:rotate="270"
												:size="100"
												:width="15"
												:value="s.value"
												:color="primaryColor"
												style=""
											>
												s.value%
											</v-progress-circular><br />
											<span color="textColor">s.name</span>
										</div>
										<div v-else><!-- type === 'bar' -->
											<v-layout class="my-2">
												<v-flex class="text-xs-left">
													<span>s.name</span>
												</v-flex>
												<v-flex class="text-xs-right">
													<span>s.value%</span>
												</v-flex>
											</v-layout>
											<!-- s.name s.value% -->
											<v-progress-linear
												height="15"
												:value="s.value"
												:color="primaryColor"
												class="my-2"
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
			<v-layout row wrap class="margin-bottom" v-if="resume.files && resume.files.length > 0">
				<v-flex xs12 sm8 offset-sm2>
				    <h2 class="text-xs-center display-1 primary-color">Files</h2>
				    <br />
		      		<v-layout row wrap justify-center>
		      			<v-flex xs6 md4 lg3 v-for="(file, index) in resume.files" :key="index" class="pa-2" style="">
							<v-card hover class="secondary-color-background">
				      			<v-card-title class="">
				      				<v-layout justify-center>
				      					<h3 class="text-xs-center">file.title</h3>
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
					<h2 class="text-xs-center display-1 primary-color">Contact Me</h2>
					<br /><br />
					<v-form>
						<v-layout row wrap class="secondary-color-background pa-5">
							<v-flex xs6 class="pr-3">
								<v-text-field
									outline
									name="firstname_template1"
									label="First name"
									:color="primaryColor"
									:background-color="primaryColor"
									dark
								></v-text-field>
							</v-flex>
							<v-flex xs6 class="pl-3">
								<v-text-field
									outline
									name="lastname_template1"
									label="Last name"
									:color="primaryColor"
									:background-color="primaryColor"
									dark
								></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field
									outline
									name="email_template1"
									label="Your Email"
									:color="primaryColor"
									:background-color="primaryColor"
									dark
								></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-textarea
									outline
									name="message_template1"
									label="Your message"
									:color="primaryColor"
									:background-color="primaryColor"
									dark
								></v-textarea>
							</v-flex>
							<v-btn round block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" :color="primaryColor">Send message</v-btn>
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
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		props: ['resumeSlug', 'colors'],
		data () {
			return {
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: 'yellow',
				textColor: '',
				resume: {
					parameters: {
						show_contact_form: false
					},
					languages: [

					],
					social_network: [

					],
					education: [
						
					],
					work_experience: [

					],
					skills: [

					],
					files: [

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
					// '--background-color': this.backgroundColor,
					'--background-color': this.colors.backgroundColor,
					'--text-color': this.textColor
				}
			},
			// userResume() {
			// 	return this.$store.getters["resumes/loadedUserResumes"].find(
			// 		resume => resume.slug === "alexjohnson"
			// 	)
			// }
		}
	}
</script>

<style scoped>
	.background-color {
		background-color: var(--background-color);
		/* background-color: yellow; */
	}
</style>