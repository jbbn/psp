const uuid = require('uuid/v4')

exports.seed = knex =>
  knex('transactions')
    .del()
    .then(() =>
      knex('transactions').insert([
        {
          id: uuid(),
          amount: 150,
          description: 'A sample transaction',
          payment_method: 'credit_card',
          card_number_ending: '4321',
          card_name: 'JOHN D SILVA',
          card_expiration_date: '102022',
        },
        {
          id: uuid(),
          amount: 350,
          description: 'Another transaction',
          payment_method: 'debit_card',
          card_number_ending: '4321',
          card_name: 'JANE D SILVA',
          card_expiration_date: '112021',
        },
      ])
    )
