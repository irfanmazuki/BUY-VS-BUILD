// Mock data for Buy vs Build Advisor

const mockData = {
  // Existing internal solutions catalog
  existingSolutions: [
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
      capabilities: [
        "Asset Lifecycle Management",
        "Preventive Maintenance",
        "Work Order Management",
        "Inventory Optimization",
        "Mobile Workforce Management",
        "Predictive Analytics",
        "Compliance Management",
        "Document Management",
        "Workflow Automation",
        "Real-time Monitoring",
      ],
      industryCapabilities: {
        "Workflow Management":
          "Advanced workflow engine with approval routing, escalation rules, and automated task assignment",
        "Asset Performance Management":
          "Real-time asset health monitoring with KPI dashboards and performance trending",
        "Maintenance Optimization":
          "Condition-based maintenance scheduling with failure prediction algorithms",
        "Mobile Operations":
          "Offline-capable mobile app for field technicians with barcode scanning and photo capture",
        "Integration Platform":
          "REST APIs and SAP integration for seamless data exchange with enterprise systems",
        "Regulatory Compliance":
          "Built-in compliance frameworks for ISO 55000, API standards, and safety regulations",
      },
      users: 1200,
      reusePotential: "High",
      description:
        "Comprehensive asset and maintenance management system used across upstream operations.",
      gartnerAlignment:
        "Aligns with Gartner's Enterprise Asset Management (EAM) capabilities framework",
      forresterAlignment:
        "Meets Forrester's Connected Maintenance platform requirements",
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
      capabilities: [
        "Data Lake Architecture",
        "Real-time Data Processing",
        "Data Governance & Lineage",
        "Self-Service Analytics",
        "Machine Learning Operations",
        "API Management",
        "Data Quality Management",
        "Master Data Management",
        "Data Catalog & Discovery",
        "Advanced Analytics",
      ],
      industryCapabilities: {
        "Data Fabric Architecture":
          "Unified data management across hybrid cloud environments with automated data discovery",
        "Streaming Analytics":
          "Real-time data processing with Apache Kafka and Spark for operational intelligence",
        "DataOps Automation":
          "CI/CD pipelines for data with automated testing, validation, and deployment",
        "Governance & Compliance":
          "Comprehensive data lineage, privacy controls, and regulatory compliance (GDPR, SOX)",
        "Self-Service BI":
          "Drag-and-drop analytics interface with natural language query capabilities",
        "ML Model Management":
          "End-to-end MLOps with model versioning, A/B testing, and performance monitoring",
      },
      users: 450,
      reusePotential: "High",
      description:
        "Centralized data platform for ingestion, processing, and analytics across PETRONAS.",
      gartnerAlignment:
        "Follows Gartner's Data and Analytics Platform architecture patterns",
      forresterAlignment:
        "Implements Forrester's Enterprise Data Fabric reference architecture",
    },
    {
      id: "sol-003",
      name: "Vendor Management Portal",
      domain: "Procurement",
      owner: "Supply Chain",
      type: "Vendor (SAP Ariba)",
      annualCost: 320000,
      features: [
        "Vendor onboarding",
        "Contract management",
        "Performance tracking",
        "Compliance checks",
        "Invoice processing",
      ],
      capabilities: [
        "Supplier Lifecycle Management",
        "Contract Lifecycle Management",
        "Procurement Workflow",
        "Supplier Risk Management",
        "Performance Analytics",
        "Compliance Automation",
        "Invoice Automation",
        "Spend Analytics",
        "Supplier Collaboration",
        "Audit Trail Management",
      ],
      industryCapabilities: {
        "Procurement Orchestration":
          "End-to-end procurement workflows with approval hierarchies and spend controls",
        "Supplier Risk Intelligence":
          "Real-time supplier risk monitoring with ESG scoring and financial health analysis",
        "Contract Intelligence":
          "AI-powered contract analysis with clause extraction and obligation tracking",
        "Spend Optimization":
          "Advanced spend analytics with category management and savings opportunity identification",
        "Supplier Collaboration":
          "Integrated supplier portal with document sharing, communication, and performance feedback",
        "Compliance Automation":
          "Automated compliance checking against regulatory requirements and company policies",
      },
      users: 680,
      reusePotential: "Medium",
      description: "SAP Ariba-based vendor and contract management system.",
      gartnerAlignment:
        "Based on Gartner Magic Quadrant Leader SAP Ariba for Procurement Solutions",
      forresterAlignment:
        "Implements Forrester Wave Strategic Sourcing Suite capabilities",
    },
    {
      id: "sol-004",
      name: "Project Portfolio Manager (PPM)",
      domain: "Project Management",
      owner: "PMO",
      type: "Vendor (Microsoft PPM)",
      annualCost: 180000,
      features: [
        "Project planning",
        "Resource allocation",
        "Budget tracking",
        "Risk management",
        "Portfolio dashboards",
      ],
      capabilities: [
        "Portfolio Management",
        "Project Planning & Scheduling",
        "Resource Management",
        "Financial Management",
        "Risk & Issue Management",
        "Collaboration Tools",
        "Reporting & Analytics",
        "Workflow Automation",
        "Document Management",
        "Integration Platform",
      ],
      industryCapabilities: {
        "Portfolio Optimization":
          "AI-driven portfolio optimization with resource leveling and strategic alignment scoring",
        "Agile & Waterfall Support":
          "Hybrid project methodologies with Scrum, Kanban, and traditional Gantt planning",
        "Resource Intelligence":
          "Skills-based resource matching with capacity planning and utilization analytics",
        "Financial Controls":
          "Integrated budgeting, forecasting, and earned value management with real-time cost tracking",
        "Risk Analytics":
          "Predictive risk modeling with Monte Carlo simulation and scenario planning",
        "Stakeholder Collaboration":
          "Microsoft Teams integration with automated status reporting and stakeholder dashboards",
      },
      users: 320,
      reusePotential: "High",
      description:
        "Microsoft-based project and portfolio management tool for enterprise projects.",
      gartnerAlignment:
        "Microsoft Project recognized in Gartner's Project Portfolio Management software evaluation",
      forresterAlignment:
        "Aligns with Forrester's Collaborative Work Management platform capabilities",
    },
    {
      id: "sol-005",
      name: "Customer Relationship Hub",
      domain: "Commercial",
      owner: "Marketing & Trading",
      type: "Internal",
      annualCost: 280000,
      features: [
        "Customer profiles",
        "Sales pipeline",
        "Campaign management",
        "Analytics",
        "Integration with SAP",
      ],
      capabilities: [
        "Customer Data Management",
        "Sales Force Automation",
        "Marketing Automation",
        "Customer Analytics",
        "Lead Management",
        "Opportunity Management",
        "Campaign Management",
        "Customer Service",
        "Integration Platform",
        "Mobile CRM",
      ],
      industryCapabilities: {
        "Customer 360 Platform":
          "Unified customer view with real-time data aggregation from multiple touchpoints",
        "Intelligent Sales Automation":
          "AI-powered lead scoring, opportunity prediction, and next-best-action recommendations",
        "Omnichannel Marketing":
          "Integrated marketing campaigns across email, social, web, and mobile channels",
        "Predictive Analytics":
          "Customer lifetime value modeling, churn prediction, and cross-sell/upsell optimization",
        "Workflow Automation":
          "Configurable business processes with approval workflows and automated task routing",
        "Enterprise Integration":
          "Pre-built connectors for SAP, Oracle, and other enterprise systems with real-time sync",
      },
      users: 540,
      reusePotential: "Medium",
      description:
        "Custom-built CRM for B2B customer management and sales tracking.",
      gartnerAlignment:
        "Incorporates Gartner's CRM Customer Engagement Center capabilities",
      forresterAlignment:
        "Follows Forrester's B2B Marketing Automation platform best practices",
    },
  ],

  // Market solutions (Gartner/Forrester style)
  marketSolutions: [
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
    },
    {
      id: "mkt-003",
      name: "Snowflake Data Cloud",
      vendor: "Snowflake",
      category: "Data Platform",
      gartnerQuadrant: "Leader",
      features: [
        "Cloud data warehouse",
        "Data sharing",
        "Multi-cloud support",
        "Scalability",
        "Data marketplace",
        "ML integration",
      ],
      pricingModel: "Consumption-based",
      estimatedAnnualCost: 950000,
      implementationTime: "6-9 months",
      description:
        "Leading cloud data platform with elastic scalability and data sharing.",
    },
    {
      id: "mkt-004",
      name: "Salesforce",
      vendor: "Salesforce",
      category: "CRM",
      gartnerQuadrant: "Leader",
      features: [
        "Sales automation",
        "Customer 360",
        "Marketing automation",
        "Service cloud",
        "Analytics",
        "AI (Einstein)",
        "Mobile",
      ],
      pricingModel: "Per user/year",
      estimatedAnnualCost: 420000,
      implementationTime: "6-9 months",
      description:
        "Market-leading CRM platform with extensive ecosystem and AI capabilities.",
    },
    {
      id: "mkt-005",
      name: "Microsoft Project Online",
      vendor: "Microsoft",
      category: "Project Management",
      gartnerQuadrant: "Challenger",
      features: [
        "Project planning",
        "Resource management",
        "Portfolio analytics",
        "Integration with Microsoft 365",
        "Power BI dashboards",
      ],
      pricingModel: "Per user/year",
      estimatedAnnualCost: 150000,
      implementationTime: "3-6 months",
      description:
        "Cloud-based PPM solution integrated with Microsoft ecosystem.",
    },
  ],

  // Sample requirements for demo
  sampleRequirements: [
    "Asset tracking and maintenance scheduling",
    "Mobile access for field workers",
    "Work order management",
    "Reporting and analytics",
    "Integration with existing SAP systems",
    "Predictive maintenance capabilities",
  ],
};

