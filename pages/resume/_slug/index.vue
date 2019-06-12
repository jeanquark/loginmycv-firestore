<template>
	<div>
		<div v-if="resume && resume.template_id">
			<!-- resume: {{ resume }}<br /> -->
			<component :is="component" :resume="resume" v-if="component" />

		</div>
		<v-app v-else>
			<v-content>
				<v-container fluid fill-height>
					<v-layout align-center justify-center>
						<v-img src="/images/loader.gif" max-width="200px"></v-img>
					</v-layout>
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
    		// await this.$store.commit('resumes/setResume', {firstname: 'Jean-Marc'})
			// setTimeout(() => {
			// 	console.log('OK!')
			// }, 3000)
			console.log('Entering mounted lifecycle hook resume/_user_id/index.vue')
			// const template = await this.$store.getters['resumes/loadedResume'].template
            // console.log('template: ', template)
            // const type = `Template${template}`
            // await axios.post('/check-user-authorization', { user_id: 'OlxfESwPtlgzz4vcjiL4YKsIDZI2' })
            // console.log('abc: ', abc)
            // this.resume = 'abc'


            // 1) Fetch resume if resume is public or it is user's resume or user has registered as a visitor		      
			const slug = this.$route.params.slug
			console.log('this.$route.params: ', this.$route.params)
			console.log('slug2: ', slug)
			try {
				this.resume = await this.$store.dispatch('resumes/fetchLongResume', slug)
				console.log('resume from index.vue: ', this.resume)
				// return

				if (this.resume) {
					// this.resume = resume
					console.log('resume.template_id: ', this.resume.template_id)
					await this.$store.dispatch('templates/fetchTemplates')
		            const template = await this.$store.getters['templates/loadedTemplates'].find(template => template.id === this.resume.template_id)
		            console.log('template: ', template)
		            return this.component = () => import(`~/components/templates/${template.file}`)
				}
			} catch (error) {
				console.log('error2: ', error)
				console.log('No firebase authorization')
			}

			console.log('load component')

			


			// 2) Fetch resume if user has authorization
			// const authUser = this.$store.getters['users/loadedUser']
			// console.log('authUser: ', authUser)
        	// if (authUser) { // User is connected
	  		// 	const authUserId = authUser.id ? authUser.id : authUser.uid
	  		// 	console.log('authUserId: ', authUserId)
			// 	try {
			// 		console.log('Check user authorization')
			// 		const resume = await axios.post('/check-user-authorization', { authUserId, slug })
			// 		console.log('resume received from check user authorization: ', resume)
			// 		console.log('resume.data: ', resume.data)
			// 		console.log('resume.data.status: ', resume.data.status)
			// 		// return resume.data.status;
			// 		this.resume = resume.data.resume
			// 		if (this.resume) {
			// 			await this.$store.dispatch('templates/fetchTemplates')
			// 			const template = await this.$store.getters['templates/loadedTemplates'].find(template => template.id === this.resume.template_id)
			// 			console.log('template: ', template)
			// 			return this.component = () => import(`~/components/templates/${template.file}`)  
			// 			// return { resume }
			// 		}
			// 	} catch (error) {
			// 		console.log('error check-user-authorization: ', error)
			// 		// new Noty({
			// 		// 	type: 'error',
			// 		// 	text: 'Sorry, an error occured during the authorization checking process.',
			// 		// 	timeout: 5000,
			// 		// 	theme: 'metroui'
			// 		// }).show()
			// 	}
        	// }

			// 3) Redirect to password page for visitors
			return this.$router.replace(`/resume/${slug}/login`)

   //      	console.log('redirect to visitor login if resume exists')
        	

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