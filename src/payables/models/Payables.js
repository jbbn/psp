const objection = require('objection')
const uuid = require('uuid/v4')
const knex = require('../../db/config')
const STATUS = require('../status')

objection.Model.knex(knex)

class Payables extends objection.Model {
  static get tableName() {
    return 'payables'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'status', 'payment_date', 'transaction_id'],
      properties: {
        id: { type: 'uuid' },
        amount: { type: 'number' },
        status: {
          type: 'string',
          enum: [STATUS.PAID, STATUS.WAITING_FUNDS],
        },
        payment_date: { type: 'date' },
        transaction_id: { type: 'uuid' },
      },
    }
  }

  $beforeInsert() {
    this.id = uuid()
  }

  $beforeValidate(jsonSchema) {
    return jsonSchema
  }
}

module.exports = Payables
