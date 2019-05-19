<template>
    <!-- <div style="padding: 30px;"> -->
    <div class="pa-4">
        <p>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /> -->
            <!-- edit: {{ this.edit }}<br /> -->
            userResume: {{ userResume }}<br />
            <!-- loadedNewResume: {{ loadedNewResume }}<br /> -->
        </p>
        <v-layout row wrap pa-2>
            <!-- <v-flex xs4 v-for="template in loadedTemplates" :key="template.id" class="pa-2" v-if="loadedUserResume">
                <v-card hover :value="template.id" @click="selectTemplate(template.id)" :class="[ loadedUserResume.template_id === template.id ? 'active' : null ]">
                    <v-img
                        :src="`/images/templates/${template.image}`"
                        :lazy-src="`/images/templates/${template.image}`"
                        aspect-ratio="1.5"
                    ></v-img>
                </v-card>
            </v-flex> -->
            <!-- <v-flex xs12 sm6 md4 lg3 v-for="template in loadedTemplates" :key="template.id" class="pa-2">
                <v-card hover :value="template.id" @click="selectTemplate(template)" :class="[ template.id === userResume.template_id ? 'active' : null ]">
                    <v-img
                        :src="`/images/templates/${template.image}`"
                        :lazy-src="`/images/templates/${template.image}`"
                        aspect-ratio="1.5"
                    ></v-img>
                </v-card>
            </v-flex> -->

            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Choose a template</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4 lg3 v-for="template in loadedTemplates" :key="template.id" class="pa-2">
                                <v-card hover :value="template.id" @click="selectTemplate(template)" :class="[ template.id === userResume.template_id ? 'active' : null ]">
                                    <v-img
                                        :src="`/images/templates/${template.image}`"
                                        :lazy-src="`/images/templates/${template.image}`"
                                        aspect-ratio="1.5"
                                    ></v-img>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap pa-2>
            <v-flex xs12>
                <v-card :elevation="12" v-if="loadedTemplate">
                    {{ userResume.template_id }}<br />
                    loadedTemplates: {{ loadedTemplates }}<br />
                    loadedTemplate: {{ loadedTemplate }}<br />
                    userResume: {{ userResume }}<br />
                    <h2 class="text-xs-center headline">{{ loadedTemplate.name }}</h2>
                    <p class="text-xs-center">{{ loadedTemplate.description }}</p><br />
                    <v-img :src="`/images/templates/${loadedTemplate.image}`" width="100%" />
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap pa-2>
            <v-flex xs12>
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Pick up your colors</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout row align-center>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Primary color<br />
                                <vue-colorpicker v-model="userResume.colors.primaryColor" v-if="userResume"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Secondary color<br />
                                <vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Tertiary color<br />
                                <vue-colorpicker v-model="userResume.colors.tertiaryColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Background color<br />
                                <vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm4 class="text-xs-center">
                                Text color<br />
                                <vue-colorpicker v-model="userResume.colors.textColor"></vue-colorpicker>
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
    export default {
        // props: ['edit'],
        components: { VueColorpicker },
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
            await this.$store.dispatch('templates/fetchTemplates')

        },
        data () {
            return {
                resumeSlug: '',
                model: '',
                template: ''
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
</style>