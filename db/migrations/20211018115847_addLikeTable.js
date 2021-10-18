exports.up = function(knex) {
    return knex.schema.createTable("laughs", (table) => {
        table.uuid("user_id").references("id").inTable("users");
        table.uuid("meme_id").references("id").inTable("memes");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("laughs");
};