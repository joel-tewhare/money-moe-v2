## Coding Memory (Money Moe v2 / Agentic Workflow)

### Data Contracts vs Defensive Code

- Prefer contract-aligned types over overly defensive typing
- Only include `null` or `undefined` if they are realistic based on the data source
- Avoid adding `undefined` to types unless it can actually occur in the data flow
- Simplify defensive checks when backend guarantees are trusted (e.g. avoid `typeof` + `Number.isFinite` when not needed)

### UI vs Data Responsibility

- Separate data correctness from display quality
- Handle `null` at the data level (fallbacks)
- Handle empty/whitespace strings at the UI level (trim + length check)
- Keep UI helpers focused on presentation, not data validation logic

### React Data Lifecycle

- Always account for “data not loaded yet” when working with async data
- Recognise that data can be `undefined` before it resolves, even if typed as an array
- Choose intentionally between:
  - inline fallback (`?? []`) for simple rendering
  - explicit loading guards for clearer control

### Input Handling

- Sanitize user input before use (e.g. `.trim()` for query params)
- Prefer naming like `cleanedX` to reflect intent rather than implementation
- Encode user input when placing into URLs (`encodeURIComponent`)

### State & Naming Consistency

- Align state names with the actual data shape (e.g. `selectedStoreId` instead of `selectedStoreKey`)
- Rename variables when underlying logic/data shape changes
- Avoid names that imply more complexity than exists (e.g. “key” vs simple id)

### Utility Functions

- Extract utilities when they represent reusable or cross-cutting concerns (e.g. error handling, formatting)
- Keep utilities aligned with real data contracts (avoid unnecessary types)
- Do not extract too early — wait until reuse or clear domain significance
- Good util example: error message parsing (`getApiErrorMessage`)
- Avoid util extraction for one-off or tightly scoped logic

### Rendering Patterns

- Inline conditional rendering is acceptable when it keeps logic readable and local
- Avoid over-extracting render logic if it makes the component harder to follow
- Choose clarity over abstraction in UI rendering

### Media & UI Resilience

- Use `onError` on images to provide a fallback source and prevent broken UI
- Always clear the error handler (`onerror = null`) to avoid infinite fallback loops

### Agentic Code Review Mindset

- Question unnecessary complexity or defensive patterns in AI-generated code
- Look for where logic exceeds the actual data contract
- Distinguish between:
  - safety that improves UX
  - safety that adds noise
- Prefer manual recovery over editor-history recovery when changes are small and known
- Use review to reshape AI output into “your” code, not just validate correctness

### Workflow Improvements

- Always checkpoint (git commit) before prompting refactors
- Treat refactors during review as optional, not mandatory
- Continue momentum rather than over-investing in low-value recovery
- Memory file is for capturing patterns and decisions to improve future sessions
