// Buy vs Build Advisor - Main Application Logic

let currentAnalysis = null;

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupEventListeners();
  loadSampleRequirements();
});

function setupEventListeners() {
  document
    .getElementById("analyzeBtn")
    .addEventListener("click", analyzeRequirements);
  document
    .getElementById("loadSampleBtn")
    .addEventListener("click", loadSampleRequirements);

  // Tab switching
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });
}

function switchTab(tabName) {
  // Update tab buttons
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  // Update tab content
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));
  document.getElementById(`${tabName}-tab`).classList.add("active");
}

function loadSampleRequirements() {
  const textarea = document.getElementById("requirements");
  textarea.value = mockData.sampleRequirements.join("\n");
}

function analyzeRequirements() {
  const requirementText = document.getElementById("requirements").value.trim();

  if (!requirementText) {
    alert("Please enter your requirements first.");
    return;
  }

  // Show loading state
  showLoading();

  // Simulate analysis delay
  setTimeout(() => {
    currentAnalysis = window.analyzeRequirements(requirementText);
    displayResults();
  }, 800);
}

function showLoading() {
  const banner = document.getElementById("recommendationBanner");
  banner.classList.add("show");
  banner.innerHTML = '<div class="loading">Analyzing requirements</div>';

  document.getElementById("comparisonGrid").classList.remove("show");
}

