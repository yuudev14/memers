exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable("comments", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid("meme_id").references("id").inTable("memes").onDelete("CASCADE").notNullable();
        table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE").notNullable();
        table.timestamp("date").defaultTo(knex.fn.now());
        table.string("comment").notNullable();
    });

};

exports.down = function(knex) {
    return knex.schema.dropTable("comments");

};