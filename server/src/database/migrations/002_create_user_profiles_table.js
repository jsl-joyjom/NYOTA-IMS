exports.up = function(knex) {
  return knex.schema.createTable('user_profiles', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.enum('education', ['form4', 'below_form4']).notNullable()
    table.integer('age').notNullable()
    table.boolean('is_pwd').defaultTo(false)
    table.boolean('is_refugee').defaultTo(false)
    table.string('preferred_sector', 100)
    table.text('bio')
    table.string('profile_picture_url')
    table.boolean('profile_completed').defaultTo(false)
    table.timestamps(true, true)
    
    table.unique(['user_id'])
    table.index(['is_pwd'])
    table.index(['is_refugee'])
    table.index(['preferred_sector'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('user_profiles')
}
