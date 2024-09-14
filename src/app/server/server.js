const express = require("express")
const cors = require("cors")
const alpaca = require("../alpaca.config.js");
const axios = require("axios")

const app = express()
const port = process.env.PORT || 3000
const API_URL = 'https://api.alpaca.markets'

//Middleware
app.use(cors());
app.use(express.json())

// Function to get account status
async function getAccountStatus() {
  try {
    const account = await alpaca.getAccount()
    console.log("Account Status: " + account.status)
    // Check if the account is restricted from trading
    if (account.trading_blocked) {
      console.log("Account is currently restricted from trading.");
    }

    // Check how much money we can use to open new positions
    console.log(`$${account.buying_power} is available as buying power.`);

    return account; // Return account data for further use
  } catch (error) {
    console.error("Error fetching account status:", error);
    throw error;
  }
}

//Account status endpoint
app.get("/account-status", async (req, res) => {
  try {
    const account = await getAccountStatus();
    res.json({ message: "Account status checked.", account });
  } catch (error) {
    res.status(500).json({ message: "Error fetching account status." });
  }
});

app.listen(port,
  () => {
    console.log("Srver listening on port: " + port)
    getAccountStatus()
  }
)

