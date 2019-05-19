<template>
    <div class="text-xs-center pa-4" style="margin-top: 0px;" v-if="userResume">
        <p>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            userSkills: {{ userSkills }}<br /><br />
        </p>
        <h2>Skills</h2><br />
        <v-alert
            :value="true"
            color="warning"
            icon="priority_high"
            outline
            v-if="!userResume.skills || userResume.skills.length < 1"
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
                        class="headline justify-center"
                        primary-title
                    >
                        Add a new skill
                    </v-card-title>
                

                    <v-card-text>
                        userSkillsCategories: {{ userSkillsCategories }}<br />
                        userSkillsSubCategories: {{ userSkillsSubCategories }}<br />
                        <v-layout row wrap align-center>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="newSkillCategory.name"
                                    label="Category name"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-btn small color="primary" @click="addSkillCategory">Add category</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap align-center>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="newSkillSubCategory.name"
                                    label="Subcategory name"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-btn small color="secondary" @click="addSkillSubCategory">Add subcategory</v-btn>
                            </v-flex>
                        </v-layout>

                        <br /><br />
                        <v-layout row wrap class="justify-center">
                            <!-- <v-flex xs4 offset-xs8 class="justify-center">
                                <v-checkbox color="secondary" label="Provide measured value" v-model="newSkill.measure"></v-checkbox>
                            </v-flex> -->
                            <v-flex xs8 offset-xs1 class="text-xs-center" style="border: 1px solid orange; border-radius: 10px; padding: 0px 10px;">
                                <v-checkbox class="text-xs-center" color="secondary" label="Provide measured value" v-model="newSkill.measure"></v-checkbox>
                                <v-radio-group row v-model="newSkill.type" v-if="newSkill.measure">
                                    <v-radio
                                        label="Pie"
                                        value="pie"
                                        color="secondary"
                                    ></v-radio>
                                    <v-radio
                                        label="Bar"
                                        value="bar"
                                        color="secondary"
                                    ></v-radio>
                                </v-radio-group>
                                <v-radio-group row v-model="newSkill.maxValue" v-if="newSkill.measure">
                                    <v-radio
                                        label="Max 10"
                                        :value="10"
                                        color="secondary"
                                    ></v-radio>
                                    <v-radio
                                        label="Max 100"
                                        :value="100"
                                        color="secondary"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                        <br />

                        <v-layout row wrap>
                            <v-flex xs6 class="pr-2">
                                <v-select
                                    :items="userSkillsCategories"
                                    label="Category"
                                ></v-select>
                            </v-flex>

                            <v-flex xs6 class="pl-2">
                                <v-select
                                    :items="userSkillsSubCategories"
                                    label="Subcategory"
                                ></v-select>
                            </v-flex>
                        </v-layout>

                        <v-text-field
                            v-model="newSkill.name"
                            label="Skill name"
                            :counter="30"
                        ></v-text-field>

                        <v-slider
                            v-model="newSkill.value"
                            label="Skill Value"
                            :max="newSkill.maxValue ? newSkill.maxValue : 100"
                            :min="0"
                            :step="newSkill.maxValue ? newSkill.maxValue/10 : 10"
                            color="secondary"
                        ></v-slider>
                        <div class="text-xs-center">
                            {{ newSkill.value }}/{{ newSkill.maxValue ? newSkill.maxValue : 10 }}
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="success" @click="addSkillCategory(newSkillCategory)">Add Skill</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
            <v-expansion-panel-content
                v-for="(skillCategory, index) in userSkills" :key="index"
            >
                <div slot="header">
                    <v-icon small @click.native.stop="deleteItem(index)">cancel</v-icon>
                    {{ skillCategory.name }}
                </div>
                <!-- index: {{ parentIndex }}<br /><br /> -->
                <!-- skills: {{ skills }}<br /><br /> -->
                <!-- skills[parentIndex]: {{ skills[parentIndex] }}<br /><br /> -->
                <!-- candidateSkills[parentIndex]['children']: {{ candidateSkills[parentIndex]['children'] }}<br /><br /> -->
                <!-- skills[parentIndex]['children'][0]: {{ skills[parentIndex]['children'][0] }}<br /><br /> -->
                <!-- candidateSkills: {{ candidateSkills }}<br /><br /> -->
                <!-- skillCategory: {{ skillCategory }}<br /><br /> -->
                <!-- parentIndex: {{ parentIndex }}<br /><br /> -->
                <v-card>
                    <v-card-text style="background: black; margin-bottom: 30px;">
                        <v-layout row wrap>
                            <v-alert
                                :value="true"
                                color="warning"
                                icon="priority_high"
                                outline
                                v-if="!userSkills[index] || userSkills[index].length < 1"
                            >
                                You have no item in this category, please hit the small rounded pink button to add one
                            </v-alert>
                            <!-- <v-flex xs12 sm4 style="padding: 10px;" v-for="(skill, childIndex) in userSkills" :key="childIndex"> -->
                            <v-flex xs12 sm6 style="padding: 10px;">
                                index: {{ index }}<br />
                                <!-- parentIndex: {{ parentIndex }}<br /> -->
                                <!-- childIndex: {{ childIndex }}<br /> -->
                                <!-- skill: {{ skill }}<br /> -->

                                <v-text-field
                                    v-model="userSkills[index].name"
                                    label="Skill name"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 style="padding: 10px;">
                                <!-- <v-text-field
                                    v-model="userSkills[index].category"
                                    label="Skill category"
                                    :counter="30"
                                ></v-text-field> -->
                                <!-- userSkillsCategories: {{ userSkillsCategories }}<br /> -->
                                <v-select
                                    v-model="userSkills[index].category"
                                    :items="userSkillsCategories"
                                    label="Skill Category"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm6 style="padding: 10px;">
                                <!-- <v-text-field
                                    v-model="userSkills[index].subcategory"
                                    label="Skill subcategory"
                                    :counter="30"
                                ></v-text-field> -->
                                <v-select
                                    v-model="userSkills[index].subcategory"
                                    :items="userSkillsSubCategories"
                                    label="Skill Subcategory"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm6 style="padding: 10px;">
                                <v-slider
                                    v-model="userSkills[index].value"
                                    label="Skill Value"
                                    :max="userSkills[index].maxValue ? userSkills[index].maxValue : 100"
                                    :min="0"
                                    :step="userSkills[index].maxValue ? userSkills[index].maxValue/10 : 10"
                                    color="secondary"
                                ></v-slider>
                                <div class="text-xs-center">
                                    {{ userSkills[index].value }}/{{ userSkills[index].maxValue ? userSkills[index].maxValue : 100 }}
                                </div>
                            </v-flex>

                            <v-flex xs12 sm6 style="padding: 10px;">
                                Graphical representation
                                <v-radio-group row v-model="userSkills[index].type">
                                    <v-radio
                                        label="Pie"
                                        value="pie"
                                        color="secondary"
                                    ></v-radio>
                                    <v-radio
                                        label="Bar"
                                        value="bar"
                                        color="secondary"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>

                            <v-flex xs12 sm6 style="padding: 10px;">
                                Max value
                                <v-radio-group row v-model="userSkills[index].maxValue">
                                    <v-radio
                                        label="10 - increment by 1"
                                        :value="10"
                                        color="secondary"
                                    ></v-radio>
                                    <v-radio
                                        label="100 - increment by 10"
                                        :value="100"
                                        color="secondary"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap align-center>
                            
                        </v-layout>
                        <v-layout row wrap align-center>
                            <v-flex xs8 sm4>
                                <v-text-field
                                    v-model="newSkillCategory.name"
                                    label="Category name"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2>
                                <v-btn small color="primary" @click="addSkillCategory">Add category</v-btn>
                            </v-flex>
                            <v-flex xs8 sm4>
                                <v-text-field
                                    v-model="newSkillSubCategory.name"
                                    label="Subcategory name"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2>
                                <v-btn small color="secondary" @click="addSkillSubCategory">Add subcategory</v-btn>
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
        mounted () {
            // this.userSkillsCategories.push(this.userResume.skills.map(skill => skill.category).filter((v, i, a) => a.indexOf(v) === i && v != null))
            if (this.userResume) {
                this.userResume.skills.forEach(skill => {
                    if (!this.userSkillsCategories.includes(skill.category)) {
                        this.userSkillsCategories.push(skill.category)
                    }
                })
                this.userResume.skills.forEach(skill => {
                    if (skill.subcategory != null && !this.userSkillsSubCategories.includes(skill.subcategory)) {
                        this.userSkillsSubCategories.push(skill.subcategory)
                    }
                })
            }
        },
        data () {
            return {
                resumeSlug: '',
                modalCategory: false,
                modalSkill: false,
                reference: '',
                newSkillCategory: {
                    name: '',
                    // slug: '',
                    // children: []
                },
                newSkillSubCategory: {
                    name: ''
                },
                newSkill: {
                    name: '',
                    slug: '',
                    value: null,
                    measure: true,
                    type: 'bar',
                    maxValue: 100,
                },
                items: [
                    'abc',
                    'def'
                ],
                userSkillsCategories: [],
                userSkillsSubCategories: []
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
            userSkills () {
                return this.userResume.skills
                // const userResume = this.$store.getters['resumes/loadedUserResumes'].find(resume => resume.slug === this.resumeSlug)
                // if (userResume) {
                //     return userResume.skills
                // }
                // return null
            },
            // fetchUserSkillsCategories () {
            //     this.userSkillsCategories.push(this.userResume.skills.map(skill => skill.category).filter((v, i, a) => a.indexOf(v) === i && v != null))
            //     return
            //     // return this.userResume.skills.map(skill => skill.category).filter((v, i, a) => a.indexOf(v) === i && v != null)
            // },
            // userSkillsSubCategories () {
            //     return this.userResume.skills.map(skill => skill.subcategory).filter((v, i, a) => a.indexOf(v) === i && v != null)
            // },
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
            addSkillCategory () {
                console.log('addSkillCategory')
                if (this.newSkillCategory.name && !this.userSkillsCategories.includes(this.newSkillCategory.name)) {
                    this.userSkillsCategories.push(this.newSkillCategory.name)
                    this.newSkillCategory = {}
                }
            },
            addSkillSubCategory () {
                if (this.newSkillSubCategory && !this.userSkillsSubCategories.includes(this.newSkillSubCategory.name)) {
                    this.userSkillsSubCategories.push(this.newSkillSubCategory.name)
                    this.newSkillSubCategory = {}
                }
            },
            addSkillCategory2 (newSkillCategory) {
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
            deleteItem (index) {
                console.log('index: ', index)
                this.userSkills.splice(index, 1)
            }
        }
    }
</script>

<style scoped>
    .v-input--selection-controls {
        margin-top: 10px;
    }
</style>