<template>
    <div class="pa-4" v-if="userResume">
        <div>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /> -->
            <!-- edit: {{ this.edit }}<br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /> -->
            <!-- loadedTemplates: {{ loadedTemplates }}<br /> -->
            <!-- loadedTemplate: {{ loadedTemplate }}<br /><br /> -->
            <!-- userResume.language: {{ userResume.language }}<br /><br /> -->
            userResume.template: {{ userResume.template }}<br /><br />
			<!-- dynamicComponent: {{ dynamicComponent }}<br /><br /> -->
            <!-- loadDynamicComponent: {{ loadDynamicComponent }}<br /><br /> -->
			<!-- dialogResumePreview: {{ dialogResumePreview }}<br /><br /> -->
            loading: {{ loading }}<br /><br />
        </div>
        <!-- <v-layout row wrap class="pa-2"> -->
        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <v-card :elevation="12" v-if="!loading">
                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-3">Current template</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-row no-gutters justify="center" v-if="userResume.template" class="my-2">
                            <v-col cols="4">
                                <v-card tile hover class="active">
                                    <v-img :src="`/images/templates/${userResume.template.id}.jpg`" :lazy-src="`/images/templates/${userResume.template.id}.jpg`" aspect-ratio="1.5"></v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-3">Choose a template</h2>
                    </v-card-title>

                    <v-card-text>
                        
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="4" lg="6" v-for="template in loadedTemplates" :key="template.id" class="pa-2">
                                <v-card tile hover :value="template.id" :class="[userResume.template.id === template.id ? 'active' : null]" @click="selectTemplate(template)">
                                    <v-img :src="`/images/templates/${template.image}`" :lazy-src="`/images/templates/${template.image}`" aspect-ratio="1.5"></v-img>
                                </v-card>
                                <v-row no-gutters class="transparent-background pa-1">
                                    <v-row no-gutters justify="start" align="center">
                                        <font-awesome-icon :icon="['fas', 'users' ]" class="ml-2" />&nbsp;<span class="mr-3">{{ template.count_users || 0 }}</span>
                                        <font-awesome-icon :icon="['fas', 'cubes' ]" :class="[template.package.slug]" v-if="template.package" />&nbsp;<span class="mr-3" v-if="template.package">{{ template.package.name }}</span>
                                    </v-row>
                                    <v-row no-gutters justify="end" align="center">
                                        <v-btn small text color="secondary" @click.stop="openResumePreview(template.slug)">
                                            View
                                        </v-btn>
                                    </v-row>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="center">
                            <v-btn @click="loadMoreTemplates">More <v-icon>mdi-arrow-down</v-icon></v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>    
        </v-row>

        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <v-card :elevation="12" class="pa-2" v-if="loadedTemplate">
                    <h2 class="text-center headline">{{ loadedTemplate.name }}</h2>
                    <p class="text-center">{{ loadedTemplate.description }}</p>

                    <v-row no-gutters align="center" class="my-3" v-if="userResume">
                        <v-col class="text-center">
                            Primary color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.primaryColor"></vue-colorpicker>
                        </v-col>
                        <v-col class="text-center">
                            Secondary color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
                        </v-col>
                        <v-col class="text-center">
                            Tertiary color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.tertiaryColor"></vue-colorpicker>
                        </v-col>
                        <v-col class="text-center">
                            Background color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
                        </v-col>
                        <v-col class="text-center">
                            Text color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.textColor"></vue-colorpicker>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="my-3">
                    	<component :is="dynamicComponent" :resumeSlug="resumeSlug" 	:loadedTemplate="loadedTemplate" v-if="dynamicComponent" />
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters class="pa-2" style="display: none;">
            <v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Pick up colors</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-row no-gutters align="center">
                            <v-col cols="6" class="text-center">
                                Primary color 2<br /><br />
                                <vue-colorpicker v-model="userResume.colors.primaryColor"></vue-colorpicker>
                            </v-col>
                            <v-col cols="6" class="text-center">
                                Secondary color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
                            </v-col>
                            <v-col cols="6" class="text-center">
                                Tertiary color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.tertiaryColor"></vue-colorpicker>
                            </v-col>
                            <v-col cols="6" class="text-center">
                                Background color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
                            </v-col>
                            <v-col cols="6" class="text-center">
                                Text color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.textColor"></vue-colorpicker>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters class="pa-2" v-if="loadedTemplate && userResume.menus">
            <v-col cols="12">
                <v-card :elevation="12" class="pa-2">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0 text-center">
                            <font-awesome-icon :icon="['fas', 'language']" />
                            Translation <small>(optional)</small><br />
                            <small class="body-1">You may specify menu names and field names as you wish they appear on your resume if the language is other than english</small>
                        </h2>
                    </v-card-title>

                    <v-card-text>

                        <v-row no-gutters class="">
                            <v-col cols="12" sm="4" class="px-4">
                                <v-autocomplete label="Resume language" :items="loadedLanguages" item-text="name" :return-object="true" chips small-chips :deletable-chips="true" color="secondary" v-model="userResume.language">
                                    <font-awesome-icon :icon="['fas', 'language']" slot="prepend" style="margin-top: 4px;" />
                                    <template v-slot:selection="data">
                                        <v-chip :input-value="data.selected" class="chip--select-multi">
                                            <v-avatar left>
                                                <v-img :src="`/images/languages/${data.item.flag}`"></v-img>
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-item-avatar>
                                                <img :src="`/images/languages/${data.item.flag}`">
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="">
                            <v-col cols="12" class="mt-5" v-if="loadedTemplate.menus">
                                <h3 class="text-center pt-2">Menus:</h3>
                            </v-col>
                            <v-col cols="12" sm="6" class="px-4" v-for="menu in loadedTemplate.menus" :key="menu.index">
                                <v-text-field :name="`menu_${menu.slug}`" item-text="name" v-validate="{ required: true, max: 30 }" :error-messages="errors ? errors.collect(`menu_${menu.slug}`) : null" :data-vv-as="menu.name" :counter="30" v-model="userResume.menus[menu.slug]">
                                    <template v-slot:label>
                                        {{ menu.name }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-5" v-if="loadedTemplate.fields">
                                <h3 class="text-center pt-2">Fields:</h3>
                            </v-col>
                            <v-col cols="12" sm="6" class="px-4" v-for="field in loadedTemplate.fields" :key="field.slug">
                                <v-text-field :name="`field_${field.slug}`" item-text="name" v-validate="{ required: true, max: 50 }" :error-messages="errors ? errors.collect(`field_${field.slug}`) : null" :data-vv-as="field.name" :counter="50" v-model="userResume.fields[field.slug]">
                                    <template v-slot:label>
                                        {{ field.name }}
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-5" v-if="loadedTemplate.contact_form_validation">
                                <h3 class="text-center pt-2">Contact form validation:</h3>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="px-4" v-for="field in loadedTemplate.contact_form_validation" :key="field.slug">
                                <v-text-field :name="`contact_${field.slug}`" item-text="name" v-validate="{ required: true, max: 100 }" :error-messages="errors ? errors.collect(`contact_${field.slug}`) : null" :data-vv-as="field.name" :counter="100" v-model="userResume.contact_form_validation[field.slug]">
                                    <template v-slot:label>
                                        {{ field.name }}
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog no-gutters v-model="dialogResumePreview" fullscreen hide-overlay transition="dialog-bottom-transition" style="">
            <v-card style="position: fixed; top: 0; left: 0; z-index: 999; width: 100%; height: 20vh;">
                <v-toolbar dark color="primary" class="align-center" style="cursor: pointer;" @click="dialogResumePreview = false">
					<h3 class="text-center mr-2">Preview <small>(click to exit)</small></h3>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialogResumePreview = false" class="mr-2">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-row no-gutters justify="center" align="center" class="py-2" style="border-bottom: 2px solid var(--v-primary-base);">
                    Primary color
                    <vue-colorpicker v-model="userResume.colors.primaryColor" class="ml-1 mr-4"></vue-colorpicker>
                    Secondary color
                    <vue-colorpicker v-model="userResume.colors.secondaryColor" class="ml-1 mr-4"></vue-colorpicker>
                    Tertiary color
                    <vue-colorpicker v-model="userResume.colors.tertiaryColor" class="ml-1 mr-4"></vue-colorpicker>
                    Background color
                    <vue-colorpicker v-model="userResume.colors.backgroundColor" class="ml-2 mr-4"></vue-colorpicker>
                    Text color
                    <vue-colorpicker v-model="userResume.colors.textColor" class="ml-2 mr-3"></vue-colorpicker>
                </v-row>

                <component :is="viewTemplateComponent" :colors="userResume.colors" style="height: 80vh; overflow-y: scroll;" v-if="viewTemplateComponent" />
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	import axios from 'axios'
	import { VueColorpicker } from 'vue-pop-colorpicker'
	// import imageTemplate1 from "~/components/templatesSVG/Template1_svg"
	// import imageTemplate2 from "~/components/templatesSVG/Template2_svg"
	// import imageTemplate3 from "~/components/templatesSVG/Template3_svg"
	// import { imageTemplate1 } from '~/components/Login'
	// import * as components from '~/components/resume/templatesComponents'
	export default {
		inject: ['$validator'], // Inject parent validator
		// props: ['edit'],
		components: {
			VueColorpicker
			// imageTemplate1,
			// imageTemplate2,
			// imageTemplate3
			// templateSpecificComponent: () => import(`~/components/resume/templatesComponents/${this.loadedTemplate.slug}`),
			// components
		},
		async created() {
            this.$store.commit('setLoading', true)
			const resumeSlug = this.$route.params.slug
			console.log('resumeSlug: ', resumeSlug)
			this.resumeSlug = resumeSlug
            if (this.$store.getters['templates/loadedTemplates'].length < 1) {
                await this.$store.dispatch('templates/fetchTemplates')                
            }
            // this.selectTemplate()
            // this.userResume.template.id = 'template004'

            // this.loadDynamicComponent().then(() => {
            //     this.dynamicComponent = () => this.loadDynamicComponent()
            // })
            // .catch(() => {
            //     this.dynamicComponent = null
            // })

            // try {
                await this.loadDynamicComponent
                // this.dynamicComponent = () => this.loadDynamicComponent()
            // } catch (error) {
                // this.dynamicComponent = null
            // }
            this.$store.commit('setLoading', false)

			// if (!this.loadedUserResumes || this.loadedUserResumes.length < 1) {
			// 	await this.$store.dispatch('resumes/fetchUserResumes')
			// }
			// if (!this.resumeSlug) {
			// 	const template = this.$store.getters['templates/loadedTemplates'].find(
			// 		template => template.slug === 'template001'
			// 	)
			// 	console.log('template 1: ', template)
			// 	if (template) {
			// 		this.userResume.template.id = template.id
			// 		this.userResume.colors = template.colors
			// 		template.menus.forEach(menu => {
			// 			this.userResume.menus[menu.slug] = menu.name
			// 		})
			// 		template.fields.forEach(field => {
			// 			this.userResume.fields[field.slug] = field.name
			// 		})
			// 		template.contact_form_validation.forEach(field => {
			// 			this.userResume.contact_form_validation[field.slug] = field.value
			// 		})
			// 	}
			// }
		},
		mounted() {
			// if (this.userResume) {
			// 	this.loadDynamicComponent()
			// 		.then(() => {
			// 			this.dynamicComponent = () => this.loadDynamicComponent()
			// 		})
			// 		.catch(() => {
			// 			console.log('error dynamic component')
			// 			this.dynamicComponent = null
			// 		})
			// }
		},
		data() {
			return {
				resumeSlug: '',
				model: '',
				// template: '',
				primaryColor: '',
				dialogResumePreview: false,
				viewTemplateComponent: null,
				dynamicComponent: null
			}
		},
		computed: {
            loading() {
                return this.$store.getters['loading']
            },
			loadedTemplates() {
				return this.$store.getters['templates/loadedTemplates']
			},
			loadedTemplate() {
				return this.loadedTemplates.find(
					template => template.id === this.userResume.template.id
				)
			},
			userResume() {
				if (this.resumeSlug) {
					// console.log('resumeSlug2: ', this.resumeSlug)
					return this.$store.getters['resumes/loadedUserResumes'].find(
						resume => resume.slug === this.resumeSlug
					)
				} else {
					// return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
					return this.$store.getters['resumes/loadedNewResume']
				}
			},
			loadedLanguages() {
				return this.$store.getters['languages/loadedLanguages']
			},
			// loadedTemplateSpecificComponents() {
			// 	// return []
			// 	return this.loadedTemplate.template_specific_components ? this.loadedTemplate.template_specific_components.filter(template => template.component === 'template') : []
			// },
			loadDynamicComponent() {
				try {
					console.log('this.userResume2: ', this.userResume)
					return () => import(`~/components/resume/dynamicTemplatesComponents/${this.userResume.template.id}/TemplateComponent`)
				} catch (error) {
					this.dynamicComponent = null
					return null
				}
				// if (this.userResume) {
					// return () => import(`~/components/resume/dynamicTemplatesComponents/template004/TemplateComponent`)
				// }
				// return null
			}
		},
		methods: {
			async selectTemplate(template) {
				console.log('selectTemplate: ', template)
				this.dynamicComponent = null
				if (!this.resumeSlug) {
					this.userResume.colors = template.colors
				}
				this.userResume.template.id = template.id

				this.loadDynamicComponent()
					.then(() => {
						this.dynamicComponent = () => this.loadDynamicComponent()
					})
					.catch(() => {
						this.dynamicComponent = null
					})
			},
			openResumePreview(templateSlug) {
				console.log('templateSlug: ', templateSlug)
				const templateName = templateSlug.charAt(0).toUpperCase() + templateSlug.slice(1)
				console.log('templateName: ', templateName)
				this.viewTemplateComponent = () =>
					import(`~/components/templatesModels/${templateName}`)
				this.dialogResumePreview = true
			},
            async loadMoreTemplates () {
                await this.$store.dispatch('templates/fetchTemplates')
            },
		},
		watch: {
			'userResume.language'() {
				if (
					this.loadedTemplate &&
					this.loadedTemplate.menus &&
					this.loadedTemplate.menus.length
				) {
					this.loadedTemplate.menus.forEach((menu, index) => {
						// Check if translation exists for the particular item
						if (this.loadedTemplate.menus[index]['name_' + this.userResume.language.code]) {
							this.userResume.menus[menu.slug] =
								menu['name_' + this.userResume.language.code]
						} else {
							this.userResume.menus[menu.slug] = ''
						}
					})
				}
				if (
					this.loadedTemplate &&
					this.loadedTemplate.fields &&
					this.loadedTemplate.fields.length
				) {
					this.loadedTemplate.fields.forEach((field, index) => {
						// Check if translation exists for the particular item
						if (
							this.loadedTemplate.fields[index]['name_' + this.userResume.language.code]
						) {
							this.userResume.fields[field.slug] =
								field['name_' + this.userResume.language.code]
						} else {
							this.userResume.fields[field.slug] = ''
						}
					})
				}
				if (
					this.loadedTemplate &&
					this.loadedTemplate.contact_form_validation &&
					this.loadedTemplate.contact_form_validation.length
				) {
					this.loadedTemplate.contact_form_validation.forEach((field, index) => {
						// Check if translation exists for the particular item
						if (
							this.loadedTemplate.contact_form_validation[index][
								'value_' + this.userResume.language.code
							]
						) {
							this.userResume.contact_form_validation[field.slug] =
								field['value_' + this.userResume.language.code]
						} else {
							this.userResume.contact_form_validation[field.slug] = ''
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.active {
        border: 4px solid var(--v-secondary-base);
		/*border: 4px solid red;*/
	}
	.primaryColor {
		color: red;
		/* color: var(--v-primary-base); */
	}
	.image {
		float: left;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		border: 1px solid #ebebeb;
		margin: 5px;
	}
	.transparent-background {
		background: rgba(122, 82, 143, 0.6);
	}
	.basic {
		color: var(--v-secondary-base);
	}
	.classic {
		color: var(--v-tertiary-base);
	}
</style>