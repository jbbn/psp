const express = require('express')
const app = express()
const errorHandler = require('./lib/middleware/error-handler')
const metadataModule = require('./meta/routes.js')
const transactionsModule = require('./transactions/routes.js')

app.use('/', metadataModule)
app.use('/transactions', transactionsModule)

app.use(errorHandler())

module.exports = app
