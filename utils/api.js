const apis = {
  baseUrl: process.env.API_ENDPOINT || 'https://api-intranet.dev.gobysend.com/api',

  auth: {
    login: '/login',
    logout: '/logout',
    refreshToken: '/refreshToken',
  },

  user: {
    list: '/user',
  }
}

export default apis;
