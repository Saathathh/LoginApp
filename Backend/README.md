# Backend — LoginApp API

ASP.NET Core Web API for user authentication, built with .NET 10 and MongoDB.

## Tech Stack

- **.NET 10** — Minimal API with controllers
- **MongoDB** — Database via `MongoDB.Driver`
- **BCrypt** — Password hashing via `BCrypt.Net-Next`

## API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/signup`   | Register a new user      |
| POST   | `/api/auth/login`    | Authenticate a user      |
| GET    | `/api/auth/users`    | List all registered users|

## Project Structure

```
Backend/
├── Controllers/
│   └── AuthController.cs    # Auth endpoints (signup, login, users)
├── Data/
│   └── AppDbContext.cs       # MongoDB service
├── DTOs/
│   └── AuthDtos.cs           # Request DTOs
├── Models/
│   └── User.cs               # User model
├── Program.cs                # App entry point & configuration
├── appsettings.json          # MongoDB connection config
└── Dockerfile
```

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [MongoDB](https://www.mongodb.com/try/download/community) running on `localhost:27017`

### Run

```bash
cd Backend
dotnet run
```

The API starts on `http://localhost:5000` by default.

### Configuration

MongoDB connection is configured in `appsettings.json`:

```json
{
  "MongoDB": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "LoginApp"
  }
}
```

## Docker

```bash
docker build -t loginapp-backend .
docker run -p 5000:5000 loginapp-backend
```

Or use `docker-compose.yml` from the project root to run the full stack.
