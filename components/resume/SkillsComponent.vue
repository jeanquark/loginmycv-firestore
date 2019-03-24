<template>
    <div class="text-xs-center" style="padding: 30px; margin-top: 0px;" v-if="userResume">
        <p>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
        </p>
        <!-- userSkills: {{ userSkills }}<br /><br /> -->
        <h2>Skills</h2><br />
        <v-alert
            :value="true"
            color="warning"
            icon="priority_high"
            outline
            v-if="!userResume.skills.length > 0"
        >
            You have no item here, please click on the rounded pink button to add one
        </v-alert>
        <v-expansion-panel>
            <v-dialog
                v-model="modalCategory"
                width="500"
                activator
            >
                <v-btn
                    fab
                    absolute
                    bottom
                    right
                    color="pink"
                    slot="activator"
                >
                    <v-icon>add</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title
                        class="headline"
                        primary-title
                    >
                        Add a new skill category
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            v-model="newSkillCategory.name"
                            label="Category name"
                            :counter="10"
                        ></v-text-field>
                        <!-- <v-text-field
                            v-model="newSkillCategory.slug"
                            label="Category slug"
                            :counter="10"
                        ></v-text-field> -->
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="success" @click="addSkillCategory(newSkillCategory)">Add Skill Category</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
            
            <v-expansion-panel-content
                v-for="(skillCategory, parentIndex) in userSkills" :key="parentIndex"
            >
                <div slot="header">{{ skillCategory.name }}</div>
                <!-- index: {{ parentIndex }}<br /><br /> -->
                <!-- skills: {{ skills }}<br /><br /> -->
                <!-- skills[parentIndex]: {{ skills[parentIndex] }}<br /><br /> -->
                <!-- candidateSkills[parentIndex]['children']: {{ candidateSkills[parentIndex]['children'] }}<br /><br /> -->
                <!-- skills[parentIndex]['children'][0]: {{ skills[parentIndex]['children'][0] }}<br /><br /> -->
                <!-- candidateSkills: {{ candidateSkills }}<br /><br /> -->
                skillCategory: {{ skillCategory }}<br /><br />
                parentIndex: {{ parentIndex }}<br /><br />
                
                
                <v-card>
                    <v-dialog
                        v-model="modalSkill"
                        width="500"
                        activator
                    >
                        <v-btn
                            fab
                            absolute
                            bottom
                            right
                            small
                            color="pink"
                            slot="activator"
                            @click="reference = parentIndex"
                        >
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-card>
                            <v-card-title
                                class="headline"
                                primary-title
                            >
                                Add a new skill for {{ userSkills[parentIndex].name }}
                            </v-card-title>

                            <v-card-text>
                                <v-text-field
                                    v-model="newSkill.name"
                                    label="Skill name"
                                    :counter="10"
                                ></v-text-field>
                                <!-- <v-text-field
                                    v-model="newSkill.slug"
                                    label="Skill slug"
                                    :counter="10"
                                ></v-text-field> -->
                                <!-- <v-text-field
                                    v-model="newSkill.value"
                                    label="Skill value"
                                    number
                                ></v-text-field> -->
                                <v-slider
                                    v-model="newSkill.value"
                                    label="Skill Value"
                                    :max="100"
                                    :min="0"
                                    :step="10"
                                ></v-slider>
                                <div class="text-xs-center">
                                    {{ newSkill.value }}/100
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn class="success" @click="addSkill(reference, newSkill)">Add Skill</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-card-text style="background: black; margin-bottom: 30px;">
                        <v-layout row wrap>
                            <v-alert
                                :value="true"
                                color="warning"
                                icon="priority_high"
                                outline
                                v-if="!userSkills[parentIndex].items.length > 0"
                            >
                                You have no item in this category, please hit the small rounded pink button to add one
                            </v-alert>
                            <v-flex xs12 sm4 style="padding: 10px;;" v-for="(skill, childIndex) in skillCategory.items" :key="childIndex">
                                parentIndex: {{ parentIndex }}<br />
                                childIndex: {{ childIndex }}<br />
                                <!-- <v-chip label @click="remove(index)">-</v-chip> -->
                                <!-- <v-progress-linear
                                    v-model="skills[parentIndex]['children'][childIndex]"
                                    color="primary"
                                    height="20"
                                    value="50"
                                ></v-progress-linear> -->
                                <!-- <v-chip label>+</v-chip> -->

                                <!-- <v-flex xs12 sm4 style="padding: 20px;"> -->
                                    <v-text-field
                                        v-model="userSkills[parentIndex].items[childIndex].name"
                                        label="Name"
                                        :counter="30"
                                    ></v-text-field>
                                <!-- </v-flex> -->
                                <!-- <v-flex xs12 sm4 style="padding: 20px;"> -->
                                    <!-- <v-text-field
                                        v-model="skills[parentIndex].children[childIndex].value"
                                        label="Value"
                                        :counter="30"
                                    ></v-text-field> -->

                                    <v-slider
                                        v-model="userSkills[parentIndex].items[childIndex].value"
                                        label="Value"
                                        :max="100"
                                        :min="0"
                                        :step="10"
                                    ></v-slider>
                                    <div class="text-xs-center">
                                        {{ userSkills[parentIndex].items[childIndex].value }}/100
                                    </div>

                                    <div class="text-xs-center">
                                        <v-btn flat color="error" @click="deleteSkill(parentIndex, childIndex)">Delete</v-btn>
                                    </div>
                                <!-- </v-flex> -->
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
            <!-- <v-card-actions class="justify-center">
                <v-btn class="success" @click="saveSkills">Validate Education</v-btn>
            </v-card-actions> -->
        </v-expansion-panel>
    </div>
