// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],

  nitro: {
    preset: 'node_server',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      (await import('@tailwindcss/vite')).default(),
    ],
  },

  fonts: {
    families: [
      { name: 'Merriweather', provider: 'google', weights: [400, 700] },
      { name: 'Inter', provider: 'google', weights: [200, 300, 400, 500, 600] },
    ],
  },

  runtimeConfig: {
    chatApiBase: '',
  },

  // eslint: {
  //   config: {
  //     stylistic: true,
  //   },
  // },
})
