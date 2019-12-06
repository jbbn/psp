const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('./app')
const { version } = require('../package.json')

const METADATA_PATH = '/'

describe('PSP', () => {
  describe('Metadata module', () => {
    describe('When call the metadata', () => {
      it('Responds with the version', async () => {
        const response = await chai.request(app).get(METADATA_PATH)
        expect(response.body.version).toBe(version)
      })
    })
  })
})
