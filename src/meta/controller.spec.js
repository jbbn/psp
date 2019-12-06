const { getAppMetadata } = require('./controller')
const { version } = require('../../package.json')

describe('App Metadata controller', () => {
  describe('When access the application', () => {
    it('Should provide the package version', async () => {
      const metadata = await getAppMetadata()
      expect(metadata.version).toBe(version)
    })
  })
})
