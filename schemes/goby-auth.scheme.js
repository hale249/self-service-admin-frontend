import RefreshScheme from '@nuxtjs/auth-next/dist/schemes/refresh';

export default class GobyAuthScheme extends RefreshScheme {
  /**
   * Override login method of local scheme
   */
  async login(endpoint, { reset = true } = {}) {
    if (!this.options.endpoints.login) {
      return;
    }
    // Ditch any leftover local tokens before attempting to log in
    if (reset) {
      this.$auth.reset();
    }
    // Add client id to payload if defined
    if (this.options.clientId) {
      endpoint.data.client_id = this.options.clientId;
    }
    // Add grant type to payload if defined
    if (this.options.grantType) {
      endpoint.data.grant_type = this.options.grantType;
    }

    // Make login request
    const response = await this.$auth.request(endpoint, this.options.endpoints.login);

    // Update tokens
    this._updateTokens(response);

    // Set expiration time for refresh token, x1.5 expiration time of access_token
    // const refreshExpiry = this.$auth.ctx
    //   .$moment()
    //   .add(response.data.expires_in * 1.5, "seconds")
    //   .valueOf();
    // this.$auth.$storage.setUniversal(
    //   "_refresh_token_expiration.local",
    //   refreshExpiry
    // );

    // Fetch user if `autoFetch` is enabled
    if (this.options.user.autoFetch) {
      await this.fetchUser();
    }

    // Set username into localStorage, which is useful for session expired resume
    const username = endpoint.data.username;
    if (username) {
      this.$auth.$storage.setUniversal('username', username);
    }

    this.$auth.redirect('home');
    return response;
  }

  /**
   * Override fetchUser method
   */
  async fetchUser(endpoint) {
    // Token is required but not available
    if (!this.check()) {
      return;
    }

    // User endpoint is disabled
    if (!this.options.endpoints.user) {
      this.$auth.setUser({});
      return;
    }

    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then(async response => {
        const user = response.data.user;
        this.$auth.setUser(user);

        return response;
      })
      .catch(error => {
        console.log(error);
        this.$auth.callOnError(error, { method: 'fetchUser' });
      });
  }

  async logout() {
    let endpoint = {
      data: {
        deviceInfo: { deviceId: localStorage.getItem('deviceId') }
      }
    };

    // Only connect to logout endpoint if it's configured
    if (this.options.endpoints.logout) {
      await this.$auth.request(endpoint, this.options.endpoints.logout).catch(() => {
        //
      });
    }

    // But reset regardless
    this.$auth.reset();
    this.$auth.redirect('login');
  }
}
