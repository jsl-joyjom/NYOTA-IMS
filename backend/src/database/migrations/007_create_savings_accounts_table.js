exports.up = function(knex) {
  return knex.schema.createTable('savings_accounts', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.decimal('balance', 12, 2).defaultTo(0)
    table.decimal('monthly_target', 10, 2).defaultTo(2000)
    table.decimal('total_saved', 12, 2).defaultTo(0)
    table.string('account_number', 50).unique()
    table.string('bank_name', 100)
    table.string('branch_code', 20)
    table.boolean('is_active').defaultTo(true)
    table.timestamps(true, true)
    
    table.unique(['user_id'])
    table.index(['user_id'])
    table.index(['account_number'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('savings_accounts')
}
