<template>
    <v-container :style="cssProps">
        <!-- <v-layout row wrap class="mb-2"> -->
        <!-- selectedMap: {{ selectedMap }}<br /><br /> -->
        <!-- userResume.template: {{ userResume.template }}<br /><br /> -->
        <!-- userResumeTemplate: {{ userResumeTemplate }}<br /><br /> -->
        <!-- originalTemplate: {{ originalTemplate }}<br /><br /> -->
		<v-row no-gutters class="mb-2">
            <!-- <v-flex xs12 sm6 md4 lg3 v-for="map in loadedTemplate.maps.filter(map => map.active !== false)" :key="map.slug"> -->
			<v-col cols="12" sm="6" md="4" lg="3" v-for="map in loadedTemplate.maps.filter(map => map.active !== false)" :key="map.slug">
                <v-card hover class="ma-2" @click="selectMap(map)" :class="[userResume.template.map.slug === map.slug ? 'active' : null]">
                <!-- <v-card hover class="ma-2" @click="selectMap(map)" :class="[selectedMap.slug === map.slug ? 'active' : null]"> -->
                    <v-img :src="`/images/templates/template004/maps/${map.slug}.jpg`" :lazy-src="`/images/templates/template004/maps/${map.slug}.jpg`"></v-img>
                </v-card>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>

        <!-- Draggable list of subdivisions -->
        <!-- <v-layout row wrap class="mb-2"> -->
		<v-row no-gutters class="mb-2">
            <!-- <v-flex xs12> -->
			<v-col cols="12">
				<!-- loadedTemplate: {{ loadedTemplate }}<br /><br /> -->
                <!-- userResume.template: {{ userResume.template }}<br /><br /> -->
				<!-- userResume.template.map: {{ userResume.template.map }}<br /><br /> -->
				<!-- selectedMap: {{ selectedMap }}<br /><br /> -->
				<!-- selectedMap.subdivisions: {{ selectedMap.subdivisions }}<br /><br /> -->
				<!-- selectedMap2: {{ selectedMap2 }}<br /><br /> -->
                <!-- selectedSubdivisions: {{ selectedSubdivisions }}<br /> -->
                <!-- allSubdivisions: {{ allSubdivisions }}<br /><br /> -->
				<!-- selectedTemplate: {{ selectedTemplate }}<br /><br /> -->
                <!-- userResume.template.map_subdivisions: {{ userResume.template.map_subdivisions }}<br /><br /> -->
                <!-- primaryColor: {{ userResume.colors.primaryColor }}<br /><br /> -->
                <!-- secondaryColor: {{ userResume.colors.secondaryColor }}<br /><br /> -->
                <!-- cssProps: {{ cssProps }}<br /><br /> -->
                <!-- selectedSubdivisions: {{ selectedSubdivisions }}<br /><br /> -->
				<!-- userResume.template.map_subdivisions: {{ userResume.template.map_subdivisions }}<br /><br /> -->
                <h2 class="text-center">Assign colors to states</h2>
            <!-- </v-flex> -->
			</v-col>

            <!-- <v-flex xs6 class="px-3"> -->
			<v-col cols="6" class="px-3">
				<h3 class="text-center">Select states</h3>
                <v-autocomplete :items="selectedMap.subdivisions" :return-object="true" item-text="name" chips :small-chips="false" deletable-chips label="" color="secondary" multiple v-model="userResume.template.map_subdivisions"></v-autocomplete>
            <!-- </v-flex> -->
			</v-col>

            <!-- <v-flex xs6 class="px-3"> -->
			<v-col cols="6" class="px-3">
				<h3 class="text-center">States color</h3>
				<!-- <v-layout align-center v-for="(subdivision, index) in userResume.template.map_subdivisions" :key="subdivision.slug" class="my-2"> -->
				<v-row no-gutters align="center" v-for="(subdivision, index) in userResume.template.map_subdivisions" :key="subdivision.slug" class="my-2">
					<!-- <v-flex xs6 class="text-xs-right mr-3"> -->
					<v-col cols="6" class="text-right">
						<span class="">{{ subdivision.name }}</span>
					<!-- </v-flex> -->
					</v-col>
					<!-- <v-flex xs6> -->
					<v-col cols="6" class="pl-3">
						<vue-colorpicker v-model="userResume.template.map_subdivisions[index].color"></vue-colorpicker>
					<!-- </v-flex> -->
					</v-col>
                <!-- </v-layout> -->
			</v-row>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
    <!-- </div> -->
	</v-container>
</template>

<script>
	import { VueColorpicker } from 'vue-pop-colorpicker'
	export default {
		// inject: ['$validator'], // Inject parent validator
		props: ['resumeSlug', 'loadedTemplate'],
		components: { VueColorpicker },
		created() {
			if (this.userResume && this.userResume.template && this.userResume.template.map) {

				this.selectedMap = this.loadedTemplate.maps.find(map => map.slug === this.userResume.template.map.slug)
				this.originalTemplate = JSON.parse(JSON.stringify(this.userResume.template))
			}
		},
		mounted () {
		},
		data() {
			return {
				selectedMap: {},
				originalTemplate: {}
			}
		},
		computed: {
			cssProps() {
				return {
					'--primary-color': this.userResume.colors.primaryColor,
					'--secondary-color': this.userResume.colors.secondaryColor
				}
			},
			loading() {
				return this.$store.getters['loading']
			},
			userResume() {
				return this.$store.getters['resumes/loadedUserResumes'].find(
					resume => resume.slug === this.resumeSlug
				)
			},
		},
		methods: {
			selectMap(map) {
				console.log('selectMap: ', map.slug)
				// Check if there is original data for the selected map
				if (this.userResume && this.userResume.template && this.originalTemplate.map && this.originalTemplate.map.slug === map.slug) {
					console.log('Load existing values')
					this.selectedMap = { name: map.name, slug: map.slug, image: map.image, geoJSON: map.geoJSON, subdivisions: map.subdivisions.sort((a, b) => a.name.localeCompare(b.name)) }
					this.userResume.template.map = { name: map.name, slug: map.slug, geoJSON: map.geoJSON, image: map.image }
					this.userResume.template.map_markers = this.originalTemplate.map_markers
					this.userResume.template.map_subdivisions = this.originalTemplate.map_subdivisions
				} else if (this.userResume && this.userResume.template) {
					console.log('No preexisting values')
					this.selectedMap = { name: map.name, slug: map.slug, geoJSON: map.geoJSON, image: map.image, subdivisions: map.subdivisions.sort((a, b) => a.name.localeCompare(b.name)) }
					this.userResume.template.map = { name: map.name, slug: map.slug, geoJSON: map.geoJSON, image: map.image }
					this.userResume.template.map_markers = []
					this.userResume.template.map_subdivisions = []
				}
			},
			setColors() {
				this.userResume.template.map_subdivisions.forEach(subdivision => {
					subdivision.color = 'rgb(255, 0, 0)'
				})
			}
		}
	}
</script>

<!--<style scoped lang="scss">
	$linkcolour: #0000ff;
	.abc0 {
		color: $linkcolour;
	}

	.abc1 {
		color: lighten($linkcolour, 25%);
	}

	.abc2 {
		color: lighten($linkcolour, 50%);
	}

	.abc3 {
		color: lighten($linkcolour, 75%);
	}
</style>-->

<style scoped>
	.active {
		border: 4px solid var(--v-secondary-base);
	}
</style>