# Dove Backend

Dove is a robust Hospital Management System backend API built with **NestJS**. It is designed to manage laboratory operations, patient records, staff administration, and financial transactions related to medical testing.

## Overview

This project serves as the core API layer for the Dove platform. It follows a **Modular Monolith** architecture, ensuring clear separation of concerns while maintaining a unified codebase. The system handles authentication, Role-Based Access Control (RBAC), and complex data relationships between patients, tests, and organizational structures.

### Key Features
-   **Authentication & Authorization**: JWT-based secure access with `Admin` and `Staff` roles.
-   **Patient Management**: Comprehensive records for patient demographics and history.
-   **Laboratory Operations**: Management of test catalogs (`LabTests`), pricing, and test requests.
-   **Financials**: Tracking payments, discounts, and outstanding balances for test requests.
-   **Organizational Structure**: Flexible management of departments and designations.
-   **Activity Logging**: Automated tracking of critical system actions for audit trails.

## Architecture

The application is built on the [NestJS](https://nestjs.com/) framework and uses strict **Dependency Injection**.

-   **Framework**: NestJS (Node.js)
-   **Language**: TypeScript
-   **Database**: SQLite (Development) / PostgreSQL (Production ready via TypeORM)
-   **ORM**: TypeORM
-   **Documentation**: Swagger (OpenAPI)

## Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript runtime environment. |
| **Framework** | NestJS | Progressive Node.js framework. |
| **Database** | SQLite | Serverless database engine (default). |
| **ORM** | TypeORM | Object-Relational Mapper for TypeScript. |
| **Validation** | class-validator | Decorator-based validation. |
| **Docs** | Swagger | API documentation generator. |

## Prerequisites

Ensure you have the following installed locally:

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/) (v8 or higher)

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd dove/backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Duplicate the example environment file:
    ```bash
    cp .env.example .env
    ```
    *Note: The default configuration uses a local SQLite database (`dove.db`), so no external database setup is required for initial testing.*

## Running the Application

### Development Mode
Starts the application with hot-reload enabled.
```bash
npm run start:dev
```
The server will start at `http://localhost:3000`.

### Production Mode
Builds the application and runs the optimized production build.
```bash
npm run build
npm run start:prod
```

## API Documentation

The API is fully documented using Swagger. Once the application is running, access the interactive documentation at:

**[http://localhost:3000/api](http://localhost:3000/api)**

### Core Modules

-   **Auth** (`/auth`): Login and registration endpoints.
-   **Users** (`/users`): User account management (Admin only).
-   **Organization** (`/organization`): Manage hospital/clinic details.
-   **Structure** (`/departments`, `/designations`): Manage internal hierarchy.
-   **Patients** (`/patients`): Patient registration and lookup.
-   **Lab Tests** (`/tests`): Catalog of available medical tests and prices.
-   **Test Requests** (`/test-requests`): Creation and processing of patient test orders.

## Project Structure

The source code is organized by feature modules within the `src/` directory.

```text
src/
├── app.module.ts           # Root application module
├── main.ts                 # Application entry point
├── auth/                   # Authentication logic & strategies
├── users/                  # User management
├── organization/           # Organization settings
├── structure/              # Departments & Designations
├── patients/               # Patient records
├── lab-tests/              # Test catalog management
├── test-requests/          # Test ordering & payments
└── activity-log/           # System audit logs
```

## Testing

Run the automated test suite to verify system integrity.

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

## License

This project is [MIT licensed](LICENSE).
