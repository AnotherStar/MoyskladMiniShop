export default {
    components: true,

    modules: [
        //
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
    ],

    build: {
        filenames: {
            app: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
            chunk: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
        },
    },

    ignorePrefix: '-',

    serverMiddleware: [
        //
        { path: '/api', handler: '~/serverMiddleware/index.js' },
    ],
};
