document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const map = {
    firstName: "out-firstName",
    lastName: "out-lastName",
    email: "out-email",
    phone: "out-phone",
    organization: "out-organization",
    membership: "out-membership",
    timestamp: "out-timestamp"
  };

  Object.entries(map).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (!el) return;

    let value = params.get(key) || "—";

    if (key === "membership") {
      const labels = {
        np: "NP Membership (Non-Profit)",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership"
      };
      value = labels[value] || value;
    }

    if (key === "timestamp" && value !== "—") {
      try {
        const d = new Date(value);
        value = d.toLocaleString();
      } catch {
        // leave as is
      }
    }

    el.textContent = value;
  });
});
