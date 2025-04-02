# IMF Gadget API

A secure API for managing IMF gadgets, built with Node.js, Express, and PostgreSQL.

## Features

- Complete gadget inventory management
- Self-destruct sequence for gadgets
- JWT authentication and authorization
- Role-based access control
- Robust error handling

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Gadgets

- `GET /api/gadgets` - Get all gadgets (with optional status filter)
- `GET /api/gadgets/:id` - Get a specific gadget
- `POST /api/gadgets` - Add a new gadget (admin only)
- `PATCH /api/gadgets/:id` - Update a gadget (admin only)
- `DELETE /api/gadgets/:id` - Decommission a gadget (admin only)
- `POST /api/gadgets/:id/self-destruct` - Trigger self-destruct sequence (admin only)

## Installation

1. Clone the repository

```bash
git clone  https://github.com/vishnuu5/imf-gadget-api_task
cd imf-gadget-api
```
2. Install dependency
```bash
npm install
```
3. Create .env file and add this
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=imf_gadgets
DB_USER=postgres
DB_PASSWORD=--------

# JWT Configuration
JWT_SECRET=token
JWT_EXPIRES_IN=1d
```
4. server start
```bash
npm run dev
```
   
## Testing the API

You can test the API using tools like Postman or curl:

1. Register a user:
```bash
POST http://localhost:3000/api/auth/register
  -H "Content-Type: application/json"
  -d '{"username": "admin", "password": "password123", "role": "admin"}'
```

2. Login to get a JWT token:

```bash
 POST http://localhost:3000/api/auth/login
  -H "Content-Type: application/json"
  -d '{"username": "admin", "password": "password123"}'
```

3. Create a gadget (using the token):
```bash
 POST http://localhost:3000/api/gadgets
  -H "Content-Type: application/json" 
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
  -d '{"name": "Explosive Pen", "description": "Looks like a pen, works like a bomb"}'
  ```

4. Get all gadgets:

```bash
 GET http://localhost:3000/api/gadgets
  -H "Authorization: Bearer
```  
