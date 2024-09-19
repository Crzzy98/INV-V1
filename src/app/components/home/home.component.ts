import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
//Possibly display relevant market data on home component 
//Yahoo finance api 
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

  searchForActiveAssets() {
    console.log("Attempting to fetch active assets from API")
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
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
      )//Cahnge this subscribe to observer element
      .subscribe(
        (paginatedAssets: any[]) => {
          this.activeAssets = paginatedAssets;
          console.log("Fetched assets from home: " + JSON.stringify(this.activeAssets));
          if (this.activeAssets.length > 0 && Array.isArray(this.activeAssets)) {
            // console.log("Active asset: " + this.activeAssets[0]);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("Completed");
        }
      );
  }catch(error) {
    console.log("Error while fetching assets: " + error)
  }
}
}