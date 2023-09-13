const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "notesdb"
});

module.exports = pool;