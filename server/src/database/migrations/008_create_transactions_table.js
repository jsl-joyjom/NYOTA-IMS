exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('savings_account_id').references('id').inTable('savings_accounts').onDelete('CASCADE')
    table.enum('type', ['stipend', 'savings', 'grant', 'withdrawal', 'interest']).notNullable()
    table.decimal('amount', 12, 2).notNullable()
    table.text('description').notNullable()
    table.string('reference', 100).unique()
    table.string('external_reference', 100) // For mobile money/bank references
    table.enum('status', ['pending', 'completed', 'failed', 'cancelled']).defaultTo('pending')
    table.timestamp('processed_at')
    table.json('metadata').defaultTo('{}') // Additional transaction data
    table.timestamps(true, true)
    
    table.index(['savings_account_id'])
    table.index(['type'])
    table.index(['status'])
    table.index(['reference'])
    table.index(['created_at'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('transactions')
}
