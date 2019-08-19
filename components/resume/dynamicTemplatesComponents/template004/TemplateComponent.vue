<template>
    <div :style="cssProps">
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="map in loadedTemplate.maps" :key="map.slug">
                <v-card hover class="ma-2" @click="selectMap(map)" :class="[userResume.template.map.slug === map.slug ? 'active' : null]">
                    <v-img :src="`/images/templates/template004/maps/${map.slug}.jpg`" :lazy-src="`/images/templates/template004/maps/${map.slug}.jpg`"></v-img>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Draggable list of subdivisions -->
        <v-layout row wrap>
            <v-flex xs12 class="mb-2">
                userResume.template: {{ userResume.template }}<br /><br />
                <!-- allSubdivisions: {{ allSubdivisions }}<br /><br /> -->
                <!-- selectedSubdivisions: {{ selectedSubdivisions }}<br /> -->
                <!-- userResume.template.map_subdivisions: {{ userResume.template.map_subdivisions }}<br /><br /> -->
                <!-- primaryColor: {{ userResume.colors.primaryColor }}<br /><br /> -->
                <!-- secondaryColor: {{ userResume.colors.secondaryColor }}<br /><br /> -->
                <!-- cssProps: {{ cssProps }}<br /><br /> -->
                <h3 class="text-xs-center">Assign colors to states</h3>
            </v-flex>

            <v-flex xs6 style="border: 1px solid yellow;">
                <h3 class="text-xs-center">List of States</h3>

                <draggable v-model="allSubdivisions" :group="{ name: 'subdivisions' }" @start="drag = true" @end="drag = false" :sort="false" style="height: 150px; overflow-y: auto;">
                    <div v-for="subdivision in allSubdivisions" :key="subdivision.slug" style="padding: 10px; border: 1px dashed red; cursor: pointer;">{{ subdivision.name }}</div>
                </draggable>
            </v-flex>
            <v-flex xs6 style="border: 1px solid red;">
                <h3 class="text-xs-center">Selected States</h3>
                <!-- <v-btn small color="error" @click.stop="setColors()">Set all red</v-btn> -->
                <draggable v-model="userResume.template.map_subdivisions" :group="{ name: 'subdivisions', put: (to) => { return to.el.children.length < 2 } }" @start="drag = true" @end="drag = false" style="min-height: 150px; overflow-y: auto;">
                    <v-layout align-center v-for="(subdivision, index) in userResume.template.map_subdivisions" :key="subdivision.slug" style="padding: 10px; border: 1px dashed yellow; cursor: pointer;">
                        <span class="mr-2">{{ subdivision.name }}-{{ index }}</span>
                        <vue-colorpicker v-model="userResume.template.map_subdivisions[index].color"></vue-colorpicker>
                    </v-layout>
                </draggable>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
	import Draggable from 'vuedraggable'
	import { VueColorpicker } from 'vue-pop-colorpicker'
	export default {
		inject: ['$validator'], // Inject parent validator
		props: ['resumeSlug', 'loadedTemplate'],
		components: { Draggable, VueColorpicker },
		created() {
			// Initialize empty map subdivisions array
			if (!this.userResume.template.map_subdivisions) {
				this.userResume.template.map_subdivisions = []
			}
		},
		data() {
			return {
				allSubdivisions: [],
				selectedSubdivisions: []
				// subdivisions: []
			}
		},
		computed: {
			cssProps() {
				return {
					'--primary-color': this.userResume.colors.primaryColor,
					'--secondary-color': this.userResume.colors.secondaryColor
					// '--tertiary-color': this.colors.tertiaryColor,
					// '--background-color': this.colors.backgroundColor,
					// '--text-color': this.colors.textColor
				}
			},
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
			selectMap(map) {
				console.log('selectMap: ', map)
				this.userResume.template.map = {
					name: map.name,
					slug: map.slug,
					geoJSON: map.geoJSON
				}
				this.allSubdivisions = []
				if (map.subdivisions && this.allSubdivisions.length < 1) {
					map.subdivisions.forEach(subdivision => {
						// console.log('subdivision: ', subdivision)
						this.allSubdivisions.push(subdivision)
					})
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