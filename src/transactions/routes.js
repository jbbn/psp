const express = require('express')
const AsyncRouter = require('express-async-router').AsyncRouter
const router = AsyncRouter()
const validate = require('express-validation')
const incommingTransactionSchema = require('./incommingTransactionSchema')
const { getTransactions, createTransaction } = require('./controller')

/**
 * Get all transactions
 */
router.get('/', async (_, res) => {
  const transactions = await getTransactions()
  return res.json(transactions)
})

/**
 * Create a transaction
 */
router.post(
  '/',
  express.json(),
  validate({ body: incommingTransactionSchema }),
  async (req, res) => {
    const incommingTransaction = req.body
    const transaction = await createTransaction(incommingTransaction)
    return res.status(201).json(transaction)
  }
)

module.exports = router
