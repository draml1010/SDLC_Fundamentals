# Executive Summary — Agentic SDLC Project

## Project

A full-stack Task Manager web application built as a structured evaluation of agentic AI assistance across all phases of the Software Development Lifecycle.

**Stack:** Spring Boot 3.2 (Java 17) backend + React 19 / TypeScript / TailwindCSS v4 frontend  
**Scope:** REST CRUD API, form validation, error handling, unit and slice tests, full documentation  
**AI Tool:** Claude Code (claude-sonnet-4-6) operating as pair developer throughout

---

## What Was Built

A production-ready (dev-grade) Task Manager application with:
- Five REST endpoints with consistent error responses (400 field maps, 404 JSON errors)
- Layered backend (Controller → Service → Repository) with DTOs, Bean Validation, and centralised exception handling
- React frontend with modal-based CRUD, client-side validation, and full server error surfacing
- 15 automated backend tests (8 service unit tests, 7 controller slice tests), all passing

---

## How the AI Was Used

The AI acted as a **pair developer** across all eight SDLC phases — not as an autonomous generator. Every significant output (architecture, code, tests, documentation) was reviewed, validated, and approved before being accepted.

| Phase | AI Role | Human Role |
|---|---|---|
| Architecture | Proposed layered design, DTOs, Vite proxy | Reviewed rationale, approved stack |
| Backend | Generated all Spring Boot layers | Verified `@Valid` wiring, reviewed error contract |
| Frontend | Generated all React components and API layer | Confirmed component structure and state approach |
| Integration | Configured Vite proxy | Validated working integration |
| Error Handling | Audited own prior code, identified and fixed three gaps | Approved approach and placement |
| Testing | Completed service tests, wrote controller slice tests, fixed a pre-existing test bug | Reviewed assertions and test scope |
| Documentation | Wrote README, AI usage log, and this summary | Review and approval |

---

## Key Observations

**Where the AI accelerated development**
- Backend boilerplate (entity, DTOs, service, controller, exception handler) generated correctly on first pass with idiomatic Spring Boot patterns
- Frontend component structure and API layer required minimal correction
- Test scaffolding was complete and correct; the AI independently identified a bug in the pre-existing test helper

**Where the AI required direction or correction**
- The backend 400 validation response shape (field map) was not reflected in the initial frontend error parsing — a contract the AI itself had defined. It identified and fixed this when explicitly auditing error handling.
- Test scope decisions (service vs. controller slice tests, `@WebMvcTest` vs. `@SpringBootTest`) required human confirmation before proceeding

**Where human judgement was essential**
- All architectural decisions — even those proposed by the AI — required developer review and sign-off
- Entity design (adding `dueDate`) came from human review of the initial proposal
- Collaboration rules (CLAUDE.md) were written and enforced by the developer throughout

---

## Conclusion

Agentic AI demonstrably accelerated development across all phases. The most significant gains were in boilerplate generation, test writing, and cross-cutting concern audit (error handling). The AI was most reliable when given a clear, scoped task with explicit acceptance criteria.

The exercise confirmed that the AI is most valuable as an accelerator under developer control — not as an autonomous decision-maker. The quality of outcomes was directly correlated with the quality of human review applied at each phase.
