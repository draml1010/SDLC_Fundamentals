# Task Manager – Agentic SDLC Demo Project

## Overview
This project is a simple full-stack **Task Manager web application** developed as part of an **Agentic Software Development Lifecycle (SDLC)** exercise.

The primary goal is not only to implement a technically correct CRUD application, but also to **demonstrate effective and reflective collaboration with an agentic AI tool** throughout all phases of development.

The project showcases how AI can support architecture decisions, code generation, debugging, refactoring, testing, and documentation – while keeping the human developer in control of all final decisions.

---

## Features
- Create, read, update, and delete tasks
- Task status management (TODO, IN_PROGRESS, DONE)
- Optional due dates
- Form validation and error handling
- REST-based frontend-backend communication

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- REST API (JSON)

### Backend
- Java 17
- Spring Boot
- Maven
- Spring Web
- Spring Data JPA
- Bean Validation
- H2 In-Memory Database

---

## Domain Model

### Task Entity
| Field | Type | Constraints |
|---|---|---|
| `id` | Long | Auto-generated |
| `title` | String | Required, max 100 characters |
| `description` | String | Optional, max 500 characters |
| `status` | Enum | `TODO` \| `IN_PROGRESS` \| `DONE` |
| `dueDate` | LocalDate | Optional |

---

## REST API

Base path: `/api/tasks`

| Method | Path | Description | Success | Error |
|---|---|---|---|---|
| `GET` | `/` | List all tasks | 200 + array | — |
| `GET` | `/{id}` | Get single task | 200 + task | 404 |
| `POST` | `/` | Create task | 201 + task | 400 (validation) |
| `PUT` | `/{id}` | Update task | 200 + task | 400, 404 |
| `DELETE` | `/{id}` | Delete task | 204 | 404 |

### Error response format

**404 Not Found**
```json
{ "error": "Task not found: 42" }
```

**400 Bad Request** (validation failure)
```json
{ "title": "Title is required" }
```

---

## Running the Project

### Prerequisites
- Java 17 (Microsoft OpenJDK 17.0.18 or equivalent)
- Maven 3.9+ (`C:\app\maven\apache-maven-3.9.6\bin` on this machine)
- Node.js 18+

### Backend
```bash
cd backend
mvn spring-boot:run
# API available at http://localhost:8080
# H2 console at http://localhost:8080/h2-console
#   JDBC URL: jdbc:h2:mem:taskdb  |  User: sa  |  Password: (empty)
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# UI available at http://localhost:5173
# /api/* requests proxied to http://localhost:8080 via Vite
```

Both servers must be running for the full application to work.

---

## Testing

### Backend
```bash
cd backend
mvn test
```

Covers:
- **Service layer** — unit tests with Mockito for all CRUD operations and not-found cases
- **Controller layer** — `@WebMvcTest` slice tests verifying HTTP status codes, validation rejection (400), and error response shapes (404)

### Frontend
Manual integration testing via the running UI. Automated component tests are pending.

---

## Architecture Notes

| Decision | Choice | Rationale |
|---|---|---|
| Backend layers | Controller → Service → Repository | Separation of concerns; all business logic in the service |
| DTOs | Separate `TaskRequest` / `TaskResponse` | Decouples API contract from JPA entity |
| Database | H2 in-memory | Zero config for dev; swap to PostgreSQL via one property |
| Frontend state | Local React state | CRUD scope doesn't justify a global state manager |
| CORS | Vite dev proxy (`/api` → `:8080`) | No CORS config needed in development |
| Validation | Bean Validation on DTO + client-side pre-check | Server is authoritative; client check is UX only |

---

## Project Context

This project was built as an **Agentic SDLC** exercise, using Claude Code as a collaborative AI pair throughout all development phases. The `AI_USAGE.md` file documents the prompts used, AI contributions, and human interventions at each phase.
