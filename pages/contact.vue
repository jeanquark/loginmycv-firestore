<template>
	<div>
		<h1 class="text-xs-center primary-color my-4">Contact Us</h1>
		<v-layout row wrap>
			<v-flex xs6 offset-xs3 class="mb-3">
				<v-form class="form">
					<v-layout row wrap>
						<v-flex xs6 class="pr-3">
							<v-text-field
								label="First name"
								name="firstname_contact"
								v-validate="'required|max:40'"
								:error-messages="errors ? errors.collect('firstname_contact') : null"
								data-vv-as="First name"
								v-model="form.firstname"
							></v-text-field>
						</v-flex>
						<v-flex xs6 class="pl-3">
							<v-text-field
								label="Last name"
								name="lastname_contact"
								v-validate="'required|max:40'"
								:error-messages="errors ? errors.collect('lastname_contact') : null"
								data-vv-as="Last name"
								v-model="form.lastname"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								label="Your Email"
								name="email_contact"
								v-validate="'required|email'"
								:error-messages="errors ? errors.collect('email_contact') : null"
								data-vv-as="Email"
								v-model="form.email"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-textarea
								label="Your message"
								name="message_contact"
								v-validate="'required|max:2056'"
								:error-messages="errors ? errors.collect('message_contact') : null"
								data-vv-as="Message"
								v-model="form.message"
							></v-textarea>
						</v-flex>
						<v-btn round block large class="white--text" style="padding-top: 0px; padding-bottom: 0px;" color="primary" @click.prevent="sendMessage">Send message</v-btn>
					</v-layout>
				</v-form>
			</v-flex>
			
		</v-layout>
	</div>
</template>

<script>
	export default {
		inject: ['$validator'], // inject vee-validate validator
		layout: 'layoutFront',
		data () {
			return {
				form: {
					fistname: '',
					lastname: '',
					email: '',
					message: ''
				}
			}
		},
		computed: {
			errors () {
                return this.$store.getters['errors']
            }
		},
		methods: {
			sendMessage () {
				alert('Send message is not operational for now.')
			}
		}
	}
</script>

<style scoped>
	.form {
		border: 1px solid var(--v-primary-base);
		border-radius: 10px;
		padding: 20px;
	}
	.primary-color {
		color: var(--v-primary-base);
	}
</style>