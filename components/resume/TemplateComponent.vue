<template>
    <div class="pa-4">
        <div>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /> -->
            <!-- edit: {{ this.edit }}<br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /> -->
            <!-- loadedTemplates: {{ loadedTemplates }}<br /> -->
			<!-- loadedTemplate: {{ loadedTemplate }}<br /><br /> -->
			<!-- userResume.language: {{ userResume.language }}<br /><br /> -->
        </div>
        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-0">Choose a template</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4 lg3 v-for="template in loadedTemplates" :key="template.id" class="pa-2">
                                <v-card hover :value="template.id" @click="selectTemplate(template)" :class="[userResume.template_id === template.id ? 'active' : null]">
                                    <v-img :src="`/images/templates/${template.image}`" :lazy-src="`/images/templates/${template.image}`" aspect-ratio="1.5"></v-img>
                                    <!-- <div class="text-xs-center">{{ template.name }}</div> -->
                                    <!-- <div class="text-xs-center">{{ template.description }}</div> -->
                                </v-card>
                                <v-layout align-center justify-center class="transparent-background">
                                    <font-awesome-icon :icon="['fas', 'users' ]" class="ml-2" />&nbsp;<span class="mr-3">{{ template.count_users }}</span>
                                    <font-awesome-icon :icon="['fas', 'cubes' ]" class="" />&nbsp;<span class="mr-3" v-if="template.package">{{ template.package.name }}</span>

                                    <v-btn small flat color="secondary" @click.stop="openDialog(template.slug)">
                                        <!-- <v-icon>remove_red_eye</v-icon> -->
                                        View
                                    </v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="pa-2">
            <v-flex xs12>
                <v-card :elevation="12" class="pa-2" v-if="loadedTemplate">
                    <!-- loadedTemplates: {{ loadedTemplates }}<br /> -->
                    <!-- loadedTemplate.colors: {{ loadedTemplate.colors }}<br /> -->
                    <!-- userResume: {{ userResume }}<br /> -->
                    <h2 class="text-xs-center headline">{{ loadedTemplate.name }}</h2>
                    <p class="text-xs-center">{{ loadedTemplate.description }}</p>

                    <v-layout row align-center class="mb-2" v-if="userResume">
                        <v-flex xs6 sm4 class="text-xs-center">
                            Primary color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.primaryColor"></vue-colorpicker>
                        </v-flex>
                        <v-flex xs6 sm4 class="text-xs-center">
                            Secondary color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
                        </v-flex>
                        <v-flex xs6 sm4 class="text-xs-center">
                            Tertiary color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.tertiaryColor"></vue-colorpicker>
                        </v-flex>
                        <v-flex xs6 sm4 class="text-xs-center">
                            Background color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
                        </v-flex>
                        <v-flex xs6 sm4 class="text-xs-center">
                            Text color<br /><br />
                            <vue-colorpicker v-model="userResume.colors.textColor"></vue-colorpicker>
                        </v-flex>
                    </v-layout>

                    <!-- <v-img :src="`/images/templates/${loadedTemplate.image}`" width="100%" /> -->
                    <!-- userResume.colors.primaryColor: {{ userResume.colors.primaryColor }}<br /> -->
                    <!-- userResume.colors.backgroundColor: {{ userResume.colors.backgroundColor }}<br /> -->
                    <!-- <image-template1
					    :colors="userResume.colors"
					    v-if="userResume.template_id === loadedTemplates[0].id"
					    class="my-3"
					/>
					<image-template2
					    :colors="userResume.colors"
					    v-if="userResume.template_id === loadedTemplates[1].id"
					    class="my-3"
					/>
					<image-template3
					    :colors="userResume.colors"
					    v-if="userResume.template_id === loadedTemplates[2].id"
					    class="my-3"
					/> -->
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="pa-2" style="display: none;">
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Pick up colors</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout row align-center>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Primary color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.primaryColor" v-if="userResume"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Secondary color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Tertiary color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.tertiaryColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Background color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Text color<br /><br />
                                <vue-colorpicker v-model="userResume.colors.textColor"></vue-colorpicker>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="pa-2" v-if="loadedTemplate && userResume.menus">
            <v-flex xs12>
                <v-card :elevation="12" class="pa-2">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0 text-xs-center">
                            <font-awesome-icon :icon="['fas', 'language']" />
                            Translation <small>(optional)</small><br />
                            <small class="body-1">Below you can specify menu names and field names as you wish they appear on your resume</small>
                        </h2>
                    </v-card-title>

                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex xs12 sm4 class="px-4">
                                <v-autocomplete label="Resume language" :items="loadedLanguages" item-text="name" :return-object="true" chips small-chips :deletable-chips="true" color="secondary" v-model="userResume.language">
                                    <font-awesome-icon :icon="['fas', 'language']" slot="prepend" style="margin-top: 4px;" />
                                    <template v-slot:selection="data">
                                        <v-chip :selected="data.selected" class="chip--select-multi">
                                            <v-avatar>
                                                <img :src="`/images/languages/${data.item.flag}`">
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-tile-avatar>
                                                <img :src="`/images/languages/${data.item.flag}`">
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 v-if="loadedTemplate.menus">
                                <h4 class="text-xs-center">Menus:</h4>
                            </v-flex>
                            <v-flex xs12 sm6 md4 class="px-4" v-for="menu in loadedTemplate.menus" :key="menu.index">
								<!-- v-model="userResume.menus[index].name -->
								<!-- :value="userResume.menus[index]['name_' + userResume.language.code] ? userResume.menus[index]['name_' + userResume.language.code] : userResume.menus[index].name" -->
                                <v-text-field :name="`menu_${menu.slug}`" item-text="name" v-validate="{ required: true, max: 50 }" :error-messages="errors ? errors.collect(`menu_${menu.slug}`) : null" :data-vv-as="menu.name" :counter="50" v-model="userResume.menus[menu.slug]">
                                    <template v-slot:label>
                                        {{ menu.name }}
                                    </template>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 class="mt-4" v-if="loadedTemplate.fields">
                                <h4 class="text-xs-center">Fields:</h4>
                            </v-flex>
                            <v-flex xs12 sm6 md4 class="px-4" v-for="field in loadedTemplate.fields" :key="field.slug">
                                <v-text-field :name="`field_${field.slug}`" item-text="name" v-validate="{ required: true, max: 50 }" :error-messages="errors ? errors.collect(`field_${field.slug}`) : null" :data-vv-as="field.name" :counter="50" v-model="userResume.fields[field.slug]">
                                    <template v-slot:label>
                                        {{ field.name }}
                                    </template>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
					<v-spacer></v-spacer>
                    <v-toolbar-title>Close</v-toolbar-title>
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-layout row align-center justify-center pa-2 style="border-bottom: 2px solid var(--v-primary-base);">
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
                </v-layout>

                <component :is="component" v-if="component" :colors="userResume.colors" />
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
	export default {
		// props: ['edit'],
		inject: ['$validator'], // Inject parent validator
		components: {
			VueColorpicker
			// imageTemplate1,
			// imageTemplate2,
			// imageTemplate3
		},
		async created() {
			const resumeSlug = this.$route.params.slug
			console.log('resumeSlug: ', resumeSlug)
			this.resumeSlug = resumeSlug
			await this.$store.dispatch('templates/fetchTemplates')
			if (!this.resumeSlug) {
				const template = this.$store.getters['templates/loadedTemplates'].find(
					template => template.slug === 'template1'
				)
				if (template) {
					this.userResume.template_id = template.id
					this.userResume.colors = template.colors
					// Assign array values to object
					template.menus.forEach(menu => {
						this.userResume.menus[menu.slug] = menu.name
					})
					template.fields.forEach(field => {
						this.userResume.fields[field.slug] = field.name
					})
				}
			}
		},
		data() {
			return {
				resumeSlug: '',
				model: '',
				template: '',
				primaryColor: '',
				dialog: false,
				component: null
			}
		},
		computed: {
			loadedTemplates() {
				return this.$store.getters['templates/loadedTemplates']
			},
			loadedTemplate() {
				return this.loadedTemplates.find(
					template => template.id === this.userResume.template_id
				)
			},
			userResume() {
				if (this.resumeSlug) {
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
			}
		},
		methods: {
			selectTemplate(template) {
				// console.log('template', template)
				if (!this.resumeSlug) {
					this.userResume.colors = template.colors
				}
				this.userResume.template_id = template.id
			},
			openDialog(templateSlug) {
				console.log('templateSlug: ', templateSlug)
				// this.component = () => import(`~/components/templatesModels/template1`)
				this.component = () => import(`~/components/templatesModels/${templateSlug}`)
				this.dialog = true
			}
		},
		watch: {
			'userResume.language' () {
				if (this.loadedTemplate && this.loadedTemplate.menus && this.loadedTemplate.menus.length) {
					this.loadedTemplate.menus.forEach((menu, index) => {
						// Check if translation exists for the particular item
						if (this.loadedTemplate.menus[index]['name_' + this.userResume.language.code]) {
							this.userResume.menus[menu.slug] = menu['name_' + this.userResume.language.code]
						} else {
							this.userResume.menus[menu.slug] = ''
						}
					})
				}
				if (this.loadedTemplate && this.loadedTemplate.fields && this.loadedTemplate.fields.length) {
					this.loadedTemplate.fields.forEach((field, index) => {
						// Check if translation exists for the particular item
						if (this.loadedTemplate.fields[index]['name_' + this.userResume.language.code]) {
							this.userResume.fields[field.slug] = field['name_' + this.userResume.language.code]
						} else {
							this.userResume.fields[field.slug] = ''
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
</style>