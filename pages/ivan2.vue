<template>
	<v-app v-cloak style="border: 2px solid green;" :style="cssProps" id="app">
	    <v-toolbar
	      :color="secondaryColor"
	      dark
	      fixed
	      app
	      clipped-right
		  height="80px"
	    >
	      	<v-toolbar-side-icon @click.stop="sidemenu = !sidemenu"></v-toolbar-side-icon>
	      	<!-- <v-toolbar-title>Toolbar</v-toolbar-title> -->
      		<v-layout align-center justify-center fill-height hidden-sm-and-down>
		   		<v-flex xs12>
		           <div class="text-xs-center" style="vertical-align: middle;" v-scroll-spy-active="{selector: '.nav-item', class: 'custom-active'}">
						<!-- <span class="nav-item">Home</span>
						<span class="nav-item">About</span>
						<span class="nav-item">What I do</span>
						<span class="nav-item">Skills</span>
						<span class="nav-item">Contact</span> -->

						<nuxt-link class="nav-item" to="#top" v-scroll-to="{
							el: '#top',
							container: '',
							duration: '1000',
							offset: -100
						}">Home</nuxt-link>
						<nuxt-link class="nav-item" to="#about" v-scroll-to="{
							el: '#about',
							container: '',
							duration: '1000',
							offset: -100
						}">About</nuxt-link>
						<nuxt-link class="nav-item" to="#whatIdo" v-scroll-to="{
							el: '#whatIdo',
							container: '',
							duration: '1000',
							offset: -100
						}">What I do</nuxt-link>
						<nuxt-link class="nav-item" to="#skills" v-scroll-to="{
							el: '#skills',
							container: '',
							duration: '1000',
							offset: -100
						}">Skills</nuxt-link>
						<nuxt-link class="nav-item" to="#contact" v-scroll-to="{
							el: '#contact',
							container: '',						
							duration: '1000',
							offset: -100
						}">Contact</nuxt-link>
		            </div>
	            </v-flex>
	        </v-layout>
		</v-toolbar>
		<v-navigation-drawer
			v-model="sidemenu"
			fixed
			app
		>
			<v-list dense>
				<v-list-tile 
					to="#top"
					v-scroll-to="{
						el: '#top',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Home</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#about" 
					v-scroll-to="{
						el: '#about',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>perm_identity</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>About</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#whatIdo"
					v-scroll-to="{
						el: '#whatIdo',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>view_list</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>What I do</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#skills"
					v-scroll-to="{
						el: '#skills',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>build</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Skills</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile 
					to="#contact"
					v-scroll-to="{
						el: '#contact',
						container: '',
						duration: '1000',
						offset: -100
					}"
				>
					<v-list-tile-action>
						<v-icon>contact_mail</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Contact</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click.stop="sidemenu = !sidemenu">
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Close sidemenu</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-content style="background: black;">
			<!-- <v-container fluid fill-height style="border: 2px solid orange;"> -->
			<br /><br /><br />
			<!-- <v-layout justify-center align-center> -->
			<div v-scroll-spy="{offset: 150}">
			
				<!-- Section Intro -->
				<v-layout class="my-5" id="top">
					<v-flex xs12 sm8 offset-sm2>
						<v-layout>
							<v-flex xs12 sm6 style="border: 1px solid orange; color: white;">
								<v-chip class="primary-color" text-color="white" style="margin: 0px; padding: 6px 20px; border-bottom-left-radius: 0px;"><b>Hello, I'm</b></v-chip><br /><br />
								<h1 id="fullName" class="">Alex Johnson</h1>
								<h2 class="white--text">Product Designer</h2><br />

								<font-awesome-icon :icon="['fas', 'envelope']" class="icon" />getemail@email.com<br />
								<font-awesome-icon :icon="['fas', 'phone']" class="icon" /> +12 986 987 7867<br />
								<font-awesome-icon :icon="['fas', 'location-arrow']" class="icon" /> 37, Pollsatnd, New York, United State<br />
								
								<br />
								<v-layout class="justify-center">
									<v-chip label class="chip"><font-awesome-icon :icon="['fab', 'facebook-f']" size="2x" /></v-chip>
									<v-chip label class="chip"><font-awesome-icon :icon="['fab', 'linkedin-in']" size="2x" /></v-chip>
									<v-chip label class="chip"><font-awesome-icon :icon="['fab', 'github']" size="2x" /></v-chip>
								</v-layout>

							</v-flex>
							<v-flex xs12 sm6 style="border: 1px solid red;">
								<v-layout justify-center>
									<v-avatar
										size="350"
										color="grey lighten-4"
									>
										<img src="/images/hero.png" alt="avatar">
									</v-avatar>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>

				<!-- Section About -->
				<v-layout row wrap style="border: 1px solid orangered;" id="about" class="my-5">
					<v-flex xs12 sm8 offset-sm2>
						<v-layout align-center>
							<v-flex xs12 sm6>
								<v-img src="/images/ab-img.png"></v-img>
							</v-flex>
							<v-flex xs12 sm6 style="color: white;">
								<h2>About Me</h2>
								<p>Hello, I’m a Patrick, web-developer based on Paris. I have rich experience in web site design & building and customization. Also I am good at</p>
								<v-chip class="chip">php</v-chip>
								<v-chip class="chip">html</v-chip>
								<v-chip class="chip">css</v-chip>
								<v-chip class="chip">wordpress</v-chip>
								<v-chip class="chip">react</v-chip>
								<v-chip class="chip">javascript</v-chip>
								<br /><br />
								<v-chip :color="primaryColor" text-color="white" style="padding: 6px 20px; border-radius: 25px;"><b>Download CV</b></v-chip><br />
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>


				<!-- Section What I do -->
				<v-layout row wrap style="border: 1px dashed orangered; color: white;" id="whatIdo" class="my-5">
					<v-flex xs12 sm8 offset-sm2>
						<h2 class="text-xs-center">What I do</h2><br /><br />
						<v-layout>
							<v-flex xs12 sm6 v-for="index in 3" :key="index" class="ma-2">
								<v-card color="#202026">
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
					</v-flex>
				</v-layout>


				<!-- Section Skills -->
				<v-layout row wrap style="border: 1px dashed orangered;" id="skills" class="my-5 white--text">
					<v-flex xs12 sm8 offset-sm2 style="border: 1px solid green;">
						<v-layout row wrap justify-center align-center>
							<v-flex xs12 sm6>
								<h2 class="text-xs-center">Technical Skills</h2>
							</v-flex>
							<v-flex xs12 sm6>
								<h2 class="text-xs-center">Professional Skills</h2>
							</v-flex>
						</v-layout>
						
						<v-layout row wrap align-center>
							<v-flex xs12 sm6>
								<div class="mx-5" v-for="index in 5" :key="index">
									<v-layout>
										<v-flex class="text-xs-left">
											<span>JavaScript</span>
										</v-flex>
										<v-flex class="text-xs-right">
											<span>86%</span>
										</v-flex>
									</v-layout>
									<v-progress-linear
										:color="primaryColor"
										height="10"
										value="60"
										style="border-radius: 10px; margin: 6px 0px;"
									></v-progress-linear>
								</div>
							</v-flex>
							<v-flex xs12 sm6>
								<v-layout row wrap class="">
									<v-flex xs6 v-for="index in 4" :key="index" class="pa-3 text-xs-center">
										<v-progress-circular
											:rotate="270"
											:size="100"
											:width="5"
											value="95"
											:color="primaryColor"
										>
											95%
										</v-progress-circular><br /><br />
										Communication
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>

				<v-layout row wrap id="contact" class="white--text">
					<v-flex xs12 sm8 offset-sm2>
						<h2 class="text-xs-center">Contact me</h2>
						<br /><br />
						errors: {{ errors }}<br />
						<!-- <span>{{ errors.first('firstname') }}</span> -->
						<v-form style="background: black;">
							<v-layout row wrap>
								<v-flex xs6 class="pr-3">
									<v-text-field
										outline
										name="firstname"
										label="First Name"
										v-model="form.firstname"
										v-validate="'required|max:10'"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs6 class="pl-3">
									<v-text-field
										outline
										label="Last name"
										v-model="form.lastname"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field
										outline
										label="Your Email"
										v-model="form.email"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-textarea
										outline
										label="Your message"
										v-model="form.message"
										:color="primaryColor"
										:background-color="primaryColor"
										dark
									></v-textarea>
								</v-flex>
								<v-btn round block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" :color="primaryColor" @click.prevent="sendMessage">Send message</v-btn>
							</v-layout>
						</v-form>
					</v-flex>
				</v-layout>
			</div>
			<br />
		</v-content>

		<v-footer color="blue-grey" class="white--text justify-center" style="padding: 30px 0px;">
			<h3>LoginMyCV</h3>&nbsp;
			<span>&copy; {{ new Date() | moment('Y') }}</span>
		</v-footer>
    </v-app>
