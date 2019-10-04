<template>
    <v-app>
        <v-content>
            <v-container fluid class="fill-height">
                <!-- <v-layout align-center justify-center> -->
				<v-row justify="center" align="center">
                    <!-- <v-flex xs12 sm8 md4> -->
					<v-col xs="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Reset password</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="form.email"></v-text-field>
                                    <!-- <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field> -->
                                    <!-- <v-layout justify-center class="mb-2"> -->
									<v-row no-gutters justify="center" class="mb-2">
                                        <v-btn color="primary" @click="resetPassword">Reset</v-btn>
                                        <v-btn color="secondary" text nuxt to="/">Cancel</v-btn>
                                    <!-- </v-layout> -->
									</v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    <!-- </v-flex> -->
					</v-col>
                <!-- </v-layout> -->
				</v-row>
            </v-container>
        </v-content>
  </v-app>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email: ''
                }
            }
        },
        methods: {
            async resetPassword () {
                await this.$store.dispatch('firebase-auth/resetPassword', this.form.email)
            }
        }
    }
</script>

<style scoped>
    
    
</style>