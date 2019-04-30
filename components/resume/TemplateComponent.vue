<template>
    <div style="padding: 30px;" v-if="userResume">
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
                        <h2 class="headline mb-0">Choose your template</h2>
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

        <v-layout row wrap pa-2 class="">
            <v-flex xs12 class="">
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Pick up your colors</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-layout align-center>
                            <v-flex xs6 sm3 md2>
                                Primary color:
                            </v-flex>
                            <v-flex xs6 sm3 md2>
                                <vue-colorpicker v-model="userResume.colors.primaryColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm3 md2>
                                Secondary color:
                            </v-flex>
                            <v-flex xs6 sm3 md2>
                                <vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm3 md2>
                                Background color:
                            </v-flex>
                            <v-flex xs6 sm3 md2>
                                <vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
                            </v-flex>
                            <v-flex xs6 sm3 md2>
                                Text color:
                            </v-flex>
                            <v-flex xs6 sm3 md2>
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
        props: ['edit'],
        components: { VueColorpicker },
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
            await this.$store.dispatch('templates/fetchTemplates')
            // const userResume = await this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)

        },
        data () {
            return {
                resumeSlug: '',
                model: '',
                template: '',
                // errors: [],
                // activeTemplate: this.loadedUserResume ? this.loadedUserResume.template_id : null
                // activeTemplate: this.userResume ? this.userResume.template_id : null
                // activeTemplate: 'ZjzvgkAlZq9CPcXToqDK'
            }
        },
        computed: {
            loadedTemplates () {
                return this.$store.getters['templates/loadedTemplates']
            },
            userResume () {
                if (this.edit) {
                    return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                } else {
                    // return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                    return this.$store.getters['resumes/loadedNewResume']
                }
            },
            // loadedNewResume () {
            //     return this.$store.getters['resumes/loadedNewResume']
            // }
        },
        methods: {
            selectTemplate (template) {
                console.log('template.id', template.id)

                // this.activeTemplate = template.id
                // this.$store.commit('resumes/setNewResume', { template_id: template.id })
                // this.loadedNewResume['template_id'] = template.id
                // this.loadedNewResume.template_id = template.id
                this.userResume.template_id = template.id

                // this.$store.commit('resumes/setEmptyResume')
            }
        }
    }
</script>

<style scoped>
    .active {
        border: 4px solid #FFC107;
    }
</style>