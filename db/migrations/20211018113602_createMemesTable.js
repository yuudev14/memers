exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable("memes", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid("user_id").references("id").inTable("users").notNullable();
        table.string("status");
        table.string("media").notNullable();
        table.timestamp('date').defaultTo(knex.fn.now());

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("memes");
};