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
```java
Task {
  id: number (auto-generated)
  title: string (required, max 100 characters)
  description: string (optional, max 500 characters)
  status: TODO | IN_PROGRESS | DONE
  dueDate: LocalDate (optional)
}
