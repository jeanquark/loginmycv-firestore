<template>
	<div>
		<!-- \pages\resume\_user_id\index<br /> -->
		<!-- <b>type:</b> {{ type }}<br /> -->
		<!-- <b>resume:</b> {{ resume }}<br /> -->
		<dynamic-resume-template :resume="resume" />
		<!-- <nuxt-link to="/">Go back home</nuxt-link><br /> -->
		<!-- <b>loadedUser:</b> {{ loadedUser }}<br /> -->
	</div>
</template>

<script>
	import axios from 'axios'
	// import { Route } from 'vue-router'
	import DynamicResumeTemplate from '~/components/DynamicResumeTemplate'
	import Noty from 'noty'
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
  			// const ip = await $axios.$get('http://icanhazip.com')
  			// const authUserId = store.getters['users/loadedUser'] ? store.getters['users/loadedUser'].id : null
  			// console.log('authUserId: ', authUserId)
  			// console.log('context: ', context)
  			const authUser = store.getters['users/loadedUser']
  			console.log('authUser: ', authUser)
  			if (authUser) {
  				const slug = params.slug
  				const authUserId = authUser.id
  				console.log('slug: ', slug)
  				console.log('authUserId: ', authUserId)
  				console.log('User is authenticated. Go ahead!')
  				try {
  					const resume = await $axios.$post('/check-user-authorization', { authUserId, slug })
  					console.log('resume3: ', resume)
  					return { resume }
  					// if (!resume.slug) {
  					// 	console.log('redirect with status: ', resume)
  					// 	store.commit('setError', { abc: 'abc2'})
  					// 	// console.log(store.getters['index/error'])
  					// 	// new Noty({
  					// 	// 	type: 'error',
  					// 	// 	text: 'redirect',
  					// 	// 	timeout: 5000,
  					// 	// 	theme: 'metroui'
  					// 	// }).show()
  					// 	// return redirect('/')
  					// } else {
  					// 	return { resume }
  					// }
  				} catch (error) {
  					console.log('error2: ', error)
  				}
  			} else {
  				console.log('params.username: ', params.username)
  				console.log('authUser: ', authUser)
  				console.log('Not authenticated! Stop here')
  				// window.location.replace('/')
  				// this.$router.push('/')
  				return redirect('/')
  			}
  			// console.log('auth_user_id: ', auth_user_id)
  			// console.log('ip: ', ip)
  			// console.log('resume: ', resume)
  			// return { ip }
  			// return { resume }
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