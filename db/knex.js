require("dotenv").config();

const knex = require("knex")({
    client: 'pg',
    connection: process.env.DATABASE_URL ||
        `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:5432/memers`,
    searchPath: "public",
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized } : '',
});

module.exports = knex;