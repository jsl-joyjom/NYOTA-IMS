exports.up = function(knex) {
  return knex.schema.createTable('milestones', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('course_id').references('id').inTable('courses').onDelete('CASCADE')
    table.string('title', 255).notNullable()
    table.text('description').notNullable()
    table.integer('order').notNullable()
    table.text('instructions')
    table.json('requirements').defaultTo('[]')
    table.decimal('stipend_amount', 10, 2).defaultTo(0)
    table.boolean('is_active').defaultTo(true)
    table.timestamps(true, true)
    
    table.index(['course_id'])
    table.index(['order'])
    table.unique(['course_id', 'order'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('milestones')
}
