import { Component, inject} from '@angular/core';
import { ViewAssetComponent } from '../view-asset/view-asset.component';
import {FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { TradeService } from '../../services/trade/trade.service';
import { AssetService } from '../../services/asset.service';
import { Trade } from '../../services/trade/trade.model';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [ViewAssetComponent, FormsModule],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss'
})
export class TradeComponent {
  tradeInput: string = '';

  switchBtnClicked: boolean = false;

  //By default trading will be perfomred based on share amount 
  percentageTradeStyleChosen: boolean = false; 
  shouldShowConfirmationPanel:boolean = true

  router = inject(Router);
  tradeService = inject(TradeService)
  assetService = inject(AssetService)

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
    this.router.navigate(['/trade-confirmation'])
    //update local document containing trade data (JSON)
  }

  //Brings user back to default trade screen 
  denyTrade(){
    this.router.navigate(['/redirect'])
  }

  //New trade order is created and sent to service
  createNewTradeOrder(){

    if(this.tradeInput == ''){
      return
    }
    else if(this.isNumber(this.tradeInput)){
      this.tradeService.setinFocusTrade(new Trade({
        
      }))

    }

  }
   isNumber(value:unknown) {
    return typeof value === 'number' && !isNaN(value);
  }
  
}
