import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoTradeService } from '../../../services/auto-trade.service';
import { AssetService } from '../../../services/asset.service';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarketData } from '../../../models/marketData.model';
import env from '../../../../environments/environment.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-trade',
  standalone: true,
  imports: [FormsModule, MatSliderModule, CommonModule],
  templateUrl: './auto-trade.component.html',
  styleUrl: './auto-trade.component.scss'
})

//Component facilitates the configuration of automated stock BUYS AND SELLS
export class AutoTradeComponent {

  // limit order - specific price that the trade will execute at 
  //stop order - becomes market order at "stop price"
  //stop limit order - specific price that the trade will execute at
  //, but if the price does not reach the stop price,
  // the trade will be cancelled

  //TRADE STORED IN STATE MACHINE 
  //Create State variable to indicate
  // the activation of either buy or sell version of component
  //Poss. use sqlite for persistent database of auto trades for client reference

  //Setting Trade parameters 
  //Risk level: Low (5% deviation from current market price), medium(15%), high(25%)
  router = inject(Router)
  private cdr = inject(ChangeDetectorRef);

  //Buy variables
  shareAmount: number = 0;
  limitPrice: number = 0; // Price at which the trade is market
  symbol: string = ''
  riskLevel: number = 0
  riskSliderValue: number = 0

  // Define risk levels with their corresponding values
  possibleRiskLevels = {
    low: { min: 0, value: 0, label: 'Low Risk' },
    medium: { min: 1, value: 1, label: 'Medium Risk' },
    high: { min: 2, value: 2, label: 'High Risk' }
  };
  // Get the current risk label based on value
  getCurrentRiskLabel(value: number = this.riskSliderValue): string {
    if (value <= this.possibleRiskLevels.low.value) {
      return this.possibleRiskLevels.low.label;
    } else if (value <= this.possibleRiskLevels.medium.value) {
      return this.possibleRiskLevels.medium.label;
    } else {
      return this.possibleRiskLevels.high.label;
    }
  }
  // Format the display value
  formatLabel = (value: number): string => {
    return this.getCurrentRiskLabel(value);
  }
  // Handle value changes
  onRiskValueChange(value: number | null) {
    if (value !== null) {
      this.riskSliderValue = value;
      this.riskLevel = value;
      console.log("Raw value: " + value);
      console.log("Risk value: " + this.riskSliderValue);
      this.updateActiveLabel();
      this.cdr.detectChanges();
    }
  }
  // Update the active label styling
  private updateActiveLabel() {
    const labels = document.querySelectorAll('.label');
    const currentLabel = this.getCurrentRiskLabel();

    labels.forEach(label => {
      if (label.textContent === currentLabel) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });
  }
  //When the price drops to or below limitPrice the trade will execute 
  //Sell Variables
  autoSellPrice: number = 0;
  percentOfIncreaseForSale: number = 0;

  autoTradeService = inject(AutoTradeService)
  assetService = inject(AssetService)
  http = inject(HttpClient)

  //Method stores current trade info in universal state for processing 
  //and sends data to server
  async storeAutoTrade(): Promise<void> {
    try {

      const currentAssetSymbol: string = this.assetService.getInFocusAsset().symbol;
      const currentAssetPrice = await firstValueFrom(this.http.get<{ price: number }>(
        `${env.serverUrl}/market-data-price`,
        { params: { symbol: currentAssetSymbol } }
      ))
      console.log("Symbol: " + currentAssetSymbol + " Shares:  " + this.shareAmount)

      // Validate inputs before proceeding
      if (!currentAssetSymbol || !this.shareAmount) {
        throw new Error('Symbol and share amount not found');
      }

      // Send request to service to store trade data
      await this.autoTradeService.storeAutoTradeData(currentAssetSymbol, this.shareAmount,
        currentAssetPrice.price, this.riskLevel);

    } catch (error) {
      // Handle errors appropriately
      console.error('Failed to store auto trade:', error);
      throw error;
    }
  }

  cancelAutoTrade() {
    this.router.navigate(['/trade-stocks-selector'])
  }
  //Fetch market data from server
  async getMarketPrice(symbol: string): Promise<number> {
    try {
      const response = await firstValueFrom(this.http.get<MarketData>(env.serverUrl + '/market-data', {
        params: {
          symbols: symbol
        }
      }));
      console.log('Market Data Response:', response);
      if (response && response.bars && response.bars[symbol]) {
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
  //Universal state is maintaned via mesage broker services (RabbitMQ)
}
