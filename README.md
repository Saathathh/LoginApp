# LoginApp

A full-stack login and signup application built with React, ASP.NET Core, and MongoDB.

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React (CRA)                |
| Backend  | ASP.NET Core (.NET 10)     |
| Database | MongoDB                    |
| Auth     | BCrypt password hashing    |
| Deploy   | Docker & Docker Compose    |

## Features

- User registration with name, email, and password
- Secure login with hashed passwords
- Gmail-style floating label inputs
- Responsive design (mobile, tablet, desktop)
- Dashboard page after login

## Project Structure

```
LoginApp/
├── Backend/           # ASP.NET Core Web API
│   ├── Controllers/   # Auth endpoints (signup, login, users)
│   ├── Data/          # MongoDB service
│   ├── DTOs/          # Request models
│   ├── Models/        # User model
│   └── Dockerfile
├── frontend/          # React app
│   ├── src/pages/     # Login, Signup, Home pages
│   ├── public/
│   └── Dockerfile
├── docker-compose.yml
└── login.sln
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Run Locally

**Backend:**
```bash
cd Backend
dotnet run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:5000`.

### Run with Docker

```bash
docker-compose up --build
```

This starts the frontend (port 3000), backend (port 5000), and MongoDB (port 27017).

## API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/auth/signup` | Register a new user      |
| POST   | `/api/auth/login`  | Authenticate a user      |
| GET    | `/api/auth/users`  | List all registered users|
