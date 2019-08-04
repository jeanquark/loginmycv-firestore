<template>
    <v-app>
        <h1>Leaflet map</h1>
        <div id="map-wrap" style="height: 100vh">
            <no-ssr>
                <l-map :zoom=6 :center="[51.509865, -0.118092]" style="background: #AADAFF">
                    <!-- <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer> -->
                    <!-- <l-geo-json :geojson="geojson" :optionsStyle="polystyle()"></l-geo-json> -->
                    <!-- <l-geo-json :geojson="geojson" :options="options"></l-geo-json> -->
                    <l-geo-json :geojson="geojson" :optionsStyle="styleFunction"></l-geo-json>
                    <l-marker :lat-lng="[51.509865, -0.118092]" :draggable="true" :icon="customIcon">
                        <l-popup>Hello <b>Jean-Marc</b>! Lorsdfjsdfhj dfhsjkdfhdsj djfkjs<v-btn small color="success">Click me</v-btn>
                        </l-popup>
                    </l-marker>
                    <!-- <l-circle-marker :lat-lng="[51.509865, -0.118092]" :radius="10" :color="'red'"></l-circle-marker> -->
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
	import GeoJSON from '~/static/geoJSON/world.json'
	export default {
		async created() {
			// await axios.get("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
			// .then(response => {
			// 	console.log('response.data: ', response.data)
			// 	this.geojson = response.data;
			// 	this.loading = false;
			// })
			// fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json').then(function(response) {
			// 	//   this.geojson = response.json()
			// 	  this.geojson = response.data
			// })
		},
		data() {
			return {
				// customIcon: this.defaultIcon
				customIcon: L.icon({
					iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
					shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
					iconSize: [38, 95],
					shadowSize: [50, 64],
					iconAnchor: [22, 94],
					shadowAnchor: [4, 62],
					popupAnchor: [-3, -76]
				}),
				geojson: GeoJSON,
				visitedCountries: [
					{
						name: 'Switzerland',
						brk_a3: 'CHE',
						value: 10,
						color: 'orange'
					},
					{
						name: 'Sweden',
						brk_a3: 'SWE',
						value: 4,
						color: 'yellow'
					},
					{
						name: 'France',
						brk_a3: 'FRA',
						value: 3,
						color: 'green'
					}
				],
				// options: {
				// 	style: function(feature) {
				// 		console.log('feature: ', feature)
				// 		if (feature.properties.su_a3 === 'ALB') {
				// 			return {
				// 				weight: 2,
				// 				color: 'yellow',
				// 				fill: true,
				// 				fillColor: 'red',
				// 				fillOpacity: 1
				// 			}
				// 		} else {
				// 			return {
				// 				weight: 1,
				// 				color: 'yellow',
				// 				fill: true,
				// 				fillColor: 'green',
				// 				fillOpacity: 1
				// 			}
				// 		}
				// 	}
				// }
					
			}
		},
		computed: {
			
		},
		methods: {
			styleFunction(feature) {
				// console.log('feature: ', feature)
				// console.log('this.countriesVisited: ', this.visitedCountries)
				const array = ['CHE', 'SWE', 'FRA']
				// if (array.includes(feature.properties.brk_a3)) {
				const country = this.visitedCountries.find(country => country.name === feature.properties.name)
				if (country) {
					// console.log('abc')
					// const country = this.visitedCountries.find(country => country.brk_a3 === feature.properties.brk_a3)
					console.log('country: ', country)
					return {
						weight: 2,
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
						fillOpacity: 1
					}
				}


				// if (feature.properties.brk_a3 === 'CHE') {
				// 	return {
				// 		weight: 2,
				// 		color: 'yellow',
				// 		fill: true,
				// 		fillColor: 'orange',
				// 		fillOpacity: 1
				// 	}
				// } else {
				// 	return {
				// 		weight: 1,
				// 		color: 'yellow',
				// 		fill: true,
				// 		fillColor: 'blue',
				// 		fillOpacity: 1
				// 	}
				// }
			},
			polystyle() {
				return {
					fillColor: 'yellow',
					weight: 1,
					opacity: .6,
					color: 'white', //Outline color
					fillOpacity: 0.7
				}
			}
		}
	}
</script>

<style scoped>
	>>> .leaflet-popup-content-wrapper {
		background: yellow;
	}
	>>> .leaflet-container a.leaflet-popup-close-button {
		color: red;
	}
</style>