// Matching algorithm
function analyzeRequirements(requirementText, businessContext = {}) {
  const keywords = requirementText.toLowerCase();

  // Simple keyword matching for demo
  const matches = {
    existing: [],
    market: [],
    buildEstimate: null,
  };

  // Match against existing solutions
  mockData.existingSolutions.forEach((sol) => {
    let matchScore = 0;
    let matchedFeatures = [];

    sol.features.forEach((feature) => {
      if (keywords.includes(feature.toLowerCase().split(" ")[0])) {
        matchScore += 20;
        matchedFeatures.push(feature);
      }
    });

    sol.capabilities.forEach((cap) => {
      if (keywords.includes(cap.toLowerCase())) {
        matchScore += 15;
      }
    });

    // Budget consideration for existing solutions
    if (businessContext.p4rBudget > 0) {
      if (sol.annualCost <= businessContext.p4rBudget) {
        matchScore += 10; // Bonus for being within budget
      } else if (sol.annualCost > businessContext.p4rBudget * 1.5) {
        matchScore -= 15; // Penalty for being way over budget
      }
    }

    // User count consideration
    if (businessContext.numberOfUsers > 0) {
      if (sol.users >= businessContext.numberOfUsers * 0.5) {
        matchScore += 5; // Bonus for having similar or more users (proven scale)
      }
    }

    if (matchScore > 0) {
      matches.existing.push({
        ...sol,
        matchScore: Math.min(matchScore, 100),
        matchedFeatures,
        budgetFit:
          businessContext.p4rBudget > 0
            ? sol.annualCost <= businessContext.p4rBudget
              ? "Within Budget"
              : sol.annualCost <= businessContext.p4rBudget * 1.2
                ? "Close to Budget"
                : "Over Budget"
            : "N/A",
      });
    }
  });

  // Match against market solutions
  mockData.marketSolutions.forEach((sol) => {
    let matchScore = 0;
    let matchedFeatures = [];

    sol.features.forEach((feature) => {
      if (keywords.includes(feature.toLowerCase().split(" ")[0])) {
        matchScore += 20;
        matchedFeatures.push(feature);
      }
    });

    if (keywords.includes(sol.category.toLowerCase())) {
      matchScore += 25;
    }

    // Budget consideration for market solutions
    if (businessContext.p4rBudget > 0) {
      if (sol.estimatedAnnualCost <= businessContext.p4rBudget) {
        matchScore += 10;
      } else if (sol.estimatedAnnualCost > businessContext.p4rBudget * 1.5) {
        matchScore -= 15;
      }
    }

    if (matchScore > 0) {
      matches.market.push({
        ...sol,
        matchScore: Math.min(matchScore, 100),
        matchedFeatures,
        budgetFit:
          businessContext.p4rBudget > 0
            ? sol.estimatedAnnualCost <= businessContext.p4rBudget
              ? "Within Budget"
              : sol.estimatedAnnualCost <= businessContext.p4rBudget * 1.2
                ? "Close to Budget"
                : "Over Budget"
            : "N/A",
      });
    }
  });

  // Sort by match score
  matches.existing.sort((a, b) => b.matchScore - a.matchScore);
  matches.market.sort((a, b) => b.matchScore - a.matchScore);

  // Build estimate (enhanced with business context)
  const featureCount = requirementText
    .split("\n")
    .filter((line) => line.trim()).length;
  const baseDevCost = featureCount * 120000; // RM120k per major feature
  const userScalingFactor = businessContext.numberOfUsers > 100 ? 1.3 : 1.0;
  const geoComplexityFactor =
    businessContext.geoLocation === "Global"
      ? 1.4
      : businessContext.geoLocation?.includes("Regional")
        ? 1.2
        : 1.0;

  const totalDevCost = baseDevCost * userScalingFactor * geoComplexityFactor;

  matches.buildEstimate = {
    estimatedCost: totalDevCost,
    estimatedTime: `${featureCount * 3}-${featureCount * 4} months`,
    team: "Internal Development Team",
    risks: [
      "Resource availability",
      "Scope creep",
      "Integration complexity",
      "Ongoing maintenance burden",
    ],
    budgetFit:
      businessContext.p4rBudget > 0
        ? totalDevCost <= businessContext.p4rBudget
          ? "Within Budget"
          : totalDevCost <= businessContext.p4rBudget * 1.2
            ? "Close to Budget"
            : "Over Budget"
        : "N/A",
    businessContext,
  };

  // Generate recommendation
  const recommendation = generateRecommendation(matches, businessContext);

  return {
    matches,
    recommendation,
    businessContext,
  };
}

