import { Component } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { TradeService } from '../../services/trade/trade.service';
import { HttpClient } from '@angular/common/http';
import env from '../../../environments/environment';
import { Trade } from '../../services/trade/trade.model';

@Component({
  selector: 'app-view-trade',
  standalone: true,
  imports: [],
  templateUrl: './view-trade.component.html',
  styleUrl: './view-trade.component.scss'
})

//Component allows for viewing and confimring submission of trade
export class ViewTradeComponent {
  totalShares!:number
  selectedTimeInForce!:string
  totalPriceOfTrade!:number
  inFocusTrade:Trade | null = null; // Define obj props inline/ try execution using constructor

  tradeService = inject(TradeService)
  http = inject(HttpClient)

  constructor() {
    this.initializeViewTradeProps()
  }
  initializeViewTradeProps(){
    this.inFocusTrade = this.tradeService.getInFocusTrade();

    if (this.inFocusTrade) {
      this.totalPriceOfTrade = this.tradeService.getInFocusTradePrice();
      this.totalShares = parseFloat(this.inFocusTrade.qty) || 0;
      this.selectedTimeInForce = this.inFocusTrade.time_in_force || '';
    } else {
      console.warn('No trade in focus');
    }
  }

  submitTradeNow(){
    try{
      this.http.post(env.serverUrl + '/create-order',
        this.tradeService.getInFocusTrade())
    }catch(err){
      console.log("Error while submitting trade: " + err)
    }
  }

  submitDelayedTrade(){

  }
}
