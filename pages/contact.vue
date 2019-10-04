<template>
	<!-- <div> -->
	<v-container>
		<h1 class="text-xs-center primary-color my-4">Contact Us</h1>
		<!-- <v-layout row wrap> -->
		<v-row no-gutters>
			<!-- <v-flex xs6 offset-xs3 class="mb-3"> -->
			<v-col xs="6" offset-xs="3" class="mb-3">
				<div class="pa-3">
					Please feel free to contact us for any question/problem you may have regarding the use of our services.
					We'll do our best to come back to you as quickly as possible (usually the next business day).
				</div>
				<v-form @submit.prevent="sendMessage('contact')" class="form" data-vv-scope="contact">
					<!-- <v-layout row wrap> -->
					<v-row no-gutters>
						<!-- <v-flex xs6 class="pr-3"> -->
						<v-col cols="6" class="pr-3">
							<v-text-field
								label="First name"
								name="firstname"
								v-validate="'required|max:40'"
								:error-messages="errors ? errors.collect('contact.firstname') : null"
								data-vv-as="First name"
								v-model="form.firstname"
							></v-text-field>
						<!-- </v-flex> -->
						</v-col>
						<!-- <v-flex xs6 class="pl-3"> -->
						<v-col cols="6" class="pl-3">
							<v-text-field
								label="Last name"
								name="lastname"
								v-validate="'required|max:40'"
								:error-messages="errors ? errors.collect('contact.lastname') : null"
								data-vv-as="Last name"
								v-model="form.lastname"
							></v-text-field>
						<!-- </v-flex> -->
						</v-col>
						<!-- <v-flex xs12> -->
						<v-col cols="12">
							<v-text-field
								label="Your Email"
								name="email"
								v-validate="'required|email'"
								:error-messages="errors ? errors.collect('contact.email') : null"
								data-vv-as="Email"
								v-model="form.email"
							></v-text-field>
						<!-- </v-flex> -->
						</v-col>
						<!-- <v-flex xs12> -->
						<v-col cols="12">
							<v-textarea
								label="Your message"
								name="message"
								v-validate="'required|max:2056'"
								:error-messages="errors ? errors.collect('contact.message') : null"
								data-vv-as="Message"
								v-model="form.message"
							></v-textarea>
						<!-- </v-flex> -->
						</v-col>
						<v-btn round block large class="white--text" type="submit" style="padding-top: 0px; padding-bottom: 0px;" color="primary">Send message</v-btn>
					<!-- </v-layout> -->
					</v-row>
				</v-form>
			<!-- </v-flex> -->
			</v-col>
		<!-- </v-layout> -->
		</v-row>
	<!-- </div> -->
	</v-container>
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
			error () {
                return this.$store.getters['errors']
            }
		},
		methods: {
			async sendMessage (scope) {
				await this.$validator.validateAll(scope)
                if (!this.errors.any()) {
					alert('Send message is not operational for now.')
				}
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