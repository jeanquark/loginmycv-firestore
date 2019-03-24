import Vue from 'vue'
import Vuetify from 'vuetify'

// Vue.use(Vuetify)
Vue.use(Vuetify, {
	theme: {
    	primary: '#7a528f', // light purple
    	// primary: '#8b679d',
    	// secondary: '#424242',
    	secondary: '#FFC107', // amber
    	accent: '#82B1FF',
    	error: '#ff4444',
    	info: '#33b5e5',
    	success: '#00C851',
    	warning: '#ffbb33'
	},
	options: {
		customProperties: true
	}
})