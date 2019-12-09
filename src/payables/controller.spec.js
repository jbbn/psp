const { getFundsTotals, createPayable } = require('./controller')

const uuid = require('uuid/v4')
const PAYMENT_METHOD = require('../transactions/payment_method')
const Payables = require('./models/Payables')

const insert = jest.fn(params => params)
const groupBy = jest.fn()
const sum = jest.fn(() => ({ groupBy }))
const select = jest.fn(() => ({ sum }))
const query = jest.fn(() => ({ select, insert }))
Payables.query = query

const createDebitPayable = async (
  transaction_id = uuid(),
  transaction_amount = 100
) =>
  await createPayable(
    transaction_amount,
    PAYMENT_METHOD.DEBT_CARD,
    transaction_id
  )

describe('Payables controller', () => {
  describe('When getting the payables data', () => {
    it('Should have the total available funds', async () => {
      groupBy.mockImplementationOnce(() => [])
      const payablesData = await getFundsTotals()
      expect(payablesData).toHaveProperty('available')
    })

    it('Should have the total waiting funds', async () => {
      groupBy.mockImplementationOnce(() => [])
      const payablesData = await getFundsTotals()
      expect(payablesData).toHaveProperty('waiting_funds')
    })
  })

  describe('When creating a new payable', () => {
    it('Runs the `insert` method of the Payable model', async () => {
      const transaction = await createDebitPayable()
      expect(insert).toHaveBeenCalled()
    })
  })
})
