// Buy vs Build Advisor - Main Application Logic

let currentAnalysis = null;
let functionalRequirements = [];
let nonFunctionalRequirements = [];
let requestRepository = []; // Store all submitted requests

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

  // Business Unit change handler for AIEA focal assignment
  document
    .getElementById("businessUnit")
    .addEventListener("change", updateAIEAFocal);

  // Tab switching
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Requirements input handlers
  document
    .getElementById("functionalInput")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") addRequirement("functional");
    });

  document
    .getElementById("nonFunctionalInput")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") addRequirement("nonFunctional");
    });

  // Add requirement button handlers
  document.getElementById("addFunctionalBtn").addEventListener("click", () => {
    document.getElementById("functionalInput").focus();
  });

  document
    .getElementById("addNonFunctionalBtn")
    .addEventListener("click", () => {
      document.getElementById("nonFunctionalInput").focus();
    });

  // Approval workflow handlers - with error checking
  const submitForApprovalBtn = document.getElementById("submitForApprovalBtn");
  if (submitForApprovalBtn) {
    submitForApprovalBtn.addEventListener("click", showApprovalWorkflow);
  }

  const submitWorkflowBtn = document.getElementById("submitWorkflowBtn");
  if (submitWorkflowBtn) {
    submitWorkflowBtn.addEventListener("click", submitApprovalRequest);
  }

  const cancelWorkflowBtn = document.getElementById("cancelWorkflowBtn");
  if (cancelWorkflowBtn) {
    cancelWorkflowBtn.addEventListener("click", hideApprovalWorkflow);
  }

  const newRequestBtn = document.getElementById("newRequestBtn");
  if (newRequestBtn) {
    newRequestBtn.addEventListener("click", resetWorkflow);
  }

  // Repository handlers
  const refreshRepositoryBtn = document.getElementById("refreshRepositoryBtn");
  if (refreshRepositoryBtn) {
    refreshRepositoryBtn.addEventListener("click", refreshRepository);
  }

  const statusFilter = document.getElementById("statusFilter");
  if (statusFilter) {
    statusFilter.addEventListener("change", filterRequests);
  }

  const buFilter = document.getElementById("buFilter");
  if (buFilter) {
    buFilter.addEventListener("change", filterRequests);
  }
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

// AIEA Focal Assignment based on Business Unit
function updateAIEAFocal() {
  const businessUnit = document.getElementById("businessUnit").value;
  const aieaFocalField = document.getElementById("aieaFocal");

  const aieaFocalMapping = {
    Corporate: "AIEA Corporate",
    Downstream: "AIEA Downstream",
    "Gas & Maritime": "AIEA Gas & Maritime",
    MPM: "AIEA MPM",
    "PE&T": "AIEA PE&T",
    Upstream: "AIEA Upstream",
  };

  if (businessUnit && aieaFocalMapping[businessUnit]) {
    aieaFocalField.value = aieaFocalMapping[businessUnit];
  } else {
    aieaFocalField.value = "";
  }
}

function loadSampleRequirements() {
  // Load sample business context
  document.getElementById("businessUnit").value = "Upstream";
  document.getElementById("aieaFocal").value = "AIEA Upstream"; // Auto-assign AIEA focal
  document.getElementById("operatingUnit").value = "Malaysia Operations";
  document.getElementById("p4rBudget").value = "750000";
  document.getElementById("numberOfUsers").value = "150";
  document.getElementById("targetUsers").value =
    "Field Engineers, Maintenance Technicians, Operations Managers";
  document.getElementById("geoLocation").value = "Malaysia";

  // Clear existing requirements
  functionalRequirements = [];
  nonFunctionalRequirements = [];

  // Load sample functional requirements
  const sampleFunctional = [
    "Asset tracking and maintenance scheduling",
    "Mobile access for field workers",
    "Work order management",
    "Reporting and analytics",
    "Integration with existing SAP systems",
    "Predictive maintenance capabilities",
  ];

  // Load sample non-functional requirements
  const sampleNonFunctional = [
    "Support 500+ concurrent users",
    "99.9% uptime availability",
    "Response time under 2 seconds",
    "Mobile-responsive design",
    "Role-based access control",
    "Data encryption at rest and in transit",
  ];

  sampleFunctional.forEach((req) => {
    functionalRequirements.push(req);
  });

  sampleNonFunctional.forEach((req) => {
    nonFunctionalRequirements.push(req);
  });

  renderRequirements();
}

