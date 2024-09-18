import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
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
  searchForActiveAssets() {
    console.log("Attempting to fetch active assets from API")
    try {
      const serverResponse = this.http.get(this.baseUrl + "/active-assets")
      .subscribe({
        next: (fetchedAssets) => {
          console.log("Fetched assets from home: " + JSON.stringify(fetchedAssets))
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log("Completed")
        }
      })

      }catch(error){
        console.log(error)
      }
  }
}