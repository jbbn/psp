const path = require('path')

const MIGRATIONS_PATH = path.join(__dirname, 'src', 'transactions')
const PAYABLES_PATH = path.join(__dirname, 'src', 'payables')

const migrations = {
  directory: [
    path.join(MIGRATIONS_PATH, 'migrations'),
    path.join(PAYABLES_PATH, 'migrations'),
  ],
}
const seeds = {
  directory: path.join(__dirname, 'src', 'db', 'seeds'),
}

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3',
    },
    migrations,
    seeds,
    useNullAsDefault: true,
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    migrations,
    seeds,
    useNullAsDefault: true,
  },
}
