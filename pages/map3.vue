<template>
    <v-app>

        <div style="height: 100%; width: 100%">
            <div class="info" style="height: 15%">
                <span>Center: {{ center }}</span>
                <span>Zoom: {{ zoom }}</span>
                <span>Bounds: {{ bounds }}</span>
            </div>
            <no-ssr>
                <l-map :zoom="zoom" :center="center" @update:zoom="zoomUpdated" @update:center="centerUpdated">
                    <l-tilelayer :url="url"></l-tilelayer>
                </l-map>
            </no-ssr>
        </div>
    </v-app>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				zoom: 13,
				center: [51.509865, -0.118092],
				bounds: null
			}
		},
		methods: {
			zoomUpdated(zoom) {
				this.zoom = zoom
			},
			centerUpdated(center) {
				this.center = center
			},
			boundsUpdated(bounds) {
				this.bounds = bounds
			}
		}
	}
</script>

<style>
	.custom-popup,
	.leaflet-popup-tip-container {
		width: 3000px;
		height: 15px;
	}
</style>