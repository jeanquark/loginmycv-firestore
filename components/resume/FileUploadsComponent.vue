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
            userResume.personal_data.picture: {{ userResume.personal_data.picture ? userResume.personal_data.picture.size : null }}<br /><br />
			loadedNewResume: {{ loadedNewResume }}<br /><br />
			loadedNewResume.personal_data.picture.size: {{ loadedNewResume.personal_data.picture ? loadedNewResume.personal_data.picture.size : null }}<br /><br />
			this.picture.size: {{ this.picture ? this.picture.size : null }}<br /><br />
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
		of your total space ({{ userFreeSpace }} MB)
		<br /><br />
		<v-btn color="secondary">Get more space</v-btn>

		<v-layout row wrap>
			<v-flex xs12 sm6 v-for="(file, index) of this.userResume.uploads" :key="index">
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
							v-model="userResume.uploads[index].title"
						></v-text-field>

						<br />

						<v-text-field label="My File" @click="pickFile(`file${index}`)" v-model="userResume.uploads[index].name" prepend-icon='attach_file'></v-text-field>
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
        },
        data () {
            return {
				// fileName: '',
                // imageUrl: '',
                // imageFile: '',
				// uploadingNewImage: false,
				// fileTitle: '',
				// downloadUrl: '',
				// fileName2: [],
				files: [
					{
						title: '',
						file: '',
						size: 0,
						downloadLink: ''
					}
				],
				// fileTitle2: [],
				// items: [{
				// 		title: '',
				// 		file: '',
				// 		size: 0,
				// 		downloadLink: ''
				// 	}
					// {
					// 	avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					// 	title: 'Brunch this weekend?',
					// 	subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
					// },
					// // { divider: true, inset: true },
					// {
					// 	avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
					// 	title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
					// 	subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
					// },
					// // { divider: true, inset: true },
					// {
					// 	avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
					// 	title: 'Oui oui',
					// 	subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
					// }
				// ],
				// totalUploadSize: 0,
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
			// getTotalUploadSize () {
			// 	const userResumes = this.$store.getters['resumes/loadedUserResumes']
			// 	console.log('userResumes: ', userResumes)

			// 	let totalUploadSize = 0
			// 	userResumes.forEach(resume => {
			// 		resume.uploads.forEach(upload => {
			// 			totalUploadSize += parseInt(upload.size)
			// 		})
			// 	})
			// 	console.log('totalUploadSize: ', totalUploadSize)
			// 	// this.totalUploadSize = totalUploadSize
			// 	return totalUploadSize
			// },
			totalSize () {
				if (this.picture && this.picture.size) {
					return this.userResume.uploads.reduces((accumulator, file) => {
						return accumulator + parseInt(file.size)
					}, parseInt(this.picture.size))
				} else {
					return this.userResume.uploads.reduce((accumulator, file) => {
						return accumulator + parseInt(file.size)
					}, 0)
				}
			},
			totalSizePercent () {
				const limit = 10 * 1024 * 1024
				// const limit = this.$store.getters['app_parameters/users']['initial_space_in_bytes']
				return Number((this.totalSize/limit) * 100).toFixed(1)
			},
			userFreeSpace () {
				if (this.loadedUser.private) {
					return ((this.loadedUser.private.total_space_in_bytes - this.loadedUser.private.used_space_in_bytes) / (1024 * 1024)).toFixed(2)
				}
				return 0
			}
        },
        methods: {
			addUpload () {
				this.userResume.uploads.push({
					file: '',
					title: '',
					name: '',
					size: 0
				})
			},
			removeUpload (index) {
				console.log('index: ', index)
				this.userResume.uploads.splice(index, 1)
			},
			// openFile (downloadUrl) {
			// 	console.log('downloadUrl: ', downloadUrl)
			// 	window.open(downloadUrl)
			// },
			
            // pickFile () {
			// 	console.log('abc: ', this.$refs.image)
            //     this.$refs.image.click ()
			// },
			pickFile (index) {
				// console.log('index: ', index)
				// console.log(this.$refs)
				// console.log(this.$refs[index][0].click ())
				this.$refs[index][0].click()
			},
			async onFilePicked (e, index) {
				const files = e.target.files
				console.log('files: ', files)
				console.log('index: ', index)
				this.userResume.uploads[index].file = files[0]
				this.userResume.uploads[index].name = files[0].name
				this.userResume.uploads[index].size = parseInt(files[0].size)
				this.userResume.uploads[index] = files[0]
				// this.loadedNewResume.uploads[index] = files
				// console.log('this.userResume.uploads: ', this.userResume.uploads)
			},
			async onFilePicked2 (e) {
				// var storageRef = storage.ref('mlb2.jpg')
				// console.log('storageRef: ', storageRef)

				const files = e.target.files

				if (files[0] !== undefined) {
					// console.log('file: ', file)
					const file = files[0]
					const fileName = files[0].name
					this.fileName = files[0].name
					// console.log('fileName: ', fileName)
					// console.log(fileName.substring(fileName.lastIndexOf('.') + 1)) //pdf
					if (fileName.substring(fileName.lastIndexOf('.') + 1) === 'pdf') { // Check if file is pdf
						// const storageResumeRef = storage.ref(`resumes`)
						// const storageUserRef = storageResumeRef.ref(`${this.loadedUser.id}/${fileName}`)
						// const storageFileRef = storageUserRef.ref(`${fileName}`)
						try {
							const storageFileRef = storage.ref('resumes').child(`${this.loadedUser.id}/${fileName}`)
							const snapshot = await storageFileRef.put(file)
							console.log('snapshot: ', snapshot)
							this.downloadUrl = await snapshot.ref.getDownloadURL()
							console.log('this.downloadUrl: ', this.downloadUrl)
						} catch (error) {
							console.log('error: ', error)
						}
						// console.log('snapshot.ref.getDownloadURL(): ', snapshot.ref.getDownloadURL())
					}
					// console.log(this.loadedUser.id)
					// console.log(storageRef)
				}
			},
            onFilePicked3 (e) {
                this.uploadingNewImage = true
                const files = e.target.files
                console.log('files: ', files)
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    console.log('fr: ', fr)
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        // this.imageFile = files[0] // this is an image file that can be sent to server...
                        // this.loadedUserResume.image_new = fr.result
                        this.userResume.image_new = fr.result
                        // this.candidateLongResume.image_new = 'abc'
                        this.uploadingNewImage = false
                    })   
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
			},
        }
    }
</script>

<style scoped>

</style>