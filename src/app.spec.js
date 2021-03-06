const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('./app')
const knex = require('./db/config')
const { version } = require('../package.json')

const METADATA_PATH = '/'
const TRANSACTIONS_PATH = '/transactions'
const PAYABLES_PATH = '/payables'

const transactionFixture = req =>
  Object.assign(
    {},
    {
      amount: 10,
      description: 'Nerd Stickers',
      payment_method: 'debit_card',
      card_number: '00001111222233334444',
      card_name: 'JOHN D SILVA',
      card_expiration_date: '102020',
      card_verification_value: '000',
    },
    req
  )
const requestCreateTransaction = (body = transactionFixture()) =>
  chai
    .request(app)
    .post(TRANSACTIONS_PATH)
    .send(body)

describe('PSP', () => {
  describe('Metadata module', () => {
    describe('When call the metadata', () => {
      it('Responds with the version', async () => {
        const response = await chai.request(app).get(METADATA_PATH)
        expect(response.body.version).toBe(version)
      })
    })
  })

  describe('Transactions module', () => {
    beforeEach(() => {
      return knex.migrate
        .rollback()
        .then(() => knex.migrate.latest())
        .then(() => knex.seed.run())
    })

    afterEach(() => {
      return knex.migrate.rollback()
    })

    describe('When listing the transactions', () => {
      it('Responds successfully', async () => {
        const response = await chai.request(app).get(TRANSACTIONS_PATH)
        expect(response.status).toBe(200)
      })

      it('Should return a list of transactions', async () => {
        const response = await chai.request(app).get(TRANSACTIONS_PATH)
        expect(Array.isArray(response.body)).toBe(true)
      })
    })

    describe('When creating a transaction', () => {
      describe('When a valid transaction is provided', () => {
        it('Responds successfully', async () => {
          const response = await requestCreateTransaction()
          expect(response.status).toBe(201)
        })

        it('Should the new item be part of the transactions list', async () => {
          const response = await requestCreateTransaction()
          const fetchResponse = await chai.request(app).get(TRANSACTIONS_PATH)
          expect(fetchResponse.body).toHaveLength(3)
        })

        it('Should the payable has been created for debit transation', async () => {
          const transactionFixture = req =>
            Object.assign(
              {},
              {
                amount: 200,
                description: 'Nerd Stickers',
                payment_method: 'debit_card',
                card_number: '00001111222233334444',
                card_name: 'JOHN D SILVA',
                card_expiration_date: '102020',
                card_verification_value: '000',
              },
              req
            )
          const transaction = await requestCreateTransaction(
            transactionFixture()
          )

          // sum of seeds and last creation (with business rules)
          const total_available = 394

          const response = await chai.request(app).get(PAYABLES_PATH + '/funds')
          expect(response.body.available).toBe(total_available)
        })
      })

      describe('When the validation returns an error', () => {
        it('Returns a bad request error', async () => {
          const response = await chai.request(app).post(TRANSACTIONS_PATH)
          expect(response.status).toBe(400)
        })

        it('Should have an error message', async () => {
          const response = await chai.request(app).post(TRANSACTIONS_PATH)
          expect(response.body.message).toBeTruthy()
        })
      })
    })
  })

  describe('Payables module', () => {
    describe('Funds', () => {
      beforeEach(() => {
        return knex.migrate
          .rollback()
          .then(() => knex.migrate.latest())
          .then(() => knex.seed.run())
      })

      afterEach(() => {
        return knex.migrate.rollback()
      })

      describe('When look for payables funds totals', () => {
        it('Should the endpoint exists', async () => {
          const response = await chai.request(app).get(PAYABLES_PATH + '/funds')
          expect(response.status).toBe(200)
        })

        it('Responds with the available funds', async () => {
          const response = await chai.request(app).get(PAYABLES_PATH + '/funds')
          expect(response.body).toHaveProperty('available')
        })

        it('Responds with the waiting funds', async () => {
          const response = await chai.request(app).get(PAYABLES_PATH + '/funds')
          expect(response.body).toHaveProperty('waiting_funds')
        })

        it('Responds with the CORRECT available funds', async () => {
          // we know the seeds, so we know the total
          const total_available = 200
          const response = await chai.request(app).get(PAYABLES_PATH + '/funds')
          expect(response.body.available).toBe(total_available)
        })

        it('Responds with the CORRECT waiting funds', async () => {
          // we know the seeds, so we know the total
          const total_waiting_funds = 175
          const response = await chai.request(app).get(PAYABLES_PATH + '/funds')
          expect(response.body.waiting_funds).toBe(total_waiting_funds)
        })
      })
    })
  })
})
