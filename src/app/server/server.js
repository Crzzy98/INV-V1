const express = require("express")
const cors = require("cors")
const alpaca = require("../alpaca.config.js");
const axios = require("axios")

const app = express()
const port = process.env.PORT || 3000
const API_URL = 'https://api.alpaca.markets'

//Service to communicate with api
const alpacaService = require("./alpaca.service.js")
const tradeService = require("./trade.service.js")
const marketService = require("./market.service.js")

//CUSTOM ALPACA SERVICE METHODS
const { getAccountStatus, getActiveAssets, activeAssets } = alpacaService

//CUSTOM ALPACA TRADE METHODS
const {createOrder} = tradeService

//CUSTOM ALPACA MARKET METHODS
const {getMarketData} = marketService

app.use(cors());
app.use(express.json())

//ENDPOINT HANDLERS
async function handleAccountStatus(req, res) {
  try {
    const account = await getAccountStatus();
    return { message: "Account status checked.", account };

  } catch (error) {
    return { status: 500, message: "Error fetching account status." };
  }
}

async function handleActiveAssets(req, res) {
  try {
    const activeAssets = await getActiveAssets();
    const nasdaqAssets = activeAssets.filter(
      (asset) => asset.exchange == "NASDAQ"
    );
    console.log("All active assets: " + JSON.stringify(activeAssets));
    return activeAssets;
  } catch (error) {
    return { status: 500, message: "Error fetching active assets." };
  }
}

// Search function
function searchAssets(assets, searchTerm) {
  if (!searchTerm) return assets;
  
  searchTerm = searchTerm.toLowerCase();
  return assets.filter(asset => 
    asset.symbol.toLowerCase().includes(searchTerm) ||
    asset.name.toLowerCase().includes(searchTerm)
  );
}
//SERVER ENDPOINTS

//Account status endpoint
app.get("/account-status", async (req, res) => {
  try {
    const result = await handleAccountStatus(req, res);
    res.status(result.status || 200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching account status." });
  }
});

//Retrieve active assets upon initialization of the server
app.get("/active-assets", async (req, res) => {
  try {
    res.json(this.activeAssets)
  } catch (error) {
    res.status(500).json({ message: "Error fetching active assets." });
  }
});

app.get('/assets', async (req, res) => {
  try {
    const { startIndex, endIndex } = req.query;
    
    // Ensure startIndex and endIndex are numbers
    const start = parseInt(startIndex) || 0;
    const end = parseInt(endIndex) || (start + 10); // Default to 10 items if endIndex is not provided
    
    // Slice the activeAssets array based on startIndex and endIndex
    const paginatedAssets = this.activeAssets.slice(start, end);
    
    res.json(paginatedAssets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'An error occurred while fetching assets' });
  }
});

// Search assets route
app.get('/search-assets', async (req, res) => {
  try {
    const searchTerm = req.query.search;
    
    // Use the activeAssets from alpacaService
    const allAssets = await getActiveAssets();
    
    // Use the search function
    const filteredAssets = searchAssets(allAssets, searchTerm);

    res.json({ data: filteredAssets });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred while searching assets' });
  }
});

//TRADE ENDPOINTS
app.post("/create-order", async (req, res) => {
  try {
    const order = req.body;
    const result = await createOrder(order);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating order." });
  }
});

app.get('/market-data', async (req, res) => {
  try {
    const { symbols } = req.query;
    if (!symbols) {
      return res.status(400).json({ error: 'Symbols parameter is required' });
    }

    const symbolsArray = symbols.split(',');
    const marketData = await marketService.getMarketData(symbolsArray);
    res.json(marketData);
  } catch (error) {
    console.error('Error in market data route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port,
  () => {
    console.log("Server listening on port: " + port)
    // First, get the account status
    handleAccountStatus({}, {})
    .then((accountResult) => {
      console.log("Account status checked:", accountResult);

      // Set a timeout to get active assets after 5 seconds
      setTimeout(() => {
        handleActiveAssets({}, {})
          .then((assetsResult) => {
            console.log("Active assets retrieved:", assetsResult.length);

            //Asset data is sent to service 
            this.activeAssets = assetsResult;
          })
          .catch((error) => {
            console.error("Error fetching active assets:", error);
          });
      }, 5000);
    })
    .catch((error) => {
      console.error("Error checking account status:", error);
    });
});
  //END OF LISTENER



