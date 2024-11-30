import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoTradeService {

  http = inject(HttpClient);

  storeAutoTradeData(symbol: string, shareAmount: number,
    currentPrice: number, riskLevel: number) {
    try {
      //Store data using service call and message broker
      this.http.post(environment.serverUrl,
        { symbol, shareAmount, currentPrice, riskLevel })
        .subscribe((response: any) => {
          console.log("Trade data stored successfully:", response);
        });
      //Recieve Confirmation response
    } catch (e) {
      console.log("Error while storing trade data")
    }
  }
}
