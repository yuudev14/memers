require("dotenv").config();

const knex = require("knex")({
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    },
    searchPath: "public",
});

module.exports = knex;