</template>

<script>
    export default {
        async created () {
            const resumeSlug = this.$route.params.slug
            console.log('resumeSlug: ', resumeSlug)
            this.resumeSlug = resumeSlug
        },
        data () {
            return {
                resumeSlug: '',
                modalCategory: false,
                modalSkill: false,
                reference: '',
                newSkillCategory: {
                    name: '',
                    slug: '',
                    children: []
                },
                newSkill: {
                    name: '',
                    slug: '',
                    value: null
                },
                // skills: [
                //     {
                //         name: 'Professional skills',
                //         slug: 'professional_skills',
                //         children: [
                //             {
                //                 name: 'Communication',
                //                 slug: 'communication',
                //                 value: 70
                //             },
                //             {
                //                 name: 'Leadershipe',
                //                 slug: 'leadership',
                //                 value: 85
                //             },
                //             {
                //                 name: 'Confidence',
                //                 slug: 'confidence',
                //                 value: 85
                //             }
                //         ]
                //     },
                //     {
                //         name: 'Software skills',
                //         slug: 'software_skills',
                //         children: [
                //             {
                //                 name: 'Adobe Photoshop',
                //                 slug: 'adobe_photoshop',
                //                 value: 85
                //             },
                //             {
                //                 name: 'Adobe Illustrator',
                //                 slug: 'adobe_illustrator',
                //                 value: 85
                //             },
                //             {
                //                 name: 'Adobe Fireworks',
                //                 slug: 'adobe_fireworks',
                //                 value: 40
                //             },
                //             {
                //                 name: 'Gimp 2',
                //                 slug: 'gimp2',
                //                 value: 50
                //             }
                //         ]
                //     }
                // ]
            }
        },
        computed: {
            candidateSkills () {
                return this.userResume.skills
                // return this.$store.getters['index/candidateLongResume'].skills
            },
            userSkills () {
                return this.userResume.skills
                // const userResume = this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                // if (userResume) {
                //     return userResume.skills
                // }
                // return null
            },
            userResume () {
                if (this.resumeSlug) {
                    return this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                } else {
                    return this.$store.getters['resumes/loadedNewResume']
                }
            }
        },
        methods: {
            saveSkills () {
                console.log('saveSkills')
                console.log(this.skills)
            },
            addSkillCategory (newSkillCategory) {
                console.log('addSkillCategory')
                // this.candidateSkills.push({
                this.userResume.skills.push({
                    name: newSkillCategory.name,
                    slug: newSkillCategory.slug,
                    items: []
                })
                this.modalCategory = false
            },
            addSkill (parentIndex, newSkill) {
                // console.log('addSkill')
                // console.log('parentIndex: ', parentIndex)
                // this.candidateSkills[parentIndex].items.push({
                this.userResume.skills[parentIndex].items.push({
                    name: newSkill.name,
                    slug: newSkill.slug,
                    value: newSkill.value
                })
                this.modalSkill = false
            },
            deleteSkill (parentIndex, childIndex) {
                // console.log('parentIndex: ', parentIndex)
                // console.log('childIndex: ', childIndex)
                // console.log(this.candidateSkills[0])
                this.candidateSkills[parentIndex].children.splice(childIndex, 1)
            }
        }
    }
</script>

<style scoped>

</style>