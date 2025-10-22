exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('title', 255).notNullable()
    table.text('description').notNullable()
    table.string('category', 100).notNullable()
    table.decimal('price', 12, 2).notNullable()
    table.json('images').defaultTo('[]')
    table.boolean('is_active').defaultTo(true)
    table.integer('views').defaultTo(0)
    table.integer('likes').defaultTo(0)
    table.string('location', 255)
    table.json('specifications').defaultTo('{}')
    table.integer('stock_quantity')
    table.string('condition', 50) // new, used, refurbished
    table.timestamps(true, true)
    
    table.index(['user_id'])
    table.index(['category'])
    table.index(['is_active'])
    table.index(['location'])
    table.index(['price'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('products')
}
