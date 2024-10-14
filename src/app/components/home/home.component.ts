import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Asset } from '../../store/models/asset.model';
import * as AssetActions from '../../store/actions/asset.actions';
import { selectLoadedAssets, selectIsLoading } from '../../store/selectors/asset.selectors';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AssetComponent } from '../asset/asset.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as AssetSelectors from '../../store/selectors/asset.selectors';
import env from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule,
    FormsModule, AssetComponent, CommonModule, StoreModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  //create c for placing order(s) and configuring auto orders/sells
  //Create graph component for visualizing market data
  //Make market data component
  //include crucial market data in trade components 

  //set auto sell price
  //set auto buy price 
  //set frequency per day of trades
  //view yearly trend graph of each position
  //Implement CSP headers
  //SSL/TLS: Configure HTTPS for secure connections.
  //Implement HTTP Strict Transport Security

  activeAssets$: Observable<Asset[]>;
  isLoading$: Observable<boolean>;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchInput: string = '';
  debounceTimeInMilliseconds: number = 100
  loginAssetRetrievalStatus: boolean = false;


  http = inject(HttpClient);
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private store: Store) {
    this.activeAssets$ = this.store.select(selectLoadedAssets);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit() {
    this.loadInitialAssets();

    // Set up search subscription
    this.searchSubject.pipe(
      debounceTime(this.debounceTimeInMilliseconds),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm) {
        this.store.dispatch(AssetActions.searchAssets({ searchTerm }));
      } else {
        this.loadInitialAssets();
      }
    });
  }

  loadInitialAssets() {
    //Current page is reset
    this.currentPage = 1;

    this.store.dispatch(AssetActions.loadAssets());
  }

  onScroll(event: any) {
    const element = event.target;
    const threshold = 1; // You can adjust this value as needed

    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < threshold) {
      console.log('Reached near the bottom of scroll');

      this.isLoading$.pipe(
        take(1),
        filter(isLoading => !isLoading)
      ).subscribe(() => {
        this.loadMoreAssets();
      });
    }
  }

  loadMoreAssets() {
    this.store.select(AssetSelectors.selectAllAssets).pipe(
      take(1)
    ).subscribe(assets => {
      const startIndex = assets.length;
      const endIndex = startIndex + this.itemsPerPage;
      this.store.dispatch(AssetActions.loadMoreAssets({ startIndex, endIndex }));
      this.currentPage++;
    });
  }


  //Add funct to dynamically update search results as user types 
  searchForActiveAssets() {
    console.log("Attempting to fetch active assets from API");
    if (this.searchInput.trim() !== '') {
      this.store.dispatch(AssetActions.searchAssets({ searchTerm: this.searchInput }))
    } else {
      this.loadInitialAssets();
    }
  }

  onSearchInputChange() {
    // Debounce the search to avoid too many API calls
    this.searchSubject.next(this.searchInput);
  }
}
