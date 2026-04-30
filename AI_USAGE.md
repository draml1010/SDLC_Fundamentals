# AI Usage Log

This document records how Claude Code (claude-sonnet-4-6) was used throughout the development of the Task Manager application. Each entry covers the prompt or task given to the AI, what it contributed, where human judgement intervened, and a brief assessment.

---

## Phase 1 — Architecture & API Design

**Prompt / Task**
Define the project structure, technology choices, and REST API contract for a full-stack Task Manager CRUD application.

**AI Contribution**
- Proposed the layered backend architecture: Controller → Service → Repository
- Defined the REST endpoint contract (methods, paths, HTTP status codes)
- Recommended H2 in-memory database for zero-config development with a clear migration path to PostgreSQL
- Explained the rationale for separate `TaskRequest` / `TaskResponse` DTOs (decoupling API contract from JPA entity, preventing over-posting)
- Recommended Vite proxy over CORS headers for the development environment

**Human Intervention**
- Reviewed and approved all architectural choices
- Confirmed tech stack versions (Spring Boot 3.2.5, React 19, TailwindCSS v4)
- Added the `dueDate` field to the entity after reviewing the initial proposal

**Assessment**
The AI produced a coherent, idiomatic architecture without prompting. The DTO rationale was explained clearly and accepted without modification.

---

## Phase 2 — Backend Implementation

**Prompt / Task**
Generate the full Spring Boot backend: entity, DTOs, repository, service, controller, and exception handling.

**AI Contribution**
- Generated `Task` entity with JPA annotations and Bean Validation constraints
- Generated `TaskRequest` / `TaskResponse` DTOs
- Implemented `TaskService` with all five CRUD operations, including a private `applyRequest` helper to avoid repetition across create and update
- Implemented `TaskController` with correct HTTP verbs and `@ResponseStatus` annotations
- Implemented `TaskNotFoundException` and `GlobalExceptionHandler` to handle 404 and validation 400 responses with consistent JSON error shapes

**Human Intervention**
- Verified that `@Valid` was applied to all request body parameters in the controller
- Confirmed that validation errors from `MethodArgumentNotValidException` returned a field-map (`{ "field": "message" }`) rather than a single string — this later affected how the frontend parsed errors (Phase 5)

**Assessment**
Backend generated correctly on first pass. The AI applied idiomatic Spring Boot patterns throughout. No major corrections were needed at this phase.

---

## Phase 3 — Frontend Implementation

**Prompt / Task**
Build the React frontend: task list, create/edit/delete via modal, status badges, form validation, and API layer.

**AI Contribution**
- Generated `types/task.ts` with `Task`, `TaskRequest`, and `TaskStatus` types
- Generated the centralised `tasksApi` module with a shared `handleResponse` helper
- Implemented `TaskCard`, `TaskForm`, `StatusBadge`, and `Modal` components
- Implemented `App.tsx` with local state management for tasks, loading, error, and modal visibility
- Applied TailwindCSS v4 styling throughout

**Human Intervention**
- Reviewed component composition and approved the modal-based create/edit flow
- Confirmed that local React state (no Redux) was sufficient given the scope

**Assessment**
The frontend skeleton was generated quickly and matched the agreed design. The component structure was clean and idiomatic.

---

## Phase 4 — Integration & CORS

**Prompt / Task**
Configure the Vite development proxy so the frontend can call `/api/tasks` without CORS issues.

**AI Contribution**
- Configured `vite.config.ts` with a proxy rule forwarding `/api` to `http://localhost:8080`
- Explained why this approach is preferable to adding `@CrossOrigin` to the backend in development

**Human Intervention**
- None required; configuration worked on first attempt

**Assessment**
Straightforward configuration task. AI rationale for the proxy approach was sound.

---

## Phase 5 — Error Handling & Validation Polish

**Prompt / Task**
Audit existing error handling and fix all gaps where API errors were silently swallowed.

**AI Contribution**
- Identified three gaps: `handleSubmit` / `handleDelete` in `App.tsx` had no try/catch; `handleResponse` in `tasks.ts` did not correctly parse backend 400 field-map responses; `TaskForm` had no way to display server-side errors
- Fixed `handleResponse` to detect both `{ "error": "..." }` (404) and `{ "field": "message" }` (400 validation) response shapes
- Added `submitError` state to `TaskForm` with a red banner above the action buttons
- Added try/catch to `handleDelete` in `App.tsx` routing failures into the existing page-level error banner

**Human Intervention**
- Approved the approach of catching errors inside `TaskForm` rather than in `App.tsx`, keeping `App.tsx` clean
- Confirmed the error banner placement and styling

**Assessment**
The AI correctly identified all gaps from its own prior code and proposed minimal, targeted fixes. No new abstractions were introduced. The `handleResponse` bug (field-map not parsed) was a direct consequence of a backend/frontend contract that the AI itself had defined — it caught and fixed this without prompting.

---

## Phase 6 — Testing

**Prompt / Task**
Expand test coverage for the backend: complete the service unit tests and add controller slice tests.

**AI Contribution**
- Identified that the existing `TaskServiceTest` was missing happy-path cases for `findById`, `update`, and `delete`, and that a bug in the `taskWithId` helper meant the `create` test's `getId()` assertion would return null
- Fixed `taskWithId` to use `ReflectionTestUtils.setField` to set the auto-generated `id` field
- Added four missing service tests: `findById` happy path, `update` happy path, `update` not found, `delete` happy path
- Created `TaskControllerTest` using `@WebMvcTest` with a mocked `TaskService`, covering all five endpoints and verifying HTTP status codes, validation rejection (400 with field map), and 404 error shape

**Human Intervention**
- Reviewed test names and assertions for correctness
- Confirmed that `@WebMvcTest` (not `@SpringBootTest`) was the right choice for controller slice tests

**Assessment**
The AI caught a pre-existing bug in the test helper before being asked. Controller slice tests were generated correctly on first pass and all 15 tests passed without modification.

---

## Phase 7 — Documentation

**Prompt / Task**
Complete the README, expand the AI usage log, and write the executive summary.

**AI Contribution**
- Completed the truncated README with API reference table, error response formats, running instructions, testing guide, and architecture notes
- Wrote this AI usage log in full, covering all six prior phases
- Wrote the EXECUTIVE_SUMMARY.md

**Human Intervention**
- Review and approval of all document content

**Assessment**
Pending human review.
