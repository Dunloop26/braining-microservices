
exports.up = function (knex) {
  return knex.schema.createTable('avatar', function (t) {
    t.integer('id_student').primary();
    t.string('cloth').notNullable();
    t.string('front_hair').notNullable();
    t.string('back_hair').notNullable();
    t.string('head').notNullable();
    t.string('eyes').notNullable();
    t.string('mouth').notNullable();
  });
};


exports.down = function (knex) {
  return knex.schema.dropTable('avatar');
};
