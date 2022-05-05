require('dotenv').config();
import { languages, defaultLocale } from './lang/index';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Self service admin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/fonts/svn-poppins.css',
    '~/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui', '@/plugins/axios.js', '@/plugins/moment.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',

    // I18n
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'vi', iso: 'vi-VI', name: 'Tiếng Việt', file: 'vi-VI.js' },
          { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.js' },
        ],
        defaultLocale: defaultLocale,
        vueI18n: {
          fallbackLocale: defaultLocale,
          messages: Object.assign(languages),
          silentFallbackWarn: true,
        },
        detectBrowserLanguage: false,
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['auth'],
    trailingSlash: false,
  },

  auth: {
    strategies: {
      local: {
        scheme: '~/schemes/goby-auth.scheme',

        token: {
          property: 'access_token',
          data: 'access_token',
          maxAge: parseInt(process.env.TOKEN_EXPIRES_MINUTES || 60) * 60, // seconds
          type: 'Bearer',
        },

        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token', //can be used to set the name of the property you want to send in the request.
          //maxAge: parseInt(process.env.TOKEN_EXPIRES_MINUTES || 240) * 2 * 60 // seconds
        },

        user: {
          property: 'user',
        },

        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'get' },
          user: { url: '/user/info', method: 'get' },
          refresh: { url: '/token-refresh', method: 'post' },
        },
      },
    },

    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },

    plugins: [{ src: '@/plugins/auth/refresh-token.js' }],
  },
};
