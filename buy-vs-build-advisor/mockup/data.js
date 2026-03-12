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
      capabilities: [
        "Enterprise Asset Management",
        "Predictive Maintenance",
        "Work Order Management",
        "IoT Integration Platform",
        "Mobile Workforce Management",
        "AI-Powered Analytics",
        "Regulatory Compliance",
        "Inventory Management",
        "Spatial Asset Management",
        "Health, Safety & Environment",
      ],
      industryCapabilities: {
        "AI-Powered Asset Intelligence":
          "Watson AI integration for predictive failure analysis, anomaly detection, and optimization recommendations based on IoT sensor data and historical patterns",
        "Enterprise IoT Platform":
          "Native integration with IBM Watson IoT for real-time asset monitoring, edge computing, and industrial IoT device management across hybrid cloud environments",
        "Predictive Maintenance Optimization":
          "Advanced algorithms for condition-based maintenance scheduling, failure prediction with 95% accuracy, and maintenance cost optimization",
        "Mobile-First Workforce Management":
          "Offline-capable mobile apps with AR/VR capabilities for remote inspections, barcode/RFID scanning, and voice-to-text work order updates",
        "Regulatory Compliance Automation":
          "Built-in frameworks for ISO 55000, OSHA, EPA, and industry-specific regulations with automated compliance reporting and audit trails",
        "Spatial Asset Management":
          "GIS integration for location-based asset tracking, geospatial analytics, and facility management with 3D visualization capabilities",
        "Health, Safety & Environment (HSE)":
          "Comprehensive HSE management with incident tracking, risk assessment, permit-to-work systems, and safety performance analytics",
        "Enterprise Integration Platform":
          "Pre-built connectors for SAP, Oracle, Microsoft, and 200+ enterprise systems with real-time data synchronization and API management",
      },
      gartnerAlignment:
        "Positioned as a Leader in Gartner Magic Quadrant for Enterprise Asset Management (EAM) software with highest scores for completeness of vision and ability to execute",
      forresterAlignment:
        "Named a Leader in The Forrester Wave: Asset Management Solutions with strongest scores for strategy and current offering",
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
      capabilities: [
        "Asset Lifecycle Management",
        "Maintenance Planning & Scheduling",
        "Work Order Management",
        "Plant Maintenance",
        "Equipment & Technical Objects",
        "Preventive Maintenance",
        "Materials Management Integration",
        "Financial Integration",
        "Mobile Plant Maintenance",
        "Analytics & Reporting",
      ],
      industryCapabilities: {
        "Integrated Business Suite":
          "Native integration with SAP S/4HANA for seamless financial, procurement, and HR processes with real-time data consistency across all business functions",
        "Intelligent Asset Management":
          "SAP Leonardo IoT and Machine Learning integration for predictive analytics, asset optimization, and intelligent maintenance scheduling",
        "Plant Maintenance Excellence":
          "Comprehensive plant maintenance with equipment hierarchies, technical objects, maintenance plans, and work order lifecycle management",
        "Financial Integration & Control":
          "Real-time cost tracking, budget management, and financial reporting with automatic posting to controlling and profitability analysis",
        "Materials Management Integration":
          "Seamless integration with SAP MM for spare parts management, procurement workflows, and inventory optimization with automatic reorder points",
        "Mobile Plant Maintenance":
          "SAP Fiori-based mobile apps for technicians with offline capabilities, barcode scanning, and signature capture for work confirmations",
        "Advanced Analytics & KPIs":
          "SAP Analytics Cloud integration for real-time dashboards, predictive analytics, and maintenance KPI monitoring with drill-down capabilities",
        "Compliance & Audit Trail":
          "Complete audit trail for all maintenance activities with regulatory compliance support for FDA, GxP, and industry-specific requirements",
      },
      gartnerAlignment:
        "Recognized as a Leader in Gartner Magic Quadrant for EAM with strong scores for market understanding and customer experience",
      forresterAlignment:
        "Strong Performer in The Forrester Wave: Asset Management Solutions with highest scores for integration and ecosystem",
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
      capabilities: [
        "Cloud Data Warehouse",
        "Data Lake Architecture",
        "Data Sharing & Collaboration",
        "Multi-Cloud Platform",
        "Elastic Scalability",
        "Data Marketplace",
        "Machine Learning Integration",
        "Data Engineering",
        "Data Science Workbench",
        "Governance & Security",
      ],
      industryCapabilities: {
        "Multi-Cloud Data Architecture":
          "Native support for AWS, Azure, and Google Cloud with cross-cloud data sharing, replication, and failover capabilities without vendor lock-in",
        "Elastic Compute & Storage":
          "Automatic scaling with separate compute and storage layers, pay-per-use pricing, and instant scaling from zero to thousands of concurrent users",
        "Secure Data Sharing":
          "Live data sharing across organizations without data movement, with fine-grained access controls and data governance policies",
        "Data Marketplace & Exchange":
          "Access to 1000+ live data sets from leading data providers with instant provisioning and automatic updates",
        "Machine Learning & AI Integration":
          "Native support for Python, R, Java, and Scala with Snowpark for data science workloads and ML model deployment",
        "Zero-Copy Cloning":
          "Instant database, schema, and table cloning without storage overhead for development, testing, and analytics environments",
        "Time Travel & Data Recovery":
          "Query historical data up to 90 days with point-in-time recovery and undrop capabilities for data protection",
        "Advanced Security & Compliance":
          "End-to-end encryption, SOC 2 Type II, HIPAA, PCI DSS compliance with customer-managed encryption keys and private connectivity",
      },
      gartnerAlignment:
        "Positioned as a Leader in Gartner Magic Quadrant for Cloud Database Management Systems with highest scores for completeness of vision",
      forresterAlignment:
        "Named a Leader in The Forrester Wave: Cloud Data Warehouse with strongest scores for current offering and strategy",
      pricingModel: "Consumption-based",
      estimatedAnnualCost: 950000,
      implementationTime: "6-9 months",
      description:
        "Leading cloud data platform with elastic scalability and data sharing.",
    },
    {
      id: "mkt-004",
      name: "Salesforce Sales Cloud",
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
      capabilities: [
        "Sales Force Automation",
        "Lead & Opportunity Management",
        "Customer 360 Platform",
        "Marketing Automation",
        "Service Cloud",
        "Einstein AI Platform",
        "Mobile CRM",
        "Analytics & Reporting",
        "Integration Platform",
        "Workflow Automation",
      ],
      industryCapabilities: {
        "Einstein AI Platform":
          "Comprehensive AI suite with predictive lead scoring, opportunity insights, automated activity capture, and next-best-action recommendations powered by machine learning",
        "Customer 360 Platform":
          "Unified customer view across sales, service, marketing, and commerce with real-time data integration and 360-degree customer journey mapping",
        "Sales Process Automation":
          "Configurable sales processes with approval workflows, automated task creation, email templates, and guided selling paths for consistent execution",
        "Advanced Analytics & Forecasting":
          "Einstein Analytics with predictive forecasting, pipeline analysis, sales performance dashboards, and AI-powered insights for revenue optimization",
        "Omnichannel Marketing":
          "Pardot and Marketing Cloud integration for lead nurturing, email campaigns, social media marketing, and marketing ROI attribution",
        "Service Cloud Integration":
          "Seamless handoff from sales to service with case management, knowledge base, and customer service automation for complete customer lifecycle",
        "AppExchange Ecosystem":
          "Access to 5000+ pre-built apps and integrations with extensive customization capabilities through Lightning Platform and Apex development",
        "Mobile-First Architecture":
          "Native mobile apps with offline capabilities, location services, and mobile-optimized workflows for field sales teams",
      },
      gartnerAlignment:
        "Positioned as a Leader in Gartner Magic Quadrant for Sales Force Automation with highest scores for ability to execute and completeness of vision",
      forresterAlignment:
        "Named a Leader in The Forrester Wave: Sales Force Automation Solutions with strongest scores for current offering and market presence",
      pricingModel: "Per user/year",
      estimatedAnnualCost: 420000,
      implementationTime: "6-9 months",
      description:
        "Market-leading CRM platform with extensive ecosystem and AI capabilities.",
    },
    {
      id: "mkt-005",
      name: "Microsoft Project for the Web",
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
      capabilities: [
        "Project Planning & Scheduling",
        "Resource Management",
        "Portfolio Management",
        "Task Management",
        "Collaboration Tools",
        "Reporting & Analytics",
        "Microsoft 365 Integration",
        "Power Platform Integration",
        "Teams Integration",
        "Timeline & Gantt Charts",
      ],
      industryCapabilities: {
        "Microsoft 365 Ecosystem Integration":
          "Native integration with Teams, SharePoint, Outlook, and Office apps with single sign-on and unified collaboration experience",
        "Power Platform Automation":
          "Power Automate workflows for project automation, Power Apps for custom project forms, and Power BI for advanced project analytics and reporting",
        "Hybrid Project Methodologies":
          "Support for Waterfall, Agile, and hybrid approaches with Kanban boards, Scrum templates, and traditional Gantt chart planning",
        "Resource Capacity Planning":
          "Advanced resource management with skills-based matching, capacity planning, utilization tracking, and resource optimization across portfolios",
        "Portfolio Analytics & Insights":
          "Real-time portfolio dashboards with project health indicators, budget tracking, milestone analysis, and predictive project success scoring",
        "Collaborative Project Execution":
          "Microsoft Teams integration for project communication, file sharing, meeting scheduling, and real-time collaboration on project deliverables",
        "Enterprise Security & Compliance":
          "Azure AD integration, data loss prevention, compliance center integration, and enterprise-grade security with conditional access policies",
        "Scalable Cloud Architecture":
          "Cloud-native platform with automatic scaling, global availability, and integration with Azure services for enterprise-scale project management",
      },
      gartnerAlignment:
        "Recognized as a Challenger in Gartner Magic Quadrant for Project Portfolio Management with strong scores for Microsoft ecosystem integration",
      forresterAlignment:
        "Strong Performer in The Forrester Wave: Collaborative Work Management with highest scores for collaboration and integration capabilities",
      pricingModel: "Per user/year",
      estimatedAnnualCost: 150000,
      implementationTime: "3-6 months",
      description:
        "Cloud-based PPM solution integrated with Microsoft ecosystem.",
    },
    {
      id: "mkt-006",
      name: "ServiceNow IT Service Management",
      vendor: "ServiceNow",
      category: "IT Service Management",
      gartnerQuadrant: "Leader",
      features: [
        "Incident management",
        "Change management",
        "Service catalog",
        "Knowledge management",
        "Asset management",
        "Workflow automation",
        "Self-service portal",
      ],
      capabilities: [
        "IT Service Management",
        "Incident & Problem Management",
        "Change & Release Management",
        "Service Catalog & Request Management",
        "Configuration Management Database",
        "Knowledge Management",
        "IT Asset Management",
        "Workflow Automation",
        "Service Level Management",
        "IT Operations Management",
      ],
      industryCapabilities: {
        "Intelligent Workflow Automation":
          "AI-powered workflow automation with machine learning for incident prediction, automated resolution, and intelligent routing based on historical patterns",
        "Configuration Management Database (CMDB)":
          "Comprehensive CMDB with automatic discovery, dependency mapping, impact analysis, and real-time configuration item relationships",
        "Predictive Intelligence":
          "Machine learning algorithms for predictive incident management, proactive problem identification, and automated root cause analysis",
        "Service Portal & Employee Experience":
          "Modern, consumer-grade self-service portal with mobile apps, chatbots, and virtual agents for improved employee experience",
        "IT Operations Management (ITOM)":
          "Integrated ITOM suite with event management, orchestration, service mapping, and cloud management for hybrid IT environments",
        "Performance Analytics":
          "Real-time dashboards and KPI tracking with predictive analytics for service performance, SLA compliance, and operational efficiency metrics",
        "Integration Hub":
          "Pre-built integrations with 300+ enterprise applications including monitoring tools, cloud platforms, and business applications",
        "Security Operations Integration":
          "Native integration with Security Operations for unified IT and security incident management with automated threat response workflows",
      },
      gartnerAlignment:
        "Positioned as a Leader in Gartner Magic Quadrant for IT Service Management Tools with highest scores for completeness of vision and ability to execute",
      forresterAlignment:
        "Named a Leader in The Forrester Wave: Enterprise Service Management with strongest scores for strategy and current offering",
      pricingModel: "Per user/year",
      estimatedAnnualCost: 380000,
      implementationTime: "8-12 months",
      description:
        "Leading ITSM platform with AI-powered automation and workflow capabilities.",
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
