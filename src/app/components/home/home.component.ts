import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
//Possibly display relevant market data on home component 
//Yahoo finance api 
export class HomeComponent {
//finish alpaca config, poss make into srvice for inject
  //set auto sell price
//set auto buy price 
//set frequency per day of trades
//view yearly trend graph of each position
}
