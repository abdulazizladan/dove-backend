# Dove API Documentation

## Overview
Base URL: `http://localhost:3000/api` (Swagger UI) \
Base API URL: `http://localhost:3000`

## Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Login with username and password | No |
| `POST` | `/auth/register` | Register a new user | No |

## Users (`/users`)
> **Role Required**: ADMIN

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/users` | Create a new user |
| `GET` | `/users` | List all users |
| `GET` | `/users/:id` | Get user by ID |
| `PATCH` | `/users/:id` | Update user details |
| `DELETE` | `/users/:id` | Remove a user |

## Organization (`/organization`)
> **Role Required**: ADMIN

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/organization` | Create a new organization |
| `GET` | `/organization` | List organizations |
| `GET` | `/organization/:id` | Get organization details |
| `PATCH` | `/organization/:id` | Update organization |
| `DELETE` | `/organization/:id` | Delete organization |

## Departments (`/departments`)
> **Role Required**: ADMIN

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/departments` | Create department | `{ "name": "string" }` |
| `GET` | `/departments` | List departments | - |
| `GET` | `/departments/:id` | Get department | - |
| `PATCH` | `/departments/:id` | Update department | `{ "name": "string" }` |
| `DELETE` | `/departments/:id` | Delete department | - |

## Designations (`/designations`)
> **Role Required**: ADMIN

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/designations` | Create designation | `{ "name": "string" }` |
| `GET` | `/designations` | List designations | - |
| `GET` | `/designations/:id` | Get designation | - |
| `PATCH` | `/designations/:id` | Update designation | `{ "name": "string" }` |
| `DELETE` | `/designations/:id` | Delete designation | - |

## Patients (`/patients`)
> **Role Required**: STAFF

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/patients` | Register a new patient |
| `GET` | `/patients` | List all patients |
| `GET` | `/patients/:id` | Get patient details |
| `PATCH` | `/patients/:id` | Update patient records |
| `DELETE` | `/patients/:id` | Delete patient record |

## Test Requests (`/test-requests`)
> **Role Required**: STAFF

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/test-requests` | Create a test request |
| `GET` | `/test-requests` | List test requests |
| `GET` | `/test-requests/:id` | Get specific test request |
| `PATCH` | `/test-requests/:id` | Update test request (e.g., status) |
| `DELETE` | `/test-requests/:id` | Cancel/Delete test request |
