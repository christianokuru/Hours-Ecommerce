// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Hours Collection',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // for png
        // { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // or for SVG
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxtjs/color-mode', '@pinia/nuxt', '@vueuse/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  colorMode: {
    classSuffix: ''
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})