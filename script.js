const navItems = Array.from(document.querySelectorAll(".nav-item"));
const toolCards = Array.from(document.querySelectorAll(".tool-card"));
const homeView = document.getElementById("home-view");
const toolboxView = document.getElementById("toolbox-view");
const frameView = document.getElementById("frame-view");
const frame = document.getElementById("tool-frame");
const title = document.getElementById("view-title");
const fxQuickLinks = document.getElementById("fx-quick-links");
const costRateInput = document.getElementById("cost-rate");
const clientRateInput = document.getElementById("client-rate");
const profitRateOutput = document.getElementById("profit-rate");
const rateSpreadOutput = document.getElementById("rate-spread");

const titles = new Map([
  ["./tools/fx-calculator.html", "FX Calculator"],
  ["./tools/bank-account-modify.html", "Bank Account Modify"],
  ["./tools/payment-instruction-generator.html", "Payment Instruction"],
  ["./tools/oo-settlement/index.html", "OO Settlement"],
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

function parseRate(value) {
  return Number(String(value).replace(/,/g, "").trim());
}

function updateProfitRate() {
  if (!costRateInput || !clientRateInput) return;

  const costRate = parseRate(costRateInput.value);
  const clientRate = parseRate(clientRateInput.value);

  if (!Number.isFinite(costRate) || !Number.isFinite(clientRate) || costRate <= 0) {
    profitRateOutput.textContent = "-";
    rateSpreadOutput.textContent = "等待输入";
    return;
  }

  const spread = clientRate - costRate;
  const profitRate = (spread / costRate) * 100;
  profitRateOutput.textContent = profitRate.toFixed(4) + "%";
  rateSpreadOutput.textContent = "差价 " + spread.toFixed(4);
}

[costRateInput, clientRateInput].forEach((input) => {
  if (input) input.addEventListener("input", updateProfitRate);
});
