<template>
	<v-layout
    	wrap
  	>
		<v-container>
			this.package: {{ this.package }}<br />
			this.amount: {{ this.amount }}<br />
			this.currency: {{ this.currency }}<br />
			<v-layout row wrap justify-center>
				<v-flex xs12>
					<h1 class="text-xs-center secondary-color">Choose your package</h1>
				</v-flex>
				<v-flex xs4 class="pa-4">
					<v-card hover>
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
							<v-layout justify-center>
								<v-btn flat color="primary" @click.stop="selectPackage(packageBasic)">Pick me!</v-btn>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-flex>
				<v-flex xs4 class="pa-4">
					<v-card hover>
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
									$14.90 / year
								</v-chip>
							</v-layout>
						</v-card-text>

						<v-card-actions>
							<v-layout justify-center>
								<v-btn flat color="secondary" @click.stop="selectPackage(packageClassic)">Pick me!</v-btn>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-flex>
				<v-flex xs4 class="pa-4">
					<v-card hover>
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
									$ 29.90 / year
								</v-chip>
							</v-layout>
						</v-card-text>

						<v-card-actions>
							<v-layout justify-center>
								<v-btn flat color="tertiary" @click.stop="selectPackage(packageAdvanced)">Pick me!</v-btn>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<v-navigation-drawer
			v-model="drawer"
			absolute
			temporary
			app
			right
		>
			<div class="pa-4 text-xs-center">
				<h4>Your command:</h4>
				Package: {{ this.package }}<br />
				Valid until: {{ this.valid_until }}<br />
				Total: {{ this.amount/100 }}<br />

				Proceed to secured payment with Stripe<br />
				<card class='stripe-card'
					:class='{ complete }'
					stripe='pk_test_mfRXE3nfVNydQzc5zhpTrdoU004DyRbBvo'
					:options="stripeOptions"
					@change='complete = $event.complete'
					v-if="loadedStripe"
				/><br />
				<v-btn color='success' @click='pay' :disabled='!complete'>Pay with credit card</v-btn>
			</div>
		</v-navigation-drawer>
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
		},
		mounted () {
			this.$store.commit('closeLoginModal')
		},
		data () {
			return {
				drawer: null,
				maximum_number_of_resumes: null,
				total_space_in_bytes: null,
				available_templates: null,
				package: '',
				amount: 0,
				valid_until: '',
				currency: 'EUR',
				amount_in_cents: 1490,
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
						title: 'Available templates',
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
				]
			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['users/loadedUser']
			}
		},
		methods: {
			async selectPackage (pack) {
				if (this.loadedUser) {
					this.$store.commit('setMessage', 'You must be authenticated to select a package.')
					return this.$store.commit('openLoginModal')
				}
				this.drawer = !this.drawer
				console.log('pack: ', pack)
				this.maximum_number_of_resumes = pack.maximum_number_of_resumes
				this.currency = pack.currency
				this.package = pack.type
				this.amount = pack.price
				this.valid_until = moment().add('1', 'years').format('LL')
			},
			async pay () {
				// createToken returns a Promise which resolves in a result object with
				// either a token or an error key.
				// See https://stripe.com/docs/api#tokens for the token object.
				// See https://stripe.com/docs/api#errors for the error object.
				// More general https://stripe.com/docs/stripe.js#stripe-create-token.
				try {
					const payment = await createToken()
					console.log('payment: ', payment)
					const process = await axios.post('/stripe-payments', { 
						token: payment.token.id,
						amount_in_cents: this.amount_in_cents,
						currency: this.currency,
						pack: this.package,
						// userId: this.loadedUser.id
						userId: 'gy64ItWgdAUye2Vr6g0cisjihno1'
					})
					console.log('process: ', process)
					new Noty({
						type: 'success',
						text: 'Paiement went successfully!',
						timeout: 5000,
						theme: 'metroui'
					}).show()
				} catch (error) {
					console.log('error: ', error)
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
</style>