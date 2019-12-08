const Joi = require('joi')
const PAYMENT_METHOD = require('./payment_method')

const paymentMethods = [PAYMENT_METHOD.DEBT_CARD, PAYMENT_METHOD.CREDIT_CARD]

module.exports = {
  amount: Joi.number().required(),
  description: Joi.string().required(),
  payment_method: Joi.any()
    .valid(...paymentMethods)
    .required(),
  card_number: Joi.string().required(),
  card_name: Joi.string().required(),
  card_expiration_date: Joi.string().required(),
  card_verification_value: Joi.string().required(),
}
