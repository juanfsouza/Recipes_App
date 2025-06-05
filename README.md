<div align="center">
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  
## Challenger Recipes App

</div>

### Run Project Screen

![Screenshot_4](https://github.com/user-attachments/assets/985c361d-7f08-4476-9d25-94ba2aea12df)
![Screenshot_5](https://github.com/user-attachments/assets/98437b90-caeb-49dc-8eeb-85f096c1c34a)
![Screenshot_6](https://github.com/user-attachments/assets/519b7fa0-bb18-4416-bed0-483e28694ba3)
![Screenshot_7](https://github.com/user-attachments/assets/403197b3-e3a3-48f8-8900-aff600ad37ae)
![Screenshot_8](https://github.com/user-attachments/assets/99525e4a-5990-465e-adb7-40a9e15d1888)


### Recipes App Backend

This is the backend API for the Recipes App, built with **NestJS**, **Prisma**, and integrated with **Supabase** for database management. It provides a RESTful API to manage recipes, including CRUD operations.

### Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

### Overview
The Recipes App Backend is a scalable API designed to handle recipe data, including titles, descriptions, ingredients, and timestamps. It uses PostgreSQL (via Supabase) as the database and Prisma as the ORM for database interactions. The API is deployed on Render and can be integrated with a frontend application.

### Features
- Create, read, update, and delete (CRUD) recipes.
- Data validation using NestJS pipes.
- CORS support for frontend integration.
- Prisma migrations for database schema management.

### Prerequisites
- Node.js (version 22.14.0 or later)
- PNPM (version 8.x or later)
- Git
- A Supabase account for database hosting
- Render account for deployment (optional)

### Installation
1. Clone & Start the project:
   ```bash
   git clone https://github.com/juanfsouza/Recipes_App.git
   cd Recipes_App
   pnpm install
   pnpm run start:dev


Install dependencies using PNPM:pnpm install

Configuration
Environment Variables
Create a .env file in the root directory with the following variables:
DATABASE_URL=postgresql://postgres:your-supabase-password@db.supabase.co:5432/postgres?schema=public
DIRECT_URL=postgresql://postgres:your-supabase-password@db.supabase.co:5432/postgres?schema=public
PORT=3000

Replace your-supabase-password with the password from your Supabase project (found in Settings > Database).
DATABASE_URL and DIRECT_URL should match your Supabase instance details.

Prisma Schema
The database schema is defined in prisma/schema.prisma. The current model includes:

Recipe: Contains id, title, description, ingredients, createdAt, and updatedAt.

### API Endpoints
All endpoints are prefixed with /recipes. The base URL for the deployed API is https://recipes-app-jaez.onrender.com.

### GET /recipes

```bash
  Description: Retrieve all recipes.
  Method: GET
  Response:[
    {
      "id": "uuid-v4",
      "title": "Bolo de Cenoura",
      "description": "Delicioso bolo caseiro",
      "ingredients": ["cenoura", "farinha", "açúcar"],
      "createdAt": "2025-06-04T21:00:00Z",
      "updatedAt": "2025-06-04T21:00:00Z"
    }
  ]
```

Status Codes:
200: Success
500: Server error

### POST /recipes

```bash
  Description: Create a new recipe.
  Method: POST
  Request Body:{
    "title": "Bolo de Cenoura",
    "description": "Delicioso bolo caseiro",
    "ingredients": ["cenoura", "farinha", "açúcar"]
  }
  
  
  Response:{
    "id": "uuid-v4",
    "title": "Bolo de Cenoura",
    "description": "Delicioso bolo caseiro",
    "ingredients": ["cenoura", "farinha", "açúcar"],
    "createdAt": "2025-06-04T21:00:00Z",
    "updatedAt": "2025-06-04T21:00:00Z"
  }
```

Status Codes:
201: Created
400: Invalid input
500: Server error

### PUT /recipes/:id

```bash
  Description: Update an existing recipe.
  Method: PUT
  Request Body:{
    "title": "Bolo de Cenoura Atualizado",
    "description": "Versão aprimorada do bolo"
  }
```

Response: Same as GET /recipes/:id
Status Codes:
200: Success
400: Invalid input
404: Recipe not found
500: Server error


### DELETE /recipes/:id

Description: Delete a recipe.
Method: DELETE
Response: No content
Status Codes:
204: No content
404: Recipe not found
500: Server error

Running the Application

Ensure the .env file is configured.
Apply database migrations:npx prisma migrate deploy


Start the development server:pnpm run start:dev

The API will be available at http://localhost:3000.

Deployment
The backend is deployed on Render. To redeploy:

Push changes to the main branch on GitHub.
Trigger a manual deploy on Render's dashboard.
Ensure environment variables (DATABASE_URL, DIRECT_URL) are set in Render's environment settings.

Dependencies

@nestjs/common: ^11.1.2
@nestjs/core: ^11.1.2
@nestjs/platform-express: ^11.0.1
@prisma/client: ^6.9.0
prisma: ^6.9.0
cors: ^2.8.5
uuid: ^11.1.0



