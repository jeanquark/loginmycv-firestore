<template>
	<v-app v-cloak :style="cssProps" id="app">
		<v-content style="background: white;">
			<b>this.resume:</b> {{ this.resume }}<br /><br /><br />

			<!-- Section Personal data -->
			<v-layout row wrap>
			    <v-flex xs12 sm8 offset-sm2>
			    	<h2 class="text-xs-center display-1">Personal data</h2>
			    	<br />
			      	<v-card elevation-10 v-if="resume.personal_data">
			    		<v-card-text>
							<v-layout row wrap>
								<v-flex xs12 class="mb-2">
									<h1 class="text-xs-center">{{ resume.job_title }}</h1>
									<h3 class="text-xs-center">{{ resume.job_description }}</h3>
								</v-flex>
								<v-flex v-bind="{[`xs12 sm${column}`]: true}" style="border: 1px solid red;">									
									<v-layout class="my-3 px-2 text-big">
										<v-flex xs12 sm6 style="border: 1px solid green;">
											<b>Firstname:</b> {{ resume.personal_data.firstname }}
										</v-flex>
										<v-flex xs12 sm6 style="border: 1px solid blue;">
											<b>Lastname:</b> {{ resume.personal_data.lastname }}
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2 text-big">
										<v-flex xs12 sm6 style="border: 1px solid green;">
											<b>City:</b> {{ resume.personal_data.city }}
										</v-flex>
										<v-flex xs12 sm6 style="border: 1px solid blue;">
											<b>Country:</b> {{ resume.personal_data.country }}
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2 text-big">
										<v-flex xs12 sm6 style="border: 1px solid green;">
											<b>Email:</b> {{ resume.personal_data.email }}
										</v-flex>
										<v-flex xs12 sm6 style="border: 1px solid blue;">
											<b>Phone number:</b> {{ resume.personal_data.phone_number }}
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2 text-big" v-if="resume.personal_data.nationalities">
										<v-flex xs12 sm6 style="border: 1px solid green;">
											<div v-if="resume.personal_data.nationalities.length > 1" class="text-xs-center">
												<b>Nationalities:</b>
												<ul class="list-horizontal">
													<li v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">{{ nationality.name }}</li>
												</ul>
											</div>
											<div v-else>
												<b>Nationality:</b> {{ resume.personal_data.nationalities[0].name }}
											</div>
										</v-flex>
										<v-flex xs12 sm6 class="text-xs-center" style="border: 1px solid blue;">
											<b>Languages:</b><br />
											<span v-for="(language, index) in resume.languages" :key="index">
												<v-chip label color="blue" class="white--text">{{ language.name }}</v-chip>
											</span>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12>
											{{ resume.personal_data.short_description }}
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12>
											social links
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex xs12>
											key competences
										</v-flex>
									</v-layout>

								</v-flex>
								<v-flex xs12 sm4 style="border: 1px solid orange;" v-if="profilePicture">
								<!-- <v-flex v-bind="{[`xs12 sm${column}`]: true}" style="border: 1px solid orange;" v-if="profilePicture"> -->
									<!-- <v-img src="/images/resumes/ivan.jpg" lazy-src="/images/loader.gif" size="" /> -->
									<v-img :src="profilePicture.downloadUrl" lazy-src="/images/loader.gif" />
									<!-- <v-img :src="`profilePicture.downloadUrl" /> -->
									profilePicture: {{ profilePicture }}
								</v-flex>
							</v-layout>
			    		</v-card-text>
			      	</v-card>
			    </v-flex>
			</v-layout>
			
			<br /><br />

			<!-- Section Education -->
			<v-layout row wrap v-if="resume.education">
				<v-flex xs12 sm8 offset-sm2>
			      	<h2 class="text-xs-center">Education</h2>
			      	<br />
			      	<v-card>
						<v-expansion-panel expand :value="[1]">
						    <v-expansion-panel-content v-for="(education, index) in resume.education" :key="index">
						      	<template v-slot:header>
							        <h3><v-icon color="amber" class="mr-2">school</v-icon> {{ education.title }}, {{ education.school }}</h3>
						      	</template>
						      	<v-card>
							        <v-card-text class="grey lighten-3">
							        	<p>
							        		{{ education.city }} - {{ education.country }},
							        		<i>{{ education.start_date }}</i> <span v-if="education.end_date">to</span> <i>{{ education.end_date }}</i>
							        	</p>
							        	<p>{{ education.description }}</p>
							        </v-card-text>
						      	</v-card>
						    </v-expansion-panel-content>
						</v-expansion-panel>
			      	</v-card>
		      	</v-flex>
		    </v-layout>

			<br /><br />

			<!-- Section Work experience -->
			<v-layout row wrap v-if="resume.work_experience">
				<v-flex xs12 sm8 offset-sm2>
			      	<h2 class="text-xs-center">Work experience</h2>
			      	<br />
			      	<v-card>
						<v-expansion-panel expand :value="[1]">
						    <v-expansion-panel-content v-for="(work_experience, index) in resume.work_experience" :key="index">
						      	<template v-slot:header>
							        <h3><v-icon color="amber" class="mr-2">work</v-icon> {{ work_experience.job_title }} at {{ work_experience.company }}</h3>
						      	</template>
						      	<v-card>
							        <v-card-text class="grey lighten-3">
							        	<p>
							        		{{ work_experience.city }} - {{ work_experience.country }},
							        		<i>{{ work_experience.start_date }}</i> <span v-if="work_experience.end_data">to</span> <i>{{ work_experience.end_date }}</i>
							        	</p>
							        	<p>{{ work_experience.job_description }}</p>
							        </v-card-text>
						      	</v-card>
						    </v-expansion-panel-content>
						</v-expansion-panel>
			      	</v-card>
		      	</v-flex>
		    </v-layout>

		    <br /><br />

			<!-- Section Skills -->
			<v-layout row wrap v-if="resume.skills">
				<v-flex xs12 sm8 offset-sm2>
					skills: {{ skills }}<br />
			      	<h2 class="text-xs-center">Skills</h2>
			      	<br />
			      	<v-card>
						<v-layout row wrap justify-center>
							<v-flex xs12 v-for="(skill, index) in skills" :key="index" class="pa-3 text-xs-center" style="border: 1px dotted orange; margin: 0px; padding: 0px;">
								skill: {{ skill }}<br />
								<h3 class="text-xs-center">{{ skill[0].category }}</h3>
								<v-layout align-center justify-center style="border: 1px solid green;">
									<!-- index: {{ index }} -->
									<v-flex xs12 sm6 md4 lg3 class="mx-0" v-for="s in skill" :key="s.name">
										<div v-if="s.type === 'pie'">
											<v-progress-circular
												:rotate="270"
												:size="100"
												:width="5"
												:value="s.value"
												color="blue-grey"
												style=""
											>
												{{ s.value }}%
											</v-progress-circular><br />
											{{ s.name }}
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
												color="blue-grey"
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

			<br /><br />

			<!-- Section Files -->
			<v-layout row wrap v-if="resume.uploads">
				<v-flex xs12 sm6 offset-sm3>
			      	<h2 class="text-xs-center">Files</h2>
			      	<br />
			  	</v-flex>
			</v-layout>

			
		</v-content>
	</v-app>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['resume'],
		mounted () {
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#a97afd'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
			this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#000'
			this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#fff'

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
					'--background-collor': this.backgroundColor,
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
			}
		}
	}
</script>

<style scoped>
	.text-big {
		font-size: 1.2em;
	}
	.list-horizontal li {
		display:inline-block;
	}
	.list-horizontal li:before {
		content: "\2022";
  		color: #000;
  		font-weight: bold;
  		display: inline-block;
  		width: 1em;
	}
</style>