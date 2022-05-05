import apis from '../utils/api';
export default function({ app, $axios }) {
  // Set default baseUrl
  $axios.setBaseURL(process.env.API_ENDPOINT);

  // Parse response
  $axios.onResponse(response => {
    if (response.status === 200) {
      const body = response.data;

      const code = body.code;

      //success
      if (code === 200) {
        const newResponse = {};
        ['message', 'data'].forEach(key => {
          if (body.hasOwnProperty(key)) {
            newResponse[key] = body[key];
          }
        });
        return newResponse;
      }

      if (code === 401) {
        console.log('Token is expired');
        if (app.context.route.path != '/login') window.location.href = app.localePath('login');
      }

      return Promise.reject({
        ...body,
        status: response.status,
        config: response.config
      });
    } else {
      return Promise.reject({
        ...body,
        status: response.status,
        config: response.config
      });
    }
  });

  // This section is a listener which listening for 401 response status from API
  // to detect user is not authorized yet, then trying to refresh the token
  $axios.onError(async ({ status, config, code, message, errors }) => {
    // Only intercept requests with status 401
    // Don't intercept refresh token requests
    // And check if user is logged in and tokens are available

    if (
      status !== 401 ||
      !app.$auth ||
      config.url === app.$auth.strategy.options.endpoints.refresh.url ||
      !app.$auth.check()
    ) {
      return Promise.reject({ code, message, errors });
    }

    // Refresh tokens before retrying current request
    if (status === 401) {
      await app.$auth.refreshTokens().catch(error => {
        // Tokens couldn't be refreshed. Force reset.
        $auth.reset();
        throw error;
      });
    }

    // Set `isRetryRequest` flag to true
    config.__isRetryRequest = true;

    // Update Authorization header
    config.headers[app.$auth.strategy.options.token.name] = app.$auth.token.get();

    // Retry original request
    return $axios.request(config);
  });
}
