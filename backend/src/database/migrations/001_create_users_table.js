exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('id_number', 20).unique().notNullable()
    table.string('email', 255).unique().notNullable()
    table.string('phone', 20).notNullable()
    table.string('password_hash').notNullable()
    table.string('first_name', 100).notNullable()
    table.string('last_name', 100).notNullable()
    table.date('date_of_birth').notNullable()
    table.enum('gender', ['male', 'female', 'other']).notNullable()
    table.string('kra_pin', 20).unique().notNullable()
    table.string('residence', 255).notNullable()
    table.text('address').notNullable()
    table.boolean('is_verified').defaultTo(false)
    table.boolean('email_verified').defaultTo(false)
    table.boolean('phone_verified').defaultTo(false)
    table.timestamp('email_verified_at')
    table.timestamp('phone_verified_at')
    table.timestamp('last_login_at')
    table.timestamps(true, true)
    
    table.index(['id_number'])
    table.index(['email'])
    table.index(['phone'])
    table.index(['kra_pin'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
