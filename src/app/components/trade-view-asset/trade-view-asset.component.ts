import { Component, inject } from '@angular/core';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'trade-view-asset',
  standalone: true,
  imports: [],
  templateUrl: './trade-view-asset.component.html',
  styleUrl: './trade-view-asset.component.scss'
})
export class TradeViewAssetComponent {
  assetData: any;
  assetService = inject(AssetService);

  constructor() {
    this.assetData = this.assetService.getInFocusAsset()
  }

  get id() { return this.assetData.id; }
  get class() { return this.assetData.class; }
  get exchange() { return this.assetData.exchange; }
  get symbol() { return this.assetData.symbol; }
  get name() { return this.assetData.name; }
  get status() { return this.assetData.status; }
  get tradable() { return this.assetData.tradable; }
}
