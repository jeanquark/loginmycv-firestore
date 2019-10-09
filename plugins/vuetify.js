import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1",
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

export default ctx => {
    const vuetify = new Vuetify({
        theme: {
            dark: true, // From 2.0 You have to select the theme dark or light here
            themes: {
                light: {
                    primary: '7A528F', // light purple
                    accent: 'E0E0E0', // grey lighten-1
					secondary: '#FFC107', // amber
					tertiary:'#E11566', // pink
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent4
                },
                dark: {
					primary: '7A528F', // light purple
                    accent: 'E0E0E0', // grey lighten-1
					secondary: '#FFC107', // amber
					tertiary:'#E11566', // pink
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent4
				}
            },
            options: {
                customProperties: true
            }
        }
    })

    ctx.app.vuetify = vuetify
    ctx.$vuetify = vuetify.framework
}
