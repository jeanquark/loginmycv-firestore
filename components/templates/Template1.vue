<template>
	<div>
		<!-- <h2>Template 1</h2> -->
		<!-- <b>this.resume:</b> {{ this.resume }}<br /><br /><br /> -->
		<div style="">
			<v-layout>
			    <v-flex xs12 sm6 offset-sm3>
			    	<!-- <v-hover> -->
				      	<v-card flat hover v-if="resume.personal_data">
							<v-layout row>
								<v-flex xs4>
							        <v-img
						          		:src="`/images/resumes/${this.resume.personal_data.image}`" max-width=""
						        	></v-img>
						        </v-flex>
					        	<v-flex xs8 ma-3>
					        		<h2 class="text-xs-center">
					        			{{ this.resume.job_title }} 
					        		</h2>
					        		<h3 class="text-xs-center">
					        			{{ this.resume.job_description }}
					        		</h3>
					        		<br /><br />
									<v-layout row class="mb-3">
										<v-flex xs6>
											<b>Firstname:</b> {{ this.resume.personal_data.firstname }}
										</v-flex>
										<v-flex xs6>
											<b>Lastname:</b> {{ this.resume.personal_data.lastname }}
										</v-flex>
									</v-layout>
									<v-layout row class="mb-3">
										<v-flex xs6>
											<b>Age:</b> {{ parseInt(this.resume.personal_data.birthday) | moment("from", "now", true) }}
										</v-flex>
										<v-flex xs6>
											<b>Gender:</b> {{ this.resume.personal_data.gender }}
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs12>
											<b>Key competences:</b>
											<v-chip :color="competence.color" text-color="white" small v-for="competence in this.resume.key_competences" :key="competence.slug">{{ competence.name }}</v-chip>
										</v-flex>
									</v-layout>
					        	</v-flex>
							
							</v-layout>
					        <!-- <v-card-title primary-title>
					          <div>
					            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
					            <div></div>
					          </div>
					        </v-card-title>

					        <v-card-actions>
					          <v-btn flat color="orange">Share</v-btn>
					          <v-btn flat color="orange">Explore</v-btn>
					        </v-card-actions> -->
				      	</v-card>
				    <!-- </v-hover> -->

					<br />
			      	<h2 class="text-xs-center">Education</h2>
			      	<br />
			      	<v-hover>
				      	<v-card>
							<v-layout row v-if="resume.education">
								<v-expansion-panel expand :value="[1]">
								    <v-expansion-panel-content
								      v-for="(item, i) in this.resume.education"
								      :key="i"
								    >
								      	<template v-slot:header>
									        <h3><v-icon color="amber">school</v-icon> {{ item.title }}, {{ item.school }}, <small>{{ item.location }} - {{ item.country }}</small></h3>
								      	</template>
								      	<v-card>
									        <v-card-text class="grey lighten-3">
									        	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
									        </v-card-text>
								      	</v-card>
								    </v-expansion-panel-content>
								</v-expansion-panel>						
							</v-layout>
				      	</v-card>
			      	</v-hover>

					<br />
			      	<h2 class="text-xs-center text-capitalize">Work Experience</h2>
			      	<br />

			      	<v-card v-if="resume.work_experience">      
						<v-layout align-center>
						    <v-item-group
						      v-model="layoutWindow"
						      class="shrink mr-4"
						      mandatory
						      tag="v-flex"
						    >
							    <v-item
							        v-for="(job, index) in resume.work_experience"
							        :key="index"
							    >
							        <div slot-scope="{ active, toggle }">
							          	<v-btn
							            	:input-value="active"
							            	icon
							            	@click="toggle"
							          	>
								            <v-icon color="amber">work</v-icon>
							          	</v-btn>
							        </div>
					      		</v-item>
					    	</v-item-group>

					    	<v-flex>
					      		<v-window
					        		v-model="layoutWindow"
					        		class="elevation-1"
					        		vertical
					      		>
						        	<v-window-item
						          		v-for="(job, index) in resume.work_experience"
						          		:key="index"
						        	>
							          	<v-card flat>
						            		<v-card-text>
						              			<v-layout align-center mb-3>
						                			<v-avatar color="grey" class="mr-3"></v-avatar>
						                			<strong class="title">{{ job.job_title }}</strong>
						                			<v-spacer></v-spacer>
						                			<v-btn icon>
						                  				<v-icon color="amber">domain</v-icon>
						                			</v-btn>
						              			</v-layout>

												<p>
													{{ job.job_description }}
												</p>
						            		</v-card-text>
						          		</v-card>
						        	</v-window-item>
						      	</v-window>
					   		</v-flex>
						</v-layout>
			  		</v-card>

					<br />
					<br />
					<h2 class="text-xs-center">Skills</h2>
					<br />
					<v-card class="pa-3" v-if="resume.skills">
						<v-layout row align-center v-for="(category, index) in resume.skills" :key="index">
							<v-flex>
								<h3 class="text-xs-center">{{ category.name }}</h3>
								<br />
								<v-layout row align-center>
									<v-flex v-for="skill in category.items" :key="skill.slug">
										<v-progress-circular
									      :rotate="-90"
									      :size="100"
									      :width="15"
									      :value="skill.value"
									      color="amber"
									    >
								     		{{ skill.value }}
								    	</v-progress-circular>
								    	{{ skill.name }}
								    	<br /><br /><br />
								    </v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
						
					</v-card>
			    </v-flex>
			</v-layout>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['resume'],
		data () {
			return {
				// length: 3,
				layoutWindow: 0
			}
		}
	}
</script>

<style scoped>

</style>