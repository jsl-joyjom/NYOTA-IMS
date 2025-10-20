exports.up = function(knex) {
  return knex.schema.createTable('milestone_completions', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.uuid('enrollment_id').references('id').inTable('enrollments').onDelete('CASCADE')
    table.uuid('milestone_id').references('id').inTable('milestones').onDelete('CASCADE')
    table.boolean('is_completed').defaultTo(false)
    table.timestamp('completed_at')
    table.decimal('stipend_amount', 10, 2).defaultTo(0)
    table.text('submission_notes')
    table.json('submission_files').defaultTo('[]')
    table.timestamp('stipend_disbursed_at')
    table.timestamps(true, true)
    
    table.unique(['user_id', 'milestone_id'])
    table.index(['user_id'])
    table.index(['enrollment_id'])
    table.index(['milestone_id'])
    table.index(['is_completed'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('milestone_completions')
}
