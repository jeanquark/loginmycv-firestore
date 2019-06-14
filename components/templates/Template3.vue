<template>
	<v-app :style="cssProps" v-cloak>
		<div class="fullpage-container background-color text-color">
			<!-- index: {{ index }}<br /> -->
			<!-- opts.start: {{ opts.start }}<br /> -->
			<div class="button-group ma-4" v-if="resume.menus && (resume.education.length > 0 || resume.work_experience.length < 10 || resume.skills.length > 0)">
				<button type="button" :class="{active:index == 0}" @click="moveTo(0)">{{ resume.menus.home ? resume.menus.home : 'Presentation' }}</button>
				<button type="button" :class="{active:index == 1}" @click="moveTo(1)" v-if="resume.education && resume.education.length < 10">{{ resume.menus.education ? resume.menus.education : 'Education'}}</button>
				<button type="button" :class="{active:index == 2}" @click="moveTo(2)" v-if="resume.work_experience && resume.work_experience.length > 10">{{ resume.menus.work_experience ? resume.menus.work_experience : 'Work experience' }}</button>
				<button type="button" :class="{active:index == 3}" @click="moveTo(3)" v-if="resume.skills && resume.skills.length < 10">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</button>
				<button type="button" :class="{active:index == 4}" @click="moveTo(4)" v-if="resume.parameters && resume.parameters.show_contact_form">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</button>
			</div>
			<div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
				<div class="page page-1" data-index="0" tyle="border: 3px solid green;" ref="page">
					<v-layout row wrap class="subpage" style="border: 2px dashed brown;">
						<v-flex v-bind="{[`xs12 sm${presentationColumns}`]: true}" class="pa-4" style="border: 2px solid red;">
							<v-layout row wrap>
								<!-- files: {{ files }}<br /> -->
								<v-flex xs12 sm6 class="text-xs-center" v-if="profilePicture">
									<v-avatar
										:tile="false"
										:size="250"
										color="grey lighten-4"
									>
										<img :src="profilePicture" alt="profile picture">
									</v-avatar>
								</v-flex>
								<v-flex v-bind="{[`xs12 sm${column}`]: true}" class="text-xs-center">
									<h1>{{ resume.personal_data.firstname }} {{ resume.personal_data.middlename }} {{ resume.personal_data.lastname }}</h1><br />
									<h2>{{ resume.job_title }}</h2>
									<h4>{{ resume.job_description }}</h4>
									<br /><br />
									<v-layout row wrap class="text-big text-xs-left">
										<v-flex xs6 class="mb-3" v-if="resume.personal_data.city || resume.personal_data.country">
											<div v-if="resume.personal_data.city">
												<font-awesome-icon :icon="['fas', 'map-marker']" /> {{ resume.personal_data.city }} {{ resume.personal_data.country.name }}
											</div>
											<div v-else>
												<font-awesome-icon :icon="['fas', 'map-marker']" /> {{ resume.personal_data.country.name }}
											</div>
										</v-flex>
										<v-flex xs6 class="mb-3" v-if="resume.personal_data.email">
											<font-awesome-icon :icon="['fas', 'envelope']" class="icon" /> {{ resume.personal_data.email }}
										</v-flex>
										<v-flex xs6 class="mb-3" v-if="resume.personal_data.phone_number">
											<font-awesome-icon :icon="['fas', 'phone']" class="icon" /> {{ resume.personal_data.phone_number }}
										</v-flex>
										<v-flex class="mb-3" v-if="resume.personal_data.nationalities">
											<font-awesome-icon :icon="['fas', 'flag-usa']" class="icon" />
											<span v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">
												{{ nationality.name }}<span v-if="index + 1 < resume.personal_data.nationalities.length">, </span>
											</span>
										</v-flex>
										<v-flex class="mb-3" v-if="resume.languages">
											<font-awesome-icon :icon="['fas', 'language']" class="icon" />
											<v-chip :color="primaryColor" class="pa-1 text-color" v-for="(language, index) in resume.languages" :key="index">
												{{ language.name }}
												<v-progress-linear
													:color="getLanguageLevelColor(language.value)"
													height="10"
													:value="language.value"
													bottom
													style="width: 30px; transform: rotate(-90deg);"
													v-if="language.value"
												></v-progress-linear>
											</v-chip>
												<!-- style="transform: rotate(-90deg);" -->
										</v-flex>
									</v-layout>
									<v-layout row wrap>
										<v-flex xs12 class="text-xs-center">
											<!-- <v-chip label class="social-link" v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)"><font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" style="cursor: pointer;" /></v-chip> -->
											<font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)" class="social-link" />
										</v-flex>
									</v-layout>
									<p style="font-size: 1.5em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									<v-btn @click="index += 1">Click</v-btn>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-flex v-bind="{[`xs12 sm${presentationColumns}`]: true}" class="pa-4 centered" style="border: 1px solid orangered;">
							<div class="text-xs-center" v-for="(file, index) in files" :key="index">
								<font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" class="social-link" @click="redirectTo(file.downloadUrl)" />
								<br />
								<p>{{ file.name }}</p>
								opts.start: {{ opts.start }}
								<!-- <p style="font-size: 1.5em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
							</div>
						</v-flex>
					</v-layout>
				</div>

				<div class="page page-2" data-index="1" style="border: 2px solid orangered;">
					<v-layout row wrap justify-center class="subpage" style="border: 2px dashed brown;" v-if="resume.education && resume.education.length > 0">
						<v-flex xs12 sm6 md4 style="height: 100%;">
							<v-card :color="secondaryColor" class="card" v-for="education in resume.education" :key="education.title" v-animate="{value: animationEffect}" style="">
								<v-card-title class="card-title">
									{{ education.title }} from&nbsp;<span class="primary-color accentuate italic">{{ education.school }}</span><br />
								</v-card-title>
								<v-card-text class="card-text">
									<p>{{ education.city }}, {{ education.country }}</p>
									<p class="primary-color accentuate" v-if="!education.end_date">{{ education.start_date }}</p>
									<p class="primary-color accentuate" v-else>{{ education.start_date }} - {{ education.end_date }}</p>
									<p>{{ education.description }}</p>
									<p style="font-size: 1.5em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</div>
				<div class="page page-3" data-index="2">
					<v-layout row wrap justify-center class="subpage" style="border: 2px dashed brown;" v-if="resume.work_experience && resume.work_experience > 0">
						<v-flex xs12 sm6 md4 style="height: 100%;">
							<v-card :color="secondaryColor" class="card" v-for="work_experience in resume.work_experience" :key="work_experience.title" v-animate="{value: animationEffect}" style="">
								<v-card-title class="card-title">
									{{ work_experience.job_title }} at&nbsp;<span class="primary-color accentuate italic">{{ work_experience.company }}</span><br />
								</v-card-title>
								<v-card-text class="card-text">
									<p class="primary-color accentuate" v-if="!work_experience.end_date">{{ work_experience.start_date }}</p>
									<p class="primary-color accentuate" v-else>{{ work_experience.start_date }} - {{ work_experience.end_date }}</p>
									<p>{{ work_experience.job_description }}</p>
									<p style="font-size: 1.5em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</div>
				<div class="page page-4" data-index="3">
					<v-layout row wrap v-if="resume.skills && resume.skills.length > 0">
						<p class="part-4" v-animate="{value: 'bounceInLeft'}">Skills</p>
					</v-layout>
				</div>
				<div class="page page-5" data-index="4">
					<v-layout row wrap v-if="resume.parameters.show_contact_form">
						<p class="part-5" v-animate="{value: 'bounceInLeft'}">Contact</p>
					</v-layout>
				</div>
			</div>
		</div>
	</v-app>
