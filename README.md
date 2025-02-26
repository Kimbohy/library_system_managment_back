<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Library Management System - Authentication API

A robust JWT-based authentication system built with NestJS, Prisma, PostgreSQL, and Docker.

## Tech Stack

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose

## Authentication System Overview

This project implements a complete JWT authentication flow with:

- User registration & login with email/password
- Access token and refresh token strategy
- Token refresh mechanism
- Secure logout functionality
- Password hashing with bcrypt

## Project Setup

### Prerequisites

- Node.js (v14+)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd library_system_managment_back
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
DATABASE_URL="postgresql://postgres:password@postgres:5432/library_db?schema=public"

# JWT
JWT_ACCESS_SECRET=at-secret
JWT_REFRESH_SECRET=rt-secret
```

## Authentication Implementation Details

- Two JWT strategies: 'jwt' (access token) and 'jwt-refresh' (refresh token)
- Passwords are hashed using bcrypt
- Refresh tokens are stored as hashes in the database
- Global guard with Public decorator for unprotected routes
- Custom decorators for extracting user ID and data from JWT

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

## Security Best Practices

- Passwords are hashed using bcrypt
- JWT tokens have short expiration times (15 min for access token)
- Refresh tokens are stored as hashes in the database
- Automatic invalidation of refresh tokens after use

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
