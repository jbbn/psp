const { getTransactions, createTransaction } = require('./controller')
const Transactions = require('./models/Transactions')
const Payables = require('../payables/models/Payables')

const select = jest.fn()
const TransactionInsert = jest.fn(params => params)
const query = jest.fn(() => ({ select, insert: TransactionInsert }))
Transactions.query = query

const PayablesInsert = jest.fn(params => params)
Payables.query = jest.fn(() => ({ insert: PayablesInsert }))

describe('Transactions controller', () => {
  describe('When getting the transactions', () => {
    it('Should run the `select` method of the model', async () => {
      const transactions = await getTransactions()
      expect(select).toHaveBeenCalled()
    })
  })

  describe('When creating a new transaction', () => {
    const getIncommingTransaction = () => ({
      amount: 10,
      card_number: '00001111222233334444',
      card_verification_value: '999',
    })

    it('Runs the `insert` method of the Transaction model', async () => {
      const transaction = await createTransaction()
      expect(TransactionInsert).toHaveBeenCalled()
    })

    it('Runs the `insert` method of the Payable model', async () => {
      const transaction = await createTransaction()
      expect(PayablesInsert).toHaveBeenCalled()
    })

    it('Should not save the Card Verification Value', async () => {
      let params = null
      TransactionInsert.mockImplementationOnce(_params => (params = _params))

      const incomming = getIncommingTransaction()
      const transaction = await createTransaction(incomming)

      expect(params).not.toHaveProperty('card_verification_value')
    })

    it('Should not save the Card Number', async () => {
      let params = null
      TransactionInsert.mockImplementationOnce(_params => (params = _params))

      const incomming = getIncommingTransaction()
      const transaction = await createTransaction(incomming)

      expect(params).not.toHaveProperty('card_number')
    })

    it('Should save the last 4 digits of the Card Number', async () => {
      let params = null
      TransactionInsert.mockImplementationOnce(_params => (params = _params))

      const incomming = getIncommingTransaction()
      const transaction = await createTransaction(incomming)

      expect(params).toHaveProperty('card_number_ending', '4444')
    })
  })
})
