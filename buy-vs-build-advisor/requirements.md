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

- **Functional Requirements** - Interactive list with + button to add individual requirements
  - What the system must do - features, capabilities, and business functions
  - Examples: Asset tracking, Mobile access, Work order management, Reporting & analytics
  - Individual requirement items with remove functionality
- **Non-Functional Requirements** - Separate interactive list for performance and quality constraints
  - How the system should perform - performance, security, usability constraints
  - Examples: Support 500+ users, 99.9% uptime, Response time under 2 seconds
  - Individual requirement items with remove functionality
- **P4R Budget** - Approved budget for the solution (in MYR)
- **Business Unit (BU)** - Official PETRONAS business units in alphabetical order:
  - Corporate
  - Downstream
  - Gas & Maritime
  - MPM
  - PE&T
  - Upstream
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

## Enhanced Analysis Features (Added)

### Comprehensive Market Research Analysis

- **Market Maturity Assessment** - Evaluates vendor landscape and solution availability
- **Pricing Analysis** - Average market costs compared to budget constraints
- **Gartner Magic Quadrant Integration** - Identifies market leaders and challengers
- **Market Trends & Insights** - Cloud adoption, AI/ML integration, industry consolidation
- **Geographical Coverage Analysis** - Multi-region support and compliance considerations

### Existing Solutions Deep Analysis

- **Reuse Opportunity Identification** - High-potential matches across domains
- **User Base & Scalability Analysis** - Proven scale for similar user counts
- **Cost Savings Calculation** - 3-year savings potential vs custom build
- **Domain Alignment Assessment** - Solutions within same BU for reduced complexity
- **Extension Strategy Recommendations** - Leverage existing architecture and adoption

### Risk & Implementation Analysis

- **Budget Risk Assessment** - Over/within/close to budget analysis with mitigation strategies
- **Implementation Risk Evaluation** - Custom build vs vendor vs reuse risk profiles
- **Vendor Risk Analysis** - Market position, stability, and contract considerations
- **Mitigation Strategies** - Specific recommendations for each risk category

### Total Cost of Ownership (5-Year Analysis)

- **Comprehensive TCO Modeling** - Year 1 vs ongoing costs for all options
- **Visual ROI Comparison** - Interactive bar chart showing 5-year total costs with percentage scaling
- **Cost Breakdown Visualization** - Clear display of Year 1 implementation costs vs ongoing annual costs
- **Savings Analysis** - Automatic calculation and display of cost differences between options
- **Hidden Cost Integration** - Implementation, training, maintenance, integration costs
- **Budget Fit Analysis** - Clear comparison against P4R budget
- **ROI Timeline** - Fastest payback and long-term value analysis
- **Animated Graph** - Smooth bar chart animations for engaging data presentation

These enhanced analysis features provide comprehensive insights based on market research and existing solution evaluation, enabling more informed Buy vs Build vs Reuse decisions.

## Bug Fixes & UI Improvements (Added)

### Loading State Enhancements

- **Improved Loading Animation** - Added spinning loader with better visibility on emerald background
- **Enhanced Loading Text** - White text with proper contrast for "Analyzing requirements..." message
- **Processing Simulation** - Extended to 2 seconds to demonstrate realistic analysis time
- **Loading State Management** - Properly hides all analysis sections during processing

### Dummy Analysis Implementation

- **Comprehensive Mock Data** - Rich dummy analysis with multiple existing and market solutions
- **Budget-Aware Calculations** - Dynamic budget fit analysis (Within/Close to/Over Budget)
- **User Scaling Logic** - Build estimates adjust based on user count (>100 users = higher cost)
- **Realistic Match Scores** - Varied confidence scores (65-85%) for different solutions
- **Business Context Integration** - Personalized reasoning based on BU and requirements

### Error Handling

- **Graceful Fallbacks** - All display functions check for valid analysis data
- **Console Logging** - Debug information for troubleshooting analysis flow
- **Robust Data Structure** - Comprehensive dummy data covers all analysis scenarios

These improvements ensure the prototype works reliably with realistic processing simulation and comprehensive analysis results.

## Enhanced Loading Experience (Added)

### Interactive Progress Bar

- **Animated Progress Bar** - Visual progress indicator from 0% to 100% with smooth transitions
- **Percentage Display** - Real-time percentage counter showing analysis progress
- **Multi-Stage Processing** - 5 distinct processing stages with realistic timing:
  1. ⚡ Parsing requirements (20% - 400ms)
  2. 🔍 Scanning existing solutions (40% - 500ms)
  3. 📊 Analyzing market options (60% - 450ms)
  4. 💰 Calculating TCO & risks (80% - 400ms)
  5. 🎯 Generating recommendation (100% - 350ms)

