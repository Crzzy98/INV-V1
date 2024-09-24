import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-asset',
  standalone: true,
  imports: [],
  templateUrl: './view-asset.component.html',
  styleUrl: './view-asset.component.scss'
})
export class ViewAssetComponent implements OnInit {
  router = inject(Router);
  assetData: any;

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    console.log("Current Navigation:", navigation);
    if (navigation && navigation.extras && navigation.extras.state) {
      this.assetData = navigation.extras.state['assetData'];
      console.log("Asset Data in View:", this.assetData);
    } else {
      console.log("No asset data received");
      console.log("Navigation Extras:", navigation?.extras);
    }
  }
}
