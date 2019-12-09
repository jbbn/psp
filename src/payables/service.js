const addDays = require('date-fns/addDays')
const STATUS = require('./status')
const PAYMENT_METHOD = require('../transactions/payment_method')

const AMOUNT_PERCENT_FOR_DEBIT = 0.97
const AMOUNT_PERCENT_FOR_CREDIT = 0.95
const DAYS_FOR_CREDIT = 30

/**
 * Prepare a payable; it applies the business rules
 * @param {Object} transaction_amount transaction amount
 * @param {Object} transaction_payment_method transaction payment method
 * @param {Object} transaction_id transaction unique identifier
 * @returns {Object} the payable with the business rules applied
 */
module.exports.preparePayable = (
  transaction_amount,
  transaction_payment_method,
  transaction_id
) => {
  if (transaction_payment_method === PAYMENT_METHOD.DEBT_CARD) {
    return {
      amount: transaction_amount * AMOUNT_PERCENT_FOR_DEBIT,
      status: STATUS.PAID,
      payment_date: new Date(),
      transaction_id,
    }
  } else if (transaction_payment_method === PAYMENT_METHOD.CREDIT_CARD) {
    return {
      amount: transaction_amount * AMOUNT_PERCENT_FOR_CREDIT,
      status: STATUS.WAITING_FUNDS,
      payment_date: addDays(new Date(), DAYS_FOR_CREDIT),
      transaction_id,
    }
  }
}
