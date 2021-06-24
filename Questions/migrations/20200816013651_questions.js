
exports.up = function (knex) {
  return knex.schema.createTable('questions', function (t) {
    t.increments('id_question').primary();
    t.string('area').notNullable();
    t.string('question').notNullable();
    t.string('image');
    t.string('topic').notNullable();
    t.string('example').notNullable();
    t.string('image_example');
    t.string('option1').notNullable();
    t.string('option2').notNullable();
    t.string('option3').notNullable();
    t.string('option4').notNullable();
    t.string('correct').notNullable();
    t.string('less_correct').notNullable();
  })
};


exports.down = async function (knex) {
  return knex.schema.dropTable('questions')
};
