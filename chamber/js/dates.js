// dates.js - set copyright year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  const lastEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (lastEl) {
    const last = document.lastModified;
    lastEl.textContent = 'Last modified: ' + (last ? last : 'unknown');
  }
});