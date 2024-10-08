const alpaca = require('../alpaca.config.js');

// Function to GET ACCOUNT STATUS
async function getAccountStatus() {
  try {
    const account = await alpaca.getAccount();
    console.log("Account Status: " + account.status);

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

module.exports = {
  getAccountStatus,
};
