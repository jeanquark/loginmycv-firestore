<template>
	<v-app>
		<div class="fullpage-container background-color text-color">
			<div class="button-group">
				<button type="button" :class="{active:index == 0}" @click="moveTo(0)">Presentation</button>
				<button type="button" :class="{active:index == 1}" @click="moveTo(1)" v-if="resume.education && resume.education.length > 0">Education</button>
				<button type="button" :class="{active:index == 2}" @click="moveTo(2)" v-if="resume.work_experience && resume.work_experience.length > 0">Work experience</button>
				<button type="button" :class="{active:index == 3}" @click="moveTo(3)" v-if="resume.uploads && resume.uploads.length > 0">Files</button>
				<!-- <button type="button" :class="{active:index == 4}" @click="moveTo(4)">Contact</button> -->
			</div>
			<div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
				<div class="page-1 page text-color">
					<v-layout row wrap>
						<v-flex xs6 class="pa-4" style="border: 1px solid orange;">
							<v-layout row wrap>
								<v-flex xs6 class="text-xs-center">
									<v-avatar
										:tile="false"
										:size="250"
										color="grey lighten-4"
										v-if="profilePicture"
									>
										<img :src="profilePicture" alt="profile picture">
									</v-avatar>
								</v-flex>
								<v-flex xs6>
									<h2>{{ resume.personal_data.firstname }} {{ resume.personal_data.lastname }}</h2>
									<h3>{{ resume.job_title }}</h3>
									<h4>{{ resume.job_description }}</h4>
									<p>{{ resume.personal_data.country.name }}</p>
									<p>{{ resume.personal_data.email }}</p>
									<p>{{ resume.languages }}</p>
									<p>{{ resume.social_networks }}</p>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-flex xs6 class="pa-4" style="border: 1px solid orangered;">
							<div class="text-xs-left" v-for="(file, index) in files" :key="index">
								 {{ file.name }}
							</div>
						</v-flex>
					</v-layout>
				</div>
				<div class="page-2 page" style="background-image: linear-gradient(120deg, orangered, white);">
				<!-- <div class="page-2 page" style="background-color: red;"> -->
					<p class="part-2" v-animate="{value: 'bounceInRight'}">page-2 page</p>
				</div>
				<div class="page-3 page">
					<p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">page-3 page</p>
				</div>
				<div class="page-4 page" style="background: yellow;">
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
	head () {
		return {
			title: this.title,
			meta: [
				{ hid: 'description', name: 'description', content: 'Ma description personnalisée' }
			],
			link: []
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
					// console.log('before', current, next)
					this.index = next;
				},
				afterChange (ele, current) {
					this.index = current;
					// console.log('after', current)
				}
			},
			image: 'https://picsum.photos/id/975/1024/900',
			primaryColor: '',
			secondaryColor: '',
			tertiaryColor: '',
			backgroundColor: '',
			textColor: '',
			profilePicture: {},
		}
	},
	computed: {
		cssProps() { 
			return {
				'--url2': url('https://picsum.photos/id/975/1024/900'),
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
		moveTo: function(index) {
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
        text-align: center;
        font-size: 26px;
        color: #eee;
    }
    .page-1 {
        padding-top: 100px;
        background-color: #1bbc9b;
    }
    .page-2 {
        padding-top: 50px;
		/* background: url('https://picsum.photos/id/975/1024/900') no-repeat center center; */
		/* background: var(--url2) no-repeat center center; */
		background-color: var(--background-color);
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
    }
    .page-3 {
        padding-top: 50px;
		background: url('https://picsum.photos/id/976/1024/900') no-repeat center center;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;

		/* background: url('https://picsum.photos/id/976/1024/900') no-repeat center center fixed;*/
    }

	.button-group {
        position: absolute;
        top: 30px;
        left: 30px;
        z-index: 9;
    }
    .button-group button {
        display: inline-block;
        margin: 10px;
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
</style>