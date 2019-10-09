<template>
    <div class="pa-4" v-if="userResume">
        <div>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- candidateLongResume.image: {{ candidateLongResume.image }}<br /><br /> -->
            <!-- imageUrl: {{ imageUrl }}<br /><br /> -->
            <!-- imageFile: {{ imageFile }}<br /><br /> -->
            <!-- uploadingNewImage: {{ uploadingNewImage }}<br /><br /> -->
            <!-- error: {{ error }}<br /><br /> -->
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- personalData: {{ this.personalData }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- getCurrentPicture: {{ getCurrentPicture }}<br /><br /> -->
            <!-- userResume.uploads: {{ this.userResume.uploads }}<br /><br /> -->
            <!-- <v-btn color="primary" @click="addUpload">Add upload</v-btn> -->
            <!-- loadedCountries: {{ loadedCountries }}<br /><br /> -->
            <!-- this.userResume.visibility: {{ userResume.visibility }}<br /> -->
            <!-- originalVisibility: {{ originalVisibility }}<br /> -->
            <!-- this.userResume.updateResumeSlug: {{ userResume.updateResumeSlug }}<br /> -->
            <!-- userResume.language: {{ userResume.language }}<br /><br /> -->

        </div>
        <!-- <v-layout row wrap class="pa-2"> -->
		<v-row no-gutters class="pa-2">
            <!-- <v-flex xs12> -->
			<v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-0">General Info</h2><br />
                    </v-card-title>
                    <div class="text-center">
                        <small>(entries with an * are compulsory)</small><br />
                        <small v-if="userResume.visibility !== 'private'">(all entries with an <v-icon small>remove_red_eye</v-icon> are public since your resume is not private. See below to change that.)</small>
                        <small v-else>(all entries are private)</small>
                    </div>

                    <v-card-text>
                        <!-- <v-layout> -->
						<v-row no-gutters>
                            <!-- <v-flex xs12 sm4 class="px-3" v-if="!this.resumeSlug"> -->
							<v-col xs="12" sm="4" class="px-3" v-if="!this.resumeSlug">
                                <v-text-field name="slug" hint="Must be unique." :persistent-hint="true" v-validate="{ required: true, regex: /^[a-z0-9-]+$/, max: 50 }" :error-messages="errors ? errors.collect('slug') : null" data-vv-as="Resume identifier" :counter="50" v-model="userResume.slug">
                                    <template v-slot:label>
                                        Resume identifier* <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'address-card']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex d-flex xs12 sm8 class="px-3" v-if="userResume.slug"> -->
							<v-col d-flex xs12 sm8 class="px-3" v-if="userResume.slug">
                                <v-text-field label="Path to your resume" :value="userResume.slug ? `https://www.loginmycv.com/resume/${userResume.slug}` : ''" readonly class="no-underline">
                                    <font-awesome-icon :icon="['fas', 'link']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout row wrap> -->
						<v-row no-gutters>
                            <!-- <v-flex xs12 sm8 class="px-3"> -->
							<v-col xs="12" sm="8" class="px-3">
                                <v-text-field id="job_title" name="job_title" v-validate="'required|max:50'" :error-messages="errors ? errors.collect('job_title') : null" data-vv-as="Job title" :counter="50" v-model="userResume.job_title">
                                    <template v-slot:label>
                                        Job title* <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'briefcase']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex d-flex xs12 class="px-3"> -->
							<v-col d-flex xs12 class="px-3">
                                <v-textarea id="job_description" name="job_description" v-validate="'required|max:250'" :error-messages="errors ? errors.collect('job_description') : null" data-vv-as="Job description" :counter="250" v-model="userResume.job_description">
                                    <template v-slot:label>
                                        Job description* <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'briefcase']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-textarea>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout row wrap> -->
						<v-row no-gutters>
                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field name="firstname" v-validate="'required|max:50'" :error-messages="errors ? errors.collect('firstname') : null" data-vv-as="First name" :counter="50" v-model="userResume.personal_data.firstname">
                                    <template v-slot:label>
                                        First name* <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field name="lastname" v-validate="'required|max:50'" :error-messages="errors ? errors.collect('lastname') : null" data-vv-as="Last name" :counter="50" v-model="userResume.personal_data.lastname">
                                    <template v-slot:label>
                                        Last name* <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field name="middlename" v-validate="'max:50'" :error-messages="errors ? errors.collect('middlename') : null" data-vv-as="Middle name" :counter="50" v-model="userResume.personal_data.middlename">
                                    <template v-slot:label>
                                        Middle name <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>
                    </v-card-text>
                </v-card>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
        <br />

        <!-- <v-layout row wrap class="pa-2"> -->
		<v-row no-gutters class="pa-2">
            <!-- <v-flex xs12> -->
			<v-col xs="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Contact & Social</h2>
                    </v-card-title>
                    <v-card-text>
                        <!-- <v-layout row wrap> -->
						<v-row no-gutters>
                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field label="Email*" name="email" type="email" v-validate="'required|email|max:50'" :error-messages="errors ? errors.collect('email') : null" data-vv-as="Email" v-model="userResume.personal_data.email">
                                    <font-awesome-icon :icon="['fas', 'envelope']" size="1x" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field label="Personal Website" name="website" hint="https://www.example.com" persistent-hint v-validate="{url: {require_protocol: true }}" :error-messages="errors ? errors.collect('website') : null" v-model="userResume.personal_data.website">
                                    <font-awesome-icon :icon="['fab', 'chrome']" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field label="Phone number" name="phone" v-validate="{ regex: /^([ 0-9+()-]+)$/ }" :error-messages="errors ? errors.collect('phone') : null" v-model="userResume.personal_data.phone">
                                    <font-awesome-icon :icon="['fas', 'phone']" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm8 class="px-3"> -->
							<v-col xs="12" sm="8" class="px-3">
                                <v-select label="Social networks" :items="loadedSocialNetworks" attach chips multiple dense small-chips deletable-chips color="secondary" item-text="name" return-object v-model="userResume.social_networks">
                                    <template v-slot:selection="data">
                                        <v-chip :selected="data.selected" :color="data.item.color" class="chip--select-multi" @input="removeSocialLink(data.item)">
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>

                                    <font-awesome-icon :icon="['fas', 'hashtag']" slot="prepend" style="margin-top: 4px;" />
                                </v-select>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm4 class="px-3" v-for="(social_network, index) of userResume.social_networks" :key="index"> -->
							<v-col xs="12" sm="4" class="px-3" v-for="(social_network, index) of userResume.social_networks" :key="index">
                                <v-text-field :label="`${social_network.name} link`" :name="social_network.slug" hint="Don't forget protocol (https://) for url" v-validate="{ required: true }" :error-messages="errors ? errors.collect(`${social_network.slug}`) : null" :data-vv-as="social_network.name" v-model="userResume.social_networks[index]['link']">
                                    <font-awesome-icon :icon="['fab', `${social_network.fontawesome}`]" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>
                    </v-card-text>
                </v-card>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
        <br />

        <!-- <v-layout row wrap class="pa-2"> -->
		<v-row no-gutters class="pa-2">
            <!-- <v-flex xs12> -->
			<v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">More about you</h2>
                    </v-card-title>

                    <v-card-text>
                        <!-- <v-layout row wrap class="mb-4"> -->
						<v-row no-gutters class="mb-4">
                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-autocomplete label="Country of residence" :items="loadedCountries" item-text="name" :return-object="true" chips small-chips :deletable-chips="true" color="secondary" v-model="userResume.personal_data.country">
                                    <font-awesome-icon :icon="['fas', 'globe-europe']" slot="prepend" style="margin-top: 4px;" />
                                    <template v-slot:selection="data">
                                        <v-chip :selected="data.selected" class="chip--select-multi">
                                            <v-avatar>
                                                <img :src="`/images/countries/${data.item.flag}`">
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-tile-avatar>
                                                <img :src="`/images/countries/${data.item.flag}`">
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-text-field :counter="50" v-validate="'max:50'" :error-messages="errors ? errors.collect('City') : null" data-vv-name="City" v-model="userResume.personal_data.city">
                                    <template v-slot:label>
                                        City (State, Region) <v-icon small class="valign-top">{{ userResume.visibility === 'private' ? 'visibility_off' : 'visibility'}}</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'city']" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-dialog ref="menu" v-model="menu" :return-value.sync="userResume.personal_data.birthday" :persistent="false" full-width width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field label="Birthday date" readonly v-on="on" v-model="userResume.personal_data.birthday">
                                            <font-awesome-icon :icon="['fas', 'birthday-cake']" slot="prepend" style="margin-top: 4px;" />
                                        </v-text-field>
                                    </template>
                                    <v-date-picker ref="picker" :max="new Date().toISOString().substr(0, 10)" min="1900-01-01" v-model="userResume.personal_data.birthday" @change="saveBirthdayDate"></v-date-picker>
                                </v-dialog>
                            <!-- </v-flex> -->
							</v-col>

                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout class="mb-4"> -->
						<v-row no-gutters class="mb-4">
                            <!-- <v-flex xs12 sm4 class="px-3"> -->
							<v-col xs="12" sm="4" class="px-3">
                                <v-autocomplete label="Nationality-ies" :items="loadedCountries" item-text="name" :return-object="true" multiple chips small-chips hint="Order matters" persistent-hint :deletable-chips="true" color="secondary" v-model="userResume.personal_data.nationalities">
                                    <font-awesome-icon :icon="['fas', 'flag-usa']" slot="prepend" style="margin-top: 4px;" />
                                    <template v-slot:selection="data">
                                        <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeNationality(data.item)">
                                            <v-avatar>
                                                <img :src="`/images/countries/${data.item.flag}`">
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-tile-avatar>
                                                <img :src="`/images/countries/${data.item.flag}`">
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs8 sm5 class="px-3"> -->
							<v-col xs="8" sm="5" class="px-3">
                                <v-autocomplete label="Languages" :items="loadedLanguages" item-text="name" :return-object="true" multiple chips small-chips hint="Click checkbox to display levels. Order matters." persistent-hint :deletable-chips="true" color="secondary" v-model="userResume.languages">
                                    <font-awesome-icon :icon="['fas', 'language']" slot="prepend" style="margin-top: 4px;" />
                                    <template v-slot:selection="data">
                                        <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeLanguage(data.item)">
                                            <v-avatar>
                                                <img :src="`/images/languages/${data.item.flag}`">
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-tile-avatar>
                                                <img :src="`/images/languages/${data.item.flag}`">
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            <!-- </v-flex> -->
							</v-col>

                            <!-- <v-flex xs4 sm3 class="px-3"> -->
							<v-col xs="4" sm="3" class="px-3">
                                <v-checkbox label="Display language level" color="secondary" v-model="userResume.parameters.show_language_level"></v-checkbox>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout row wrap v-if="userResume.parameters.show_language_level" class="mb-4"> -->
						<v-row no-gutters class="mb-4" v-if="userResume.parameters.show_language_level">
                            <!-- <v-flex xs4 v-for="(language, index) in userResume.languages" :key="index" class="px-3"> -->
							<v-col xs="4" class="px-3" v-for="(language, index) in userResume.languages" :key="index">
                                <!-- <v-layout class="my-0 pl-3"> -->
								<v-row no-gutters class="my-0 pl-3">
                                    <!-- <v-flex class="text-xs-left"> -->
									<v-col class="text-left">
                                        <span>{{ language.name }}</span>
                                    <!-- </v-flex> -->
									</v-col>
                                    <!-- <v-flex class="text-xs-right"> -->
									<v-col class="text-right">
                                        <span>{{ language.value }}%</span>
                                    <!-- </v-flex> -->
									</v-col>
                                <!-- </v-layout> -->
								</v-row>
                                <v-slider v-model="language.value" label="" min="0" max="100" step="10" color="secondary" class="mt-0 pl-3"></v-slider>
                                <v-text-field :label="`Info ${language.name} (certificate, travel, etc.)`" v-model="language.info">
                                    <font-awesome-icon :icon="['fas', 'info']" slot="prepend" class="mt-1" />
                                </v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout row wrap align-center class="mb-4"> -->
						<v-row no-gutters align="center" class="mb-4">
                            <!-- <v-flex xs12 sm4 class="px-3" v-if="resumeSlug && getCurrentPicture && getCurrentPicture.downloadUrl"> -->
							<v-col xs="12" sm="4" class="px-3" v-if="resumeSlug && getCurrentPicture && getCurrentPicture.downloadUrl">
                                <div class="text-xs-center">
                                    <span>Current picture: </span><br />
                                    <img :src="getCurrentPicture.downloadUrl" height="150" /><br />

                                </div>
                            <!-- </v-flex> -->
							</v-col>
                            <!-- <v-layout row wrap align-center> -->
                            <!-- <v-flex xs4 class="px-3"> -->
							<v-col xs="4" class="px-3">
                                <v-text-field @click='pickFile' v-model="imageName">
                                    <template v-slot:label>
                                        My Picture <v-icon small style="vertical-align: top">remove_red_eye</v-icon>
                                    </template>
                                    <font-awesome-icon :icon="['fas', 'portrait']" slot="prepend" style="margin-top: 4px;" />
                                </v-text-field>
                                <input type="file" style="display: none" ref="image" accept="image/jpeg" data-vv-name="Picture" v-validate="'image'" @change="onFilePicked">
                            <!-- </v-flex> -->
							</v-col>
                            <!-- <v-flex xs6 class="text-xs-left"> -->
							<v-col xs="6" class="text-left">
                                <v-icon @click="removeCurrentPicture" v-if="imageName">delete</v-icon>
                            <!-- </v-flex> -->
							</v-col>
                            <!-- </v-layout> -->
                            <!-- </v-flex> -->

                            <!-- <v-flex xs12 sm6> -->
							<v-col xs="12" sm="6">
                                <div class="text-center">
                                    <img src="/images/loader.gif" width="100" v-if="uploadingNewImage" />
                                </div>
                                <div v-if="imageUrl" class="text-xs-center">
                                    <span>New picture: </span><br />
                                    <img :src="imageUrl" height="150" />
                                </div>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>
                    </v-card-text>
                </v-card>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
        <br />

		<!-- <v-layout row wrap pa-2> -->
		<v-row no-gutters class="pa-2">
			<!-- <v-flex xs12 style="border: 2px solid yellow;"> -->
			<v-col cols="12" style="border: 2px solid yellow;">
				<component :is="dynamicComponent" :resumeSlug="resumeSlug" :newPersonalData="null" v-if="dynamicComponent" />
			<!-- </v-flex> -->
			</v-col>
		<!-- </v-layout> -->
		</v-row>

        <!-- <v-layout row wrap pa-2 class=""> -->
		<v-row no-gutters class="pa-2">
            <!-- <v-flex xs12 class=""> -->
			<v-col cols="12">
                <v-card :elevation="12" class="white--text red-border" style="">
                    <v-card-title class="error lighten-1 justify-center">
                        <h2 class="headline mb-0">Privacy & Security</h2>
                    </v-card-title>

                    <v-card-text class="">
                        <!-- <v-layout justify-center> -->
						<v-row no-gutters justify="center">
                            <div class="justify-center">
                                <v-radio-group row name="visibility" v-validate="{ required: true }" :error-messages="errors ? errors.collect('visibility') : null" data-vv-as="Privacy" v-model="userResume.visibility">
                                    <v-radio label="Public resume" value="public" color="success"></v-radio>
                                    <v-radio label="Semi-private resume" value="semi-private" color="info"></v-radio>
                                    <v-radio label="Private resume" value="private" color="warning"></v-radio>
                                </v-radio-group>
                            </div>
                        <!-- </v-layout> -->
						</v-row>
                        <!-- <v-layout row wrap> -->
						<v-row no-gutters>
                            <v-alert value="public" color="success" icon="done" v-if="userResume.visibility === 'public'">
                                <span class="subheading font-weight-medium">An excerpt of your resume with free access to your data appears on the frontpage (recommanded option).</span>
                            </v-alert>
                            <v-alert value="semi-private" color="info" icon="info" v-if="userResume.visibility === 'semi-private'">
                                <span class="subheading font-weight-medium">An excerpt of your resume appears on the frontpage. However to gain full access, visitors either need to ask for your authorization, or they will be prompted to enter the password you specify below.</span>
                            </v-alert>
                            <v-alert value="private" color="warning" icon="warning" v-if="userResume.visibility === 'private'">
                                <span class="subheading font-weight-medium">Your resume is hidden, <i>i.e.</i> visitors are not able to find you without prior knowledge of your resume identifier. To gain access to your resume, visitors either need to ask for your authorization, or they will be prompter to enter the password you specify below.</span>
                            </v-alert>
                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout row wrap justify-center v-if="userResume.visibility != 'public'" style="margin-top: 20px;"> -->
						<v-row no-gutters justify="center" v-if="userResume.visibility != 'public'" style="margin-top: 20px;">
                            <!-- <v-flex xs12 class="text-xs-center mb-2"> -->
							<v-col cols="12" class="text-center mb-2">
                                <div>
                                    Provide password for visitors' access:
                                </div>
                                <small>(You will transmit this password to your guests for access)</small>

                            <!-- </v-flex> -->
							</v-col>
                            <!-- <v-flex xs12 sm6 mx-5> -->
							<v-col xs="12" sm="6" class="mx-5">
                                <v-text-field :type="showPassword ? 'text' : 'password'" name="password_visitor" :label="resumeSlug ? 'New password' : 'Password'" prepend-icon="lock" hint="At least 4 characters" :counter="30" :append-icon="showPassword ? 'visibility' : 'visibility_off'" @click:append="showPassword = !showPassword" v-validate="{ required: this.isPasswordRequired, min:4, max:30}" data-vv-as="Password" ref="password" v-model="userResume.password" :error-messages="errors ? errors.collect('password_visitor') : null"></v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                            <!-- <v-flex xs12 sm6 mx-5> -->
							<v-col xs="12" sm="6" class="mx-5">
                                <v-text-field type="password" name="password_confirmation_visitor" :label="resumeSlug ? 'New Password confirmation' : 'Password confirmation'" prepend-icon="lock" v-validate="{ required: this.userResume.password ? true : false, confirmed: this.userResume.password }" data-vv-as="Password" :error-messages="errors ? errors.collect('password_confirmation_visitor') : null" v-model="userResume.password_confirmation"></v-text-field>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>

                        <!-- <v-layout v-if="resumeSlug"> -->
						<v-row no-gutters v-if="resumeSlug">
                            <!-- <v-flex xs10 offset-xs1> -->
							<v-col xs="10" offset-xs="1">
                                <!-- <v-layout justify-center> -->
								<v-row no-gutters justify="center">
                                    <div>
                                        <v-switch v-model="userResume.updateResumeSlug" label="Modify resume identifier" color="secondary"></v-switch>
                                    </div>
                                <!-- </v-layout> -->
								</v-row>

                                <!-- <v-layout v-if="userResume.updateResumeSlug"> -->
								<v-row no-gutters v-if="userResume.updateResumeSlug">
                                    <!-- <v-flex xs12 sm6 mx-3> -->
									<v-col xs="12" sm="6" class="mx-3">
                                        <v-text-field label="New resume identifier*" name="new_slug" prepend-icon="perm_identity" hint="Must be unique." :persistent-hint="true" v-validate="{ required: true, regex: /^[a-z0-9-]+$/ }" :error-messages="errors ? errors.collect('new_slug') : null" data-vv-as="Resume identifier" v-model="userResume.new_slug"></v-text-field>
                                    <!-- </v-flex> -->
									</v-col>

                                    <!-- <v-flex xs12 sm8 class="px-3"> -->
									<v-col xs="12" sm="8" class="px-3">
                                        <v-text-field label="New path to your resume" :value="userResume.new_slug ? `https://www.loginmycv.com/resume/${userResume.new_slug}` : ''" readonly prepend-icon="web"></v-text-field>
                                    <!-- </v-flex> -->
									</v-col>
                                <!-- </v-layout> -->
								</v-row>
                            <!-- </v-flex> -->
							</v-col>
                        <!-- </v-layout> -->
						</v-row>

                    </v-card-text>
                </v-card>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
    </div>
