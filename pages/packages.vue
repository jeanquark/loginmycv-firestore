<template>
	<v-layout
    	wrap
  	>
		<v-container>
			<!-- this.pack: {{ this.pack }}<br /> -->
			<!-- this.currency: {{ this.currency }}<br /> -->
			<!-- loadedUser: {{ this.loadedUser }}<br /> -->
			<!-- daysRemaining: {{ this.daysRemaining }}<br /> -->
			<!-- this.amount_in_cents: {{ this.amount_in_cents }}<br /> -->
			<v-layout row wrap justify-center>
				<v-flex xs12>
					<h1 class="text-xs-center secondary-color">Select your package</h1>
				</v-flex>

				<v-flex xs12 sm6 md4 class="pa-4" v-for="pack in loadedPackages" :key="pack.slug">
					<v-hover>
						<v-card slot-scope="{ hover }" :class="[loadedUser && loadedUser.private && loadedUser.private.package_slug === `${pack.slug}` ? `active-${pack.slug}` : '', `elevation-${hover ? 12 : 2}`]">
							<v-img
								src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
								aspect-ratio="2.75"
							></v-img>

							<v-card-title primary-title>
								<v-layout justify-center>
									<h3 class="headline mb-0 text-xs-center">{{ pack.name }} Pack</h3>
								</v-layout>
							</v-card-title>

							<v-card-text>
								<v-list>
									<template>
										<v-list-tile
											avatar
										>
											<v-list-tile-avatar>
												<img :src="`/images/packages/${pack.image_maximum_number_of_resumes}`">
											</v-list-tile-avatar>
											<v-list-tile-content>
												<v-list-tile-sub-title style="color: #000;">Number of resume(s)</v-list-tile-sub-title>
											</v-list-tile-content>
										</v-list-tile>
										<v-divider></v-divider>
									</template>
									<template>
										<v-list-tile
											avatar
										>
											<v-list-tile-avatar>
												<img :src="`/images/packages/${pack.image_total_space_in_bytes}`">
											</v-list-tile-avatar>
											<v-list-tile-content>
												<v-list-tile-sub-title style="color: #000;">Total space</v-list-tile-sub-title>
											</v-list-tile-content>
										</v-list-tile>
										<v-divider></v-divider>
									</template>
									<template>
										<v-list-tile
											avatar
										>
											<v-list-tile-avatar>
												<img :src="`/images/packages/${pack.image_available_templates}`">
											</v-list-tile-avatar>
											<v-list-tile-content>
												<v-list-tile-sub-title style="color: #000;">Available template(s)</v-list-tile-sub-title>
											</v-list-tile-content>
										</v-list-tile>
										<v-divider></v-divider>
									</template>
								</v-list>
								<v-layout justify-center class="mt-3">
									<v-chip :color="pack.color" text-color="#fff" class="headline pa-2">
										<span v-if="pack.price === 0">Free</span>
										<!-- <span v-else>€{{ (pack.price/100).toFixed(2) }} / year</span> -->
										<span v-else>€{{ displayCost(pack.price) }} / year</span>
									</v-chip>
									<!-- Pack: {{ pack }} -->
								</v-layout>
							</v-card-text>

							<!-- Actions -->
							<v-card-actions v-if="loadedUser && loadedUser.private">
								<v-layout justify-center v-if="pack.slug === 'basic'">
									<v-chip label outline color="primary" text-color="primary" v-if="loadedUser.private.package_slug === 'basic'">Current active package</v-chip>
								</v-layout>

								<v-layout justify-center v-if="pack.slug === 'classic'">
									<v-layout justify-center v-if="loadedUser.private.package_slug === 'basic'">
										<v-btn flat color="secondary" @click.stop="selectPackage(pack, daysRemaining)" disabled>Pick me!</v-btn>
									</v-layout>

									<v-layout justify-center v-if="loadedUser.private.package_slug === 'classic' && daysRemaining > 60">
										<v-chip label outline color="secondary" text-color="secondary">Current active package</v-chip>
									</v-layout>

									<v-layout justify-center row wrap v-if="loadedUser.private.package_slug === 'classic' && daysRemaining <= 60">
										<v-chip label outline color="secondary" text-color="secondary" class="mb-2 px-2 py-4">Current active package.<br />Only {{ daysRemaining }} day(s) remaining.</v-chip><br />
										<v-btn flat color="secondary" @click.stop="selectPackage(pack, daysRemaining)" disabled>Renew package!</v-btn>
									</v-layout>

									<v-layout justify-center v-if="loadedUser.private.package_slug === 'advanced' && daysRemaining <= 60">
										<v-btn flat color="secondary" @click.stop="selectPackage(pack, daysRemaining)" disabled>Downgrade to classic!</v-btn>
									</v-layout>
								</v-layout>

								<v-layout justify-center v-if="pack.slug === 'advanced'">
									<v-layout justify-center v-if="loadedUser.private.package_slug === 'basic'">
										<v-btn flat color="tertiary" @click.stop="selectPackage(pack, daysRemaining)" disabled>Pick me!</v-btn>
									</v-layout>

									<v-layout justify-center v-if="loadedUser.private.package_slug === 'advanced' && daysRemaining > 60">
										<v-chip label outline color="tertiary" text-color="tertiary">Current active package</v-chip>
									</v-layout>

									<v-layout row wrap justify-center v-if="loadedUser.private.package_slug === 'advanced' && daysRemaining <= 60">
										<v-chip label outline color="tertiary" text-color="tertiary" class="mb-2 px-2 py-4">Current active package.<br />Only {{ daysRemaining }} day(s) remaining.</v-chip><br />
										<v-btn flat color="tertiary" @click.stop="selectPackage(pack, daysRemaining)" disabled>Renew package!</v-btn>
									</v-layout>

									<v-layout justify-center v-if="loadedUser.private.package_slug === 'classic' && daysRemaining > 60">
										<v-btn flat color="tertiary" @click.stop="selectPackage(pack, daysRemaining, calculatedUpgradeCost(pack, daysRemaining))" disabled>Upgrade to advanced for €{{ calculatedUpgradeCost(pack, daysRemaining) }}!</v-btn>
									</v-layout>
									<v-layout row wrap justify-center v-if="loadedUser.private.package_slug === 'classic' && daysRemaining <= 60">
										<v-flex xs12 class="text-xs-center">
											<v-btn flat color="tertiary" @click.stop="selectPackage(pack, daysRemaining)" disabled>Upgrade to advanced!</v-btn>
										</v-flex>
										<v-flex xs12 class="text-xs-center">
											<small class="tertiary--text">And gain {{ daysRemaining }} day(s)!</small>
										</v-flex>
									</v-layout>
								</v-layout>
							</v-card-actions>
							
							<v-card-actions v-else>
								<v-layout justify-center>
									<v-btn flat :color="pack.color" @click.stop="selectPackage(pack, 0)">Pick me!</v-btn>
								</v-layout>
							</v-card-actions>
						</v-card>
					</v-hover>
				</v-flex>
			</v-layout>
		</v-container>

		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card v-if="!paymentCompleted">
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="closeDialog()">
						<v-icon>close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-title primary-title>
					<v-layout justify-center>
						<h3 class="headline mb-0">Process payment</h3>
					</v-layout>
				</v-card-title>

				<v-card-text>
					<v-layout justify-center align-center>
						<div>
						    <v-list>
						    	<template>
						    		<v-divider></v-divider>
						        	<v-list-tile avatar ripple>
						              	<v-list-tile-content>
						                	<v-list-tile-sub-title>Package</v-list-tile-sub-title>
						              	</v-list-tile-content>
						              	<v-list-tile-action>
							                <v-list-tile-action-text class="black--text subheading">{{ this.pack.name }}</v-list-tile-action-text>
						              	</v-list-tile-action>
						            </v-list-tile>
						            <v-divider ></v-divider>
						            <v-list-tile avatar ripple>
						              	<v-list-tile-content>
						                	<v-list-tile-sub-title>
												Valid until
											</v-list-tile-sub-title>
						              	</v-list-tile-content>
						              	<v-list-tile-action>
							                <v-list-tile-action-text class="text-xs-center black--text subheading" v-if="valid_until">
												{{ this.valid_until | moment('LL') }}<br /> 
												(in {{ validityDuration }} days)
											</v-list-tile-action-text>
						              	</v-list-tile-action>
						            </v-list-tile>
						            <v-divider ></v-divider>
						            <v-list-tile avatar ripple>
						              	<v-list-tile-content>
						                	<v-list-tile-sub-title>Total (in EUR)</v-list-tile-sub-title>
						              	</v-list-tile-content>
						              	<v-list-tile-action>
							                <v-list-tile-action-text class="black--text subheading">{{ (this.amount_in_cents / 100).toFixed(2) }}</v-list-tile-action-text>
						              	</v-list-tile-action>
						            </v-list-tile>
						        </template>
							</v-list>
							<br />

							<!-- Proceed to secured payment with Stripe<br /><br /> -->
							<div style="min-width: 300px;">
								<card class='stripe-card'
									:class='{ complete }'
									stripe='pk_test_mfRXE3nfVNydQzc5zhpTrdoU004DyRbBvo'
									:options="stripeOptions"
									@change='complete = $event.complete'
									v-if="loadedStripe"
								/><br />
							</div>
						</div>
					</v-layout>
				</v-card-text>

				<v-card-actions>
					<v-layout justify-center>
						<v-btn color='success' @click='pay' :disabled='!complete' :loading="loading">Pay €{{ (this.amount_in_cents/100).toFixed(2) }} with credit card</v-btn>
					</v-layout>
				</v-card-actions>
			</v-card>

			<v-card v-else>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="closeDialog()">
						<v-icon>close</v-icon>
					</v-btn>
				</v-toolbar>

				<v-card-title primary-title>
					<v-layout justify-center>
						<h3 class="headline success--text mb-0">Successfull payment</h3>
					</v-layout>
				</v-card-title>

				<v-card-text>
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  						<circle class="path circle" fill="none" stroke="var(--v-success-base)" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  						<polyline class="path check" fill="none" stroke="var(--v-success-base" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
					</svg>
					<br /><br />
					<v-layout justify-center>
						<h4 class="headline success--text">Thank you very much!</h4>
					</v-layout>
				</v-card-text>

				<v-card-actions>
					<v-layout justify-center>
						<v-btn color="primary" @click.stop="redirectToCandidatePage()">Start managing my resumes</v-btn>
					</v-layout>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- <v-snackbar
      		v-model="snackbar"
      		top
      		right
      		:timeout="5000"
    	>
      		<span class="subheading"><v-icon color="warning">warning</v-icon> You need to be authenticated to select a package.</span>
    	</v-snackbar> -->
  	</v-layout>
