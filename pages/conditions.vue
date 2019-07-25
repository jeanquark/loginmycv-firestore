<template>
	<div>
		<h1 class="text-xs-center primary-color my-4">About</h1>
		<v-layout row wrap>
			<v-flex xs8 offset-xs2 class="pa-3">
				<v-card class="pa-4">
					LoginMyCV is a private company located in Switzerland. The for is in Lausanne.
					<h2>LoginMyCV Terms of Service</h2>
					Thank you for using LoginMyCV! We're happy you're here. Please read this Terms of Service agreement carefully before accessing or using LoginMyCV.

					<h3>2. Privacy & Security</h3>
					We are totally aware of the privacy of the data involved when it comes to resumes.
					
					<h3>3. Content Restrictions</h3>
					You agree that you will not under any circumstances upload, post, host, or transmit any content that:
					<ul>
						<li>is unlawful or promotes unlawful activities;</li>
						<li>is or contains sexually obscene content;</li>
						<li>is libelous, defamatory, or fraudulent;</li>
						<li>is discriminatory or abusive toward any individual or group;</li>
						<li>gratuitously depicts or glorifies violence, including violent images;</li>
						<li>contains or installs any active malware or exploits, or uses our platform for exploit delivery (such as part of a command and control system); or</li>
						<li>infringes on any proprietary right of any party, including patent, trademark, trade secret, copyright, right of publicity, or other rights.</li>
					</ul>
					<h5>Condition</h5>
					<h5>FAQ</h5>
				</v-card>
			</v-flex>
			
		</v-layout>
	</div>
</template>

<script>
	export default {
		layout: 'layoutFront'
	}
</script>

<style scoped>
	.primary-color {
		color: var(--v-primary-base);
	}
</style>