### Processing Steps Visualization

- **Step-by-Step Display** - Visual cards showing each processing stage
- **Active Step Highlighting** - Current step highlighted with enhanced styling
- **Icon-Based Steps** - Emoji icons for each processing stage for visual clarity
- **Smooth Transitions** - Animated transitions between processing steps

### Realistic Processing Simulation

- **Total Duration**: ~2.1 seconds with varied step timing
- **Dynamic Text Updates** - Loading text changes to match current processing step
- **Visual Feedback** - Progress bar, step highlighting, and text updates work in harmony
- **Professional Feel** - Mimics enterprise software processing with realistic timing

This enhancement provides users with clear visibility into the analysis process, making the 2-second wait feel engaging and informative rather than static.

## User Experience Fix (Added)

### Proper Tab Navigation Flow

- **Fixed Tab Switching** - Tab now switches to "Results & Comparison" only AFTER progress animation completes
- **Sequential User Experience** - Users stay on "Analyze Requirements" tab during processing to see progress
- **Smooth Transition** - After 100% completion, automatic tab switch with smooth scroll to results
- **Visual Continuity** - Progress bar completes fully before showing final analysis results

**Previous Issue**: Clicking "Analyze & Get Recommendation" immediately switched to Results tab, hiding the progress animation.

**Fixed Behavior**:

1. User clicks "Analyze & Get Recommendation"
2. Stays on current tab to watch progress animation (2.1 seconds)
3. After progress reaches 100%, automatically switches to "Results & Comparison" tab
4. Smooth scroll to recommendation banner with full analysis results

This ensures users see the complete processing experience before viewing results.

## Extended Processing Duration (Updated)

### Longer Processing Simulation

- **Extended Step Duration** - Each processing step now takes 4 seconds (4000ms) instead of previous shorter durations
- **Total Processing Time** - Complete analysis now takes ~20 seconds (5 steps × 4 seconds each)
- **More Realistic Timing** - Mimics enterprise-level analysis processing time for complex Buy vs Build decisions
- **Enhanced User Engagement** - Longer duration allows users to fully appreciate each processing stage

### Updated Processing Timeline

1. ⚡ **Parsing requirements** (0→20% in 4 seconds)
2. 🔍 **Scanning existing solutions** (20→40% in 4 seconds)
3. 📊 **Analyzing market options** (40→60% in 4 seconds)
4. 💰 **Calculating TCO & risks** (60→80% in 4 seconds)
5. 🎯 **Generating recommendation** (80→100% in 4 seconds)

**Total Duration**: 20 seconds + 200ms initial delay + 200ms completion delay = ~20.4 seconds

This extended timing provides a more realistic enterprise software experience where complex analysis takes meaningful processing time, making the comprehensive results feel more valuable and trustworthy.

## Progress Animation Timing Fix (Fixed)

### Synchronized Processing Duration

- **Fixed Timeout Mismatch** - Main analysis timeout now matches progress animation duration (20.5 seconds)
- **Complete Step Iteration** - All 5 processing steps now display properly without being interrupted
- **Proper Sequencing** - Progress animation completes fully before results are displayed
- **Synchronized Experience** - Analysis completion and progress bar completion happen simultaneously

**Previous Issue**: Main timeout (2 seconds) was shorter than progress animation (20 seconds), causing steps to be skipped and results to show prematurely.

**Fixed Timing**:

- Progress animation: 5 steps × 4 seconds = 20 seconds + delays = ~20.4 seconds
- Main analysis timeout: 20.5 seconds (slightly longer to ensure progress completes first)
- Result: All steps display properly and results appear after progress reaches 100%

This ensures users see the complete 5-step processing experience before viewing analysis results.

## Currency Localization (Updated)

### Malaysian Ringgit (MYR) Implementation

- **Currency Symbol Change** - All $ symbols replaced with RM throughout the application
- **Currency Code Update** - USD references changed to MYR in form labels and documentation
- **Localized for Malaysia** - Reflects PETRONAS Malaysia operations using local currency
- **Consistent Display** - All cost displays, budgets, and financial analysis now show in Malaysian Ringgit

### Updated Currency References

