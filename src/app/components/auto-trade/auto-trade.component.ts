import { Component } from '@angular/core';

@Component({
  selector: 'app-auto-trade',
  standalone: true,
  imports: [],
  templateUrl: './auto-trade.component.html',
  styleUrl: './auto-trade.component.scss'
})

//Component facilitates the configuration of automated stock buys and sells 
export class AutoTradeComponent {

// limit order - specific price that the trade will execute at 
//stop order - becomes market order at "stop price"
//stop limit order - specific price that the trade will execute at
//, but if the price does not reach the stop price,
// the trade will be cancelled

//form items: shareAmount, limitPrice, autoSellPrice, percentOfIncreaseForSale,  

//Create Ste variable to indicate
// the activation of either buy or sell version of component

//Buy variables
shareAmount: number = 0;
limitPrice: number = 0; // Price at which the trade is market

//Sell Variables
autoSellPrice: number = 0;
percentOfIncreaseForSale: number = 0;

}
