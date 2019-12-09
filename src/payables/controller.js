const Payables = require('./models/Payables')
const { preparePayable } = require('./service')

const STATUS = require('./status')

/**
 * Get total funds for payables
 * @returns {Object} Returns the available and the waiting funds
 */
module.exports.getFundsTotals = async () => {
  const totals = await Payables.query()
    .select('status')
    .sum('amount as total')
    .groupBy('status')

  const funds = totals.reduce(
    (acc, { status, total }) => ({ ...acc, [status]: total }),
    {}
  )

  return {
    available: funds[STATUS.PAID],
    waiting_funds: funds[STATUS.WAITING_FUNDS],
  }
}

/**
 * Create a payable
 * @param {Object} transaction_amount transaction amount
 * @param {Object} transaction_payment_method transaction payment method
 * @param {Object} transaction_id transaction unique identifier
 * @returns {Object} the payable created
 */
module.exports.createPayable = async (
  transaction_amount,
  transaction_payment_method,
  transaction_id
) => {
  let payableToBeSaved = preparePayable(
    transaction_amount,
    transaction_payment_method,
    transaction_id
  )

  const payable = await Payables.query().insert(payableToBeSaved)

  return payable
}
