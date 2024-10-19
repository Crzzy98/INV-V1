const alpaca = require('../alpaca.config.js')
const axios = require('axios')
const env = require('../../environments/environment')

async function createOrder(symbol, qty, side, type, time_in_force) {
  try {
    // Prepare the data for the POST request
    const postData = {
      symbol,
      qty,
      side,
      type,
      time_in_force
    };

    console.log('Sending order to Alpaca:', postData);

    // Make the POST request to the Alpaca API
    const response = await axios.post(env.ordersUrl, postData, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'APCA-API-KEY-ID': env.keyId,
        'APCA-API-SECRET-KEY': env.secretKey
      }
    });

    console.log('Order placed:', postData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
}

module.exports = {
  createOrder,
};