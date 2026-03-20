# Doxa Cleaning — Backend

A RESTful API for the Doxa Cleaning job management app. Built with Node.js, Express, and PostgreSQL. Built as a full-stack capstone project by Emiliano Canseco III.

## Live Demo
[Doxa Cleaning](https://doxa-frontend-ten.vercel.app)

## GitHub
- Backend: https://github.com/Emiliano-Canseco-III/Doxa-Cleaning-Backend
- Frontend: https://github.com/Emiliano-Canseco-III/Doxa-Cleaning-Frontend

## Tech Stack
- Node.js
- Express
- PostgreSQL
- JWT Authentication
- bcrypt password hashing

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Create new user | None |
| POST | /api/auth/login | Login and receive JWT | None |

### Jobs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/jobs | Get all jobs | Admin |
| GET | /api/jobs/my-jobs | Get jobs for employee | Employee |
| POST | /api/jobs | Create a job | Admin |
| PATCH | /api/jobs/:id | Edit a job | Admin |
| PATCH | /api/jobs/:id/in-progress | Start a job | Employee |
| PATCH | /api/jobs/:id/complete | Complete a job | Employee |
| DELETE | /api/jobs/:id | Delete a job | Admin |

### Employees
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/employees | Get all employees | Admin |
| DELETE | /api/employees/:id | Delete an employee | Admin |

### Customers
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/customers | Get all customers | Admin |
| GET | /api/customers/:id | Get one customer | Admin |
| POST | /api/customers | Create a customer | Admin |
| PATCH | /api/customers/:id | Update a customer | Admin |
| DELETE | /api/customers/:id | Delete a customer | Admin |

## Database Schema
- **users** — stores admin and employee accounts
- **customers** — stores customer info including address and phone
- **jobs** — stores job assignments, scheduling, status, and notes

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
```bash
git clone https://github.com/Emiliano-Canseco-III/Doxa-Cleaning-Backend
cd Doxa-Cleaning-Backend
npm install
```

### Environment Variables
Create a `.env` file in the root:
```
JWT_SECRET=your_secret_here
DATABASE_URL=postgres://localhost:5432/doxa_cleaning_llc
```

### Database Setup
```bash
psql postgres://localhost:5432/doxa_cleaning_llc -f db/schema.sql
node db/seed.js
```

### Start Server
```bash
node server.js
```

Server runs at http://localhost:3000
