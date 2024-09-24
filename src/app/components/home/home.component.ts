import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AssetComponent } from '../../asset/asset.component';
import { FormsModule } from '@angular/forms';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FormsModule, AssetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  //State management for storing asset data???
  //Possibly front face service for manipulating state
  //create c for placing order(s) and configuring auto orders/sells
  //Create graph component for visualizing market data

  //set auto sell price
  //set auto buy price 
  //set frequency per day of trades
  //view yearly trend graph of each position
  http = inject(HttpClient)
  baseUrl: string = 'http://localhost:3000'
  activeAssets: any[] = [];
  totalActiveAssets: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  isLoading: boolean = false;

  assetService = inject(AssetService);


//Variables indicating the state of 
//asset retrieval and sign in status 
loginAssetRetrievalStatus: boolean = false;

  searchInput: string = '';

  ngOnInit() {
    this.assetService.fetchAllAssets();
    this.assetService.getLoadedAssets().subscribe(assets => {
      this.activeAssets = assets;
    });  }

    onScroll(event: any) {
      const element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.loadMoreAssets();
      }
    }
  
    //Method executes when more assets are loaded into scrollable view 
    loadMoreAssets() {
      if (!this.isLoading) {
        this.isLoading = true;
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.assetService.loadMoreAssets(startIndex, endIndex);
        this.currentPage++;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000); // Simulating network delay
      }
    }
  

  //Add funct to dynamically update search results as user types 
  searchForActiveAssets() {
  console.log("Attempting to fetch active assets from API");
  const startIndex = (this.currentPage - 1) * this.itemsPerPage; //update itemsPerPage value with button click or scrolling 
  const endIndex = startIndex + this.itemsPerPage;

  try {
    this.http.get<any>(`${this.baseUrl}/active-assets`)
      .pipe(
        map(response => {
          const responseType = typeof response;
          console.log(`Response type: ${responseType}`);

          if (Array.isArray(response)) {
            // If the response is an array, paginate it
            return response.slice(startIndex, endIndex);
          } else if (typeof response === 'object' && response.data) {
            // If the response is an object with a 'data' property, handle it accordingly
            return response.data.slice(startIndex, endIndex);
          } else {
            // If the response is neither an array nor an object with a 'data' property
            console.log('Unexpected response format');
            return [];
          }
        })
      )
      .subscribe({
        next: (paginatedAssets: any[]) => {
          this.activeAssets = paginatedAssets;
          console.log("Fetched assets from home: " + JSON.stringify(this.activeAssets));
          if (this.activeAssets.length > 0 && Array.isArray(this.activeAssets)) {
          }
        },
        error: (error) => {
          console.log("Error occurred:", error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  } catch(error) {
    console.log("Error while fetching assets: " + error);
  }
}

}