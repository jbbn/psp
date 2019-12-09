const Transactions = require('./models/Transactions')
const { createPayable } = require('../payables/controller')

/**
 * Get all transactions in the database
 * @returns {Array} Transactions
 */
module.exports.getTransactions = async () => {
  const transactions = await Transactions.query().select()
  return transactions
}

/**
 * Create a new Transaction in the database
 * @param {Object} incommingTransaction The incomming transaction object
 * @returns {Object} The created transaction
 */
module.exports.createTransaction = async (incommingTransaction = {}) => {
  // TODO(jbbn): call a Validate Card Service

  const card_number_ending = incommingTransaction.card_number
    ? incommingTransaction.card_number.slice(-4)
    : ''
  const transactionToBeSaved = {
    ...incommingTransaction,
    card_number_ending,
  }

  // the Card Verification Value should not be persisted
  delete transactionToBeSaved.card_verification_value

  // the Card Number should not be persisted
  delete transactionToBeSaved.card_number

  const transaction = await Transactions.query().insert(transactionToBeSaved)

  // create the payable for this transaction
  const payable = await createPayable(
    transaction.amount,
    transaction.payment_method,
    transaction.id
  )

  return transaction
}
