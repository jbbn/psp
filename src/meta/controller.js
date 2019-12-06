const { version } = require('../../package.json')

module.exports.getAppMetadata = () => {
  return {
    version,
  }
}
