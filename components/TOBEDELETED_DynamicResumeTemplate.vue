<template>
    <div v-cloak>
        <!-- <b>this.type:</b> {{ this.type }}<br /> -->
        <b>this.resume:</b> {{ this.resume }}<br />
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
        async mounted () {
            // if (this.resume && this.resume.template) {
            if (this.resume) {
                // console.log('this.resume: ', this.resume)
                // if (this.resume.status === 'in_process') {
                //     new Noty({
                //         type: 'warning',
                //         text: 'Your authorization request is being processed.',
                //         timeout: 5000,
                //         theme: 'metroui'
                //     }).show()
                //     return this.$router.push('/')
                // }
                // if (this.resume.status === 'not_allowed') {
                //     new Noty({
                //         type: 'error',
                //         text: 'You are not allowed to access this resume.',
                //         timeout: 5000,
                //         theme: 'metroui'
                //     }).show()
                //     return this.$router.push(`/resume/${this.resume.slug}/login`)
                // }
                console.log('this.resume: ', this.resume)
                const templateId = this.resume.template_id
                // const templateId = 'KZn492txu3znyr8Zz4oL'
                console.log('templateId: ', templateId)
                await this.$store.dispatch('templates/fetchTemplates')
                const template = await this.$store.getters['templates/loadedTemplates'].find(template => template.id === templateId)
                console.log('template: ', template)

                if (template) {
                    return this.component = () => import(`~/components/templates/${template.file}`)                
                }
                // return this.component = () => import(`~/components/templates/template2`)
            } else {
                new Noty({
                    type: 'error',
                    text: 'You don\'t have access to this resume.',
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
                return this.$router.push('/login')
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