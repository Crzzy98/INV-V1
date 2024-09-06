import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-positions',
  standalone: true,
  imports: [],
  templateUrl: './search-positions.component.html',
  styleUrl: './search-positions.component.scss'
})
//Component allows for searching positions for purchase
//set buy timer or trigger for price
export class SearchPositionsComponent {
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>

  positionsFound: boolean = false

  fetchedPositions!: {}[]
  //Access service to retrieve relevant position data from alpaca api
  onSubmit(){
    console.log("User input: " + this.userInput)
  }
  //Method begins pagination process
}
