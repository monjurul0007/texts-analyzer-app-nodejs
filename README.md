# Texts Analyzer App

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/monjurul0007/texts-analyzer-app-nodejs.git
cd texts-analyzer-app-nodejs
```

### 2. Environment Configuration

Create a `.env` file in the project root with necessary environment variables. Example:

```
NODE_ENV=development
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_DB=textsDb
POSTGRES_HOST=127.0.0.1

REDIS_HOST=redis
REDIS_PORT=6379
```

### 3. Build and Run with Docker

```bash
docker-compose up --build
```

### 4. Access the Application

- Server will be running on `http://localhost:3000`
- Postgres database on port 5432
- Redis on port 6379

### Available Commands

- Start development server: `docker-compose up --build`
- Stop containers: `docker-compose down`

### Database Migrations

Run migrations inside the Docker container:

```bash
docker-compose exec server npm run db:migrate:up
```

### Testing

Run tests inside the Docker container:

```bash
docker-compose exec server npm test
```

## Project Structure

- `server`: Node.js Express application
- `postgres`: PostgreSQL database
- `redis`: Redis cache service

## Technologies

- Node.js
- TypeScript
- Express
- Sequelize
- PostgreSQL
- Redis
- Docker
