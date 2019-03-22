<template>
    <div v-cloak>
        <!-- <b>this.type:</b> {{ this.type }}<br /> -->
        <!-- <b>this.resume:</b> {{ this.resume }}<br /> -->
        <!-- loadedResume: {{ loadedResume }}<br /> -->
        <component :is="component" :resume="resume" v-if="component" />
        <!-- <nuxt-link to="/">Back home</nuxt-link> -->
    </div>
</template>

<script>
    import Noty from 'noty'
    export default {
        name: 'dynamic-resume-template',
        props: ['resume'],
        created () {
        },
        mounted () {
            if (this.resume && this.resume.template) {
                const templateId = this.resume.template
                console.log('templateId: ', templateId)
                return this.component = () => import(`~/components/templates/Template${templateId}`)
            } else {
                new Noty({
                    type: 'error',
                    text: 'You don\'t have access to this resume.',
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
                return this.$router.push('/')
            }
            
            // this.loader()
            //     .then(() => {
            //         // console.log('this.loader: ', this.loader)

            //         this.component = () => this.loader()
            //     })
            //     .catch(() => {
            //         console.log('this.loader catch')
            //         this.component = () => import('~/components/templates/Template1')
            //     })
        },
        data () {
            return {
                component: null,
            }
        },
        computed: {
            loader() {
                // if (!this.type) {
                //     return null
                // }
                // return () => import(`~/components/templates/${this.type}`)


                if (this.resume && this.resume.template) {
                    const templateId = this.resume.template
                    console.log('templateId: ', templateId)
                    return () => import(`~/components/templates/Template${templateId}`)
                } else {
                    console.log('No resume found!')
                    return null
                    // return () => this.$router.push('/')
                }
            },
            // loadedResume () {
            //     return this.$store.getters['resumes/loadedResume']
            // }
        }
    }
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }
</style>