import { Component, inject } from '@angular/core';
import { ViewAssetComponent } from '../view-asset/view-asset.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TradeService } from '../../services/trade/trade.service';
import { AssetService } from '../../services/asset.service';
import { Trade } from '../../services/trade/trade.model';
import { TradeViewAssetComponent } from '../trade-view-asset/trade-view-asset.component';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import env from '../../../environments/environment';

interface MarketData {
  bars: {
    [symbol: string]: {
      c: number;
      h: number;
      l: number;
      n: number;
      o: number;
      t: string;
      v: number;
      vw: number;
    };
  };
  next_page_token: string | null;
}

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [ViewAssetComponent, TradeViewAssetComponent, FormsModule],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss'
})

export class TradeComponent {
  tradeInput: string = '';
  selectedTimeInForce!: string

  switchBtnClicked: boolean = false;

  //By default trading will be perfomred based on share amount 
  percentageTradeStyleChosen: boolean = false
  shouldShowConfirmationPanel: boolean = false
  totalPriceOfTrade: number = 0
  router = inject(Router);
  tradeService = inject(TradeService)
  assetService = inject(AssetService)
  http = inject(HttpClient)

  //Method exc\ecutred when button is clicked to change trading style
  switchButtonClicked() {
    this.switchBtnClicked = !this.switchBtnClicked;
    console.log(this.switchBtnClicked)
  }

  async openTradeConfirmation() {
    this.shouldShowConfirmationPanel = !this.shouldShowConfirmationPanel
    const inFocusAsset = this.assetService.getInFocusAsset()

    try {
      //Retrieve current market price of asset
      const marketPrice = await this.getMarketPrice(inFocusAsset.symbol)

      //Calculate total cost of trade
      this.totalPriceOfTrade = this.calculateTotalCostOfTrade(parseFloat(this.tradeInput), marketPrice)
      //Record price of current trade for use in other parts of the program
      this.tradeService.setInFocusTradePrice(this.totalPriceOfTrade)
      console.log('New Total cost of trade:' + this.totalPriceOfTrade)

      //New trade order created and set "In Focus"
      //Confirmation page will act as final 
      //submission barrier for submitting trade
      this.createNewTradeOrder()
    } catch (error) {
      console.error('Error getting marlet price or calculating total cost of trade:' + error)
    }
  }

  //Connect to alpaca service to make desired trade
  confirmTrade() {
    this.router.navigate(['/trade-confirmation'])
    //update local document containing trade data (JSON)
  }

  //Brings user back to default trade screen 
  denyTrade() {
    this.router.navigate(['/redirect'])
  }

  //New trade order is created and sent to service
  createNewTradeOrder() {

    if (this.tradeInput == '') {
      console.log("No trade input found")
      return
    }
    else if (this.isNumber(parseFloat(this.tradeInput)) && this.selectedTimeInForce) {
      const inFocusAsset = this.assetService.getInFocusAsset()
      console.log("trade input was number")

      const newTrade: Trade = {
        symbol: inFocusAsset.symbol,
        qty: this.tradeInput,
        side: 'buy',
        type: 'market',
        time_in_force: this.selectedTimeInForce
      };

      console.log("Attempting to set in focus trade")
      this.tradeService.setInFocusTrade(newTrade) //Current trade is put in focus by the program 
      console.log("Finished setting in focus trade")

    }
  }

  isNumber(value: unknown) {
    return typeof value === 'number' && !isNaN(value);
  }

  calculateTotalCostOfTrade(shareAmount: number, marketPriceOfAsset: number) {
    const totalCost = shareAmount * marketPriceOfAsset
    return totalCost
  }

  async getMarketPrice(symbol: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.get<MarketData>(env.serverUrl + '/market-data', {
        params: {
          symbols: symbol
        }
      }));
      console.log('Market Data Response:', response);
      if (response && response.bars && response.bars[symbol] ) {
        const closePrice = response.bars[symbol].c;
        console.log(`${symbol} Close Price:`, closePrice);
        return closePrice;
      } else {
        throw new Error(`No data available for ${symbol}`);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }
}
