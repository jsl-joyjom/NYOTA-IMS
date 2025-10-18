exports.up = function(knex) {
  return knex.schema.createTable('business_ideas', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('title', 255).notNullable()
    table.text('description').notNullable()
    table.string('sector', 100).notNullable()
    table.text('target_market').notNullable()
    table.decimal('funding_required', 12, 2).notNullable()
    table.enum('status', ['draft', 'submitted', 'under_review', 'approved', 'rejected']).defaultTo('draft')
    table.timestamp('submitted_at')
    table.timestamp('reviewed_at')
    table.uuid('reviewed_by') // Admin user who reviewed
    table.text('review_notes')
    table.json('business_plan').defaultTo('{}')
    table.json('financial_projections').defaultTo('{}')
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['sector'])
    table.index(['status'])
    table.index(['submitted_at'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('business_ideas')
}
