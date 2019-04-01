<template>
    <div class="text-xs-center" style="padding: 30px; margin-top: 0px;" v-if="userResume">
        <p>
			loadedUser: {{ loadedUser }}<br /><br />
            userResume: {{ userResume }}<br /><br />
			fileName: {{ fileName }}<br /><br />
			downloadUrl: {{ downloadUrl }}<br /><br />
			fileName2: {{ fileName2 }}<br /><br />
			totalUploadSize: {{ totalUploadSize }}<br /><br />
			<!-- loadedUserResumes: {{ loadedUserResumes }}<br /><br /> -->
			getTotalUploadSize: {{ getTotalUploadSize }}<br /><br />
			<!-- items: {{ items }}<br /><br /> -->
			files: {{ files }}<br /><br />
			totalSize: {{ totalSize }}<br /><br />
        </p>
        <h2>File uploads</h2><br />

		<v-layout row wrap v-for="(file, index) of files" :key="index">
			<v-flex xs4>
				file: {{ file }}
				<v-text-field
					:counter="10"
					label="File Title"
					placeholder="eg. My CV, Company X recommandation letter, etc."
					prepend-icon="title"
					v-model="files[index].title"
				></v-text-field>
				<!-- v-model="fileTitle2[index]" -->
			</v-flex>

			<v-flex xs6>
				<v-text-field label="My File" @click="pickFile2(`file${index}`)" v-model="files[index].file" prepend-icon='attach_file'></v-text-field>
				<input
					type="file"
					style="display: none"
					:ref="`file${index}`"
					@change="onFilePicked2($event, index)"
				>
				<!-- accept="application/pdf" -->
				
			</v-flex>

			<v-flex xs2>
				<!-- <v-progress-linear
      				color="amber"
      				height="15"
      				value="45"
    			></v-progress-linear> -->
				<v-btn color="error" @click="remove(index)">Remove</v-btn>

				<!-- <v-progress-circular
      				:value="80"
					:rotate="-90"
      				color="amber"
    			></v-progress-circular> -->
			</v-flex>
			<v-divider :key="`divider-${index}`"></v-divider>
		</v-layout>
		<!--<v-layout>
			<v-flex xs12 sm6>
				<v-text-field
					v-model="fileTitle"
					:counter="10"
					label="File title"
					placeholder="eg. My CV, Company X recommandation letter, etc."
				></v-text-field>
			</v-flex>

			<v-flex xs12 sm6>
                <v-text-field label="My File" @click='pickFile' v-model='fileName' prepend-icon='attach_file'></v-text-field>
                <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="application/pdf"
                    @change="onFilePicked2"
                >
            </v-flex>
            <v-flex xs12 sm6>
				Upload 1:<br />
				<v-icon size="40px" @click="openFile(downloadUrl)">picture_as_pdf</v-icon>
            </v-flex>
		</v-layout>-->

		<!-- <v-container grid-list-md text-xs-center> -->
		<br /><br /><br />
    
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
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
			this.resumeSlug = resumeSlug

			storage.ref('resumes/OlxfESwPtlgzz4vcjiL4YKsIDZI2/38959262-real3d-flipbook-jquery-plugin-license.pdf').getMetadata().then(function(metadata) {
                // Metadata now contains the metadata for 'images/forest.jpg'
                console.log('metadata.size: ', metadata.size)
            }).catch(function(error) {
				console.log('Error getting metadata: ', error)
                // Uh-oh, an error occurred!
			});
			
			// Get user total upload size
			// if (!this.$store.getters['resumes/loadedUserResumes']) {
				await this.$store.dispatch('resumes/fetchUserResumes')
			// }
        },
        data () {
            return {
				fileName: '',
                imageUrl: '',
                imageFile: '',
				uploadingNewImage: false,
				fileTitle: '',
				downloadUrl: '',
				fileName2: [],
				files: [{
						title: '',
						file: '',
						size: 0,
						downloadLink: ''
					}],
				fileTitle2: [],
				items: [{
						title: '',
						file: '',
						size: 0,
						downloadLink: ''
					}
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
				],
				totalUploadSize: 0,
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
			getTotalUploadSize () {
				const userResumes = this.$store.getters['resumes/loadedUserResumes']
				console.log('userResumes: ', userResumes)

				let totalUploadSize = 0
				userResumes.forEach(resume => {
					resume.uploads.forEach(upload => {
						totalUploadSize += parseInt(upload.size)
					})
				})
				console.log('totalUploadSize: ', totalUploadSize)
				// this.totalUploadSize = totalUploadSize
				return totalUploadSize
			},
			totalSize () {
				// return this.files[0].size
				const abc = this.files.reduce((accumulator, file) => {
					return accumulator + parseInt(file.size)
				}, 0)
				return abc
			}
        },
        methods: {
			remove (index) {
				console.log('index: ', index)
				this.files.splice(index, 1)
				// this.items.filter(item => item.slug !== slug)
			},
			openFile (downloadUrl) {
				console.log('downloadUrl: ', downloadUrl)
				window.open(downloadUrl)
			},
			addUpload () {
				this.files.push({
					title: '',
					name: '',
					size: 0,
					downloadLink: ''
				})
			},
            pickFile () {
				console.log('abc: ', this.$refs.image)
                this.$refs.image.click ()
			},
			pickFile2 (index) {
				console.log('index: ', index)
				console.log(this.$refs)
				console.log(this.$refs[index][0].click ())
				// this.files[index].file = 'abc'
			},
			async onFilePicked2 (e, index) {
				// this.files[index] = {
				// 	title: file.title,
				// 	name: file.name
				// }
				// console.log('abc: ', this.$refs.myFiles.files)
				console.log('abc: ', this.files)
				// console.log('event: ', e)
				// console.log('index: ', index)
				const files = e.target.files
				this.files[index].file = files[0].name
				this.files[index].size = parseInt(files[0].size)
				// console.log('files: ', files)
				console.log('this.$refs: ', this.$refs)
				console.log('this.$refs.file0: ', this.$refs.file0[0].files)


				if (files[0] !== undefined) {
					const file = files[0]
					console.log('file: ', file)
					const fileName = file.name
					// this.fileName2.push(fileName2)
					this.fileName2.splice(index, 1, fileName)

					// let formData = new FormData();
					// console.log('formData: ', this.$refs[`file${index}`])
					// formData.append('file',  this.$refs[`file${index}`])
					// console.log('formData: ', formData)
					this.userResume.uploads = this.$refs[`file${index}`]
					console.log('File size: ', file.size)
					// console.log('files: ', files)
					// this.userResume.uploads.push(formData)

					// const reader = new FileReader()
					// reader.readAsDataURL(file)
                    // reader.addEventListener('load', () => {
                    //     this.userResume.uploads.push(reader.result)
                    // })

					// this.fileName2[index] = 'abc'
					// if (fileName.substring(fileName.lastIndexOf('.') + 1) === 'pdf') { // Check if file is pdf
					// 	console.log('upload...')
					// 	try {
					// 		const storageFileRef = storage.ref('resumes').child(`${this.loadedUser.id}/${fileName}`)
					// 		const snapshot = storageFileRef.put(file)
					// 		// console.log('snapshot: ', snapshot)
					// 		snapshot.on('state_changed', (childSnapshot) => {
					// 			let progress = (childSnapshot.bytesTransferred / childSnapshot.totalBytes) * 100;
  					// 			console.log('Upload is ' + progress + '% done');
					// 		}).then(() => {
					// 			// this.downloadUrl = await snapshot.ref.getDownloadURL()
					// 			// console.log('this.downloadUrl: ', this.downloadUrl)
					// 			// const fileSize = await snapshot.ref.getMetadata()
					// 			// console.log('fileSize: ', fileSize)
					// 		})
					// 	} catch (error) {
					// 		console.log('error: ', error)
					// 	}
					// }
				}
			},
			async onFilePicked (e) {
				// var storageRef = storage.ref('mlb2.jpg')
				// console.log('storageRef: ', storageRef)

				var files = e.target.files

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