- **P4R Budget Input** - Form label now shows "P4R Budget (MYR)" instead of USD
- **Cost Comparisons** - All solution costs displayed as "RM450k" format instead of "$450k"
- **TCO Analysis** - 5-year cost projections shown in Malaysian Ringgit
- **Market Analysis** - Average market pricing and cost savings calculations in MYR
- **Budget Fit Analysis** - Within/Over budget calculations based on MYR amounts

This localization makes the prototype more relevant for PETRONAS Malaysia operations and aligns with local financial planning processes.

## Visual TCO Graph Enhancement (Added)

### Interactive 5-Year Cost Comparison Chart

- **Horizontal Bar Chart** - Visual representation of total 5-year costs for all three options (Reuse/Buy/Build)
- **Percentage Scaling** - Bars scaled relative to highest cost option for easy visual comparison
- **Cost Savings Indicators** - Automatic calculation and display of savings vs lowest cost option
- **Animated Visualization** - Smooth 1.5-second fill animation for engaging data presentation
- **Color-Coded Options** - PETRONAS brand colors distinguish each option (Emerald/Purple/Blue)
- **Detailed Breakdown** - Year 1 vs ongoing costs displayed inline with each bar
- **Best Value Highlighting** - Lowest cost option marked with "Best Value" badge
- **Responsive Design** - Mobile-friendly layout with stacked elements on smaller screens

### Enhanced ROI Analysis

- **Visual Cost Comparison** - Immediate visual understanding of cost differences
- **Percentage Indicators** - Each option shows percentage relative to highest cost
- **Savings Calculation** - Clear display of additional cost vs most economical option
- **Benefit Tags** - Key advantages highlighted for each option (Fastest ROI, Vendor Support, Full Control)
- **Summary Cards** - Detailed breakdown cards below the graph for comprehensive analysis

This visual enhancement makes TCO analysis more intuitive and enables faster decision-making by providing immediate visual feedback on cost implications of each Buy vs Build vs Reuse option.

## Interactive Requirements Management (Added)

### Separated Functional vs Non-Functional Requirements

- **Dual Requirements Sections** - Side-by-side layout separating functional and non-functional requirements
- **Clear Categorization** - Functional (what the system does) vs Non-functional (how it performs)
- **Color-Coded Interface** - Emerald green for functional, purple for non-functional requirements
- **Descriptive Guidance** - Clear explanations of what belongs in each category

### Interactive + Button Interface

- **Individual Add Buttons** - Separate + buttons for each requirement type
- **Input Field Integration** - Dedicated input fields for each requirement category
- **Enter Key Support** - Press Enter to quickly add requirements
- **Focus Management** - Clicking + button focuses the input field

### Dynamic Requirements Lists

- **Live List Updates** - Requirements appear immediately as interactive list items
- **Remove Functionality** - × button on each requirement for easy removal
- **Visual Feedback** - Hover effects and smooth animations for better UX
- **Empty State Handling** - Helpful messages when no requirements are added
- **Scrollable Lists** - Max height with scroll for managing many requirements

### Enhanced Sample Data

- **Realistic Examples** - Sample functional requirements (Asset tracking, Mobile access, etc.)
- **Non-Functional Samples** - Performance constraints (500+ users, 99.9% uptime, etc.)
- **Categorized Loading** - Sample data properly separated into functional vs non-functional
- **Professional Examples** - Enterprise-grade requirement examples for demonstration

### Responsive Design

- **Mobile-Friendly** - Stacked layout on smaller screens
- **Touch-Optimized** - Larger buttons and touch targets for mobile devices
- **Flexible Grid** - Adapts to different screen sizes while maintaining usability

This enhancement makes requirements gathering more structured, user-friendly, and aligned with standard business analysis practices by clearly separating functional capabilities from performance and quality constraints.

## Official Approval Workflow System (Added)

### Business Unit Updates

- **Official PETRONAS BUs** - Updated dropdown with correct business units in alphabetical order:
  - Corporate
  - Downstream
  - Gas & Maritime
  - MPM (Malaysia Petroleum Management)
  - PE&T (Project Execution & Technology)
  - Upstream

### Approval Workflow Repository

- **Official Request Submission** - Convert analysis into formal approval request
- **Submit for Approval Button** - Appears after analysis completion for official submission
- **Request Form Fields**:
  - Request Title (auto-generated from BU and analysis type)
  - Business Justification (detailed explanation of need and urgency)
  - Requestor Name and Email
  - Direct Manager Email
  - Senior Manager Email

### Multi-Level Approval Process

