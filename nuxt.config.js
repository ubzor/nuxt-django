export default {
    buildDir: '../.nuxt',
    rootDir: 'client',

    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/google-analytics',
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/apollo',
        'cookie-universal-nuxt',
    ],

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    plugins: [
        { src: '~/plugins/vue-timers', mode: 'client' },
        { src: '~/plugins/vue-awesome-countdown', mode: 'client' },
        { src: '~/plugins/persisted-state', ssr: false },
    ],

    server: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    },

    axios: {
        baseURL: process.env.API_URL
    },

    apollo: {
        clientConfigs: {
            default: '~/plugins/apollo-client.js',
        },
        authenticationType: 'JWT',
    },

    components: true,

    head: {
        script: [],
        link: [
            // {
            //     rel: 'preload',
            //     as: 'style',
            //     href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
            //     body: true,
            // },
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
        ],
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
    },

    styleResources: {
        sass: [
            // '~/assets/variables.sass',
        ],
    },

    vuetify: {
        optionsPath: './vuetify.config.js',
        treeShake: true,
    },

    googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID,
        debug: {
            // enabled: true,
            // sendHitTask: true
        }
    },
}
