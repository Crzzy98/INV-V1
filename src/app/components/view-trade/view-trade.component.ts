import { Component } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { TradeService } from '../../services/trade/trade.service';
import { HttpClient } from '@angular/common/http';
import env from '../../../environments/environment';

@Component({
  selector: 'app-view-trade',
  standalone: true,
  imports: [],
  templateUrl: './view-trade.component.html',
  styleUrl: './view-trade.component.scss'
})

//Component allows for viewing and confimring submission of trade
export class ViewTradeComponent implements OnInit {
  totalShares!:number
  selectedTimeInForce!:string
  totalPriceOfTrade!:number
  
  tradeService = inject(TradeService)
  http = inject(HttpClient)

  ngOnInit(): void {
    this.initializeViewTradeProps()
  }
  initializeViewTradeProps(){
    this.totalPriceOfTrade = this.tradeService.getInFocusTradePrice()
    this.totalShares = parseFloat(this.tradeService.getinFocusTrade().qty)
    this.selectedTimeInForce = this.tradeService.getinFocusTrade().time_in_force
  }
  submitTradeNow(){
    try{
      this.http.post(env.serverUrl + '/create-order',
        this.tradeService.getinFocusTrade)
    }catch(err){

    }
  }

  submitDelayedTrade(){

  }
}
