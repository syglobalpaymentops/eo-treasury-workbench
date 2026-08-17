const navItems = Array.from(document.querySelectorAll(".nav-item"));
const toolCards = Array.from(document.querySelectorAll(".tool-card"));
const homeView = document.getElementById("home-view");
const toolboxView = document.getElementById("toolbox-view");
const frameView = document.getElementById("frame-view");
const frame = document.getElementById("tool-frame");
const title = document.getElementById("view-title");
const fxQuickLinks = document.getElementById("fx-quick-links");

const titles = new Map([
  ["./tools/fx-calculator.html", "FX Calculator"],
  ["./tools/bank-account-modify.html", "Bank Account Modify"],
  ["./tools/payment-instruction-generator.html", "Payment Instruction"],
  ["./apps/commission/index.html", "Commission Settlement"],
]);

function hideAllViews() {
  homeView.hidden = true;
  toolboxView.hidden = true;
  frameView.hidden = true;
}

function setActive(target) {
  navItems.forEach((item) => item.classList.remove("active"));
  if (target) {
    target.classList.add("active");
  }
}

function showHome(target) {
  hideAllViews();
  homeView.hidden = false;
  title.textContent = "Overview";
  fxQuickLinks.hidden = true;
  frame.removeAttribute("src");
  setActive(target);
}

function showToolbox(target) {
  hideAllViews();
  toolboxView.hidden = false;
  title.textContent = "Toolbox";
  fxQuickLinks.hidden = true;
  frame.removeAttribute("src");
  setActive(target);
}

function showFrame(src, activeItem) {
  hideAllViews();
  frameView.hidden = false;
  frame.src = src;
  title.textContent = titles.get(src) || "Tool";
  const isFxCalculator = src === "./tools/fx-calculator.html";
  fxQuickLinks.hidden = !isFxCalculator;
  setActive(activeItem || navItems.find((item) => item.dataset.src === src));
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.view === "home") {
      showHome(item);
      return;
    }

    if (item.dataset.view === "toolbox") {
      showToolbox(item);
      return;
    }

    showFrame(item.dataset.src, item);
  });
});

toolCards.forEach((card) => {
  card.addEventListener("click", () => {
    showFrame(card.dataset.src);
  });
});
