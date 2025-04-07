'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config(); // load .env

const db = {}; // HARUS ADA DULUAN

// koneksi database dari .env
const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // untuk SSL dari aiven
      },
    },
    logging: false, // matikan log query (optional)
  }
);

// define ke db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// load semua model manual
db.Applicant = require('./applicant')(sequelize, Sequelize.DataTypes);

module.exports = db;
