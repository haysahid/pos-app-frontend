export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pos-app-frontend',
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
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vs-pagination',
    '@/plugins/to-currency-string',
    '@/plugins/toast-status',
    '@/plugins/shipping-api',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-sweetalert2',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:8000/api/',
    // prefix: 'http://localhost:8000/api/',
    proxy: true,
  },

  proxy: {
    // API 1
    '/api/': {
      // target: 'http://127.0.0.1:8000/api/',
      target: process.env.API_1,
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },

    // API 2
    '/api2/': {
      target: process.env.API_2,
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api2/': '' },
    },

    // IMG
    '/storage/': {
      target: process.env.IMG_URL,
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/storage/': '' },
    }
  },

  env: {
    imgUrl: '/storage/',
  },

  // Authentication
  auth: {
    strategies: {
      local: {
        token: {
          property: 'result.access_token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'result.user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/profile', method: 'get' }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  server: {
    host: "0.0.0.0"
  }
}
