import { Component } from '@angular/core';
import { ViewAssetComponent } from '../view-asset/view-asset.component';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [ViewAssetComponent, FormsModule],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss'
})
export class TradeComponent {
  //shares to buy 
  //percentage of individual share
  switchBtnClicked: boolean = false;

  //By default trading will be perfomred based on share amount 
  percentageTradeStyleChosen: boolean = false; 
  tradeInput: string = '';
  shouldShowConfirmationPanel:boolean = true

  //Method exc\ecutred when button is clicked to change trading style
  switchButtonClicked() {
    this.switchBtnClicked = !this.switchBtnClicked;
    console.log(this.switchBtnClicked)
  }

  openTradeConfirmation(){
    this.shouldShowConfirmationPanel = !this.shouldShowConfirmationPanel
  }

  //Connect to alpaca service to make desired trade
  confirmTrade(){

    //update local document containing trade data (JSON)
  }

  //Brings user back to default trade screen 
  denyTrade(){

  }
}
