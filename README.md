# Payment Service Provider

[![Maintainability](https://api.codeclimate.com/v1/badges/158908ffa2a498e8e71c/maintainability)](https://codeclimate.com/github/jbbn/psp/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/158908ffa2a498e8e71c/test_coverage)](https://codeclimate.com/github/jbbn/psp/test_coverage)

## Requirements

* `yarn`
* `node` >= 8.9.0 (will likely work with older versions, but has never been
  tested)

## Installation

`yarn`

## Running

`yarn start` will start the application at
[http://localhost:3000](http://localhost:3000) (set environment variable `PORT`
to change the port).

The service can now be called:

```sh
$ curl http://localhost:3000/
{"version": "1.0.0"}
```

## Testing

Tests can be run with `yarn test`. A `watch` mode is configured for interactive
sessions, using `yarn test:watch`.

All tests are colocated with their respective source files in `*.spec.js` files,
using [Jest](https://facebook.github.io/jest/) with default settings.

In-process API tests can be found in [app.spec.js](./src/app.spec.js). You do
not need to run the application separately to run any tests.

## Debugging

To run with a debugger listening, run `yarn start:dev` / `npm run start:dev`.
You will see the following output:

```sh
$ nodemon --inspect=9229 bin/www
[nodemon] 1.12.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node --inspect=9229 bin/www`
Debugger listening on ws://127.0.0.1:9229/044e7ad8-e365-46b2-bd15-2182d25c9ebf
For help see https://nodejs.org/en/docs/inspector
Started application on port 3000
```

To attach a debugger, open up [chrome://inspect](chrome://inspect) in Chrome or
Chromium, click `Open dedicated DevTools for Node`, add `localhost:9229` to the
list of remote targets if it is not already there, and then select the remote
target that shows up.

## Contributing

Make sure your code passes all the tests and adds any new applicable ones.

The project uses [Prettier](https://github.com/prettier/prettier) for
formatting, and commits will fail if they are not properly formatted. `yarn
format` will format the project for you, if your editor is not set up to do so
automatically.
