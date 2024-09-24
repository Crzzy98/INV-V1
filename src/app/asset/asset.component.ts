import { Component, Input, inject } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss'
})
export class AssetComponent {
  @Input() assetData!: any;
  router = inject(Router);

  //implment a Service for interacting with assets instead
  handleViewclick(){
    console.log("Navigation Attempted...")
    this.router.navigate(['/view-asset'], 
      { state: { assetData: this.assetData } });
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

