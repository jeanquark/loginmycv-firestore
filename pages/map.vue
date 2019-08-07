<template>
    <v-app>
        <h1>Leaflet map</h1>
		position: {{ position }}<br />
		zoom: {{ zoom }}<br />
		center: {{ center }}<br />
        <div id="map-wrap" style="height: 100vh">
            <no-ssr>
                <l-map :zoom.sync="zoom" :center.sync="center">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

                    <l-marker :lat-lng.sync="position" :draggable="true">
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
	let L = { icon(){} };
	if (process.browser) L = require('leaflet');
	export default {
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
				zoom: 3,
				center: [51.509865, -0.118092],
				position: [51.509865, -0.118092]
			}
		}
	}
</script>

<style>
	.custom-popup, .leaflet-popup-tip-container {
    width:3000px;
    height:15px;
    }
</style>