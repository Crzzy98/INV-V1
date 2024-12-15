import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '../../environments/environment';

interface AutoTrade {
  symbol: string,
  shareAmount: number,
  currentPrice: number,
  riskLevel: number
}
@Injectable({
  providedIn: 'root'
})

export class AutoTradeService {

  http = inject(HttpClient);

  storeAutoTradeData(symbol: string, shareAmount: number,
    currentPrice: number, riskLevel: number) {
    try {
      //Store data using service call and message broker
      //trade data should be made ready for local and database storage
      //populate global store with database trade data at start of application 
      //Update trade data after client cancels, buys, or sells a position
      console.log("Data in Auto Service: " + "symbol:" + symbol, 
        "shareAmount: " + shareAmount,
        "currentPrice: " + currentPrice,
        "riskLevel: " + riskLevel) 
      // this.http.post(environment.serverUrl,
      //   { symbol, shareAmount, currentPrice, riskLevel })
      //   .subscribe((response: any) => {
      //     console.log("Trade data stored successfully:", response);
      //   });
      //Recieve Confirmation response
    } catch (e) {
      console.log("Error while storing trade data")
    }
  }
}
