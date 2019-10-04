<template>
    <v-app v-cloak>
        markers: {{ markers }}<br /><br />
		<!-- resume: {{ resume }}<br /><br /> -->
        <!-- resume.education: {{ resume.education }}<br /><br /> -->
		<!-- resume.colors: {{ resume.colors }}<br /><br /> -->
		<!-- primaryColor: {{ primaryColor }}<br /><br /> -->
		<!-- secondaryColor: {{ secondaryColor }}<br /><br /> -->
        <v-btn color="secondary">OK</v-btn>
		<h1 class="text-xs-center" v-if="loading">Loading map...</h1>
        <div style="height: 100vh" v-if="!loading">
            <no-ssr>
                <l-map :zoom="3" :center="resume.template.map.center" style="background: #AADAFF">
                    <l-geo-json :geojson="geojson" :optionsStyle="styleFunction"></l-geo-json>
					<l-marker v-for="item in markers" :key="item.key" :lat-lng="[item.position.lat, item.position.lng]" :visible="true">
						<l-icon :iconSize="[0, 0]" :iconAnchor="[18, 34]" :tooltipAnchor="[10, -20]">
                            <v-icon large :color="item.color">location_on</v-icon>
                        </l-icon>
						<l-tooltip>
							<div>
								<h3>{{ item.title }}</h3>
								<p>{{ item.city }}, {{ item.country }}</p>
								<p>{{ item.start_date }} - {{ item.end_date }}</p>
								<v-img src="/images/unibe.jpg" max-width="200"></v-img>
							</div>

						</l-tooltip>
					</l-marker>

                    <!-- <l-marker v-for="item in markers" :key="item.key" :lat-lng="[item.position.lat, item.position.lng]" :icon="defaultIcon2" :visible="true">
						<l-tooltip>
							<div>
								<h3>{{ item.title }}</h3>
								<p>{{ item.city }}, {{ item.country }}</p>
								<p>{{ item.start_date }} {{ item.end_date }}</p>
							</div>

						</l-tooltip>
					</l-marker> -->

                    <!-- <l-marker :lat-lng="[marker.position.lat, marker.position.lng]" :draggable="false" v-for="(marker, index) in markers" :key="index" >
						<l-tooltip>
							<div>
								<h3>{{ marker.title }}</h3>
								<p>{{ marker.city }}, {{ marker.country }}</p>
								<p>{{ marker.start_date }} {{ marker.end_date }}</p>
							</div>

						</l-tooltip> -->
                    <!-- <l-popup>
							<b>{{ abc.title }}</b> {{ abc.school }}<br />
							{{ abc.city }}, {{ abc.country }}<br />
							{{ abc.start_date }} - {{ abc.end_date }}
						</l-popup>-->
                    <!-- <l-icon :popupAnchor="[35, 30]"> -->
                    <!-- <l-icon>
                            <v-icon large color="green">location_on</v-icon>
                        </l-icon>
                    </l-marker> -->
                </l-map>
            </no-ssr>
        </div>
    </v-app>
</template>

<script>
	let L = { icon() {} }
	if (process.browser) {
		L = require('leaflet')
	}
	import axios from 'axios'
	export default {
		props: ['resume'],
		async created() {
			const { data } = await axios.get(`/geoJSON/${this.resume.template.map.geoJSON}`)
			this.geojson = data
			setTimeout(() => {
				this.loading = false
			}, 2000)
			// this.loading = false
		},
		mounted () {
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
		},
		data() {
			return {
				// customIcon: this.defaultIcon
				// primaryColor: '#7A528F',
				// primaryColor: this.$vuetify.theme.primary,
				loading: true,
				primaryColor: '',
				secondaryColor: '',
				defaultIcon: L.icon({
					iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
					shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
					iconSize: [38, 95],
					shadowSize: [50, 64],
					iconAnchor: [22, 94],
					shadowAnchor: [4, 62],
					popupAnchor: [-3, -76]
				}),
				defaultIcon2: L.icon({
					iconUrl: '/images/leaflet_markers/essai2.png',
					iconSize: [32, 50],
					iconAnchor: [16, 50],
					popupAnchor: [-3, -76]
				}),
				customIcon: L.icon({
					// iconUrl: '/images/leaflet_markers/leaf-green.png',
					iconUrl: '/images/leaflet_markers/red-marker.png',
					// iconUrl: '/images/leaflet_markers/home.png',
					// shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
					iconSize: [32, 32],
					// shadowSize: [50, 64],
					// iconAnchor: [25, 25],
					iconAnchor: [12, 32]
					// shadowAnchor: [4, 62],
					// popupAnchor: [-8, -30]
				}),
				geojson: null,
				position: [40.0, -70.0]
			}
		},
		computed: {
			cssProps() {
				return {
					'--primary-color': this.primaryColor,
					'--secondary-color': this.secondaryColor
				}
			},
			markers() {
				const markersArray = []
				markersArray.push({ personal_data: this.resume.personal_data, skills: this.resume.skills, social_networks: this.resume.social_networks, uploads: this.resume.uploads, position: this.resume.personal_data.position })
				this.resume.education.forEach(education => {
					if (education.position) {
						markersArray.push({ ...education, color: this.resume.colors2 ? this.resume.colors.primaryColor : this.primaryColor })
					}
				})
				this.resume.work_experience.forEach(work_experience => {
					if (work_experience.position) {
						markersArray.push({ ...work_experience, color: this.resume.colors ? this.resume.colors.secondaryColor : this.secondaryColor })
					}
				})
				console.log('markersArray.filter: ', markersArray.filter(item => item.position))
				return markersArray.filter(item => item.position)
			}
		},
		methods: {
			styleFunction(feature) {
				// console.log('feature: ', feature)
				// console.log('this.countriesVisited: ', this.visitedCountries)
				// const array = ['CHE', 'SWE', 'FRA']
				// if (array.includes(feature.properties.brk_a3)) {
				// const country = this.visitedCountries.find(
				const country = this.resume.template.map_subdivisions.find(
					// country => country.name === feature.properties.name
					country => country.slug === feature.properties.slug
				)
				if (country) {
					// console.log('abc')
					// const country = this.visitedCountries.find(country => country.brk_a3 === feature.properties.brk_a3)
					console.log('country: ', country)
					return {
						weight: 0,
						color: 'yellow',
						fill: true,
						fillColor: country.color,
						fillOpacity: 1
					}
				} else {
					return {
						weight: 1,
						color: '#ccc',
						fill: true,
						fillColor: '#efeeec',
						// fillColor: this.colors.backgroundColor,
						fillOpacity: 1
					}
				}
			},
			updateMarkerPosition() {
				console.log('updateMarkerPosition')
			}
		}
	}
</script>

<style scoped>
	.primary-color {
		color: var(--v-primary-lighten5);
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