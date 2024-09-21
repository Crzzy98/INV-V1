import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PositionComponent } from '../position/position.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
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

//Variables indicating the state of 
//asset retrieval and sign in status 
loginAssetRetrievalStatus: boolean = false;

  searchInput: string = '';

  ngOnInit() {
    this.searchForActiveAssets();
  }

  //assets dont nedd to be stored in service
  //retrive assets using fetch req
  //Service removed from component
  getAssetAmt(){
  //use then after configuring res.json in server
  }

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