<template>
    <div class="pa-4">
        <div>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /> -->
            <!-- edit: {{ this.edit }}<br /> -->
            <!-- userResume: {{ userResume }}<br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /> -->
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
                                    <v-img
                                        :src="`/images/templates/${template.image}`"
                                        :lazy-src="`/images/templates/${template.image}`"
                                        aspect-ratio="1.5"
                                    ></v-img>
                                    <!-- <div class="text-xs-center">{{ template.name }}</div> -->
                                    <!-- <div class="text-xs-center">{{ template.description }}</div> -->
                                </v-card>
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

                    <v-layout row align-center class="mb-2">
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

                    <!-- <v-img :src="`/images/templates/${loadedTemplate.image}`" width="100%" /> -->
                    <!-- userResume.colors.primaryColor: {{ userResume.colors.primaryColor }}<br /> -->
                    <!-- userResume.colors.backgroundColor: {{ userResume.colors.backgroundColor }}<br /> -->
                    <image-template1 :colors="userResume.colors" v-if="userResume.template_id === loadedTemplates[0].id" class="my-3" />
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
                        <h2 class="headline mb-0">Menu names</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 class="px-4" v-for="(menu, index) in loadedTemplate.menus" :key="index">
                                <v-subheader class="px-0">{{ menu.name }}</v-subheader>
                                <v-text-field
                                    :name="menu.slug"
                                    item-text="name"
                                    class="my-0 py-0"
                                    v-validate="{ max: 50 }"
                                    :error-messages="errors ? errors.collect(menu.slug) : null"
                                    :data-vv-as="menu.name"
                                    :counter="50"
                                    v-model="userResume.menus[menu.slug]"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    import { VueColorpicker } from 'vue-pop-colorpicker'
    import imageTemplate1 from '~/components/templatesSVG/Template1'
    // import { imageTemplate1 } from '~/components/Login'
    export default {
        // props: ['edit'],
        inject: ['$validator'], // Inject parent validator
        components: { VueColorpicker, imageTemplate1 },
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
            await this.$store.dispatch('templates/fetchTemplates')
            // this.primaryColor = this.userResume.colors.primaryColor
            if (!this.resumeSlug) {
                const template = this.$store.getters['templates/loadedTemplates'].find(template => template.slug === 'template1')
                if (template) {
                    this.userResume.template_id = template.id
                    this.userResume.colors = template.colors
                }
            }
        },
        data () {
            return {
                resumeSlug: '',
                model: '',
                template: '',
                primaryColor: ''
            }
        },
        computed: {
            loadedTemplates () {
                return this.$store.getters['templates/loadedTemplates']
            },
            loadedTemplate () {
                return this.loadedTemplates.find(template => template.id === this.userResume.template_id)
            },
            userResume () {
                if (this.resumeSlug) {
                    return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                } else {
                    // return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                    return this.$store.getters['resumes/loadedNewResume']
                }
            }
        },
        methods: {
            selectTemplate (template) {
                console.log('template', template)
                if (!this.resumeSlug) {
                    this.userResume.colors = template.colors
                }
                this.userResume.template_id = template.id
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
</style>