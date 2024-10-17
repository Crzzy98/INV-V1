import { Injectable } from '@angular/core';
import { Trade } from './trade.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  //Variable conatins data indicating the of the current
  //'in focus' trade
  inFocusTrade!: Trade
  private inFocusTradePrice: number = 0;

  setInFocusTrade(trade: Trade) {
    this.inFocusTrade = trade
  }
  getInFocusTrade(): Trade {
    return this.inFocusTrade
  }

  //Keep track of  current trade price 
  setInFocusTradePrice(newPrice: number) {
    this.inFocusTradePrice = newPrice;
  }
  getInFocusTradePrice() {
    return this.inFocusTradePrice;
  }

}
