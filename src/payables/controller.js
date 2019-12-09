const Payables = require('./models/Payables')

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
    available: funds.paid,
    waiting_funds: funds.waiting_funds,
  }
}
