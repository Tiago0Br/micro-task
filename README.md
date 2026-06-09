# MicroTask

MicroTask is a task management application built with a microservices architecture, organized in a monorepo using **Turborepo** and **pnpm workspaces**. It demonstrates a scalable approach to building distributed systems with modern technologies.

## 🚀 Tech Stack

### Frontend
- **React** (Vite)
- **TypeScript**
- **TanStack Router** (File-based routing)
- **Tailwind CSS** & **shadcn/ui**
- **Zustand** (State management)
- **TanStack Query** (Data fetching)

### Backend (Microservices)
- **NestJS** (Framework)
- **TypeORM** (ORM)
- **PostgreSQL** (Database)
- **RabbitMQ** (Message Broker)
- **Passport.js** (JWT Authentication)

### Infrastructure & DevOps
- **Turborepo** (Monorepo management)
- **pnpm** (Package manager)
- **Docker** & **Docker Compose** (Containerization)
- **Biome** (Linting & Formatting)

## 🏗️ Architecture

The project consists of several microservices coordinated through an API Gateway:

- **API Gateway:** Single entry point for the frontend, proxying requests to internal services.
- **Auth Service:** Handles user registration, login, and JWT-based authentication.
- **Tasks Service:** Manages task CRUD operations and comments.
- **Notifications Service:** (In progress) Consumes events via RabbitMQ to send notifications.
- **Web Frontend:** A modern React application to interact with the system.

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd micro-task
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the infrastructure (Postgres, RabbitMQ):
   ```bash
   docker-compose up -d
   ```

4. Run the applications in development mode:
   ```bash
   pnpm dev
   ```

## 📖 Documentation

- [Roadmap](./ROADMAP.md) - Project progress and future phases.
- [Monorepo Documentation](./GEMINI.md) - Technical details about the monorepo structure (Portuguese).

## 📜 Scripts

Available in the root directory:

- `pnpm dev`: Start all apps in watch mode.
- `pnpm build`: Build all applications and packages.
- `pnpm lint`: Run linting across the workspace.
- `pnpm format`: Format all files using Biome.

---
Built with ❤️ as a demonstration of microservices architecture.
