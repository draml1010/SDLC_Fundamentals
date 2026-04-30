# Claude.md – Agentic SDLC Configuration

## Project Overview
Project Name: Task Manager Web Application
Goal: Build a simple full-stack CRUD web application while collaboratively working with an agentic AI system throughout the entire SDLC.

The focus is not only on the technical result but also on:
- how the AI is used
- what decisions the AI supports
- where the AI is challenged or corrected
- reflective evaluation of AI contributions

# Project Context
This project evaluates the SNCF PKI Hybrid RFP.

# Authoritative Documents
<!-- Dies Abschnitt ist ein Test
- docs/rfp/RFP_Main.pdf (primary source, always authoritative)
- docs/contracts/SoW_Draft.docx
- docs/architecture/Target_Architecture.vsdx

# Rules
- If information conflicts: RFP_Main.pdf wins
- Ignore drafts unless explicitly referenced
- Summaries must be client-ready (executive tone)

# Output Expectations
- Structured tables
- Clear assumptions
- Explicit risks and mitigations
 -->
---

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite 8
- TailwindCSS v4 (via `@tailwindcss/vite` plugin)

### Backend
- Java 17 (Microsoft OpenJDK 17.0.18)
- Spring Boot 3.2.5
- Maven 3.9.6 (installed to `C:\app\maven\apache-maven-3.9.6`)
- Spring Web, Spring Data JPA, Bean Validation
- H2 In-Memory Database

---

## Functional Scope

### Entity: Task
| Field       | Type        | Constraints                        |
|-------------|-------------|-------------------------------------|
| id          | Long        | Auto-generated                      |
| title       | String      | Required, max 100 characters        |
| description | String      | Optional, max 500 characters        |
| status      | TaskStatus  | TODO \| IN_PROGRESS \| DONE         |
| dueDate     | LocalDate   | Optional                            |

### REST API (base: `/api/tasks`)
| Method | Path       | Description       | Response      |
|--------|------------|-------------------|---------------|
| GET    | /          | List all tasks    | 200 + array   |
| GET    | /{id}      | Get single task   | 200 / 404     |
| POST   | /          | Create task       | 201 + task    |
| PUT    | /{id}      | Update task       | 200 / 404     |
| DELETE | /{id}      | Delete task       | 204 / 404     |

### Frontend Features
- Task list view
- Create / Edit / Delete task via modal
- Status badge (color-coded)
- Optional due date
- Client-side + server-side validation
- Error display with retry

---

## Project Structure

```
SDLC_Fundamentals/
├── CLAUDE.md
├── README.md
├── AI_USAGE.md
├── backend/
│   ├── pom.xml
│   ├── mvnw.cmd
│   ├── .mvn/wrapper/maven-wrapper.properties
│   └── src/
│       ├── main/
│       │   ├── java/com/example/taskmanager/
│       │   │   ├── TaskManagerApplication.java
│       │   │   ├── controller/TaskController.java
│       │   │   ├── service/TaskService.java
│       │   │   ├── repository/TaskRepository.java
│       │   │   ├── model/Task.java
│       │   │   ├── model/TaskStatus.java
│       │   │   ├── dto/TaskRequest.java
│       │   │   ├── dto/TaskResponse.java
│       │   │   └── exception/
│       │   │       ├── TaskNotFoundException.java
│       │   │       └── GlobalExceptionHandler.java
│       │   └── resources/application.properties
│       └── test/
│           └── java/com/example/taskmanager/service/TaskServiceTest.java
└── frontend/
    ├── vite.config.ts          ← proxy /api → localhost:8080
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css           ← @import "tailwindcss"
        ├── types/task.ts
        ├── api/tasks.ts
        └── components/
            ├── TaskCard.tsx
            ├── TaskForm.tsx
            ├── StatusBadge.tsx
            └── Modal.tsx
```

---

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Backend layers | Controller → Service → Repository | Separation of concerns; service holds all business logic |
| DTOs | Separate Request/Response DTOs | Decouples API contract from JPA entity; prevents over-posting |
| Database | H2 in-memory | Zero config for dev; swap to PostgreSQL via one property change |
| Frontend state | Local React state (no Redux) | CRUD scope doesn't justify a global state manager |
| API layer | Centralised `tasksApi` module | Single place for base URL, headers, and error handling |
| CORS | Vite proxy (`/api` → `:8080`) | No CORS headers needed in dev; backend stays unaware of frontend origin |
| Validation | Bean Validation on DTO + client-side pre-check | Server is authoritative; client validation is UX only |

---

## Running the Project

### Backend
```bash
cd backend
# Requires Java 17 on PATH, or set JAVA_HOME manually:
# $env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
# $env:PATH = "$env:PATH;C:\app\maven\apache-maven-3.9.6\bin;$env:JAVA_HOME\bin"
mvn spring-boot:run
# → http://localhost:8080
# → H2 console: http://localhost:8080/h2-console
#   JDBC URL: jdbc:h2:mem:taskdb  |  User: sa  |  Password: (empty)
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Role of the Agentic AI
The AI acts as:
- Pair Developer
- Architecture Advisor
- Debugging Assistant
- Refactoring Partner
- Documentation Assistant
- Test Case Generator

The AI does NOT act as:
- Autonomous decision maker
- Unchecked code generator

---

## Collaboration Rules
1. All architectural decisions must be explained by the AI.
2. Generated code must be readable, idiomatic, and minimal.
3. The AI should propose alternatives when trade-offs exist.
4. The developer validates, adjusts, or rejects AI output.
5. Refactorings must include a rationale.

---

## Development Workflow (SDLC Phases)

| Phase | Status | Description |
|-------|--------|-------------|
| 1. Architecture & API Design   | Done | Layered architecture agreed, REST contract defined |
| 2. Backend Implementation      | Done | Spring Boot CRUD API with validation and error handling |
| 3. Frontend Implementation     | Done | React + Vite + Tailwind, full CRUD UI |
| 4. Integration & CORS          | Done | Vite proxy eliminates CORS in dev |
| 5. Error Handling & Validation | In Progress | Server errors surfaced in UI; further polish pending |
| 6. Testing                     | Pending | Unit tests scaffolded (TaskServiceTest); more needed |
| 7. Documentation               | In Progress | README + AI_USAGE.md exist; API docs pending |
| 8. Reflection on AI Usage      | Pending | To be completed at project end |

---

## Testing Strategy

### Backend
- Unit tests for service layer (`TaskServiceTest` — Mockito)
- Validation tests for REST endpoints (pending)

### Frontend
- Basic component tests (pending)
- Manual integration testing (in progress)

AI proposes tests; test relevance and correctness are reviewed manually.

---

## Documentation
The AI supports:
- README.md creation
- API documentation
- Inline code comments

All documentation is reviewed for correctness and clarity.

---

## Reflection & Critical Evaluation
Throughout development, note:
- Where the AI accelerated development
- Where AI suggestions were incomplete or misleading
- What required human correction

A final reflection will summarize:
- Benefits of agentic AI
- Limitations observed
- Lessons learned

---

## Deliverables
- Git repository with full source code
- README.md
- This CLAUDE.md
- AI_USAGE.md with prompt/intervention log
- Reflection section on agent usage
