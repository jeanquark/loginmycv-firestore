<template>
	<div v-cloak style="border: 2px solid green;" :style="cssProps" id="content2">
	    <v-toolbar
	      :color="secondaryColor"
	      dark
	      fixed
	      app
	      clipped-right
		  height="80px"
	    >
	      	<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
	      	<v-toolbar-title>Toolbar</v-toolbar-title>
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
			v-model="drawer"
			fixed
			app
		>
			<v-list dense>
				<v-list-tile>
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title style="color: red;">Open Temporary Drawer 2</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="abc">
					<v-list-tile-action>
						<v-icon>home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title style="color: red;">Home</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-content style="background: white;">
			<!-- <v-container fluid fill-height style="border: 2px solid orange;"> -->
			<br /><br /><br />
			<!-- <v-layout justify-center align-center> -->
			<div v-scroll-spy="{offset: 150}">
			
			<!-- Section Intro -->
			<v-layout class="my-5" id="top">
				<v-flex xs12 sm8 offset-sm2>
					<v-layout>
						<v-flex xs12 sm6 style="border: 1px solid orange;">
							<v-chip class="primary-color" text-color="white" style="margin: 0px; padding: 6px 20px; border-bottom-left-radius: 0px;"><b>Hello, I'm</b></v-chip><br />
							<h1 id="fullName">Alex Johnson</h1><br />
							<h2>Product Designer</h2><br /><br />

							<font-awesome-icon :icon="['fas', 'envelope']" /> getemail@email.com<br />
							<font-awesome-icon :icon="['fas', 'phone']" /> +12 986 987 7867<br />
							<font-awesome-icon :icon="['fas', 'location-arrow']" /> 37, Pollsatnd, New York, United State<br />

							<v-chip label><font-awesome-icon :icon="['fab', 'facebook']" size="2x" /></v-chip>
							<v-chip label><font-awesome-icon :icon="['fab', 'linkedin']" size="2x" /></v-chip>
							<v-chip label><font-awesome-icon :icon="['fab', 'github']" size="2x" /></v-chip>

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
						<v-flex xs12 sm6>
							<h2>About Me</h2>
							<p>Hello, I’m a Patrick, web-developer based on Paris. I have rich experience in web site design & building and customization. Also I am good at</p>
							<v-chip label outline :color="primaryColor" class="label">php</v-chip>
							<v-chip label outline color="red" class="label">html</v-chip>
							<v-chip label outline color="red" class="label">css</v-chip>
							<v-chip label outline color="red" class="label">wordpress</v-chip>
							<v-chip label outline color="red" class="label">react</v-chip>
							<v-chip label outline color="red" class="label">javascript</v-chip>
							<br />
							<v-chip :color="primaryColor" text-color="white" style="padding: 6px 20px; border-radius: 25px;"><b>Download CV</b></v-chip><br />
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>


			<!-- Section What I do -->
			<v-layout row wrap style="border: 1px dashed orangered;" id="whatIdo" class="my-5">
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
			<v-layout row wrap style="border: 1px dashed orangered;" id="skills" class="my-5">
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
									color="red"
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
										color="purple"
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
			</div>
		</v-content>

		<v-footer color="blue-grey" class="white--text" app>
			<span>Vuetify</span>
			<v-spacer></v-spacer>
			<span>&copy; 2017</span>
		</v-footer>
    </div>
</template>

<script>
	// import abc from '~/plugins/jm-essai.js'
	// import jQuery from 'jquery'
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
		      	drawer: false,
      			// drawerRight: null,
      			// right: false,
				  // left: false
				primaryColor: '',
				secondaryColor: '',
				backgroundColor: ''
		    }
		},
		computed: {
			cssProps() { 
				return {
					'--primary-color': this.primaryColor,
					'--secondary-color': this.secondaryColor,
					'--background-collor': this.backgroundColor
				}
			}
		},
		methods: {
			abc () {

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
	.nuxt-link-exact-active {
		/* padding-bottom: 10px;
		border-bottom: white solid 1px; */
	}
	.label {
		margin: 5px 15px;
	}
	.label:hover {
		color: yellow;
		background-color: yellow;
	}
	#fullName {
		color: var(--primary-color)
	}
	.primary-color {
		background: var(--primary-color)
	}
</style>