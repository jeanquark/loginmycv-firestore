<template>
    <v-app v-cloak v-if="this.resume">
        <v-content class="background-color">
            <b>this.resume:</b> {{ this.resume }}<br /><br /><br />
        </v-content>
    </v-app>
</template>

<script>
	import moment from 'moment'
	import Noty from 'noty'
	export default {
		inject: ['$validator'], // Inject vee-validate validator
		props: ['resume']
	}
</script>

<style scoped>

</style>