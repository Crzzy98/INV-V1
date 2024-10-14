const axios = require('axios');
const env = require('../../environments/environment');

async function getMarketData(symbols, timeframe = '1Day') {
  try {
    const response = await axios.get('https://data.alpaca.markets/v2/stocks/bars/latest', {
      params: {
        symbols: symbols.join(','),
        // timeframe: timeframe
      },
      headers: {
        'APCA-API-KEY-ID': env.keyId,
        'APCA-API-SECRET-KEY': env.secretKey
      }
    });

    if (response.status === 200) {
      const data = response.data;
      console.log('Market data retrieved successfully:', JSON.stringify(data, null, 2));
      return data;
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getMarketData:', error.message);
    throw error;
  }
}

module.exports = {
  getMarketData,
};
