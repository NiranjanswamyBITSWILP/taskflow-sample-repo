# TaskFlow - Full-Stack Task Management Application

A comprehensive full-stack sample application demonstrating modern web development practices with Node.js, Express, React, TypeScript, MongoDB, and Docker. Perfect for learning and demonstration purposes.

## Key Features

- ✅ **User Authentication** - JWT-based authentication with secure token management
- ✅ **Task Management** - Complete CRUD operations with filtering and sorting
- ✅ **Responsive UI** - Modern React components with Tailwind CSS styling
- ✅ **State Management** - Redux Toolkit for predictable state handling
- ✅ **Input Validation** - Both backend (Joi) and frontend (Zod) validation
- ✅ **Type Safety** - Full TypeScript implementation on frontend
- ✅ **Docker Ready** - Complete containerization with Docker Compose
- ✅ **Database Integration** - MongoDB with Mongoose ODM
- ✅ **API Security** - Helmet security headers, CORS support, password hashing with bcrypt
- ✅ **Testing** - Jest and Supertest configuration for backend testing

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: MongoDB 7.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Testing**: Jest, Supertest

### Frontend
- **Library**: React 18
- **Language**: TypeScript 5.2+
- **State Management**: Redux Toolkit
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Validation**: Zod
- **Notifications**: React Hot Toast

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: MongoDB 7.0

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose (optional, for containerized setup)
- MongoDB 5.0+ (only needed for local non-Docker setup)

### Local Development

#### Step 1: Clone/Extract Repository
```bash
cd taskflow-sample-repo
```

#### Step 2: Start Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```
Backend runs on: **http://localhost:5000**

#### Step 3: Start Frontend (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
Frontend runs on: **http://localhost:3000**

#### Step 4: Start Database (if not using Docker)
```bash
docker run -d -p 27017:27017 mongo:7.0
```

### Docker Setup (Recommended for Demo)

```bash
docker-compose up -d
```

This starts all three services:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

To view logs:
```bash
docker-compose logs -f
```

To stop:
```bash
docker-compose down
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Tasks
- `GET /api/tasks` - List all tasks (with filters and pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment to task
- `DELETE /api/tasks/:id/comments/:commentId` - Delete comment

## Project Structure

```
.
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth, error handling
│   │   ├── utils/             # Helpers, validators
│   │   └── server.js          # Express app setup
│   ├── tests/                 # Backend tests
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   └── Dockerfile             # Container config
├── frontend/                   # React + TypeScript app
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── redux/             # State management
│   │   ├── services/          # API calls
│   │   ├── types/             # TypeScript types
│   │   ├── hooks/             # Custom hooks
│   │   ├── App.tsx            # Main component
│   │   └── index.css          # Tailwind setup
│   ├── public/                # Static files
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── Dockerfile             # Container config
├── docker-compose.yml         # Multi-container setup
├── .gitignore                 # Git configuration
└── README.md                  # This file
```

## Environment Setup

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://mongo:27017/taskflow
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running Tests

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## Development Workflow

### Making Changes

1. **Backend Changes**
   - Edit files in `backend/src/`
   - Server auto-reloads with nodemon
   - Run tests: `npm test`

2. **Frontend Changes**
   - Edit files in `frontend/src/`
   - App auto-reloads with React's dev server
   - Run tests: `npm test`

3. **Database Schema Changes**
   - Update Mongoose models in `backend/src/models/`
   - No migrations needed for MongoDB

### Creating a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish all requirements",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

### Authenticating Requests
1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login` (returns access token)
3. Add to request headers: `Authorization: Bearer {access_token}`

## Common Issues

### MongoDB Connection Error
- **Issue**: "connect ECONNREFUSED"
- **Solution**: Ensure MongoDB is running (`docker run -d -p 27017:27017 mongo:7.0`)

### Port Already in Use
- **Issue**: "listen EADDRINUSE :::5000" or :::3000
- **Solution**: Kill process or change PORT in .env

### CORS Error
- **Issue**: "Access to XMLHttpRequest has been blocked by CORS policy"
- **Solution**: Ensure backend is running and REACT_APP_API_URL is correct in frontend .env

### Node Modules Issues
- **Solution**: Delete node_modules and package-lock.json, then run `npm install` again

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation in the project

## Acknowledgments

Built as a demonstration of modern full-stack development practices with Node.js, React, MongoDB, and Docker.
