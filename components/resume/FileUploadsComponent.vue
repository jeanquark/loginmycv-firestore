<template>
    <div class="text-xs-center" style="padding: 30px; margin-top: 0px;" v-if="userResume">
        <p>
			loadedUser: {{ loadedUser }}<br /><br />
            userResume: {{ userResume }}<br /><br />
            userResume.uploads: {{ userResume.uploads }}<br /><br />
			<!-- fileName: {{ fileName }}<br /><br /> -->
			<!-- downloadUrl: {{ downloadUrl }}<br /><br /> -->
			<!-- fileName2: {{ fileName2 }}<br /><br /> -->
			<!-- totalUploadSize: {{ totalUploadSize }}<br /><br /> -->
			<!-- loadedUserResumes: {{ loadedUserResumes }}<br /><br /> -->
			<!-- getTotalUploadSize: {{ getTotalUploadSize }}<br /><br /> -->
			<!-- items: {{ items }}<br /><br /> -->
			<!-- files: {{ files }}<br /><br /> -->
			<!-- totalSize: {{ totalSize }}<br /><br /> -->
            <!-- userResume.personal_data.picture: {{ userResume.personal_data.picture ? userResume.personal_data.picture.size : null }}<br /><br /> -->
			<!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
			<!-- loadedNewResume.personal_data.picture.size: {{ loadedNewResume.personal_data.picture ? loadedNewResume.personal_data.picture.size : null }}<br /><br /> -->
			this.picture.size: {{ this.picture ? this.picture.size : null }}<br /><br />
			this.totalUploadSize: {{ this.totalUploadSize }}<br /><br />
			this.totalSize: {{ this.totalSize }}<br /><br />
			getCurrentFiles: {{ getCurrentFiles }}<br /><br />
        </p>
        <h2>File uploads</h2><br />

		<v-progress-circular
			:rotate="-90"
			:size="100"
			:width="15"
			:value="totalSizePercent"
			:color="totalSizePercent > 100 ? 'error' : 'secondary'"
			>
			{{ totalSizePercent }}%
		</v-progress-circular>
		of your total space ({{ userFreeSpace }} MiB)
		<br /><br />
		<v-btn color="secondary">Get more space</v-btn>

		<v-layout row wrap>
			<v-flex xs12 sm6 v-for="(file, index) of getCurrentFiles" :key="index">
			<!-- <v-flex xs12 sm6 v-for="(file, index) of this.userResume.uploads" :key="index"> -->
				<v-card class="ma-2">
					<v-card-title primary-title class="justify-center">
						<h3 class="headline mb-0">File #{{ index + 1 }}</h3>
					</v-card-title>

					<v-card-text>
						<v-text-field
							:counter="50"
							label="File Title"
							placeholder="eg. My CV, Company X recommandation letter, etc."
							prepend-icon="title"
							v-model="getCurrentFiles[index].title"
						></v-text-field>

						<br />

						<!-- <v-text-field label="My File" @click="pickFile(`file${index}`)" v-model="userResume.uploads[index].name" prepend-icon='attach_file' :disabled="userResume.uploads[index].new ? false : true"></v-text-field> -->
						<v-text-field label="My File" @click="pickFile(`file${index}`)" v-model="getCurrentFiles[index].name" prepend-icon='attach_file' :disabled="getCurrentFiles[index].new ? false : true"></v-text-field>
						<input
							type="file"
							style="display: none"
							:ref="`file${index}`"
							accept="application/pdf"
							@change="onFilePicked($event, index)"
						>
					</v-card-text>

					<v-card-actions class="justify-center">
						<v-btn flat color="error" @click="removeUpload(index)">Remove</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
    
		<v-btn
			fab
			absolute
			bottom
			right
			color="pink"
			slot="activator"
			@click="addUpload"
		>
			<v-icon>add</v-icon>
		</v-btn>
    </div>
</template>

<script>
	import { firestore, storage } from '~/plugins/firebase-client-init'
	import moment from 'moment'
	import Noty from 'noty'
    export default {
		props: ['picture'],
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
			this.resumeSlug = resumeSlug			
			// Get user total upload size
			// if (!this.$store.getters['resumes/loadedUserResumes']) {
				await this.$store.dispatch('resumes/fetchUserResumes')
				await this.$store.dispatch('app-parameters/fetchAppParameters')

			// }
			this.userTotalUsedSpace()
			// this.$store.commit('setLoading', false)
		},
		async mounted () {
			const resume = await this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
			if (resume) {
				this.loading = new Array(resume.length)
			}
		},
        data () {
            return {
				totalUploadSize: 0
            }
        },
        computed: {
            userResume () {
                if (this.resumeSlug) {
                    return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                } else {
                    return this.$store.getters['resumes/loadedNewResume']
                }
			},
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			loadedUserResumes () {
				return this.$store.getters['resumes/loadedUserResumes']
			},
			loadedNewResume () {
                return this.$store.getters['resumes/loadedNewResume']
			},
			getCurrentFiles () {
				return this.userResume.uploads.filter(upload => upload.format !== 'picture')
			},
			totalSize () {
				if (this.userResume.uploads) {
					if (this.picture && this.picture.size) {
						return this.userResume.uploads.reduces((accumulator, file) => {
							return accumulator + parseInt(file.size)
						}, (parseInt(this.picture.size) + parseInt(this.totalUploadSize)))
					} else {
						return this.userResume.uploads.reduce((accumulator, file) => {
							return accumulator + parseInt(file.size_in_bytes)
						}, parseInt(this.totalUploadSize))
					}
				} else {
					return parseInt(this.totalUploadSize)
				}
			},
			totalSizePercent () {
				const limit = 10 * 1024 * 1024
				// const limit = this.$store.getters['app_parameters/users']['initial_space_in_bytes']
				// if (this.totalSize) {
					return Number((this.totalSize/limit) * 100).toFixed(1)
				// }
			},
			userFreeSpace () {
				if (this.loadedUser.private) {
					return ((this.loadedUser.private.total_space_in_bytes - this.loadedUser.private.used_space_in_bytes) / (1024 * 1024)).toFixed(2)
				}
				return 0
			},
        },
        methods: {
			addUpload () {
				console.log('addUpload')
				this.userResume.uploads.push({
				// this.getCurrentFiles.push({
					file: '',
					title: 'DEF',
					name: '',
					size_in_bytes: 0,
					new: true,
					format: 'file',
					_updated_at: moment().unix()
				})
			},
			async removeUpload (index) {
				// this.userResume.uploads.splice(index, 1)
				this.getCurrentFiles.splice(index, 1)
			},
			async userTotalUsedSpace () {
				let sum = 0
				const userResumes = this.$store.getters['resumes/loadedUserResumes']
				userResumes.forEach(resume => {
					const uploadsArray = resume.uploads
					if (uploadsArray) {
						uploadsArray.forEach(upload => {
							sum += upload.size_in_bytes
						})
					}
				})
				// console.log('sum: ', sum)
				this.totalUploadSize = sum
			},
			pickFile (index) {
				this.$refs[index][0].click()
			},
			async onFilePicked (e, index) {
				const files = e.target.files
				console.log('files: ', files)
				console.log('index: ', index)
				if (files[0]) {
					this.userResume.uploads[index + 1].file = files[0]
					this.userResume.uploads[index + 1].name = files[0].name
					this.userResume.uploads[index + 1].size_in_bytes = parseInt(files[0].size)
					// this.userResume.uploads[index] = files[0]
					// this.userResume.uploads.push(files[0])
					// this.getCurrentFiles[3] = files[0]
				}
			}
        }
    }
</script>

<style scoped>

</style>