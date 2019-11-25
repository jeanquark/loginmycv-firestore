<template>
	<div>
		<div v-if="resume && resume.template && resume.template.id">
			<!-- resume.template_id: {{ resume.template_id }}<br /> -->
			<!-- component: {{ component }}<br /><br /> -->
			<!-- resume.template: {{ resume.template }} -->
			<component :is="component" :resume="resume" v-if="component" />
		</div>
		<v-app v-else>
			<v-content>
				<v-container fluid class="fill-height">
					<!-- resume.template_id: {{ resume.template_id }}<br /> -->
					<!-- <v-layout align-center justify-center> -->
					<v-row justify="center" align="center">
						<v-img src="/images/loader.gif" max-width="200px"></v-img>
					<!-- </v-layout> -->
					</v-row>
				</v-container>
			</v-content>
		</v-app>

	</div>
</template>

<script>
	import axios from 'axios'
	// import DynamicResumeTemplate from '~/components/DynamicResumeTemplate'
	import Noty from 'noty'
	// import { firestore } from '~/plugins/firebase-client-init.js'
	export default {
		// middleware: ['resume-check'],
		// head () {
		//     return {
		//       	title: `Resume - ${this.resume.username}`,
		//       	meta: [
		//         	// hid is used as unique identifier. Do not use `vmid` for it as it will not work
		//         	{ hid: 'description', name: 'description', content: 'My custom description' }
		//       	]
		//     }
		// },
		// components: { DynamicResumeTemplate },
		async created () {
			console.log('Entering created lifecycle hook')
		},
		async mounted () {
			console.log('Entering mounted lifecycle hook resume/_user_id/index.vue')

            // 1) Fetch resume if resume is active & public, it is user's resume or user has been registered as a visitor		      
			const slug = this.$route.params.slug
			// console.log('this.$route.params: ', this.$route.params)
			console.log('slug: ', slug)
			try {
				this.resume = await this.$store.dispatch('resumes/fetchLongResume', slug)
				// console.log('resume from index.vue: ', this.resume)

				if (this.resume) {
					console.log('resume.template.id: ', this.resume.template.id)

					const template = await this.$store.dispatch('templates/fetchTemplate', this.resume.template.id)
					// console.log('snapshot2: ', snapshot)
					// await this.$store.dispatch('templates/fetchTemplates')
		            // const template = await this.$store.getters['templates/loadedTemplates'].find(template => template.id === this.resume.template_id)
		            console.log('template: ', template)
		            return this.component = () => import(`~/components/templates/${template.file}`)
		            // return this.component = () => import(`~/components/templates/Template001`)
				} else {
					return this.$router.replace(`/resume/${slug}/login`)
				}
			} catch (error) {
				console.log('error: ', error)
				console.log('No firebase authorization')
				if (error === 'resume_is_not_active') {
					new Noty ({
						type: 'warning',
						text: 'The resume you are looking for is not currently active. Please contact author.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					return this.$router.replace('/')
				} else if (error === 'no_template_found') {
					new Noty ({
						type: 'warning',
						text: 'No template found for this resume.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					return this.$router.replace('/')
				}
			}

			// console.log('load component')

			// return this.$router.replace(`/resume/${slug}/login`)
		},
		data() {
			return {
				// type: 'Template1'
				component: null,
				abc: 'abc',
				resume: {}
			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			type () {
				// return `Template2`
				// if (this.$store.getters['resumes/loadedResume']) {
				// 	const id = this.$store.getters['resumes/loadedResume'].template
				// 	return `Template${id}`
				// }
				// if (resume && resume.template) {
				// 	return `Template${resume.template}`
				// } else {
				// 	return 'Template1'
				// }
				return null
			}
		}
	}
</script>

<style scoped>

</style>