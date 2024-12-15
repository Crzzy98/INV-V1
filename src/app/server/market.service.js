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

async function getMarketPrice(symbol) {
  try {
    const marketData = await getMarketData([symbol]);
    console.log('Market Data Response:', marketData);
    
    if (marketData && marketData.bars && marketData.bars[symbol]) {
      const closePrice = marketData.bars[symbol].c;
      console.log(`${symbol} Close Price:`, closePrice);
      return closePrice;
    } else {
      throw new Error(`No data available for ${symbol}`);
    }
  } catch (error) {
    console.error('Error fetching market price:', error);
    throw error;
  }
}

module.exports = {
  getMarketData,
  getMarketPrice
};
