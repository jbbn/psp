const { getTransactions, createTransaction } = require('./controller')
const Transactions = require('./models/Transactions')

const select = jest.fn()
const insert = jest.fn()
const query = jest.fn(() => ({ select, insert }))
Transactions.query = query

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

    it('Should run the `insert` method of the model', async () => {
      const transaction = await createTransaction()
      expect(insert).toHaveBeenCalled()
    })

    it('Should not save the Card Verification Value', async () => {
      let params = null
      insert.mockImplementationOnce(_params => (params = _params))

      const incomming = getIncommingTransaction()
      const transaction = await createTransaction(incomming)

      expect(params).not.toHaveProperty('card_verification_value')
    })

    it('Should not save the Card Number', async () => {
      let params = null
      insert.mockImplementationOnce(_params => (params = _params))

      const incomming = getIncommingTransaction()
      const transaction = await createTransaction(incomming)

      expect(params).not.toHaveProperty('card_number')
    })

    it('Should save the last 4 digits of the Card Number', async () => {
      let params = null
      insert.mockImplementationOnce(_params => (params = _params))

      const incomming = getIncommingTransaction()
      const transaction = await createTransaction(incomming)

      expect(params).toHaveProperty('card_number_ending', '4444')
    })
  })
})
