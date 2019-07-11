<template>
	<v-app
	    v-cloak
	    :style="cssProps"
	>
		<!-- <v-content class="background-color"> -->
		<div class="background-color">
			<v-layout
			    row
			    wrap
			    class="margin-top margin-bottom"
			>
				<v-flex
				    xs12
				    sm8
				    offset-sm2
				>
					<v-card
					    elevation-10
					    class="secondary-color-background"
					>
						<v-card-text>
							<v-layout
							    row
							    wrap
							>
								<v-flex
								    xs12
								    class="mb-4"
								>
									<h1 class="text-xs-center mb-2 text-color">{{ resume.job_title }}</h1>
									<h3 class="text-xs-center mb-2">{{ resume.job_description }}</h3>
								</v-flex>
								<v-flex
								    xs12
								    sm8
								>
									<v-layout
									    row
									    wrap
									    align-center
									    class="text-big"
									>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>Firstname: <b>{{ resume.personal_data.firstname }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										    v-if="resume.personal_data.middlename"
										>
											<span>Middle name: <b>{{ resume.personal_data.middlename }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>Lastname: <b>{{ resume.personal_data.lastname }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>Age: <b>{{ calculateAge(resume.personal_data.birthday) }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>City: <b>{{ resume.personal_data.city }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>Country: <b>{{ resume.personal_data.country.name }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>Email: <b>{{ resume.personal_data.email }}</b></span>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="pa-2"
										>
											<span>Phone number: <b>{{ resume.personal_data.phone_number }}</b></span>
										</v-flex>
									</v-layout>
									<v-layout
									    row
									    wrap
									    class="px-2 text-big"
									    v-if="resume.personal_data.nationalities || resume.languages"
									>
										<v-flex
										    xs12
										    sm6
										    v-if="resume.personal_data.nationalities"
										>
											<div
											    v-if="resume.personal_data.nationalities.length > 1"
											    class="text-xs-left"
											>
												<span>Nationalities:</span>
												<ul class="list-horizontal">
													<li
													    v-for="(nationality, index) in nationalities"
													    :key="index"
													><b>{{ nationality.name }}</b></li>
												</ul>
											</div>
											<div v-else>
												<span>Nationality: <b>{{ resume.personal_data.nationalities[0].name }}</b></span>
											</div>
										</v-flex>
										<v-flex
										    xs12
										    sm6
										    class="text-xs-center pa-2"
										    v-if="resume.languages"
										>
											<div
											    v-if="resume.languages.length > 1"
											    class="text-xs-left"
											>
												<span>Languages:</span>
												<ul class="list-horizontal">
													<li
													    v-for="(language, index) in languages"
													    :key="index"
													>
														<b>{{ language.name }}</b>
														<span v-if="resume.parameters.show_language_level"> - {{ getLanguageQualitativeLevel(language.level) }}</span>
													</li>
												</ul>
											</div>
											<div v-else>
												<span>Language: {{ resume.languages[0].name }}</span>
											</div>
										</v-flex>
									</v-layout>
									<v-layout class="my-3 px-2">
										<v-flex
										    xs12
										    v-if="resume.personal_data.short_description"
										>
											<span>{{ resume.personal_data.short_description }}</span>
										</v-flex>
									</v-layout>
									<v-layout
									    class="my-3 px-2"
									    v-if="resume.social_links"
									>
										<v-flex
										    xs12
										    class="text-xs-center"
										>
											<v-chip
											    label
											    v-for="(social_network, index) in resume.social_networks"
											    :key="index"
											    class="social-link"
											>
												<font-awesome-icon
												    :icon="['fab', social_network.fontawesome]"
												    size="2x"
												/>
											</v-chip>
										</v-flex>
									</v-layout>

									<v-layout class="my-3 px-2">
										<v-flex
										    xs12
										    class="text-xs-center"
										>
											<v-chip
											    label
											    class="social-link"
											>
												<font-awesome-icon
												    :icon="['fab', 'facebook-f']"
												    size="2x"
												/>
											</v-chip>
										</v-flex>
									</v-layout>
								</v-flex>
								<v-flex
								    xs12
								    sm4
								>
									<v-img
									    :src="resume.picture"
									    :lazy-src="resume.picture"
									    alt="profile picture"
									/>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>

			<!-- Section Education -->
			<v-layout
			    row
			    wrap
			    class="margin-bottom"
			>
				<v-flex
				    xs12
				    sm8
				    offset-sm2
				>
					<h2 class="text-xs-center display-1 primary-color">Education</h2>
					<br />
					<v-card class="secondary-color-background">
						<v-expansion-panel
						    expand
						    :value="[1]"
						>
							<v-expansion-panel-content
							    v-for="(education, index) in resume.education"
							    :key="index"
							    style="background: var(--secondary-color);"
							>
								<template v-slot:header>
									<h3>
										<v-icon
										    :color="primaryColor"
										    class="mr-2"
										>school</v-icon> {{ education.title }}, {{ education.school }}
									</h3>
								</template>
								<v-icon
								    slot="actions"
								    color="primary"
								>$vuetify.icons.expand</v-icon>
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
			<v-layout
			    row
			    wrap
			    class="margin-bottom"
			    v-if="resume.work_experience && resume.work_experience.length > 0"
			>
				<v-flex
				    xs12
				    sm8
				    offset-sm2
				>
					<h2 class="text-xs-center display-1 primary-color">Work experience</h2>
					<br />
					<v-card class="secondary-color-background">
						<v-expansion-panel
						    expand
						    :value="[1]"
						>
							<v-expansion-panel-content
							    v-for="(work_experience, index) in resume.work_experience"
							    :key="index"
							    style="background: var(--secondary-color);"
							>
								<template v-slot:header>
									<h3>
										<v-icon
										    :color="primaryColor"
										    class="mr-2"
										>work</v-icon> {{ work_experience.job_title }} at {{ work_experience.company }}
									</h3>
								</template>
								<v-icon
								    slot="actions"
								    color="primary"
								>$vuetify.icons.expand</v-icon>
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
			<v-layout
			    row
			    wrap
			    class="margin-bottom"
			    v-if="resume.skills && resume.skills.length > 0"
			>
				<v-flex
				    xs12
				    sm8
				    offset-sm2
				>
					<h2 class="text-xs-center display-1 primary-color">Skills</h2>
					<br />
					<v-card class="secondary-color-background">
						<v-layout
						    row
						    wrap
						    justify-center
						>
							<v-flex
							    xs12
							    v-for="(skill, index) in skills"
							    :key="index"
							    class="pa-3 text-xs-center"
							>
								<h3 class="text-xs-center mb-2">{{ skill[0].category }}</h3>
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
			<v-layout
			    row
			    wrap
			    class="margin-bottom"
			    v-if="resume.files && resume.files.length > 0"
			>
				<v-flex
				    xs12
				    sm8
				    offset-sm2
				>
					<h2 class="text-xs-center display-1 primary-color">Files</h2>
					<br />
					<v-layout
					    row
					    wrap
					    justify-center
					>
						<v-flex
						    xs6
						    md4
						    lg3
						    v-for="(file, index) in resume.files"
						    :key="index"
						    class="pa-2"
						    style=""
						>
							<v-card
							    hover
							    class="secondary-color-background"
							>
								<v-card-title class="">
									<v-layout justify-center>
										<h3 class="text-xs-center">{{ file.title }}</h3>
									</v-layout>
								</v-card-title>
								<v-card-text class="text-xs-center">
									<font-awesome-icon
									    :icon="['fas', 'file-pdf']"
									    size="5x"
									    :color="primaryColor"
									    class=""
									/><br />
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>

			<!-- Section Contact -->
			<v-layout
			    row
			    wrap
			    id="contact"
			    class="my-5 section"
			    v-if="resume.parameters && resume.parameters.show_contact_form"
			>
				<v-flex
				    xs12
				    sm8
				    offset-sm2
				>
					<h2 class="text-xs-center display-1 primary-color">Contact Me</h2>
					<br /><br />
					<v-form>
						<v-layout
						    row
						    wrap
						    class="secondary-color-background pa-5"
						>
							<v-flex
							    xs6
							    class="pr-3"
							>
								<v-text-field
								    outline
								    name="firstname_template1"
								    label="First name"
								    :color="primaryColor"
								    :background-color="primaryColor"
								    dark
								></v-text-field>
							</v-flex>
							<v-flex
							    xs6
							    class="pl-3"
							>
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
							<v-btn
							    round
							    block
							    large
							    class="white--text"
							    style="padding-top: 0px; padding-bottom: 0px;"
							    :color="primaryColor"
							>Send message</v-btn>
						</v-layout>
					</v-form>
				</v-flex>
			</v-layout>
			<!-- </v-content> -->
		</div>

		<v-footer
		    :color="primaryColor"
		    class="white--text justify-center pa-4"
		>
			<nuxt-link
			    to="/"
			    class="link"
			>
				<v-layout
				    align-center
				    justify-center
				>
					<img
					    src="/images/logo_small.png"
					    width="30"
					/>&nbsp;
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
			this.primaryColor =
				this.resume.colors && this.resume.colors.primaryColor
					? this.resume.colors.primaryColor
					: ""
			this.secondaryColor =
				this.resume.colors && this.resume.colors.secondaryColor
					? this.resume.colors.secondaryColor
					: ""
			this.tertiaryColor =
				this.resume.colors && this.resume.colors.tertiaryColor
					? this.resume.colors.tertiaryColor
					: ""
			this.backgroundColor =
				this.resume.colors && this.resume.colors.backgroundColor
					? this.resume.colors.backgroundColor
					: ""
			this.textColor =
				this.resume.colors && this.resume.colors.textColor
					? this.resume.colors.textColor
					: ""
		},
		data() {
			return {
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
					picture: "/images/hero.png",
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
						}
					],
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
	>>> .v-chip__content {
		cursor: pointer !important;
	}
</style>