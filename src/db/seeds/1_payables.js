const uuid = require('uuid/v4')

exports.seed = knex =>
  knex('payables')
    .del()
    .then(() =>
      knex('transactions')
        .pluck('id')
        .then(postIds =>
          knex('payables').insert([
            {
              id: uuid(),
              amount: 150,
              status: 'paid',
              payment_date: new Date().getTime(),
              transaction_id: postIds[0],
            },
            {
              id: uuid(),
              amount: 100,
              status: 'waiting_funds',
              payment_date: new Date().getTime(),
              transaction_id: postIds[0],
            },
            {
              id: uuid(),
              amount: 50,
              status: 'paid',
              payment_date: new Date().getTime(),
              transaction_id: postIds[0],
            },
            {
              id: uuid(),
              amount: 75,
              status: 'waiting_funds',
              payment_date: new Date().getTime(),
              transaction_id: postIds[0],
            },
          ])
        )
    )
