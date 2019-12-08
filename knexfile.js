const path = require('path')

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3',
    },
    useNullAsDefault: true,
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
  },
}
