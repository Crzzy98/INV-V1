import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoTradeService } from '../../services/auto-trade.service';
import { AssetService } from '../../services/asset.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-auto-trade',
  standalone: true,
  imports: [FormsModule, MatSliderModule],
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

  //Buy variables
  shareAmount: number = 0;
  limitPrice: number = 0; // Price at which the trade is market
  symbol: string = ''
  riskLevel: string = ''
  riskSliderValue: number = 1.5

  // Define risk levels with their corresponding values
  possibleRiskLevels = {
    low: { min: 1, max: 2.5, label: 'Low Risk' },
    medium: { min: 2.5, max: 3.5, label: 'Medium Risk' },
    high: { min: 3.5, max: 5, label: 'High Risk' }
  };
  // Format the display value
  formatLabel(value: number): string {
    return this.getCurrentRiskLabel(value);
  }
  // Get the current risk label based on value
  getCurrentRiskLabel(value: number = this.riskSliderValue): string {
    if (value <= this.possibleRiskLevels.low.max) {
      return this.possibleRiskLevels.low.label;
    } else if (value <= this.possibleRiskLevels.medium.max) {
      return this.possibleRiskLevels.medium.label;
    } else {
      return this.possibleRiskLevels.high.label;
    }
  }
  // Handle value changes
  onRiskValueChange(value: number) {
    this.riskSliderValue = value;
    console.log("Risk value: " + this.riskSliderValue)
    // Update active label styling
    this.updateActiveLabel();
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

  //Method stores current trade info in universal state for processing 
  async storeAutoTrade(): Promise<void> {
    try {
      const currentAssetSymbol: string = this.assetService.getInFocusAsset().symbol;

      // Validate inputs before proceeding
      if (!currentAssetSymbol || !this.shareAmount) {
        throw new Error('Symbol and share amount not found');
      }

      // Send request to service to store trade data
      await this.autoTradeService.storeAutoTradeData(this.symbol, this.shareAmount, this.riskLevel);

    } catch (error) {
      // Handle errors appropriately
      console.error('Failed to store auto trade:', error);
      throw error;
    }
  }


}

//Universal state is maintaned via mesage broker services (RabbitMQ)