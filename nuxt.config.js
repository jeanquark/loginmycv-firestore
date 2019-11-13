require('dotenv').config()

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
		'@plugins/vuetify',
		{ src: '~/plugins/vuetify', ssr: true },
        { src: '~/plugins/firebase-client-init', ssr: false },
        { src: '~/plugins/auth-cookie', ssr: false }, // Cookie for authenticated users
        { src: '~/plugins/vuex-persist', ssr: false },
        { src: '~/plugins/vue-moment', ssr: false },
        { src: '~/plugins/vue-notifications', ssr: false },
        { src: '~/plugins/vee-validate', ssr: false },
        // { src: '~/plugins/jquery-3.3.1.min.js', ssr: false },
        { src: '~/plugins/vue-scroll-reveal', ssr: false },
        { src: '~/plugins/vue-scrollto', ssr: false },
        { src: '~/plugins/vue2-scrollspy', ssr: false },
        { src: '~/plugins/ga.js', ssr: false },
		{ src: '~/plugins/vue-masonry-css', ssr: false },
		{ src: '~/plugins/vue-infinite-loading', ssr: false },
	],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
		'@nuxtjs/dotenv',
        '@nuxtjs/axios', // Important! Allow us to make asyncData requests inside pages
        [
            "nuxt-fontawesome",
            {
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
		'@nuxtjs/sentry',
		'nuxt-leaflet',
	],
	sentry: {
		dsn: 'https://3d8ab8e981ad451d8a0b2755e09e7df7@sentry.io/1507843', // Enter your project's DSN here
		config: {}, // Additional config
	},
	axios: {
        proxyHeaders: false
	},
	serverMiddleware: [
		'~/serverMiddleware/validateFirebaseIdToken',
		// Users middleware
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
        {
            path: '/check-user-authorization', // POST request with auth user id & candidate username as body
            handler: '~/serverMiddleware/authorizations/checkUserAuthorization'
		},
		{
            path: 'update-user-tokens',
            handler: '~/serverMiddleware/updateUserTokens'
		},
		// Resumes middleware
        {
            path: '/fetch-short-resumes',
            handler: '~/serverMiddleware/resumes/fetchShortResumes'
        },
        {
            path: '/create-new-resume', // POST request
            handler: '~/serverMiddleware/resumes/createNewResume'
        },
        {
            path: '/update-resume', // POST request
            handler: '~/serverMiddleware/resumes/updateResume'
		},
		{
            path: '/fetch-long-resumes',
            handler: '~/serverMiddleware/resumes/fetchLongResumes'
        },
        {
            path: '/send-contact-form-message', // POST request
            handler: '~/serverMiddleware/sendContactFormMessage'
		},
		// Authorizations middleware
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
		// Payments middleware
        {
            path: '/stripe-payments',
            handler: '~/serverMiddleware/payments/stripePayments'
        }
	],
    /*
     ** Build configuration
     */
    build: {
		vendor: ['vee-validate'],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
	},
	dev: (process.env.NODE_ENV !== 'production'),
}
