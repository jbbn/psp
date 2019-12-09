const AsyncRouter = require('express-async-router').AsyncRouter
const router = AsyncRouter()
const { getFundsTotals } = require('./controller')

/**
 * Get total funds for payables
 */
router.get('/funds', async (_, res) => {
  const fundsTotals = await getFundsTotals()
  return res.json(fundsTotals)
})

module.exports = router
