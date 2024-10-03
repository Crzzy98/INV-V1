import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-view-asset',
  standalone: true,
  imports: [],
  templateUrl: './view-asset.component.html',
  styleUrl: './view-asset.component.scss'
})

//Component serves as view for "in Focus" asset
//The asset has bee nselected from the list on the main page
export class ViewAssetComponent{
  router = inject(Router);
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
  get marginable() { return this.assetData.marginable; }
  get maintenance_margin_requirement() { return this.assetData.maintenance_margin_requirement; }
  get margin_requirement_long() { return this.assetData.margin_requirement_long; }
  get margin_requirement_short() { return this.assetData.margin_requirement_short; }
  get shortable() { return this.assetData.shortable; }
  get easy_to_borrow() { return this.assetData.easy_to_borrow; }
  get fractionable() { return this.assetData.fractionable; }
  get attributes() { return this.assetData.attributes; }
}
