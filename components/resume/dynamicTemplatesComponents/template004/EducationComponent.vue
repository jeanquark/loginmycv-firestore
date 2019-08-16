<template>
    <div style="width: 100%; height: 400px;">
        <!-- <div id="map-wrap" style=""> -->
        userResume.education[index]: {{ userResume.education[index] }}<br /><br />
        <!-- position: {{ position }}<br /><br /> -->
        <!-- candidateEducation: {{ candidateEducation }}<br /><br /> -->
        <no-ssr>
            <!-- <div style="width: 100%; height: 300px;"> -->
            <!-- <l-map :zoom=6 :center="[51.509865, -0.118092]" style="background: #AADAFF"> -->
            <l-map :zoom="3" :center="[51.47888889, 0]" style="background: rgb(171, 210, 225); z-index: 0; height: 300px; width: 100%; margin: 0px; padding: 0px; position: relative;">
                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                <!-- <l-geo-json :geojson="geojson" :optionsStyle="styleFunction"></l-geo-json> -->
                <!-- <l-marker :lat-lng="[51.509865, -0.118092]" :draggable="true" :icon="customIcon"></l-marker> -->
                <!-- <l-marker :lat-lng="[45.508889, -73.561667]" :draggable="false" :icon="customIcon">
                        <l-popup style="font-size: 1.2rem;">Hello <b>Jean-Marc</b>! Lorsdfjsdfhj dfhsjkdfhdsj djfkjs<v-btn small color="success">Click me</v-btn>
                            <v-img src="/images/unibe.jpg" width="100"></v-img>
                        </l-popup>
                    </l-marker> -->
                <!-- <l-marker :lat-lng="[marker.position._lat, marker.position._long]" :draggable="true" @click="alert(marker)" v-for="(marker, index) in userResume.template.map_markers" :key="index"></l-marker> -->
                <!-- <l-circle-marker :lat-lng="[51.509865, -0.118092]" :radius="10" :color="'red'"></l-circle-marker> -->

                <l-marker :lat-lng.sync="userResume.education[index].position" :draggable="true" class="abc">
                    <l-popup><b>{{ userResume.education[index].title }}</b> {{ userResume.education[index].school }}<br />
						{{ userResume.education[index].city }}, {{ userResume.education[index].country }}<br />
						{{ userResume.education[index].start_date }} - {{ userResume.education[index].end_date }}</l-popup>
                    <l-icon :popupAnchor="[12, -10]">
                        <!-- <img src="/images/icons/SVG/map-marker.svg"> -->
						<v-icon large :color="userResume.colors.primaryColor">location_on</v-icon>
                    </l-icon>
                </l-marker>
            </l-map>
            <!-- </div> -->
        </no-ssr>
        <!-- </div> -->
    </div>
</template>

<script>
	let L = { icon() {} }
	if (process.browser) {
		L = require('leaflet')
	}
	// import axios from 'axios'
	export default {
		props: ['resumeSlug', 'index'],
		async created() {
			this.primaryColor = '#7A528F'
		},
		mounted() {
			// this.userResume.education.forEach(education => {
			// })
			if (!this.userResume.education[this.index].position) {
				this.userResume.education[this.index].position = {
					lat: 51.47888889,
					lng: 0
				}
			}
			// this.userResume.education.forEach(education => {
			// 	if (!education.position) {
			// 		education.position = {
			// 			lat: 51.47888889,
			// 			lng: 0
			// 		}
			// 	}
			// })
		},
		data() {
			return {
				// customIcon: this.defaultIcon
				customIcon: L.icon({
					// iconUrl: '/images/leaflet_markers/leaf-green.png',
					iconUrl: '/images/icons/SVG/method-draw-image.svg',
					// shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
					iconSize: [35, 30],
					// shadowSize: [50, 64],
					iconAnchor: [25, 25],
					// shadowAnchor: [4, 62],
					popupAnchor: [-8, -30]
				}),
				primaryColor: '',
				secondaryColor: '#FFC107',
				markers: [
					{
						position: [50.0, -85.0]
					},
					{
						position: [45.0, -80.0]
					}
				],
				color2: {
					hex: '#FFFF00',
					source: 'hex'
				}
				// position: [51.509865, -0.118092],
				// position: this.candidateEducation && this.candidateEducation.position ? [this.candidateEducation.position._lat, this.candidateEducation.position._long] : [51.47888889, 0]
			}
		},
		computed: {
			userResume() {
				return this.$store.getters['resumes/loadedUserResumes'].find(
					resume => resume.slug === this.resumeSlug
				)
			},
			candidateEducation: {
				get() {
					return this.userResume.education
				},
				set(value) {
					this.userResume.education = value
				}
			}
			// position () {
			// 	this.userResume && this.userResume.education[0] ? this.userResume.education[0].position :
			// 	[51.47888889, 0]
			// }
		},
		methods: {
			updateMarkerPosition() {
				console.log('updateMarkerPosition')
			},
			getMarkersPosition() {},
			lmapIsReady() {
				console.log('lmapIsReady')
				this.lmapReady = true
			}
		}
	}
</script>

<style scoped>
	.primary-color {
		color: var(--v-primary-lighten5);
	}
	.abc {
		color: yellow;
	}
	>>> .leaflet-popup-content-wrapper {
		background: yellow;
	}
	>>> .leaflet-popup-tip {
		background: yellow;
	}
	>>> .leaflet-container a.leaflet-popup-close-button {
		color: red;
	}
</style>