import Vue from 'vue'
import Vuetify from 'vuetify'

// Vue.use(Vuetify)
Vue.use(Vuetify, {
	theme: {
    	primary: '#7A528F', // light purple
    	// primary: '#8b679d',
    	// secondary: '#424242',
		secondary: '#FFC107', // amber
		tertiary: '#E11566',
    	accent: '#82B1FF',
    	error: '#FF4444',
    	info: '#33B5E5',
    	success: '#00C851',
    	warning: '#FFBB33'
	},
	options: {
		customProperties: true
	}
})