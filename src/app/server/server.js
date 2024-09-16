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
const { getAccountStatus } = alpacaService

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

app.listen(port,
  () => {
    console.log("Server listening on port: " + port)
    getAccountStatus()
  }
)

