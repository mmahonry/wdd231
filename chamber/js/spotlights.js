const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    // Filter GOLD & SILVER members
    const premiumMembers = data.filter(m => m.membership === 3 || m.membership === 2);

    // Shuffle (keeps results random)
    const shuffled = premiumMembers.sort(() => Math.random() - 0.5);

    // Always pick *exactly* 3 random members
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit website</a>
        <span class="level ${member.membership === 3 ? "gold" : "silver"}">
          ${member.membership === 3 ? "GOLD" : "SILVER"}
        </span>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Spotlights error:", err);
  }
}

loadSpotlights();
