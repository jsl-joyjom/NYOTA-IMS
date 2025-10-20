exports.up = function(knex) {
  return knex.schema.createTable('courses', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('title', 255).notNullable()
    table.text('description').notNullable()
    table.string('sector', 100).notNullable()
    table.integer('duration_weeks').notNullable()
    table.json('prerequisites').defaultTo('[]')
    table.text('learning_objectives')
    table.text('course_outline')
    table.boolean('is_active').defaultTo(true)
    table.integer('max_enrollments')
    table.decimal('completion_threshold', 3, 2).defaultTo(0.80) // 80% required to pass
    table.timestamps(true, true)
    
    table.index(['sector'])
    table.index(['is_active'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('courses')
}
