const alpaca = require('../alpaca.config.js')

async function createOrder(symbol, qty, side, type, time_in_force) {
  try {
    const order = await alpaca.createOrder({
      symbol: symbol,
      qty: qty,
      side: side,
      type: type,
      time_in_force: time_in_force // day, ioc, gtc
    });
    console.log('Order placed:', order);
    return order;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
}

module.exports = {
  createOrder,
};