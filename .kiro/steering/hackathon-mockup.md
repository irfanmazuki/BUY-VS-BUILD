---
inclusion: always
description: Guidelines for hackathon brainstorming, idea validation, and plain JS prototype development using spec mode.
---

# Hackathon Brainstorming & Idea Validation

This workspace is used for a brainstorming and idea validation hackathon. The goal is to rapidly explore ideas, validate concepts, and build lightweight prototypes that communicate the vision clearly.

### Requirements Phase — Ask Before You Assume

When creating requirements for a spec, you MUST ask the user clarifying questions before finalizing. Do not generate a full requirements list from a vague prompt. Instead:

1. Start by acknowledging the idea and summarizing your understanding in one or two sentences.
2. **Always ask the user for a project name** before doing anything else. This name will be used to create the project folder. If the user doesn't provide one, suggest a short, descriptive kebab-case name (e.g., `car-compare`, `credit-cards`) and confirm before proceeding.
3. Ask at least 3 targeted clarifying questions to better understand:
   - Who is the target user or audience?
   - What is the core problem being solved or value being delivered?
   - What is the single most important interaction or flow to demonstrate?
   - Are there any existing products or references to draw inspiration from?
   - What should the prototype prioritize: visual polish, interaction flow, or data storytelling?
4. Wait for the user's answers before writing the full requirements.
5. Keep requirements focused on what the prototype needs to communicate, not production concerns.
6. Requirements should be scoped to what can be built in a hackathon timeframe — think hours, not days.
7. Once requirements are finalized, document them in `<project_name>/requirements.md`. This serves as the single source of truth for the idea.

### Design Phase

- Keep the design lightweight. A brief description of the UI layout and key interactions is enough.
- No architecture diagrams or system design needed — this is a prototype.
- Focus on the user journey: what does someone see and do when they open the page?

### Implementation Phase — Plain JavaScript Prototypes Only

All prototypes MUST follow these constraints:

- Plain HTML, CSS, and vanilla JavaScript only. No frameworks (React, Vue, Angular, etc.), no build tools, no bundlers.
- No npm, no Node.js, no package managers, no external libraries — not even for testing. Everything must be vanilla JavaScript that runs in the browser.
- No backend, no server, no API calls, no database. Everything runs client-side with mock/hardcoded data.
- If property-based tests or unit tests are needed, implement them as browser-runnable vanilla JS (e.g., a `<project_name>/mockup/tests.html` file that runs assertions in the console or on-page).
- Do not create unit tests or test cases that require node.js or python

#### Project Folder Structure

Every prototype lives in its own top-level project folder named after the project. The structure is:

```
<project_name>/
  requirements.md
  mockup/
    index.html
    style.css
    app.js
    data.js
```

- **NEVER overwrite or edit files from a previous prototype.** Each new prototype idea MUST get its own project folder. Existing prototype files are off-limits — treat them as read-only references.
- The output should be an `index.html` inside `<project_name>/mockup/` (and optionally separate `.css` and `.js` files in the same folder).
- Use mock data directly in JavaScript to simulate real content. Make the mock data realistic and representative.
- The prototype should be openable by double-clicking the `index.html` in a browser — zero setup required.
- Prioritize visual clarity and interactivity over code elegance. This is a demo, not production code.
- Keep it simple. One page is fine. A few pages linked together is the max.

### Keeping Requirements Up to Date

- The `<project_name>/requirements.md` file is the **single source of truth** for the prototype.
- **Every time you make a change to the prototype** (new feature, UI tweak, behavior change, etc.), you MUST also update the project's `requirements.md` to reflect what was added or changed.
- This applies to both initial implementation and any follow-up modifications requested by the user.
- If a feature is added that wasn't in the original requirements, append it to the requirements file so the document always matches the current state of the prototype.

## General Principles

- Speed over perfection. Ship the idea, not the polish.
- Every prototype should be self-explanatory — someone should understand the idea by using it without a pitch deck.
- Encourage bold, creative ideas. Nothing is too weird for a hackathon.
- If an idea is too big, help the user scope it down to the most compelling slice.
