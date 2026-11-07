(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const saved = (() => { try { return localStorage.getItem('portfolio-theme'); } catch { return null; } })();
  const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#0b1020' : '#f8fafc');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* storage unavailable */ }
  }
  setTheme(saved === 'dark' || saved === 'light' ? saved : systemLight ? 'light' : 'dark');
  themeButton.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '✕' : '☰';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
