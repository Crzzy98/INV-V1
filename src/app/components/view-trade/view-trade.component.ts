import { Component } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { TradeService } from '../../services/trade/trade.service';
import { HttpClient } from '@angular/common/http';
import env from '../../../environments/environment';
import { Trade } from '../../services/trade/trade.model';
import { Router } from '@angular/router';

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
  inFocusTrade:Trade | null = null; // Define obj props inline/ try execution using constructor
  selectedTimeInForce!:string
  totalPriceOfTrade!:number
  nameOfAsset!:string

  tradeService = inject(TradeService)
  http = inject(HttpClient)
  router = inject(Router)

  constructor() {
    this.initializeViewTradeProps()
  }

  initializeViewTradeProps(){
    this.inFocusTrade = this.tradeService.getInFocusTrade();

    if (this.inFocusTrade) {
      this.nameOfAsset = this.inFocusTrade.symbol || '';
      this.totalPriceOfTrade = this.tradeService.getInFocusTradePrice();
      this.totalShares = parseFloat(this.inFocusTrade.qty) || 0;
      this.selectedTimeInForce = this.inFocusTrade.time_in_force || '';
    } else {
      console.warn('No trade in focus');
    }
  }

  // Sends "in focus" trade to server for submission
  submitTradeNow(){
    try{
      this.http.post(env.serverUrl + '/create-order',
        this.tradeService.getInFocusTrade())
        .subscribe(res => {
          console.log("Create order response from view-trade:" + res)
        })
    }catch(err){
      console.log("Error while submitting trade: " + err)
    }

    //Show trade submission success message and then redirect 
    setTimeout(() => {
      this.router.navigate(['/redirect'])
    }, 1000)
  }

  submitDelayedTrade(){
// Create funct for submitting delayed trade separate from auto trading
//provide different selectable parameters for when the trade will be submitted 
// including the price limit for completing the trade 
  }

  cancelTrade(){
    this.router.navigate(['/redirect'])
  }
}
