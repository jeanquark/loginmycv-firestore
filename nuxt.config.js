require('dotenv').config()
// const webpack = require('webpack')

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'loginmycv',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
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
    ],
    axios: {
        proxyHeaders: false
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
    ],
    serverMiddleware: [
        '~/serverMiddleware/validateFirebaseIdToken',
        // {
        //     path: '/',
        //     handler: '~/serverMiddleware/validateFirebaseIdToken'
        // },
        {
            path: '/register-new-user', // POST request
            handler: '~/serverMiddleware/registerNewUser'
        },
        // {
        //     path: '/resume',
        //     handler: '~/serverMiddleware/getResume'
        // },
        {
            path: '/check-user-authorization', // POST request with auth user id & candidate username as body
            handler: '~/serverMiddleware/checkUserAuthorization'
        },
        {
            path: '/fetch-short-resumes',
            handler: '~/serverMiddleware/fetchShortResumes'
        },
        {
            path: '/create-resume-authorization',
            handler: '~/serverMiddleware/createResumeAuthorization'
        },
        {
            path: '/update-resume-authorization',
            handler: '~/serverMiddleware/updateResumeAuthorization'
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
            handler: '~/serverMiddleware/createNewResume'
        },
        {
            path: '/update-resume', // POST request
            handler: '~/serverMiddleware/updateResume'
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
    dev: (process.env.NODE_ENV !== 'production')
}

