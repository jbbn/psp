const express = require('express')
const app = express()
const errorHandler = require('./lib/middleware/error-handler')
const metadataModule = require('./meta/routes.js')
const transactionsModule = require('./transactions/routes.js')
const payablesModule = require('./payables/routes.js')

app.use('/', metadataModule)
app.use('/transactions', transactionsModule)
app.use('/payables', payablesModule)

app.use(errorHandler())

module.exports = app