function displayResults() {
  displayRecommendation();
  displayComparison();

  // Switch to results tab
  switchTab("results");

  // Scroll to results
  document
    .getElementById("recommendationBanner")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function displayRecommendation() {
  const { recommendation } = currentAnalysis;
  const banner = document.getElementById("recommendationBanner");

  const decisionColors = {
    REUSE: "var(--p-emerald)",
    BUY: "var(--p-purple)",
    BUILD: "var(--p-blue-deep)",
  };

  banner.innerHTML = `
    <div class="recommendation-header">
      <div>
        <div class="recommendation-badge">${recommendation.decision}</div>
        <h3 style="font-size: 24px; font-weight: 700; margin-top: 12px;">Recommended Decision</h3>
      </div>
      <div style="text-align: right;">
        <div class="confidence-score">${recommendation.confidence}%</div>
        <div class="confidence-label">Confidence</div>
      </div>
    </div>
    <div class="recommendation-reasoning">
      ${recommendation.reasoning}
    </div>
  `;

  banner.classList.add("show");
}

function displayComparison() {
  const { matches, recommendation } = currentAnalysis;
  const grid = document.getElementById("comparisonGrid");

  // Get top options
  const reuseOption = matches.existing[0] || null;
  const buyOption = matches.market[0] || null;
  const buildOption = matches.buildEstimate;

  grid.innerHTML = "";

  // Reuse Card
  if (reuseOption) {
    grid.appendChild(
      createReuseCard(reuseOption, recommendation.decision === "REUSE"),
    );
  }

  // Buy Card
  if (buyOption) {
    grid.appendChild(
      createBuyCard(buyOption, recommendation.decision === "BUY"),
    );
  }

  // Build Card
  grid.appendChild(
    createBuildCard(buildOption, recommendation.decision === "BUILD"),
  );

  grid.classList.add("show");
}

function createReuseCard(solution, isRecommended) {
  const card = document.createElement("div");
  card.className = `comparison-card ${isRecommended ? "recommended" : ""}`;

  const matchedFeaturesHTML =
    solution.matchedFeatures && solution.matchedFeatures.length > 0
      ? solution.matchedFeatures
          .map((f) => `<li class="matched">${f}</li>`)
          .join("")
      : "";

  const otherFeaturesHTML = solution.features
    .filter(
      (f) => !solution.matchedFeatures || !solution.matchedFeatures.includes(f),
    )
    .slice(0, 4)
    .map((f) => `<li>${f}</li>`)
    .join("");

  card.innerHTML = `
    <div class="comparison-header reuse">
      <div class="comparison-type">Reuse Existing</div>
      <div class="comparison-title">${solution.name}</div>
      <div class="comparison-subtitle">${solution.domain} • ${solution.owner}</div>
      <div class="match-score">${solution.matchScore}% Match</div>
    </div>
    <div class="comparison-body">
      <div class="cost-section">
        <div class="cost-label">Annual Cost</div>
        <div class="cost-value">
          $${(solution.annualCost / 1000).toFixed(0)}k
          <span class="cost-period">/ year</span>
        </div>
      </div>
      
      <div class="info-row">
        <span class="info-label">Current Users</span>
        <span class="info-value">${solution.users}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Reuse Potential</span>
        <span class="info-value">${solution.reusePotential}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Implementation</span>
        <span class="info-value">1-2 months</span>
      </div>
      <div class="info-row">
        <span class="info-label">Type</span>
        <span class="info-value">${solution.type}</span>
      </div>
      
      <div style="margin-top: 20px;">
        <div class="cost-label">Matched Features</div>
        <ul class="features-list">
          ${matchedFeaturesHTML}
          ${otherFeaturesHTML}
        </ul>
      </div>
    </div>
  `;

  return card;
}

function createBuyCard(solution, isRecommended) {
  const card = document.createElement("div");
  card.className = `comparison-card ${isRecommended ? "recommended" : ""}`;

  const matchedFeaturesHTML =
    solution.matchedFeatures && solution.matchedFeatures.length > 0
      ? solution.matchedFeatures
          .map((f) => `<li class="matched">${f}</li>`)
          .join("")
      : "";

  const otherFeaturesHTML = solution.features
    .filter(
      (f) => !solution.matchedFeatures || !solution.matchedFeatures.includes(f),
    )
    .slice(0, 4)
    .map((f) => `<li>${f}</li>`)
    .join("");

  card.innerHTML = `
    <div class="comparison-header buy">
      <div class="comparison-type">Buy from Market</div>
      <div class="comparison-title">${solution.name}</div>
      <div class="comparison-subtitle">${solution.vendor} • ${solution.gartnerQuadrant}</div>
      <div class="match-score">${solution.matchScore}% Match</div>
    </div>
    <div class="comparison-body">
      <div class="cost-section">
        <div class="cost-label">Estimated Annual Cost</div>
        <div class="cost-value">
          $${(solution.estimatedAnnualCost / 1000).toFixed(0)}k
          <span class="cost-period">/ year</span>
        </div>
      </div>
      
      <div class="info-row">
        <span class="info-label">Vendor</span>
        <span class="info-value">${solution.vendor}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Market Position</span>
        <span class="info-value">${solution.gartnerQuadrant}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Implementation</span>
        <span class="info-value">${solution.implementationTime}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Pricing Model</span>
        <span class="info-value">${solution.pricingModel}</span>
      </div>
      
      <div style="margin-top: 20px;">
        <div class="cost-label">Matched Features</div>
        <ul class="features-list">
          ${matchedFeaturesHTML}
          ${otherFeaturesHTML}
        </ul>
      </div>
    </div>
  `;

  return card;
}

function createBuildCard(buildEstimate, isRecommended) {
  const card = document.createElement("div");
  card.className = `comparison-card ${isRecommended ? "recommended" : ""}`;

  card.innerHTML = `
    <div class="comparison-header build">
      <div class="comparison-type">Build Custom</div>
      <div class="comparison-title">Custom Development</div>
      <div class="comparison-subtitle">${buildEstimate.team}</div>
    </div>
    <div class="comparison-body">
      <div class="cost-section">
        <div class="cost-label">Estimated Development Cost</div>
        <div class="cost-value">
          $${(buildEstimate.estimatedCost / 1000).toFixed(0)}k
          <span class="cost-period">one-time</span>
        </div>
      </div>
      
      <div class="info-row">
        <span class="info-label">Timeline</span>
        <span class="info-value">${buildEstimate.estimatedTime}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Team</span>
        <span class="info-value">Internal</span>
      </div>
      <div class="info-row">
        <span class="info-label">Ongoing Maintenance</span>
        <span class="info-value">$${((buildEstimate.estimatedCost * 0.15) / 1000).toFixed(0)}k/year</span>
      </div>
      <div class="info-row">
        <span class="info-label">Flexibility</span>
        <span class="info-value">High</span>
      </div>
      
      <div style="margin-top: 20px;">
        <div class="cost-label">Key Risks</div>
        <ul class="features-list">
          ${buildEstimate.risks.map((risk) => `<li style="color: var(--p-gold);">${risk}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  return card;
}

function renderCatalog() {
  const existingGrid = document.getElementById("existingCatalog");
  const marketGrid = document.getElementById("marketCatalog");

  // Render existing solutions
  existingGrid.innerHTML = mockData.existingSolutions
    .map((sol) => createCatalogCard(sol))
    .join("");

  // Render market solutions
  marketGrid.innerHTML = mockData.marketSolutions
    .map((sol) => createMarketCard(sol))
    .join("");
}

function createCatalogCard(solution) {
  return `
    <div class="catalog-card">
      <div class="catalog-header">
        <div>
          <div class="catalog-title">${solution.name}</div>
          <div class="catalog-domain">${solution.domain}</div>
        </div>
        <div class="reuse-badge ${solution.reusePotential.toLowerCase()}">${solution.reusePotential} Reuse</div>
      </div>
      
      <div class="catalog-description">${solution.description}</div>
      
      <div class="catalog-meta">
        <span>👤 ${solution.users} users</span>
        <span>📦 ${solution.type}</span>
        <span>👔 ${solution.owner}</span>
      </div>
      
      <div style="border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 12px;">
        <div class="catalog-cost">
          $${(solution.annualCost / 1000).toFixed(0)}k
          <span class="catalog-cost-label">/ year</span>
        </div>
      </div>
      
      <div style="margin-top: 12px; font-size: 12px; color: var(--text-secondary);">
        <strong>Capabilities:</strong> ${solution.capabilities.join(", ")}
      </div>
    </div>
  `;
}

function createMarketCard(solution) {
  return `
    <div class="catalog-card" style="border-left-color: var(--p-purple);">
      <div class="catalog-header">
        <div>
          <div class="catalog-title">${solution.name}</div>
          <div class="catalog-domain">${solution.category}</div>
        </div>
        <div class="reuse-badge" style="background: rgba(118,63,152,0.15); color: var(--p-purple);">${solution.gartnerQuadrant}</div>
      </div>
      
      <div class="catalog-description">${solution.description}</div>
      
      <div class="catalog-meta">
        <span>🏢 ${solution.vendor}</span>
        <span>⏱️ ${solution.implementationTime}</span>
      </div>
      
      <div style="border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 12px;">
        <div class="catalog-cost" style="color: var(--p-purple);">
          $${(solution.estimatedAnnualCost / 1000).toFixed(0)}k
          <span class="catalog-cost-label">/ year (est.)</span>
        </div>
      </div>
      
      <div style="margin-top: 12px; font-size: 12px; color: var(--text-secondary);">
        <strong>Pricing:</strong> ${solution.pricingModel}
      </div>
    </div>
  `;
}
