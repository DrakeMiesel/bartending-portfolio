// -----------------------------------------------------------
// Portfolio interactions
// The popup text is stored in <template> elements in index.html.
// To change the words in a popup, edit the matching template there.
// -----------------------------------------------------------

const detailDialog = document.querySelector("#detail-modal");
const modalTitle = document.querySelector("#modal-title");
const modalContent = document.querySelector("#modal-content");
const closeButton = document.querySelector(".modal-close");
const doneButton = document.querySelector(".modal-done");

// Open the appropriate popup when a card/button has a data-modal attribute.
document.querySelectorAll("[data-modal]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const templateId = trigger.dataset.modal;
    const template = document.getElementById(templateId);
    if (!template || !detailDialog) return;

    // Use the card's visible heading as the popup title when possible.
    const titleElement = trigger.querySelector(".card-title, .experience-main strong, .cocktail-card-text strong");
    const fallbackTitles = {
      "approach-modal": "My approach",
      "craft-modal": "The craft",
      "hospitality-modal": "The guest",
      "learning-modal": "The mindset",
      "restaurant-modal": "Restaurant service",
      "cocktail-modal": "Independent cocktail practice",
      "gymnastics-modal": "Collegiate gymnastics",
      "drink-one-modal": "A drink worth remembering",
      "drink-two-modal": "Balance & discovery",
      "drink-three-modal": "Presentation matters"
    };

    modalTitle.textContent = titleElement ? titleElement.textContent.trim() : (fallbackTitles[templateId] || "A closer look");
    modalContent.replaceChildren(template.content.cloneNode(true));

    if (typeof detailDialog.showModal === "function") {
      detailDialog.showModal();
    }
  });
});

// Close controls.
function closeDialog() {
  if (detailDialog.open) detailDialog.close();
}
closeButton.addEventListener("click", closeDialog);
doneButton.addEventListener("click", closeDialog);

// Clicking the dimmed backdrop closes the popup; clicking inside does not.
detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) closeDialog();
});

// Keep the footer year current automatically.
document.querySelector("#year").textContent = new Date().getFullYear();
