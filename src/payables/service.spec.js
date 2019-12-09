const { preparePayable } = require('./service')

const uuid = require('uuid/v4')
const isSameDay = require('date-fns/isSameDay')
const addDays = require('date-fns/addDays')
const PAYMENT_METHOD = require('../transactions/payment_method')
const STATUS = require('./status')

const prepareDebitPayable = (
  transaction_id = uuid(),
  transaction_amount = 100
) =>
  preparePayable(transaction_amount, PAYMENT_METHOD.DEBT_CARD, transaction_id)

const prepareCreditPayable = (
  transaction_id = uuid(),
  transaction_amount = 100
) =>
  preparePayable(transaction_amount, PAYMENT_METHOD.CREDIT_CARD, transaction_id)

describe('Payable service', () => {
  describe('Prepare', () => {
    it('Should save the origin transaction', () => {
      const transaction_id = uuid()
      const payable = prepareDebitPayable(transaction_id)
      expect(payable).toHaveProperty('transaction_id', transaction_id)
    })

    describe('When the payment method is "Debit"', () => {
      it('Should create a payable with status "Paid"', () => {
        const payable = prepareDebitPayable()
        expect(payable).toHaveProperty('status', STATUS.PAID)
      })

      it('Should create a payable with the payment date as D+0 (today)', () => {
        const payable = prepareDebitPayable()
        const isTodayPaymentDate = isSameDay(payable.payment_date, new Date())
        expect(isTodayPaymentDate).toBe(true)
      })

      it('Should create a payable with a total of 97% of the transaction amount', () => {
        const transaction_amount = 100
        const payable = prepareDebitPayable(undefined, transaction_amount)
        expect(payable.amount).toBe(97)
      })
    })

    describe('When the payment method is "Credit"', () => {
      it('Should create a payable with status "Waiting funds"', () => {
        const payable = prepareCreditPayable()
        expect(payable).toHaveProperty('status', STATUS.WAITING_FUNDS)
      })

      it('Should create a payable with the payment date as D+30', () => {
        const payable = prepareCreditPayable()
        const isD30PaymentDate = isSameDay(
          payable.payment_date,
          addDays(new Date(), 30)
        )
        expect(isD30PaymentDate).toBe(true)
      })

      it('Should create a payable with a total of 95% of the transaction amount', () => {
        const transaction_amount = 100
        const payable = prepareCreditPayable(undefined, transaction_amount)
        expect(payable.amount).toBe(95)
      })
    })
  })
})
