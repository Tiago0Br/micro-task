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
- [ ] **Container Orchestration**
  - [X] Setup `docker-compose.yml` for dev environment.
  - [X] Configure **PostgreSQL** container.
  - [ ] Configure **RabbitMQ** container (Management Plugin enabled).
- [X] **Database Architecture**
  - [X] Define strategy: Single DB instance with multiple **Schemas**.
  - [X] Configure TypeORM for `auth-service` (Schema: `auth`).
  - [X] Configure TypeORM for `tasks-service` (Schema: `tasks`).
  - [X] Configure TypeORM for `notifications-service` (Schema: `notifications`).

## 🔐 Phase 2: Backend Core & Security (Days 4-7)
Building the business logic, authentication, and HTTP communication.

- [ ] **API Gateway**
  - [ ] Setup NestJS Gateway application.
  - [ ] Configure Proxy to internal microservices.
  - [ ] Setup **Swagger/OpenAPI** documentation endpoint.
- [ ] **Auth Service**
  - [ ] Implement User Entity & Repository.
  - [ ] Implement Password Hashing (Argon2/Bcrypt).
  - [ ] Implement JWT Strategy (Sign & Verify).
  - [ ] Create **JWT Guard** for the API Gateway.
- [ ] **Tasks Service (CRUD)**
  - [ ] Design Entities: `Task`, `Comment`.
  - [ ] Implement DTOs with `class-validator`.
  - [ ] Implement CRUD endpoints (Create, Read, Update, Delete).
  - [ ] Verify HTTP communication: Gateway -> Tasks Service.

## 🎨 Phase 3: Frontend Implementation (Days 8-14)
Building the User Interface with modern React patterns.

- [ ] **Frontend Infrastructure**
  - [ ] Initialize React + Vite + TypeScript.
  - [ ] Setup **TanStack Router** (File-based routing).
  - [ ] Install & Configure **shadcn/ui** + Tailwind CSS.
- [ ] **Authentication UI**
  - [ ] Build Login/Register forms (`react-hook-form` + `zod`).
  - [ ] Implement Auth State Management (**Zustand**).
  - [ ] Handle Protected Routes (Redirect if unauthenticated).
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
  - [ ] Record Demo Video.

---

### 🛠️ Tech Stack

**Frontend:** React, TanStack Router, Tailwind, shadcn/ui, Zustand.
**Backend:** NestJS, TypeORM, Postgres, RabbitMQ, Passport.js.
**DevOps:** Docker, Docker Compose, Turborepo.