const axios = require('axios');
const env = require('../../environments/environment');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./auto_trade.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        createTables();
    }
});
//Creation of tables to store auto trade data
async function createTables() {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE TABLE IF NOT EXISTS auto_trades (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          symbol TEXT NOT NULL,
          share_amount INTEGER NOT NULL,
          risk_level INTEGER NOT NULL,
          limit_price REAL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

//Add auto trade data to local database
async function storeAutoTrade(symbol, shareAmount, riskLevel, limitPrice) {
    return new Promise((resolve, reject) => {
        db.run(`
        INSERT INTO auto_trades (symbol, share_amount, risk_level, limit_price)
        VALUES (?, ?, ?, ?)
      `, [symbol, shareAmount, riskLevel, limitPrice], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
//Get Auto Trade data from local database
async function getAutoTrades() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM auto_trades', (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

module.exports = {
    storeAutoTrade,
    getAutoTrades
};
