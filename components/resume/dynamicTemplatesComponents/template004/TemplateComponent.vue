<template>
    <div :style="cssProps">
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 md4 lg3 v-for="map in loadedTemplate.maps.filter(map => map.active !== false)" :key="map.slug">
                <v-card hover class="ma-2" @click="selectMap(map)" :class="[userResume.template.map.slug === map.slug ? 'active' : null]">
                <!-- <v-card hover class="ma-2" @click="selectMap(map)" :class="[selectedMap.slug === map.slug ? 'active' : null]"> -->
                    <v-img :src="`/images/templates/template004/maps/${map.slug}.jpg`" :lazy-src="`/images/templates/template004/maps/${map.slug}.jpg`"></v-img>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Draggable list of subdivisions -->
        <v-layout row wrap class="mb-2">
            <v-flex xs12>
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
                <h2 class="text-xs-center">Assign colors to states</h2>
            </v-flex>

            <v-flex xs6 class="px-3">
				<h3 class="text-xs-center">Select states</h3>
                <v-autocomplete :items="selectedMap.subdivisions" :return-object="true" item-text="name" chips :small-chips="false" deletable-chips label="" color="secondary" multiple v-model="userResume.template.map_subdivisions"></v-autocomplete>
            </v-flex>

            <v-flex xs6 class="px-3">
				<h3 class="text-xs-center">States color</h3>
				<v-layout align-center v-for="(subdivision, index) in userResume.template.map_subdivisions" :key="subdivision.slug" class="my-2">
					<v-flex xs6 class="text-xs-right mr-3">
						<span class="">{{ subdivision.name }}</span>
					</v-flex>
					<v-flex xs6>
						<vue-colorpicker v-model="userResume.template.map_subdivisions[index].color"></vue-colorpicker>
					</v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
	import { VueColorpicker } from 'vue-pop-colorpicker'
	export default {
		inject: ['$validator'], // Inject parent validator
		props: ['resumeSlug', 'loadedTemplate'],
		components: { VueColorpicker },
		created() {
			if (this.userResume && this.userResume.template.map) {
				this.selectedMap = this.loadedTemplate.maps.find(map => map.slug === this.userResume.template.map.slug)
			} 
		},
		mounted () {
		},
		data() {
			return {
				selectedMap: {}
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
				console.log('selectMap: ', map)
				this.selectedMap = { geoJSON: map.geoJSON, image: map.image, name: map.name, slug: map.slug, subdivisions: map.subdivisions }
				this.userResume.template.map_subdivisions = []
				this.userResume.template.map = { geoJSON: map.geoJSON, image: map.image, name: map.name, slug: map.slug, subdivisions: map.subdivisions.sort((a, b) => a.name.localeCompare(b.name)) }
				// return
				// this.allSubdivisions = []
				// this.userResume.template.map_subdivisions = []
				// this.userResume.template.map = {}
				// if (map.subdivisions && this.allSubdivisions.length < 1) {
				// 	const sortedMapSubdivisions = map.subdivisions.sort((a, b) =>
				// 		a.name.localeCompare(b.name)
				// 	)
				// 	sortedMapSubdivisions.forEach(subdivision => {
				// 		this.allSubdivisions.push(subdivision)
				// 	})
				// }
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