- **3-Tier Approval Hierarchy**:
  1. **Manager Approval** - Direct manager reviews and approves request
  2. **Senior Manager Approval** - Senior manager provides secondary approval
  3. **Business Acknowledgement** - Final business approval for implementation

### Interactive Approval Timeline

- **Real-Time Status Tracking** - Visual timeline showing current approval stage
- **Status Indicators**:
  - ✓ Completed steps (green)
  - ⏳ Pending steps (gold)
  - ○ Future steps (gray)
- **Timestamp Tracking** - Date and time stamps for each approval stage
- **Approver Identification** - Names extracted from email addresses for tracking

### Workflow Simulation

- **Realistic Timing** - Simulated approval delays (3-5 seconds per stage)
- **Progressive Updates** - Status changes from Pending → Approved for each level
- **Success Notification** - Celebration banner when fully approved
- **Request ID Generation** - Unique request IDs (REQ-YYYY-XXX format)

### Repository Features

- **Request Management** - View full details of submitted requests
- **New Request Creation** - Reset workflow for additional submissions
- **Status Persistence** - Maintains approval state throughout session
- **Email Integration Ready** - Email fields prepared for real notification system

### Business Acknowledgement Workflow

- **Final Approval Gate** - Business acknowledgement as final implementation approval
- **Implementation Ready Status** - Clear indication when approved for execution
- **Audit Trail** - Complete timeline of all approval stages and approvers
- **Professional Workflow** - Enterprise-grade approval process simulation

This approval workflow transforms the Buy vs Build Advisor from an analysis tool into a complete request management system, enabling official business processes and formal approval tracking for implementation decisions.

## Request Repository Tab (Added)

### Centralized Request Management Dashboard

- **New Repository Tab** - Dedicated tab for viewing all submitted Buy vs Build analysis requests
- **Comprehensive Request Tracking** - Complete visibility of all requests across the organization
- **Multi-Status Monitoring** - Track Manager Approval, Senior Manager Approval, and Business Acknowledgement status
- **Real-Time Status Updates** - Live updates as requests progress through approval workflow

### Advanced Filtering & Search

- **Status-Based Filtering** - Filter by approval status:
  - All Statuses
  - Pending Approval
  - Manager Approved
  - Senior Manager Approved
  - Fully Approved
  - Rejected
- **Business Unit Filtering** - Filter requests by specific BU (Corporate, Downstream, Gas & Maritime, MPM, PE&T, Upstream)
- **Refresh Functionality** - Manual refresh to update request status and data

### Repository Statistics Dashboard

- **Key Metrics Display**:
  - Total Requests submitted
  - Pending Requests awaiting approval
  - Approved Requests ready for implementation
- **Visual Stat Cards** - Color-coded statistics with PETRONAS brand colors
- **Real-Time Updates** - Statistics update automatically as requests change status

### Comprehensive Request Table

- **Detailed Request Information**:
  - Request ID (unique identifier)
  - Request Title
  - Business Unit (with color-coded badges)
  - Requestor Name and Email
  - Submission Date and Time
  - Manager Approval Status
  - Senior Manager Approval Status
  - Business Acknowledgement Status
  - Overall Request Status
  - Action Buttons (View/Edit)

### Status Tracking System

- **Visual Status Indicators**:
  - 🟡 Pending (Gold)
  - 🟢 Approved (Green)
  - 🔴 Rejected (Red)
  - ⚪ Not Started (Gray)
- **Overall Status Categories**:
  - Pending Approval
  - Fully Approved
  - Rejected

### Sample Data & Demo

- **Pre-loaded Sample Requests** - 3 realistic sample requests showing different approval stages
- **Diverse Business Units** - Examples from Upstream, Gas & Maritime, and Corporate
- **Realistic Timestamps** - Proper date/time formatting for submission tracking
- **Complete Request Data** - Full request details including requirements and business justification

### Interactive Features

- **View Request Details** - Click to see complete request information
- **Edit Request** - Modify request details (prototype functionality)
- **Empty State Handling** - Helpful message when no requests match filters
- **Responsive Design** - Mobile-friendly table with horizontal scrolling
- **Sortable Columns** - Easy data organization and review

### Integration with Approval Workflow

- **Automatic Repository Updates** - New requests automatically appear in repository
- **Live Status Synchronization** - Status changes in approval workflow update repository in real-time
- **Complete Audit Trail** - Full history of request progression through approval stages
- **Cross-Tab Consistency** - Repository stays synchronized with approval workflow status

