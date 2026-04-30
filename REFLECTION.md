# Phase 8 — Reflection on AI Usage

*Complete this document in your own words. The prompts below are guides, not constraints — remove, reorder, or expand any section as needed.*

---

## 1. Overall Experience

> How did working with an agentic AI across the full SDLC compare to your expectations going in?
> Was the collaboration closer to pair programming, autocomplete, or something else entirely?

It wasn’t autocomplete—it was more like delegating chunks of work to someone who writes confidently and quickly, but occasionally invents details that sound right. The sweet spot was letting the AI draft broad solutions, then forcing correctness through tests, contract checks, and targeted code review.

---

## 2. Where the AI Accelerated Development

> Which phases or tasks moved meaningfully faster because of the AI?
> Were there specific outputs (code, tests, docs) you would describe as "production-ready on first pass"?

Some outputs were close to production-ready on the first pass—particularly boilerplate CRUD code, DTO mapping, and basic controller tests. The AI was strongest where patterns are well-established and repeatable. For anything involving cross-layer contracts (frontend error parsing, validation error formats, or edge-case business rules), “first pass” was a strong draft rather than final.

**Examples to consider:**
- Backend boilerplate (entity, DTOs, controller, service)
- Test scaffolding and assertion patterns
- Documentation structure

---

## 3. Where AI Suggestions Were Incomplete or Misleading

> Were there moments where the AI output looked correct but wasn't — or where you had to dig to find the flaw?
> Did the AI ever confidently propose something that turned out to be wrong?

The most common failure mode was “plausible defaults”: it would assume an error response shape, a validation payload format, or a field naming convention—then build both sides around that assumption. This is especially risky because the result compiles and even appears consistent, until a real backend response breaks it.

**Known candidate:** The `handleResponse` function in `tasks.ts` initially read only `body.error`, silently mishandling the backend's 400 field-map format. The AI had defined both sides of that contract itself. How did you catch this, and what does it tell you about reviewing AI-generated integration code?

I caught it by forcing a failing case (invalid input) and inspecting the actual response payload, then updating parsing logic to support the field-map format

---

## 4. What Required Human Correction

> List corrections you made to AI output — not just fixes, but moments where you changed direction, rejected a proposal, or added something the AI didn't think of.

Data model refinmenemt, test Scope decisions, Error-handling correctntess, non-functional concerns

**Examples to consider:**
- Adding `dueDate` to the entity after reviewing the initial proposal
- Approving `@WebMvcTest` scope vs. `@SpringBootTest` for controller tests
- Any styling, naming, or structural choices you changed

---

## 5. Control and Trust

> Did you feel in control of the codebase throughout? Were there moments where you accepted AI output without fully understanding it?
> How did the collaboration rules in CLAUDE.md affect the dynamic?

Having explicit collaboration rules (in a CLAUDE.md-style file) improved control: it reduced stylistic drift, prevented repeated re-explanations, and increased consistency across sessions. It also made reviews easier because conventions were stable (naming, structure, testing approach).

---

## 6. Benefits Observed

> Summarise the concrete benefits you experienced — time saved, quality improved, coverage expanded.

Amazing Time saved on scaffolding, Coverage expansion, Documentation quality, Iteration speed.

---

## 7. Limitations Observed

> What could the AI *not* do well, or at all?
> Where would you not rely on it without additional verification?

It sometimes proposed changes with high confidence that were stylistically attractive but not aligned with the actual design intent or constraints.

**Prompts:**
- Did it understand the *why* behind requirements, or just the *what*?
- How did it perform on tasks requiring project-specific business context?
- What happened when requirements were ambiguous?

---

## 8. Lessons Learned

> If you were starting a new project tomorrow with an agentic AI, what would you do differently?
> What practices from this project would you keep?

Start with colloboration rules,Force reality checks, Use the AI in staged responisbilities

---

## 9. Verdict

> In one or two sentences: what is the role of agentic AI in professional software development, based on what you observed here?

Agentic AI is best viewed as a high-leverage implementation partner: it accelerates drafting and scaffolding across the SDLC, while humans remain responsible for correctness, contracts, and the reasoning behind design decisions.
