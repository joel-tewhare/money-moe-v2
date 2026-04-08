/ preplan

PURPOSE:
Refine a rough feature idea into a clear, structured, plan-ready brief.

This is NOT an implementation step.
This is a thinking + clarification step that prepares a high-quality input for /plan.

---

PROCESS (PASS-BASED)

PASS 1 — INITIAL INTERPRETATION

- Take the user’s feature description (even if very short)
- Infer the likely:
  - Goal (what the user can do)
  - UI shape (what the screen feels like)
  - Basic user flow (step-by-step interaction)
- Populate a draft version of the structure below using best judgement
- Do NOT ask questions yet

Output:

- A first-pass structured brief (best guess)
- A short note highlighting any assumptions made

---

PASS 2 — IDENTIFY GAPS

- Review the draft and identify only HIGH-IMPACT uncertainties:
  (things that would significantly change the feature shape)

Examples:

- What is listed vs what is selected?
- Default sorting behaviour?
- Single item vs multiple per user?
- Overview vs detail-first UI?

- Generate a small set of focused clarification questions (max 3–5)

Rules:

- Do NOT ask low-value or obvious questions
- Do NOT over-specify edge cases
- Prioritise questions that affect:
  - data shape
  - UI interaction
  - user flow

- If the feature is already sufficiently clear, skip PASS 2 questions and proceed directly to finalisation.

Output:

- Short list of targeted questions
- Or direct progression to finalisation if clarification is not needed

---

PASS 3 — REFINE WITH USER INPUT

- Incorporate the user’s answers
- Update the structured brief
- Resolve assumptions where possible
- Keep the feature scoped to a FIRST WORKING VERSION

Rules:

- Avoid adding polish features unless explicitly requested
- Prefer simple defaults over optional complexity
- Maintain clarity over completeness

---

PASS 4 — FINALISE PLAN-READY BRIEF

- Produce a clean, structured version of the feature using the template below
- Ensure it is:
  - Clear
  - Grounded in user behaviour
  - Aligned with existing system context
  - Scoped for initial implementation

- Then generate a ready-to-use /plan prompt

---

OUTPUT TEMPLATE

Feature:
[Feature name]

Goal:
[What the user can do in plain English]

UI shape:
[High-level layout and interaction style]

User flow:

- [Step 1]
- [Step 2]
- [Step 3]

Context:

- [Existing data/models]
- [Existing routes/pages/components]
- [Architecture pattern if known]

Scope:

- [What is included now]
- [What is intentionally excluded]

Important behaviour:

- [Default sorting / selection rule]
- [Handling of multiple items]
- [Key UX rule(s)]

Open assumptions (if any remain):

- [List only if still unresolved]

---

FINAL SECTION

Draft /plan prompt:

[Provide a clean, copy-ready prompt that can be used directly with /plan]

---

GENERAL RULES

- Prioritise clarity over completeness
- Avoid overengineering the brief
- Ask only necessary questions
- Keep focus on first working version
- Reflect the user’s intent, not just your own assumptions
