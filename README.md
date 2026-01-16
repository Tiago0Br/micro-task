# 🗺️ MicroTask Project Roadmap

> **Status:** 🚧 In Development
> **Timeline:** 20 Days Sprint
> **Goal:** Build a scalable microservices architecture for task management using modern specialized tools.

## 🏗️ Phase 1: Infrastructure & Foundation (Days 1-3)
Setting up the monorepo, container orchestration, and database strategy.

- [X] **Monorepo Setup**
  - [X] Initialize Turborepo structure.
  - [X] Create universal `Dockerfile` with `turbo prune` strategy.
  - [X] Configure shared packages (`types`, `tsconfig`).
- [X] **Container Orchestration**
  - [X] Setup `docker-compose.yml` for dev environment.
  - [X] Configure **PostgreSQL** container.
  - [X] Configure **RabbitMQ** container (Management Plugin enabled).
- [X] **Database Architecture**
  - [X] Define strategy: Single DB instance with multiple **Schemas**.
  - [X] Configure TypeORM for `auth-service` (Schema: `auth`).
  - [X] Configure TypeORM for `tasks-service` (Schema: `tasks`).
  - [X] Configure TypeORM for `notifications-service` (Schema: `notifications`).

## 🔐 Phase 2: Backend Core & Security (Days 4-7)
Building the business logic, authentication, and HTTP communication.

- [X] **API Gateway**
  - [X] Setup NestJS Gateway application.
  - [X] Configure Proxy to internal microservices.
  - [X] Setup **Swagger/OpenAPI** documentation endpoint.
- [X] **Auth Service**
  - [X] Implement User Entity & Repository.
  - [X] Implement Password Hashing (Bcrypt).
  - [X] Implement JWT Strategy (Sign & Verify).
- [X] **Tasks Service (CRUD)**
  - [X] Design Entities: `Task`, `Comment`.
  - [X] Implement DTOs with `class-validator`.
  - [X] Implement CRUD endpoints (Create, Read, Update, Delete).
  - [X] Verify HTTP communication: Gateway -> Tasks Service.

## 🎨 Phase 3: Frontend Implementation (Days 8-14)
Building the User Interface with modern React patterns.

- [X] **Frontend Infrastructure**
  - [X] Initialize React + Vite + TypeScript.
  - [X] Setup **TanStack Router** (File-based routing).
  - [X] Install & Configure **shadcn/ui** + Tailwind CSS.
- [X] **Authentication UI**
  - [X] Build Login/Register forms (`react-hook-form` + `zod`).
  - [X] Implement Auth State Management (**Zustand**).
  - [X] Handle Protected Routes (Redirect if unauthenticated).
- [ ] **Task Management UI**
  - [ ] Build Data Table for Task List (Filtering/Sorting).
  - [ ] Build Task Creation/Edit Modals.
  - [ ] Implement Task Detail View.
  - [ ] Connect UI to Backend API.

## 📡 Phase 4: Distributed Systems & Real-time (Days 15-18)
The "Heavy Lifting": Event-driven architecture and WebSockets.

- [ ] **Event Bus (RabbitMQ)**
  - [ ] **Producer (Tasks Service):** Publish `task.created` & `task.updated` events.
  - [ ] **Consumer (Notifications Service):** Listen to events and persist notifications.
  - [ ] Handle connection resilience (Retry logic).
- [ ] **Real-time Gateway (WebSockets)**
  - [ ] Configure WebSocket Gateway (Socket.io/WS).
  - [ ] Emit events to specific connected clients.
- [ ] **Frontend Integration**
  - [ ] Create `useWebSocket` hook.
  - [ ] Display Real-time Toasts/Alerts on new events.
  - [ ] Optimistic UI updates (optional).

## 🚀 Phase 5: Polish & Deliverables (Days 19-20)
Refining the experience and documenting the journey.

- [ ] **Quality of Life**
  - [ ] Add Skeleton Loaders & Loading States.
  - [ ] Global Error Handling (Backend & Frontend).
  - [ ] Docker production build verification.
- [ ] **Documentation**
  - [ ] Write detailed **README.md**.
  - [ ] Create Architecture Diagram.
  - [ ] Write "Trade-offs & Technical Decisions" section.

---

### 🛠️ Tech Stack

**Frontend:** React, TanStack Router, Tailwind, shadcn/ui, Zustand.
**Backend:** NestJS, TypeORM, Postgres, RabbitMQ, Passport.js.
**DevOps:** Docker, Docker Compose, Turborepo.