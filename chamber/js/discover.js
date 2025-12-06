// js/discover.js
import { attractions } from "../data/discover.mjs";

// ----- DOM ELEMENTS -----
const grid = document.querySelector(".discover-grid");
const visitMessage = document.getElementById("visitMessage");

// ----- RENDER ATTRACTION CARDS -----
function renderAttractions() {
  if (!grid) return;

  grid.innerHTML = "";

  attractions.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `discover-card card-${index + 1}`;

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.name}">
        <figcaption class="sr-only">${item.name}</figcaption>
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="discover-btn">Learn more</button>
    `;

    grid.appendChild(card);
  });
}

// ----- VISIT MESSAGE WITH localStorage -----
function handleVisitMessage() {
  if (!visitMessage) return;

  const storageKey = "discoverLastVisit";
  const now = Date.now();
  const lastVisit = localStorage.getItem(storageKey);

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const lastTime = Number(lastVisit);
    const msInDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((now - lastTime) / msInDay);

    if (diffDays < 1) {
      message = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${diffDays} days ago.`;
    }
  }

  visitMessage.textContent = message;
  localStorage.setItem(storageKey, String(now));
}

// ----- INIT -----
renderAttractions();
handleVisitMessage();
