<template>
	<div>
		<dynamic-resume-template :resume="resume" />
	</div>
</template>

<script>
	import axios from 'axios'
	import DynamicResumeTemplate from '~/components/DynamicResumeTemplate'
	import Noty from 'noty'
	import { firestore } from '~/plugins/firebase-client-init.js'
	export default {
		// middleware: ['resume-check'],
		head () {
		    return {
		      	title: `Resume - ${this.resume.username}`,
		      	meta: [
		        	// hid is used as unique identifier. Do not use `vmid` for it as it will not work
		        	{ hid: 'description', name: 'description', content: 'My custom description' }
		      	]
		    }
		},
		components: { DynamicResumeTemplate },
		async asyncData({ redirect, params, $axios, store }) {			
			try {
				const slug = params.slug
				console.log('slug: ', slug)
				const resume = await store.dispatch('resumes/fetchLongResume', slug)
				// console.log('resume: ', resume)
				return { resume }
			} catch (error) { // Resume visibility is not public, check user authorization
				console.log('error from asyncData: ', error)
				const slug = params.slug
				const authUser = store.getters['users/loadedUser']
				console.log('authUser: ', authUser)
				if (authUser) {
	  				const authUserId = authUser.id
	  				console.log('slug: ', slug)
	  				console.log('authUserId: ', authUserId)
					console.log('User is authenticated. Go ahead!')
	  				try {
	  					const resume = await $axios.$post('/check-user-authorization', { authUserId, slug })
	  					console.log('resume3: ', resume)
	  					return { resume }
	  				} catch (error) {
	  					console.log('error check-user-authorization: ', error)
	  					new Noty({
	  						type: 'error',
	  						text: 'Sorry, an error occured during the authorization checking process.',
	  						timeout: 5000,
	  						theme: 'metroui'
	  					}).show()
	  				}
	  			} else { // Not authenticated, redirect to visitor login
					console.log('Not authenticated, check visitor access')
					return redirect(`/resume/${slug}/login`)
	  			}
			}
		},
		async created () {
    		// await this.$store.commit('resumes/setResume', {firstname: 'Jean-Marc'})
			setTimeout(() => {
				console.log('OK!')
			}, 3000)
			console.log('Entering created lifecycle hook resume/_user_id/index.vue')
			// const template = await this.$store.getters['resumes/loadedResume'].template
            // console.log('template: ', template)
            // const type = `Template${template}`
            // await axios.post('/check-user-authorization', { user_id: 'OlxfESwPtlgzz4vcjiL4YKsIDZI2' })
            // console.log('abc: ', abc)
		},
		data() {
			return {
				// type: 'Template1'
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