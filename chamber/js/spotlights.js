const spotlightContainer = document.getElementById("spotlight-container");

// Convert membership numbers to readable names
function membershipName(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Bronze";
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();  // <-- YOUR JSON is an array, not an object

    // Filter only GOLD (3) and SILVER (2)
    const premium = members.filter(m => m.membership === 3 || m.membership === 2);

    // Shuffle them randomly
    const shuffled = premium.sort(() => Math.random() - 0.5);

    // Select 2–3 random spotlight members
    const selected = shuffled.slice(0, Math.random() > 0.5 ? 3 : 2);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
      const levelName = membershipName(member.membership);

      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit website</a>
        <span class="level ${levelName.toLowerCase()}">${levelName}</span>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlights error:", error);
  }
}

loadSpotlights();
