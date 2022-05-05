export const http = {
  get(url, options = {}) {
    return $nuxt.$axios({url: url, method: 'GET', options})
  },

  post(url, data = {}) {
    return $nuxt.$axios({url: url, method: 'POST', data})
  },

  put(url, data = {}) {
    return $nuxt.$axios({url: url, method: 'PUT', data})
  },

  patch(url, data = {}) {
    return $nuxt.$axios({url: url, method: 'PATCH', data})
  },

  delete(url, data = {}) {
    return $nuxt.$axios({url: url, method: 'DELETE', data})
  },
};

export default http;
