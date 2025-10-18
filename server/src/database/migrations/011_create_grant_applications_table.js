exports.up = function(knex) {
  return knex.schema.createTable('grant_applications', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.uuid('business_idea_id').references('id').inTable('business_ideas').onDelete('CASCADE')
    table.decimal('amount', 12, 2).notNullable()
    table.integer('phase').notNullable() // 1 or 2
    table.enum('status', ['pending', 'approved', 'disbursed', 'rejected']).defaultTo('pending')
    table.timestamp('submitted_at').defaultTo(knex.fn.now())
    table.timestamp('approved_at')
    table.timestamp('disbursed_at')
    table.uuid('approved_by') // Admin user who approved
    table.text('approval_notes')
    table.boolean('follow_up_required').defaultTo(false)
    table.timestamp('follow_up_due_date')
    table.json('follow_up_data').defaultTo('{}')
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['business_idea_id'])
    table.index(['phase'])
    table.index(['status'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('grant_applications')
}
