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

    document.addEventListener('DOMContentLoaded', function () {
      var bar = document.createElement('div');
      bar.id  = 'kenosis-bar';
      bar.style.cssText = [
        'position:fixed;top:0;left:0;right:0;z-index:9999',
        'display:flex;align-items:center;justify-content:flex-end;gap:12px',
        'padding:6px 16px',
        'background:#13100c',
        'border-bottom:1px solid rgba(201,168,76,0.2)',
        'font-family:Inter,sans-serif;font-size:12px;color:#8a7d62',
      ].join(';');

      var label = document.createElement('span');
      label.textContent = session.guest
        ? 'Browsing as Guest'
        : 'Signed in as ' + (session.name || session.email);

      var btn = document.createElement('button');
      btn.textContent = 'Sign out';
      btn.style.cssText = [
        'background:none;border:none;cursor:pointer',
        'color:#5a5040;font-size:11px;padding:2px 6px',
        'border-radius:3px;transition:color .15s',
      ].join(';');
      btn.onmouseover = function(){ btn.style.color = '#c9a84c'; };
      btn.onmouseout  = function(){ btn.style.color = '#5a5040'; };
      btn.onclick = function () {
        sessionStorage.removeItem('kenosis_session');
        window.location.replace('./index.html');
      };

      bar.appendChild(label);
      bar.appendChild(btn);
      document.body.insertBefore(bar, document.body.firstChild);
    });

  } catch (err) {
    console.warn('[kenosis] auth-guard: could not read session', err);
  }
})();
