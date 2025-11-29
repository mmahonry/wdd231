// join.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) Set timestamp hidden field
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    // Store ISO string for consistency
    timestampField.value = now.toISOString();
  }

  // 2) Modal logic (using <dialog>)
  const buttons = document.querySelectorAll(".benefit-link");
  const modals = document.querySelectorAll(".membership-modal");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-modal");
      const dialog = document.getElementById(targetId);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  modals.forEach(dialog => {
    // Close buttons
    dialog.querySelectorAll("[data-close]").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => dialog.close());
    });

    // Optional: close when clicking ESC (handled by dialog automatically)
  });
});
