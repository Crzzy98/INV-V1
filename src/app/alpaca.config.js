const Alpaca = require('@alpacahq/alpaca-trade-api')

 const alpaca = new Alpaca({
    keyId: 'CK0HUMGG10W415XKQPZF',
    secretKey: 'pnq4YHlpMF3LhfLyOvmdfLmlz6BnASrTPQIASeiU',
    paper: true,
  })

  module.exports = alpaca