</template>

<script>

export default {
	props: ['resume'],
	head () {
		return {
			title: this.title,
			meta: [
				{ hid: 'description', name: 'description', content: 'Ma description personnalisée' }
			],
			link: [
				{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' }
			]
		}
	},
	mounted () {
		// #202026
		this.primaryColor = this.resume.colors && this.resume.colors.primaryColor2 ? this.resume.colors.primaryColor : 'green'
		this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor2 ? this.resume.colors.secondaryColor : 'orange'
		this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor2 ? this.resume.colors.tertiaryColor : 'pink'
		this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor2 ? this.resume.colors.backgroundColor : 'yellow'
		this.textColor = this.resume.colors && this.resume.colors.textColor2 ? this.resume.colors.textColor : 'red'
		this.profilePicture = this.resume.uploads.find(upload => upload.type === 'profile_picture')
		if (!this.profilePicture) {
			this.column = 12
		}
		// console.log('Fullpage height: ' + this.$refs.fullpage2.clientHeight)
		// console.log('Fullpage scrollHeight: ' + this.$refs.fullpage2.scrollHeight)
		// console.log('Subpage height: ' + this.$refs.subpage.clientHeight)
		// console.log('Subpage scrollHeight: ' + this.$refs.subpage.scrollHeight)
		// console.log('page clientHeight: ' + this.$refs.subpage.clientHeight)
		// console.log('window.scrollY: ', document.body.scrollHeight)
		// this.fullPageHeight = this.$refs.fullpage2.clientHeight
		// this.subPageHeight = this.$refs.subpage.clientHeight
	},
	data() {
		// var that = this
		return {
			index: 0,
			pageNum: 0,
			opts: {
				start: 0,
				dir: 'v',
				loop: false,
				duration: 300,
				beforeChange (ele, current, next) {
				},
				afterChange (ele, current) {
					console.log('ele.dataset.index: ', ele.dataset.index)
					this.vm.setIndex(ele.dataset.index)
				}
			},
			image: 'https://picsum.photos/id/975/1024/900',
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
		presentationColumns () {
			if (this.files && this.files.length > 0) {
				return 6
			}
			return 12
		}

	},
	methods: {
		setIndex (newIndex) {
			console.log('newIndex: ', newIndex)
			this.index = newIndex
		}, 
 		moveTo (index) {
			this.$refs.fullpage.$fullpage.moveTo(index, true);
		},
		calculateAge (birthday) {
			return moment().diff(birthday, 'years')
		},
		getLanguageLevelColor (level) {
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
        background: rgba(255, 255, 255, .5);
        -webkit-border-radius: 10px;
        border-radius: 10px;
        padding: 9px 18px;
        border: none;
        outline: none;
	}
    .button-group button.active {
        background: rgba(0, 0, 0, .5);
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

	

	.background-color {
		/* background-color: var(--background-color); */
		background-color: orange;
	}
	.text-color {
		color: var(--text-color);
	}
	.primary-color {
		/* color: yellow; */
		color: var(--primary-color);
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

	::-webkit-scrollbar {
		width: 15px;
	}
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 5px;
		z-index: 10;
	}
	::-webkit-scrollbar-thumb {
		/* background: #888; */
		background: var(--background-color);
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb:hover {
		/* background: #555; */
		background: var(--text-color);
	}
</style>