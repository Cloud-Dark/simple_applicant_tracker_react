
## README.md

# Simple Applicant Tracker API

Sistem CRUD API sederhana untuk manajemen data applicant (pelamar kerja) menggunakan:
- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Swagger API Documentation

---

## Requirement
- Node.js >= 16.x
- PostgreSQL Database
- NPM

---

## Installasi & Setup Project

### 1. Clone Project
```bash
git clone https://github.com/Cloud-Dark/simple_applicant_tracker_react
cd simple_applicant_tracker_react/backend
```

### 2. Install Dependency
```bash
npm install
```

### 3. Setup .env
Buat file `.env` di root project:
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

## 4. Setup Sequelize
### Generate Database Structure:
```bash
npx sequelize-cli db:migrate
```

### Insert Dummy Data (Minimal 10 Applicant)
```bash
npx sequelize-cli db:seed:all
```
or
```bash
npx test-insert.js
```
---

## 5. Running API
```bash
npm start
```

---

## API Endpoint

| Method | Endpoint | Keterangan |
|--------|-----------|------------|
|GET| /applicants | Get All Applicants (Support Filter)|
|GET| /applicants/:id | Get Applicant by ID |
|POST| /applicants | Create Applicant |
|PUT| /applicants/:id | Update Applicant |
|DELETE| /applicants/:id | Delete Applicant |

---

## Filter Params (GET /applicants)
| Query | Example | Keterangan |
|-------|---------|------------|
|location| ?location=Jakarta|Filter by location|
|role| ?role=Backend|Filter by applied role|
|status| ?status=Pending|Filter by application status|

Contoh:
```
GET /applicants?location=Jakarta&role=Backend&status=Pending
```

---

## API Documentation (Swagger)
Saat project jalan:
```
http://localhost:3000/api-docs
```

---

## Folder Structure
```
.
├── config        (sequelize config)
├── controllers   (logic API)
├── migrations    (db migration)
├── models        (sequelize models)
├── routes        (API routing)
├── seeders       (dummy data)
├── .env          (env config)
├── app.js        (main app express)
└── swagger.js    (swagger setup)
```

---

## Generate Swagger Otomatis
Install:
```bash
npm i swagger-jsdoc swagger-ui-express
```

Setup di `app.js`:
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

## Selesai 🎉
Sekarang API siap digunakan!

---