This Request Repository tab transforms the Buy vs Build Advisor into a complete enterprise request management system, providing organizational visibility and tracking capabilities essential for governance and compliance in large organizations like PETRONAS.

## Enhanced Existing Solutions Catalog (Added)

### Industry-Grade Capability Analysis

- **Comprehensive Capability Mapping** - Each existing solution now includes detailed capabilities based on industry standards
- **Gartner & Forrester Alignment** - Solutions mapped to recognized analyst frameworks and best practices
- **Workflow Management Details** - Specific workflow capabilities including approval routing, escalation rules, and automation
- **Enterprise Integration Capabilities** - Detailed API, integration platform, and enterprise system connectivity information

### Advanced Solution Profiles

- **Core Capabilities Grid** - Visual display of primary solution capabilities with expandable view
- **Industry-Grade Capabilities Section** - Detailed descriptions of enterprise-level features and functions
- **Analyst Framework Alignment** - Clear indication of Gartner Magic Quadrant and Forrester Wave positioning
- **Professional Capability Descriptions** - Enterprise-level capability explanations based on official documentation

### Enhanced Solution Information

#### PETRONAS Asset Management System (PAMS)

- **Workflow Management**: Advanced workflow engine with approval routing and escalation rules
- **Asset Performance Management**: Real-time monitoring with KPI dashboards and performance trending
- **Maintenance Optimization**: Condition-based scheduling with failure prediction algorithms
- **Mobile Operations**: Offline-capable mobile app with barcode scanning and photo capture
- **Integration Platform**: REST APIs and SAP integration for seamless data exchange
- **Regulatory Compliance**: Built-in frameworks for ISO 55000, API standards, and safety regulations

#### Enterprise Data Platform (EDP)

- **Data Fabric Architecture**: Unified data management across hybrid cloud environments
- **Streaming Analytics**: Real-time processing with Apache Kafka and Spark
- **DataOps Automation**: CI/CD pipelines for data with automated testing and deployment
- **Governance & Compliance**: Comprehensive data lineage, privacy controls, and regulatory compliance
- **Self-Service BI**: Drag-and-drop analytics with natural language query capabilities
- **ML Model Management**: End-to-end MLOps with model versioning and performance monitoring

#### Vendor Management Portal (SAP Ariba)

- **Procurement Orchestration**: End-to-end workflows with approval hierarchies and spend controls
- **Supplier Risk Intelligence**: Real-time monitoring with ESG scoring and financial health analysis
- **Contract Intelligence**: AI-powered contract analysis with clause extraction and obligation tracking
- **Spend Optimization**: Advanced analytics with category management and savings identification
- **Supplier Collaboration**: Integrated portal with document sharing and performance feedback
- **Compliance Automation**: Automated checking against regulatory requirements and company policies

#### Project Portfolio Manager (Microsoft PPM)

- **Portfolio Optimization**: AI-driven optimization with resource leveling and strategic alignment
- **Agile & Waterfall Support**: Hybrid methodologies with Scrum, Kanban, and Gantt planning
- **Resource Intelligence**: Skills-based matching with capacity planning and utilization analytics
- **Financial Controls**: Integrated budgeting, forecasting, and earned value management
- **Risk Analytics**: Predictive modeling with Monte Carlo simulation and scenario planning
- **Stakeholder Collaboration**: Microsoft Teams integration with automated status reporting

#### Customer Relationship Hub

- **Customer 360 Platform**: Unified customer view with real-time data aggregation
- **Intelligent Sales Automation**: AI-powered lead scoring and opportunity prediction
- **Omnichannel Marketing**: Integrated campaigns across email, social, web, and mobile
- **Predictive Analytics**: Customer lifetime value modeling and churn prediction
- **Workflow Automation**: Configurable business processes with approval workflows
- **Enterprise Integration**: Pre-built connectors for SAP, Oracle, and other enterprise systems

### Visual Enhancements

- **Enhanced Card Layout** - Expanded cards with organized sections for better information hierarchy
- **Capability Tags** - Visual tags for core capabilities with expandable "more" indicators
- **Industry Alignment Badges** - Clear indicators showing Gartner and Forrester framework compliance
- **Scrollable Detailed Capabilities** - Organized, scrollable sections for comprehensive capability descriptions
- **Professional Styling** - Enterprise-grade visual design matching industry solution catalogs

This enhancement transforms the existing solutions catalog from a basic listing into a comprehensive enterprise solution repository with industry-standard capability analysis, making it suitable for professional Buy vs Build decision-making processes.
