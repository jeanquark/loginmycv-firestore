<template>
	<div v-cloak style="border: 2px solid green;">
	    <v-toolbar
	      color="black"
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
		           <div class="text-xs-center" style="vertical-align: middle;">
		                <span class="nav-item">Home</span>
		      			<span class="nav-item">About</span>
	      				<span class="nav-item">Skills</span>
	      				<span class="nav-item">Experience</span>
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
				<v-layout>
					<v-flex xs12 sm8 offset-sm2>
						<v-layout>
							<v-flex xs12 sm6 style="border: 1px solid orange;">
								<v-chip color="purple" text-color="white" style="padding: 6px 20px; border-bottom-left-radius: 0px;"><b>Hello, I'm</b></v-chip><br />
								<h1>Alex Johnson</h1><br />
								<h2>Product Designer</h2><br /><br />

								<fa icon="envelope" size="1x" /> getemail@email.com<br /><br />
								<fa icon="phone" /> +12 986 987 7867<br /><br />
								<fa icon="location-arrow" /> 37, Pollsatnd, New York, United State<br /><br />

								<!-- <fa icon="facebook" /> -->
								<fab icon="twitter" />
								<!-- <fa icon="fab fa-github" /> -->

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
			<!-- </v-container> -->
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
		    }
		},
		computed: {

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
		font-size: 1.5em;
		font-weight: bolder;
		margin: 0px 20px;
	}
	.nav-item:hover {
		padding-bottom: 10px;
		cursor: pointer;
		color: purple;
		border-bottom: white solid 1px;
	}
</style>