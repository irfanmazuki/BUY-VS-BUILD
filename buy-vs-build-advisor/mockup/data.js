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
      capabilities: ["Asset Management", "Maintenance", "Inventory"],
      users: 1200,
      reusePotential: "High",
      description:
        "Comprehensive asset and maintenance management system used across upstream operations.",
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
      reusePotential: "High",
      description:
        "Centralized data platform for ingestion, processing, and analytics across PETRONAS.",
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
      capabilities: ["Vendor Management", "Procurement", "Compliance"],
      users: 680,
      reusePotential: "Medium",
      description: "SAP Ariba-based vendor and contract management system.",
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
        "Project Management",
        "Resource Planning",
        "Financial Tracking",
      ],
      users: 320,
      reusePotential: "High",
      description:
        "Microsoft-based project and portfolio management tool for enterprise projects.",
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
      capabilities: ["CRM", "Sales", "Marketing"],
      users: 540,
      reusePotential: "Medium",
      description:
        "Custom-built CRM for B2B customer management and sales tracking.",
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
function analyzeRequirements(requirementText) {
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

    if (matchScore > 0) {
      matches.existing.push({
        ...sol,
        matchScore: Math.min(matchScore, 100),
        matchedFeatures,
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

    if (matchScore > 0) {
      matches.market.push({
        ...sol,
        matchScore: Math.min(matchScore, 100),
        matchedFeatures,
      });
    }
  });

  // Sort by match score
  matches.existing.sort((a, b) => b.matchScore - a.matchScore);
  matches.market.sort((a, b) => b.matchScore - a.matchScore);

  // Build estimate (simplified)
  const featureCount = requirementText
    .split("\n")
    .filter((line) => line.trim()).length;
  matches.buildEstimate = {
    estimatedCost: featureCount * 120000, // $120k per major feature
    estimatedTime: `${featureCount * 3}-${featureCount * 4} months`,
    team: "Internal Development Team",
    risks: [
      "Resource availability",
      "Scope creep",
      "Integration complexity",
      "Ongoing maintenance burden",
    ],
  };

  // Generate recommendation
  const recommendation = generateRecommendation(matches);

  return {
    matches,
    recommendation,
  };
}

function generateRecommendation(matches) {
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
