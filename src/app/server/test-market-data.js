const axios = require('axios');

async function testMarketData() {
  try {
    const response = await axios.get('http://localhost:3000/market-data', {
      params: {
        symbols: 'AAPL,GOOGL,MSFT'
      }
    });
    
    console.log('Market Data:', JSON.stringify(response.data, null, 2) );
  } catch (error) {
    console.error('Error fetching market data:', error.message);
  }
}

testMarketData();
