export default {
    buildDir: '../.nuxt',
    rootDir: 'app',

    modules: [
        '@nuxtjs/axios',
        // '@nuxtjs/auth-next',
    ],

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    plugins: [
        '~/plugins/axios',
        '~/plugins/persisted-state',
        '~/plugins/vue-awesome-countdown',
    ],

    head: {
        script: [],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
        ],
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
    },

    server: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    },

    router: {
        // middleware: [
        //     'auth',
        // ]
    },

    // auth: {
    //     redirect: {
    //         login: '/auth/login',
    //         logout: '/',
    //         callback: '/auth/login',
    //         home: '/'
    //     },
    //     strategies: {
    //         jwt: {
    //             scheme: '~/schemes/jwt',
    //             endpoints: {
    //                 login: { url: 'api/v1/auth/jwt/create/', method: 'POST', },
    //                 user: { url: 'api/v1/auth/users/me/', method: 'GET', },
    //             },
    //             token: 'JWT',
    //         }
    //     },
    // },

    axios: {
        baseURL: process.env.API_URL
    },

    components: true,
}
