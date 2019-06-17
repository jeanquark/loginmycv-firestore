<template>
	<div>
		<v-layout row wrap justify-center>
			<v-flex xs8>
				<v-layout>
					<v-flex xs4 class="pa-3">
						<v-card>
							<v-img
							src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
							aspect-ratio="2.75"
							></v-img>

							<v-card-title primary-title>
							<div>
								<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
							</div>
							</v-card-title>

							<v-card-actions>
							<v-btn flat color="orange">Share</v-btn>
							<v-btn flat color="orange">Explore</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
		
					<v-flex xs4 class="pa-3">
						<v-card>
							<v-img
							src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
							aspect-ratio="2.75"
							></v-img>

							<v-card-title primary-title>
							<div>
								<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
							</div>
							</v-card-title>

							<v-card-actions>
							<v-btn flat color="orange">Share</v-btn>
							<v-btn flat color="orange">Explore</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>

					<v-flex xs4 class="pa-3">
						<v-card>
							<v-img
							src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
							aspect-ratio="2.75"
							></v-img>

							<v-card-title primary-title>
							<div>
								<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
							</div>
							</v-card-title>

							<v-card-actions>
							<v-btn flat color="orange">Share</v-btn>
							<v-btn flat color="orange">Explore</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs4 class="mt-4 pa-3 text-xs-center card">
				<h2>Stripe paiement</h2><br />
				complete: {{ complete }}
				<!-- <vue-stripe-checkout
					ref="checkoutRef"
					:image="image"
					:name="name"
					:description="description"
					:currency="currency"
					:amount="amount_in_cents"
					:allow-remember-me="false"
					@done="done"
					@opened="opened"
					@closed="closed"
					@canceled="canceled"
				>
				</vue-stripe-checkout>
				<v-btn color="success" @click="checkout">Checkout</v-btn> -->
				<!-- <div class="text-xs-center"> -->
					<card class='stripe-card'
						:class='{ complete }'
						stripe='pk_test_mfRXE3nfVNydQzc5zhpTrdoU004DyRbBvo'
						:options="stripeOptions"
						@change='complete = $event.complete'
						v-if="loadedStripe"
					/><br />
					<v-btn color='success' @click='pay' :disabled='!complete'>Pay with credit card</v-btn>
				<!-- </div> -->
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	// import vueStripeCheckout from '~/plugins/vue-stripe-checkout'
	import axios from 'axios'
	import Noty from 'noty'
	import { Card, createToken } from 'vue-stripe-elements-plus'
	export default {
		// components: { vueStripeCheckout },
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
		data () {
			return {
				// image: '/images/logo_small.png',
				// name: 'LoginMyCV Yearly subscription',
				// description: 'Create up to 3 resumes with a total of 10MB of disk space',
				currency: 'EUR',
				amount_in_cents: 1490,
				complete: false,
				stripeOptions: {
        			// see https://stripe.com/docs/stripe.js#element-options for details
				},
				loadedStripe:false
			}
		},
		computed: {

		},
		methods: {
			async checkout () {
				// token - is the token object
				// args - is an object containing the billing and shipping address if enabled
				const { token, args } = await this.$refs.checkoutRef.open()
			},
			async done ({ token, args }) {
				// token - is the token object
				// args - is an object containing the billing and shipping address if enabled
				// do stuff...
				console.log('Done!')
				console.log('token: ', token)
				console.log('args: ', args)
				const payment = await axios.post('/stripe-payments', { token: token.id, amount_in_cents: this.amount_in_cents, currency: this.currency })
				console.log('payment: ', payment)
				new Noty({
					type: 'success',
					text: 'Paiement went successfully!',
					timeout: 5000,
					theme: 'metroui'
				}).show()
			},
			opened () {
				// do stuff
				console.log('Open modal')
			},
			closed () {
				// do stuff 
				console.log('Close modal')
			},
			canceled () {
				// do stuff 
				console.log('Canceled payment')
			},
			async pay () {
				// createToken returns a Promise which resolves in a result object with
				// either a token or an error key.
				// See https://stripe.com/docs/api#tokens for the token object.
				// See https://stripe.com/docs/api#errors for the error object.
				// More general https://stripe.com/docs/stripe.js#stripe-create-token.
				try {
					const token = await createToken()
					console.log('token: ', token)
					const payment = await axios.post('/stripe-payments', { token: token.id, amount_in_cents: this.amount_in_cents, currency: this.currency })
					console.log('payment: ', payment)
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
	.card {
		border: 1px solid var(--v-primary-base);
		border-radius: 10px;
	}
	.stripe-card {
		/* width: 300px;*/
		/* color: var(--v-secondary-base); */
		/* color: green; */
		/* border: 1px solid grey; */
		border-bottom: 1px solid var(--v-secondary-base);
	}
	.stripe-card.complete {
		border-color: var(--v-success-base);
	}
	/* .stripe-card.error {
		border-color: var(--v-error-base);
	} */
	.primary-color-background {
		background: var(--v-primary-lighten5);
		/* background: pink; */
	}


	
</style>