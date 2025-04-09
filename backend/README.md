# Simple Applicant Tracker API

A simple CRUD API system for managing applicant data using:
- Node.js  
- Express  
- Sequelize ORM  
- PostgreSQL  
- Swagger API Documentation  

---

## Requirements

- Node.js >= 16.x  
- PostgreSQL Database  
- NPM  

---

## Installation & Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup .env

Create a `.env` file in the root directory:

```env
PG_URI=
PG_DB=
PG_HOST=
PG_PORT=
PG_USER=
PG_PASSWORD=
PG_SSLMODE=
```

---

## 3. Setup Sequelize

### Generate Database Structure:

```bash
npx sequelize-cli db:migrate
```

### Insert Dummy Data (Minimum 10 Applicants):

```bash
npx sequelize-cli db:seed:all
```

or

```bash
npx test-insert.js
```

---

## 4. Run the API

```bash
npm start
```

---

## API Endpoints

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | /applicants        | Get all applicants (with filtering)  |
| GET    | /applicants/:id    | Get applicant by ID                  |
| POST   | /applicants        | Create a new applicant               |
| PUT    | /applicants/:id    | Update applicant data                |
| DELETE | /applicants/:id    | Delete applicant                     |

---

## Filter Parameters (GET /applicants)

| Query    | Example                          | Description                  |
|----------|----------------------------------|------------------------------|
| location | ?location=Jakarta               | Filter by location           |
| role     | ?role=Backend                   | Filter by applied role       |
| status   | ?status=Pending                 | Filter by application status |

Example:
```
GET /applicants?location=Jakarta&role=Backend&status=Pending
```

---

## API Documentation (Swagger)

When the project is running:

```
http://localhost:3000/api-docs
```

---

## Folder Structure

```
.
├── config        (Sequelize configuration)
├── controllers   (API logic)
├── migrations    (DB migrations)
├── models        (Sequelize models)
├── routes        (API routes)
├── seeders       (Dummy data)
├── .env          (Environment config)
├── app.js        (Main Express app)
└── swagger.js    (Swagger setup)
```

---

## Generate Swagger Automatically

Install the required packages:

```bash
npm i swagger-jsdoc swagger-ui-express
```

Setup in `app.js`:

```js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Applicant Tracker API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

---

## Done 🎉

The API is now ready to use!

