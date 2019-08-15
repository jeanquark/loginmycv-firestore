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
        <div :class="primaryColor">
            <h2>ABC</h2>
        </div>
		<div class="red lighten-1">
			<h2>DEF</h2>
		</div>
        <v-layout row wrap>
            <v-flex xs12>
                allSubdivisions: {{ allSubdivisions }}<br /><br />
                <!-- selectedSubdivisions: {{ selectedSubdivisions }}<br /> -->
                userResume.template.map_subdivisions: {{ userResume.template.map_subdivisions }}<br /><br />
                primaryColor: {{ userResume.colors.primaryColor }}<br /><br />
                secondaryColor: {{ userResume.colors.secondaryColor }}<br /><br />
            </v-flex>

            <v-flex xs6 style="border: 1px solid yellow;">
                <h2>List of states</h2><br />

                <draggable v-model="allSubdivisions" group="subdivisions" @start="drag=true" @end="drag=false" :sort="false">
                    <div v-for="subdivision in allSubdivisions" :key="subdivision.slug" style="padding: 10px; border: 1px dashed red;">{{ subdivision.name }}</div>
                </draggable>
            </v-flex>
            <v-flex xs6 style="border: 1px solid red;">
                <h2>Selected states</h2><br />
                <draggable v-model="userResume.template.map_subdivisions" group="subdivisions" @start="drag=true" @end="drag=false">
                    <div v-for="(subdivision, index) in userResume.template.map_subdivisions" :key="subdivision.slug" :class="[`abc${[index]}`]" style="padding: 10px; border: 1px dashed yellow;">{{ subdivision.name }}-{{ index }}</div>
                </draggable>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
	import Draggable from 'vuedraggable'
	export default {
		inject: ['$validator'], // Inject parent validator
		props: ['resumeSlug', 'loadedTemplate'],
		components: { Draggable },
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
					'--secondary-color': this.userResume.colors.secondaryColor + ' lighten-1'
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.abc0 {
		/* background: yellow; */
		background: var(--primary-color);
	}
	.abc1 {
		/* background: red; */
		background: var(--secondary-color);
	}
</style>