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
  // Load sample business context
  document.getElementById("businessUnit").value = "Upstream";
  document.getElementById("operatingUnit").value = "Malaysia Operations";
  document.getElementById("p4rBudget").value = "750000";
  document.getElementById("numberOfUsers").value = "150";
  document.getElementById("targetUsers").value =
    "Field Engineers, Maintenance Technicians, Operations Managers";
  document.getElementById("geoLocation").value = "Malaysia";

  // Load sample requirements
  const textarea = document.getElementById("requirements");
  textarea.value = mockData.sampleRequirements.join("\n");
}

function analyzeRequirements() {
  const requirementText = document.getElementById("requirements").value.trim();

  // Collect business context
  const businessContext = {
    businessUnit: document.getElementById("businessUnit").value,
    operatingUnit: document.getElementById("operatingUnit").value,
    p4rBudget: parseInt(document.getElementById("p4rBudget").value) || 0,
    numberOfUsers:
      parseInt(document.getElementById("numberOfUsers").value) || 0,
    targetUsers: document.getElementById("targetUsers").value,
    geoLocation: document.getElementById("geoLocation").value,
  };

  if (!requirementText) {
    alert("Please enter your requirements first.");
    return;
  }

  if (!businessContext.businessUnit || !businessContext.operatingUnit) {
    alert("Please fill in the Business Unit and Operating Unit.");
    return;
  }

  // Show loading state
  showLoading();

  // Simulate analysis delay
  setTimeout(() => {
    // Use dummy analysis for demo
    currentAnalysis = createDummyAnalysis(requirementText, businessContext);
    console.log("Analysis completed:", currentAnalysis);
    displayResults();
  }, 2000);
}

