const Alpaca = require('@alpacahq/alpaca-trade-api')
const env = require('../environments/environment');

 const alpaca = new Alpaca({
    keyId: env.keyId,
    secretKey: env.secretKey,
    // paper: true,
  })

  module.exports = alpaca