</template>

<script>
	import moment from 'moment'
	import { VueColorpicker } from 'vue-pop-colorpicker'
	export default {
		inject: ['$validator'], // Inject parent validator
		components: { VueColorpicker },
		async created() {
			console.log('created')
			const resumeSlug = this.$route.params.slug
			console.log('resumeSlug: ', resumeSlug)
			if (resumeSlug != undefined) {
				this.resumeSlug = resumeSlug
			}
		},
		async mounted() {
			this.originalVisibility = JSON.parse(JSON.stringify(this.userResume.visibility))
			if (this.userResume.uploads) {
				const picture = this.userResume.uploads.find(
					upload => upload.type === 'profile_picture' && upload.new
				)
				if (picture) {
					this.imageName = picture.name
					const fileReader = new FileReader()
					fileReader.readAsDataURL(picture.file)
					fileReader.addEventListener('load', () => {
						this.imageUrl = fileReader.result
					})
				}
			}
			this.loadDynamicComponent()
				.then(() => {
					this.dynamicComponent = () => this.loadDynamicComponent()
				})
				.catch(() => {
					this.dynamicComponent = null
				})
		},
		data() {
			return {
				dynamicComponent: null,
				resumeSlug: '',
				imageName: '',
				imageUrl: '',
				imageFile: '',
				uploadingNewImage: false,
				modalDate: false,
				showPassword: false,
				originalVisibility: '', // Do not erase
				date: null,
				menu: false
			}
		},
		computed: {
			loadDynamicComponent() {
				console.log('this.userResume: ', this.userResume)
				return () =>
					import(`~/components/resume/dynamicTemplatesComponents/${
						this.userResume.template.id
					}/PersonalDataComponent`)
			},
			userResume() {
				if (!this.resumeSlug) {
					return this.$store.getters['resumes/loadedNewResume']
				} else {
					return this.$store.getters['resumes/loadedUserResumes'].find(
						resume => resume.slug === this.resumeSlug
					)
				}
			},
			loadedNewResume() {
				return this.$store.getters['resumes/loadedNewResume']
			},
			loadedCountries() {
				return this.$store.getters['countries/loadedCountries']
			},
			loadedLanguages() {
				return this.$store.getters['languages/loadedLanguages']
			},
			loadedCompetences() {
				return this.$store.getters['competences/loadedCompetences']
			},
			loadedSocialNetworks() {
				return this.$store.getters['socialNetworks/loadedSocialNetworks']
			},
			getCurrentPicture() {
				if (this.userResume.uploads) {
					return this.userResume.uploads.find(upload => upload.type === 'profile_picture')
				}
				return null
			},
			isPasswordRequired() {
				if (this.userResume.updateResumeSlug) {
					if (this.userResume.visibility !== 'public') {
						return true
					}
					return false
				}
				if (
					this.userResume.visibility !== this.originalVisibility &&
					this.originalVisibility === 'public'
				) {
					return true
				}
				return false
			}
		},
		methods: {
			validate() {
				// console.log('validate')
				this.$validator.validateAll()
			},
			saveBirthdayDate(date) {
				this.$refs.menu.save(date)
			},
			saveDate() {
				// console.log('saveDate')
				this.modalDate = false
			},
			removeNationality(item) {
				const index = this.userResume.personal_data.nationalities.indexOf(item)
				if (index >= 0) {
					this.userResume.personal_data.nationalities.splice(index, 1)
				}
			},
			removeLanguage(item) {
				const index = this.userResume.languages.indexOf(item)
				if (index >= 0) {
					this.userResume.languages.splice(index, 1)
				}
			},
			pickFile() {
				this.$refs.image.click()
			},
			onFilePicked(e) {
				const files = e.target.files
				// console.log('files: ', files)
				if (files[0]) {
					this.uploadingNewImage = true
					this.userResume.uploads = this.userResume.uploads.filter(
						upload => upload.type !== 'profile_picture'
					)
					this.userResume.uploads.push({
						file: files[0],
						name: files[0].name,
						type: 'profile_picture',
						size_in_bytes: parseInt(files[0].size),
						new: true
					})

					this.imageName = files[0].name
					const fileReader = new FileReader()
					fileReader.readAsDataURL(files[0])
					fileReader.addEventListener('load', () => {
						this.imageUrl = fileReader.result
						this.uploadingNewImage = false
					})
				}
			},
			// onChange (color) {
			//     console.log(color)
			// },
			// addUpload () {
			//     this.userResume.uploads = [{ name: 'abc'}]
			// },
			removeCurrentPicture() {
				this.userResume.uploads = this.userResume.uploads.filter(
					upload => upload.type !== 'profile_picture'
				)
				this.imageUrl = ''
				this.imageName = ''
			}
		},
		watch: {
			menu(val) {
				val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
			}
		}
	}
</script>

<style scoped>
	.v-input__slot {
		padding-top: 12px;
	}
	.valign-top {
		vertical-align: top;
	}
	.red-border {
		border: 3px solid var(--v-error-lighten1);
	}

	>>> .no-underline.v-text-field > .v-input__control > .v-input__slot:before {
		border-style: none;
	}
	>>> .no-underline.v-text-field > .v-input__control > .v-input__slot:after {
		border-style: none;
	}
</style>