function showLoading() {
  const banner = document.getElementById("recommendationBanner");
  banner.classList.add("show");
  banner.innerHTML = `
    <div style="padding: 40px;">
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
        <div class="loading-spinner"></div>
        <div style="color: #FFFFFF; font-size: 18px; font-weight: 500;">
          <span id="loadingText">Initializing analysis</span><span class="loading-dots">...</span>
        </div>
      </div>
      
      <div class="progress-container">
        <div class="progress-bar">
          <div id="progressFill" class="progress-fill"></div>
        </div>
        <div id="progressText" class="progress-text">0%</div>
      </div>
      
      <div id="processingSteps" class="processing-steps">
        <div class="step-item" id="step1">
          <div class="step-icon">⚡</div>
          <div class="step-text">Parsing requirements</div>
        </div>
        <div class="step-item" id="step2">
          <div class="step-icon">🔍</div>
          <div class="step-text">Scanning existing solutions</div>
        </div>
        <div class="step-item" id="step3">
          <div class="step-icon">📊</div>
          <div class="step-text">Analyzing market options</div>
        </div>
        <div class="step-item" id="step4">
          <div class="step-icon">💰</div>
          <div class="step-text">Calculating TCO & risks</div>
        </div>
        <div class="step-item" id="step5">
          <div class="step-icon">🎯</div>
          <div class="step-text">Generating recommendation</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("comparisonGrid").classList.remove("show");

  // Hide analysis sections
  const sections = [
    "marketAnalysis",
    "existingAnalysis",
    "riskAnalysis",
    "tcoAnalysis",
  ];
  sections.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });

  // Start progress animation
  startProgressAnimation();
}

function displayResults() {
  displayRecommendation();
  displayMarketAnalysis();
  displayExistingAnalysis();
  displayRiskAnalysis();
  displayComparison();
  displayTCOAnalysis();

  // Don't switch tabs immediately - let progress animation complete first
  // Tab switching will happen in startProgressAnimation when complete
}

function displayRecommendation() {
  if (!currentAnalysis || !currentAnalysis.recommendation) {
    console.error("No analysis data available");
    return;
  }

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
  if (!currentAnalysis || !currentAnalysis.matches) {
    console.error("No analysis data available for comparison");
    return;
  }

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

function displayMarketAnalysis() {
  if (!currentAnalysis || !currentAnalysis.matches) {
    console.error("No analysis data available for market analysis");
    return;
  }

  const { matches, businessContext } = currentAnalysis;
  const section = document.getElementById("marketAnalysis");
  const content = document.getElementById("marketAnalysisContent");

  const marketSolutions = matches.market.slice(0, 3);
  const avgMarketCost =
    marketSolutions.length > 0
      ? marketSolutions.reduce((sum, sol) => sum + sol.estimatedAnnualCost, 0) /
        marketSolutions.length
      : 0;

  const marketTrends = generateMarketTrends(businessContext);

  content.innerHTML = `
    <div class="analysis-grid">
      <div class="analysis-item market-item">
        <h4>Market Maturity</h4>
        <div class="metric">${marketSolutions.length > 2 ? "Mature" : marketSolutions.length > 0 ? "Emerging" : "Limited"}</div>
        <p>${marketSolutions.length} vendor solutions identified with average ${marketSolutions.length > 0 ? Math.round(marketSolutions[0].matchScore) : 0}% feature match.</p>
      </div>
      
      <div class="analysis-item market-item">
        <h4>Average Market Price</h4>
        <div class="metric">$${Math.round(avgMarketCost / 1000)}k/year</div>
        <p>Based on ${marketSolutions.length} leading vendors. ${businessContext.p4rBudget > avgMarketCost ? "Within your budget range." : "Above your current budget."}</p>
      </div>
      
      <div class="analysis-item market-item">
        <h4>Market Leaders</h4>
        <div class="metric">${marketSolutions.filter((s) => s.gartnerQuadrant === "Leader").length} Leaders</div>
        <p>Gartner Magic Quadrant analysis shows ${marketSolutions.filter((s) => s.gartnerQuadrant === "Leader").length} market leaders available.</p>
      </div>
    </div>
    
    <div style="margin-top: 20px;">
      <h4 style="font-weight: 700; margin-bottom: 12px;">Market Trends & Insights</h4>
      <ul style="list-style: none; padding: 0;">
        ${marketTrends.map((trend) => `<li style="padding: 8px 0; border-bottom: 1px solid var(--border-light);"><strong>${trend.title}:</strong> ${trend.description}</li>`).join("")}
      </ul>
    </div>
  `;

  section.classList.add("show");
  section.style.display = "block";
}

function displayExistingAnalysis() {
  if (!currentAnalysis || !currentAnalysis.matches) {
    console.error("No analysis data available for existing analysis");
    return;
  }

  const { matches, businessContext } = currentAnalysis;
  const section = document.getElementById("existingAnalysis");
  const content = document.getElementById("existingAnalysisContent");

  const existingSolutions = matches.existing.slice(0, 3);
  const totalUsers = existingSolutions.reduce((sum, sol) => sum + sol.users, 0);
  const avgReusePotential =
    existingSolutions.length > 0
      ? existingSolutions.filter((s) => s.reusePotential === "High").length /
        existingSolutions.length
      : 0;

  const reuseInsights = generateReuseInsights(
    existingSolutions,
    businessContext,
  );

  content.innerHTML = `
    <div class="analysis-grid">
      <div class="analysis-item">
        <h4>Reuse Opportunities</h4>
        <div class="metric">${existingSolutions.length} Solutions</div>
        <p>${existingSolutions.filter((s) => s.reusePotential === "High").length} high-potential matches found across ${new Set(existingSolutions.map((s) => s.domain)).size} domains.</p>
      </div>
      
      <div class="analysis-item">
        <h4>User Base Coverage</h4>
        <div class="metric">${totalUsers.toLocaleString()} Users</div>
        <p>Combined user base across existing solutions. Proven scalability for ${businessContext.numberOfUsers || "your"} users.</p>
      </div>
      
      <div class="analysis-item">
        <h4>Cost Savings Potential</h4>
        <div class="metric">${existingSolutions.length > 0 ? Math.round(((matches.buildEstimate?.estimatedCost || 0) - (existingSolutions[0]?.annualCost || 0) * 3) / 1000) : 0}k</div>
        <p>Estimated 3-year savings vs custom build through solution reuse and extension.</p>
      </div>
    </div>
    
    <div style="margin-top: 20px;">
      <h4 style="font-weight: 700; margin-bottom: 12px;">Reuse Strategy Recommendations</h4>
      <ul style="list-style: none; padding: 0;">
        ${reuseInsights.map((insight) => `<li style="padding: 8px 0; border-bottom: 1px solid var(--border-light);"><strong>${insight.title}:</strong> ${insight.description}</li>`).join("")}
      </ul>
    </div>
  `;

  section.classList.add("show");
  section.style.display = "block";
}

function displayRiskAnalysis() {
  if (
    !currentAnalysis ||
    !currentAnalysis.matches ||
    !currentAnalysis.recommendation
  ) {
    console.error("No analysis data available for risk analysis");
    return;
  }

  const { matches, recommendation, businessContext } = currentAnalysis;
  const section = document.getElementById("riskAnalysis");
  const content = document.getElementById("riskAnalysisContent");

  const risks = generateRiskAnalysis(recommendation, matches, businessContext);

  content.innerHTML = `
    <div class="analysis-grid">
      ${risks
        .map(
          (risk) => `
        <div class="analysis-item risk-item">
          <h4>${risk.category}</h4>
          <div class="metric">${risk.level}</div>
          <p>${risk.description}</p>
          <div style="margin-top: 8px; font-size: 12px; color: var(--text-secondary);">
            <strong>Mitigation:</strong> ${risk.mitigation}
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;

  section.classList.add("show");
  section.style.display = "block";
}

function displayTCOAnalysis() {
  if (!currentAnalysis || !currentAnalysis.matches) {
    console.error("No analysis data available for TCO analysis");
    return;
  }

  const { matches, businessContext } = currentAnalysis;
  const section = document.getElementById("tcoAnalysis");
  const content = document.getElementById("tcoAnalysisContent");

  const reuseOption = matches.existing[0];
  const buyOption = matches.market[0];
  const buildOption = matches.buildEstimate;

  // Calculate 5-year TCO
  const reuseTCO = reuseOption
    ? {
        year1: reuseOption.annualCost + 50000, // Implementation cost
        ongoing: reuseOption.annualCost,
        total5yr: reuseOption.annualCost * 5 + 50000,
      }
    : null;

  const buyTCO = buyOption
    ? {
        year1: buyOption.estimatedAnnualCost + 200000, // Implementation + training
        ongoing: buyOption.estimatedAnnualCost,
        total5yr: buyOption.estimatedAnnualCost * 5 + 200000,
      }
    : null;

  const buildTCO = buildOption
    ? {
        year1: buildOption.estimatedCost,
        ongoing: buildOption.estimatedCost * 0.15, // 15% maintenance
        total5yr:
          buildOption.estimatedCost + buildOption.estimatedCost * 0.15 * 4,
      }
    : null;

  content.innerHTML = `
    <div class="tco-chart">
      ${
        reuseTCO
          ? `
        <div class="tco-option reuse">
          <div class="tco-title">Reuse Existing</div>
          <div class="tco-amount">$${Math.round(reuseTCO.total5yr / 1000)}k</div>
          <div class="tco-breakdown">
            Year 1: $${Math.round(reuseTCO.year1 / 1000)}k<br>
            Years 2-5: $${Math.round(reuseTCO.ongoing / 1000)}k/year<br>
            <strong>Fastest ROI</strong>
          </div>
        </div>
      `
          : ""
      }
      
      ${
        buyTCO
          ? `
        <div class="tco-option buy">
          <div class="tco-title">Buy Market Solution</div>
          <div class="tco-amount">$${Math.round(buyTCO.total5yr / 1000)}k</div>
          <div class="tco-breakdown">
            Year 1: $${Math.round(buyTCO.year1 / 1000)}k<br>
            Years 2-5: $${Math.round(buyTCO.ongoing / 1000)}k/year<br>
            <strong>Vendor Support</strong>
          </div>
        </div>
      `
          : ""
      }
      
      ${
        buildTCO
          ? `
        <div class="tco-option build">
          <div class="tco-title">Build Custom</div>
          <div class="tco-amount">$${Math.round(buildTCO.total5yr / 1000)}k</div>
          <div class="tco-breakdown">
            Year 1: $${Math.round(buildTCO.year1 / 1000)}k<br>
            Years 2-5: $${Math.round(buildTCO.ongoing / 1000)}k/year<br>
            <strong>Full Control</strong>
          </div>
        </div>
      `
          : ""
      }
    </div>
    
    <div style="margin-top: 24px; padding: 16px; background: var(--border-light); border-radius: 8px;">
      <h4 style="font-weight: 700; margin-bottom: 8px;">TCO Analysis Summary</h4>
      <p style="font-size: 14px; color: var(--text-body); margin-bottom: 8px;">
        Based on your P4R budget of $${businessContext.p4rBudget ? (businessContext.p4rBudget / 1000).toFixed(0) + "k" : "N/A"} and ${businessContext.numberOfUsers || "estimated"} users:
      </p>
      <ul style="font-size: 13px; color: var(--text-secondary); margin-left: 20px;">
        <li>Hidden costs include integration, training, and ongoing maintenance</li>
        <li>Market solutions typically require 6-18 months implementation</li>
        <li>Custom builds have higher Year 1 costs but lower ongoing expenses</li>
        <li>Existing solution reuse offers fastest time-to-value</li>
      </ul>
    </div>
  `;

  section.classList.add("show");
  section.style.display = "block";
}

function generateMarketTrends(businessContext) {
  const trends = [
    {
      title: "Cloud-First Adoption",
      description:
        "85% of new enterprise solutions are cloud-native, reducing infrastructure overhead and enabling rapid scaling.",
    },
    {
      title: "AI/ML Integration",
      description:
        "Leading vendors are embedding AI capabilities, with 60% offering predictive analytics and automation features.",
    },
    {
      title: "Industry Consolidation",
      description:
        "Market consolidation continues with 3-5 major players dominating each category, improving solution maturity.",
    },
  ];

  if (businessContext.geoLocation === "Global") {
    trends.push({
      title: "Global Deployment Support",
      description:
        "Multi-region compliance and data residency requirements are now standard in enterprise solutions.",
    });
  }

  return trends;
}

function generateReuseInsights(existingSolutions, businessContext) {
  const insights = [];

  if (existingSolutions.length > 0) {
    const highPotential = existingSolutions.filter(
      (s) => s.reusePotential === "High",
    );
    if (highPotential.length > 0) {
      insights.push({
        title: "High Reuse Potential Identified",
        description: `${highPotential[0].name} shows strong alignment with your requirements and has ${highPotential[0].users} active users.`,
      });
    }

    const sameDomain = existingSolutions.filter(
      (s) => s.domain === businessContext.businessUnit,
    );
    if (sameDomain.length > 0) {
      insights.push({
        title: "Domain Alignment",
        description: `Found ${sameDomain.length} solutions within your ${businessContext.businessUnit} domain, reducing integration complexity.`,
      });
    }

    insights.push({
      title: "Extension Strategy",
      description:
        "Consider extending existing solutions rather than building from scratch to leverage proven architecture and user adoption.",
    });
  } else {
    insights.push({
      title: "Limited Reuse Options",
      description:
        "No strong existing solution matches found. Focus on Buy vs Build analysis for optimal decision.",
    });
  }

  return insights;
}

function generateRiskAnalysis(recommendation, matches, businessContext) {
  const risks = [];

  // Budget risk
  const budgetRisk =
    businessContext.p4rBudget > 0
      ? recommendation.topOption &&
        recommendation.topOption.budgetFit === "Over Budget"
        ? "High"
        : recommendation.topOption &&
            recommendation.topOption.budgetFit === "Close to Budget"
          ? "Medium"
          : "Low"
      : "Medium";

  risks.push({
    category: "Budget Risk",
    level: budgetRisk,
    description:
      budgetRisk === "High"
        ? "Recommended solution exceeds P4R budget significantly."
        : budgetRisk === "Medium"
          ? "Solution cost is close to budget limits."
          : "Solution fits comfortably within budget.",
    mitigation:
      budgetRisk === "High"
        ? "Consider phased implementation or alternative solutions."
        : budgetRisk === "Medium"
          ? "Negotiate pricing or reduce scope for initial phase."
          : "Proceed with full implementation.",
  });

  // Implementation risk
  const implRisk =
    recommendation.decision === "BUILD"
      ? "High"
      : recommendation.decision === "BUY"
        ? "Medium"
        : "Low";

  risks.push({
    category: "Implementation Risk",
    level: implRisk,
    description:
      implRisk === "High"
        ? "Custom development carries scope, timeline, and resource risks."
        : implRisk === "Medium"
          ? "Vendor solution requires integration and change management."
          : "Existing solution extension has minimal implementation risk.",
    mitigation:
      implRisk === "High"
        ? "Use agile methodology with frequent checkpoints and MVP approach."
        : implRisk === "Medium"
          ? "Engage vendor professional services and plan comprehensive training."
          : "Leverage existing support team and gradual rollout.",
  });

  // Vendor risk (for Buy decisions)
  if (recommendation.decision === "BUY") {
    risks.push({
      category: "Vendor Risk",
      level: matches.market[0]?.gartnerQuadrant === "Leader" ? "Low" : "Medium",
      description:
        matches.market[0]?.gartnerQuadrant === "Leader"
          ? "Market leader with strong track record and financial stability."
          : "Vendor stability and long-term roadmap should be evaluated.",
      mitigation:
        "Include SLA guarantees, escrow agreements, and exit clauses in contract negotiations.",
    });
  }

  return risks;
}

// Dummy analysis function for demo purposes
function createDummyAnalysis(requirementText, businessContext) {
  console.log("Creating dummy analysis with:", {
    requirementText,
    businessContext,
  });

  const dummyAnalysis = {
    matches: {
      existing: [
        {
          id: "sol-001",
          name: "PETRONAS Asset Management System (PAMS)",
          domain: "Operations",
          owner: "Digital & Technology",
          type: "Internal",
          annualCost: 450000,
          features: [
            "Asset tracking",
            "Maintenance scheduling",
            "Work order management",
            "Inventory management",
            "Mobile access",
            "Reporting & analytics",
          ],
          capabilities: ["Asset Management", "Maintenance", "Inventory"],
          users: 1200,
          reusePotential: "High",
          description:
            "Comprehensive asset and maintenance management system used across upstream operations.",
          matchScore: 85,
          matchedFeatures: [
            "Asset tracking",
            "Mobile access",
            "Reporting & analytics",
          ],
          budgetFit:
            businessContext.p4rBudget > 450000
              ? "Within Budget"
              : businessContext.p4rBudget > 360000
                ? "Close to Budget"
                : "Over Budget",
        },
        {
          id: "sol-002",
          name: "Enterprise Data Platform (EDP)",
          domain: "Data & Analytics",
          owner: "Data Office",
          type: "Internal",
          annualCost: 850000,
          features: [
            "Data lake",
            "ETL pipelines",
            "Data governance",
            "API access",
            "Real-time streaming",
            "ML model deployment",
          ],
          capabilities: ["Data Integration", "Analytics", "Data Governance"],
          users: 450,
          reusePotential: "Medium",
          description:
            "Centralized data platform for ingestion, processing, and analytics across PETRONAS.",
          matchScore: 65,
          matchedFeatures: ["Reporting & analytics"],
          budgetFit:
            businessContext.p4rBudget > 850000
              ? "Within Budget"
              : "Over Budget",
        },
      ],
      market: [
        {
          id: "mkt-001",
          name: "IBM Maximo",
          vendor: "IBM",
          category: "Asset Management",
          gartnerQuadrant: "Leader",
          features: [
            "Asset tracking",
            "Predictive maintenance",
            "Work order management",
            "IoT integration",
            "Mobile access",
            "AI-powered insights",
            "Reporting & analytics",
          ],
          pricingModel: "Per user/year",
          estimatedAnnualCost: 520000,
          implementationTime: "9-12 months",
          description:
            "Enterprise asset management leader with strong IoT and AI capabilities.",
          matchScore: 78,
          matchedFeatures: [
            "Asset tracking",
            "Mobile access",
            "Reporting & analytics",
          ],
          budgetFit:
            businessContext.p4rBudget > 520000
              ? "Within Budget"
              : businessContext.p4rBudget > 416000
                ? "Close to Budget"
                : "Over Budget",
        },
        {
          id: "mkt-002",
          name: "SAP EAM",
          vendor: "SAP",
          category: "Asset Management",
          gartnerQuadrant: "Leader",
          features: [
            "Asset lifecycle management",
            "Maintenance planning",
            "Work orders",
            "Integration with SAP ecosystem",
            "Mobile",
            "Analytics",
          ],
          pricingModel: "Per user/year",
          estimatedAnnualCost: 680000,
          implementationTime: "12-18 months",
          description:
            "Comprehensive EAM solution tightly integrated with SAP S/4HANA.",
          matchScore: 72,
          matchedFeatures: ["Asset tracking", "Mobile access"],
          budgetFit:
            businessContext.p4rBudget > 680000
              ? "Within Budget"
              : "Over Budget",
        },
      ],
      buildEstimate: {
        estimatedCost: businessContext.numberOfUsers > 100 ? 720000 : 480000,
        estimatedTime: "12-16 months",
        team: "Internal Development Team",
        risks: [
          "Resource availability",
          "Scope creep",
          "Integration complexity",
          "Ongoing maintenance burden",
        ],
        budgetFit:
          businessContext.p4rBudget >
          (businessContext.numberOfUsers > 100 ? 720000 : 480000)
            ? "Within Budget"
            : "Over Budget",
        businessContext: businessContext,
      },
    },
    recommendation: {
      decision: "REUSE",
      confidence: 85,
      reasoning: `Strong match found with existing solution "PETRONAS Asset Management System (PAMS)" (85% match). High reuse potential with 1200 current users. Fastest time to value for ${businessContext.businessUnit || "your business unit"}.`,
      topOption: {
        id: "sol-001",
        name: "PETRONAS Asset Management System (PAMS)",
        matchScore: 85,
        budgetFit:
          businessContext.p4rBudget > 450000
            ? "Within Budget"
            : "Close to Budget",
      },
    },
    businessContext: businessContext,
  };

  console.log("Dummy analysis created:", dummyAnalysis);
  return dummyAnalysis;
}
// Progress animation function
function startProgressAnimation() {
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const loadingText = document.getElementById("loadingText");

  const steps = [
    {
      progress: 20,
      text: "Parsing requirements",
      stepId: "step1",
      duration: 300,
    },
    {
      progress: 40,
      text: "Scanning existing solutions",
      stepId: "step2",
      duration: 300,
    },
    {
      progress: 60,
      text: "Analyzing market options",
      stepId: "step3",
      duration: 300,
    },
    {
      progress: 80,
      text: "Calculating TCO & risks",
      stepId: "step4",
      duration: 300,
    },
    {
      progress: 100,
      text: "Generating recommendation",
      stepId: "step5",
      duration: 3000,
    },
  ];

  let currentStep = 0;

  function animateStep() {
    switchTab("results");
    if (currentStep >= steps.length) {
      // Animation complete - now switch to results tab and scroll
      setTimeout(() => {
        document
          .getElementById("recommendationBanner")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }, 10000);
      return;
    }

    const step = steps[currentStep];

    // Update loading text
    loadingText.textContent = step.text;

    // Highlight current step
    document
      .querySelectorAll(".step-item")
      .forEach((item) => item.classList.remove("active"));
    document.getElementById(step.stepId).classList.add("active");

    // Animate progress bar
    progressFill.style.width = step.progress + "%";
    progressText.textContent = step.progress + "%";

    currentStep++;

    // Continue to next step
    setTimeout(animateStep, step.duration);
  }

  // Start animation after a brief delay
  setTimeout(animateStep, 200);
}
