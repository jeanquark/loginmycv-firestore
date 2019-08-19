<template>
    <v-app v-cloak>
        colors: {{ colors }}<br /><br />
        markers: {{ markers }}<br /><br />
        <div style="height: 100vh">
            <no-ssr>
                <l-map :zoom="3" :center="resume.template.map.center" style="background: #AADAFF">
                    <l-geo-json :geojson="geojson" :optionsStyle="styleFunction"></l-geo-json>
                    <!-- <l-marker :lat-lng="[45.508889, -73.561667]" :draggable="false" :icon="customIcon">
                        <l-popup style="font-size: 1.2rem;">Hello <b>Jean-Marc</b>! Lorsdfjsdfhj dfhsjkdfhdsj djfkjs<v-btn small color="success">Click me</v-btn>
                            <v-img src="/images/unibe.jpg" width="100"></v-img>
                        </l-popup>
                    </l-marker> -->
                    <l-marker :lat-lng="[abc.map_marker.lat, abc.map_marker.long]" :draggable="false" v-for="(abc, index) in markers" :key="index">
						<l-tooltip>Hello!</l-tooltip>
						<!-- <l-popup>
							<b>{{ abc.title }}</b> {{ abc.school }}<br />
							{{ abc.city }}, {{ abc.country }}<br />
							{{ abc.start_date }} - {{ abc.end_date }}
						</l-popup>
                        <l-icon :popupAnchor="[12, -10]">
                            <v-icon large :color="abc.map_marker.type === 'education' ? colors.primaryColor : colors.secondaryColor">location_on</v-icon>
                        </l-icon> -->
                    </l-marker>
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
	// import GeoJSON from '~/static/geoJSON/usa_canada_with_states.json'
	// import GeoJSON from `~/static/geoJSON/${resume.template.map.geoJSON}`
	export default {
		// layout: 'layoutBack',
		props: ['colors'],
		async created() {
			const { data } = await axios.get(`/geoJSON/${this.resume.template.map.geoJSON}`)
			this.geojson = data
		},
		data() {
			return {
				// customIcon: this.defaultIcon
				customIcon: L.icon({
					// iconUrl: '/images/leaflet_markers/leaf-green.png',
					iconUrl: '/images/leaflet_markers/home.png',
					// shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
					iconSize: [35, 30],
					// shadowSize: [50, 64],
					iconAnchor: [25, 25],
					// shadowAnchor: [4, 62],
					popupAnchor: [-8, -30]
				}),
				// primaryColor: '',
				// secondaryColor: '#FFC107',
				// geojson: GeoJSON,
				geojson: null,
				// visitedCountries: [
				// 	{
				// 		name: 'Alberta',
				// 		brk_a3: 'CHE',
				// 		value: 10,
				// 		color: '#FFC107'
				// 	},
				// 	{
				// 		name: 'Sweden',
				// 		brk_a3: 'SWE',
				// 		value: 4,
				// 		color: 'yellow'
				// 	},
				// 	{
				// 		name: 'France',
				// 		brk_a3: 'FRA',
				// 		value: 3,
				// 		color: 'green'
				// 	}
				// ],
				position: [40.0, -70.0],
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
				resume: {
					job_title: 'Product Designer',
					job_description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
					personal_data: {
						firstname: 'Alex',
						middlename: '',
						lastname: 'Johnson',
						email: 'alex.johnson@example.com',
						phone: '+12 987 654 32 10',
						country: {
							name: 'United Kingdom',
							slug: 'united_kingdom',
							flag: 'united_kindom.png'
						},
						city: 'London',
						birthday: '1984-02-28'
					},
					picture: '/images/hero.png',
					languages: [
						{
							name: 'English',
							slug: 'english',
							flag: 'english.png',
							level: 100
						},
						{
							name: 'Spanish',
							slug: 'spanish',
							flag: 'spanish.png',
							level: 60
						}
					],
					social_network: [
						{
							name: 'Github',
							slug: 'github',
							fontawesome: 'github',
							link: 'http://www.github.com',
							color: '#323131'
						},
						{
							name: 'Twitter',
							slug: 'twitter',
							fontawesome: 'twitter',
							link: 'http://www.twitter.com',
							color: '#1da1f3'
						},
						{
							name: 'LinkedIn',
							slug: 'linkedin',
							fontawesome: 'linkedin-in',
							link: 'http://www.linkedin.com',
							color: '#0274b3'
						}
					],
					education: [
						{
							title: 'Art & Multimedia',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
							school: 'Oxford University',
							start_date: '2005',
							end_date: '2008',
							country: 'United Kingdom',
							city: 'Oxford',
							map_marker: {
								lat: 35,
								long: -110,
								type: 'education'
							}
						},
						{
							title: 'Dramatic Arts',
							description:
								'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
							school: 'Cambridge University',
							start_date: '2002',
							end_date: '2005',
							country: 'United Kingdom',
							city: 'Cambridge',
							map_marker: {
								lat: 40,
								long: -90,
								type: 'education'
							}
						}
					],
					work_experience: [
						{
							job_title: 'UI/UX Designer',
							job_description:
								'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
							start_date: '2008',
							end_date: '2012',
							company: 'Answer Softwares Ltd',
							country: 'United Kingdom',
							city: 'London',
							map_marker: {
								lat: 45,
								long: -120,
								type: 'work_experience'
							}
						},
						{
							job_title: 'Product Designer',
							job_description:
								'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
							start_date: '2012',
							end_date: '',
							company: 'Asco Int.',
							country: 'United Kingdom',
							city: 'London',
							// map_marker: {
							// 	type: 'work_experience'
							// }
						}
					],
					skills: [
						{
							name: 'CSS',
							category: 'Technical skill',
							type: 'pie',
							value: 75
						},
						{
							name: 'Photoshop',
							category: 'Technical skill',
							type: 'pie',
							value: 80
						},
						{
							name: 'Communication',
							category: 'Soft skill',
							type: 'bar',
							value: 80
						},
						{
							name: 'Writing',
							category: 'Soft skill',
							type: 'bar',
							value: 60
						}
					],
					uploads: [
						{
							name: 'cv.pdf',
							title: 'My CV in pdf',
							type: 'downloadable_file'
						},
						{
							name: 'work_sample.pdf',
							title: 'Work Samples',
							type: 'downloadable_file'
						},
						{
							name: 'hero.png',
							title: 'Profile picture',
							type: 'profile_picture',
							downloadUrl: '/images/hero.png'
						}
					],
					menus: {
						presentation: 'Presentation',
						education: 'Education',
						skills: 'Skills',
						files: 'Files',
						contact: 'Contact'
					},
					fields: {},
					contact_form_validation: {},
					parameters: {
						show_contact_form: true,
						show_language_level: true
					},
					template: {
						id: 'template004',
						map: {
							name: 'Switzerland',
							slug: 'switzerland',
							// geoJSON: 'switzerland_with_cantons.json'
							geoJSON: 'usa_with_states_20m.json',
							center: [35.0, -115.0]
						},
						// map_markers: [
						// 	{
						// 		name: 'Bachelor in Geography',
						// 		slug: 'bachelor_in_geography',
						// 		lat: 25,
						// 		long: -110
						// 	},
						// 	{
						// 		name: 'Certificate of Webmaster',
						// 		slug: 'certificate_of_webmaster',
						// 		lat: 40,
						// 		long: -90
						// 	}
						// ],
						map_subdivisions: [
							{
								name: 'Arizona',
								slug: 'arizona',
								color: 'rgb(234, 28, 28)'
							},
							{
								name: 'California',
								slug: 'california',
								color: 'rgb(14, 247, 47)'
							}
						]
					}
				}
			}
		},
		computed: {
			// cssProps() {
			// 	return {
			// 		'--primary-color': this.primaryColor,
			// 		'--secondary-color': this.secondaryColor,
			// 		'--tertiary-color': this.tertiaryColor,
			// 		'--background-color': this.backgroundColor,
			// 		'--text-color': this.textColor
			// 	}
			// }
			markers() {
				const array = []
				this.resume.education.forEach(education => {
					if (education.map_marker) {
						array.push(education)
					}
				})
				this.resume.work_experience.forEach(work_experience => {
					if (work_experience.map_marker) {
						array.push(work_experience)
					}
				})
				// resume.education.map(education => {
				// 	return education.map_marker
				// })
				return array
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
			// polystyle() {
			// 	return {
			// 		fillColor: 'yellow',
			// 		weight: 1,
			// 		opacity: 0.6,
			// 		color: 'white', //Outline color
			// 		fillOpacity: 0.7
			// 	}
			// }
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