function addRequirement(type) {
  const inputId =
    type === "functional" ? "functionalInput" : "nonFunctionalInput";
  const input = document.getElementById(inputId);
  const text = input.value.trim();

  if (!text) return;

  if (type === "functional") {
    functionalRequirements.push(text);
  } else {
    nonFunctionalRequirements.push(text);
  }

  input.value = "";
  renderRequirements();
}

function removeRequirement(type, index) {
  if (type === "functional") {
    functionalRequirements.splice(index, 1);
  } else {
    nonFunctionalRequirements.splice(index, 1);
  }
  renderRequirements();
}

function renderRequirements() {
  renderRequirementsList(
    "functionalRequirements",
    functionalRequirements,
    "functional",
  );
  renderRequirementsList(
    "nonFunctionalRequirements",
    nonFunctionalRequirements,
    "nonFunctional",
  );
}

function renderRequirementsList(containerId, requirements, type) {
  const container = document.getElementById(containerId);

  if (requirements.length === 0) {
    container.innerHTML = `
      <li class="requirements-empty">
        No ${type} requirements added yet. Click + to add some.
      </li>
    `;
    return;
  }

  container.innerHTML = requirements
    .map(
      (req, index) => `
    <li class="requirement-item">
      <span class="requirement-text">${req}</span>
      <button class="remove-btn" onclick="removeRequirement('${type}', ${index})" title="Remove requirement">
        ×
      </button>
    </li>
  `,
    )
    .join("");
}

function getAllRequirements() {
  return [...functionalRequirements, ...nonFunctionalRequirements].join("\n");
}

function analyzeRequirements() {
  const requirementText = getAllRequirements();

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
    alert("Please add some functional or non-functional requirements first.");
    return;
  }

  if (!businessContext.businessUnit || !businessContext.operatingUnit) {
    alert("Please fill in the Business Unit and Operating Unit.");
    return;
  }

  // Show loading state
  showLoading();

  // Simulate analysis delay - match the progress animation duration
  setTimeout(() => {
    // Use dummy analysis for demo
    currentAnalysis = createDummyAnalysis(requirementText, businessContext);
    console.log("Analysis completed:", currentAnalysis);
    displayResults();
  }, 20500);
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

  // Show approval button after analysis is complete
  showApprovalButton();

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
          RM${(solution.annualCost / 1000).toFixed(0)}k
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
          RM${(solution.estimatedAnnualCost / 1000).toFixed(0)}k
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
          RM${(buildEstimate.estimatedCost / 1000).toFixed(0)}k
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
        <span class="info-value">RM${((buildEstimate.estimatedCost * 0.15) / 1000).toFixed(0)}k/year</span>
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
  const industryCapabilitiesHtml = solution.industryCapabilities
    ? Object.entries(solution.industryCapabilities)
        .map(
          ([capability, description]) => `
      <div class="capability-item">
        <div class="capability-name">${capability}</div>
        <div class="capability-description">${description}</div>
      </div>
    `,
        )
        .join("")
    : "";

  return `
    <div class="catalog-card enhanced">
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
      
      <div class="cost-section">
        <div class="catalog-cost">
          RM${(solution.annualCost / 1000).toFixed(0)}k
          <span class="catalog-cost-label">/ year</span>
        </div>
      </div>
      
      <div class="capabilities-section">
        <div class="section-title">Core Capabilities</div>
        <div class="capabilities-grid">
          ${solution.capabilities
            .slice(0, 6)
            .map((cap) => `<span class="capability-tag">${cap}</span>`)
            .join("")}
          ${solution.capabilities.length > 6 ? `<span class="capability-tag more">+${solution.capabilities.length - 6} more</span>` : ""}
        </div>
      </div>

      ${
        solution.industryCapabilities
          ? `
        <div class="industry-capabilities-section">
          <div class="section-title">
            Industry-Grade Capabilities
            <span class="industry-badge">Gartner/Forrester Aligned</span>
          </div>
          <div class="industry-capabilities">
            ${industryCapabilitiesHtml}
          </div>
        </div>
      `
          : ""
      }

      ${
        solution.gartnerAlignment || solution.forresterAlignment
          ? `
        <div class="analyst-alignment">
          ${solution.gartnerAlignment ? `<div class="alignment-item gartner">📊 ${solution.gartnerAlignment}</div>` : ""}
          ${solution.forresterAlignment ? `<div class="alignment-item forrester">📈 ${solution.forresterAlignment}</div>` : ""}
        </div>
      `
          : ""
      }
    </div>
  `;
}

