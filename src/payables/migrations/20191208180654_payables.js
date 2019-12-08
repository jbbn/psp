const STATUS = require('../status')

exports.up = knex =>
  knex.schema.createTable('payables', table => {
    table.uuid('id').primary()
    table.integer('amount')
    table.enu('status', [STATUS.PAID, STATUS.WAITING_FUNDS])
    table.timestamp('payment_date', true)
    table.uuid('transaction_id')
    table
      .timestamp('created_at', true)
      .notNullable()
      .defaultTo(knex.fn.now())
    table
      .timestamp('updated_at', true)
      .notNullable()
      .defaultTo(knex.fn.now())

    table
      .foreign('transaction_id')
      .references('id')
      .inTable('transactions')
  })

exports.down = knex => knex.schema.dropTable('payables')
