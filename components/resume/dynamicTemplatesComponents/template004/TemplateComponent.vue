<template>
    <div :style="cssProps">
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="map in loadedTemplate.maps" :key="map.slug">
                <v-card hover class="ma-2" @click="selectMap(map)">
                    <v-img :src="`/images/templates/template004/maps/${map.slug}.jpg`" :lazy-src="`/images/templates/template004/maps/${map.slug}.jpg`"></v-img>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Draggable list of subdivisions -->
        <v-layout row wrap>
            <v-flex xs12>
                allSubdivisions: {{ allSubdivisions }}<br /><br />
                <!-- selectedSubdivisions: {{ selectedSubdivisions }}<br /> -->
                userResume.template.map_subdivisions: {{ userResume.template.map_subdivisions }}<br /><br />
                <!-- primaryColor: {{ userResume.colors.primaryColor }}<br /><br /> -->
                <!-- secondaryColor: {{ userResume.colors.secondaryColor }}<br /><br /> -->
				cssProps: {{ cssProps }}<br /><br />
            </v-flex>

            <v-flex xs6 style="border: 1px solid yellow;">
                <h2>List of states</h2><br />

                <draggable v-model="allSubdivisions" group="subdivisions" @start="drag=true" @end="drag=false" :sort="false">
                    <div v-for="subdivision in allSubdivisions" :key="subdivision.slug" style="padding: 10px; border: 1px dashed red;">{{ subdivision.name }}</div>
                </draggable>
            </v-flex>
            <v-flex xs6 style="border: 1px solid red;">
                <h2>Selected states</h2><br />
				<v-btn small color="error" @click.stop="setColors()">Set all red</v-btn>
                <draggable v-model="userResume.template.map_subdivisions" group="subdivisions" @start="drag=true" @end="drag=false">
                    <div v-for="(subdivision, index) in userResume.template.map_subdivisions" :key="subdivision.slug" style="padding: 10px; border: 1px dashed yellow;">
						<span>{{ subdivision.name }}-{{ index }}</span>
						<div :class="[`abc${[index]}`]" style="width: 40px; height: 40px;"></div>
						<vue-colorpicker v-model="userResume.template.map_subdivisions[index].color" class=""></vue-colorpicker>

						</div>
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
				this.userResume.template.map = map.geoJSON
				this.allSubdivisions = []
				if (map.subdivisions && this.allSubdivisions.length < 1) {
					map.subdivisions.forEach(subdivision => {
						console.log('subdivision: ', subdivision)
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
	.abc0 {
		background: var(--primary-color);
		/* background: var(--v-primary-lighten2); */
		filter: brightness(200%);
	}
	.abc1 {
		background: var(--primary-color);
		filter: brightness(180%);
	}
	.abc2 {
		background: var(--primary-color);
		filter: brightness(100%);
	}
	.abc3 {
		background: var(--primary-color);
		filter: brightness(60%);
	}
	.abc4 {
		background: var(--primary-color);
		filter: brightness(100%);
	}
	.abc5 {
		background: var(--primary-color);
		filter: brightness(110%);
	}
</style>