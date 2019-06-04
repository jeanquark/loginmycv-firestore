<template>
	<!-- <v-container grid-list-md text-xs-center> -->
	<div>
		<h1 class="text-xs-center primary-color my-4">The Founders</h1>
		<v-layout row wrap>
			<v-flex xs3 offset-xs3 class="pa-3">
				<v-card>
					<!-- <v-avatar
						:size="78"
						class="mb-2"
					>
						<img src="/images/ivan.jpg">
					</v-avatar> -->
					<v-img
          				src="/images/ivan.jpg"
						lazy-src="/images/ivan.jpg"
          				aspect-ratio="1.25"
        			></v-img>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">Ivan W</h3>
							<div>Economist, Data specialist</div>
						</div>
					</v-card-title>

					<v-card-actions>
						<!-- <v-btn flat color="orange">Share</v-btn> -->
						<!-- <v-btn flat color="orange">Explore</v-btn> -->
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs3 class="pa-3">
				<v-card>
					<!-- <v-avatar
						:size="78"
						class="mb-2"
					>
						<img src="/images/ivan.jpg">
					</v-avatar> -->
					<v-img
          				src="/images/jeanmarc.jpg"
						lazy-src="/images/jeanmarc.jpg"
          				aspect-ratio="1.25"
        			></v-img>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">Jean-Marc K</h3>
							<div>Web developer</div>
						</div>
					</v-card-title>

					<v-card-actions>
						<!-- <v-btn flat color="orange">Share</v-btn> -->
						<!-- <v-btn flat color="orange">Explore</v-btn> -->
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	<!-- </v-container> -->
	</div>
</template>

<script>
	export default {
		layout: 'layoutFront'
	}
</script>

<style scoped>
	.primary-color {
		color: var(--v-primary-base);
	}
</style>