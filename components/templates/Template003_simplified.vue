<template>
	<v-app :style="cssProps" v-cloak>
		<div class="fullpage-container">
        <div class="button-group">
            <button type="button" :class="{active:index ==0}" @click="moveTo(0)">first page</button>
            <button type="button" :class="{active:index ==1}" @click="moveTo(1)">Second page</button>
            <button type="button" :class="{active:index ==2}" @click="moveTo(2)">Third page</button>
            <button type="button" v-for="(btn, index) in pageNum" :key="index" :class="{active:index == btn + 2}" @click="moveTo(btn+2)">page {{btn+2}}
            </button>
            <button type="button" @click="showPage()">add page</button>
        </div>
        <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
            <div class="page-1 page" style="overflow-y: auto;">
				<div style="height: 1200px; border: 2px solid red;">
					<h1 class="part-1" v-animate="{value: 'bounceInLeft'}">vue-fullpage.js</h1>
					<h3 class="" v-animate="{value: 'bounceInLeft'}">A sigle-page scroll plugin based on vue@2.x,support for mobile and PC .</h3>
					<div>
						<p class="part-1" v-animate="{value: 'bounceInRight'}">vue-fullpage</p>
					</div>
				<!-- <div style="height: 1200px; border: 2px solid red; ">
					New content
				</div> -->
				</div>
            </div>
            <div class="page-2 page">
                <h2 class="part-2" v-animate="{value: 'bounceInRight'}">Easy to use plugin</h2>
            </div>
            <div class="page-3 page">
                <h2 class="" v-animate="{value: 'bounceInTop'}">Working On Tablets</h2>
                <h3 class="" v-animate="{value: 'bounceInBotton'}">Designed to fit different screen sizes as well as tablet and mobile devices. </h3>
                <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">vue-fullpage</p>
                <p class="part-3" v-animate="{value: 'bounceInRight', delay: 300}">vue-fullpage</p>
                <p class="part-3" v-animate="{value: 'bounceInDown', delay: 600}">vue-fullpage</p>
                <p class="part-3" v-animate="{value: 'zoomInDown', delay: 900}">vue-fullpage</p>
            </div>
            <div class="page-2 page" v-for="(page, index) in pageNum" :key="index">
                <h2 class="part-2" v-animate="{value: 'bounceInRight'}">page {{page}}</h2>
            </div>
        </div>
    </div>
	</v-app>
</template>

<script>
	import axios from 'axios'
	import Noty from 'noty'

	export default {
		inject: ['$validator'], // Inject vee-validate validator
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
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
			this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : '#424242'
			this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#7A528F'
			this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#FFF'
			this.profilePicture = this.resume.uploads.find(upload => upload.type === 'profile_picture')
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
					beforeChange: function(ele, current, next) {
						console.log('before', current, next)
						this.index = next
					},
					afterChange: function(ele, current) {
						this.index = current
						console.log('after', current)
					}
				},
				contactForm: {
					firstname: '',
					lastname: '',
					email: '',
					message: ''
				},
				primaryColor: '',
				secondaryColor: '',
				tertiaryColor: '',
				backgroundColor: '',
				textColor: '',
				profilePicture: {},
				column: 6,
				animationEffect: 'zoomIn',
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
			loading () {
				return this.$store.getters['loading']
			},
			errors () {
	            return this.$store.getters['errors']
	        },
	        snackbar () {
	        	return this.$store.getters['snackbar']
	        },
			clearSnackbar () {
	        	return this.$store.commit('clearSnackbar', false ,{ root: true })
	        },
			skills () {
				if (this.resume.skills) {
					const res = this.resume.skills.reduce((acc, curr) => {
						if(!acc[curr.category]) acc[curr.category] = [] // If this type wasn't previously stored
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
				// console.log('newIndex: ', newIndex)
				this.index = newIndex
			}, 
	 		moveTo: function(index) {
				this.$refs.fullpage.$fullpage.moveTo(index, true)
			},
			showPage: function() {
				this.pageNum++
				this.$refs.fullpage.$fullpage.$update()
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
			async sendMessage () {
				try {
					this.$store.commit('setLoading', true)
					await this.$validator.validateAll()
					if (this.errors && this.errors.items && this.errors.items.length > 0) {
						this.$store.commit('setLoading', false)
						new Noty({
							type: 'error',
							text: 'Please check validation errors.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
					} else {
						console.log('sendMessage: ', this.form)
						await axios.post('/send-contact-form-message', { 
							data: this.contactForm,
							receiverAddress: this.resume.personal_data.email,
							resumeSlug: this.resume.slug
						})
						this.$store.commit('setLoading', false)
						new Noty({
							type: 'success',
							text: 'Your message was sent successfully.',
							timeout: 5000,
							theme: 'metroui'
						}).show()
						this.$store
					}
				} catch (error) {
					console.log('error: ', error)
					this.$store.commit('setLoading', false)
					new Noty({
						type: 'error',
						text: 'Sorry, an error ocurred and your message could not be sent.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
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
	/*>>.theme--dark.v-label {
		color: yellow;
	}
	.theme--dark.v-input:not(.v-input--is-disabled) input, .theme--dark.v-input:not(.v-input--is-disabled) textarea {
		color: #000;
	}*/

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

	/* ::-webkit-scrollbar {
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
	} */
	>>>.v-text-field--outline .v-label {
		color: var(--text-color);
	}
</style>