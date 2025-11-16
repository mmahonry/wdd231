    // navigation.js - simple accessible hamburger toggle
    document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', String(!expanded));

        // toggle class to show/hide nav on small screens
        nav.classList.toggle('open');

        // for CSS: you may handle .main-nav.open { display:block; } in small screen media query
    });

    // close mobile nav when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    });