function createMarketCard(solution) {
  const industryCapabilitiesHtml = solution.industryCapabilities
    ? Object.entries(solution.industryCapabilities)
        .map(
          ([capability, description]) => `
      <div class="capability-item">
        <div class="capability-name">${capability}</div>
        <div class="capability-description">${description}</div>
      </div>
    `,
        )
        .join("")
    : "";

  return `
    <div class="catalog-card enhanced" style="border-left-color: var(--p-purple);">
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
        <span>💰 ${solution.pricingModel}</span>
      </div>
      
      <div class="cost-section">
        <div class="catalog-cost" style="color: var(--p-purple);">
          RM${(solution.estimatedAnnualCost / 1000).toFixed(0)}k
          <span class="catalog-cost-label">/ year (est.)</span>
        </div>
      </div>
      
      <div class="capabilities-section">
        <div class="section-title">Core Capabilities</div>
        <div class="capabilities-grid">
          ${solution.capabilities
            .slice(0, 6)
            .map((cap) => `<span class="capability-tag">${cap}</span>`)
            .join("")}
          ${solution.capabilities.length > 6 ? `<span class="capability-tag more">+${solution.capabilities.length - 6} more</span>` : ""}
        </div>
      </div>

      ${
        solution.industryCapabilities
          ? `
        <div class="industry-capabilities-section">
          <div class="section-title">
            Industry-Grade Capabilities
            <span class="industry-badge">Gartner/Forrester Aligned</span>
          </div>
          <div class="industry-capabilities">
            ${industryCapabilitiesHtml}
          </div>
        </div>
      `
          : ""
      }

      ${
        solution.gartnerAlignment || solution.forresterAlignment
          ? `
        <div class="analyst-alignment">
          ${solution.gartnerAlignment ? `<div class="alignment-item gartner">📊 ${solution.gartnerAlignment}</div>` : ""}
          ${solution.forresterAlignment ? `<div class="alignment-item forrester">📈 ${solution.forresterAlignment}</div>` : ""}
        </div>
      `
          : ""
      }
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
        <div class="metric">RM${Math.round(avgMarketCost / 1000)}k/year</div>
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
        <div class="metric">RM${existingSolutions.length > 0 ? Math.round(((matches.buildEstimate?.estimatedCost || 0) - (existingSolutions[0]?.annualCost || 0) * 3) / 1000) : 0}k</div>
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

  // Create TCO graph data
  const tcoOptions = [];
  if (reuseTCO) {
    tcoOptions.push({
      name: "Reuse Existing",
      total: reuseTCO.total5yr,
      year1: reuseTCO.year1,
      ongoing: reuseTCO.ongoing,
      type: "reuse",
      benefit: "Fastest ROI",
    });
  }
  if (buyTCO) {
    tcoOptions.push({
      name: "Buy Market Solution",
      total: buyTCO.total5yr,
      year1: buyTCO.year1,
      ongoing: buyTCO.ongoing,
      type: "buy",
      benefit: "Vendor Support",
    });
  }
  if (buildTCO) {
    tcoOptions.push({
      name: "Build Custom",
      total: buildTCO.total5yr,
      year1: buildTCO.year1,
      ongoing: buildTCO.ongoing,
      type: "build",
      benefit: "Full Control",
    });
  }

  // Find max value for scaling
  const maxTotal = Math.max(...tcoOptions.map((opt) => opt.total));

  content.innerHTML = `
    <div class="tco-graph-container">
      <h4 style="font-weight: 700; margin-bottom: 20px; text-align: center;">5-Year Total Cost Comparison</h4>
      
      <div class="tco-bar-chart">
        ${tcoOptions
          .map((option) => {
            const percentage = (option.total / maxTotal) * 100;
            const savings =
              option.total === Math.min(...tcoOptions.map((opt) => opt.total))
                ? 0
                : option.total -
                  Math.min(...tcoOptions.map((opt) => opt.total));

            return `
            <div class="tco-bar-item">
              <div class="tco-bar-header">
                <div class="tco-bar-title">${option.name}</div>
                <div class="tco-bar-amount">RM${Math.round(option.total / 1000)}k</div>
                ${savings > 0 ? `<div class="tco-savings">+RM${Math.round(savings / 1000)}k vs lowest</div>` : '<div class="tco-best">Best Value</div>'}
              </div>
              
              <div class="tco-bar-container">
                <div class="tco-bar ${option.type}" style="width: ${percentage}%">
                  <div class="tco-bar-fill"></div>
                </div>
                <div class="tco-percentage">${Math.round(percentage)}%</div>
              </div>
              
              <div class="tco-breakdown-inline">
                <span class="year1-cost">Year 1: RM${Math.round(option.year1 / 1000)}k</span>
                <span class="ongoing-cost">Years 2-5: RM${Math.round(option.ongoing / 1000)}k/year</span>
                <span class="benefit-tag">${option.benefit}</span>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
    
    <div class="tco-summary-cards">
      ${tcoOptions
        .map(
          (option) => `
        <div class="tco-card ${option.type}">
          <div class="tco-card-header">
            <div class="tco-card-title">${option.name}</div>
            <div class="tco-card-amount">RM${Math.round(option.total / 1000)}k</div>
          </div>
          <div class="tco-card-breakdown">
            Year 1: RM${Math.round(option.year1 / 1000)}k<br>
            Years 2-5: RM${Math.round(option.ongoing / 1000)}k/year<br>
            <strong>${option.benefit}</strong>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
    
    <div style="margin-top: 24px; padding: 16px; background: var(--border-light); border-radius: 8px;">
      <h4 style="font-weight: 700; margin-bottom: 8px;">TCO Analysis Summary</h4>
      <p style="font-size: 14px; color: var(--text-body); margin-bottom: 8px;">
        Based on your P4R budget of RM${businessContext.p4rBudget ? (businessContext.p4rBudget / 1000).toFixed(0) + "k" : "N/A"} and ${businessContext.numberOfUsers || "estimated"} users:
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
      duration: 4000,
    },
    {
      progress: 40,
      text: "Scanning existing solutions",
      stepId: "step2",
      duration: 4000,
    },
    {
      progress: 60,
      text: "Analyzing market options",
      stepId: "step3",
      duration: 4000,
    },
    {
      progress: 80,
      text: "Calculating TCO & risks",
      stepId: "step4",
      duration: 4000,
    },
    {
      progress: 100,
      text: "Generating recommendation",
      stepId: "step5",
      duration: 4000,
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
// Approval Workflow Functions
function showApprovalWorkflow() {
  document.getElementById("approvalWorkflow").style.display = "block";
  document.getElementById("workflowStatus").style.display = "none";

  // Pre-fill some fields based on analysis
  const businessUnit = document.getElementById("businessUnit").value;
  const requestTitle = `${businessUnit} - Buy vs Build Analysis Request`;
  document.getElementById("requestTitle").value = requestTitle;

  // Scroll to workflow section
  document.getElementById("approvalWorkflow").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function hideApprovalWorkflow() {
  document.getElementById("approvalWorkflow").style.display = "none";
}

function submitApprovalRequest() {
  // Validate required fields
  const requiredFields = [
    "requestTitle",
    "businessJustification",
    "requestorName",
    "requestorEmail",
    "managerEmail",
    "seniorManagerEmail",
  ];

  let isValid = true;
  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      field.style.borderColor = "#dc3545";
      isValid = false;
    } else {
      field.style.borderColor = "";
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Generate request ID
  const requestId = `REQ-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
  document.getElementById("requestId").textContent = requestId;

  // Create request object and save to repository
  const request = {
    id: requestId,
    title: document.getElementById("requestTitle").value,
    businessUnit: document.getElementById("businessUnit").value,
    operatingUnit: document.getElementById("operatingUnit").value,
    requestor: document.getElementById("requestorName").value,
    requestorEmail: document.getElementById("requestorEmail").value,
    managerEmail: document.getElementById("managerEmail").value,
    seniorManagerEmail: document.getElementById("seniorManagerEmail").value,
    businessJustification: document.getElementById("businessJustification")
      .value,
    submittedDate: new Date(),
    managerStatus: "pending",
    seniorManagerStatus: "not-started",
    businessAckStatus: "not-started",
    overallStatus: "pending",
    functionalRequirements: [...functionalRequirements],
    nonFunctionalRequirements: [...nonFunctionalRequirements],
    analysis: currentAnalysis,
  };

  requestRepository.push(request);

  // Update submitter info
  document.getElementById("submittedBy").textContent =
    document.getElementById("requestorName").value;

  // Extract manager names from emails (simple extraction)
  const managerEmail = document.getElementById("managerEmail").value;
  const seniorManagerEmail =
    document.getElementById("seniorManagerEmail").value;

  document.getElementById("managerName").textContent =
    extractNameFromEmail(managerEmail);
  document.getElementById("seniorManagerName").textContent =
    extractNameFromEmail(seniorManagerEmail);

  // Show status and hide form
  document.getElementById("workflowStatus").style.display = "block";
  document.querySelector(".workflow-form").style.display = "none";

  // Refresh repository display
  refreshRepository();

  // Simulate workflow progression after a delay
  setTimeout(() => {
    simulateApprovalProgress(requestId);
  }, 3000);
}

function extractNameFromEmail(email) {
  if (!email) return "Unknown";
  const namePart = email.split("@")[0];
  return namePart
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function simulateApprovalProgress() {
  // Simulate manager approval
  const managerStep = document.getElementById("step-manager");
  managerStep.classList.remove("pending");
  managerStep.classList.add("approved");
  managerStep.querySelector(".timeline-icon").textContent = "✓";
  managerStep.querySelector(".timeline-date").textContent =
    "March 12, 2026 - 3:45 PM";

  document.getElementById("currentStatus").textContent =
    "Pending Senior Manager Approval";

  // Move to senior manager step
  const seniorStep = document.getElementById("step-senior");
  seniorStep.classList.add("pending");

  // Simulate senior manager approval after another delay
  setTimeout(() => {
    seniorStep.classList.remove("pending");
    seniorStep.classList.add("approved");
    seniorStep.querySelector(".timeline-icon").textContent = "✓";
    seniorStep.querySelector(".timeline-date").textContent =
      "March 12, 2026 - 4:20 PM";

    document.getElementById("currentStatus").textContent =
      "Pending Business Acknowledgement";

    // Move to business acknowledgement
    const businessStep = document.getElementById("step-business");
    businessStep.classList.add("pending");

    // Final approval
    setTimeout(() => {
      businessStep.classList.remove("pending");
      businessStep.classList.add("approved");
      businessStep.querySelector(".timeline-icon").textContent = "✓";
      businessStep.querySelector(".timeline-date").textContent =
        "March 13, 2026 - 9:15 AM";

      document.getElementById("currentStatus").textContent =
        "Approved - Ready for Implementation";
      document.getElementById("currentStatus").style.color = "var(--p-emerald)";

      // Show success message
      showApprovalSuccess();
    }, 4000);
  }, 5000);
}

function showApprovalSuccess() {
  const statusHeader = document.querySelector(".status-header");
  const successBanner = document.createElement("div");
  successBanner.className = "success-banner";
  successBanner.innerHTML = `
    <div style="background: var(--p-emerald); color: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
      <h4 style="margin: 0 0 8px 0;">🎉 Request Approved!</h4>
      <p style="margin: 0; font-size: 14px;">Your Buy vs Build analysis has been officially approved. You can now proceed with implementation planning.</p>
    </div>
  `;
  statusHeader.appendChild(successBanner);
}

function resetWorkflow() {
  // Reset form
  document.querySelector(".workflow-form").style.display = "block";
  document.getElementById("workflowStatus").style.display = "none";

  // Clear form fields
  document.getElementById("requestTitle").value = "";
  document.getElementById("businessJustification").value = "";
  document.getElementById("requestorName").value = "";
  document.getElementById("requestorEmail").value = "";
  document.getElementById("managerEmail").value = "";
  document.getElementById("seniorManagerEmail").value = "";

  // Reset timeline
  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.classList.remove("active", "pending", "approved", "rejected");
  });

  document.getElementById("step-submitted").classList.add("active");

  // Reset icons and dates
  document.querySelectorAll(".timeline-icon").forEach((icon, index) => {
    if (index === 0) {
      icon.textContent = "✓";
    } else {
      icon.textContent = "○";
    }
  });

  document.querySelectorAll(".timeline-date").forEach((date, index) => {
    if (index === 0) {
      date.textContent = "March 12, 2026 - 2:30 PM";
    } else {
      date.textContent = "-";
    }
  });

  // Remove success banner if exists
  const successBanner = document.querySelector(".success-banner");
  if (successBanner) {
    successBanner.remove();
  }

  document.getElementById("currentStatus").textContent =
    "Pending Manager Approval";
  document.getElementById("currentStatus").style.color = "";
}

// Show approval button after analysis is complete
function showApprovalButton() {
  document.getElementById("approvalButtonSection").style.display = "block";
}
// Request Repository Functions
function refreshRepository() {
  renderRequestsTable();
  updateRepositoryStats();
}

function renderRequestsTable() {
  const tbody = document.getElementById("requestsTableBody");
  const statusFilter = document.getElementById("statusFilter").value;
  const buFilter = document.getElementById("buFilter").value;

  // Filter requests
  let filteredRequests = requestRepository;

  if (statusFilter !== "all") {
    filteredRequests = filteredRequests.filter((req) => {
      switch (statusFilter) {
        case "pending":
          return req.overallStatus === "pending";
        case "manager-approved":
          return (
            req.managerStatus === "approved" &&
            req.seniorManagerStatus !== "approved"
          );
        case "senior-approved":
          return (
            req.seniorManagerStatus === "approved" &&
            req.businessAckStatus !== "approved"
          );
        case "fully-approved":
          return req.businessAckStatus === "approved";
        case "rejected":
          return req.overallStatus === "rejected";
        default:
          return true;
      }
    });
  }

  if (buFilter !== "all") {
    filteredRequests = filteredRequests.filter(
      (req) => req.businessUnit === buFilter,
    );
  }

  // Show empty state if no requests
  if (filteredRequests.length === 0) {
    tbody.innerHTML = "";
    document.getElementById("emptyRepository").style.display = "block";
    document.querySelector(".requests-table-container").style.display = "none";
    return;
  }

  document.getElementById("emptyRepository").style.display = "none";
  document.querySelector(".requests-table-container").style.display = "block";

  // Render table rows
  tbody.innerHTML = filteredRequests
    .map(
      (request) => `
    <tr>
      <td><span class="request-id">${request.id}</span></td>
      <td><div class="request-title" title="${request.title}">${request.title}</div></td>
      <td><span class="bu-badge">${request.businessUnit}</span></td>
      <td>
        <div class="requestor-info">${request.requestor}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${request.requestorEmail}</div>
      </td>
      <td><div class="submitted-date">${formatDate(request.submittedDate)}</div></td>
      <td><span class="status-badge ${getStatusClass(request.managerStatus)}">${formatStatus(request.managerStatus)}</span></td>
      <td><span class="status-badge ${getStatusClass(request.seniorManagerStatus)}">${formatStatus(request.seniorManagerStatus)}</span></td>
      <td><span class="status-badge ${getStatusClass(request.businessAckStatus)}">${formatStatus(request.businessAckStatus)}</span></td>
      <td><span class="overall-status ${request.overallStatus}">${formatOverallStatus(request.overallStatus)}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn view" onclick="viewRequest('${request.id}')" title="View Details">👁️</button>
          <button class="action-btn edit" onclick="editRequest('${request.id}')" title="Edit Request">✏️</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

function updateRepositoryStats() {
  const total = requestRepository.length;
  const pending = requestRepository.filter(
    (req) => req.overallStatus === "pending",
  ).length;
  const approved = requestRepository.filter(
    (req) => req.businessAckStatus === "approved",
  ).length;

  document.getElementById("totalRequests").textContent = total;
  document.getElementById("pendingRequests").textContent = pending;
  document.getElementById("approvedRequests").textContent = approved;
}

function filterRequests() {
  renderRequestsTable();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "status-pending";
    case "approved":
      return "status-approved";
    case "rejected":
      return "status-rejected";
    default:
      return "status-not-started";
  }
}

function formatStatus(status) {
  switch (status) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "not-started":
      return "Not Started";
    default:
      return "Unknown";
  }
}

function formatOverallStatus(status) {
  switch (status) {
    case "pending":
      return "Pending Approval";
    case "approved":
      return "Fully Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Unknown";
  }
}

function viewRequest(requestId) {
  const request = requestRepository.find((req) => req.id === requestId);
  if (!request) return;

  alert(
    `Request Details:\n\nID: ${request.id}\nTitle: ${request.title}\nBU: ${request.businessUnit}\nRequestor: ${request.requestor}\nStatus: ${formatOverallStatus(request.overallStatus)}\n\nFunctional Requirements: ${request.functionalRequirements.length}\nNon-Functional Requirements: ${request.nonFunctionalRequirements.length}`,
  );
}

function editRequest(requestId) {
  alert(
    `Edit functionality would open a form to modify request ${requestId}. This is a prototype feature.`,
  );
}

// Update simulateApprovalProgress to work with repository
function simulateApprovalProgress(requestId) {
  const request = requestRepository.find((req) => req.id === requestId);
  if (!request) return;

  // Simulate manager approval
  const managerStep = document.getElementById("step-manager");
  managerStep.classList.remove("pending");
  managerStep.classList.add("approved");
  managerStep.querySelector(".timeline-icon").textContent = "✓";
  managerStep.querySelector(".timeline-date").textContent =
    "March 12, 2026 - 3:45 PM";

  // Update request in repository
  request.managerStatus = "approved";

  document.getElementById("currentStatus").textContent =
    "Pending Senior Manager Approval";

  // Move to senior manager step
  const seniorStep = document.getElementById("step-senior");
  seniorStep.classList.add("pending");

  // Refresh repository display
  refreshRepository();

  // Simulate senior manager approval after another delay
  setTimeout(() => {
    seniorStep.classList.remove("pending");
    seniorStep.classList.add("approved");
    seniorStep.querySelector(".timeline-icon").textContent = "✓";
    seniorStep.querySelector(".timeline-date").textContent =
      "March 12, 2026 - 4:20 PM";

    // Update request in repository
    request.seniorManagerStatus = "approved";

    document.getElementById("currentStatus").textContent =
      "Pending Business Acknowledgement";

    // Move to business acknowledgement
    const businessStep = document.getElementById("step-business");
    businessStep.classList.add("pending");

    // Refresh repository display
    refreshRepository();

    // Final approval
    setTimeout(() => {
      businessStep.classList.remove("pending");
      businessStep.classList.add("approved");
      businessStep.querySelector(".timeline-icon").textContent = "✓";
      businessStep.querySelector(".timeline-date").textContent =
        "March 13, 2026 - 9:15 AM";

      // Update request in repository
      request.businessAckStatus = "approved";
      request.overallStatus = "approved";

      document.getElementById("currentStatus").textContent =
        "Approved - Ready for Implementation";
      document.getElementById("currentStatus").style.color = "var(--p-emerald)";

      // Refresh repository display
      refreshRepository();

      // Show success message
      showApprovalSuccess();
    }, 4000);
  }, 5000);
}

// Initialize repository with sample data
function initializeSampleRepository() {
  const sampleRequests = [
    {
      id: "REQ-2024-001",
      title: "Upstream Asset Management System Analysis",
      businessUnit: "Upstream",
      operatingUnit: "Malaysia Operations",
      requestor: "Ahmad Rahman",
      requestorEmail: "ahmad.rahman@petronas.com",
      managerEmail: "sarah.lim@petronas.com",
      seniorManagerEmail: "david.wong@petronas.com",
      businessJustification:
        "Need comprehensive asset tracking system for offshore operations to improve maintenance efficiency and reduce downtime.",
      submittedDate: new Date("2024-03-10T09:30:00"),
      managerStatus: "approved",
      seniorManagerStatus: "approved",
      businessAckStatus: "pending",
      overallStatus: "pending",
      functionalRequirements: [
        "Asset tracking",
        "Maintenance scheduling",
        "Mobile access",
      ],
      nonFunctionalRequirements: ["Support 200+ users", "99.5% uptime"],
      analysis: null,
    },
    {
      id: "REQ-2024-002",
      title: "Gas & Maritime CRM Solution Evaluation",
      businessUnit: "Gas & Maritime",
      operatingUnit: "Commercial Operations",
      requestor: "Lisa Chen",
      requestorEmail: "lisa.chen@petronas.com",
      managerEmail: "michael.tan@petronas.com",
      seniorManagerEmail: "jennifer.lee@petronas.com",
      businessJustification:
        "Replace legacy CRM system to improve customer relationship management and sales pipeline tracking.",
      submittedDate: new Date("2024-03-08T14:15:00"),
      managerStatus: "approved",
      seniorManagerStatus: "pending",
      businessAckStatus: "not-started",
      overallStatus: "pending",
      functionalRequirements: [
        "Customer management",
        "Sales pipeline",
        "Reporting",
      ],
      nonFunctionalRequirements: ["Mobile responsive", "Integration with SAP"],
      analysis: null,
    },
    {
      id: "REQ-2024-003",
      title: "Corporate HR Analytics Platform",
      businessUnit: "Corporate",
      operatingUnit: "Human Resources",
      requestor: "Robert Kumar",
      requestorEmail: "robert.kumar@petronas.com",
      managerEmail: "priya.singh@petronas.com",
      seniorManagerEmail: "james.ooi@petronas.com",
      businessJustification:
        "Implement advanced HR analytics to improve talent management and workforce planning across all business units.",
      submittedDate: new Date("2024-03-05T11:45:00"),
      managerStatus: "pending",
      seniorManagerStatus: "not-started",
      businessAckStatus: "not-started",
      overallStatus: "pending",
      functionalRequirements: [
        "Employee analytics",
        "Performance tracking",
        "Workforce planning",
      ],
      nonFunctionalRequirements: [
        "Real-time dashboards",
        "Data privacy compliance",
      ],
      analysis: null,
    },
  ];

  requestRepository.push(...sampleRequests);
  refreshRepository();
}

// Initialize sample data when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initializeSampleRepository();
  }, 1000);
});
