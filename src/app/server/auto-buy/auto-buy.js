//how to set order type to limit?
//for implemetnting extended hours orders?
//Assume application is being run for at least an hour a day during market open hours 

//historical analysis happens and returns average fluctuations in price 
// Record closing price each day of asset over certain period of time 
//Record significant fluctuations and amountOfSignificantFluctuations
//alpaca only allows market data access back to 2015(free) or 2004(paid)
//Research different market data api/services

//Auto trade for long-term investing - use historical auction info 
//Auto trade for day trading - use bars

//Historical data format from market history pull
// "auctions": {
//     "AMD": [
//       {
//         "c": null,
//         "d": "2024-10-18",
//         "o": [
//           {
//             "c": "Q",
//             "p": 157.3,
//             "s": 19,
//             "t": "2024-10-18T13:30:00.028642987Z",
//             "x": "P"
//           },
//           {
//             "c": "O",
//             "p": 157.41,
//             "s": 741850,
//             "t": "2024-10-18T13:30:00.191355086Z",
//             "x": "Q"
//           },
//           {
//             "c": "Q",
//             "p": 157.41,
//             "s": 741850,
//             "t": "2024-10-18T13:30:00.191902153Z",
//             "x": "Q"
//           }
//         ]
//       }
//     ]
//   },
//   "next_page_token": null
// }
//over day, weeek, month and 5-year
//Possibly only create orders after historical analysis
//CreateStopLimitOrder