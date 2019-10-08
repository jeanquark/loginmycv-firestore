<template>
    <div class="text-xs-center pa-4" style="margin-top: 0px;" v-if="userResume">
        <h2>Work Experience</h2>
		<p>
			dynamicComponent: {{ dynamicComponent }}<br /><br />
			expanded: {{ expanded }}<br /><br />
		</p>
        <v-layout row wrap class="pa-3" v-if="userResume">
            <v-alert :value="true" color="warning" icon="priority_high" outlined v-if="!userResume.work_experience.length > 0">
                There is no item in here, please click on the rounded pink button to add one
            </v-alert>
            <v-btn fab absolute bottom right color="pink" @click.stop="openNewWorkExperienceModal">
                <v-icon>add</v-icon>
            </v-btn>
            <v-expansion-panel style="">
                <v-dialog dark v-model="modalNewWorkExperience" width="600" persistent>
                    <v-card>
                        <v-card-title class="headline" primary-title>
                            <v-layout class="justify-center">
                                Add a new entry
                            </v-layout>
                        </v-card-title>

                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field label="Job title" name="work_experience_job_title" placeholder="Sofware engineer" v-model="newWorkExperience.job_title" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('work_experience_job_title') : null" data-vv-as="Job title" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Company" name="work_experience_company_name" placeholder="Google Inc." v-model="newWorkExperience.company" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('work_experience_company_name') : null" data-vv-as="Company" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Job description/responsibility" name="work_experience_job_description" v-model="newWorkExperience.job_description" v-validate="{ max: 500 }" :error-messages="errors ? errors.collect('work_experience_job_description') : null" data-vv-as="Description" :counter="500"></v-textarea>
                                </v-flex>
                                <v-flex xs6 class="pr-2">
                                    <v-text-field label="City" name="work_experience_city" placeholder="San Francisco, CA" v-model="newWorkExperience.city" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('work_experience_city') : null" data-vv-as="City" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-2">
                                    <v-text-field label="Country" name="work_experience_country" placeholder="USA" v-model="newWorkExperience.country" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('work_experience_country') : null" data-vv-as="Country" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pr-2">
                                    <v-text-field label="Start date" name="work_experience_start_date" v-model="newWorkExperience.start_date" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('work_experience_start_date') : null" data-vv-as="Start date" :counter="50"></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="pl-2">
                                    <v-text-field label="End date" name="work_experience_end_date" v-model="newWorkExperience.end_date" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect('work_experience_end_date') : null" data-vv-as="End date" :counter="50"></v-text-field>
                                </v-flex>
								<v-flex xs12 class="mt-4 pl-2">
									<component :is="dynamicComponent" :resumeSlug="resumeSlug" :newWorkExperience="newWorkExperience" v-if="dynamicComponent" />
								</v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions class="justify-center" style="padding-bottom: 20px;">
                            <v-btn class="success" :disabled="errors && errors.items && errors.items.filter(item => item.field.includes('work_experience')).length > 0" @click="addNewWorkExperience()">Add</v-btn>&nbsp;
                            <v-btn text color="secondary" @click="closeModal">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <draggable v-model="candidateWorkExperience" group="experience" @start="drag=true" @end="drag=false" handle=".handle" style="width: 100%;">
                    <v-expansion-panel-content v-for="(workExperience, index) in candidateWorkExperience" :key="index" v-model="expanded[index]">
                        <div slot="header">
                            <v-layout align-center>
                                <!-- <v-icon class="handle" style="cursor: move">drag_indicator</v-icon>&nbsp; -->
                                <v-btn style="cursor: move;" icon class="handle ml-0">
                                    <v-icon>drag_indicator</v-icon>
                                </v-btn>
                                <v-icon @click.native.stop="deleteItem(index)" class="mr-3">cancel</v-icon>
                                <!-- <v-icon style="color: #ff5252;" v-if="error && error.education_1_name">error</v-icon> -->
                                <span style="font-size: 1.5em;" :class="{ 'errorTitle': workExperienceErrors[index] }">{{ workExperience.job_title }} at {{ workExperience.company }}</span>

                                <!-- <v-btn small color="secondary">Order</v-btn> -->
                            </v-layout>
                        </div>

                        <v-card style="margin-bottom: 30px; background: black;">
                            <v-card-text style="">
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <!--  -->
                                        <v-text-field label="Company" :name="`work_experience_company_${index}`" v-model="candidateWorkExperience[index].company" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`work_experience_company_${index}`) : null" data-vv-as="Company" :counter="2"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <!-- -->
                                        <v-text-field label="Job title" :name="`work_experience_job_title_${index}`" v-model="candidateWorkExperience[index].job_title" v-validate="{ required: true, max: 50 }" :error-messages="errors ? errors.collect(`work_experience_job_title_${index}`) : null" data-vv-as="Job title" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 class="pa-3">
                                        <!--  -->
                                        <v-textarea label="Job description/responsibility" :name="`work_experience_job_decription_${index}`" v-model="candidateWorkExperience[index].job_description" v-validate="{ max: 500 }" :error-messages="errors ? errors.collect(`work_experience_job_decription_${index}`) : null" data-vv-as="Description" :counter="500"></v-textarea>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <!--  -->
                                        <v-text-field label="City" :name="`work_experience_city_${index}`" v-model="candidateWorkExperience[index].city" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`work_experience_city_${index}`) : null" data-vv-as="City" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <!--  -->
                                        <v-text-field label="Country" :name="`work_experience_country_${index}`" v-model="candidateWorkExperience[index].country" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`work_experience_country_${index}`) : null" data-vv-as="Country" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="Start date" :name="`work_experience_start_date_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`work_experience_start_date_${index}`) : null" data-vv-as="Start date" v-model="candidateWorkExperience[index].start_date" :counter="50"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 class="pa-3">
                                        <v-text-field label="End date" :name="`work_experience_end_date_${index}`" v-validate="{ max: 50 }" :error-messages="errors ? errors.collect(`work_experience_end_date_${index}`) : null" data-vv-as="End date" v-model="candidateWorkExperience[index].end_date" :counter="50"></v-text-field>
                                    </v-flex>
									<v-flex xs12 class="pa-3">
										<component :is="dynamicComponent" :resumeSlug="resumeSlug" :index="index" v-if="dynamicComponent && expanded[index]" />
									</v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </draggable>
            </v-expansion-panel>
        </v-layout>
    </div>
</template>

<script>
	import Noty from "noty";
	import Draggable from "vuedraggable";
	export default {
		inject: ["$validator"], // Inject parent validator
		components: { Draggable },
		props: ["workExperienceErrors"],
		created() {
			const resumeSlug = this.$route.params.slug;
			console.log("resumeSlug: ", resumeSlug);
			this.resumeSlug = resumeSlug;
		},
		mounted () {
			this.loadDynamicComponent()
				.then(() => {
					this.dynamicComponent = () => this.loadDynamicComponent()
				})
				.catch(() => {
					this.dynamicComponent = null
				})
		},
		data() {
			return {
				dynamicComponent: null,
				expanded: [], // Control expansion panel open/close state. Necessary for the map inside Leaflet component (template004) to render on mounted
				resumeSlug: "",
				modalNewWorkExperience: false,
				modalEditWorkExperience: false,
				newWorkExperience: {
					company: "",
					job_title: "",
					job_description: "",
					city: "",
					country: "",
					start_date: "",
					end_date: ""
				},

				// modalDate: false,
				// reference: 0,
				// picker: new Date().toISOString().substr(0, 7),
				// picker: '2019-01',
				// newEducation: {
				//     name: '',
				//     title: '',
				//     graduation_date: new Date().toISOString().substr(0, 7),
				//     duration: '',
				//     description: ''
				// },
				// education: [
				//     {
				//         name: 'Graphic Design',
				//         slug: 'graphic_design',
				//         location: 'St-Patrick University',
				//         duration: 2.5,
				//         graduation_date: '2019-02',
				//         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
				//     },
				//     {
				//         name: 'Master of Web Design',
				//         slug: 'master_of_web_design',
				//         location: 'St-Patrick University',
				//         duration: 2,
				//         graduation_date: '2019-02',
				//         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
				//     }
				// ],
				form: {
					// title: [],
					// subtitle: [],
					// description: [],
					// studyDuration: [],
					// graduationDate: [],
					// date: [new Date().toISOString().substr(0, 7)],
					// dateMenu: [false],
					modalStartDate: false,
					startDate: "",
					startDateType: "month",
					modalEndDate: false,
					endDate: "",
					endDateType: "month",
					editStartDateType: "month",
					editEndDateType: "month"
				},
				candidateWorkExperience2: [
					{
						city: "San Francisco",
						company: "Google Inc",
						country: "USA",
						end_date: "2019-06-30",
						job_description: "Worked on the Chrome browser",
						job_title: "Software engineer",
						start_date: "2019-05-16"
					},
					{
						city: "Los Angeles",
						company: "ABC media Group Ltd",
						country: "USA",
						end_date: "2018-10-15",
						job_description: "Worked on improving media quality",
						job_title: "Media Analyst",
						start_date: "2017"
					}
				]
				// candidateWorkExperience3: []
			};
		},
		computed: {
			loadDynamicComponent() {
				console.log('this.userResume: ', this.userResume)
				return () =>
					import(`~/components/resume/dynamicTemplatesComponents/${
						this.userResume.template.id
					}/WorkExperienceComponent`)
			},
			// error () {
			//     return this.$store.getters['index/error']
			// },
			loadedUserResume() {
				return this.$store.getters["resumes/loadedUserResumes"].find(
					resume => resume.slug === this.resumeSlug
				);
			},
			userResume() {
				if (this.resumeSlug) {
					return this.$store.getters["resumes/loadedUserResumes"].find(
						resume => resume.slug === this.resumeSlug
					);
				} else {
					return this.$store.getters["resumes/loadedNewResume"];
				}
			},
			loadedNewResume() {
				return this.$store.getters["resumes/loadedNewResume"];
			},
			// candidateWorkExperience () {
			//     return this.userResume.work_experience
			// },
			candidateWorkExperience: {
				get() {
					return this.userResume.work_experience;
				},
				set(value) {
					this.userResume.work_experience = value;
				}
			}
		},
		methods: {
			openNewWorkExperienceModal() {
				if (
					this.userResume.work_experience &&
					this.userResume.work_experience.length < 30
				) {
					this.modalNewWorkExperience = true;
				} else {
					new Noty({
						type: "warning",
						text: "No more than 30 items allowed!",
						timeout: 5000,
						theme: "metroui"
					}).show();
				}
			},
			// saveEducation () {
			//     console.log('saveEducation')
			//     console.log(this.form)
			// },
			closeModal() {
				this.modalNewWorkExperience = false;
				this.newWorkExperience = {};
			},
			addNewWorkExperience() {
				this.modalNewWorkExperience = false;
				this.userResume.work_experience.push({
					company: this.newWorkExperience.company,
					job_title: this.newWorkExperience.job_title,
					job_description: this.newWorkExperience.job_description,
					city: this.newWorkExperience.city,
					country: this.newWorkExperience.country,
					start_date: this.newWorkExperience.start_date,
					end_date: this.newWorkExperience.end_date
				});
				this.newWorkExperience = {};
				new Noty({
					type: "success",
					text: "New work experience added!",
					timeout: 5000,
					theme: "metroui"
				}).show();
			},
			// editEducation (education, reference) {
			//     console.log('editEducation')
			//     console.log('reference: ', reference)
			//     this.modalEditWorkExperience = false
			// },
			// saveDate2 (date, index) {
			//     console.log('saveDate')
			//     console.log('date: ', date)
			//     console.log('index: ', index)
			//     if (!index) {
			//         this.newEducation.graduation_date = date
			//     } else {
			//         this.education[index].graduation_date = date
			//     }
			//     this.modalDate = false
			// },
			deleteItem(index) {
				console.log("delete: ", index);
				this.candidateWorkExperience.splice(index, 1);
			}
		}
	};
</script>

<style scoped>
	.errorTitle {
		color: var(--v-error-base);
	}
</style>