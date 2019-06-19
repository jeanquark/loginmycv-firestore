<template>
	<v-layout
    	wrap
  	>
		<v-container>
			this.pack: {{ this.pack }}<br />
			this.amount_in_cents: {{ this.amount_in_cents }}<br />
			this.currency: {{ this.currency }}<br />
			loadedUser: {{ this.loadedUser }}<br />
			<v-layout row wrap justify-center>
				<v-flex xs12>
					<h1 class="text-xs-center secondary-color">Choose your package</h1>
				</v-flex>

				<!-- Basic package -->
				<v-flex xs12 sm6 md4 class="pa-4">
					<v-card hover :class="{'active-basic': this.loadedUser && this.loadedUser.package && this.loadedUser.package.slug === 'basic'}">
						<v-img
							src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
							aspect-ratio="2.75"
						></v-img>

						<v-card-title primary-title>
							<v-layout justify-center>
								<h3 class="headline mb-0 text-xs-center">Basic Pack</h3>
							</v-layout>
						</v-card-title>

						<v-card-text>
							<v-list>
								<template v-for="(item, index) in packageBasicDetails">
									<v-subheader
										v-if="item.header"
										:key="item.header"
									>
										{{ item.header }}
									</v-subheader>

									<v-divider
										v-else-if="item.divider"
										:key="index"
										:inset="item.inset"
									></v-divider>

									<v-list-tile
										v-else
										:key="item.title"
										avatar
									>
									<v-list-tile-avatar>
										<img :src="item.image">
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-sub-title v-html="item.title" style="color: #000;"></v-list-tile-sub-title>
									</v-list-tile-content>
									</v-list-tile>
								</template>
							</v-list>
							<v-layout justify-center>
								<v-chip color="primary" text-color="#fff" class="headline pa-2">
									Free
								</v-chip>
							</v-layout>
						</v-card-text>

						<v-card-actions>
							<v-layout justify-center v-if="loadedUser && loadedUser.package && loadedUser.package.slug === 'basic'">
								<v-chip label outline color="primary" text-color="primary">Current active package</v-chip>
							</v-layout>
							<v-layout justify-center v-if="!loadedUser">
								<v-btn flat color="primary" @click.stop="selectPackage(packageBasic)">Pick me!</v-btn>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-flex>

				<!-- Classic package -->
				<v-flex xs12 sm6 md4 class="pa-4">
					<v-card hover :class="{'active-classic': this.loadedUser && this.loadedUser.package && this.loadedUser.package.slug === 'classic'}">
						<v-img
							src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
							aspect-ratio="2.75"
						></v-img>

						<v-card-title primary-title>
							<v-layout justify-center>
								<h3 class="headline mb-0">Classic Pack</h3>
							</v-layout>
						</v-card-title>

						<v-card-text>
							<v-list>
								<template v-for="(item, index) in packageClassicDetails">
									<v-subheader
										v-if="item.header"
										:key="item.header"
									>
										{{ item.header }}
									</v-subheader>

									<v-divider
										v-else-if="item.divider"
										:key="index"
										:inset="item.inset"
									></v-divider>

									<v-list-tile
										v-else
										:key="item.title"
										avatar
									>
									<v-list-tile-avatar>
										<img :src="item.image">
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-sub-title v-html="item.title" style="color: #000;"></v-list-tile-sub-title>
									</v-list-tile-content>
									</v-list-tile>
								</template>
							</v-list>

							<v-layout justify-center>
								<v-chip color="secondary" text-color="#fff" class="headline pa-2">
									€14.90 / year
								</v-chip>
							</v-layout>
						</v-card-text>

						<v-card-actions v-if="loadedUser && loadedUser.package && loadedUser.package.slug !== 'basic'">
							<v-layout justify-center v-if="loadedUser.package.slug === 'classic' && daysRemaining > 60">
								<v-chip label outline color="secondary" text-color="secondary" class="px-2 py-4">Current active package.<br />{{ daysRemaining }} days remaining.</v-chip>
							</v-layout>
							<v-layout row wrap justify-center v-if="loadedUser.package.slug === 'classic' && daysRemaining <= 60">
								<v-chip label outline color="secondary" text-color="secondary" class="mb-2 px-2 py-4">Current active package.<br />Only {{ daysRemaining }} days remaining.</v-chip>
								<v-flex xs12 class="text-xs-center">
									<v-btn flat color="secondary" @click.stop="selectPackage(packageClassic)">Renew package!</v-btn>
								</v-flex>
							</v-layout>
							<v-layout justify-center v-if="loadedUser.package.slug === 'advanced' && daysRemaining <= 60">
								<v-btn flat color="secondary" @click.stop="selectPackage(packageClassic)">Downgrade to classic!</v-btn>
							</v-layout>
						</v-card-actions>
						<v-card-actions v-else>
							<v-layout justify-center>
								<v-btn flat color="secondary" @click.stop="selectPackage(packageClassic)">Pick me!</v-btn>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-flex>

				<!-- Advanced package -->
				<v-flex xs12 sm6 md4 class="pa-4">
					<v-card hover :class="{'active-advanced': this.loadedUser && this.loadedUser.package && this.loadedUser.package.slug === 'advanced'}">
						<v-img
							src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
							aspect-ratio="2.75"
						></v-img>

						<v-card-title primary-title>
							<v-layout justify-center>
								<h3 class="headline mb-0">Advanced Pack</h3>
							</v-layout>
						</v-card-title>

						<v-card-text>
							<v-list>
								<template v-for="(item, index) in packageAdvancedDetails">
									<v-subheader
										v-if="item.header"
										:key="item.header"
									>
										{{ item.header }}
									</v-subheader>

									<v-divider
										v-else-if="item.divider"
										:key="index"
										:inset="item.inset"
									></v-divider>

									<v-list-tile
										v-else
										:key="item.title"
										avatar
									>
									<v-list-tile-avatar>
										<img :src="item.image">
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-sub-title v-html="item.title" style="color: #000;"></v-list-tile-sub-title>
									</v-list-tile-content>
									</v-list-tile>
								</template>
							</v-list>
							<v-layout justify-center>
								<v-chip color="tertiary" text-color="#fff" class="headline pa-2">
									€29.90 / year
								</v-chip>
							</v-layout>
						</v-card-text>

						<v-card-actions v-if="loadedUser && loadedUser.package && loadedUser.package.slug !== 'basic'">
							<v-layout justify-center v-if="loadedUser.package.slug === 'advanced' && daysRemaining > 60">
								<v-chip label outline color="tertiary" text-color="tertiary" class="px-2 py-4">Current active package.<br />{{ daysRemaining }} days remaining.</v-chip>
							</v-layout>
							<v-layout row wrap justify-center v-if="loadedUser.package.slug === 'advanced' && daysRemaining <= 60">
								<v-chip label outline color="tertiary" text-color="tertiary" class="mb-2 px-2 py-4">Current active package.<br />Only {{ daysRemaining }} days remaining.</v-chip>
								<v-flex xs12 class="text-xs-center">
									<v-btn flat color="tertiary" @click.stop="selectPackage(packageAdvanced)">Renew package!</v-btn>
								</v-flex>
							</v-layout>
							<v-layout justify-center v-if="loadedUser.package.slug === 'classic' && daysRemaining > 60">
								<v-btn flat color="tertiary" @click.stop="selectPackage(packageAdvanced)">Upgrade to advanced for €{{ (29.90 / 365 * daysRemaining).toFixed(2) }}</v-btn>
							</v-layout>
							<v-layout justify-center v-if="loadedUser.package.slug === 'classic' && daysRemaining <= 60">
								<v-btn flat color="tertiary" @click.stop="selectPackage(packageAdvanced)">Upgrade to advanced!</v-btn>
							</v-layout>
						</v-card-actions>
						<v-card-actions v-else>
							<v-layout justify-center>
								<v-btn flat color="tertiary" @click.stop="selectPackage(packageAdvanced)">Pick me!</v-btn>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card v-if="!paymentCompleted">
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="dialog = false">
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
							                <v-list-tile-action-text class="black--text">{{ this.pack }}</v-list-tile-action-text>
						              	</v-list-tile-action>
						            </v-list-tile>
						            <v-divider ></v-divider>
						            <v-list-tile avatar ripple>
						              	<v-list-tile-content>
						                	<v-list-tile-sub-title>Valid until</v-list-tile-sub-title>
						              	</v-list-tile-content>
						              	<v-list-tile-action>
							                <v-list-tile-action-text class="black--text">{{ this.valid_until}}</v-list-tile-action-text>
						              	</v-list-tile-action>
						            </v-list-tile>
						            <v-divider ></v-divider>
						            <v-list-tile avatar ripple>
						              	<v-list-tile-content>
						                	<v-list-tile-sub-title>Total (in EUR)</v-list-tile-sub-title>
						              	</v-list-tile-content>
						              	<v-list-tile-action>
							                <v-list-tile-action-text class="black--text">{{ parseFloat(this.amount_in_cents/100).toFixed(2) }}</v-list-tile-action-text>
						              	</v-list-tile-action>
						            </v-list-tile>
						        </template>
							</v-list>
							<br />
							<!-- valid_until: {{ this.loadedUser.private.valid_until | moment('LLL')}}<br /> -->

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
						<v-btn color='success' @click='pay' :disabled='!complete' :loading="loading">Pay €{{ parseFloat(this.amount_in_cents/100).toFixed(2) }} with credit card</v-btn>
					</v-layout>
				</v-card-actions>
			</v-card>

			<v-card v-else>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="dialog = false">
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
						<v-btn color="primary" nuxt to="/candidate/resumes">Start managing my resumes</v-btn>
					</v-layout>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-snackbar
      		v-model="snackbar"
      		top
      		right
      		:timeout="5000"
    	>
      		<span class="subheading"><v-icon color="warning">warning</v-icon> You need to be authenticated to select a package.</span>
    	</v-snackbar>
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
				packageBasic: {
					type: 'basic',
					maximum_number_of_resumes: 1,
					total_space_in_bytes: 5,
					available_templates: 1,
					price: 0,
					currency: 'EUR'
				},
				packageBasicDetails: [
					{
						image: '/images/1.jpg',
						title: 'Number of resumes',
					},
					{ divider: true, inset: true },
					{
						image: '/images/3_1.jpg',
						title: 'Total space <span class="grey--text text--lighten-1">in MB</span>',
					},
					{ divider: true, inset: true },
					{
						image: '/images/1_2.jpg',
						title: 'Available template',
					}
				],
				packageClassic: {
					type: 'classic',
					maximum_number_of_resumes: 3,
					total_space_in_bytes: 10,
					available_templates: 3,
					price: 1490,
					currency: 'EUR'
				},
				packageClassicDetails: [
					{
						image: '/images/3.jpg',
						title: 'Number of resumes',
					},
					{ divider: true, inset: true },
					{
						image: '/images/10_1.jpg',
						title: 'Total space <span class="grey--text text--lighten-1">in MB</span>',
					},
					{ divider: true, inset: true },
					{
						image: '/images/3_2.jpg',
						title: 'Available templates',
					}
				],
				packageAdvanced: {
					type: 'advanced',
					maximum_number_of_resumes: 10,
					total_space_in_bytes: 20,
					available_templates: 5,
					price: 2990,
					currency: 'EUR'
				},
				packageAdvancedDetails: [
					{
						image: '/images/5_plus.jpg',
						title: 'Number of resumes',
					},
					{ divider: true, inset: true },
					{
						image: '/images/20_1.jpg',
						title: 'Total space <span class="grey--text text--lighten-1">in MB</span>',
					},
					{ divider: true, inset: true },
					{
						image: '/images/5_plus_2.jpg',
						title: 'Available templates',
					}
				],
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
				return null
				return Math.floor((this.loadedUser.private.valid_until - moment().add(6, 'month').unix())/(60*60*24))
			}
		},
		methods: {
			async selectPackage (pack) {
				// return this.$store.commit('openLoginModal')
				if (!this.loadedUser) {
					this.snackbar = true
					this.$store.commit('setRedirect', '/stripe')
					this.$store.commit('openLoginModal')
					return
				}
				this.dialog = true
				this.drawer = !this.drawer
				console.log('pack: ', pack)
				// this.maximum_number_of_resumes = pack.maximum_number_of_resumes
				// this.currency = pack.currency
				this.pack = pack.type
				this.amount_in_cents = pack.price
				this.valid_until = moment().add('1', 'years').format('LL')
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
						amount_in_cents: this.amount_in_cents,
						currency: this.currency,
						pack: this.pack,
						userId: this.loadedUser.id,
						email: this.loadedUser.email,
						name: `${this.loadedUser.firstname} ${this.loadedUser.lastname}`
					})
					console.log('process: ', process)
					this.paymentCompleted = true
					this.$store.commit('setLoading', false, { root: true })
					// new Noty({
					// 	type: 'success',
					// 	text: 'Paiement went successfully!',
					// 	timeout: 5000,
					// 	theme: 'metroui'
					// }).show()
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
</style>