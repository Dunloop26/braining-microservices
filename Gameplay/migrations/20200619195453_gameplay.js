
exports.up = function (knex) {
    return knex.schema.createTable('yields', function (t) {
      t.integer('id_student').primary();
      t.integer('goal_achieved').notNullable().defaultTo(0);
      t.integer('goal_not_achieved').notNullable().defaultTo(0);
      t.integer('rounds_won').notNullable().defaultTo(0);
      t.integer('rounds_losses').notNullable().defaultTo(0);
      t.integer('right_mathematics').notNullable().defaultTo(0);
      t.integer('wrong_mathematics').notNullable().defaultTo(0);
      t.integer('right_correct_mathematics').notNullable().defaultTo(0);
      t.integer('right_less_correct_mathematics').notNullable().defaultTo(0);
      t.integer('right_correct_less_correct_mathematics').notNullable().defaultTo(0);
      t.integer('right_mathematics_primes').notNullable().defaultTo(0);
      t.integer('wrong_mathematics_primes').notNullable().defaultTo(0);
      t.integer('right_mathematics_fractions').notNullable().defaultTo(0);
      t.integer('wrong_mathematics_fractions').notNullable().defaultTo(0);
      t.integer('right_mathematics_triangles').notNullable().defaultTo(0);
      t.integer('wrong_mathematics_triangles').notNullable().defaultTo(0);
      t.integer('right_sciences').notNullable().defaultTo(0);
      t.integer('wrong_sciences').notNullable().defaultTo(0);
      t.integer('right_correct_sciences').notNullable().defaultTo(0);
      t.integer('right_less_correct_sciences').notNullable().defaultTo(0);
      t.integer('right_correct_less_correct_sciences').notNullable().defaultTo(0);
      t.integer('right_sciences_cell').notNullable().defaultTo(0);
      t.integer('wrong_sciences_cell').notNullable().defaultTo(0);
      t.integer('right_sciences_anatomy').notNullable().defaultTo(0);
      t.integer('wrong_sciences_anatomy').notNullable().defaultTo(0);
      t.integer('right_sciences_mammals').notNullable().defaultTo(0);
      t.integer('wrong_sciences_mammals').notNullable().defaultTo(0);
      t.integer('right_spanish').notNullable().defaultTo(0);
      t.integer('wrong_spanish').notNullable().defaultTo(0);
      t.integer('right_correct_spanish').notNullable().defaultTo(0);
      t.integer('right_less_correct_spanish').notNullable().defaultTo(0);
      t.integer('right_correct_less_correct_spanish').notNullable().defaultTo(0);
      t.integer('right_spanish_analisys').notNullable().defaultTo(0);
      t.integer('wrong_spanish_analisys').notNullable().defaultTo(0);
      t.integer('right_spanish_comprehension').notNullable().defaultTo(0);
      t.integer('wrong_spanish_comprehension').notNullable().defaultTo(0);
      t.integer('right_spanish_redaction').notNullable().defaultTo(0);
      t.integer('wrong_spanish_redaction').notNullable().defaultTo(0);
      t.integer('right_english').notNullable().defaultTo(0);
      t.integer('wrong_english').notNullable().defaultTo(0);
      t.integer('right_correct_english').notNullable().defaultTo(0);
      t.integer('right_less_correct_english').notNullable().defaultTo(0);
      t.integer('right_correct_less_correct_english').notNullable().defaultTo(0);
      t.integer('right_english_verbs').notNullable().defaultTo(0);
      t.integer('wrong_english_verbs').notNullable().defaultTo(0);
      t.integer('right_english_articles').notNullable().defaultTo(0);
      t.integer('wrong_english_articles').notNullable().defaultTo(0);
      t.integer('right_english_sustantives').notNullable().defaultTo(0);
      t.integer('wrong_english_sustantives').notNullable().defaultTo(0);
    }).createTable('scores', function (t) {
      t.integer('id_student').primary();
      t.integer('experience').notNullable().defaultTo(0);
      t.integer('points_buy').notNullable().defaultTo(0);
    }).createTable('weekly', function (t) {
      t.integer('id_student').primary().defaultTo(0);
      t.integer('points_goal').notNullable().defaultTo(0);
      t.integer('responsies').notNullable().defaultTo(0);
    })
  };
  
  
  exports.down = function (knex) {
    return knex.schema.dropTable('yields')
      .dropTable('scores')
      .dropTable('weekly');
  };
  

