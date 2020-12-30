export default {
    buildDir: '../_nuxt',
    rootDir: 'app',

    modules: [
        
    ],

    buildModules: [
        '@nuxtjs/vuetify',
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
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
    },

    server: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    },
}
