const express = require('express')
const router = express.Router()
const { getAppMetadata } = require('./controller')

router.get('/', (_, res) => {
  const metadata = getAppMetadata()
  return res.json(metadata)
})

module.exports = router
