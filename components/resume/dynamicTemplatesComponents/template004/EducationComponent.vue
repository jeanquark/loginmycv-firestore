<template>
    <div>
		<h2>Education Dynamic Component</h2>
    </div>
</template>

<script>
	export default {
		inject: ['$validator'], // Inject parent validator
		props: ['resumeSlug'],
		data() {
			return {
			}
		},
		computed: {
			loading() {
				return this.$store.getters['loading']
			},
			userResume() {
				return this.$store.getters['resumes/loadedUserResumes'].find(
					resume => resume.slug === this.resumeSlug
				)
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	
</style>