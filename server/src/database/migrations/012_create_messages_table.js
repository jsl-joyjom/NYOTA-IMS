exports.up = function(knex) {
  return knex.schema.createTable('messages', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.enum('from', ['user', 'admin']).notNullable()
    table.string('subject', 255).notNullable()
    table.text('content').notNullable()
    table.boolean('is_read').defaultTo(false)
    table.timestamp('read_at')
    table.enum('priority', ['low', 'medium', 'high']).defaultTo('medium')
    table.json('attachments').defaultTo('[]')
    table.uuid('reply_to') // For threaded conversations
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['from'])
    table.index(['is_read'])
    table.index(['created_at'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('messages')
}
