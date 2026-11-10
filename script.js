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


// Swipeable friend-reference carousel (native horizontal scrolling).
const quoteTrack = document.querySelector("#quote-track");
const quoteDots = [...document.querySelectorAll("[data-quote-index]")];
const quoteCards = quoteTrack ? [...quoteTrack.querySelectorAll(".quote-card")] : [];
let activeQuote = 0;
function showQuote(index) {
  if (!quoteTrack || !quoteCards.length) return;
  activeQuote = (index + quoteCards.length) % quoteCards.length;
  quoteCards[activeQuote].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  quoteDots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === activeQuote);
    if (i === activeQuote) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}
document.querySelectorAll("[data-quote-step]").forEach((button) => {
  button.addEventListener("click", () => showQuote(activeQuote + Number(button.dataset.quoteStep)));
});
quoteDots.forEach((dot) => {
  dot.addEventListener("click", () => showQuote(Number(dot.dataset.quoteIndex)));
});
if (quoteTrack && "IntersectionObserver" in window) {
  const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = quoteCards.indexOf(entry.target);
      if (index < 0) return;
      activeQuote = index;
      quoteDots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        if (i === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    });
  }, { root: quoteTrack, threshold: 0.6 });
  quoteCards.forEach((card) => quoteObserver.observe(card));
}


// Load cocktail videos only as they approach the viewport, then pause offscreen.
const cocktailVideos = [...document.querySelectorAll(".drink-video[data-src]")];
if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = video.dataset.src;
          video.load();
        }
        video.play().catch(() => {
          // Autoplay can be restricted by browser or device settings.
        });
      } else {
        video.pause();
      }
    });
  }, { rootMargin: "180px 0px", threshold: 0.05 });
  cocktailVideos.forEach((video) => videoObserver.observe(video));
} else {
  cocktailVideos.forEach((video) => {
    video.src = video.dataset.src;
    video.load();
  });
}
