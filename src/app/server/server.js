const express = require("express")
const cors = require("cors")
const alpaca = require("../alpaca.config.js");
const axios = require("axios")

const app = express()
const port = process.env.PORT || 3000
const API_URL = 'https://api.alpaca.markets'


//Service to communicate with api
const alpacaService = require("./alpaca.service.js")

//GET ACCOUNT STATUS
const { getAccountStatus, getActiveAssets} = alpacaService

//Middleware-0
app.use(cors());
app.use(express.json())

//Account status endpoint
app.get("/account-status", async (req, res) => {
  try {
    const account = await getAccountStatus();
    res.json({ message: "Account status checked.", account });
  } catch (error) {
    res.status(500).json({ message: "Error fetching account status." });
  }
});

app.get("/active-assets", async (req, res) => {
  try {
    const fetchedActiveAssets = await getActiveAssets()
    .then((activeAssets) => {
      // Filter the assets down to just those on NASDAQ.
      const nasdaqAssets = activeAssets.filter(
        (asset) => asset.exchange == "NASDAQ"
      );
      res.json(activeAssets);
      console.log("All active assets: " + JSON.stringify(activeAssets))
      // console.log( "NAS ASSETS: " + nasdaqAssets + "End of asset list" );
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching active assets." });
  }
});

app.listen(port,
  () => {
    console.log("Server listening on port: " + port)
    getAccountStatus()
  }
)

