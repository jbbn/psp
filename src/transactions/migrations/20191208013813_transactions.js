exports.up = knex =>
  knex.schema.createTable('transactions', table => {
    table.uuid('id').primary()
    table.integer('amount')
    table.string('description')
    table.enu('payment_method', ['debit_card', 'credit_card'])
    table.string('card_number_ending', 4)
    table.string('card_name', 26)
    table.string('card_expiration_date', 6)
    table
      .timestamp('created_at', true)
      .notNullable()
      .defaultTo(knex.fn.now())
    table
      .timestamp('updated_at', true)
      .notNullable()
      .defaultTo(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTable('transactions')
