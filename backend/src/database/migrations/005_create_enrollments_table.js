exports.up = function(knex) {
  return knex.schema.createTable('enrollments', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE')
    table.enum('status', ['enrolled', 'in_progress', 'completed', 'dropped']).defaultTo('enrolled')
    table.decimal('progress', 5, 2).defaultTo(0) // percentage
    table.timestamp('enrolled_at').defaultTo(knex.fn.now())
    table.timestamp('started_at')
    table.timestamp('completed_at')
    table.decimal('total_stipend_earned', 10, 2).defaultTo(0)
    table.text('completion_notes')
    table.timestamps(true, true)
    
    table.unique(['user_id', 'course_id'])
    table.index(['user_id'])
    table.index(['course_id'])
    table.index(['status'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('enrollments')
}
