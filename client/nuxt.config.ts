// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
    ],
    typescript: {
        strict: true
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
