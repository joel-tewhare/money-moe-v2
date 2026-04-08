# /plan

## Purpose

Create a structured, pass-based implementation plan before writing any code.

The plan MUST follow the 4-pass system:

1. UI / Layout
2. Data Wiring
3. Derived Logic
4. Final Polish / Verification

---

## Instructions

### 1. Define the feature

- Clearly describe what is being built
- Define what “done” looks like
- Identify where this sits in the app and user flow

---

### 2. Generate a plan using passes

Follow the passes in order.
For EACH pass:

- Include only the relevant sections
- Be explicit and specific
- Respect scope boundaries

---

## Pass 1 — UI / Layout

Focus: visual structure only

### Sections

- Context
- Scope (MUST include what is in scope AND what is explicitly excluded)
- Layout (structure and hierarchy)
- Reuse (existing components, styles, patterns)
- Constraints
- Implementation order (step-by-step)
- Verification

### Rules

- MUST use placeholders instead of real data
- MUST NOT include real data wiring
- MUST NOT include business logic or derived logic
- MUST keep structure simple and clean

---

## Pass 2 — Data Wiring

Focus: connecting real data to UI

### Sections

- Context
- Scope (include and exclude clearly)
- Data (MUST define source of truth: API, props, state)
- Behaviour (loading, display, interaction)
- Constraints
- Edge cases (empty, null, loading, failure)
- Reuse
- Implementation order
- Verification

### Rules

- MUST use real backend data
- MUST NOT introduce complex derived logic
- MUST NOT duplicate backend calculations
- MUST keep logic minimal and focused on wiring

---

## Pass 3 — Derived Logic

Focus: computed values and decision logic

### Sections

- Context
- Scope
- Data (already wired data only)
- Logic (explicit calculations and rules)
- Behaviour
- Constraints
- Edge cases
- Implementation order
- Verification

### Rules

- MUST build only on existing wired data
- MUST NOT refetch or redefine data sources
- MUST keep logic readable and simple
- MUST avoid duplication

---

## Pass 4 — Final Polish / Verification

Focus: cohesion and correctness

### Sections

- Context
- Scope
- Behaviour
- Constraints
- Edge cases
- Reuse
- Verification

### Rules

- MUST NOT introduce new features
- MUST NOT change core logic
- MUST refine existing work only
- MUST ensure consistency with existing app patterns

---

## Global Rules

- MUST follow pass order strictly
- MUST keep data and logic conceptually separate
- MUST prefer simple, readable solutions over clever ones
- MUST ensure each pass is independently testable
- MUST be explicit about what is NOT included in each pass

---

## Output Format

- Clearly separated sections for each pass
- Use bullet points (not paragraphs)
- Be specific to the feature (no generic statements)
- No code unless absolutely necessary
