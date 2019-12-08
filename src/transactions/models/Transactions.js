const objection = require('objection')
const uuid = require('uuid/v4')
const knex = require('../../db/config')
const PAYMENT_METHOD = require('../payment_method')

objection.Model.knex(knex)

class Transactions extends objection.Model {
  static get tableName() {
    return 'transactions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'amount',
        'description',
        'payment_method',
        'card_number_ending',
        'card_name',
        'card_expiration_date',
      ],
      properties: {
        id: { type: 'uuid' },

        amount: { type: 'number' },

        description: { type: 'string' },

        payment_method: {
          type: 'string',
          enum: [PAYMENT_METHOD.DEBT_CARD, PAYMENT_METHOD.CREDIT_CARD],
        },

        card_number_ending: {
          type: 'string',
          minLength: 4,
          maxLength: 4,
        },

        card_name: {
          type: 'string',
          minLength: 1,
          maxLength: 26,
        },

        card_expiration_date: {
          type: 'string',
          minLength: 6,
          maxLength: 6,
        },
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

module.exports = Transactions
