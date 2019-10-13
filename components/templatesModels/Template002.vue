<template>
	<v-app v-cloak :style="cssProps" id="app">
		<v-navigation-drawer
			v-model="sidemenu"
			fixed
			app
		>
			<v-list dense>
				<v-list-item 
					to="#top"
					v-scroll-to="{
						el: '#top',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-item-action>
						<v-icon :color="primaryColor">home</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title><span class="primary-color">{{ resume.menus.presentation ? resume.menus.presentation : 'Presentation' }}</span></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<!-- <v-list-item 
					to="#about" 
					v-scroll-to="{
						el: '#about',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-item-action>
						<v-icon>perm_identity</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>About</v-list-item-title>
					</v-list-item-content>
				</v-list-item> -->
				<!-- <v-list-item 
					to="#whatIdo"
					v-scroll-to="{
						el: '#whatIdo',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-item-action>
						<v-icon>view_list</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>What I do</v-list-item-title>
					</v-list-item-content>
				</v-list-item> -->
				<v-list-item 
					to="#education"
					v-scroll-to="{
						el: '#education',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-item-action>
						<v-icon :color="primaryColor">business_center</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title><span class="primary-color">{{ resume.menus.education ? resume.menus.education : 'Education & Work Experience' }}</span></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item 
					to="#skills"
					v-scroll-to="{
						el: '#skills',
						container: '',
						duration: '1000',
						offset: -100
					}"
					v-if="resume.skills && resume.skills.length > 0"
				>
					<v-list-item-action>
						<v-icon :color="primaryColor">build</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title><span class="primary-color">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</span></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item 
					to="#files"
					v-scroll-to="{
						el: '#files',
						container: '',
						duration: '1000',
						offset: -100
					}"
					v-if="files && files.length > 0"
				>
					<v-list-item-action>
						<v-icon :color="primaryColor">picture_as_pdf</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title><span class="primary-color">{{ resume.menus.files ? resume.menus.files : 'Files' }}</span></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item 
					to="#contact"
					v-scroll-to="{
						el: '#contact',
						container: '',
						duration: '1000',
						offset: -100
					}"
					v-if="resume.parameters && resume.parameters.show_contact_form"
				>
					<v-list-item-action>
						<v-icon :color="primaryColor">contact_mail</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title><span class="primary-color">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</span></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.stop="sidemenu = !sidemenu">
					<v-list-item-action>
						<v-icon :color="primaryColor">exit_to_app</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title><span class="primary-color">Close sidemenu</span></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
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
				<!-- <v-layout class="my-5 section" id="top"> -->
				<v-row no-gutters class="my-5 section" id="top">
					<!-- <v-flex xs12 sm8 offset-sm2> -->
					<v-col cols="12" sm="8" offset-sm="2">
						<!-- <v-layout> -->
						<v-row no-gutters>
							<!-- <v-flex xs12 sm6 style=""> -->
							<v-col cols="12" sm="6">
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
								<!-- <v-layout class="justify-center"> -->
								<v-row justify="center">
									<v-chip label class="social-link" @click="redirectTo(social_network.link)" v-for="(social_network, index) in resume.social_networks" :key="index"><font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" :color="textColor" /></v-chip>
									<!-- <v-chip label class="social-link"><font-awesome-icon :icon="['fab', 'linkedin-in']" size="2x" /></v-chip> -->
									<!-- <v-chip label class="social-link"><font-awesome-icon :icon="['fab', 'github']" size="2x" /></v-chip> -->
								<!-- </v-layout> -->
								</v-row>
							<!-- </v-flex> -->
							</v-col>
							<!-- <v-flex xs12 sm6 v-if="profilePicture"> -->
							<v-col cols="12" sm="6" v-if="profilePicture">
								<!-- <v-layout justify-center> -->
								<v-row justify="center">
									<v-avatar
										size="350"
										color="grey lighten-4"
									>
										<v-img 
											:src="profilePicture.downloadUrl"
											:lazy-src="profilePicture.downloadUrl" 
											alt="Profile picture"
										/>
									</v-avatar>
								<!-- </v-layout> -->
								</v-row>
							<!-- </v-flex> -->
							</v-col>
						<!-- </v-layout> -->
						</v-row>
					<!-- </v-flex> -->
					</v-col>
				<!-- </v-layout> -->
				</v-row>


				<!-- Section About -->
				<!-- <v-layout row wrap style="" id="about" class="my-5 section" v-if="resume.personal_data.short_description"> -->
				<v-row no-gutters id="about" class="my-5 section" v-if="resume.personal_data.short_description">
					<!-- <v-flex xs12 sm8 offset-sm2> -->
					<v-col cols="12" sm="8" offset-sm="2">
						<!-- <v-layout align-center> -->
						<v-row align="center">
							<!-- <v-flex xs12 sm6 pr-5 class="hidden-xs-only"> -->
							<v-col cols="12" sm="6" class="hidden-xs-only pr-5">
								<v-img src="/images/ab-img.png"></v-img>
							<!-- </v-flex> -->
							</v-col>
							<!-- <v-flex xs12 sm6 style=""> -->
							<v-col cols="12" sm="6">
								<h2>{{ resume.menus['presentation'] || 'Presentation' }}</h2>
								<p>{{ resume.personal_data.short_description }}</p>
								<v-chip class="skill" v-for="(competence, index) in resume.key_competences" :key="index">{{ competence.name }}</v-chip>
							<!-- </v-flex> -->
							</v-col>
						<!-- </v-layout> -->
						</v-row>
					<!-- </v-flex> -->
					</v-col>
				<!-- </v-layout> -->
				</v-row>



				<!-- Section Education & Work experience -->
				<!-- <v-layout row wrap class="my-5 section" id="education"> -->
				<v-row no-gutters class="my-5 section" id="education">
					<!-- <v-flex xs12 sm4 offset-sm2 class="pr-4"> -->
					<v-col cols="12" sm="4" offset-sm="2" class="pr-4">
						<h1 class="text-center">{{ resume.menus['education'] || 'Education' }}</h1><br />
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
					<!-- </v-flex> -->
					</v-col>
					<!-- <v-flex xs12 sm4 class="pl-4"> -->
					<v-col cols="12" sm="4" class="pl-4">
						<h1 class="text-center">{{ resume.menus['work_experience'] || 'Work experience' }}</h1><br />
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
					<!-- </v-flex> -->
					</v-col>
				<!-- </v-layout> -->
				</v-row>
	


				<!-- Section Skills  -->
				<!-- <v-layout row wrap id="skills" class="my-5 section"> -->
				<v-row no-gutters id="skills" class="my-5 section">
					<!-- <v-flex xs12 sm8 offset-sm2 style=""> -->
					<v-col cols="12" sm="8" offset-sm="2">
						<h1 class="text-center">{{ resume.menus['skills'] || 'Skills' }}</h1>
						<br /><br />
						<!-- <v-layout row wrap justify-center> -->
						<v-row justify="center">
							<!-- <v-flex xs12 sm6 v-for="(skill, index) in skills" :key="index" class="pa-3 text-xs-center"> -->
							<v-col cols="12" sm="6" class="pa-3 text-center" v-for="(skill, index) in skills" :key="index">
								<div>
									<!-- index: {{ index }} -->
									<h1 class="text-center mb-3">{{ skill[0].category }}</h1>
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
											<!-- <v-layout class="pb-0"> -->
											<v-row no-gutters class="pb-0">
												<!-- <v-flex class="text-xs-left"> -->
												<v-col class="text-left">
													<span>{{ s.name }}</span>
												<!-- </v-flex> -->
												</v-col>
												<!-- <v-flex class="text-xs-right"> -->
												<v-col class="text-right">
													<span>{{ s.value }}%</span>
												<!-- </v-flex> -->
												</v-col>
											<!-- </v-layout> -->
											</v-row>
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
							<!-- </v-flex> -->
							</v-col>
						<!-- </v-layout> -->
						</v-row>
					<!-- </v-flex> -->
					</v-col>
				<!-- </v-layout> -->
				</v-row>


				<!-- Section Files -->
				<!-- <v-layout row wrap id="files" class="my-5 section" v-if="files && files.length > 0"> -->
				<v-row id="files" class="my-5 section" v-if="files && files.length > 0">
					<!-- <v-flex xs12 sm8 offset-sm2> -->
					<v-col cols="12" sm="8" offset-sm="2">
						<h1 class="text-center">{{ resume.menus['files'] || 'Files' }}</h1>
						<br /><br />
						<!-- <v-layout row wrap justify-center> -->
						<v-row no-gutters justify="center">
							<!-- <v-flex xs6 md4 lg3 v-for="(file, index) in files" :key="index" class="pa-2" style=""> -->
							<v-col cols="6" md="4" lg="3" class="pa-2" v-for="(file, index) in files" :key="index">
								<v-card hover @click="redirectTo(file.downloadUrl)" class="secondary-color-background">
									<v-card-title class="">
										<!-- <v-layout justify-center> -->
										<v-row justify="center">
											<h3 class="text-xs-center text-color">{{ file.title }}</h3>
										<!-- </v-layout> -->
										</v-row>
									</v-card-title>
									<v-card-text class="text-xs-center">
										<font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" :color="primaryColor" class="" /><br />
									</v-card-text>
								</v-card>
							<!-- </v-flex> -->
							</v-col>
						<!-- </v-layout> -->
						</v-row>
					<!-- </v-flex> -->
					</v-col>
				<!-- </v-layout> -->
				</v-row>


				<!-- Section Contact -->
				<!-- <v-layout row wrap id="contact" class="my-5 section" v-if="resume.parameters && resume.parameters.show_contact_form"> -->
				<v-row no-gutters id="contact" class="my-5 section" v-if="resume.parameters && resume.parameters.show_contact_form">
					<!-- <v-flex xs12 sm8 offset-sm2> -->
					<v-col cols="12" sm="8" offset-sm="2">
						<h1 class="text-center">{{ resume.menus['contact'] || 'Contact' }}</h1>
						<br /><br />
						<v-form>
							<!-- <v-layout row wrap> -->
							<v-row no-gutters>
								<!-- <v-flex xs6 class="pr-3"> -->
								<v-col cols="6" class="pr-3">
									<v-text-field
										outline
										name="firstname_template2"
										:label="resume.fields['firstname'] || 'Firstname'"
										v-model="contactForm.firstname"
										v-validate="'required|max:40'"
										:error-messages="errors ? errors.collect('firstname_template2') : null"
										:data-vv-as="resume.fields['firstname'] || 'Firstname'"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								<!-- </v-flex> -->
								</v-col>
								<!-- <v-flex xs6 class="pl-3"> -->
								<v-col cols="6" class="pl-3">
									<v-text-field
										outline
										name="lastname_template2"
										:label="resume.fields['lastname'] || 'Lastname'"
										v-model="contactForm.lastname"
										v-validate="'required|max:40'"
										:error-messages="errors ? errors.collect('lastname_template2') : null"
										:data-vv-as="resume.fields['lastname'] || 'Lastname'"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								<!-- </v-flex> -->
								</v-col>
								<!-- <v-flex xs12> -->
								<v-col cols="12">
									<!-- <v-text-field
										outline
										name="email_template2"
										:label="resume.fields['email'] || 'Email'"
										v-model="contactForm.email"
										v-validate="'required|email'"
										:error-messages="errors ? errors.collect('email_template2') : null"
										:data-vv-as="resume.field['email'] || 'Email'"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field> -->
								<!-- </v-flex> -->
								</v-col>
								<!-- <v-flex xs12> -->
								<v-col cols="12">
									<v-textarea
										outline
										name="message_template2"
										:label="resume.fields['message'] || 'Message'"
										v-model="contactForm.message"
										v-validate="'required|max:2056'"
										:error-messages="errors ? errors.collect('message_template2') : null"
										:data-vv-as="resume.fields['message'] || 'Message'"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-textarea>
								<!-- </v-flex> -->
								</v-col>
								<v-btn rounded block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" :color="primaryColor" @click.prevent="sendMessage">{{ resume.fields['send_message'] || 'Send message' }}</v-btn>
							<!-- </v-layout> -->
							</v-row>
						</v-form>
					<!-- </v-flex> -->
					</v-col>
				<!-- </v-layout> -->
				</v-row>
			</div>
			<br />
		</v-content>

		<v-footer :color="primaryColor" class="white--text justify-center py-4">
			<!-- <span class="ml-2">{{ new Date() | moment('Y') }} - </span> -->
			<nuxt-link to="/" class="link">
				<!-- <v-layout align-center justify-center> -->
				<v-row no-gutters justify="center" align="center">
					<img src="/images/logo_small.png" width="30" />&nbsp;
					<span class="title">LoginMyCV</span>
				<!-- </v-layout> -->
				</v-row>
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
				contactForm: {
					valid: true,
					firstname: '',
					lastname: '',
					email: '',
					message: '',
				},
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
					social_networks: [
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
							name: "PHP",
							category: "Technical skill",
							type: "pie",
							value: 60
						},
						{
							name: "JavaScript",
							category: "Technical skill",
							type: "pie",
							value: 75
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
					"--primary-color": this.colors.primaryColor,
					"--secondary-color": this.colors.secondaryColor,
					"--tertiary-color": this.colors.tertiaryColor,
					"--background-color": this.colors.backgroundColor,
					"--text-color": this.colors.textColor
				};
			},
			errors() {
				return this.$store.getters['errors']
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
		color: var(--primary-color);
	}
	.nav-item:hover {
		padding-bottom: 10px;
		cursor: pointer;
		color: var(--text-color);
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
	.button {
		padding-top: 0px;
		padding-bottom: 0px;
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
	.toolbar {
		display: inline;
		background: var(--secondary-color);
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
	.rounded-border {
		border-bottom-left-radius: 0px;
	}
	>>> .v-chip__content {
		cursor: pointer !important;
	}
	>>>.v-text-field--outline .v-label {
		color: var(--text-color);
	}
</style>