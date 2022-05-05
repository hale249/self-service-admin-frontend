export default function({ app, store, $auth }) {
  // When user is logged in, we setup an interval to periodically check if the token is expired or not
  // If token is expired, instead of redirecting user to login page, we display the session expired overlay

  setInterval(function() {
    if ($auth.loggedIn) {
      $auth.token.sync();
      $auth.refreshToken.sync();

      // Token is expired or going to expire in next 10 seconds
      // Going to refresh it or redirect user to login page
      const tokenExpiresAt = $auth.token._getExpiration();
      const now = Date.now();
      const secondsLeft = (tokenExpiresAt - now) / 1000;

      if (secondsLeft < 180) {
        // If refresh token is expired, redirect to session expired page
        if ($auth.refreshToken.status().expired()) {
          console.log(
            "Refresh token is expired, redirecting to session-expired page..."
          );

          $auth.reset();
          $auth.redirect("login");
        }

        // Otherwise try to refresh tokens
        else {
          console.log("Token is expired, refreshing it...");

          $auth.refreshTokens().catch(error => {
            console.log(error);
            // Tokens couldn't be refreshed. Force reset.
            $auth.reset();
            $auth.redirect("login");
            throw error;
          });
        }
      }
    }
  }, 30000);
}
