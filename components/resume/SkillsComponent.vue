<template>
    <div class="text-xs-center pa-4" style="margin-top: 0px;" v-if="userResume">
        <p>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- userSkills: {{ userSkills }}<br /><br /> -->
        </p>
        <h2>Skills</h2><br />
        <v-alert
            :value="true"
            color="warning"
            icon="priority_high"
            outline
            v-if="!userResume.skills || userResume.skills.length < 1"
        >
            You have no item in here, please click on the rounded pink button to add one
        </v-alert>
        <v-btn
            fab
            absolute
            bottom
            right
            color="pink"
            @click.stop="openNewSkillModal"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-expansion-panel>
            <v-dialog
                v-model="modalNewSkill"
                width="500"
                persistent
            >
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
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                    label="Skill name"
                                    name="skill_name"
                                    v-validate="{ required: true, max: 2 }"
                                    :error-messages="errors ? errors.collect('skill_name') : null"
                                    data-vv-as="Skill name"
                                    v-model="newSkill.name"
                                    :counter="2"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                    label="Category"
                                    :items="userSkillsCategories"
                                    v-model="newSkill.category"
                                ></v-select>
                            </v-flex>

                            <v-flex xs12>
                                <v-slider
                                    label="Skill Value"
                                    :max="100"
                                    :min="0"
                                    :step="10"
                                    v-model="newSkill.value"
                                    color="secondary"
                                ></v-slider>
                                <div class="text-xs-center">
                                    {{ newSkill.value }}/10
                                </div>
                            </v-flex>



                            <!-- <v-flex xs6 class="pl-2">
                                <v-select
                                    :items="userSkillsSubCategories"
                                    label="Subcategory"
                                ></v-select>
                            </v-flex> -->
                        </v-layout>

                        <v-layout class="justify-center">
                            <v-flex xs12 class="text-xs-center">
                                <!-- <div class="text-xs-center"> -->
                                    <v-radio-group row v-model="newSkill.type" class="justify-center">
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
                                <!-- </div> -->
                            </v-flex>
                        </v-layout>

                        <!-- <br />
                        <hr>
                        <br /> -->

                        <v-layout row wrap align-center>
                            <v-flex xs8>
                                <v-text-field
                                    label="Category name"
                                    name="category_name"
                                    v-validate="{ max: 50 }"
                                    :error-messages="errors ? errors.collect('category_name') : null"
                                    data-vv-as="Category name"
                                    v-model="newSkillCategory"
                                    :counter="50"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-btn small color="primary" @click="addSkillCategory">Add category</v-btn>
                            </v-flex>
                        </v-layout>
                        <!-- <v-layout row wrap align-center>
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
                        </v-layout> -->

                        <br /><br />
                        <v-layout row wrap class="justify-center">
                            <!-- <v-flex xs4 offset-xs8 class="justify-center">
                                <v-checkbox color="secondary" label="Provide measured value" v-model="newSkill.measure"></v-checkbox>
                            </v-flex> -->
                            <!-- <v-flex xs8 offset-xs1 class="text-xs-center" style="border: 1px solid orange; border-radius: 10px; padding: 0px 10px;">
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
                            </v-flex> -->
                        </v-layout>
                        <br />

                        

                        
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="success" :disabled="errors && errors.items && errors.items.filter(item => item.field.includes('skill')).length > 0" @click="addNewSkill()">Add Skill</v-btn>&nbsp;
                        <v-btn flat color="secondary" @click="closeModal">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
            <v-expansion-panel-content
                v-for="(skill, index) in candidateSkills" :key="index"
            >
                <div slot="header">
                    <v-layout align-center>
                        <v-btn style="cursor: move;" icon class="handle ml-0"><v-icon>drag_indicator</v-icon></v-btn>
                        <v-icon @click.native.stop="deleteItem(index)" class="mr-3">cancel</v-icon>
                        <span style="font-size: 1.5em;" :class="{ 'errorTitle': skillErrors[index] }">{{ skill.name }}</span>
                    </v-layout>
                </div>
                <!-- index: {{ parentIndex }}<br /><br /> -->
                <!-- skills: {{ skills }}<br /><br /> -->
                <!-- skills[parentIndex]: {{ skills[parentIndex] }}<br /><br /> -->
                <!-- candidateSkills[parentIndex]['children']: {{ candidateSkills[parentIndex]['children'] }}<br /><br /> -->
                <!-- skills[parentIndex]['children'][0]: {{ skills[parentIndex]['children'][0] }}<br /><br /> -->
                candidateSkills: {{ candidateSkills }}<br /><br />
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
                                v-if="!candidateSkills[index] || candidateSkills[index].length < 1"
                            >
                                You have no item in this category, please hit the small rounded pink button to add one
                            </v-alert>
                            <!-- <v-flex xs12 sm4 style="padding: 10px;" v-for="(skill, childIndex) in candidateSkills" :key="childIndex"> -->
                            <v-flex xs12 sm6 class="pa-3">
                                <!-- index: {{ index }}<br /> -->
                                <!-- parentIndex: {{ parentIndex }}<br /> -->
                                <!-- childIndex: {{ childIndex }}<br /> -->
                                <!-- skill: {{ skill }}<br /> -->

                                <v-text-field
                                    label="Skill name"
                                    :name="`skill_name_${index}`"
                                    v-validate="{ required: true, max: 2 }"
                                    :error-messages="errors ? errors.collect(`skill_name_${index}`) : null"
                                    data-vv-as="Skill name"
                                    v-model="candidateSkills[index].name"
                                    :counter="2"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 class="pa-3">
                                <!-- <v-text-field
                                    v-model="candidateSkills[index].category"
                                    label="Skill category"
                                    :counter="30"
                                ></v-text-field> -->
                                <!-- userSkillsCategories: {{ userSkillsCategories }}<br /> -->
                                <v-select
                                    label="Skill Category"
                                    v-model="candidateSkills[index].category"
                                    :items="userSkillsCategories"
                                ></v-select>
                            </v-flex>

                            

                            <v-flex xs12 sm6 class="pa-3">
                                <v-slider
                                    v-model="candidateSkills[index].value"
                                    label="Skill Value"
                                    :max="candidateSkills[index].maxValue ? candidateSkills[index].maxValue : 100"
                                    :min="0"
                                    :step="candidateSkills[index].maxValue ? candidateSkills[index].maxValue/10 : 10"
                                    color="secondary"
                                ></v-slider>
                                <div class="text-xs-center">
                                    {{ candidateSkills[index].value }}/{{ candidateSkills[index].maxValue ? candidateSkills[index].maxValue : 100 }}
                                </div>
                            </v-flex>

                            <v-flex xs12 sm6 class="pa-3 text-xs-center">
                                <span>Display</span><br />
                                <v-radio-group row v-model="candidateSkills[index].type" class="justify-center">
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

                            <!-- <v-flex xs12 sm6 style="padding: 10px;">
                                Max value
                                <v-radio-group row v-model="candidateSkills[index].maxValue">
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
                            </v-flex> -->
                        </v-layout>

                        <v-layout row wrap align-center class="pa-3">
                            <v-flex xs8 sm4>
                                <v-text-field
                                    label="Category name"
                                    :name="`category_name_${index}`"
                                    v-validate="{ max: 50 }"
                                    :error-messages="errors ? errors.collect(`category_name_${index}`) : null"
                                    data-vv-as="Category name"
                                    v-model="newSkillCategory"
                                    :counter="50"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2>
                                <v-btn small color="primary" @click="addSkillCategory">Add category</v-btn>
                            </v-flex>
                            <!-- <v-flex xs8 sm4>
                                <v-text-field
                                    v-model="newSkillSubCategory.name"
                                    label="Subcategory name"
                                    :counter="30"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2>
                                <v-btn small color="secondary" @click="addSkillSubCategory">Add subcategory</v-btn>
                            </v-flex> -->
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
    import Noty from 'noty'
    export default {
        inject: ['$validator'], // Inject parent validator
        props: ['skillErrors'],
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
                modalNewSkill: false,
                reference: '',
                newSkillCategory2: {
                    name: '',
                    // slug: '',
                    // children: []
                },
                newSkillSubCategory: {
                    name: ''
                },
                newSkillCategory: '',
                newSkill: {
                    name: '',
                    category: '',
                    value: 0,
                    type: 'bar',
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
            errors () {
                return this.$store.getters['errors']
            },
            userSkills2 () {
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
            },
            candidateSkills : {
                get () {
                    return this.userResume.skills
                },
                set (value) {
                    this.userResume.skills = value
                }
            },
        },
        methods: {
            openNewSkillModal () {
                console.log('createNewEducation')
                if (this.userResume.skills && this.userResume.skills.length < 30) {
                    this.modalNewSkill = true
                } else {
                    new Noty({
                        type: 'warning',
                        text: 'No more than 30 items allowed!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show()
                }
            },
            closeModal () {
                this.modalNewSkill = false
                this.newSkill = {}
            },
            addSkillCategory () {
                console.log('addSkillCategory')
                if (this.newSkillCategory && !this.userSkillsCategories.includes(this.newSkillCategory)) {
                    this.userSkillsCategories.push(this.newSkillCategory)
                    this.newSkillCategory = ''
                    new Noty({
                        type: 'success',
                        text: 'New category added!',
                        timeout: 5000,
                        theme: 'metroui'
                    }).show
                }
            },
            addNewSkill () {
                if (this.userResume.skills.length < 10) {
					new Noty({
						type: 'warning',
						text: 'No more than 10 items allowed!',
						timeout: 5000,
						theme: 'metroui'
					}).show()
					return
				}
                // console.log('addSkill')
                // console.log('parentIndex: ', parentIndex)
                // this.candidateSkills[parentIndex].items.push({
                this.modalNewSkill = false
                this.userResume.skills.push({
                    name: newSkill.name,
                    category: newSkill.category,
                    type: newSkill.type,
                    value: newSkill.value
                })
                this.newEducation = {}
                new Noty({
                    type: 'success',
                    text: 'New skill added!',
                    timeout: 5000,
                    theme: 'metroui'
                }).show()
            },
            deleteItem (index) {
                console.log('index: ', index)
                this.candidateSkills.splice(index, 1)
            },



            // saveSkills () {
            //     console.log('saveSkills')
            //     console.log(this.skills)
            // },
            
            // addSkillSubCategory () {
            //     if (this.newSkillSubCategory && !this.userSkillsSubCategories.includes(this.newSkillSubCategory.name)) {
            //         this.userSkillsSubCategories.push(this.newSkillSubCategory.name)
            //         this.newSkillSubCategory = {}
            //     }
            // },
            // addSkillCategory2 (newSkillCategory) {
            //     console.log('addSkillCategory')
            //     // this.candidateSkills.push({
            //     this.userResume.skills.push({
            //         name: newSkillCategory.name,
            //         slug: newSkillCategory.slug,
            //         items: []
            //     })
            //     this.modalCategory = false
            // },
            
            
        }
    }
</script>

<style scoped>
    .v-input--selection-controls {
        margin-top: 10px;
    }
    .errorTitle {
        color: var(--v-error-base);
    }
</style>