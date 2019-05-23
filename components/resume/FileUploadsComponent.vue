<template>
    <div class="text-xs-center" style="padding: 30px; margin-top: 0px;" v-if="userResume">
        <p>
			<!-- loadedUser: {{ loadedUser }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
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
			<!-- this.picture.size: {{ this.picture ? this.picture.size : null }}<br /><br /> -->
			<!-- this.totalUploadSize: {{ this.totalUploadSize }}<br /><br /> -->
			<!-- this.totalSize: {{ this.totalSize }}<br /><br /> -->
			geUserFiles.length: {{ getUserFiles.length }}<br /><br />
			userAllocatedSpace: {{ userAllocatedSpace }}<br /><br />
			totalUsedSpace: {{ totalUsedSpace }}<br /><br />
			totalUsedSpacePercent: {{ totalUsedSpacePercent }}<br /><br />
        </p>
        <h2>File uploads</h2><br />

		<v-progress-circular
			:rotate="-90"
			:size="100"
			:width="15"
			:value="totalUsedSpacePercent"
			:color="totalUsedSpacePercent > 100 ? 'error' : 'secondary'"
			>
			{{ totalUsedSpacePercent }}%
		</v-progress-circular>
		of your total space ({{ userAllocatedSpace / (1024 * 1024) }} MiB)
		<br /><br />
		<v-btn color="secondary">Get more space</v-btn>

		<v-layout row wrap>
			<!-- <v-flex xs12> -->
			<!-- <v-flex xs12 sm6 v-for="(file, index) of getUserFiles" :key="index"> -->
			<!-- <div > -->
			<v-flex xs12 sm6 v-for="(file, index) of userResume.uploads" :key="index" v-if="file.type === 'downloadable_file'">
				<!-- <v-layout > -->
				<!-- <v-flex xs12> -->
			<!-- <v-flex xs12 sm6 v-if="file.type === 'downloadable_file'" > -->
				<!-- <v-card class="ma-2" v-if="file.type === 'downloadable_file'"> -->
				<v-card class="ma-2" >
					<v-card-title primary-title class="justify-center">
						<h3 class="headline mb-0">File #{{ getFileIndex(index) }}</h3>
					</v-card-title>

					<v-card-text>
						<v-text-field
							:counter="50"
							label="File Title"
							placeholder="eg. My CV, Company X recommandation letter, etc."
							prepend-icon="title"
							v-model="userResume.uploads[index].title"
						></v-text-field>
						<!-- v-model="getCurrentFiles[index].title" -->
						<!-- v-model="userResume.uploads[index].title" -->


						<br />

						<v-text-field label="My File" @click="pickFile(`file${index}`)" v-model="userResume.uploads[index].name" prepend-icon='attach_file' :disabled="userResume.uploads[index].new ? false : true"></v-text-field>
						<!-- <v-text-field label="My File" @click="pickFile(`file${index}`)" v-model="getCurrentFiles[index].name" prepend-icon='attach_file' :disabled="getCurrentFiles[index].new ? false : true"></v-text-field> -->
						<!-- <v-text-field label="My File" @click="pickFile(`file${index}`)" v-model="userResume.uploads[index].name" prepend-icon='attach_file' :disabled="userResume.uploads[index].new ? false : true"></v-text-field> -->

						<input
							type="file"
							style="display: none"
							:ref="`file${index}`"
							accept="application/pdf"
							@change="onFilePicked($event, index)"
						>
						<!-- @change="onFilePicked($event, index)" -->
					</v-card-text>

					<v-card-actions class="justify-center">
						<v-btn flat color="error" @click="removeUpload(index, file)">Remove</v-btn>
					</v-card-actions>
				</v-card>
			<!-- </v-flex> -->
		<!-- </v-layout> -->
			</v-flex>
			<!-- </div> -->
				<!-- </v-layout> -->
			<!-- </v-flex> -->
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
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
			this.resumeSlug = resumeSlug			
			// Get user total upload size
			// if (!this.$store.getters['resumes/loadedUserResumes']) {
				// await this.$store.dispatch('resumes/fetchUserResumes')
				await this.$store.dispatch('app-parameters/fetchAppParameters')

			// }
			// this.userTotalUsedSpace()
			// this.$store.commit('setLoading', false)
			// if (!this.userResume.uploads) {
				// this.userResume.uploads = new Array(1)
			// }
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
			// totalSize () {
			// 	if (this.userResume.uploads) {
			// 		return this.userResume.uploads.reduce((accumulator, file) => {
			// 			return accumulator + parseInt(file.size_in_bytes)
			// 		}, parseInt(this.totalUploadSize))
			// 		// if (this.picture && this.picture.size) {
			// 		// 	return this.userResume.uploads.reduces((accumulator, file) => {
			// 		// 		return accumulator + parseInt(file.size)
			// 		// 	}, (parseInt(this.picture.size) + parseInt(this.totalUploadSize)))
			// 		// } else {
			// 		// 	return this.userResume.uploads.reduce((accumulator, file) => {
			// 		// 		return accumulator + parseInt(file.size_in_bytes)
			// 		// 	}, parseInt(this.totalUploadSize))
			// 		// }
			// 	} else {
			// 		return parseInt(this.totalUploadSize)
			// 	}
			// },
			// totalSizePercent () {
			// 	const limit = 10 * 1024 * 1024
			// 	// const limit = this.$store.getters['app_parameters/users']['initial_space_in_bytes']
			// 	// if (this.totalSize) {
			// 		return Number((this.totalSize/limit) * 100).toFixed(1)
			// 	// }
			// },
			// userFreeSpace () {
			// 	if (this.loadedUser.private) {
			// 		return ((this.loadedUser.private.total_space_in_bytes - this.loadedUser.private.used_space_in_bytes) / (1024 * 1024)).toFixed(2)
			// 	}
			// 	return 0
			// },
			totalUsedSpace () {
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
				return sum
			},
			totalUsedSpacePercent () {
				// return this.totalUsedSpace / 100
				return (this.totalUsedSpace * 100 / this.userAllocatedSpace).toFixed(1)
			},
			userAllocatedSpace () {
				if (this.loadedUser.private) {
					return this.loadedUser.private.allocated_space_in_bytes
				}
			}
        },
        methods: {
			addUpload () {
				console.log('addUpload')
				// this.getCurrentFiles.push({})
				// if (!this.userResume.uploads) {
				// 	this.userResume.uploads = []
				// }

				this.userResume.uploads.push({
				// this.getCurrentFiles.push({
					file: '',
					title: 'DEF',
					name: '',
					size_in_bytes: 0,
					new: true,
					format: 'file',
					type: 'downloadable_file',
					_updated_at: moment().unix()
				})
			},
			async removeUpload (index, file) {
				console.log('index: ', index)
				console.log('file: ', file)
				// this.getCurrentFiles.filter(file => file.name !== file.name)
				// this.userResume.uploads = this.userResume.uploads.filter(upload => (upload.name !== file.name))
				this.userResume.uploads.splice(index, 1)
				// this.userResume.uploads = []
				// this.userResume.uploads = this.userResume.uploads.filter(up)
				// this.getCurrentFiles.splice(index, 1)
				// console.log(this.userResume.uploads.filter(upload => upload.format === 'file'))
				// this.userResume.uploads.filter(upload => upload.format === 'file').splice(index, 1)
				// const abc = this.userResume.uploads.splice(0, 1)

			},
			// async totalUsedSpace2 () {
			// 	let sum = 0
			// 	const userResumes = this.$store.getters['resumes/loadedUserResumes']
			// 	userResumes.forEach(resume => {
			// 		const uploadsArray = resume.uploads
			// 		if (uploadsArray) {
			// 			uploadsArray.forEach(upload => {
			// 				sum += upload.size_in_bytes
			// 			})
			// 		}
			// 	})
			// 	// console.log('sum: ', sum)
			// 	this.totalUploadSize = sum
			// },
			getUserFiles () {
				if (this.userResume.uploads) {
					return this.userResume.uploads.filter(upload => upload.type === 'downloadable_file')
				}
				return []
			},		
			getFileIndex (index) {
				if (index < this.userResume.uploads.length - this.getUserFiles.length) {
					return index + 1
				} else {
					return index - (this.userResume.uploads.length - this.getUserFiles.length) + 1
				}
			},
			pickFile (index) {
				console.log('pickFile: ', index)
				this.$refs[index][0].click()
			},
			async onFilePicked (e, index) {
				const files = e.target.files
				console.log('files: ', files)
				console.log('index: ', index)
				if (files[0]) {
					console.log('files[0]: ', files[0])
					// this.userResume.uploads[index].file = files[0]
					// this.userResume.uploads[index].name = files[0].name
					// this.userResume.uploads[index].size_in_bytes = parseInt(files[0].size)
					// this.userResume.uploads[index] = files[0]
					// this.getCurrentFiles[index].file = files[0]
					// this.getCurrentFiles[index].name = files[0].name
					// this.getCurrentFiles[index].size_in_bytes = parseInt(files[0].size)
					// const index2 = this.userResume.uploads.findIndex(upload => upload.type === 'downloadable_file' && upload.new === true)
					// console.log('index2: ', index2)
					// this.userResume.uploads[5] = {
					// this.userResume.uploads = this.userResume.uploads.filter(upload => upload.name != '')
					this.userResume.uploads.splice(index, 1, {
					// this.userResume.uploads.push({
						file: files[0],
						name: files[0].name,
						type: 'downloadable_file',
						size_in_bytes: parseInt(files[0].size),
						new: true
					})
					// this.userResume.uploads.splice(index, 1)
					// }
				}
			}
        }
    }
</script>

<style scoped>

</style>