</template>

<script>
	// import abc from '~/plugins/jm-essai.js'
	// import jQuery from 'jquery'
	import axios from 'axios'
	import Noty from 'noty'
	export default {
		head () {
		    return {
		      	title: this.title,
		      	meta: [
			        { hid: 'description', name: 'description', content: 'Ma description personnalisée' }
				],
				link: [
					// { type: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' }
				]
		    }
		},
		mounted () {
			// $(window).on("load", function() { 
		 //        $(".section-loader").fadeOut("slow");
		          
			// 	// var $container = $('.portfolioContainer');
			// 	// $container.isotope({
			// 	//     filter: '*',
			// 	//     animationOptions: {
			// 	//         queue: true
			// 	//     }
			// 	// });
		       
		 //        $('.portfolio-nav li').click(function(){
		 //            $('.portfolio-nav .current').removeClass('current');
		 //            $(this).addClass('current');
		       
		 //            var selector = $(this).attr('data-filter');
		 //            $container.isotope({
		 //                filter: selector,
		 //                animationOptions: {
		 //                    queue: true
		 //                }
		 //            });
		 //            return false;
		 //        });
   //      	});
			this.primaryColor = '#a97afd'
			this.secondaryColor = '#202026',
			this.backgroundColor = '#000'
		},
		data () {
		    return {
		      	title: 'Ivan\'s resume',
		      	links: [
		      		{
		      			name: 'ABC',
		      			slug: 'abc'
		      		},
		      		{
		      			name: 'DEF',
		      			slug: 'def'
		      		}
		      	],
				//   drawer: false,
				sidemenu: false,
      			// drawerRight: null,
      			// right: false,
				  // left: false
				primaryColor: '',
				secondaryColor: '',
				backgroundColor: '',
				form: {
					firstname: '',
					lastname: '',
					email: '',
					message: ''
				},
				errors: []
		    }
		},
		computed: {
			cssProps() { 
				return {
					'--primary-color': this.primaryColor,
					'--secondary-color': this.secondaryColor,
					'--background-collor': this.backgroundColor
				}
			},
			// errors () {
            //     return this.$store.getters['errors']
            // }
		},
		methods: {
			async sendMessage () {
				try {
					console.log('sendMessage: ', this.form)
					await axios.post('/send-contact-form-message', { data: this.form, receiverAddress: 'me@example.com', slug: 'ivan' }, {
						headers: {
							'app-key': process.env.APP_KEY
						}
					})
					new Noty({
						type: 'success',
						text: 'Your message was successfully sent.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					console.log('error: ', error)
					new Noty({
						type: 'error',
						text: 'Sorry, an error ocurred and your message could not be sent.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
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
	}
	.nav-item:hover {
		padding-bottom: 10px;
		cursor: pointer;
		color: var(--primary-color);
	}
	.custom-active {
		/* color: red; */
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
		color: var(--primary-color)
	}
	.primary-color {
		background: var(--primary-color);
		/* background-color: blue; */
	}
	.icon {
		margin-right: 10px;
		/* background-color: #000; */
	}
	.icon:hover {
		color: var(--primary-color);
	}
	/* .chip {
		background-color: #000;
		padding: 3px;
		border-radius: 8px;
	}
	.chip:hover {
		background-color: var(--primary-color);
		cursor: pointer;
	} */
	.chip {
		color: var(--primary-color);
		background-color: #fff;
		border: 1px solid var(--primary-color);
		border-radius: 2px;
	}
	.chip:hover {
		color: #fff;
		background-color: var(--primary-color);
	}
</style>