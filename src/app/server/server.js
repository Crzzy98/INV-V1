const express = require("express")
const cors = require("cors")
const alpaca = require("../alpaca.config.ts");

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

// Initialize Alpaca instance
// const alpaca = new Alpaca();

// Function to get account status
function getAccountStatus() {
    alpaca.getAccount().then(function (account) {
        // Check if the account is restricted from trading
        if (account.trading_blocked) {
            console.log("Account is currently restricted from trading.");
        }

        // Check how much money we can use to open new positions
        console.log(`$${account.buying_power} is available as buying power.`);
    });
}

//Account status endpoint
app.get("/account-status", (req, res) => {
    getAccountStatus();
    res.send("Account status checked. Check the server logs for details.");
});

app.listen(port, 
    () => {
        console.log("Srver listening on port: " + port)
        getAccountStatus()
    }
)