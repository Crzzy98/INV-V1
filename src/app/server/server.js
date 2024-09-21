const express = require("express")
const cors = require("cors")
const alpaca = require("../alpaca.config.js");
const axios = require("axios")

const app = express()
const port = process.env.PORT || 3000
const API_URL = 'https://api.alpaca.markets'

//Service to communicate with api
const alpacaService = require("./alpaca.service.js")

//CUSTOM ALPACA SERVICE METHODS
const { getAccountStatus, getActiveAssets, activeAssets } = alpacaService

app.use(cors());
app.use(express.json())
//HANDLERS
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



