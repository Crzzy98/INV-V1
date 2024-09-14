const Alpaca = require('@alpacahq/alpaca-trade-api')

 const alpaca = new Alpaca({
    keyId: 'AKROIH0W6WFTUXZ8IG4S',
    secretKey: 'dts1irGGvZM5CNdPK9bs5RMrwV8dHT9zAKIVogfy',
    // paper: true,
  })

  module.exports = alpaca