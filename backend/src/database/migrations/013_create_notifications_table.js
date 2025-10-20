exports.up = function(knex) {
  return knex.schema.createTable('notifications', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.enum('type', ['training', 'savings', 'funding', 'deadline', 'general']).notNullable()
    table.string('title', 255).notNullable()
    table.text('message').notNullable()
    table.boolean('is_read').defaultTo(false)
    table.timestamp('read_at')
    table.json('data').defaultTo('{}') // Additional notification data
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['type'])
    table.index(['is_read'])
    table.index(['created_at'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('notifications')
}