</template>

<script>
	import axios from 'axios'
	import Noty from 'noty'
	import moment from 'moment'
	import { Card, createToken } from 'vue-stripe-elements-plus'
	export default {
		components: { Card },
		layout: 'layoutFront',
		created () {
      		if (process.browser) {
        		let domElement = document.createElement('script')
        		domElement.setAttribute('src', 'https://js.stripe.com/v3/')
        		domElement.onload = () => {
          			this.loadedStripe = true
	        	}
        		document.body.appendChild(domElement)
      		}
			this.$store.dispatch('packages/fetchPackages')
      		this.$store.commit('clearError')
			this.$store.commit('closeLoginModal')
		},
		mounted () {
		},
		data () {
			return {
				drawer: null,
				maximum_number_of_resumes: null,
				total_space_in_bytes: null,
				available_templates: null,
				pack: '',
				valid_until: '',
				currency: 'EUR',
				amount_in_cents: 0,
				complete: false,
				stripeOptions: {
        			// see https://stripe.com/docs/stripe.js#element-options for details
				},
				loadedStripe:false,
				dialog: false,
				paymentCompleted: false,
				snackbar: false
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading']
			},
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			},
			loadedPackages () {
				return this.$store.getters['packages/loadedPackages']
			},
			daysRemaining () {
				if (this.loadedUser && this.loadedUser.private && this.loadedUser.private.package_valid_until) {
					return Math.floor((this.loadedUser.private.package_valid_until - moment().unix())/(60 * 60 * 24))
					// return Math.ceil((this.loadedUser.private.package_valid_until - moment().unix())/(60 * 60 * 24))
					// return ((this.loadedUser.private.package_valid_until - moment().unix())/(60 * 60))
					// return 10
				}
				return 0
			},
			validityDuration () {
				// return 10
				return Math.floor((this.valid_until - moment().unix()) / (60 * 60 * 24))
			},
			
		},
		methods: {
			closeDialog () {
				this.paymentCompleted = false
				this.dialog = false
			},
			redirectToCandidatePage () {
				this.paymentCompleted = false
				this.$router.push('candidate/resumes')
			},
			displayCost (price) {
				// console.log('price: ', price)
				return (price / 100 ).toFixed(2)
			},
			calculatedUpgradeCost (pack, daysRemaining) {
				// console.log('pack.price: ', pack.price)
				// console.log('daysRemaining: ', daysRemaining)
				// return (Math.round((pack.price * daysRemaining * 20) / (100 * 365)) / 20).toFixed(2)
				return (Math.min(pack.price / 100, Math.round((pack.price * daysRemaining * 20) / (100 * 365)) / 20).toFixed(2))
			},
			async selectPackage (pack, daysRemaining, cost = pack.price / 100) {
				// return this.$store.commit('openLoginModal')
				console.log('pack: ', pack)
				console.log('daysRemaining: ', daysRemaining)
				console.log('cost: ', cost)
				// return
				if (!this.loadedUser) {
					new Noty({
						type: 'info',
						text: 'You need to be authenticated to select a package.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					// this.snackbar = true
					this.$store.commit('setRedirect', '/packages')
					this.$store.commit('openLoginModal')
					return
				}
				this.dialog = true
				this.drawer = !this.drawer
				// this.amount_in_cents = (cost * 100).toFixed(2)
				this.amount_in_cents = cost * 100
				this.pack = pack
				// this.valid_until = moment().add(daysRemaining, 'days').add(1, 'years').unix()
				if (daysRemaining <= 60) {
					// this.valid_until = moment().add(1, 'years').format('LL')
					// this.valid_until = moment().add(daysRemaining, 'days').unix()
					this.valid_until = moment().add(daysRemaining, 'days').add(1, 'years').unix()
					// this.valid_until = moment().add(1, 'years').unix()
				} else {
					this.valid_until = moment().add(daysRemaining, 'days').unix()
					// this.valid_until = moment().add(parseInt(dayRemaining), 'days').unix()
					// this.valid_until = moment().add(daysRemaining, 'days').unix()
					// this.valid_until = moment().add(days)			
				}
			},
			async pay () {
				// createToken returns a Promise which resolves in a result object with
				// either a token or an error key.
				// See https://stripe.com/docs/api#tokens for the token object.
				// See https://stripe.com/docs/api#errors for the error object.
				// More general https://stripe.com/docs/stripe.js#stripe-create-token.
				try {
					this.$store.commit('setLoading', true, { root: true })
					const payment = await createToken()
					console.log('payment: ', payment)
					const process = await axios.post('/stripe-payments', { 
						token: payment.token.id,
						pack: this.pack,
						amount_in_cents: this.amount_in_cents,
						currency: this.currency,
						valid_until: this.valid_until,
						userId: this.loadedUser.id,
						email: this.loadedUser.email,
						name: `${this.loadedUser.firstname} ${this.loadedUser.lastname}`
					})
					console.log('process: ', process)
					this.paymentCompleted = true
					this.$store.commit('setLoading', false, { root: true })
				} catch (error) {
					console.log('error: ', error)
					this.$store.commit('setLoading', false, { root: true })
					new Noty({
						type: 'error',
						text: 'Sorry, an error occured and the payment process could not be fullfilled successfully. No charge incurred.',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				}
    		}
		}
	}
</script>

<style scoped>
	.stripe-card {
		border-bottom: 1px solid var(--v-secondary-base);
	}
	.stripe-card.complete {
		border-color: var(--v-success-base);
	}
	.sub-title {
		color: '#000';
	}
	.secondary-color {
		color: var(--v-secondary-base);
	}
	.active-basic {
		border: 5px solid var(--v-primary-base);
	}
	.active-classic {
		border: 5px solid var(--v-secondary-base);
	}
	.active-advanced {
		border: 5px solid var(--v-tertiary-base);
	}

	/* CSS green check */
	svg {
	  	width: 100px;
	  	display: block;
	  	margin: 40px auto 0;
	}
	.path {
	  	stroke-dasharray: 1000;
	  	stroke-dashoffset: 0;
	}
	.path.circle {
	  	-webkit-animation: dash 0.9s ease-in-out;
	  	animation: dash 0.9s ease-in-out;
	}
	.path.line {
	  	stroke-dashoffset: 1000;
	  	-webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
	  	animation: dash 0.9s 0.35s ease-in-out forwards;
	}
	.path.check {
	  	stroke-dashoffset: -100;
	  	-webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
	  	animation: dash-check 0.9s 0.35s ease-in-out forwards;
	}
	@-webkit-keyframes dash {
	  	0% {
		    stroke-dashoffset: 1000;
	  	}
	  	100% {
		    stroke-dashoffset: 0;
	  	}
	}
	@keyframes dash {
	  	0% {
		    stroke-dashoffset: 1000;
	  	}
	  	100% {
		    stroke-dashoffset: 0;
	  	}
	}
	@-webkit-keyframes dash-check {
	  	0% {
		    stroke-dashoffset: -100;
	  	}
	  	100% {
		    stroke-dashoffset: 900;
	  	}
	}
	@keyframes dash-check {
	  	0% {
		    stroke-dashoffset: -100;
	  	}
	  	100% {
		    stroke-dashoffset: 900;
	  	}
	}
	.abc {
		background: yellow;
	}
</style>