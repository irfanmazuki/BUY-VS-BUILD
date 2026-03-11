# Buy vs Build Advisor - Requirements

## Problem Statement

The current Buy vs Build decision process is too slow (10-20 days), compliance-heavy, and lacks visibility into existing solutions, market options, and TCO data. Teams need a fast, centralized way to evaluate whether to Buy, Build, or Reuse existing solutions.

## Target Users

- Business analysts and product owners making quick decisions
- Technical architects evaluating options
- Decision committees reviewing recommendations

## Core Value Proposition

Accelerate Buy vs Build decisions from 10-20 days to 2 days by providing:

- Instant visibility of existing internal solutions (reuse potential)
- Market intelligence from Gartner/Forrester-style sources
- Side-by-side TCO and feature comparison
- Automated requirement matching against available options

## Key Features

### 1. Self-Service Solution Screening Form

Business users can independently screen solutions by providing:

- **Functional Requirements** - List of required features/capabilities (one per line)
- **P4R Budget** - Approved budget for the solution (in USD)
- **Business Unit (BU)** - Which BU is requesting the solution (e.g., Upstream, Downstream, Gas & New Energy)
- **Operating Unit (OPU)** - Specific OPU within the BU (e.g., Malaysia Operations, International Operations)
- **Number of Users** - Expected user count
- **Target Users** - Who will use the solution (roles/personas, e.g., Field Engineers, Managers, Analysts)
- **Geographical Location** - Where the solution will be deployed/used (e.g., Malaysia, Regional, Global)

System instantly analyzes all inputs and provides recommendation: Buy / Build / Reuse with confidence score and reasoning. Budget constraints, user count, and geographical scope influence the recommendation logic.

### 2. Visibility of Existing Solutions (Primary Focus)

- Centralized catalog of internal applications
- Shows ownership, subscription costs, key features, and reuse potential
- Filter by domain, capability, cost, and geographical coverage
- Highlight solutions that match current requirements and business context

### 3. Market Intelligence Integration

- Curated list of vendor/market solutions (Gartner/Forrester-style)
- Key features, pricing models, and vendor info
- Match requirements against market options
- Consider budget constraints when recommending market solutions

### 4. Side-by-Side Comparison

- Compare up to 3 options simultaneously:
  - Buy (Gartner/market solution)
  - Build (custom development estimate)
  - Reuse (existing internal solution)
- Show TCO breakdown, feature match %, implementation timeline, and risk factors
- Display budget fit analysis (within budget / over budget / close to budget)
- Show geographical coverage and user scalability

### 5. TCO Analysis

- Clear subscription/licensing costs
- 3-5 year cost projection based on user count
- Include hidden costs (integration, training, maintenance)
- Compare against P4R budget to show affordability

## User Journey

1. User lands on self-service screening form
2. User fills in business context (BU, OPU, budget, users, location)
3. User enters functional requirements (text list)
4. User clicks "Analyze & Get Recommendation"
5. System analyzes and shows instant recommendation with confidence score
6. User reviews 3 options side-by-side: Buy / Build / Reuse
7. User can browse existing solutions catalog and market intelligence
8. User can drill into each option for detailed TCO, features, and ownership info

## Success Metrics

- Decision time reduced from 10-20 days to 2 days
- Increased reuse of existing solutions
- Single source of truth for application catalog
- Elimination of manual cross-domain checking
- Solution Concept Brief (SCB) no longer required for preliminary assessment
- Instant recommendation based on fully met functional requirements

## Out of Scope (for prototype)

- Full compliance workflow integration
- Real-time API integration with Gartner/Forrester
- User authentication and role-based access
- Historical decision tracking and analytics
- Export to PDF/Word for formal documentation
- Integration with P4R budget approval systems
