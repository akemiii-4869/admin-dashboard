
(() => {
  const button = document.querySelector('.mobile-menu-button');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!button || !sidebar || !backdrop) return;
  function close() { sidebar.classList.remove('mobile-open'); backdrop.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); document.body.classList.remove('mobile-nav-open'); }
  button.addEventListener('click', () => { const open = !sidebar.classList.contains('mobile-open'); sidebar.classList.toggle('mobile-open', open); backdrop.classList.toggle('open', open); button.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('mobile-nav-open', open); });
  backdrop.addEventListener('click', close);
  sidebar.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
})();
