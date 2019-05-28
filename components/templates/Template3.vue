<template>
	<v-app v-cloak id="app">
		<v-content class="">
			<h1>Template 3</h1>
			<b>this.resume:</b> {{ this.resume }}<br /><br /><br />
		</v-content>
	</v-app>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['resume'],
	}
</script>

<style scoped>
	p, span, h1, h2, h3, h4, li {
		color: var(--text-color);
	}
	.text-big {
		font-size: 1.2em;
	}
	ul.list-horizontal {
		padding: 0px;
	}
	.list-horizontal li {
		display:inline-block;
		margin-right: 10px;
	}
	.list-horizontal li:before {
		content: "\2022";
  		color: var(--text-color);
  		font-weight: bold;
  		display: inline-block;
  		width: 1em;
	}
	.primary-color {
		color: var(--primary-color);
	}
	.secondary-color {
		color: var(--secondary-color);
	}
	.tertiary-color-background {
		background: var(--tertiary-color);
	}
	.background-color {
		background-color: var(--background-color);
	}
	.text-color {
		color: var(--text-color);
	}
	.secondary-color-text {
		color: var(--secondary-color);
	}
	.secondary-color-background {
		background-color: var(--secondary-color);
	}
	.margin-top {
		margin-top: 80px;
	}
	.margin-bottom {
		margin-bottom: 80px;
	}
	.social-link {
		background-color: var(--background-color);
		color: var(--primary-color);
	}
	.social-link:hover {
		background-color: var(--primary-color);
		color: var(--background-color);
	}
	>>>.v-chip__content {
		cursor: pointer !important;
	}
</style>