<template>
	<v-app>
		<div class="fullpage-container background-color text-color">
			<div class="button-group ma-4" v-if="resume.education.length > 0 || resume.work_experience.length > 0 || resume.skills.length > 0" style="">
				<button type="button" :class="{active:index == 0}" @click="moveTo(0)">Presentation</button>
				<button type="button" :class="{active:index == 1}" @click="moveTo(1)" v-if="resume.education && resume.education.length > 0">Education</button>
				<button type="button" :class="{active:index == 2}" @click="moveTo(2)" v-if="resume.work_experience && resume.work_experience.length > 0">Work experience</button>
				<!-- <button type="button" :class="{active:index == 4}" @click="moveTo(4)">Contact</button> -->
				<!-- primaryColor: {{ primaryColor }}<br /> -->
				index: {{ index }}<br />
				opts.def: {{ opts.def }}<br />
			</div>
			<div class="fullpage-wp" v-fullpage="opts" ref="fullpage" style="">
				<div class="page page-1 text-color" style="border: 3px solid green; height: 100%; overflow-y: auto;" ref="page">
					<v-layout row wrap ref="subpage" style="">
						<v-flex xs12 sm6 class="pa-4" style="border: 2px solid red; height: 100%; overflow-y: auto;">
							<v-layout row wrap>
								<v-flex xs12 sm6 class="text-xs-center" v-if="profilePicture" :ref="'subpage3'">
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
									index: {{ this.index }}<br />
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
											<span v-for="(language, index) in resume.languages" :key="index">
												{{ language.name }}<span v-if="index + 1 < resume.languages.length">, </span>
											</span>
										</v-flex>
									</v-layout>
									<v-layout row wrap>
										<v-flex xs12 class="text-xs-center">
												<v-chip label class="social-link" v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)"><font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" /></v-chip>
										</v-flex>
									</v-layout>
									<p class="primary-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-flex xs12 sm6 class="pa-4" style="border: 1px solid orangered;">
							<div class="text-xs-left" v-for="(file, index) in files" :key="index">
								<font-awesome-icon :icon="['fas', 'file-pdf']" /> {{ file.name }}
								<p style="font-size: 1.5em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							</div>
						</v-flex>
						
					</v-layout>
					
				</div>
				<div class="page page-2" style="background-image: linear-gradient(120deg, orangered, white);" v-if="resume.education && resume.education.length > 0">
					index: {{ this.index }}<br />

				<!-- <div class="page-2 page" style="background-color: red;"> -->
					<p class="part-2" v-animate="{value: 'bounceInRight'}">page-2 page</p>
					<v-layout row wrap class="mt-5 px-4">
						<v-flex xs12 sm6 md4 v-for="(education, index) in resume.education" :key="index">
							<v-card color="#202026" style="border-radius: 10px;" v-animate="{value: 'rotateIn'}">
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
				</div>
				<div class="page page-3" v-if="resume.work_experience && resume.work_experience.length > 0">
					<p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">page-3 page</p>
				</div>
				<div class="page page-4" v-if="resume.skills && resume.skills.length > 0" style="background: yellow;">
					<p class="part-4" v-animate="{value: 'bounceInLeft'}">page-4 page</p>
				</div>
				<div class="page-5 page" style="background: yellow;">
					<p class="part-5" v-animate="{value: 'bounceInLeft'}">page-5 page</p>
				</div>
			</div>
			<!-- <button @click="moveNext">next</button> -->
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
			link: []
		}
	},
	mounted () {
		this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
		this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#FFF'
		this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : '#1BBC9B'
		this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#FFF'
		this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#000'
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
				def: 'def',
				beforeChange (ele, current, next) {
					console.log('before', current, next)
					console.log('this.index: ', this.index)
					this.index = next
					// this.index += 1
					alert('this.index: ', this.index)
				},
				afterChange: function (ele, current) {
					this.index = current
					console.log('after', current)
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
			abc: '',
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
		moveTo (index) {
			this.$refs.fullpage.$fullpage.moveTo(index, true);
			this.index = index
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
			window.open(link, '_blank')
		}
	}
}
</script>

<style scoped>
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
    }
    .page-1 {
        padding-top: 50px;
        background-color: var(--background-color);
    }
    .page-2 {
        padding-top: 50px;
		background-color: var(--tertiary-color);
    }
    .page-3 {
        padding-top: 50px;
		background-color: var(--background-color);
    }
	.page-4 {
		padding-top: 50px;
		background-color: var(--tertiary-color);
	}

	.button-group {
        position: absolute;
        /* top: 30px; */
        /* left: 30px; */
        z-index: 9;
		/* width: 100%; */
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

	.background-color {
		/* background-color: var(--background-color); */
		background-color: orange;
	}
	.text-color {
		/* color: var(--text-color); */
		color: blue;
	}
	.text-big {
		font-size: 1.2em;
	}
	.social-link {
		background-color: var(--background-color);
		color: var(--text-color);
		cursor: pointer;
	}
	.social-link:hover {
		background-color: var(--background-color);
		/* color: var(--primary-color); */
		color: pink;
		cursor: pointer;
	}
	.primary-color {
		color: yellow;
		/* color: var(--primary-color); */
	}

	::-webkit-scrollbar {
		width: 15px;
	}
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb {
		background: #888;
		/* background: var(--primary-color); */
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
		/* background: var(--secondary-color); */
	}
</style>