import { Injectable } from '@angular/core';
import { Trade } from './trade.model';
@Injectable({
  providedIn: 'root'
})
export class TradeService {

  //Variable conatins data indicating the of the current
  //'in focus' trade
  inFocusTrade!: Trade

  setinFocusTrade(trade: Trade) {
    this.inFocusTrade = trade
  }

  constructor() { }
}
