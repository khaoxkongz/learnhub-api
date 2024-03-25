# LearnHub API

LearnHub API is a backend service that provides functionality for managing user accounts, authentication, and content (such as articles, tutorials, or learning materials). It is built using TypeScript and follows a clean architecture design.

## Features

- User registration and authentication (login, logout)
- Retrieving user information
- Creating, reading, updating, and deleting content
- Fetching all available content

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Database**: PostgreSQL (using Prisma ORM)
- **Caching**: Redis (for blacklisting JWT tokens)
- **Authentication**: JSON Web Tokens (JWT)
- **API Framework**: Express.js

## Project Structure

The project follows a clean architecture pattern, separating concerns into different layers:

- **API Layer**: Handles HTTP requests and responses, routing, and middleware (auth, validation, etc.).
- **Domain Layer**: Contains the core business logic, entities, use cases, and interfaces.
- **Data Layer**: Implements data access and persistence (database and cache interactions).

The main directories are:

- `src/api`: API layer (routes, handlers, DTOs, etc.)
- `src/data`: Data layer (data sources, models, and data access implementations)
- `src/domain`: Domain layer (entities, use cases, repositories, and interfaces)

## Routes

The API provides the following routes:

### Authentication Routes (`/api/auth`)

- `POST /login`: Authenticate a user and obtain a JWT token.
- `POST /logout`: Invalidate a JWT token and log out the user.
- `GET /me`: Retrieve the authenticated user's personal information.

### User Routes (`/api/users`)

- `POST /register`: Register a new user account.
- `GET /:username`: Retrieve a user's public information by username.

### Content Routes (`/api/content`)

- `GET /`: Fetch all available content.
- `GET /:id`: Retrieve a specific content item by ID.
- `POST /` (authenticated): Create a new content item.
- `PATCH /:id` (authenticated): Update an existing content item by ID.
- `DELETE /:id` (authenticated): Delete a content item by ID.

## Environment Variables

The project requires the following environment variables to be set:

```shell
DATABASE_URL="postgresql://HOSTNAME:PASOWORD@localhost:5432/postgres?schema=public"
REDIS_URL="redis://localhost:6379"
AUTH_SECRET="YOUR_AUTH_SECRET"
```

These variables can be set in a .env file in the project root directory.

## Getting Started

1. Install dependencies: `pnpm install`
2. Set up the database and environment variables
3. Before start the server run this command: `pnpm build`
3. After that start the server: `pnpm start`

## Contributing

Contributions are welcome! Please follow the contributing guidelines and code of conduct.

## License

This project is licensed under the [MIT License](LICENSE).
