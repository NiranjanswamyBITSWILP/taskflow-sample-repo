# TaskFlow - Setup Guide

## Overview

TaskFlow is a full-stack task management application showcasing modern web development best practices.

**Stack**: Node.js + Express | React + TypeScript | MongoDB | Docker

## Quick Start

### Option 1: Docker (Recommended)

```bash
docker-compose up -d
```

Access at: http://localhost:3000

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

**Database:**
```bash
docker run -d -p 27017:27017 mongo:7.0
```

## Testing

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Login with your credentials
4. Create, update, and delete tasks
5. Filter by status and priority

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Environment Setup

Create `.env` files from `.env.example`:

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://mongo:27017/taskflow
JWT_SECRET=your_secret_key
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Technology Stack

**Backend**: Express.js, MongoDB, Mongoose, JWT, bcrypt
**Frontend**: React 18, TypeScript, Redux Toolkit, Tailwind CSS
**DevOps**: Docker, Docker Compose

## Stop Services

```bash
docker-compose down
```

## Troubleshooting

- **Port conflicts**: Change PORT in .env
- **MongoDB connection**: Ensure MongoDB is running
- **CORS errors**: Check API_URL in frontend .env

See README.md for detailed documentation.
