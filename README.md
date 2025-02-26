<p align="center">
  <a href="https://github.com/Kimbohy/authentication-with-nestJs" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Authentication with NestJS

A robust JWT-based authentication system built with NestJS, Prisma, PostgreSQL, and Docker. This project implements a secure and scalable authentication solution that can be used as a foundation for any web application.

## Features

- **Complete JWT Authentication Flow**:

  - User registration & login with email/password
  - Access token and refresh token strategy
  - Token refresh mechanism
  - Secure logout functionality
  - Password hashing with bcrypt

- **Security Best Practices**:
  - Password hashing using bcrypt
  - Short-lived access tokens (15 min)
  - Refresh token rotation
  - Token blacklisting on logout
  - Secure storage of refresh tokens

## Tech Stack

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose

## Project Setup

### Prerequisites

- Node.js (v14+)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Kimbohy/authentication-with-nestJs.git
cd authentication-with-nestJs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the application with Docker:

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

## Database Configuration

The PostgreSQL database is configured in Docker Compose and connected through Prisma ORM.

### Prisma Schema

The Prisma schema includes a User model with fields for:

- id (unique identifier)
- email (unique)
- hash (password hash)
- hashedRt (refresh token hash)
- name
- role
- avatar
- timestamps

## Authentication API Endpoints

### Registration

```
POST /auth/local/signup
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```
POST /auth/local/signin
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

```
POST /auth/logout
```

Authorization: Bearer token (access token)

### Refresh Token

```
POST /auth/refresh
```

Authorization: Bearer token (refresh token)

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## JWT Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. Server generates JWT access token (15 min expiry) and refresh token (7 days expiry)
4. Client stores tokens and sends access token with each request
5. Server validates token on protected routes
6. When access token expires, client uses refresh token to get a new pair of tokens
7. On logout, refresh token is invalidated on the server

## Environment Variables

```
# Database
DATABASE_URL="postgresql://postgres:password@postgres:5432/auth_db?schema=public"
```

## Authentication Implementation Details

- **Two JWT Strategies**:
  - 'jwt' for access tokens
  - 'jwt-refresh' for refresh tokens
- **Password Security**: All passwords are hashed using bcrypt
- **Token Storage**: Refresh tokens are stored as hashes in the database
- **Access Control**: Global guard with Public decorator for unprotected routes
- **Developer Convenience**: Custom decorators for extracting user ID and data from JWT

## Development Commands

```bash
# Start development server
npm run start:dev

# Run tests
npm run test

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```


## Future Enhancements

- Email verification
- Social login integration (Google, GitHub)
- Multi-factor authentication
- Role-based access control
- Rate limiting for auth endpoints

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

- [Kimbohy](https://kimbohy.vercel.app) - Full Stack Developer
- LinkedIn: [Lovatiana Rabarijaona](https://www.linkedin.com/in/lovatiana-rabarijaona/)
- GitHub: [Kimbohy](https://github.com/Kimbohy)

## License

This project is [MIT licensed](LICENSE).
