<template>
	<div>
		<v-layout justify-center>
			<v-flex xs12 class="text-xs-center">
				<h2>Stripe paiement</h2>
				<vue-stripe-checkout
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
				<v-btn color="success" @click="checkout">Checkout</v-btn>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	// import vueStripeCheckout from '~/plugins/vue-stripe-checkout'
	import axios from 'axios'
	import Noty from 'noty'
	export default {
		// components: { vueStripeCheckout },
		layout: 'layoutFront',
		data () {
			return {
				image: '/images/logo_small.png',
				name: 'LoginMyCV Yearly subscription',
				description: 'Create up to 3 resumes with a total of 10MB of disk space',
				currency: 'EUR',
				amount_in_cents: 1490
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
			}
		}
	}
</script>

<style scoped>

</style>