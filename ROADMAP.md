# 🗺️ MicroTask Project Roadmap

> **Status:** 🚧 In Development
> **Timeline:** 20 Days Sprint
> **Goal:** Build a scalable microservices architecture for task management using modern specialized tools.

## 🏗️ Phase 1: Infrastructure & Foundation (Days 1-3)
Setting up the monorepo, container orchestration, and database strategy.

- [x] **Monorepo Setup**
  - [x] Initialize Turborepo structure.
  - [x] Create universal `Dockerfile` with `turbo prune` strategy.
  - [x] Configure shared packages (`types`, `tsconfig`).
- [x] **Container Orchestration**
  - [x] Setup `docker-compose.yml` for dev environment.
  - [x] Configure **PostgreSQL** container.
  - [x] Configure **RabbitMQ** container (Management Plugin enabled).
- [x] **Database Architecture**
  - [x] Define strategy: Single DB instance with multiple **Schemas**.
  - [x] Configure TypeORM for `auth-service` (Schema: `auth`).
  - [x] Configure TypeORM for `tasks-service` (Schema: `tasks`).
  - [x] Configure TypeORM for `notifications-service` (Schema: `notifications`).

## 🔐 Phase 2: Backend Core & Security (Days 4-7)
Building the business logic, authentication, and HTTP communication.

- [x] **API Gateway**
  - [x] Setup NestJS Gateway application.
  - [x] Configure Proxy to internal microservices.
  - [x] Setup **Swagger/OpenAPI** documentation endpoint.
- [x] **Auth Service**
  - [x] Implement User Entity & Repository.
  - [x] Implement Password Hashing (Bcrypt).
  - [x] Implement JWT Strategy (Sign & Verify).
- [x] **Tasks Service (CRUD)**
  - [x] Design Entities: `Task`, `Comment`.
  - [x] Implement DTOs with `class-validator`.
  - [x] Implement CRUD endpoints (Create, Read, Update, Delete).
  - [x] Verify HTTP communication: Gateway -> Tasks Service.

## 🎨 Phase 3: Frontend Implementation (Days 8-14)
Building the User Interface with modern React patterns.

- [x] **Frontend Infrastructure**
  - [x] Initialize React + Vite + TypeScript.
  - [x] Setup **TanStack Router** (File-based routing).
  - [x] Install & Configure **shadcn/ui** + Tailwind CSS.
- [x] **Authentication UI**
  - [x] Build Login/Register forms (`react-hook-form` + `zod`).
  - [x] Implement Auth State Management (**Zustand**).
  - [x] Handle Protected Routes (Redirect if unauthenticated).
- [X] **Task Management UI**
  - [x] Build Data Table for Task List (Filtering/Sorting).
  - [x] Build Task Creation/Edit Modals.
  - [x] Implement Task Detail View.
  - [X] Connect UI to Backend API.

## 📡 Phase 4: Distributed Systems & Real-time (Days 15-18)
The "Heavy Lifting": Event-driven architecture and WebSockets.

- [X] **Event Bus (RabbitMQ)**
  - [X] **Producer (Tasks Service):** Publish `task.created` & `task.updated` events.
  - [X] **Consumer (Notifications Service):** Listen to events and persist notifications.
  - [X] Handle connection resilience (Retry logic).
- [X] **Real-time Gateway (WebSockets)**
  - [X] Configure WebSocket Gateway (Socket.io/WS).
  - [X] Emit events to specific connected clients.
- [X] **Frontend Integration**
  - [X] Create `useWebSocket` hook.
  - [X] Display Real-time Toasts/Alerts on new events.
  - [X] Optimistic UI updates (optional).

## 🚀 Phase 5: Polish & Deliverables (Days 19-20)
Refining the experience and documenting the journey.

- [X] **Quality of Life**
  - [X] Add Skeleton Loaders & Loading States.
  - [X] Global Error Handling (Backend & Frontend).
  - [X] Docker production build verification.
- [ ] **Documentation**
  - [ ] Write detailed **README.md**.
  - [ ] Create Architecture Diagram.
  - [ ] Write "Trade-offs & Technical Decisions" section.