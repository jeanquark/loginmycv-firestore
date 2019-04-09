<template>
	<div v-cloak>
		<h2>{{ title }}</h2>







    
	    <v-toolbar
	      color="blue-grey"
	      dark
	      fixed
	      app
	      clipped-right
	    >
	      	<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
	      	<v-toolbar-title>Toolbar</v-toolbar-title>
      		<v-layout align-center justify-center fill-height hidden-sm-and-down>
		   		<v-flex xs12>
		           <div class="text-xs-center" style="vertical-align: middle;">
		                <span class="nav-item">Home</span>
		      			<v-btn flat>About</v-btn>
	      				<v-btn flat>Skills</v-btn>
	      				<v-btn flat>Experience</v-btn>
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

    		<v-content>
      			<v-container fluid fill-height>
        			<v-layout justify-center align-center>
          				<v-flex shrink>
	            
          				</v-flex>
        			</v-layout>
      			</v-container>
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

	}
	.nav-item:hover {
		padding-bottom: 10px;
		cursor: pointer;
		color: red;
		border-bottom: yellow solid 1px;
	}
</style>