function generateRecommendation(matches, businessContext = {}) {
  const hasHighMatchExisting =
    matches.existing.length > 0 && matches.existing[0].matchScore >= 60;
  const hasHighMatchMarket =
    matches.market.length > 0 && matches.market[0].matchScore >= 60;

  if (hasHighMatchExisting && matches.existing[0].reusePotential === "High") {
    return {
      decision: "REUSE",
      confidence: matches.existing[0].matchScore,
      reasoning: `Strong match found with existing solution "${matches.existing[0].name}" (${matches.existing[0].matchScore}% match). High reuse potential with ${matches.existing[0].users} current users. Fastest time to value.`,
      topOption: matches.existing[0],
    };
  } else if (
    hasHighMatchMarket &&
    matches.market[0].gartnerQuadrant === "Leader"
  ) {
    return {
      decision: "BUY",
      confidence: matches.market[0].matchScore,
      reasoning: `Market leader "${matches.market[0].name}" provides ${matches.market[0].matchScore}% feature match. Proven solution with vendor support and regular updates.`,
      topOption: matches.market[0],
    };
  } else if (hasHighMatchExisting) {
    return {
      decision: "REUSE",
      confidence: matches.existing[0].matchScore,
      reasoning: `Existing solution "${matches.existing[0].name}" provides ${matches.existing[0].matchScore}% match. Consider extending capabilities rather than building new.`,
      topOption: matches.existing[0],
    };
  } else if (hasHighMatchMarket) {
    return {
      decision: "BUY",
      confidence: matches.market[0].matchScore,
      reasoning: `"${matches.market[0].name}" offers ${matches.market[0].matchScore}% match. Faster implementation than custom build.`,
      topOption: matches.market[0],
    };
  } else {
    return {
      decision: "BUILD",
      confidence: 65,
      reasoning:
        "No strong existing or market solution match found. Custom build may be required for unique requirements. Consider hybrid approach.",
      topOption: null,
    };
  }
}
