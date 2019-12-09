const { getFundsTotals } = require('./controller')
const Payables = require('./models/Payables')

const groupBy = jest.fn()
const sum = jest.fn(() => ({ groupBy }))
const select = jest.fn(() => ({ sum }))
const query = jest.fn(() => ({ select }))
Payables.query = query

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
})
