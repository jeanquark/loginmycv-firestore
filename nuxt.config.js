require('dotenv').config()
// const webpack = require('webpack')
// For database seeds, see services/firebase-admin-init.js file

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'LoginMyCV',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Your online CV provider' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.min.css' }
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
            }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/axios', // Important! Allow us to make asyncData requests inside pages
        // [
        //     'nuxt-validate', {
        //         lang: 'en'
        //     }
        // ],
        // ['vue-scrollto/nuxt', { duration: 1500 }],
        [
            "nuxt-fontawesome",
            {
                // component: "fa",
                imports: [
                    // import whole set
                    {
                        set: "@fortawesome/free-solid-svg-icons",
                        icons: ["fas"]
                    },
                    {
                        set: "@fortawesome/free-brands-svg-icons",
                        icons: ["fab"]
                    }
                ]
            }
        ],
        'nuxt-client-init-module',
        ['fullpage-nuxt'],
		['@nuxtjs/google-analytics', 
			{
            	id: 'UA-71694605-8'
			}
		],
		'@nuxtjs/sentry'
    ],
    axios: {
        proxyHeaders: false
	},
	sentry: {
		// dsn: 'https://3d8ab8e981ad451d8a0b2755e09e7df7@sentry.io/1507843', // Enter your project's DSN here
		// dsn: process.env.SENTRY_DSN,
		dsn: process.env.NODE_ENV !== 'production' ? '' : process.env.SENTRY_DSN,
		// disabled: process.env.NODE_ENV !== 'production' ? true : false,
		config: {
		}, // Additional config
	},
    plugins: [
        { src: '~/plugins/vuetify', ssr: true },
        { src: '~/plugins/firebase-client-init', ssr: false },
        { src: '~/plugins/auth-cookie', ssr: false }, // Cookie for authenticated users
        { src: '~/plugins/vuex-persist', ssr: false },
        { src: '~/plugins/vue-moment', ssr: false },
        { src: '~/plugins/vue-notifications', ssr: false },
        { src: '~/plugins/vee-validate', ssr: false },
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // })
        { src: '~/plugins/jquery-3.3.1.min.js', ssr: false },
        // { src: '~/plugins/jm-essai.js', ssr: false },
        { src: '~/plugins/vue-scroll-reveal', ssr: false },
        { src: '~/plugins/vue-scrollto', ssr: false },
        { src: '~/plugins/vue2-scrollspy', ssr: false },
        // { src: '~/plugins/vue-draggable', ssr: false },
        // { src: '~/plugins/fullpage-vue', ssr: false },
        // { src: '~/plugins/vue-stripe-checkout', ssr: false },
        { src: '~/plugins/ga.js', ssr: false },
		// { src: '~/plugins/snackbarstack', ssr: false },
		{ src: '~/plugins/vue-masonry-css', ssr: false },
    ],
    serverMiddleware: [
        '~/serverMiddleware/validateFirebaseIdToken',
        // {
        //     path: '/',
        //     handler: '~/serverMiddleware/validateFirebaseIdToken'
        // },
        {
            path: '/register-new-user', // POST request
            handler: '~/serverMiddleware/users/registerNewUser'
        },
        {
            path: '/set-custom-claims', // POST request
            handler: '~/serverMiddleware/users/setCustomClaims'
        },
        {
            path: '/delete-user', // POST request
            handler: '~/serverMiddleware/users/deleteUser'
        },
        // {
        //     path: '/resume',
        //     handler: '~/serverMiddleware/getResume'
        // },
        {
            path: '/check-user-authorization', // POST request with auth user id & candidate username as body
            handler: '~/serverMiddleware/authorizations/checkUserAuthorization'
        },
        {
            path: '/fetch-short-resumes',
            handler: '~/serverMiddleware/resumes/fetchShortResumes'
        },
        // {
            //     path: '/create-resume-authorization', // POST request
            //     handler: '/serverMiddleware/createResumeAuthorization'
            // },
            // {
                //     path: '/update-resume-authorization', // POST request
                //     handler: '~/serverMiddleware/updateResumeAuthorization'
                // }
        {
            path: '/create-new-resume', // POST request
            handler: '~/serverMiddleware/resumes/createNewResume'
        },
        {
            path: '/update-resume', // POST request
            handler: '~/serverMiddleware/resumes/updateResume'
        },
                // {
        //     path: '/delete-resume-upload', // POST request
        //     handler: '~/serverMiddleware/deleteResumeUpload'
        // }
        {
            path: '/send-contact-form-message', // POST request
            handler: '~/serverMiddleware/sendContactFormMessage'
        },
        {
            path: '/create-resume-authorization',
            handler: '~/serverMiddleware/authorizations/createResumeAuthorization'
        },
        {
            path: '/update-resume-authorization',
            handler: '~/serverMiddleware/authorizations/updateResumeAuthorization'
        },
        {
            path: '/delete-resume-authorization', // POST request
            handler: '~/serverMiddleware/authorizations/deleteResumeAuthorization'
        },
        // {
        //     path: '/check-resume-slug', // POST request
        //     handler: '~/serverMiddleware/resumes/checkResumeSlug'
        // }
        {
            path: '/fetch-long-resumes',
            handler: '~/serverMiddleware/resumes/fetchLongResumes'
        },
        {
            path: 'update-user-tokens',
            handler: '~/serverMiddleware/updateUserTokens'
        },
        {
            path: '/stripe-payments',
            handler: '~/serverMiddleware/payments/stripePayments'
        }
    ],
    css: ["~/assets/style/app.styl"],
    /*
    ** Build configuration
    */
    build: {
        vendor: ['vee-validate'],
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    dev: (process.env.NODE_ENV !== 'production'),
    loading: {
        color: '#7a528f'
    }
}

