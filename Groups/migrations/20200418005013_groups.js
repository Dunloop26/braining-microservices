
exports.up = function (knex) {
  return knex.schema.createTable('groups', function (t) {
    t.integer('id_teacher').primary();
    t.string('group').notNullable();
    t.integer('grade').notNullable();
    t.string('modality').notNullable();
    t.integer('goal').notNullable();
    t.string('days_goal').notNullable();
    t.string('recipients_report').notNullable();
  }).createTable('groups_students', function (t) {
    t.integer('id_student').primary();
    t.string('group').notNullable();
    t.string('id_teacher').notNullable();
  });
};


exports.down = async function (knex) {
  return knex.schema.dropTable('groups').
    dropTable('groups_students');
};
