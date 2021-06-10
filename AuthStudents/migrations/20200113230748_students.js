
exports.up = function (knex) {
  return knex.schema.createTable('students', function (t) {
    t.increments('id_student').primary();
    t.string('student').unique().notNullable();
    t.string('code_school', [10]).notNullable();
    t.string('pass').notNullable();
    t.string('name').notNullable();
    t.string('last_name').notNullable();
    t.string('gender', 1).notNullable();
    t.string('type_document', 2).notNullable();
    t.string('document', [50]).unique().notNullable();
    t.date('birthdate').notNullable();
  });
};


exports.down = function (knex) {
  return knex.schema.dropTable('students');
};
