(function authGuard() {
  var SESSION_KEY = 'kenosis_session';

  try {
    var raw     = sessionStorage.getItem(SESSION_KEY);
    var session = raw ? JSON.parse(raw) : null;

    if (!session) {
      /* No session — send back to home/login */
      window.location.replace('./index.html');
      return;
    }

    window.KENOSIS_USER = session;

    //

  } catch (err) {
    console.warn('[kenosis] auth-guard: could not read session', err);
  }
})();
