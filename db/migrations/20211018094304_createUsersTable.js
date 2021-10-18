exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable("users", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("email").notNullable();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.timestamp('date').defaultTo(knex.fn.now());
        table.unique('username');
        table.unique('email');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};