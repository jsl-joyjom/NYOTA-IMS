exports.up = function(knex) {
  return knex.schema.createTable('aptitude_tests', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.integer('score').notNullable()
    table.integer('max_score').notNullable()
    table.decimal('percentage', 5, 2).notNullable()
    table.json('answers').notNullable() // User's answers
    table.json('results').notNullable() // Detailed results by category
    table.timestamp('completed_at').defaultTo(knex.fn.now())
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['completed_at'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('aptitude_tests')
}
