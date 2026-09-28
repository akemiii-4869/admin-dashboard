
(() => {
  const button = document.querySelector('.mobile-menu-button');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!button || !sidebar || !backdrop) return;
  const profileButton = document.querySelector('.topbar-actions .profile-chip');
  let profileMenu;
  if (profileButton) {
    profileButton.setAttribute('aria-label', 'Admin menu');
    profileButton.setAttribute('aria-haspopup', 'menu');
    profileButton.setAttribute('aria-expanded', 'false');
    profileMenu = document.createElement('div');
    profileMenu.className = 'mobile-profile-menu';
    profileMenu.setAttribute('role', 'menu');
    profileMenu.innerHTML = '<div class="mobile-profile-title">Admin</div><button type="button" role="menuitem" class="mobile-signout-button">Log out</button>';
    profileButton.insertAdjacentElement('afterend', profileMenu);
    profileButton.addEventListener('click', event => {
      if (window.innerWidth > 760) return;
      event.preventDefault();
      event.stopPropagation();
      const open = !profileMenu.classList.contains('open');
      profileMenu.classList.toggle('open', open);
      profileButton.setAttribute('aria-expanded', String(open));
    });
    profileMenu.querySelector('.mobile-signout-button').addEventListener('click', () => {
      profileMenu.classList.remove('open');
      profileButton.setAttribute('aria-expanded', 'false');
      const settingsLogout = document.getElementById('logoutBtn');
      if (settingsLogout) settingsLogout.click();
      else window.location.href = 'settings.html?logout=1';
    });
    document.addEventListener('click', event => {
      if (!profileMenu.contains(event.target) && !profileButton.contains(event.target)) {
        profileMenu.classList.remove('open');
        profileButton.setAttribute('aria-expanded', 'false');
      }
    });
    if (new URLSearchParams(window.location.search).get('logout') === '1') {
      history.replaceState(null, '', window.location.pathname);
      document.getElementById('logoutBtn')?.click();
    }
  }
  function close() { sidebar.classList.remove('mobile-open'); backdrop.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); document.body.classList.remove('mobile-nav-open'); }
  button.addEventListener('click', () => { const open = !sidebar.classList.contains('mobile-open'); sidebar.classList.toggle('mobile-open', open); backdrop.classList.toggle('open', open); button.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('mobile-nav-open', open); });
  backdrop.addEventListener('click', close);
  sidebar.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); profileMenu?.classList.remove('open'); profileButton?.setAttribute('aria-expanded', 'false'); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
})();
