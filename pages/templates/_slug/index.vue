<template>
	<div>
		<h2>Template page</h2>
		<h3>Colors: </h3>
		Other options
		<!-- userResume: {{ userResume }}<br /> -->
		<v-layout v-if="userResume">
			Primary<vue-colorpicker v-model="userResume.colors.primaryColor"></vue-colorpicker>
			Secondary<vue-colorpicker v-model="userResume.colors.secondaryColor"></vue-colorpicker>
			Tertiary<vue-colorpicker v-model="userResume.colors.tertiaryColor"></vue-colorpicker>
			Background<vue-colorpicker v-model="userResume.colors.backgroundColor"></vue-colorpicker>
			Text<vue-colorpicker v-model="userResume.colors.textColor"></vue-colorpicker>
		</v-layout>
		<component
		    :is="component"
		    :colors="userResume.colors"
			resumeSlug="alexjohnson"
		    v-if="component && userResume"
		/>
	</div>
</template>
	
<script>
	import { VueColorpicker } from "vue-pop-colorpicker"

	export default {
		components: {
			VueColorpicker
		},
		async mounted() {
			const slug = this.$route.params.slug
			console.log("slug: ", slug)
			return (this.component = () =>
				import(`~/components/templatesModels/${slug}`))
		},
		data() {
			return {
				component: null
				// colors: {
				// 	primary: '#ccc'
				// }
			}
		},
		computed: {
			userResume() {
				return this.$store.getters["resumes/loadedUserResumes"].find(
					resume => resume.slug === "alexjohnson"
				)
				// return this.$store.getters['resumes/loadedUserResume']
			}
		}
	}
</script>

<style scoped>
</style>
