const url = 'data/members.json';

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (err) {
    const container = document.getElementById('directory');
    if (container) container.innerHTML = `<p class="error">Error loading directory: ${err.message}</p>`;
    console.error(err);
  }
}

function displayMembers(members) {
  const container = document.getElementById('directory');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';

    // image wrapper with fallback
    const imgWrap = `<div class="logo-wrap">
      <img src="images/${member.image}" alt="${escapeHtml(member.name)} logo" onerror="this.onerror=null;this.src='images/placeholder.png'">
    </div>`;

    card.innerHTML = `
      ${imgWrap}
      <div class="member-info">
        <h3>${escapeHtml(member.name)}</h3>
        <p><strong>Address:</strong> ${escapeHtml(member.address)}</p>
        <p><strong>Phone:</strong> <a href="tel:${escapeHtml(member.phone)}">${escapeHtml(member.phone)}</a></p>
        <p><a class="visit-site" href="${escapeHtml(member.website)}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        <p><strong>Membership:</strong> ${membershipName(member.membership)}</p>
        ${member.description ? `<p class="muted">${escapeHtml(member.description)}</p>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

// small helper to avoid basic injection when injecting JSON text
function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function membershipName(level) {
  return level === 3 ? 'Gold' :
         level === 2 ? 'Silver' :
         level === 1 ? 'Bronze' : 'Member';
}

/* View toggle logic with accessibility updates */
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const directory = document.getElementById('directory');

if (gridBtn && listBtn && directory) {
  gridBtn.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  });

  listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
  });
}

// initialize
getMembers();
