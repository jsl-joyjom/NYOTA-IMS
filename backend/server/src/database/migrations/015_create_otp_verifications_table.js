exports.up = function(knex) {
  return knex.schema.createTable('otp_verifications', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('email', 255)
    table.string('phone', 20)
    table.string('otp_code', 10).notNullable()
    table.enum('type', ['email', 'phone', 'both']).notNullable()
    table.enum('purpose', ['registration', 'login', 'password_reset']).notNullable()
    table.boolean('is_verified').defaultTo(false)
    table.timestamp('verified_at')
    table.timestamp('expires_at').notNullable()
    table.integer('attempts').defaultTo(0)
    table.timestamps(true, true)
    
    table.index(['email'])
    table.index(['phone'])
    table.index(['otp_code'])
    table.index(['expires_at'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('otp_verifications')
}
