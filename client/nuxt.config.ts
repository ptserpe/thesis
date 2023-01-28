// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth'
    ],
    typescript: {
        strict: true
    },
    app: {
        head: {
            charset: 'utf-8',
            meta: [
                { name: 'viewport', content: 'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
            ],
            htmlAttrs: {
                class: ['h-full', 'bg-gray-800']
            }
        }
    },
    auth: {
        enableGlobalAppMiddleware: true,
        origin: "http://localhost:3000",
    },
    build: {
        transpile: [
            "@heroicons/vue",
        ]
    },
    runtimeConfig: {
    },
})
